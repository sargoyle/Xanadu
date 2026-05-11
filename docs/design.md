# Xanadu Design Guidelines

## Brand Position

Xanadu should feel like mythic art history made playable: elegant, creative, strategic, and theatrical without becoming heavy. The design language should respect the existing card artwork, which already combines classical Muse imagery, ornate borders, historical period styles, and bold Epoch-specific art.

The digital experience should be quieter than the cards themselves. It should give the artwork room to shine while keeping controls, scoring, search, and rules highly legible.

## Design Principles

### Art First, Interface Second

Cards are the hero objects. Interfaces should frame, sort, compare, and explain them without competing visually.

### Clear Game State

Players must quickly recognize card type, selected Muse, valid sets, score totals, and turn steps.

### Historical Variety, Unified System

Epoch cards may vary dramatically in visual style. The surrounding UI should use a stable system so the whole product still feels cohesive.

### Useful During Play

The app may be used at a table. Prioritize large touch targets, fast search, readable contrast, and minimal typing during active gameplay.

### Calm for Development

Internal tools such as validation reports and asset dashboards should be dense, organized, and efficient rather than decorative.

## Visual Style

### Palette

Primary palette:

- Midnight Ink: `#151724` for main text and dark surfaces.
- Parchment: `#F5EEDC` for warm page backgrounds.
- Antique Gold: `#B88A3B` for accents, borders, selected states, and premium details.
- Ivory: `#FFF9EA` for raised surfaces and card-adjacent panels.
- Deep Plum: `#30213E` for Muse identity and rich dark accents.

Secondary accents:

- Epoch Blue: `#123047` for Epoch deck references.
- Action Red: `#8F2E3A` for disruption and warning states.
- Muse Violet: `#5B3F78` for Muse selection.
- Success Green: `#2F6B4F` for approved/print-ready status.
- Warning Amber: `#B97620` for needs-review status.

Avoid allowing the full app to become one-note purple, beige, or dark navy. Use warm neutrals for structure, gold for emphasis, and card artwork for color variety.

### Typography

Recommended type pairing:

- Display headings: a classical serif such as Cormorant Garamond, Cinzel, or a system-safe Georgia fallback.
- Interface and body: a readable sans-serif such as Inter, Source Sans 3, or system UI.
- Data tables and IDs: a mono font only where useful for technical fields.

Type scale:

- Page title: 32-40px desktop, 26-30px mobile.
- Section title: 22-28px.
- Card title: 18-24px depending on card size.
- Body: 15-17px.
- Metadata: 12-14px.

Do not scale text by viewport width. Use fixed type steps with responsive layout changes.

### Imagery

Use real card artwork wherever possible:

- Muse cards: classical line-art style, parchment tones.
- Epoch fronts: period-specific, high-color card artwork.
- Card backs: ornate gold-on-dark style.

Asset previews should preserve card aspect ratio. Do not crop card artwork unless the component is explicitly a thumbnail and the full card is available nearby.

### Borders and Ornament

Use ornament sparingly in the app. The cards already contain decorative borders. Interface borders should be clean and subtle:

- Standard radius: 6-8px.
- Hairline borders: `1px solid rgba(21, 23, 36, 0.14)`.
- Gold accent borders only for selected Muse, active set, or print-ready highlight.

## Component Patterns

### App Shell

Desktop layout:

- Left sidebar navigation.
- Main content area with constrained reading width for rules and wider layouts for tables/dashboards.
- Persistent project name and current mode/context.

Mobile layout:

- Top bar with menu button.
- Bottom or drawer navigation for primary sections.
- Avoid multi-column layouts for active gameplay tools.

Primary navigation:

- Dashboard
- Cards
- Rules
- Scoring
- Playtests
- Print
- Settings

### Cards

Card thumbnail component:

- Fixed card aspect ratio of 59:89.
- Shows artwork or fallback card-type face.
- Badge for card type.
- Print status indicator.
- Optional duplicate warning marker.

Card detail component:

- Large art preview.
- Metadata section.
- Rules/flavor text.
- Related cards.
- Validation issues.

Artist score table:

- Muses as rows or compact columns depending on viewport.
- Highlight selected Muse.
- Use clear score chips for 0, 1, 2, and 3.
- Avoid relying on color alone; include numeric values.

### Search and Filters

Search should be prominent in card-heavy screens.

Filter patterns:

- Tabs for card type.
- Dropdowns or comboboxes for Epoch and Muse.
- Checkbox/toggle for "Needs Review" and "Missing Asset".
- Sort menu for Name, Epoch, Score, Print Status, Recently Updated.

### Scoring Helper

The scoring helper should be optimized for table use.

Required components:

- Muse selector with card thumbnails or Muse names.
- Set rows containing Epoch, Artist, validity, and score.
- Add set button.
- Total score display.
- Invalid set warnings.
- Tiebreaker mode.

State display:

- Selected Muse should remain visible.
- Total score should remain sticky on mobile.
- Invalid rows should show exact reason.

### Rules Reference

Rules screens should be reading-first.

Patterns:

- Section navigation.
- Search field.
- Glossary links.
- Callouts for player-count differences.
- Example turn in a distinct but restrained panel.

Do not overuse cards inside rule pages. Use full-width bands or simple content sections.

### Validation Dashboard

This is an internal-development screen and should be dense but calm.

Patterns:

- Summary counts at top.
- Issue table grouped by severity.
- Filters for card type and issue type.
- Direct links to affected card records.
- Export report button.

Severity levels:

- Blocking: cannot print or calculate correctly.
- Warning: needs review before release.
- Info: useful cleanup or recommendation.

### Print Dashboard

Required components:

- Deck count summary.
- Asset status by card type.
- Dimension validation.
- Manifest export.
- Source file references.

Print statuses:

- Draft
- Needs Review
- Approved
- Print Ready
- Retired

Use status labels plus color and icon.

## Responsive Behavior

Desktop:

- Use sidebar navigation.
- Allow tables and comparison views.
- Show card art and metadata side by side.

Tablet:

- Collapse secondary sidebars.
- Keep card detail as two columns only when width allows.
- Make scoring rows touch-friendly.

Mobile:

- Single-column layout.
- Sticky scoring total.
- Full-width controls.
- Avoid horizontal table scrolling where possible; transform score tables into stacked rows.

Minimum touch target:

- 44x44px for interactive controls.

## Accessibility

Requirements:

- WCAG AA contrast for text and controls.
- Keyboard navigation for all core flows.
- Visible focus states.
- Semantic headings in rules pages.
- Button labels or accessible names for icon buttons.
- Alt text for card artwork, including card name and type.
- Do not communicate status by color alone.
- Respect reduced-motion preferences.

Content accessibility:

- Keep rules language direct.
- Explain game-specific terms in glossary.
- Avoid burying player-count differences in long paragraphs.

## Branding Requirements

Product name:

- Full name: Xanadu: Muses of Inspiration.
- Short name: Xanadu.

Tone:

- Imaginative, elegant, playful, and clear.
- Avoid overly academic writing in player-facing instructions.
- Use myth and art-history language as flavor, not as a barrier to understanding.

Card type language:

- Muse cards
- Epoch cards
- Artist cards
- Action cards

Rules terminology:

- Hand
- Tableau
- Set
- Round
- Turn
- Draw
- Discard

## Content Guidelines

Card names should be evocative and concise. Descriptions should be flavorful but short enough to fit card layouts and database views.

Rules text should be explicit about:

- Timing.
- Target.
- Whether a card is discarded, held, or placed in tableau.
- Whether an effect applies to one player, all players, or clockwise order.
- Whether an Action card can manipulate cards already in a tableau.

## Empty, Loading, and Error States

Empty states:

- Explain what is missing and provide a direct next action.
- Example: "No Artist cards match this Epoch. Clear filters or add an Artist."

Loading states:

- Use simple skeleton rows or progress indicators.
- Do not show playful text in production tools.

Error states:

- Explain the failed action.
- Preserve user input where possible.
- Provide retry or export diagnostic option for validation/import errors.

## Design QA Checklist

Before release:

- Card thumbnails preserve 59:89 aspect ratio.
- Text does not overlap at mobile or desktop sizes.
- Selected Muse and total score are always visible in scoring flow.
- Rules are readable without opening dense tables.
- Status labels remain understandable without color.
- Print dashboard exposes missing assets before export.
- Keyboard-only navigation can complete search, card detail, and scoring flows.

