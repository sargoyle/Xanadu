# Xanadu Tasks

## Operating Rules

- Before beginning any response to the user, say "Xanadu!"
- Always read project documentation in the `/docs` folder before starting work.
- Treat `docs/masterplan.md` and `docs/tasks.md` as the source of truth.
- Every time tasks are completed:
  - Mark them done in this file.
  - Tell the user what was completed.
  - Tell the user how to test it.
  - Tell the user the next step.

## Task List

- [x] Create persistent project task ledger and record operating rules.
- [x] Build the Xanadu application foundation described in `docs/implementation.md`.
- [x] Create `docs/rules.md` as the project-wide decisions source of truth.
- [x] Create `docs/changelog.md` for historical change tracking.
- [x] Record digital-game decisions for Action deck size, tableau rules, Muse selection, NPC mode, and TypeScript engine direction.
- [x] Seed canonical Muse, Epoch, Artist, Action, rules, and glossary data.
- [x] Build card library and rules reference.
- [x] Build scoring helper and setup companion.
- [x] Add playtest logging and balance reports.
- [x] Move Xanadu preview default to port `4184` without changing Meal Tracker on `4173`.
- [x] Add supplied Muse card front/back artwork and normal playing-card preview sizing.
- [x] Reframe the product around primary Game Mode and secondary Companion Mode.
- [x] Add the first primary Play screen with local game setup, dealt hands, Muse selection, deck counts, player order, and action log.
- [x] Implement first playable turn flow in Game Mode.
- [x] Implement legal Epoch + Artist play and tableau attachment in Game Mode.
- [x] Implement first Action card engine and manual-resolution fallback in Game Mode.
- [x] Implement Game Mode scoring, end conditions, and winner detection.
- [x] Add NPC turn automation for local solo play.
- [x] Promote PLAY as the top-level primary navigation item and expand the Play screen into a complete playable board loop.
- [x] Harden the complete Game Mode loop from setup through turns, Action refills, scoring, and winner declaration.
- [x] Add automatic Game Mode tiebreaker winner resolution at end game.
- [x] Separate Game Mode and Companion Mode navigation, and move Rules into Game Mode.
- [x] Confirm and align `docs/rules.md` with the project-wide rules and decisions template.
- [x] Convert Game Mode cards into fixed-ratio physical tabletop card components.
- [x] Add direct Play Mode card inspection, double-click play, drag/drop tableau play, and card movement animation.
- [x] Add a focused Muse Deck viewer with physical-card flip controls using supplied Muse artwork.
- [x] Revise the Muse Deck viewer into a tabletop draw pile with persistent independently flippable dealt cards.
- [x] Update Muse Deck dealing so cards land face up and full artwork remains contained without cropping.
- [x] Add an Epoch Deck viewer using supplied Epoch front/back artwork with three physical copies of each Epoch card.
- [x] Fix Shuffle / Restart deck behavior to randomize physical deck order globally.
- [x] Build the Artist Card system with premium physical fronts, Artist back artwork, prompt-ready placeholder art, Muse score grids, and a 150-card tabletop deck viewer.

## Backlog

- [ ] Expand Action handlers for steal, swap, protect, cancel, and discard effects.
- [ ] Add richer card-targeting UI for player interaction Actions.
- [ ] Add print production dashboard and validation after playable Game Mode is stable.
