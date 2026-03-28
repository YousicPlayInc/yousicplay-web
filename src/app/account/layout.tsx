import { redirect } from "next/navigation";
import { createSSRSupabase } from "@/lib/supabase";
import Link from "next/link";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";

interface AccountLayoutProps {
  children: React.ReactNode;
}

export default async function AccountLayout({ children }: AccountLayoutProps) {
  // Protect all /account routes
  const supabase = await createSSRSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/account");
  }

  return (
    <div className="min-h-[80vh] bg-navy">
      <MaxWidthWrapper>
        <div className="py-12">
          {/* Account navigation */}
          <nav className="mb-8 flex gap-1 rounded-lg border border-white/10 bg-navy-light p-1">
            <AccountNavLink href="/account" exact>
              My Courses
            </AccountNavLink>
            <AccountNavLink href="/account/settings">
              Settings
            </AccountNavLink>
          </nav>

          {children}
        </div>
      </MaxWidthWrapper>
    </div>
  );
}

function AccountNavLink({
  href,
  exact,
  children,
}: {
  href: string;
  exact?: boolean;
  children: React.ReactNode;
}) {
  // Note: Server components can't use usePathname for active state.
  // We use CSS-only approach — both links are styled the same,
  // active state handled by the client wrapper below.
  return (
    <Link
      href={href}
      className="rounded-md px-4 py-2 text-sm font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white"
    >
      {children}
    </Link>
  );
}
