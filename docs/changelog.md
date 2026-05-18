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
- 2026-05-12: Added a Studio/Admin Dice Roll Tester with the shared animated D6, roll button, stored result display, recent result history, and test value mapping. Files affected: `public/index.html`, `public/app.js`, `public/styles.css`, `docs/rules.md`, `docs/tasks.md`, `docs/changelog.md`.

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
- 2026-05-12: Refined Action card type/icon layout by removing the small category-line icon, adding large engraved motifs to standard Action cards, and vertically balancing title placement above the type label. Files affected: `public/app.js`, `public/styles.css`, `docs/rules.md`, `docs/tasks.md`, `docs/changelog.md`.
- 2026-05-12: Reframed the app as game-first by moving deck viewers into Studio/Admin navigation and rebuilding the Play page as a tabletop shell with header, score/status, table, hand, turn, and log zones. Files affected: `public/index.html`, `public/app.js`, `public/styles.css`, `docs/rules.md`, `docs/tasks.md`, `docs/changelog.md`.
- 2026-05-12: Polished Action card category motifs by centering icons, normalizing the Swap/Steal circular frame, and replacing the Group/Party placeholder icon with a celebratory spark. Files affected: `public/app.js`, `public/styles.css`, `docs/rules.md`, `docs/tasks.md`, `docs/changelog.md`.
- 2026-05-12: Reworked the Play page away from a setup-dashboard feel into a digital tabletop layout with compact HUD, central playmat, deck/discard zone, current card spot, player areas, bottom hand dock, and side action panel. Files affected: `public/index.html`, `public/app.js`, `public/styles.css`, `docs/rules.md`, `docs/tasks.md`, `docs/changelog.md`.
- 2026-05-12: Converted the app from left navigation to a compact top navigation bar and reworked Play into a single-screen poker-table-style layout with player seats around a central table, opponent card backs, and a bottom current-player hand. Files affected: `public/index.html`, `public/app.js`, `public/styles.css`, `docs/rules.md`, `docs/tasks.md`, `docs/changelog.md`.
- 2026-05-12: Changed New Game into a step-based setup modal with player setup, dice-order display, modal Muse selection, starting-hand confirmation, and clean return to the Play table. Files affected: `public/index.html`, `public/app.js`, `public/styles.css`, `docs/rules.md`, `docs/tasks.md`, `docs/changelog.md`.
- 2026-05-12: Changed Play Mode hand, tableau, selected-card preview, and pile rendering to reuse the final physical card faces and type-specific deck backs instead of simplified placeholder card designs. Files affected: `public/app.js`, `public/styles.css`, `docs/rules.md`, `docs/tasks.md`, `docs/changelog.md`.
- 2026-05-12: Changed Play into a constrained one-screen tabletop layout with a compact HUD, always-visible smaller hand, non-overlapping player zones, internal log scrolling, and selected Action controls for play, discard, cancel, Fate roll, and resolve/discard. Files affected: `public/index.html`, `public/app.js`, `public/styles.css`, `docs/rules.md`, `docs/tasks.md`, `docs/changelog.md`.
- 2026-05-13: Refined Play layout proportions to prevent hand-card clipping, expanded the central table area, added selected-card metadata and panel actions, hid unavailable turn buttons, and routed Action commands through shared handlers. Files affected: `public/app.js`, `public/styles.css`, `docs/rules.md`, `docs/tasks.md`, `docs/changelog.md`.
- 2026-05-13: Rebuilt the Play page into a stable 3-row game app with grid-defined player seats, a larger central playmat, fixed bottom hand dock, and functional Action-card command execution. Files affected: `public/app.js`, `public/styles.css`, `docs/rules.md`, `docs/tasks.md`, `docs/changelog.md`.
- 2026-05-13: Renamed the local project workspace folder from `New project 3` to `Xanadu`. Files affected: `docs/rules.md`, `docs/tasks.md`, `docs/changelog.md`, workspace folder path.
<<<<<<< HEAD
- 2026-05-13: Configured Vercel static deployment to run a build step, serve `public` as the output directory, and generate `public/data/seed.json` from canonical seed data so deployed card and dice UI can initialize. Files affected: `package.json`, `scripts/prepare-static.mjs`, `vercel.json`, `.gitignore`, `docs/rules.md`, `docs/tasks.md`, `docs/changelog.md`.
- 2026-05-13: Hard-reset Play layout rules into a strict HUD/table/hand shell, removed the extra player summary from layout flow, enlarged shared deck/discard zones, and tightened Action discard state cleanup. Files affected: `public/app.js`, `public/styles.css`, `docs/rules.md`, `docs/tasks.md`, `docs/changelog.md`.
=======
>>>>>>> ec7ce1539c0e444f2da1d1106a7815a4ebcb184d

### Fixed

- 2026-05-11: Fixed Artist card layout overflow by clamping long names to two lines, switching score cells to full Muse names, and using fixed internal card sections that stay inside the poker-card frame. Files affected: `public/app.js`, `public/styles.css`, `docs/rules.md`, `docs/tasks.md`, `docs/changelog.md`.
- 2026-05-12: Fixed Play page layout containment so the sticky top navigation no longer hides table content and setup controls no longer spill over the board. Files affected: `public/index.html`, `public/app.js`, `public/styles.css`, `docs/rules.md`, `docs/tasks.md`, `docs/changelog.md`.
- 2026-05-13: Fixed current-player hand scaling for generated Artist and Action card faces so their final physical designs fit inside the smaller hand cards without clipped typography. Files affected: `public/styles.css`, `docs/rules.md`, `docs/tasks.md`, `docs/changelog.md`.
- 2026-05-13: Retuned small-hand scaling separately for Artist and Action generated card faces so text-heavy fronts fit more naturally without replacing final card designs. Files affected: `public/styles.css`, `docs/tasks.md`, `docs/changelog.md`.
- 2026-05-13: Enlarged Play hand cards and added stronger hover inspection scaling so Artist and Action cards can be read more clearly from the hand. Files affected: `public/styles.css`, `docs/tasks.md`, `docs/changelog.md`.
- 2026-05-13: Condensed Play hand card piles at rest and added hover/focus scroll trays so each card type can be browsed independently without overlapping neighbouring piles. Files affected: `public/styles.css`, `docs/tasks.md`, `docs/changelog.md`.
- 2026-05-13: Increased expanded Play hand tray height, active-pile card size, and hovered-card scale to improve readability while browsing condensed card piles. Files affected: `public/styles.css`, `docs/tasks.md`, `docs/changelog.md`.
- 2026-05-13: Allowed expanded Play hand trays and highlighted hand cards to render beyond the hand section instead of being clipped by parent containers. Files affected: `public/styles.css`, `docs/tasks.md`, `docs/changelog.md`.
- 2026-05-13: Restyled New Game setup as a wider game-style modal with a vertical step rail, dark tabletop player seat cards, improved spacing, and a responsive stacked fallback. Files affected: `public/app.js`, `public/styles.css`, `docs/tasks.md`, `docs/changelog.md`.
- 2026-05-13: Revised New Game setup to remove the left step rail, use compact top steps, replace pale inherited panels with dark playmat panels, and upgrade player setup boxes with stronger tabletop seat styling. Files affected: `public/styles.css`, `docs/tasks.md`, `docs/changelog.md`.
- 2026-05-13: Fixed New Game player setup card spacing by giving each player card a proper minimum width, full-width name row, and wrapped stat layout to prevent overlap. Files affected: `public/styles.css`, `docs/tasks.md`, `docs/changelog.md`.
- 2026-05-13: Converted New Game Step 1 player setup from card blocks to compact rows matching the Muse order step, and moved the player-count selector into the Step 1 header area. Files affected: `public/app.js`, `public/styles.css`, `docs/tasks.md`, `docs/changelog.md`.
- 2026-05-18: Added New Game Back/Next navigation and simplified Step 1 rows to only game-creation fields while keeping player names editable when returning to earlier setup pages. Files affected: `public/index.html`, `public/app.js`, `public/styles.css`, `docs/tasks.md`, `docs/changelog.md`.
- 2026-05-18: Tightened New Game Step 1 into a leaner setup list with shorter header spacing, compact player rows, and no repeated seat/type fields. Files affected: `public/app.js`, `public/styles.css`, `docs/tasks.md`, `docs/changelog.md`.

### Removed

- 2026-05-12: Removed Card Library and Print from Studio/Admin navigation and removed their visible UI routes while preserving card data, card components, and physical deck viewers. Files affected: `public/index.html`, `public/app.js`, `docs/rules.md`, `docs/tasks.md`, `docs/changelog.md`.

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
