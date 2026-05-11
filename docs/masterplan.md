# Xanadu Master Plan

## Product Vision

Xanadu: Muses of Inspiration is a mythic, card-driven strategy game where players become one of the Nine Muses and compete to inspire artists across history. The product combines tabletop play, print-ready card assets, and a digital development/companion experience that keeps the game consistent as rules, cards, scoring, and playtest feedback evolve.

The North Star is to make Xanadu a playable digital card game first: a rich journey through art, myth, and time with clear turns, interactive cards, visible game state, scoring, and win conditions. Companion/admin tools remain valuable, but they are secondary to the playable Game Mode. Every card, rule, and interface should help players answer three questions quickly:

- What can I do right now?
- Which card combination gives my Muse the strongest inspiration?
- How close am I to winning?

## Core Purpose

Xanadu exists to turn art history and myth into playful strategic choices. Players collect Epoch and Artist cards, match them to their chosen Muse, and use Action cards to alter the game state. The digital product supports this tabletop game by making the card database, rules, print assets, scoring logic, and playtest iteration easier to maintain.

The project should support four connected outcomes:

- A playable local digital game with one human player and NPC opponents, turn flow, hands, tableau, Action resolution, scoring, and end game.
- A polished physical card game that can be printed, tested, revised, and eventually published.
- A structured game-content system that stores Muses, Epochs, Artists, Action cards, scoring values, print status, and rules text.
- A companion/reference/admin interface that helps players learn, score, browse cards, resolve rules, and maintain content without replacing the primary digital game.

## Target Users

### Primary Players

Casual strategy players, families, creative groups, educators, and art/history enthusiasts who want a social card game with beautiful artwork, meaningful theme, and moderate tactical depth.

Needs:

- Clear setup and turn instructions.
- Fast recognition of card types and valid combinations.
- Delightful art and historical flavor.
- A game length that feels satisfying without becoming exhausting.
- Rules that support 2-9 players without confusion.

### Game Owner or Host

The person who teaches the game, manages the decks, explains scoring, and resolves disputes.

Needs:

- Quick-start setup guide.
- Searchable rules and glossary.
- Scoring helper for Muse, Epoch, and Artist combinations.
- Clear player-count adjustments.
- Easy way to identify missing cards or print-production issues.

### Designer and Development Team

The people revising cards, playtesting balance, preparing print files, and managing future expansions.

Needs:

- Canonical database for all card content.
- Versioned rules and card changes.
- Validation for duplicates, missing scores, inconsistent Epoch names, and print-size issues.
- Exportable print sheets and card lists.
- Playtest notes tied to specific cards and rule versions.

### Educators and Facilitators

Teachers, workshop leads, libraries, museums, and creative facilitators who may use Xanadu as an art-history or creativity activity.

Needs:

- Accessible language.
- Optional context about Muses, artists, and epochs.
- Print-and-play support.
- Shorter play modes and guided scoring.

## Value Proposition

Xanadu offers a distinct blend of myth, art history, strategy, and social chaos. Players do not simply collect high-value cards; they build themed sets around their Muse and use Action cards to reshape the table.

The digital product adds value by making the physical game easier to produce, test, teach, and expand:

- Players get a beautiful reference and scoring companion.
- Hosts get fewer rules disputes and faster setup.
- Designers get one reliable content source for all cards and rules.
- Print production gets clearer validation before files are sent to a printer.

## Product Principles

### Preserve the Physical Game

The software should support the tabletop experience, not require a screen for normal play. A printed rules booklet and physical cards must remain fully usable.

### Make Combinations Obvious

The heart of the game is the Muse-Epoch-Artist set. Interfaces and print designs must make card type, Epoch, Muse affinity, and points easy to scan.

### Treat Content as Data

Cards, rules, glossary entries, scoring values, and print metadata should be stored as structured data, not scattered across design files.

### Design for Iteration

The game is still evolving. Every system should expect card revisions, rules edits, deck count changes, and playtest feedback.

### Keep the Magic

Xanadu should feel elegant, historical, creative, and a little theatrical. Utility matters, but it should never flatten the game's imaginative identity.

## Scope

### In Scope

- Primary Game Mode for playable local digital Xanadu.
- One human user plus three NPC players for the initial playable build.
- Game setup, dice-order Muse selection, deck shuffling, dealing, hands, tableau, turn phases, Action play, scoring, and win conditions.
- Card database for Muse, Epoch, Artist, and Action cards.
- Rules and glossary content management.
- Print asset tracking for 59x89mm card files.
- Card browsing and search.
- Scoring helper for Muse-Epoch-Artist sets.
- Game setup and turn reference.
- Playtest session logging.
- Content validation reports.
- Export support for CSV/JSON and print-production checklists.

### Out of Scope for Initial Release

- Fully automated online multiplayer.
- Sophisticated AI strategy beyond simple NPC automation.
- Marketplace/e-commerce checkout.
- Native mobile apps.
- Augmented reality or camera-based card recognition.
- Full print imposition engine unless later required.

## Success Metrics

### Player Experience

- New players can complete setup within 10 minutes using the rules or companion.
- A first-time player can explain a valid set after one example.
- At least 80% of playtesters rate the game flow as clear or very clear.
- Average rules lookup during a playtest decreases over successive rule versions.

### Game Balance

- No Muse has a persistent win-rate advantage above 60% across comparable playtests.
- Each Muse has enough viable high-scoring Artist options across multiple Epochs.
- Action cards create meaningful interaction without causing frequent stalled turns.
- 2-3 player games reliably end at 5 Epochs or action-deck exhaustion; 4-9 player games reliably end at 4 Epochs or action-deck exhaustion.

### Content Quality

- 100% of Artist cards have an Epoch, type, description, and score for all nine Muses.
- 100% of Epoch cards have name, date range, flavor text, artwork, and print status.
- Duplicate card names are intentional and marked as such.
- All print assets match 59x89mm card dimensions and required bleed/safe-area rules.

### Development Quality

- Developers can run the app locally from documented setup instructions.
- Data migrations are versioned and repeatable.
- Validation tests catch missing scores, missing card images, and invalid references.
- Content exports are reproducible from the canonical data source.

## Milestones

### Milestone 1: Canonical Game Data

Create structured card data for all known Muses, Epochs, Artists, and Action cards. Import existing Word/PDF content where possible. Add validation reports for missing fields and duplicates.

### Milestone 2: Playable Game Foundation

Build the primary Game Mode: local game setup, 1 human plus 3 NPCs, shuffled decks, dealt hands, dice-order Muse selection, visible turn state, basic tableau, and action log.

### Milestone 3: Turn And Rules Engine

Implement turn flow, legal card play, tableau rules, scoring updates, end conditions, Fate dice, and modular Action resolution.

### Milestone 4: Companion Console

Build and maintain card browsing, rules reference, setup/scoring helper, playtest logs, and balance tools as secondary support screens.

### Milestone 5: Print Production Support

Track print-ready fronts/backs, card counts, deck composition, duplicate copies, and exportable production checklists.

### Milestone 6: Public Playable Release

Polish Game Mode for players, add accessibility and responsive QA, then harden Companion Mode for hosts/designers.
