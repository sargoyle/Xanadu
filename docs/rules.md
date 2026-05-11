# Project Rules & Decisions

This file is the single source of truth for all project-wide decisions. Update it immediately when any decision is made.

## How to use this file

- Every architecture choice, naming convention, or design pattern we agree on goes here
- Every business rule or constraint gets documented here
- If a decision overrides a previous one, update the entry (don't duplicate)
- Group entries by category for easy scanning

## Categories to track:

- **Architecture** — Tech stack choices, folder structure, state management approach
- **Naming Conventions** — Component names, file names, database columns, API routes
- **Design Patterns** — Reusable patterns, component composition rules, styling approach
- **Business Logic** — Validation rules, access control, feature flags, pricing logic
- **Integrations** — Third-party services, API keys needed, webhook configurations

Keep entries concise. One line per decision when possible.

## Architecture

- Xanadu has two product modes: Game Mode is primary, and Companion Mode is secondary.
- Game Mode is where users play the digital card game with turns, hands, tableau, actions, scoring, and win conditions.
- Game Mode navigation contains `PLAY` and player-facing `Rules`.
- Companion Mode contains card browsing, scoring helper, playtest logging, balance tools, and print/export utilities.
- Do not expand Companion Mode dashboards until playable Game Mode foundations are implemented.
- Build Xanadu as a local-first web application that supports the physical tabletop game without requiring a screen during normal play.
- Use dependency-free Node scripts for the initial foundation until package installation is available or explicitly requested.
- Use TypeScript for the playable game engine because typed card models, state transitions, and action payloads are more robust than plain JavaScript.
- Keep the game engine pure and UI-independent so it can support local NPC play first and future online multiplayer later.
- Initial playable digital mode is 1 human user versus 3 NPC players.
- Game Mode may support 2-9 local players; the initial UI controls one human and automates all other seats as NPCs.
- Future architecture should allow online multiplayer, but initial implementation should not require networking.
- Store canonical seed content in `data/seed.json`.
- Keep SQLite-ready database structure in `db/schema.sql`.
- Keep framework-independent domain logic in `src/domain`.
- Keep browser-facing static app files in `public`.
- Keep local tooling scripts in `scripts`.
- Keep tests in `tests`.
- Use port `4184` for the Xanadu local preview; port `4173` is reserved for Meal Tracker.

## Naming Conventions

- Use `Xanadu: Muses of Inspiration` as the full product name and `Xanadu` as the short name.
- Use uppercase enum values for card types: `MUSE`, `EPOCH`, `ARTIST`, `ACTION`.
- Use lowercase kebab-case stable IDs for cards, rules, and glossary terms.
- Use camelCase in JSON seed data and snake_case in SQL database columns.
- Name task and PRD documentation files with lowercase kebab-case or simple lowercase names under `docs`.

## Design Patterns

- The first screen and first navigation item must be the top-level `PLAY` Game Mode, not the companion dashboard.
- Use the card artwork as the primary visual focus and keep the interface quieter than the cards.
- Preserve the 59:89 card aspect ratio for card thumbnails and previews.
- Muse card previews use the supplied front artwork and shared back asset at the normal playing-card proportion of 63.5 x 88.9 mm.
- Game Mode cards must render as fixed-ratio physical tabletop cards, not dashboard tiles, records, articles, or detail-page previews.
- Game Mode card zones should use tactile tabletop behavior: fanned hands, overlapping tableau stacks, visible card backs, hover lift, inspect scaling, and animated movement between zones where practical.
- Card typography, frames, artwork, score hints, and rules text belong inside the card face; external labels should only identify zones or pile counts.
- Play Mode card interactions should happen directly on cards: click to inspect/select, double-click or drag to play, and drop playable cards onto the tableau instead of opening separate gameplay detail screens.
- The Muse Deck viewer is a focused tabletop draw-pile simulation that uses supplied Muse front/back artwork directly, keeps dealt cards visible on the table, and must not add card-library metadata panels or gameplay rule/scoring UI.
- Muse Deck viewer cards deal face up by default, remain independently flippable, and must use `object-fit: contain` so full supplied card artwork is visible without cropping.
- Physical deck viewers should use shared draw-pile/dealt-card behavior for Muse, Epoch, and future Artist/Action decks while keeping each deck visually separate.
- Every button or action labelled `Shuffle` must use a real random shuffle, reset dealt cards, reset card state, and avoid mutating the original source card array.
- The Epoch Deck viewer uses extracted card images from the supplied Epoch front/back PDFs, creates three copies of each of the 30 Epoch fronts, and deals a 90-card physical deck.
- The Artist Deck viewer uses the supplied Artist back artwork and renders generated premium physical fronts from canonical Artist data until final artwork files are available.
- Artist card fronts use fixed internal rows of 14% name, 34% artwork, 24% Epoch/type/flavour, and 24% nine-Muse score grid to prevent overflow inside the physical frame.
- Artist card names must be centered, clamp to a maximum of two lines, and use smaller type for long names.
- Artist card info panels must clearly label `EPOCH` and `TYPE`, with the Epoch value more visually prominent than Type.
- Artist Muse score grids must show full Muse names, include a `MUSES` header cell, and use a compact 2-column by 5-row layout.
- Artist cards must support `artworkPath` for future artwork files and `artworkPrompt` for prompt-only image generation support; the app must not call image APIs automatically.
- Artist deck dealing uses the shared physical deck component with a 150-card deck, face-up dealt cards, independent flipping, persistent table layout, and real shuffle/restart behavior.
- The Action Deck viewer uses the supplied Action back artwork and renders 64 physical Action card fronts from canonical Action seed data.
- Action card fronts follow the theatrical `Applause Break` direction: large centered title, one subtle category line, optional flavour, prominent effect text, and decorative footer only.
- Action category/type may appear once on the card face; do not repeat it in the artwork area, effect area, or footer.
- Fate Dice Action cards use a distinct layout with one die motif and vertically stacked outcomes so dice rules remain readable and are never cramped into columns.
- Action card titles must fit within two lines without clipping; Fate Dice outcome rows must not use arrows and should use clean numbered rows with comfortable spacing.
- Game Mode Fate Dice Actions must animate a premium D6 roll, store the rolled value before settling, prevent duplicate rolls while active, respect reduced-motion preferences, then apply the matching outcome.
- Action cards must support `artworkPath` for future artwork files and `artworkPrompt` for prompt-only image generation support; the app must not call image APIs automatically.
- Action deck dealing uses the shared physical deck component with a 64-card deck, face-up dealt cards, independent flipping, persistent table layout, and real shuffle/restart behavior.
- Use the palette from `docs/design.md`: Midnight Ink, Parchment, Antique Gold, Ivory, Deep Plum, and restrained secondary accents.
- Use clear status labels alongside color; never rely on color alone.
- Use player-facing screens for rules, setup, scoring, and lookup; expose validation and source-path details only in development workflows.

## Business Logic

- Xanadu supports 2-9 players.
- Muse selection is user choice in order from highest dice roll to lowest; each Muse can be selected by only one player.
- For 2-3 players, the game ends at first to 5 Epochs or when the Action deck is exhausted.
- For 4-9 players, the game ends at first to 4 Epochs or when the Action deck is exhausted.
- A valid scoring set requires a Muse, an Epoch, and an Artist associated with that Epoch.
- Multiple Artists can be attached to the same Epoch.
- Artist scores must exist for all nine Muses.
- Artist score values must be integers from 0 to 3.
- Player score is the sum of each tableau Artist's value for that player's Muse.
- If Game Mode ends with tied high scores, tied players automatically draw Artist tiebreaker cards until one highest Muse value remains or the Artist deck cannot continue.
- The target core deck contains 9 Muse cards, 90 Epoch cards, 150 Artist cards, and 64 Action cards.
- The 64-card Action deck distribution is 22 bonus, 10 fate, 10 disruption, 14 swap, and 8 group.
- Duplicate Artist name and Epoch pairs must be marked intentional or flagged for review.
- Fate cards must define exactly 6 dice outcomes.
- Action design should favor strategy over chaos and avoid hard resets.
- The first Action engine resolves simple draw, Fate dice, and extra-Artist effects automatically; complex Actions use manual-resolution log fallback until dedicated handlers exist.
- Game Mode must allow both manual card selection and an `Auto Play Legal Set` helper so a local game can always progress during digital playtesting.
- Every card must have a print status.

## Integrations

- No third-party services, API keys, payment providers, or webhook integrations are approved for the initial foundation.
- Existing source assets are local files from the Xanadu project folder and should be imported without overwriting manual edits unless explicitly confirmed.
