import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import Link from "next/link";

type TaskStatus = "done" | "todo" | "blocked";

interface Task {
  name: string;
  status: TaskStatus;
}

interface Category {
  title: string;
  assignee: string;
  badgeColor: string;
  tasks: Task[];
}

const categories: Category[] = [
  {
    title: "Code",
    assignee: "Claude",
    badgeColor: "bg-lime text-navy",
    tasks: [
      { name: "Stripe checkout flow", status: "done" },
      { name: "Email capture forms", status: "done" },
      { name: "Klaviyo sync", status: "done" },
      { name: "GA4 analytics", status: "done" },
      { name: "Spotify OAuth", status: "done" },
      { name: "Admin dashboard (real data)", status: "done" },
      { name: "SEO landing pages (75 pages)", status: "done" },
      { name: "Course player + progress tracking", status: "done" },
      { name: "Social share buttons", status: "done" },
      { name: "Certificates", status: "done" },
      { name: "JSON-LD structured data", status: "done" },
      { name: "Loading skeletons + error boundaries", status: "done" },
      { name: "Account settings page", status: "done" },
      { name: "Fix purchase → access verification", status: "todo" },
      { name: "Wire Wistia video player", status: "todo" },
      { name: "Checkout cancel page", status: "todo" },
      { name: "Harden Stripe webhook", status: "todo" },
      { name: "Document env vars", status: "todo" },
      { name: "Pre-seed products migration", status: "todo" },
    ],
  },
  {
    title: "Config & Access",
    assignee: "Justin",
    badgeColor: "bg-magenta text-white",
    tasks: [
      { name: "Get Wistia video IDs → map into courses.ts", status: "todo" },
      { name: "Run Supabase migrations (001, 002, 003)", status: "todo" },
      { name: "Configure Supabase Auth (site URL, redirect URLs)", status: "todo" },
      { name: "Set Vercel env vars (Stripe, Klaviyo, GA4, Admin)", status: "todo" },
      { name: "Register Stripe webhook URL", status: "todo" },
      { name: "Set up Stripe products/prices", status: "todo" },
      { name: "DNS: yousicplay.com → Vercel", status: "todo" },
      { name: "Get Facebook/Meta account access", status: "todo" },
      { name: "Set up Meta Pixel", status: "todo" },
      { name: "Get Klaviyo API key + list ID", status: "todo" },
      { name: "Register Spotify developer app", status: "todo" },
      { name: "Access social media accounts", status: "todo" },
      { name: "Set ADMIN_EMAILS env var", status: "todo" },
    ],
  },
  {
    title: "Marketing",
    assignee: "Sean",
    badgeColor: "bg-cyan-500 text-navy",
    tasks: [
      { name: "Finalize pricing tiers", status: "todo" },
      { name: "Plan launch campaign", status: "todo" },
      { name: "Build Meta/Facebook ad campaigns", status: "todo" },
      { name: "Design Klaviyo email flows", status: "todo" },
      { name: "Social media content calendar", status: "todo" },
      { name: "Influencer/partnership outreach", status: "todo" },
    ],
  },
  {
    title: "Strategy",
    assignee: "Team",
    badgeColor: "bg-amber-500 text-navy",
    tasks: [
      { name: "Finalize pricing (A/B test plan)", status: "todo" },
      { name: "Map AI agent architecture", status: "todo" },
      { name: "Subscription model decision", status: "todo" },
      { name: "Thinkific migration timeline", status: "todo" },
      { name: "Define launch success metrics", status: "todo" },
      { name: "Plan 25K email re-engagement", status: "todo" },
    ],
  },
  {
    title: "Post-Launch",
    assignee: "Not Yet",
    badgeColor: "bg-white/10 text-white/50",
    tasks: [
      { name: "Subscription billing", status: "todo" },
      { name: "A/B testing engine", status: "todo" },
      { name: "Mux video migration", status: "todo" },
      { name: "Apple Music connect", status: "todo" },
      { name: "Lydi AI tutor (web)", status: "todo" },
      { name: "Learning analytics dashboard", status: "todo" },
      { name: "AI chat course recommender", status: "todo" },
      { name: "YousicPlay University tier", status: "todo" },
    ],
  },
];

function StatusBadge({ status }: { status: TaskStatus }) {
  const styles: Record<TaskStatus, string> = {
    done: "bg-lime text-navy",
    todo: "bg-white/10 text-white/50",
    blocked: "bg-red-500/20 text-red-400",
  };

  const labels: Record<TaskStatus, string> = {
    done: "Done",
    todo: "Todo",
    blocked: "Blocked",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}

function Checkbox({ checked }: { checked: boolean }) {
  return (
    <span
      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
        checked
          ? "border-lime bg-lime text-navy"
          : "border-white/20 bg-transparent"
      }`}
    >
      {checked && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-3.5 w-3.5"
        >
          <path
            fillRule="evenodd"
            d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </span>
  );
}

export default function AdminTasksPage() {
  const totalTasks = categories.reduce((sum, cat) => sum + cat.tasks.length, 0);
  const doneTasks = categories.reduce(
    (sum, cat) => sum + cat.tasks.filter((t) => t.status === "done").length,
    0
  );
  const progressPercent = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  return (
    <div className="min-h-screen bg-navy">
      {/* Header */}
      <header className="border-b border-white/10 py-8">
        <MaxWidthWrapper>
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="text-white/50 transition-colors hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            <div>
              <h1 className="font-serif text-3xl font-bold text-white">
                Launch Checklist
              </h1>
              <p className="mt-1 text-sm text-white/50">
                Everything needed before yousicplay.com goes live.
              </p>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>

      {/* Progress Bar */}
      <section className="py-8">
        <MaxWidthWrapper>
          <div className="rounded-2xl border border-white/10 bg-navy-light p-6">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm font-medium text-white/50">Overall Progress</p>
                <p className="mt-1 text-3xl font-bold text-white">
                  {doneTasks}{" "}
                  <span className="text-lg font-normal text-white/40">
                    of {totalTasks} tasks
                  </span>
                </p>
              </div>
              <p className="text-2xl font-bold text-lime">{progressPercent}%</p>
            </div>
            <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-lime transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Task Categories */}
      <section className="pb-16">
        <MaxWidthWrapper>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {categories.map((category) => {
              const catDone = category.tasks.filter(
                (t) => t.status === "done"
              ).length;
              const catTotal = category.tasks.length;

              return (
                <div
                  key={category.title}
                  className="rounded-2xl border border-white/10 bg-navy-light"
                >
                  {/* Category Header */}
                  <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                    <div className="flex items-center gap-3">
                      <h2 className="font-serif text-lg font-semibold text-white">
                        {category.title}
                      </h2>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${category.badgeColor}`}
                      >
                        {category.assignee}
                      </span>
                    </div>
                    <span className="text-sm text-white/40">
                      {catDone}/{catTotal}
                    </span>
                  </div>

                  {/* Task List */}
                  <div className="divide-y divide-white/5 px-6">
                    {category.tasks.map((task) => (
                      <div
                        key={task.name}
                        className="flex items-center gap-3 py-3"
                      >
                        <Checkbox checked={task.status === "done"} />
                        <span
                          className={`flex-1 text-sm ${
                            task.status === "done"
                              ? "text-white/40 line-through"
                              : "text-white/80"
                          }`}
                        >
                          {task.name}
                        </span>
                        <StatusBadge status={task.status} />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
