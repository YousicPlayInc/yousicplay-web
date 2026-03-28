-- ============================================================================
-- 004: Pre-seed products table with all courses and bundles
-- This ensures the purchase → access flow works immediately (no webhook race).
-- Prices are in CENTS to match Stripe convention.
-- ============================================================================

INSERT INTO products (name, slug, type, price, billing_interval, active) VALUES
  -- Courses (17 total)
  ('The Art of Soloing', 'cory-henry-workshop', 'course', 9900, 'one_time', true),
  ('Gospel Piano Mastery', 'alain-merville', 'course', 7900, 'one_time', true),
  ('The Art of Arranging', 'jesus-molina-workshop', 'course', 9900, 'one_time', true),
  ('Piano and Synth Technique', 'jordan-rudess', 'course', 7900, 'one_time', true),
  ('Performance and Professionalism', 'shedrick-mitchell', 'course', 7900, 'one_time', true),
  ('Jazz Improvisation', 'jesus-molina-class', 'course', 7900, 'one_time', true),
  ('Blues Guitar Mastery', 'eric-gales-2', 'course', 7900, 'one_time', true),
  ('Songwriting and TikTok', 'jax', 'course', 7900, 'one_time', true),
  ('Violin and Arranging', 'lindsey-stirling', 'course', 7900, 'one_time', true),
  ('Gospel Vocal Mastery', 'myron-butler', 'course', 7900, 'one_time', true),
  ('Latin Piano and Songwriting', 'noel-schajris', 'course', 7900, 'one_time', true),
  ('Drums and Musicality', 'robert-sput-searight', 'course', 7900, 'one_time', true),
  ('Bass Guitar Mastery', 'andrew-gouche', 'course', 7900, 'one_time', true),
  ('Singing With Soul', 'chrisette-michele', 'course', 7900, 'one_time', true),
  ('Trumpet & Musicality', 'arturo-sandoval', 'course', 7900, 'one_time', true),
  ('Organ & Synth Keyboards', 'cory-henry-organ-synth', 'course', 7900, 'one_time', true),
  ('The Art of Arranging (Advanced)', 'jesus-molina-arranging', 'course', 9900, 'one_time', true),

  -- Bundles (4 total)
  ('YousicPlay ALL Course Bundle', 'all-courses', 'bundle', 9900, 'one_time', true),
  ('Piano Bundle Pack', 'piano-bundle', 'bundle', 39900, 'one_time', true),
  ('Berklee Professor Live Coaching', 'berklee-coaching', 'bundle', 39900, 'one_time', true),
  ('ALL Course Bundle — Upgrade', 'all-courses-upgrade', 'bundle', 9900, 'one_time', true)

ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  type = EXCLUDED.type,
  active = EXCLUDED.active;
