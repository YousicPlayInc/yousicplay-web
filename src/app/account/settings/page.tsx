import { createSSRSupabase, createServerSupabase } from "@/lib/supabase";
import type { Metadata } from "next";
import SettingsForm from "@/components/sections/account/SettingsForm";
import ConnectedAccounts from "@/components/sections/account/ConnectedAccounts";
import SpotifyToast from "@/components/sections/account/SpotifyToast";

export const metadata: Metadata = {
  title: "Settings | YousicPlay",
  robots: "noindex",
};

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  // Auth is verified by layout
  const supabase = await createSSRSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Get customer record
  const adminSupabase = createServerSupabase();
  const { data: customer } = await adminSupabase
    .from("customers")
    .select("id, name, email")
    .eq("email", user?.email ?? "")
    .single();

  // Check if Spotify is connected
  let spotifyConnected = false;
  if (customer?.id) {
    const { data: spotifyProfile } = await adminSupabase
      .from("music_profiles")
      .select("id")
      .eq("customer_id", customer.id)
      .eq("provider", "spotify")
      .single();

    spotifyConnected = !!spotifyProfile;
  }

  const displayName = customer?.name || user?.user_metadata?.full_name || "";
  const email = user?.email || "";
  const authProvider = user?.app_metadata?.provider || "email";

  const spotifyParam = typeof params.spotify === "string" ? params.spotify : undefined;

  return (
    <>
      {spotifyParam && <SpotifyToast status={spotifyParam} />}

      <div className="mb-10">
        <h1 className="font-playfair text-3xl font-bold text-white sm:text-4xl">
          Settings
        </h1>
        <p className="mt-2 text-white/50">
          Manage your account and connected services
        </p>
      </div>

      <div className="space-y-8">
        {/* Profile Section */}
        <section className="rounded-2xl border border-white/10 bg-navy-light p-6">
          <h2 className="mb-4 font-poppins text-lg font-semibold text-white">Profile</h2>
          <SettingsForm
            initialName={displayName}
            email={email}
            authProvider={authProvider}
          />
        </section>

        {/* Connected Accounts Section */}
        <section className="rounded-2xl border border-white/10 bg-navy-light p-6">
          <h2 className="mb-4 font-poppins text-lg font-semibold text-white">
            Connected Accounts
          </h2>
          <p className="mb-4 text-sm text-white/40">
            Connect your music services for personalized recommendations.
          </p>
          <ConnectedAccounts
            authProvider={authProvider}
            spotifyConnected={spotifyConnected}
          />
        </section>

        {/* Danger Zone */}
        <section className="rounded-2xl border border-red-500/20 bg-navy-light p-6">
          <h2 className="mb-2 font-poppins text-lg font-semibold text-red-400">
            Danger Zone
          </h2>
          <p className="mb-4 text-sm text-white/40">
            Permanently delete your account and all associated data. This action cannot be undone.
          </p>
          <button
            disabled
            className="rounded-full border border-red-500/30 px-6 py-2 text-sm font-medium text-red-400 opacity-50"
          >
            Delete Account (Coming Soon)
          </button>
        </section>
      </div>
    </>
  );
}
