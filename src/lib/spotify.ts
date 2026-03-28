const SPOTIFY_AUTH_URL = "https://accounts.spotify.com/authorize";
const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
const SPOTIFY_API_BASE = "https://api.spotify.com/v1";

const SCOPES = [
  "user-read-private",
  "user-read-email",
  "user-top-read",
  "user-library-read",
].join(" ");

/**
 * Build the Spotify OAuth authorization URL.
 */
export function getAuthUrl(redirectUri: string, state: string): string {
  const params = new URLSearchParams({
    response_type: "code",
    client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!,
    scope: SCOPES,
    redirect_uri: redirectUri,
    state,
  });

  return `${SPOTIFY_AUTH_URL}?${params.toString()}`;
}

/**
 * Exchange an authorization code for access + refresh tokens.
 */
export async function exchangeCode(
  code: string,
  redirectUri: string
): Promise<{
  access_token: string;
  refresh_token: string;
  expires_in: number;
}> {
  const res = await fetch(SPOTIFY_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
      ).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Spotify token exchange failed: ${error}`);
  }

  return res.json();
}

/**
 * Refresh an expired access token using a refresh token.
 */
export async function refreshAccessToken(
  refreshToken: string
): Promise<{
  access_token: string;
  expires_in: number;
}> {
  const res = await fetch(SPOTIFY_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
      ).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Spotify token refresh failed: ${error}`);
  }

  return res.json();
}

/**
 * Fetch the current user's Spotify profile.
 */
export async function getUserProfile(accessToken: string) {
  const res = await fetch(`${SPOTIFY_API_BASE}/me`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    throw new Error(`Spotify profile fetch failed: ${res.status}`);
  }

  return res.json() as Promise<{
    id: string;
    display_name: string;
    email: string;
    external_urls: { spotify: string };
    images: { url: string }[];
  }>;
}

/**
 * Fetch the user's top artists (medium-term by default).
 */
export async function getTopArtists(
  accessToken: string,
  timeRange: "short_term" | "medium_term" | "long_term" = "medium_term",
  limit = 20
) {
  const params = new URLSearchParams({
    time_range: timeRange,
    limit: String(limit),
  });

  const res = await fetch(`${SPOTIFY_API_BASE}/me/top/artists?${params}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    throw new Error(`Spotify top artists fetch failed: ${res.status}`);
  }

  const data = await res.json();
  return data.items as {
    id: string;
    name: string;
    genres: string[];
    images: { url: string }[];
    popularity: number;
  }[];
}

/**
 * Fetch the user's top tracks (medium-term by default).
 */
export async function getTopTracks(
  accessToken: string,
  timeRange: "short_term" | "medium_term" | "long_term" = "medium_term",
  limit = 20
) {
  const params = new URLSearchParams({
    time_range: timeRange,
    limit: String(limit),
  });

  const res = await fetch(`${SPOTIFY_API_BASE}/me/top/tracks?${params}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    throw new Error(`Spotify top tracks fetch failed: ${res.status}`);
  }

  const data = await res.json();
  return data.items as {
    id: string;
    name: string;
    artists: { id: string; name: string }[];
    album: { name: string; images: { url: string }[] };
  }[];
}
