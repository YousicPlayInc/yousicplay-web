-- Music profiles for Spotify/Apple Music integration
CREATE TABLE IF NOT EXISTS music_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  provider text NOT NULL, -- 'spotify' or 'apple_music'
  provider_user_id text, -- Spotify/Apple Music user ID
  display_name text,
  profile_url text,
  avatar_url text,
  access_token text, -- encrypted in production
  refresh_token text, -- encrypted in production
  token_expires_at timestamptz,
  top_artists jsonb DEFAULT '[]'::jsonb,
  top_genres jsonb DEFAULT '[]'::jsonb,
  top_tracks jsonb DEFAULT '[]'::jsonb,
  connected_at timestamptz DEFAULT now(),
  last_synced_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(customer_id, provider)
);

-- RLS policies
ALTER TABLE music_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own music profiles"
  ON music_profiles FOR SELECT
  USING (customer_id IN (
    SELECT id FROM customers WHERE email = (SELECT auth.email())
  ));

-- Index for lookups
CREATE INDEX idx_music_profiles_customer ON music_profiles(customer_id);
CREATE INDEX idx_music_profiles_provider ON music_profiles(provider, provider_user_id);
