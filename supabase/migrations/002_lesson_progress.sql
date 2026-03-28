-- ============================================================
-- 002: Lesson Progress Tracking
-- Tracks which lessons a user has completed for each course
-- ============================================================

CREATE TABLE IF NOT EXISTS lesson_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  course_slug text NOT NULL,
  lesson_index integer NOT NULL,
  completed_at timestamptz NOT NULL DEFAULT now(),

  -- Prevent duplicate completions
  UNIQUE(customer_id, course_slug, lesson_index)
);

-- Index for fast lookups: "which lessons has this user completed in this course?"
CREATE INDEX idx_lesson_progress_customer_course
  ON lesson_progress(customer_id, course_slug);

-- RLS: Users can only see/modify their own progress
ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own progress"
  ON lesson_progress FOR SELECT
  USING (customer_id = auth.uid());

CREATE POLICY "Users can insert own progress"
  ON lesson_progress FOR INSERT
  WITH CHECK (customer_id = auth.uid());

CREATE POLICY "Users can delete own progress"
  ON lesson_progress FOR DELETE
  USING (customer_id = auth.uid());

-- Service role bypasses RLS for API routes
