PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS asset (
  id TEXT PRIMARY KEY,
  file_path TEXT NOT NULL,
  file_name TEXT NOT NULL,
  mime_type TEXT,
  width_px INTEGER,
  height_px INTEGER,
  width_mm REAL,
  height_mm REAL,
  dpi INTEGER,
  card_type TEXT NOT NULL CHECK (card_type IN ('MUSE', 'EPOCH', 'ARTIST', 'ACTION')),
  side TEXT NOT NULL CHECK (side IN ('front', 'back')),
  source_document TEXT,
  page_number INTEGER,
  checksum TEXT,
  print_status TEXT NOT NULL CHECK (print_status IN ('DRAFT', 'NEEDS_REVIEW', 'APPROVED', 'PRINT_READY', 'RETIRED')),
  notes TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS muse (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  domain TEXT NOT NULL,
  description TEXT,
  mythology_notes TEXT,
  image_asset_id TEXT REFERENCES asset(id),
  card_back_asset_id TEXT REFERENCES asset(id),
  print_status TEXT NOT NULL CHECK (print_status IN ('DRAFT', 'NEEDS_REVIEW', 'APPROVED', 'PRINT_READY', 'RETIRED')),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS epoch (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  date_range TEXT,
  flavor_text TEXT,
  theme_notes TEXT,
  front_asset_id TEXT REFERENCES asset(id),
  back_asset_id TEXT REFERENCES asset(id),
  copy_count INTEGER NOT NULL DEFAULT 3,
  print_status TEXT NOT NULL CHECK (print_status IN ('DRAFT', 'NEEDS_REVIEW', 'APPROVED', 'PRINT_READY', 'RETIRED')),
  sort_order INTEGER,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS artist (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  epoch_id TEXT NOT NULL REFERENCES epoch(id),
  artist_type TEXT NOT NULL,
  description TEXT NOT NULL,
  front_asset_id TEXT REFERENCES asset(id),
  back_asset_id TEXT REFERENCES asset(id),
  copy_count INTEGER NOT NULL DEFAULT 1,
  print_status TEXT NOT NULL CHECK (print_status IN ('DRAFT', 'NEEDS_REVIEW', 'APPROVED', 'PRINT_READY', 'RETIRED')),
  is_intentional_duplicate INTEGER NOT NULL DEFAULT 0,
  duplicate_group_key TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS artist_muse_score (
  artist_id TEXT NOT NULL REFERENCES artist(id) ON DELETE CASCADE,
  muse_id TEXT NOT NULL REFERENCES muse(id) ON DELETE CASCADE,
  score INTEGER NOT NULL CHECK (score BETWEEN 0 AND 3),
  notes TEXT,
  PRIMARY KEY (artist_id, muse_id)
);

CREATE TABLE IF NOT EXISTS action_card (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  subtitle TEXT,
  category TEXT NOT NULL CHECK (category IN ('bonus', 'fate', 'disruption', 'swap', 'group')),
  rules_text TEXT NOT NULL,
  timing TEXT NOT NULL,
  affects TEXT NOT NULL,
  dice_outcomes TEXT,
  copy_count INTEGER NOT NULL DEFAULT 1,
  front_asset_id TEXT REFERENCES asset(id),
  back_asset_id TEXT REFERENCES asset(id),
  print_status TEXT NOT NULL CHECK (print_status IN ('DRAFT', 'NEEDS_REVIEW', 'APPROVED', 'PRINT_READY', 'RETIRED')),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS rules_version (
  id TEXT PRIMARY KEY,
  version_label TEXT NOT NULL,
  status TEXT NOT NULL,
  change_notes TEXT,
  published_at TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS rule_section (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  body_markdown TEXT NOT NULL,
  section_order INTEGER NOT NULL,
  version_id TEXT NOT NULL REFERENCES rules_version(id),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS glossary_term (
  id TEXT PRIMARY KEY,
  term TEXT NOT NULL UNIQUE,
  definition TEXT NOT NULL,
  related_rule_section_id TEXT REFERENCES rule_section(id)
);

CREATE TABLE IF NOT EXISTS deck_manifest (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  version_label TEXT,
  notes TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS deck_manifest_item (
  manifest_id TEXT NOT NULL REFERENCES deck_manifest(id) ON DELETE CASCADE,
  card_type TEXT NOT NULL CHECK (card_type IN ('MUSE', 'EPOCH', 'ARTIST', 'ACTION')),
  card_id TEXT NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  PRIMARY KEY (manifest_id, card_type, card_id)
);

CREATE TABLE IF NOT EXISTS playtest_session (
  id TEXT PRIMARY KEY,
  played_at TEXT,
  player_count INTEGER NOT NULL CHECK (player_count BETWEEN 2 AND 9),
  rules_version_id TEXT NOT NULL REFERENCES rules_version(id),
  deck_manifest_id TEXT NOT NULL REFERENCES deck_manifest(id),
  status TEXT NOT NULL CHECK (status IN ('PLANNED', 'COMPLETE', 'CANCELLED')),
  duration_minutes INTEGER,
  end_condition TEXT,
  notes TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS playtest_player (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL REFERENCES playtest_session(id) ON DELETE CASCADE,
  player_name TEXT,
  muse_id TEXT NOT NULL REFERENCES muse(id),
  final_score INTEGER,
  final_epoch_count INTEGER,
  placement INTEGER,
  notes TEXT
);

CREATE TABLE IF NOT EXISTS playtest_feedback (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL REFERENCES playtest_session(id) ON DELETE CASCADE,
  card_type TEXT CHECK (card_type IN ('MUSE', 'EPOCH', 'ARTIST', 'ACTION')),
  card_id TEXT,
  rule_section_id TEXT REFERENCES rule_section(id),
  severity TEXT NOT NULL CHECK (severity IN ('Note', 'Confusing', 'Blocking', 'Balance Concern')),
  feedback_text TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
