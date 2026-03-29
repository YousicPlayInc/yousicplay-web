import { vi } from "vitest";

/**
 * Creates a deeply mocked Supabase client where .from() returns chainable
 * query builder methods, all returning configurable promises.
 */
export function mockSupabaseClient() {
  const mockResult = { data: null, error: null };

  const queryBuilder = {
    select: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    upsert: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    delete: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    neq: vi.fn().mockReturnThis(),
    gt: vi.fn().mockReturnThis(),
    gte: vi.fn().mockReturnThis(),
    lt: vi.fn().mockReturnThis(),
    lte: vi.fn().mockReturnThis(),
    in: vi.fn().mockReturnThis(),
    order: vi.fn().mockReturnThis(),
    limit: vi.fn().mockReturnThis(),
    range: vi.fn().mockReturnThis(),
    maybeSingle: vi.fn().mockResolvedValue(mockResult),
    single: vi.fn().mockResolvedValue(mockResult),
    then: vi.fn((resolve: (value: typeof mockResult) => void) =>
      Promise.resolve(mockResult).then(resolve)
    ),
  };

  const client = {
    from: vi.fn().mockReturnValue(queryBuilder),
    auth: {
      getUser: vi.fn().mockResolvedValue({ data: { user: null }, error: null }),
      getSession: vi.fn().mockResolvedValue({ data: { session: null }, error: null }),
      signInWithOtp: vi.fn().mockResolvedValue({ data: {}, error: null }),
      signOut: vi.fn().mockResolvedValue({ error: null }),
    },
    rpc: vi.fn().mockResolvedValue({ data: null, error: null }),
  };

  return { client, queryBuilder, mockResult };
}

/**
 * Creates a NextRequest-like object for testing API routes.
 */
export function mockNextRequest(
  method: string,
  url: string,
  body?: Record<string, unknown>,
  headers?: Record<string, string>
): Request {
  const init: RequestInit = {
    method,
    headers: new Headers({
      "content-type": "application/json",
      ...headers,
    }),
  };

  if (body && method !== "GET" && method !== "HEAD") {
    init.body = JSON.stringify(body);
  }

  return new Request(url, init);
}

/**
 * Resets all mocks created by the mock factories.
 */
export function resetAllMocks() {
  vi.restoreAllMocks();
  vi.clearAllMocks();
}
