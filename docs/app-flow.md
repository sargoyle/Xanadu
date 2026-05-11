# Xanadu App Flow

## Product Skeleton

The Xanadu app has two modes:

1. Game Mode: the primary playable digital card game.
2. Companion Mode: the secondary reference/admin console for card browsing, rules, scoring helper, playtest logging, balance, and print/export.

The same data powers both modes. Game Mode must be the first screen and the center of product development. Companion Mode should support play and production without expanding ahead of the playable game.

## Primary Navigation

Top-level destinations:

- Play
- Companion Home
- Cards
- Rules
- Scoring
- Playtests
- Print
- Settings

Mobile navigation should collapse into a drawer or bottom navigation with the same destinations.

## Global State

The app should maintain:

- Current game state.
- Current game phase.
- Current player.
- Player hands, tableau, decks, discards, scores, and action log.
- Current rules version.
- Current deck manifest.
- Selected player count.
- Selected Muse for scoring.
- Active scoring session.
- Current filters/search.
- Development mode visibility.

State persistence:

- Persist selected rules version and deck manifest locally.
- Persist incomplete scoring session locally until cleared.
- Persist unsaved playtest drafts.
- Do not persist transient validation filter state unless simple local UI persistence is already available.

## Journey 1: Player Starts A Digital Game

Goal: A player opens Xanadu and starts playing the digital card game.

Flow:

1. User opens Play.
2. User selects New Game.
3. App creates 1 human player and 3 NPC players.
4. App shuffles Artist, Epoch, and Action decks.
5. App deals 5 Artist, 5 Epoch, and 3 Action cards to each player.
6. App rolls dice for Muse selection order.
7. NPCs choose Muses automatically until the human player must choose.
8. User chooses one available Muse.
9. App completes remaining NPC Muse choices.
10. App enters first turn state.

Success state:

- A valid game state exists with players, unique Muses, hands, decks, tableau, current player, phase, and action log.

Edge cases:

- Dice ties: use deterministic tie ordering until a formal reroll rule is added.
- No available Muse: block further selection and report invalid state.
- Seed data missing a deck: block game start and show the missing deck.

## Journey 2: Player Takes A Turn

Goal: The current player completes a legal Xanadu turn.

Flow:

1. App highlights current player and phase.
2. Player draws 1 Action card.
3. If the Action is Play Immediately, app resolves it or opens manual resolution.
4. Player may play 1 eligible Action card.
5. Player plays Epoch + Artist or attaches Artist to an existing matching Epoch.
6. App enforces 1 Artist per turn unless modified.
7. App refills Action hand to minimum 3.
8. App passes turn clockwise.

Success state:

- Card movement, score updates, and the action log reflect the completed turn.

Edge cases:

- No legal Artist/Epoch play: player may pass.
- Complex Action not implemented: manual resolution records the result.
- Deck empty: trigger end-game evaluation if Action deck is exhausted.

## Journey 3: First-Time Host Learns the Game

Goal: A host opens the app and learns how to set up and teach Xanadu.

Flow:

1. User opens Dashboard.
2. User selects "Setup Guide."
3. App asks for player count, constrained to 2-9.
4. App displays setup steps:
   - Separate Muse, Epoch, Artist, and Action cards.
   - Display Muse cards face up.
   - Shuffle Epoch, Artist, and Action decks separately.
   - Deal 3 Action, 5 Epoch, and 5 Artist cards to each player.
   - Roll dice for Muse selection order.
5. App shows end condition based on player count:
   - 2-3 players: first to 5 Epochs or Action deck exhausted.
   - 4-9 players: first to 4 Epochs or Action deck exhausted.
6. User opens "Turn Overview."
7. App shows the normal turn sequence and Play Immediately behavior.

Success state:

- Host can begin play without reading the full rules document.

Edge cases:

- Player count below 2: show "Xanadu requires at least 2 players."
- Player count above 9: show "Xanadu supports up to 9 Muses/players."
- Missing rules version: fall back to latest approved version, or latest draft if no approved version exists.

## Journey 4: Player Looks Up a Card

Goal: A player wants to understand an Artist, Epoch, Muse, or Action card.

Flow:

1. User opens Cards.
2. User selects card type tab or uses global search.
3. User filters by Muse, Epoch, Action category, or print status if needed.
4. User selects a card.
5. App opens Card Detail.

Card Detail for Artist:

- Name.
- Epoch.
- Type.
- Description.
- Muse score table.
- Highest scoring Muses.
- Print status and asset status in development mode only.

Card Detail for Epoch:

- Name.
- Date range.
- Flavor text.
- Artwork.
- Related Artists.

Card Detail for Muse:

- Name.
- Domain.
- Description.
- Related high-scoring Artists.

Card Detail for Action:

- Name.
- Category.
- Timing.
- Rules text.
- Target/affected players.
- Dice outcomes if relevant.

Success state:

- User understands what the card does or how it scores.

Edge cases:

- No results: show empty result with option to clear filters.
- Missing card art: show a card-type fallback and development warning if applicable.
- Duplicate Artist names: show Epoch and duplicate marker to disambiguate.

## Journey 5: Player Scores a Game

Goal: Calculate final scores for one or more players.

Flow:

1. User opens Scoring.
2. User chooses "New Score Sheet."
3. User selects player count.
4. User adds players and selected Muses.
5. For each player, user adds completed sets:
   - Select Epoch.
   - Select Artist.
   - App validates the Artist belongs to the selected Epoch.
   - App retrieves Artist score for the player's Muse.
6. App displays per-set scores and total.
7. User marks final placements.
8. Optional: save as playtest session.

Success state:

- Final totals are clear and can be compared.

Validation states:

- Valid set: Epoch and Artist match; score included.
- Invalid set: Artist's favored Epoch differs; app warns and excludes from total unless rule override is enabled.
- Missing score: app blocks total calculation for that set and reports data issue.

Edge cases:

- Tied players: show tiebreaker prompt.
- No Muse selected: block set scoring until Muse is selected.
- Artist duplicated: require selecting the specific Artist record or show duplicate group.
- Incomplete set: allow draft row but exclude from final total.

## Journey 6: Tiebreaker Duel

Goal: Resolve tied final scores.

Flow:

1. App detects tie or user selects "Start Tiebreaker."
2. User selects tied players.
3. For each tied player, user selects or randomly draws an Artist card.
4. App compares each Artist's score for that player's Muse.
5. Highest score wins.
6. If still tied, app offers another duel round.

Success state:

- Winner is identified and recorded.

Edge cases:

- Drawn Artist has missing score: block and report data issue.
- Tie persists: allow repeat rounds.
- User wants manual override: allow host to choose winner with note.

## Journey 7: Designer Imports or Reviews Card Data

Goal: Convert source documents into structured canonical data.

Flow:

1. Designer opens Development Dashboard.
2. Designer selects Import.
3. Designer chooses source type:
   - Rules DOCX.
   - Muse DOCX.
   - Artist merge DOCX.
   - Epoch PDF.
   - Manual CSV/JSON.
4. App parses source and shows import preview.
5. App displays created, updated, duplicate, skipped, and failed records.
6. Designer confirms import.
7. App writes records and creates validation report.

Success state:

- New data is available in card library and validation dashboard.

Edge cases:

- Source file missing: show file path and recovery instructions.
- Duplicate records found: require skip, merge, or mark intentional.
- Unknown Epoch in Artist import: block affected Artist rows until Epoch exists.
- Partial import failure: commit successful records only if import mode allows partials; otherwise rollback.

## Journey 8: Designer Checks Print Readiness

Goal: Confirm the deck is ready for printing.

Flow:

1. Designer opens Print.
2. App shows deck manifest summary:
   - 9 Muse cards.
   - 90 Epoch cards.
   - 150 Artist cards.
   - 64 Action cards.
3. App shows asset status:
   - Front present.
   - Back present.
   - Dimensions detected.
   - Print status.
4. Designer filters to "Needs Review" or "Missing Asset."
5. Designer opens card or asset detail to resolve issues.
6. Designer exports production checklist.

Success state:

- Deck manifest and assets pass validation.

Edge cases:

- Wrong dimensions: mark blocking until reviewed.
- Missing back art: card cannot be Print Ready.
- Count mismatch: manifest cannot be approved.
- Asset file moved: show broken reference and allow relink.

## Journey 9: Designer Records a Playtest

Goal: Capture a playtest and learn from it later.

Flow:

1. Designer opens Playtests.
2. Designer selects "New Playtest."
3. Designer enters:
   - Date.
   - Player count.
   - Rules version.
   - Deck manifest.
   - Player names or labels.
   - Muse selections.
4. During or after play, designer records:
   - Duration.
   - End condition.
   - Final scores.
   - Final Epoch counts.
   - Notes.
   - Card/rule feedback.
5. Designer saves session.
6. App updates balance summaries.

Success state:

- Session appears in playtest history and aggregate reports.

Edge cases:

- Duplicate Muse selected in one session: warn because each Muse card is unique.
- Player count and player rows mismatch: block save.
- Missing rules version: require selection or create draft label.
- Unsaved draft: persist locally and warn before leaving.

## Screen Definitions

### Play

Purpose:

- Primary playable digital card game.

Content:

- New Game command.
- Current turn and phase.
- Deck and discard counts.
- Player order, Muses, hand counts, tableau counts, and scores.
- Human player hand.
- Tableau and Action log.
- Turn controls as implemented.

States:

- No game: prompt to start.
- Muse selection: show selection order and available Muses.
- Active turn: show legal actions and card play controls.
- Manual resolution: show unresolved effect and host controls.
- Game ended: show final scores, winner, and tiebreaker if needed.

### Companion Home

Purpose:

- Orient user to the secondary companion/admin tools.

Content:

- Current rules version.
- Current deck manifest.
- Validation summary.
- Quick actions: Setup Guide, Score Game, Browse Cards, New Playtest, Print Checklist.

States:

- Clean: no blocking validation issues.
- Needs attention: show warnings and blocking issue counts.
- First run: show import/setup prompts.

### Cards List

Purpose:

- Browse and search card database.

Content:

- Search.
- Card type tabs.
- Filters.
- Card grid/list.
- Sort menu.

Transitions:

- Selecting a card opens Card Detail.
- Changing type resets incompatible filters.
- Search updates results without leaving page.

### Card Detail

Purpose:

- Inspect one card and related data.

Content:

- Artwork preview.
- Name and metadata.
- Rules/flavor text.
- Related cards.
- Validation issues.
- Edit controls in development mode.

Transitions:

- Back returns to previous filtered list.
- Related card opens another detail page.
- Edit opens card editor if enabled.

### Rules

Purpose:

- Read and search rules.

Content:

- Section list.
- Search.
- Rule body.
- Glossary links.
- Player-count callouts.

Transitions:

- Selecting section scrolls or navigates to section.
- Glossary term opens definition.

### Scoring

Purpose:

- Build final score totals.

Content:

- Player list.
- Muse selectors.
- Set rows.
- Total scores.
- Tiebreaker action.

Transitions:

- Add player.
- Add set.
- Save as playtest.
- Start tiebreaker.

### Playtests

Purpose:

- Record and analyze playtest sessions.

Content:

- Session list.
- Filters by date, Muse, rules version, player count.
- Summary metrics.
- New session button.

Transitions:

- Selecting session opens Playtest Detail.
- New session opens Playtest Editor.

### Print

Purpose:

- Manage print readiness.

Content:

- Deck count summary.
- Asset validation.
- Manifest items.
- Export checklist.

Transitions:

- Selecting issue opens relevant card or asset.
- Export generates CSV/JSON report.

### Settings

Purpose:

- Manage project-level configuration.

Content:

- Current rules version.
- Current deck manifest.
- Asset root path.
- Import/export options.
- Development mode toggle.

## Error and Recovery Patterns

### Data Missing

Show:

- What is missing.
- Which card/rule/session is affected.
- Whether the issue blocks scoring, printing, or only review.
- Direct link to fix location.

### Invalid User Input

Prevent save when:

- Required fields are blank.
- Player count is outside 2-9.
- Scores are outside allowed range.
- Deck manifest has invalid quantity.

Use inline validation near the field and a summary at form submit.

### Broken Asset Reference

Show:

- Missing file path.
- Last known source document.
- Card records affected.
- Relink action.

### Import Failure

Show:

- Source file.
- Row/page/card affected.
- Reason.
- Whether records were rolled back or partially imported.
- Downloadable/import report where supported.

### Unsaved Changes

When leaving editors:

- Warn if changes are unsaved.
- Offer Save, Discard, or Stay.
- Autosave playtest drafts where possible.

## Navigation Rules

- Back navigation must preserve list filters and scroll position.
- Player-facing companion screens should not expose raw database IDs.
- Development mode may expose IDs, checksums, source paths, and validation internals.
- Deep links should support card detail pages, rule sections, and playtest sessions.
- If a deep link points to missing content, show a not-found state with search.

## Release Readiness Flow

Before a public companion or print-ready release:

1. Run data validation.
2. Resolve all blocking issues.
3. Confirm deck manifest counts.
4. Confirm print assets and backs.
5. Review rules version status.
6. Run a scoring helper test with sample sets.
7. Record release notes for card/rule changes.
8. Export production checklist.
