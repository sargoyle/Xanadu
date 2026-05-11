# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added

- 2026-05-06: Initial project setup. Files affected: `docs/masterplan.md`, `docs/implementation.md`, `docs/design.md`, `docs/app-flow.md`, `docs/tasks.md`, `docs/rules.md`, `README.md`, `package.json`, `data/seed.json`, `db/schema.sql`, `public/`, `scripts/`, `src/domain/`, `tests/`.
- 2026-05-06: Created changelog documentation and update rules. Files affected: `docs/changelog.md`, `docs/tasks.md`.
- 2026-05-06: Recorded digital-game decisions for 64 Action cards, multiple Artists per Epoch, dice-order Muse selection, 1 human plus 3 NPC initial mode, future online multiplayer, and TypeScript engine direction. Files affected: `docs/rules.md`, `docs/tasks.md`, `docs/changelog.md`.
- 2026-05-06: Seeded canonical game data with 9 Muses, 30 unique Epochs/90 copies, 150 Artists with nine Muse scores each, 64 Actions, rules sections, and glossary terms. Files affected: `data/seed.json`, `src/domain/constants.mjs`, `src/domain/validation.mjs`, `tests/run-tests.mjs`, `db/schema.sql`, `docs/implementation.md`, `docs/tasks.md`, `docs/changelog.md`.
- 2026-05-06: Built the card library and rules reference with card type tabs, search, filters, detail panels, Artist score tables, related-card lists, searchable rules, and glossary cards. Files affected: `public/index.html`, `public/app.js`, `public/styles.css`, `docs/app-flow.md`, `docs/tasks.md`, `docs/changelog.md`.
- 2026-05-06: Built the setup companion and scoring helper with player count setup, dice rolls, Muse selection, setup steps, set scoring, invalid-set warnings, player totals, and Artist Duel tiebreakers. Files affected: `public/index.html`, `public/app.js`, `public/styles.css`, `docs/tasks.md`, `docs/changelog.md`.
- 2026-05-06: Added playtest logging and balance reports with local session storage, score-sheet capture, session details, feedback notes, playtest history, and Muse balance summaries. Files affected: `public/index.html`, `public/app.js`, `public/styles.css`, `docs/tasks.md`, `docs/changelog.md`.
- 2026-05-06: Moved Xanadu's default local preview port to `4184` and documented that `4173` remains reserved for Meal Tracker. Files affected: `scripts/dev-server.mjs`, `README.md`, `docs/rules.md`, `docs/tasks.md`, `docs/changelog.md`.
- 2026-05-06: Added supplied Muse card front/back artwork, card-detail image previews, PNG serving, and 63.5 x 88.9 mm display sizing. Files affected: `data/seed.json`, `public/assets/muses/`, `public/app.js`, `public/styles.css`, `scripts/dev-server.mjs`, `docs/rules.md`, `docs/tasks.md`, `docs/changelog.md`.
- 2026-05-06: Added primary Game Mode / Play screen with local game setup, dealt hands, dice-order Muse selection, deck counts, player order, and action log foundation. Files affected: `public/index.html`, `public/app.js`, `public/styles.css`, `docs/masterplan.md`, `docs/implementation.md`, `docs/app-flow.md`, `docs/rules.md`, `docs/tasks.md`, `docs/changelog.md`.
- 2026-05-08: Implemented the first interactive Game Mode loop with 2-9 player setup, selectable hand cards, turn controls, Action draws, Action resolution fallback, legal Epoch + Artist play, tableau attachment, NPC turns, live scoring, and end-game winner detection. Files affected: `public/index.html`, `public/app.js`, `public/styles.css`, `docs/rules.md`, `docs/tasks.md`, `docs/changelog.md`.
- 2026-05-10: Promoted `PLAY` as the top-level primary navigation item and expanded the Play screen with editable player setup, Muse-selection status, deck and discard piles, turn order, current scores, tableau, current hand display, turn controls, and action log. Files affected: `public/index.html`, `public/app.js`, `public/styles.css`, `docs/rules.md`, `docs/tasks.md`, `docs/changelog.md`.
- 2026-05-10: Hardened the complete Game Mode loop with an auto-play legal set helper, logged Action hand refills, shared tableau-play handling for human/NPC turns, automatic tied-score Artist tiebreakers, and richer game-over winner and final-score display. Files affected: `public/app.js`, `public/styles.css`, `docs/rules.md`, `docs/tasks.md`, `docs/changelog.md`.
- 2026-05-10: Separated Game Mode and Companion Mode navigation, moved Rules into Game Mode, and relabeled the Rules page as a player-facing gameplay reference. Files affected: `public/index.html`, `public/styles.css`, `docs/rules.md`, `docs/tasks.md`, `docs/changelog.md`.
- 2026-05-11: Confirmed and aligned the project-wide rules and decisions template in `docs/rules.md`. Files affected: `docs/rules.md`, `docs/tasks.md`, `docs/changelog.md`.
- 2026-05-11: Added a focused Muse Deck viewer with one physical flip card, supplied Muse front/back artwork, next/previous/restart controls, progress text, and keyboard support. Files affected: `public/index.html`, `public/app.js`, `public/styles.css`, `docs/rules.md`, `docs/tasks.md`, `docs/changelog.md`.
- 2026-05-11: Added an Epoch Deck viewer with extracted Epoch PDF artwork, a separate face-down deck pile, 90-card three-copy deck, face-up dealing, independent flipping, deck status, and restart controls. Files affected: `public/assets/epochs/`, `public/index.html`, `public/app.js`, `public/styles.css`, `docs/rules.md`, `docs/tasks.md`, `docs/changelog.md`.
- 2026-05-11: Added the Artist Card system with supplied Artist back artwork, premium generated Artist fronts, placeholder artwork support, prompt-only artwork metadata, Muse score grids, and a 150-card physical deck viewer. Files affected: `public/assets/artists/`, `public/index.html`, `public/app.js`, `public/styles.css`, `docs/rules.md`, `docs/tasks.md`, `docs/changelog.md`.
- 2026-05-11: Added the Action Card system with supplied Action back artwork, burgundy/gold physical card fronts, category badges, timing/effect panels, Fate dice outcome panels, prompt-only artwork metadata, and a 64-card physical deck viewer. Files affected: `public/assets/actions/`, `public/index.html`, `public/app.js`, `public/styles.css`, `docs/rules.md`, `docs/tasks.md`, `docs/changelog.md`.
- 2026-05-11: Added animated Game Mode Fate Dice rolling with a burgundy/gold D6, stored roll state/history, spam prevention during rolling, reduced-motion support, and outcome application after the die settles. Files affected: `public/index.html`, `public/app.js`, `public/styles.css`, `docs/rules.md`, `docs/tasks.md`, `docs/changelog.md`.

### Changed

- 2026-05-06: Reclassified the existing dashboard as secondary Companion Mode and redirected backlog priorities toward playable Game Mode before further dashboard expansion. Files affected: `public/index.html`, `docs/masterplan.md`, `docs/implementation.md`, `docs/app-flow.md`, `docs/rules.md`, `docs/tasks.md`, `docs/changelog.md`.
- 2026-05-11: Changed Game Mode card rendering from UI tiles to fixed-ratio tabletop card components with framed faces, real back artwork, fanned hands, stacked tableaus, tactile hover states, and deck/discard piles. Files affected: `public/app.js`, `public/styles.css`, `docs/rules.md`, `docs/tasks.md`, `docs/changelog.md`.
- 2026-05-11: Changed Play Mode interaction so cards act as direct game objects with click inspection, double-click play, drag/drop tableau placement, drop-zone feedback, and movement animation. Files affected: `public/app.js`, `public/styles.css`, `docs/rules.md`, `docs/tasks.md`, `docs/changelog.md`.
- 2026-05-11: Changed the Muse Deck viewer from a one-card slideshow into a tabletop draw-pile experience with persistent dealt cards, independent flipping, deck status, and restart behavior. Files affected: `public/index.html`, `public/app.js`, `public/styles.css`, `docs/rules.md`, `docs/tasks.md`, `docs/changelog.md`.
- 2026-05-11: Changed Muse Deck dealing so cards land face up by default and resized contained image rendering to keep full Muse card artwork visible. Files affected: `public/app.js`, `public/styles.css`, `docs/rules.md`, `docs/tasks.md`, `docs/changelog.md`.
- 2026-05-11: Changed physical deck viewer logic to share draw-pile, dealt-card, flip, status, and restart behavior across Muse and Epoch decks. Files affected: `public/app.js`, `public/styles.css`.
- 2026-05-11: Changed all physical deck Shuffle / Restart actions to use real Fisher-Yates randomized deck orders, reset dealt cards, and preserve source card arrays. Files affected: `public/app.js`, `docs/rules.md`, `docs/tasks.md`, `docs/changelog.md`.
- 2026-05-11: Refined Artist card fronts with centered two-line names, stronger labelled Epoch/Type hierarchy, a `MUSES` header cell, 2-column/5-row score layout, and tighter info-panel spacing. Files affected: `public/app.js`, `public/styles.css`, `docs/rules.md`, `docs/tasks.md`, `docs/changelog.md`.
- 2026-05-11: Redesigned Action card fronts around the `Applause Break` theatrical reference, removing repeated category labels and UI-heavy panels while giving Fate Dice cards a single die motif and vertical outcome layout. Files affected: `public/app.js`, `public/styles.css`, `docs/rules.md`, `docs/tasks.md`, `docs/changelog.md`.
- 2026-05-11: Polished Action card typography by reducing and length-scaling titles, enlarging category labels, removing Fate Dice outcome arrows, shrinking the die motif, and increasing dice outcome spacing. Files affected: `public/app.js`, `public/styles.css`, `docs/rules.md`, `docs/tasks.md`, `docs/changelog.md`.

### Fixed

- 2026-05-11: Fixed Artist card layout overflow by clamping long names to two lines, switching score cells to full Muse names, and using fixed internal card sections that stay inside the poker-card frame. Files affected: `public/app.js`, `public/styles.css`, `docs/rules.md`, `docs/tasks.md`, `docs/changelog.md`.

---

**Format for new entries:**
- **Added** for new features
- **Changed** for changes in existing functionality
- **Fixed** for bug fixes
- **Removed** for removed features
- **Security** for security improvements

**Rules:**
- Add a new entry after every completed task or group of related tasks
- Include the date, a short description, and files affected
- This is a historical log — never edit or delete past entries
