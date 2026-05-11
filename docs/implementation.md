# Xanadu Implementation Guide

## Product Shape

Build Xanadu as a playable local-first digital card game first, with a secondary companion/admin console for browsing, rules, playtesting, balance, and print support. The app should eventually support a hosted companion mode and online multiplayer, but the next implementation work must optimize for the player workflow: start game, choose Muse, take turns, play cards, resolve Actions, score, and win or lose.

Recommended stack:

- Frontend: React, TypeScript, Vite.
- Styling: CSS modules or a small design-token CSS layer.
- Backend: Node.js with a lightweight API layer.
- Database: SQLite for local development and portable content management.
- ORM: Prisma or Drizzle.
- Export formats: JSON and CSV.
- Asset storage: local filesystem during development, with database references to asset paths.

The implementation may be adjusted to match an existing repository stack if one is introduced later. The requirements below define behavior and data contracts, not a mandatory framework.

## Architecture

### Application Layers

1. Presentation layer
   - Primary Game Mode: local play surface, player hands, tableau, turn controls, Action resolution, score state, and win/end screens.
   - Secondary Companion Mode: card browser, rules reference, scoring helper, playtest screens, validation dashboard.

2. Game engine layer
   - Pure state transitions for setup, shuffling, dealing, Muse selection, turn phases, tableau changes, card movement, scoring, and end conditions.
   - No UI coupling so it can support NPCs now and online multiplayer later.

3. Domain layer
   - Card models, scoring rules, deck composition logic, validation rules.
   - Should be framework-independent and unit tested.

4. Data layer
   - SQLite database for structured content.
   - File references for artwork and print assets.
   - Import/export services for CSV, JSON, and generated reports.

5. Asset layer
   - Stores card fronts, backs, generated previews, and original source files.
   - Tracks dimensions, status, card type, and production notes.

## Database Schema

### enums

CardType:

- MUSE
- EPOCH
- ARTIST
- ACTION

PrintStatus:

- DRAFT
- NEEDS_REVIEW
- APPROVED
- PRINT_READY
- RETIRED

ActionCategory:

- bonus
- fate
- disruption
- swap
- group

PlaytestStatus:

- PLANNED
- COMPLETE
- CANCELLED

### muse

Stores the Nine Muses.

Fields:

- id: string primary key.
- name: text, unique, required.
- domain: text, required. Example: Epic Poetry, Eloquent Speech.
- description: text.
- mythology_notes: text.
- image_asset_id: foreign key to asset.
- card_back_asset_id: foreign key to asset.
- print_status: PrintStatus.
- created_at: datetime.
- updated_at: datetime.

Initial Muse names:

- Calliope
- Clio
- Erato
- Euterpe
- Melpomene
- Polyhymnia
- Terpsichore
- Thalia
- Urania

### epoch

Stores Epoch cards.

Fields:

- id: string primary key.
- name: text, unique, required.
- date_range: text.
- flavor_text: text.
- theme_notes: text.
- front_asset_id: foreign key to asset.
- back_asset_id: foreign key to asset.
- copy_count: integer, default 3.
- print_status: PrintStatus.
- sort_order: integer.
- created_at: datetime.
- updated_at: datetime.

Known deck requirement: 90 Epoch cards, based on 30 unique Epochs repeated 3 times.

### artist

Stores Artist cards.

Fields:

- id: string primary key.
- name: text, required.
- epoch_id: foreign key to epoch, required.
- artist_type: text, required. Examples: Musician, Poet, Painter, Performer.
- description: text, required.
- front_asset_id: foreign key to asset, nullable until artwork exists.
- back_asset_id: foreign key to asset.
- copy_count: integer, default 1.
- print_status: PrintStatus.
- is_intentional_duplicate: boolean, default false.
- duplicate_group_key: text, nullable.
- created_at: datetime.
- updated_at: datetime.

Known deck requirement: 150 Artist cards. Existing source material includes 150 records, 30 Epoch names, and duplicate name/Epoch pairs that must be reviewed or marked intentional.

### artist_muse_score

Stores scoring values for each Artist against each Muse.

Fields:

- artist_id: foreign key to artist.
- muse_id: foreign key to muse.
- score: integer, required, allowed values 0-3 unless rules change.
- notes: text.

Constraints:

- Unique artist_id + muse_id.
- Every Artist must have exactly nine score rows.

### action_card

Stores Action cards.

Fields:

- id: string primary key.
- name: text, required.
- subtitle: text.
- category: ActionCategory.
- rules_text: text, required.
- timing: text. Examples: Play Immediately, Any Time, On Your Turn.
- affects: text. Examples: Self, One Player, All Players, Clockwise.
- dice_outcomes: JSON, nullable for Fate Dice cards.
- copy_count: integer, default 1.
- front_asset_id: foreign key to asset.
- back_asset_id: foreign key to asset.
- print_status: PrintStatus.
- created_at: datetime.
- updated_at: datetime.

Known deck requirement: 64 Action cards split into 22 bonus, 10 fate, 10 disruption, 14 swap, and 8 group cards.

### rule_section

Stores rules content.

Fields:

- id: string primary key.
- title: text, required.
- slug: text, unique, required.
- body_markdown: text, required.
- section_order: integer.
- version_id: foreign key to rules_version.
- created_at: datetime.
- updated_at: datetime.

Core sections:

- Game Blurb
- Aim of the Game
- Game Components
- Player Numbers
- Setup
- To Begin
- Turn Overview
- Building Your Tableau
- Using Action Cards
- Game End and Scoring
- Tiebreaker
- Example Turn
- Glossary

### glossary_term

Fields:

- id: string primary key.
- term: text, unique, required.
- definition: text, required.
- related_rule_section_id: foreign key to rule_section.

Initial terms: Deal, Discard, Draw, Hand, Round, Set, Tableau, Turn.

### rules_version

Fields:

- id: string primary key.
- version_label: text, required.
- status: text. Examples: Draft, Playtest, Approved.
- change_notes: text.
- published_at: datetime nullable.
- created_at: datetime.

### asset

Tracks source and generated artwork.

Fields:

- id: string primary key.
- file_path: text, required.
- file_name: text, required.
- mime_type: text.
- width_px: integer.
- height_px: integer.
- width_mm: decimal.
- height_mm: decimal.
- dpi: integer.
- card_type: CardType.
- side: text. Examples: front, back.
- source_document: text. Example: Epoch-Fronts.pdf.
- page_number: integer nullable.
- checksum: text.
- print_status: PrintStatus.
- notes: text.
- created_at: datetime.
- updated_at: datetime.

Current print-art dimensions observed: 59x89mm cards, PDF media box approximately 167.25 x 252 pt, with embedded raster art around 820 x 1229 px.

### deck_manifest

Defines a printable/playable deck.

Fields:

- id: string primary key.
- name: text, required.
- version_label: text.
- notes: text.
- created_at: datetime.
- updated_at: datetime.

### deck_manifest_item

Fields:

- manifest_id: foreign key to deck_manifest.
- card_type: CardType.
- card_id: string, required.
- quantity: integer, required.

Validation:

- Default manifest should include 9 Muse cards, 90 Epoch cards, 150 Artist cards, and 64 Action cards.

### playtest_session

Fields:

- id: string primary key.
- played_at: datetime.
- player_count: integer, required, allowed 2-9.
- rules_version_id: foreign key to rules_version.
- deck_manifest_id: foreign key to deck_manifest.
- status: PlaytestStatus.
- duration_minutes: integer.
- end_condition: text. Examples: Epoch Threshold, Action Deck Exhausted, Other.
- notes: text.
- created_at: datetime.
- updated_at: datetime.

### playtest_player

Fields:

- id: string primary key.
- session_id: foreign key to playtest_session.
- player_name: text.
- muse_id: foreign key to muse.
- final_score: integer.
- final_epoch_count: integer.
- placement: integer.
- notes: text.

### playtest_feedback

Fields:

- id: string primary key.
- session_id: foreign key to playtest_session.
- card_type: CardType nullable.
- card_id: string nullable.
- rule_section_id: string nullable.
- severity: text. Examples: Note, Confusing, Blocking, Balance Concern.
- feedback_text: text, required.
- created_at: datetime.

## Core Features

### Game Mode

Requirements:

- Start a local game with one human user and three NPC players.
- Shuffle Artist, Epoch, and Action decks.
- Deal 5 Artists, 5 Epochs, and 3 Actions to each player.
- Roll dice for Muse selection order; each Muse can only be selected once.
- Show current phase, current player, decks, discards, player hands, tableaus, scores, and action log.
- Enforce turn flow, tableau rules, scoring, and end conditions as the engine matures.

Acceptance criteria:

- A user can start a digital Xanadu game from the first screen.
- The game creates a valid initial state with unique Muses, dealt hands, shuffled decks, and visible turn order.
- Game Mode remains the first navigation item and primary experience.

### Card Library

Requirements:

- Browse all cards by type.
- Filter Artists by Epoch, type, highest Muse score, and print status.
- Filter Epochs by name, date range, and print status.
- Filter Action cards by category and timing.
- View a detailed card page with all structured fields and linked assets.
- Show duplicate warnings for cards with the same name and Epoch unless marked intentional.

Acceptance criteria:

- A user can find any known Artist by name in under three interactions.
- A user can view all scoring values for an Artist without opening another page.
- Missing assets and missing scores are visibly flagged.

### Rules Reference

Requirements:

- Display rules sections in game order.
- Provide searchable glossary.
- Keep rules tied to a version.
- Highlight player-count setup differences:
  - 2-3 players: first to 5 Epochs or Action deck exhausted.
  - 4-9 players: first to 4 Epochs or Action deck exhausted.

Acceptance criteria:

- A host can find setup instructions, turn sequence, and scoring rules from the rules home screen.
- Glossary terms are searchable and link back to relevant sections where useful.

### Scoring Helper

Requirements:

- Select a Muse.
- Add one or more Epoch + Artist sets.
- Validate that each Artist belongs to the selected Epoch or clearly warn when it does not.
- Show each Artist's score for the selected Muse.
- Sum total score.
- Support tiebreaker workflow: tied players draw an Artist card and compare score for their Muse.

Acceptance criteria:

- A user can calculate a final score for one player without needing to know the database structure.
- Invalid sets are clearly identified and not silently included.

### Setup and Turn Guide

Requirements:

- Select player count.
- Show setup steps:
  - Separate Muse, Epoch, Artist, and Action cards.
  - Display Muse cards face up.
  - Shuffle Epoch, Artist, and Action decks separately.
  - Deal 3 Action cards, 5 Epoch cards, and 5 Artist cards to each player.
  - Roll dice for Muse selection order.
- Show turn flow:
  - Draw Action card.
  - Resolve Play Immediately cards.
  - Play or hold Action card according to timing.
  - Play valid Epoch + Artist or Artist onto existing Epoch.
  - Maintain 3-5 Action cards.
  - Pass clockwise.

Acceptance criteria:

- The guide adjusts the game-end threshold based on player count.
- The guide makes Play Immediately behavior clear.

### Playtest Log

Requirements:

- Create playtest session with player count, date, deck manifest, and rules version.
- Add players and selected Muses.
- Record final score, Epoch count, placement, end condition, duration, and notes.
- Add feedback tied to cards or rules.
- Summarize Muse win rates and average scores over time.

Acceptance criteria:

- Designer can identify recurring balance concerns for a specific Muse, card, or rule.
- Playtests remain comparable by rules version and deck manifest.

### Print Production Dashboard

Requirements:

- Show current deck counts by card type.
- Track source files and assets.
- Flag missing front/back art.
- Validate dimensions for 59x89mm output.
- Export deck manifest and production checklist.

Acceptance criteria:

- Dashboard warns if deck counts do not match 9 Muses, 90 Epochs, 150 Artists, and 64 Actions.
- Dashboard shows which cards are not print ready.

## Validation Rules

Required validations:

- Every Artist has a valid Epoch.
- Every Artist has exactly nine Muse scores.
- Artist scores are integers from 0 to 3.
- Every Muse name referenced by scoring exists.
- Every Epoch in Artist records exists in the Epoch table.
- Every card has a print status.
- Deck manifest quantities match design targets.
- Duplicate Artist name + Epoch pairs require intentional duplicate approval.
- Print assets must report expected card dimensions.
- Fate Action cards must define exactly six dice outcomes.
- Rules version used in a playtest must exist.

## Import Plan

### Source Documents

- `Xanadu Muses of Inspiration Instructions.docx`: seed rules, glossary, setup, game-end conditions, and example turn.
- `MuseCardsPrint1.docx`: seed Muse card images and Muse names/descriptions.
- `Artist Card Merge.docx`: seed Artist records and Muse scoring.
- `Epoch-Fronts.pdf`: seed 30 Epoch front assets.
- `Epoch-Back.pdf`: seed Epoch back asset.
- `Muse-Back.pdf`: seed Muse back asset.

### Import Requirements

- Preserve original source paths in asset records.
- Generate stable IDs from normalized names.
- Produce an import report with created, skipped, duplicate, and failed rows.
- Do not overwrite manually edited content without explicit confirmation in the import command.

## Phased Implementation Plan

### Phase 1: Repository and Data Foundation

- Initialize app framework.
- Add TypeScript, linting, formatting, and test runner.
- Add SQLite database and schema migrations.
- Add seed data for Muses, Epochs, Artists, and rules.
- Add validation service and command-line report.

Deliverable: developer can run validation and see known content issues.

### Phase 2: Playable Game Foundation

- Create Game Mode as the primary app experience.
- Implement local 1 human plus 3 NPC setup.
- Implement shuffled decks, dealt hands, dice rolls, Muse selection order, game state display, and action log.
- Add tests for game setup and unique Muse selection.

Deliverable: a player can start a digital game and reach the first turn with valid state.

### Phase 3: Turn and Tableau Engine

- Implement draw Action, Play Immediately handling, optional Action play, Epoch + Artist play, Artist attachment, hand refill, and clockwise turn passing.
- Enforce Epoch/Artist matching and one Artist per turn unless modified.
- Update scores dynamically from tableau.

Deliverable: a player can complete legal turns with visible scoring.

### Phase 4: Action Engine and End Game

- Implement modular Action handlers, Fate dice outcomes, manual-resolution fallback, action log entries, end triggers, winner calculation, and tiebreakers.

Deliverable: a local digital game can be played to completion.

### Phase 5: Companion Console

- Build main shell navigation.
- Implement card list and detail screens.
- Implement rule sections and glossary search.
- Add asset preview support.
- Add basic responsive layout.

- Add playtest sessions.
- Add players, selected Muses, final scores, and end conditions.
- Add card/rule feedback.
- Add summary reports for Muse balance and recurring issues.

Deliverable: game iteration decisions can be based on tracked playtest data.

### Phase 6: Print Production Support

- Add asset dashboard.
- Add deck manifest editor.
- Add print-readiness checklist.
- Add export for production CSV/JSON.
- Add card count and dimension validation.

Deliverable: designer can confirm a deck is ready before print export.

### Phase 7: Public Playable Polish

- Add player-facing Game Mode visual polish.
- Add offline-friendly static build or service worker if needed.
- Add help states and empty states.
- Add accessibility pass.
- Add release build and deployment instructions.

Deliverable: companion app can be shared with playtesters or customers.

## Testing Strategy

Unit tests:

- Scoring calculations.
- Set validation.
- Deck count validation.
- Import normalization.
- Duplicate detection.

Integration tests:

- Seed database creation.
- Card search and filters.
- Rules version lookup.
- Playtest creation and summary reports.

UI tests:

- Card library loads with seeded content.
- Scoring helper totals a valid hand.
- Setup guide changes end condition by player count.
- Validation dashboard flags missing fields.

Manual QA:

- Verify print assets visually.
- Confirm mobile layout for rules and scoring.
- Run a real playtest using only the companion for scoring/reference.
