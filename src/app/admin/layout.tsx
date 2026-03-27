import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | YousicPlay",
  robots: "noindex, nofollow",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // TODO: Add auth check here when Supabase is connected
  // const supabase = await createSSRSupabase();
  // const { data: { user } } = await supabase.auth.getUser();
  // if (!user) redirect("/admin/login");

  return <>{children}</>;
}
