import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

// ── Mocks ──────────────────────────────────────────────────────────────

const mockGetUser = vi.fn();
const mockCustomerSelect = vi.fn();
const mockCustomerInsert = vi.fn();
const mockProgressUpsert = vi.fn();
const mockProgressDelete = vi.fn();
const mockProgressSelect = vi.fn();

// Chain helpers for the admin client
function makeChain(terminal: vi.Mock) {
  return {
    select: vi.fn(() => ({
      eq: vi.fn(() => ({
        single: mockCustomerSelect,
        eq: vi.fn(() => terminal),
      })),
    })),
    insert: vi.fn(() => ({
      select: vi.fn(() => ({
        single: mockCustomerInsert,
      })),
    })),
    upsert: mockProgressUpsert,
    delete: vi.fn(() => ({
      eq: vi.fn(() => ({
        eq: vi.fn(() => ({
          eq: vi.fn(() => mockProgressDelete()),
        })),
      })),
    })),
  };
}

const adminFromMock = vi.fn();

vi.mock("@/lib/supabase", () => ({
  createSSRSupabase: vi.fn(async () => ({
    auth: { getUser: mockGetUser },
  })),
  createServerSupabase: vi.fn(() => ({
    from: adminFromMock,
  })),
}));

vi.mock("@/data/courses", () => ({
  courses: [
    {
      slug: "test-course",
      title: "Test Course",
      lessonPlan: [
        { title: "Lesson 1" },
        { title: "Lesson 2" },
        { title: "Lesson 3" },
      ],
    },
  ],
}));

import { POST, GET } from "@/app/api/learn/progress/route";

// ── Helpers ────────────────────────────────────────────────────────────

function makePostRequest(body: unknown): NextRequest {
  return new NextRequest("http://localhost/api/learn/progress", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

function makeGetRequest(params: Record<string, string> = {}): NextRequest {
  const url = new URL("http://localhost/api/learn/progress");
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }
  return new NextRequest(url);
}

// ── Setup ──────────────────────────────────────────────────────────────

beforeEach(() => {
  vi.clearAllMocks();

  // Default: authenticated user with existing customer
  mockGetUser.mockResolvedValue({
    data: { user: { email: "user@test.com", user_metadata: {} } },
  });

  // Admin client — route "from" calls to the right mock chain
  adminFromMock.mockImplementation((table: string) => {
    if (table === "customers") {
      return {
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            single: mockCustomerSelect,
          })),
        })),
        insert: vi.fn(() => ({
          select: vi.fn(() => ({
            single: mockCustomerInsert,
          })),
        })),
      };
    }
    if (table === "lesson_progress") {
      return {
        upsert: mockProgressUpsert,
        delete: vi.fn(() => ({
          eq: vi.fn(() => ({
            eq: vi.fn(() => ({
              eq: vi.fn(() => mockProgressDelete()),
            })),
          })),
        })),
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            eq: vi.fn(() => mockProgressSelect()),
          })),
        })),
      };
    }
    return {};
  });

  mockCustomerSelect.mockResolvedValue({ data: { id: "cust-123" }, error: null });
  mockProgressUpsert.mockResolvedValue({ error: null });
  mockProgressDelete.mockReturnValue({ error: null });
  mockProgressSelect.mockReturnValue({ data: [], error: null });
});

// ── POST Tests ─────────────────────────────────────────────────────────

describe("POST /api/learn/progress", () => {
  it("returns 401 when not authenticated", async () => {
    mockGetUser.mockResolvedValueOnce({ data: { user: null } });

    const res = await POST(makePostRequest({ courseSlug: "test-course", lessonIndex: 0, completed: true }));
    expect(res.status).toBe(401);
  });

  it("returns 400 when courseSlug is missing", async () => {
    const res = await POST(makePostRequest({ lessonIndex: 0, completed: true }));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("courseSlug and lessonIndex are required");
  });

  it("returns 400 when lessonIndex is missing", async () => {
    const res = await POST(makePostRequest({ courseSlug: "test-course", completed: true }));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("courseSlug and lessonIndex are required");
  });

  it("returns 400 for invalid course slug", async () => {
    const res = await POST(makePostRequest({ courseSlug: "nonexistent", lessonIndex: 0, completed: true }));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Invalid course or lesson");
  });

  it("returns 400 when lesson index is out of bounds", async () => {
    const res = await POST(makePostRequest({ courseSlug: "test-course", lessonIndex: 99, completed: true }));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Invalid course or lesson");
  });

  it("returns 400 when lesson index is negative", async () => {
    const res = await POST(makePostRequest({ courseSlug: "test-course", lessonIndex: -1, completed: true }));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Invalid course or lesson");
  });

  it("upserts progress record when completed=true", async () => {
    const res = await POST(makePostRequest({ courseSlug: "test-course", lessonIndex: 1, completed: true }));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.completed).toBe(true);

    expect(mockProgressUpsert).toHaveBeenCalledWith(
      {
        customer_id: "cust-123",
        course_slug: "test-course",
        lesson_index: 1,
      },
      { onConflict: "customer_id,course_slug,lesson_index" }
    );
  });

  it("deletes progress record when completed=false", async () => {
    const res = await POST(makePostRequest({ courseSlug: "test-course", lessonIndex: 1, completed: false }));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.completed).toBe(false);
  });
});

// ── GET Tests ──────────────────────────────────────────────────────────

describe("GET /api/learn/progress", () => {
  it("returns 400 when courseSlug query param is missing", async () => {
    const res = await GET(makeGetRequest({}));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("courseSlug is required");
  });

  it("returns 401 when not authenticated", async () => {
    mockGetUser.mockResolvedValueOnce({ data: { user: null } });

    const res = await GET(makeGetRequest({ courseSlug: "test-course" }));
    expect(res.status).toBe(401);
  });

  it("returns array of completed lesson indices", async () => {
    mockProgressSelect.mockReturnValueOnce({
      data: [
        { lesson_index: 0, completed_at: "2025-01-01" },
        { lesson_index: 2, completed_at: "2025-01-02" },
      ],
      error: null,
    });

    const res = await GET(makeGetRequest({ courseSlug: "test-course" }));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.completedLessons).toEqual([0, 2]);
  });

  it("returns empty array when no progress exists", async () => {
    mockProgressSelect.mockReturnValueOnce({ data: [], error: null });

    const res = await GET(makeGetRequest({ courseSlug: "test-course" }));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.completedLessons).toEqual([]);
  });
});
