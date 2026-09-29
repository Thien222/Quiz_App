CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Extensible dimensions: content can add dimensions without application migrations.
CREATE TABLE dimensions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  description text,
  icon_name text,
  display_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Questions live in one reusable bank and are not owned by a quiz.
CREATE TABLE questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stable_key text NOT NULL UNIQUE,
  question_text text NOT NULL,
  context_scenario text,
  illustration_key text,
  tags text[] NOT NULL DEFAULT '{}',
  content_version integer NOT NULL DEFAULT 1 CHECK (content_version > 0),
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE question_options (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id uuid NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  option_key text NOT NULL,
  option_text text NOT NULL,
  subtext text,
  display_order integer NOT NULL,
  UNIQUE (question_id, option_key),
  UNIQUE (question_id, display_order)
);

-- Relational weights make dimensions queryable and genuinely extensible.
CREATE TABLE option_dimension_weights (
  option_id uuid NOT NULL REFERENCES question_options(id) ON DELETE CASCADE,
  dimension_id uuid NOT NULL REFERENCES dimensions(id) ON DELETE RESTRICT,
  weight numeric(8, 3) NOT NULL,
  PRIMARY KEY (option_id, dimension_id)
);

CREATE TABLE question_pools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  description text,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- A question may be reused in many pools and carry pool-specific selection weight.
CREATE TABLE pool_questions (
  pool_id uuid NOT NULL REFERENCES question_pools(id) ON DELETE CASCADE,
  question_id uuid NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  selection_weight numeric(8, 3) NOT NULL DEFAULT 1 CHECK (selection_weight >= 0),
  is_required boolean NOT NULL DEFAULT false,
  display_order integer,
  PRIMARY KEY (pool_id, question_id)
);

CREATE TABLE quizzes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  subtitle text,
  description text,
  cover_image_url text,
  badge_tag text,
  estimated_minutes integer NOT NULL DEFAULT 3 CHECK (estimated_minutes > 0),
  is_active boolean NOT NULL DEFAULT true,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- A quiz can draw from several pools; pool order/weight belongs to this association.
CREATE TABLE quiz_pools (
  quiz_id uuid NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
  pool_id uuid NOT NULL REFERENCES question_pools(id) ON DELETE RESTRICT,
  draw_count integer CHECK (draw_count > 0),
  selection_weight numeric(8, 3) NOT NULL DEFAULT 1 CHECK (selection_weight >= 0),
  display_order integer NOT NULL DEFAULT 0,
  PRIMARY KEY (quiz_id, pool_id)
);

CREATE TYPE question_selection_strategy AS ENUM ('random', 'weighted', 'balanced');

CREATE TABLE quiz_selection_policies (
  quiz_id uuid PRIMARY KEY REFERENCES quizzes(id) ON DELETE CASCADE,
  question_count integer NOT NULL CHECK (question_count > 0),
  strategy question_selection_strategy NOT NULL DEFAULT 'balanced',
  avoid_seen_questions boolean NOT NULL DEFAULT true,
  exposure_cooldown_days integer NOT NULL DEFAULT 30 CHECK (exposure_cooldown_days >= 0),
  max_questions_per_tag integer CHECK (max_questions_per_tag > 0),
  randomization_salt text,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE visual_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stable_key text NOT NULL UNIQUE,
  version integer NOT NULL DEFAULT 1 CHECK (version > 0),
  art_style text NOT NULL,
  palette jsonb NOT NULL DEFAULT '[]'::jsonb CHECK (jsonb_typeof(palette) = 'array'),
  subject jsonb NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(subject) = 'object'),
  scene jsonb NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(scene) = 'object'),
  composition jsonb NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(composition) = 'object'),
  negative_traits jsonb NOT NULL DEFAULT '[]'::jsonb CHECK (jsonb_typeof(negative_traits) = 'array'),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE result_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id uuid NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
  stable_key text NOT NULL,
  archetype_title text NOT NULL,
  archetype_subtitle text,
  vibe_tag text,
  summary_description text NOT NULL,
  free_insights jsonb NOT NULL DEFAULT '[]'::jsonb,
  premium_insights jsonb NOT NULL DEFAULT '[]'::jsonb,
  match_criteria jsonb NOT NULL DEFAULT '{}'::jsonb,
  visual_profile_id uuid REFERENCES visual_profiles(id) ON DELETE SET NULL,
  badge_icon text,
  UNIQUE (quiz_id, stable_key)
);

CREATE TABLE quiz_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  quiz_id uuid NOT NULL REFERENCES quizzes(id) ON DELETE RESTRICT,
  status text NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'abandoned')),
  selection_seed text NOT NULL,
  started_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz
);

-- Snapshot the selected set/order so a dynamic session remains deterministic.
CREATE TABLE session_questions (
  session_id uuid NOT NULL REFERENCES quiz_sessions(id) ON DELETE CASCADE,
  question_id uuid NOT NULL REFERENCES questions(id) ON DELETE RESTRICT,
  position integer NOT NULL CHECK (position >= 0),
  source_pool_id uuid REFERENCES question_pools(id) ON DELETE SET NULL,
  question_version integer NOT NULL,
  PRIMARY KEY (session_id, question_id),
  UNIQUE (session_id, position)
);

CREATE TABLE user_answers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL,
  question_id uuid NOT NULL,
  selected_option_id uuid NOT NULL REFERENCES question_options(id) ON DELETE RESTRICT,
  created_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (session_id, question_id) REFERENCES session_questions(session_id, question_id) ON DELETE CASCADE,
  UNIQUE (session_id, question_id)
);

-- One row per presentation supports cooldowns, unseen-first selection and analytics.
CREATE TABLE question_exposures (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  anonymous_id uuid,
  session_id uuid NOT NULL REFERENCES quiz_sessions(id) ON DELETE CASCADE,
  quiz_id uuid NOT NULL REFERENCES quizzes(id) ON DELETE RESTRICT,
  question_id uuid NOT NULL REFERENCES questions(id) ON DELETE RESTRICT,
  exposed_at timestamptz NOT NULL DEFAULT now(),
  answered_at timestamptz,
  CHECK (user_id IS NOT NULL OR anonymous_id IS NOT NULL),
  UNIQUE (session_id, question_id)
);

CREATE INDEX question_exposures_user_lookup ON question_exposures (user_id, question_id, exposed_at DESC);
CREATE INDEX question_exposures_anonymous_lookup ON question_exposures (anonymous_id, question_id, exposed_at DESC);

CREATE TABLE user_quiz_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL UNIQUE REFERENCES quiz_sessions(id) ON DELETE CASCADE,
  user_id uuid,
  matched_template_id uuid REFERENCES result_templates(id) ON DELETE SET NULL,
  dimension_scores jsonb NOT NULL CHECK (jsonb_typeof(dimension_scores) = 'object'),
  is_premium_unlocked boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sku text NOT NULL UNIQUE,
  name text NOT NULL,
  description text,
  price_vnd integer NOT NULL CHECK (price_vnd >= 0),
  entitlement_kind text NOT NULL CHECK (entitlement_kind IN ('single_result', 'all_access')),
  is_active boolean NOT NULL DEFAULT true
);

CREATE TABLE user_entitlements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
  unlocked_result_id uuid REFERENCES user_quiz_results(id) ON DELETE CASCADE,
  purchased_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz,
  CHECK (expires_at IS NULL OR expires_at > purchased_at)
);

CREATE UNIQUE INDEX one_entitlement_per_result
  ON user_entitlements (user_id, unlocked_result_id)
  WHERE unlocked_result_id IS NOT NULL;

-- Daily editions accept ordered, typed items instead of a fixed set of columns.
CREATE TABLE daily_editions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  publish_date date NOT NULL UNIQUE,
  title text,
  is_published boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE daily_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  edition_id uuid NOT NULL REFERENCES daily_editions(id) ON DELETE CASCADE,
  item_type text NOT NULL,
  title text,
  payload jsonb NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(payload) = 'object'),
  display_order integer NOT NULL DEFAULT 0,
  starts_at timestamptz,
  ends_at timestamptz,
  UNIQUE (edition_id, display_order),
  CHECK (ends_at IS NULL OR starts_at IS NULL OR ends_at > starts_at)
);
