import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { createServerSupabase } from "@/lib/supabase";
import {
  exchangeCode,
  getUserProfile,
  getTopArtists,
  getTopTracks,
} from "@/lib/spotify";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  // User denied access or Spotify returned an error
  if (error) {
    return NextResponse.redirect(
      new URL(`/account/settings?spotify=error&reason=${error}`, origin)
    );
  }

  if (!code || !state) {
    return NextResponse.redirect(
      new URL("/account/settings?spotify=error&reason=missing_params", origin)
    );
  }

  // Decode and verify state
  let stateData: { email: string; ts: number };
  try {
    stateData = JSON.parse(Buffer.from(state, "base64url").toString());
  } catch {
    return NextResponse.redirect(
      new URL("/account/settings?spotify=error&reason=invalid_state", origin)
    );
  }

  // Verify state is not too old (10 minutes)
  if (Date.now() - stateData.ts > 10 * 60 * 1000) {
    return NextResponse.redirect(
      new URL("/account/settings?spotify=error&reason=expired", origin)
    );
  }

  // Verify the user is still authenticated
  const response = NextResponse.redirect(
    new URL("/account/settings?spotify=connected", origin)
  );

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email || user.email !== stateData.email) {
    return NextResponse.redirect(
      new URL("/account/settings?spotify=error&reason=auth_mismatch", origin)
    );
  }

  try {
    // Exchange code for tokens
    const redirectUri = `${origin}/api/spotify/callback`;
    const tokens = await exchangeCode(code, redirectUri);

    // Fetch Spotify data in parallel
    const [profile, artists, tracks] = await Promise.all([
      getUserProfile(tokens.access_token),
      getTopArtists(tokens.access_token),
      getTopTracks(tokens.access_token),
    ]);

    // Extract genres from top artists
    const genreCounts = new Map<string, number>();
    for (const artist of artists) {
      for (const genre of artist.genres) {
        genreCounts.set(genre, (genreCounts.get(genre) || 0) + 1);
      }
    }
    const topGenres = [...genreCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([genre, count]) => ({ genre, count }));

    // Get customer_id from admin client
    const adminSupabase = createServerSupabase();
    const { data: customer } = await adminSupabase
      .from("customers")
      .select("id")
      .eq("email", user.email)
      .single();

    if (!customer) {
      return NextResponse.redirect(
        new URL(
          "/account/settings?spotify=error&reason=no_customer",
          origin
        )
      );
    }

    // Upsert music profile
    const tokenExpiresAt = new Date(
      Date.now() + tokens.expires_in * 1000
    ).toISOString();

    await adminSupabase.from("music_profiles").upsert(
      {
        customer_id: customer.id,
        provider: "spotify",
        provider_user_id: profile.id,
        display_name: profile.display_name,
        profile_url: profile.external_urls?.spotify || null,
        avatar_url: profile.images?.[0]?.url || null,
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        token_expires_at: tokenExpiresAt,
        top_artists: artists.map((a) => ({
          id: a.id,
          name: a.name,
          genres: a.genres,
          image: a.images?.[0]?.url || null,
        })),
        top_genres: topGenres,
        top_tracks: tracks.map((t) => ({
          id: t.id,
          name: t.name,
          artist: t.artists?.[0]?.name || "Unknown",
          album: t.album?.name || "Unknown",
          image: t.album?.images?.[0]?.url || null,
        })),
        connected_at: new Date().toISOString(),
        last_synced_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      { onConflict: "customer_id,provider" }
    );

    return response;
  } catch (err) {
    console.error("Spotify callback error:", err);
    return NextResponse.redirect(
      new URL(
        `/account/settings?spotify=error&reason=exchange_failed`,
        origin
      )
    );
  }
}
