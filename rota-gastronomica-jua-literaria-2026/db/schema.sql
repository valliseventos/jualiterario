CREATE TABLE IF NOT EXISTS establishment_visits (
  id BIGSERIAL PRIMARY KEY,
  visitor_id UUID NOT NULL,
  establishment_slug TEXT NOT NULL,
  event_slug TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (visitor_id, establishment_slug, event_slug)
);

CREATE INDEX IF NOT EXISTS establishment_visits_event_idx
  ON establishment_visits (event_slug, establishment_slug);
