const seed = await fetch("/data/seed.json").then((response) => response.json());

const summary = document.querySelector("#summary");
const cardTypeTabs = document.querySelector("#card-type-tabs");
const cardCount = document.querySelector("#card-count");
const cardsList = document.querySelector("#cards-list");
const cardDetail = document.querySelector("#card-detail");
const rulesList = document.querySelector("#rules-list");
const rulesNav = document.querySelector("#rules-nav");
const glossaryList = document.querySelector("#glossary-list");
const manifest = document.querySelector("#manifest");
const cardSearch = document.querySelector("#card-search");
const rulesSearch = document.querySelector("#rules-search");
const epochFilter = document.querySelector("#epoch-filter");
const museFilter = document.querySelector("#muse-filter");
const actionFilter = document.querySelector("#action-filter");
const statusFilter = document.querySelector("#status-filter");
const playerCountSelect = document.querySelector("#player-count");
const setupSteps = document.querySelector("#setup-steps");
const endCondition = document.querySelector("#end-condition");
const playersSetup = document.querySelector("#players-setup");
const setupWarning = document.querySelector("#setup-warning");
const rollDiceButton = document.querySelector("#roll-dice");
const addScoreRowButton = document.querySelector("#add-score-row");
const scoreRowsContainer = document.querySelector("#score-rows");
const scoreSummary = document.querySelector("#score-summary");
const tieStatus = document.querySelector("#tie-status");
const runTiebreakerButton = document.querySelector("#run-tiebreaker");
const tiebreakerResult = document.querySelector("#tiebreaker-result");
const savePlaytestButton = document.querySelector("#save-playtest");
const clearPlaytestsButton = document.querySelector("#clear-playtests");
const playtestDate = document.querySelector("#playtest-date");
const playtestDuration = document.querySelector("#playtest-duration");
const playtestEndCondition = document.querySelector("#playtest-end-condition");
const playtestNotes = document.querySelector("#playtest-notes");
const feedbackSeverity = document.querySelector("#feedback-severity");
const feedbackText = document.querySelector("#feedback-text");
const playtestSaveStatus = document.querySelector("#playtest-save-status");
const balanceSummary = document.querySelector("#balance-summary");
const playtestList = document.querySelector("#playtest-list");
const newGameButton = document.querySelector("#new-game");
const setupModal = document.querySelector("#new-game-panel");
const closeSetupModalButton = document.querySelector("#close-setup-modal");
const setupBackButton = document.querySelector("#setup-back");
const setupStartGameButton = document.querySelector("#setup-start-game");
const setupNextButton = document.querySelector("#setup-next");
const setupEnterPlayButton = document.querySelector("#setup-enter-play");
const setupStepIndicator = document.querySelector("#setup-step-indicator");
const setupStepContent = document.querySelector("#setup-step-content");
const gamePlayerCountSelect = document.querySelector("#game-player-count");
const gameSetup = document.querySelector("#game-setup");
const gameTurnTitle = document.querySelector("#game-turn-title");
const gamePhase = document.querySelector("#game-phase");
const gameTurnNumber = document.querySelector("#game-turn-number");
const gameScoreSummary = document.querySelector("#game-score-summary");
const gameDecks = document.querySelector("#game-decks");
const museChoice = document.querySelector("#muse-choice");
const gameControls = document.querySelector("#game-controls");
const diceRoller = document.querySelector("#dice-roller");
const gamePlayers = document.querySelector("#game-players");
const gameTableau = document.querySelector("#game-tableau");
const playerHandTitle = document.querySelector("#player-hand-title");
const playerHand = document.querySelector("#player-hand");
const selectedCardPanel = document.querySelector("#selected-card-panel");
const gameLog = document.querySelector("#game-log");
const handOverlay = document.querySelector("#hand-overlay");
const handOverlayTitle = document.querySelector("#hand-overlay-title");
const handOverlayContent = document.querySelector("#hand-overlay-content");
const tableauOverlay = document.querySelector("#tableau-overlay");
const tableauOverlayTitle = document.querySelector("#tableau-overlay-title");
const tableauOverlayContent = document.querySelector("#tableau-overlay-content");
const legalSetOverlay = document.querySelector("#legal-set-overlay");
const legalSetContent = document.querySelector("#legal-set-content");
const museDeckPile = document.querySelector("#muse-deck-pile");
const museDealNextButton = document.querySelector("#muse-deal-next");
const museRestartDeckButton = document.querySelector("#muse-restart-deck");
const museCardsRemaining = document.querySelector("#muse-cards-remaining");
const museCardsDealt = document.querySelector("#muse-cards-dealt");
const museDealtArea = document.querySelector("#muse-dealt-area");
const epochDeckPile = document.querySelector("#epoch-deck-pile");
const epochDealNextButton = document.querySelector("#epoch-deal-next");
const epochRestartDeckButton = document.querySelector("#epoch-restart-deck");
const epochCardsRemaining = document.querySelector("#epoch-cards-remaining");
const epochCardsDealt = document.querySelector("#epoch-cards-dealt");
const epochDealtArea = document.querySelector("#epoch-dealt-area");
const artistDeckPile = document.querySelector("#artist-deck-pile");
const artistDealNextButton = document.querySelector("#artist-deal-next");
const artistRestartDeckButton = document.querySelector("#artist-restart-deck");
const artistCardsRemaining = document.querySelector("#artist-cards-remaining");
const artistCardsDealt = document.querySelector("#artist-cards-dealt");
const artistDealtArea = document.querySelector("#artist-dealt-area");
const actionDeckPile = document.querySelector("#action-deck-pile");
const actionDealNextButton = document.querySelector("#action-deal-next");
const actionRestartDeckButton = document.querySelector("#action-restart-deck");
const actionCardsRemaining = document.querySelector("#action-cards-remaining");
const actionCardsDealt = document.querySelector("#action-cards-dealt");
const actionDealtArea = document.querySelector("#action-dealt-area");
const diceTesterStage = document.querySelector("#dice-tester-stage");
const diceTesterRollButton = document.querySelector("#dice-tester-roll");
const diceTesterResult = document.querySelector("#dice-tester-result");
const diceTesterHistory = document.querySelector("#dice-tester-history");

const CARD_TYPES = ["All", "Muse", "Epoch", "Artist", "Action"];
const PLAYTEST_STORAGE_KEY = "xanadu.playtests";
const state = {
  activeType: "All",
  selectedCardKey: "Muse:calliope",
  museDeck: {
    nextIndex: 0,
    order: [],
    dealt: [],
    lastDealtIndex: null
  },
  epochDeck: {
    nextIndex: 0,
    order: [],
    dealt: [],
    lastDealtIndex: null
  },
  artistDeck: {
    nextIndex: 0,
    order: [],
    dealt: [],
    lastDealtIndex: null
  },
  actionDeck: {
    nextIndex: 0,
    order: [],
    dealt: [],
    lastDealtIndex: null
  },
  diceTester: {
    value: null,
    isRolling: false,
    history: []
  },
  setupFlow: {
    open: false,
    step: 1
  },
  handOverlay: {
    open: false
  },
  tableauOverlay: {
    open: false,
    playerId: ""
  },
  legalSetChoice: {
    open: false,
    pairs: []
  },
  players: [],
  scoreRows: [],
  playtests: [],
  game: null
};

function decorateCanonicalCardData() {
  const epochNamesById = new Map(seed.epochs.map((epoch) => [epoch.id, epoch.name]));
  for (const epoch of seed.epochs) {
    epoch.epochId = epoch.id;
    epoch.epochName = epoch.name;
  }
  for (const artist of seed.artists) {
    artist.requiredEpochId = artist.requiredEpochId ?? "";
    artist.requiredEpochName = artist.requiredEpochName ?? epochNamesById.get(artist.requiredEpochId) ?? "";
  }
}

decorateCanonicalCardData();

const museById = new Map(seed.muses.map((muse) => [muse.id, muse]));
const epochById = new Map(seed.epochs.map((epoch) => [epoch.id, epoch]));
const epochIndexById = new Map(seed.epochs.map((epoch, index) => [epoch.id, index]));
function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatCategory(value) {
  return String(value ?? "")
    .split("-")
    .join(" ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function cardKey(card) {
  return `${card.cardType}:${card.id}`;
}

function countManifest() {
  return {
    MUSE: seed.muses.length,
    EPOCH: seed.epochs.reduce((total, epoch) => total + (epoch.copyCount ?? 1), 0),
    ARTIST: seed.artists.reduce((total, artist) => total + (artist.copyCount ?? 1), 0),
    ACTION: seed.actions.reduce((total, action) => total + (action.copyCount ?? 1), 0)
  };
}

function renderSummary() {
  const counts = countManifest();
  summary.innerHTML = Object.entries(counts)
    .map(([label, count]) => `<article class="stat"><span>${label}</span><strong>${count}</strong></article>`)
    .join("");
}

function museDeckCards() {
  return seed.muses.filter((muse) => muse.imagePath);
}

function shuffleDeckOrder(cards) {
  const order = cards.map((_, index) => index);
  for (let index = order.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [order[index], order[swapIndex]] = [order[swapIndex], order[index]];
  }
  return order;
}

function epochDeckCards() {
  return seed.epochs.flatMap((epoch, epochIndex) =>
    Array.from({ length: 3 }, (_, copyIndex) => ({
      id: `${epoch.id}-copy-${copyIndex + 1}`,
      epochId: epoch.epochId,
      epochName: epoch.epochName,
      name: epoch.name,
      imagePath: `/assets/epochs/${epoch.id}.png`,
      backImagePath: "/assets/epochs/epoch-back.png"
    }))
  );
}

function generateArtistArtworkPrompt(artist) {
  const epoch = epochById.get(artist.requiredEpochId);
  return [
    `Create premium tabletop card artwork for "${artist.name}".`,
    `Epoch: ${artist.requiredEpochName ?? epoch?.name ?? artist.requiredEpochId}.`,
    `Artist type: ${artist.artistType}.`,
    `Flavour: ${artist.description}.`,
    "Style: illuminated manuscript meets gilded art deco oracle card, painterly, collectible card game quality, elegant composition, textured, rich but readable.",
    "Do not include text, labels, borders, score grids, logos, UI, watermarks, or card frame elements in the artwork."
  ].join(" ");
}

function artistDeckCards() {
  return seed.artists.map((artist) => {
    const epoch = epochById.get(artist.requiredEpochId);
    return {
      ...artist,
      cardKind: "artist",
      epochName: artist.requiredEpochName ?? epoch?.name ?? artist.requiredEpochId,
      requiredEpochId: artist.requiredEpochId,
      requiredEpochName: artist.requiredEpochName,
      artworkPath: artist.artworkPath ?? "",
      artworkPrompt: artist.artworkPrompt ?? generateArtistArtworkPrompt(artist),
      backImagePath: "/assets/artists/artist-back.png"
    };
  });
}

function actionCategoryLabel(category) {
  const labels = {
    bonus: "Bonus / Buff",
    fate: "Fate Dice",
    disruption: "Disruption",
    swap: "Swap / Steal",
    group: "Group / Party"
  };
  return labels[category] ?? formatCategory(category);
}

function actionCategoryIcon(category) {
  const icons = {
    bonus: "+",
    fate: "6",
    disruption: "!",
    swap: "<>",
    group: "✦"
  };
  return icons[category] ?? "?";
}

function actionPrimaryTag(action) {
  if (action.diceOutcomes) return "DICE ROLL";
  if (action.persistent) return "PERSISTENT";
  if (String(action.timing ?? action.playCondition ?? "").toLowerCase().includes("immediately")) return "PLAY IMMEDIATELY";
  return action.timing ?? action.playCondition ?? "ACTION";
}

function generateActionArtworkPrompt(action) {
  return [
    `Create premium tabletop action-card artwork for "${action.name}".`,
    `Category: ${actionCategoryLabel(action.category)}.`,
    `Effect: ${action.effectText}.`,
    "Style: dramatic theatrical poster meets elegant fantasy spell card, deep burgundy and antique gold, symbolic imagery, painterly, tactile, premium physical card game.",
    "Use motifs that fit the action such as lightning, masks, shattered frames, celestial symbols, ink splashes, scrolls, mirrors, flames, dice, or stage lights.",
    "Do not include text, labels, borders, card rules, logos, UI, watermarks, or card frame elements in the artwork."
  ].join(" ");
}

function actionDeckCards() {
  return seed.actions.map((action) => ({
    ...action,
    cardKind: "action",
    artworkPath: action.artworkPath ?? "",
    artworkPrompt: action.artworkPrompt ?? generateActionArtworkPrompt(action),
    backImagePath: "/assets/actions/action-back.png"
  }));
}

function physicalDeckConfig(deckKey) {
  const configs = {
    muse: {
      label: "Muse",
      state: state.museDeck,
      cards: museDeckCards(),
      pile: museDeckPile,
      dealButton: museDealNextButton,
      restartButton: museRestartDeckButton,
      remaining: museCardsRemaining,
      dealt: museCardsDealt,
      table: museDealtArea,
      emptyText: "Click the deck pile to deal a Muse."
    },
    epoch: {
      label: "Epoch",
      state: state.epochDeck,
      cards: epochDeckCards(),
      pile: epochDeckPile,
      dealButton: epochDealNextButton,
      restartButton: epochRestartDeckButton,
      remaining: epochCardsRemaining,
      dealt: epochCardsDealt,
      table: epochDealtArea,
      emptyText: "Click the deck pile to deal an Epoch."
    },
    artist: {
      label: "Artist",
      state: state.artistDeck,
      cards: artistDeckCards(),
      pile: artistDeckPile,
      dealButton: artistDealNextButton,
      restartButton: artistRestartDeckButton,
      remaining: artistCardsRemaining,
      dealt: artistCardsDealt,
      table: artistDealtArea,
      emptyText: "Click the deck pile to deal an Artist."
    },
    action: {
      label: "Action",
      state: state.actionDeck,
      cards: actionDeckCards(),
      pile: actionDeckPile,
      dealButton: actionDealNextButton,
      restartButton: actionRestartDeckButton,
      remaining: actionCardsRemaining,
      dealt: actionCardsDealt,
      table: actionDealtArea,
      emptyText: "Click the deck pile to deal an Action."
    }
  };
  return configs[deckKey];
}

function physicalDeckCardById(deckKey, id) {
  return physicalDeckConfig(deckKey).cards.find((card) => card.id === id);
}

function ensurePhysicalDeckOrder(config) {
  if (config.state.order.length !== config.cards.length) {
    config.state.order = shuffleDeckOrder(config.cards);
    config.state.nextIndex = 0;
    config.state.dealt = [];
    config.state.lastDealtIndex = null;
  }
}

function renderPhysicalDeckViewer(deckKey) {
  const config = physicalDeckConfig(deckKey);
  const { cards } = config;
  const deckState = config.state;
  ensurePhysicalDeckOrder(config);
  const remaining = Math.max(0, cards.length - deckState.nextIndex);
  const backPath = cards[0]?.backImagePath ?? sharedCardBackPath;

  if (cards.length === 0) {
    config.pile.innerHTML = "";
    config.remaining.textContent = "Cards remaining: 0";
    config.dealt.textContent = "Cards dealt: 0 of 0";
    config.dealButton.disabled = true;
    config.restartButton.disabled = true;
    config.table.innerHTML = "";
    return;
  }

  config.pile.classList.toggle("is-empty", remaining === 0);
  config.pile.disabled = remaining === 0;
  config.dealButton.disabled = remaining === 0;
  config.pile.setAttribute("aria-label", remaining === 0 ? `${config.label} deck empty` : `Deal next ${config.label} card`);
  config.pile.innerHTML = `
    <span class="muse-pile-stack" aria-hidden="true">
      ${[0, 1, 2].map((index) => `<span class="muse-pile-card" style="--pile-offset:${index};"><img src="${escapeHtml(backPath)}" alt=""></span>`).join("")}
    </span>
  `;
  config.remaining.textContent = `Cards remaining: ${remaining}`;
  config.dealt.textContent = `Cards dealt: ${deckState.dealt.length} of ${cards.length}`;
  config.restartButton.disabled = false;
  config.table.innerHTML =
    deckState.dealt.length === 0
      ? `<div class="muse-table-empty">${escapeHtml(config.emptyText)}</div>`
      : deckState.dealt
          .map((dealtCard, index) => renderPhysicalDealtCard(deckKey, dealtCard, index, backPath))
          .join("");

  if (deckState.lastDealtIndex !== null) {
    const dealtIndex = deckState.lastDealtIndex;
    window.setTimeout(() => {
      config.table.querySelector(`[data-dealt-index="${dealtIndex}"]`)?.classList.remove("just-dealt");
      if (deckState.lastDealtIndex === dealtIndex) deckState.lastDealtIndex = null;
    }, 320);
  }
}

function renderPhysicalDealtCard(deckKey, dealtCard, index, backPath) {
  const card = physicalDeckCardById(deckKey, dealtCard.cardId);
  const config = physicalDeckConfig(deckKey);
  if (!card) return "";
  const frontMarkup =
    deckKey === "artist"
      ? renderArtistCardFront(card)
      : deckKey === "action"
        ? renderActionCardFront(card)
      : `<img src="${escapeHtml(card.imagePath)}" alt="${escapeHtml(card.name)} ${escapeHtml(config.label)} card front">`;
  return `
    <button type="button" class="muse-table-card ${dealtCard.faceUp ? "is-face-up" : ""} ${config.state.lastDealtIndex === index ? "just-dealt" : ""}" data-deck-key="${escapeHtml(deckKey)}" data-dealt-index="${index}" aria-pressed="${dealtCard.faceUp}" aria-label="${escapeHtml(dealtCard.faceUp ? `Flip ${card.name} face down` : `Flip dealt ${config.label} card ${index + 1} face up`)}">
      <span class="muse-deck-card-inner">
        <span class="muse-deck-face muse-deck-back">
          <img src="${escapeHtml(card.backImagePath ?? backPath)}" alt="${escapeHtml(config.label)} card back">
        </span>
        <span class="muse-deck-face muse-deck-front">
          ${frontMarkup}
        </span>
      </span>
    </button>
  `;
}

function artistPlaceholderTone(card) {
  const tones = ["teal", "emerald", "forest", "charcoal", "navy", "burgundy"];
  const source = `${card.requiredEpochId}-${card.artistType}`;
  const hash = [...source].reduce((total, char) => total + char.charCodeAt(0), 0);
  return tones[hash % tones.length];
}

function renderArtistArtworkPanel(card) {
  if (card.artworkPath) {
    return `<img class="artist-artwork-image" src="${escapeHtml(card.artworkPath)}" alt="${escapeHtml(`${card.name} artwork`)}">`;
  }
  return `
    <span class="artist-artwork-placeholder artist-tone-${escapeHtml(artistPlaceholderTone(card))}" data-artwork-prompt="${escapeHtml(card.artworkPrompt)}">
      <span class="artist-artwork-sigil">${escapeHtml(card.artistType?.slice(0, 1) ?? "A")}</span>
      <span>${escapeHtml(card.artistType)}</span>
    </span>
  `;
}

function renderArtistScoreGrid(card) {
  return `
    <span class="artist-score-grid" aria-label="Muse scores">
      <span class="artist-score-cell artist-score-heading">
        <span>MUSES</span>
      </span>
      ${seed.muses
        .map(
          (muse) => `
            <span class="artist-score-cell">
              <span>${escapeHtml(muse.name)}</span>
              <strong>${card.scores?.[muse.id] ?? 0}</strong>
            </span>
          `
        )
        .join("")}
    </span>
  `;
}

function artistNameSizeClass(name) {
  const length = String(name ?? "").length;
  if (length >= 28) return "artist-name-extra-long";
  if (length >= 21) return "artist-name-long";
  return "";
}

function renderArtistCardFront(card) {
  return `
    <span class="artist-card-front">
      <span class="artist-card-name ${artistNameSizeClass(card.name)}">${escapeHtml(card.name)}</span>
      <span class="artist-artwork-frame">${renderArtistArtworkPanel(card)}</span>
      <span class="artist-card-middle">
        <span class="artist-card-meta">
          <span class="artist-epoch-block">
            <span class="artist-info-label">EPOCH</span>
            <strong>${escapeHtml(card.epochName)}</strong>
          </span>
          <span class="artist-type-block">
            <span class="artist-info-label">TYPE</span>
            <span>${escapeHtml(card.artistType)}</span>
          </span>
        </span>
        <span class="artist-card-flavour">${escapeHtml(card.description)}</span>
      </span>
      <span class="artist-card-bottom">
        ${renderArtistScoreGrid(card)}
      </span>
    </span>
  `;
}

function renderDiceOutcomePanel(card) {
  if (!card.diceOutcomes) return "";
  return `
    <span class="action-dice-panel" aria-label="D6 outcomes">
      ${Object.entries(card.diceOutcomes)
        .map(
          ([roll, outcome]) => `
            <span class="action-dice-outcome">
              <strong>${escapeHtml(roll)}</strong>
              <span>${escapeHtml(outcome)}</span>
            </span>
          `
        )
        .join("")}
    </span>
  `;
}

function actionFlavorText(card) {
  return card.flavourText ?? card.flavorText ?? "";
}

function actionEffectSizeClass(effectText) {
  const length = String(effectText ?? "").length;
  if (length >= 130) return "action-effect-extra-long";
  if (length >= 92) return "action-effect-long";
  return "";
}

function actionTitleSizeClass(name) {
  const length = String(name ?? "").length;
  if (length >= 22) return "action-title-extra-long";
  if (length >= 16) return "action-title-long";
  return "";
}

function renderActionCategoryLine(card) {
  return `
    <span class="action-category-line">
      <span class="action-line-rule"></span>
      <strong>${escapeHtml(actionCategoryLabel(card.category))}</strong>
      <span class="action-line-rule"></span>
    </span>
  `;
}

function renderActionTypeMotif(card) {
  return `
    <span class="action-motif-stage" aria-hidden="true">
      <span class="action-type-motif action-motif-${escapeHtml(card.category)}">${escapeHtml(actionCategoryIcon(card.category))}</span>
    </span>
  `;
}

function renderActionCardFront(card) {
  const hasDice = Boolean(card.diceOutcomes);
  const flavor = actionFlavorText(card);
  if (hasDice) {
    return `
      <span class="action-card-front action-dice-card action-category-${escapeHtml(card.category)}">
        <span class="action-card-title ${actionTitleSizeClass(card.name)}">${escapeHtml(card.name)}</span>
        ${renderActionCategoryLine(card)}
        <span class="action-dice-stage" aria-hidden="true">
          <span class="action-die-face">
            <span></span><span></span><span></span><span></span><span></span><span></span>
          </span>
        </span>
        ${renderDiceOutcomePanel(card)}
        <span class="action-decorative-footer" aria-hidden="true"></span>
      </span>
    `;
  }
  return `
    <span class="action-card-front action-standard-card action-category-${escapeHtml(card.category)}">
      <span class="action-card-title ${actionTitleSizeClass(card.name)}">${escapeHtml(card.name)}</span>
      ${renderActionCategoryLine(card)}
      ${renderActionTypeMotif(card)}
      <span class="action-flavour-line">${flavor ? escapeHtml(flavor) : "&nbsp;"}</span>
      <span class="action-effect-panel">
        <span class="action-effect-text ${actionEffectSizeClass(card.effectText)}">${escapeHtml(card.effectText)}</span>
      </span>
      <span class="action-decorative-footer" aria-hidden="true"></span>
    </span>
  `;
}

function dealNextPhysicalCard(deckKey) {
  const config = physicalDeckConfig(deckKey);
  const { cards } = config;
  const deckState = config.state;
  ensurePhysicalDeckOrder(config);
  if (deckState.nextIndex >= cards.length) return;
  const card = cards[deckState.order[deckState.nextIndex]];
  deckState.dealt.push({ cardId: card.id, faceUp: true });
  deckState.lastDealtIndex = deckState.dealt.length - 1;
  deckState.nextIndex += 1;
  renderPhysicalDeckViewer(deckKey);
}

function flipDealtPhysicalCard(deckKey, index) {
  const config = physicalDeckConfig(deckKey);
  const dealtCard = config.state.dealt[index];
  if (!dealtCard) return;
  dealtCard.faceUp = !dealtCard.faceUp;
  renderPhysicalDeckViewer(deckKey);
}

function restartPhysicalDeck(deckKey) {
  const config = physicalDeckConfig(deckKey);
  const deckState = config.state;
  deckState.nextIndex = 0;
  deckState.order = shuffleDeckOrder(config.cards);
  deckState.dealt = [];
  deckState.lastDealtIndex = null;
  renderPhysicalDeckViewer(deckKey);
}

function renderMuseDeckViewer() {
  renderPhysicalDeckViewer("muse");
}

function renderEpochDeckViewer() {
  renderPhysicalDeckViewer("epoch");
}

function renderArtistDeckViewer() {
  renderPhysicalDeckViewer("artist");
}

function renderActionDeckViewer() {
  renderPhysicalDeckViewer("action");
}

function cardDescription(card) {
  if (card.cardType === "Muse") return card.description;
  if (card.cardType === "Epoch") return card.flavorText ?? card.description;
  if (card.cardType === "Artist") return card.description;
  return card.effectText ?? card.rulesText;
}

function cardImage(card, className, label) {
  if (!card.imagePath) return "";
  return `<img class="${className}" src="${escapeHtml(card.imagePath)}" alt="${escapeHtml(`${card.name} ${label}`)}">`;
}

function cardBackImage(card, className) {
  if (!card.backImagePath) return "";
  return `<img class="${className}" src="${escapeHtml(card.backImagePath)}" alt="${escapeHtml(`${card.name} card back`)}">`;
}

const sharedCardBackPath = "/assets/muses/muse-back.png";

function cardSizeLabel(card) {
  if (!card.cardWidthMm || !card.cardHeightMm) return "";
  return `${card.cardWidthMm} x ${card.cardHeightMm} mm`;
}

function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function draw(deck, count) {
  return deck.splice(0, count);
}

function expandedEpochDeck() {
  return seed.epochs.flatMap((epoch) =>
    Array.from({ length: epoch.copyCount ?? 1 }, (_, index) => ({
      ...epoch,
      epochId: epoch.epochId,
      epochName: epoch.epochName,
      deckCopyId: `${epoch.id}-${index + 1}`
    }))
  );
}

function withInstances(cards, prefix) {
  return cards.map((card, index) => ({ ...card, instanceId: `${prefix}-${index + 1}-${card.id}` }));
}

function normalizedCards() {
  return [
    ...seed.muses.map((card) => ({ ...card, cardType: "Muse", meta: card.domain })),
    ...seed.epochs.map((card) => ({ ...card, cardType: "Epoch", meta: card.dateRange })),
    ...seed.artists.map((card) => ({
      ...card,
      cardType: "Artist",
      meta: `${card.artistType} · ${card.requiredEpochName ?? epochById.get(card.requiredEpochId)?.name ?? card.requiredEpochId}`
    })),
    ...seed.actions.map((card) => ({ ...card, cardType: "Action", meta: formatCategory(card.category) }))
  ];
}

function populateFilters() {
  if (!epochFilter || !museFilter || !actionFilter || !statusFilter) return;
  epochFilter.insertAdjacentHTML(
    "beforeend",
    seed.epochs.map((epoch) => `<option value="${escapeHtml(epoch.id)}">${escapeHtml(epoch.name)}</option>`).join("")
  );
  museFilter.insertAdjacentHTML(
    "beforeend",
    seed.muses.map((muse) => `<option value="${escapeHtml(muse.id)}">${escapeHtml(muse.name)}</option>`).join("")
  );
  actionFilter.insertAdjacentHTML(
    "beforeend",
    [...new Set(seed.actions.map((action) => action.category))]
      .map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(formatCategory(category))}</option>`)
      .join("")
  );
  statusFilter.insertAdjacentHTML(
    "beforeend",
    [...new Set(normalizedCards().map((card) => card.printStatus))]
      .map((status) => `<option value="${escapeHtml(status)}">${escapeHtml(status)}</option>`)
      .join("")
  );
}

function renderCardTabs() {
  if (!cardTypeTabs) return;
  cardTypeTabs.innerHTML = CARD_TYPES.map(
    (type) => `
      <button type="button" class="${state.activeType === type ? "active" : ""}" data-type="${escapeHtml(type)}">
        ${escapeHtml(type)}
      </button>
    `
  ).join("");
}

function matchesFilters(card) {
  const query = cardSearch?.value.trim().toLowerCase() ?? "";
  const haystack = [
    card.name,
    card.cardType,
    card.meta,
    card.domain,
    card.description,
    card.flavorText,
    card.rulesText,
    card.effectText,
    card.category,
    card.artistType,
    card.requiredEpochName ?? epochById.get(card.requiredEpochId)?.name,
    Object.keys(card.scores ?? {})
      .map((museId) => museById.get(museId)?.name)
      .join(" ")
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (state.activeType !== "All" && card.cardType !== state.activeType) return false;
  if (query && !haystack.includes(query)) return false;
  if (statusFilter?.value && card.printStatus !== statusFilter.value) return false;
  if (epochFilter?.value && card.cardType === "Artist" && card.requiredEpochId !== epochFilter.value) return false;
  if (epochFilter?.value && card.cardType === "Epoch" && card.id !== epochFilter.value) return false;
  if (epochFilter?.value && card.cardType !== "Artist" && card.cardType !== "Epoch") return false;
  if (museFilter?.value && card.cardType === "Artist" && !Object.hasOwn(card.scores ?? {}, museFilter.value)) return false;
  if (museFilter?.value && card.cardType === "Muse" && card.id !== museFilter.value) return false;
  if (museFilter?.value && card.cardType !== "Artist" && card.cardType !== "Muse") return false;
  if (actionFilter?.value && (card.cardType !== "Action" || card.category !== actionFilter.value)) return false;

  return true;
}

function filteredCards() {
  return normalizedCards().filter(matchesFilters);
}

function renderCards() {
  if (!cardsList || !cardCount || !cardDetail) return;
  renderCardTabs();
  const cards = filteredCards();
  cardCount.textContent = `${cards.length} card${cards.length === 1 ? "" : "s"} shown`;

  if (!cards.some((card) => cardKey(card) === state.selectedCardKey)) {
    state.selectedCardKey = cards.length > 0 ? cardKey(cards[0]) : null;
  }

  if (cards.length === 0) {
    cardsList.innerHTML = `<div class="empty-state">No cards match these filters. Clear filters or try a broader search.</div>`;
    cardDetail.innerHTML = `<p class="muted">Select a card to inspect its details.</p>`;
    return;
  }

  cardsList.innerHTML = cards
    .map((card) => {
      const selected = cardKey(card) === state.selectedCardKey;
      const description = cardDescription(card);
      const previewImage = cardImage(card, "card-preview", "card front");
      return `
        <button type="button" class="card-card ${selected ? "selected" : ""}" data-card-key="${escapeHtml(cardKey(card))}">
          ${
            previewImage
              ? `<div class="card-preview-shell">${previewImage}</div>`
              : ""
          }
          <div class="card-card-body">
            <span class="badge">${escapeHtml(card.cardType)}</span>
            <h3>${escapeHtml(card.name)}</h3>
            <p class="muted">${escapeHtml(card.meta ?? "")}</p>
            <p>${escapeHtml(description ?? "")}</p>
            <span class="badge ${card.printStatus === "PRINT_READY" ? "success" : "warning"}">${escapeHtml(card.printStatus)}</span>
          </div>
        </button>
      `;
    })
    .join("");

  renderCardDetail(cards.find((card) => cardKey(card) === state.selectedCardKey) ?? cards[0]);
}

function scoreRows(artist) {
  return seed.muses
    .map((muse) => {
      const value = artist.scores[muse.id];
      return `
        <tr>
          <th scope="row">${escapeHtml(muse.name)}</th>
          <td><span class="score-chip score-${value}">${value}</span></td>
        </tr>
      `;
    })
    .join("");
}

function relatedCards(card) {
  if (card.cardType === "Epoch") {
    return seed.artists
      .filter((artist) => artist.requiredEpochId === card.id)
      .slice(0, 12)
      .map((artist) => artist.name);
  }
  if (card.cardType === "Muse") {
    return seed.artists
      .filter((artist) => artist.scores[card.id] === 3)
      .slice(0, 12)
      .map((artist) => artist.name);
  }
  if (card.cardType === "Artist") {
    return [card.requiredEpochName ?? epochById.get(card.requiredEpochId)?.name].filter(Boolean);
  }
  return [];
}

function renderDiceOutcomes(action) {
  if (!action.diceOutcomes) return "";
  return `
    <h4>Dice Outcomes</h4>
    <ol class="dice-list">
      ${Object.entries(action.diceOutcomes)
        .map(([roll, outcome]) => `<li><strong>${escapeHtml(roll)}</strong> ${escapeHtml(outcome)}</li>`)
        .join("")}
    </ol>
  `;
}

function renderCardDetail(card) {
  if (!card || !cardDetail) return;
  const related = relatedCards(card);
  const epoch = card.cardType === "Artist" ? epochById.get(card.requiredEpochId) : null;
  const sizeLabel = cardSizeLabel(card);
  cardDetail.innerHTML = `
    <div class="detail-sticky">
      ${
        card.imagePath
          ? `<div class="card-image-pair">
              <figure>
                ${cardImage(card, "muse-card-image", "card front")}
                <figcaption>Front</figcaption>
              </figure>
              ${
                card.backImagePath
                  ? `<figure>
                      ${cardBackImage(card, "muse-card-image")}
                      <figcaption>Back</figcaption>
                    </figure>`
                  : ""
              }
            </div>`
          : ""
      }
      <span class="badge">${escapeHtml(card.cardType)}</span>
      <h3>${escapeHtml(card.name)}</h3>
      <p class="muted">${escapeHtml(card.meta ?? "")}</p>
      <p>${escapeHtml(cardDescription(card) ?? "")}</p>
      <dl class="metadata">
        <div><dt>ID</dt><dd>${escapeHtml(card.id)}</dd></div>
        <div><dt>Status</dt><dd>${escapeHtml(card.printStatus)}</dd></div>
        ${sizeLabel ? `<div><dt>Size</dt><dd>${escapeHtml(sizeLabel)}</dd></div>` : ""}
        ${card.copyCount ? `<div><dt>Copies</dt><dd>${escapeHtml(card.copyCount)}</dd></div>` : ""}
        ${epoch ? `<div><dt>Epoch</dt><dd>${escapeHtml(epoch.name)}</dd></div>` : ""}
        ${card.category ? `<div><dt>Category</dt><dd>${escapeHtml(formatCategory(card.category))}</dd></div>` : ""}
        ${card.playCondition ? `<div><dt>Timing</dt><dd>${escapeHtml(card.playCondition)}</dd></div>` : ""}
        ${card.target ? `<div><dt>Target</dt><dd>${escapeHtml(card.target)}</dd></div>` : ""}
      </dl>
      ${
        card.cardType === "Artist"
          ? `<h4>Muse Scores</h4><table class="score-table"><tbody>${scoreRows(card)}</tbody></table>`
          : ""
      }
      ${renderDiceOutcomes(card)}
      ${
        related.length > 0
          ? `<h4>Related</h4><ul class="related-list">${related.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`
          : ""
      }
    </div>
  `;
}

function renderRules() {
  const query = rulesSearch.value.trim().toLowerCase();
  const rules = seed.rules
    .toSorted((a, b) => a.sectionOrder - b.sectionOrder)
    .filter((rule) => `${rule.title} ${rule.bodyMarkdown}`.toLowerCase().includes(query));
  const glossary = seed.glossary.filter((term) => `${term.term} ${term.definition}`.toLowerCase().includes(query));

  rulesNav.innerHTML = seed.rules
    .toSorted((a, b) => a.sectionOrder - b.sectionOrder)
    .map((rule) => `<a href="#rule-${escapeHtml(rule.slug)}">${escapeHtml(rule.title)}</a>`)
    .join("");

  rulesList.innerHTML =
    rules.length === 0
      ? `<div class="empty-state">No rule sections match this search.</div>`
      : rules
          .map(
            (rule) => `
        <article class="content-item rule-section" id="rule-${escapeHtml(rule.slug)}">
          <p class="eyebrow">Section ${escapeHtml(rule.sectionOrder)}</p>
          <h3>${escapeHtml(rule.title)}</h3>
          <p>${escapeHtml(rule.bodyMarkdown)}</p>
        </article>
      `
          )
          .join("");

  glossaryList.innerHTML =
    glossary.length === 0
      ? `<div class="empty-state">No glossary terms match this search.</div>`
      : glossary
          .map(
            (term) => `
        <article class="content-item">
          <h4>${escapeHtml(term.term)}</h4>
          <p>${escapeHtml(term.definition)}</p>
        </article>
      `
          )
          .join("");
}

function renderManifest() {
  if (!manifest) return;
  const counts = countManifest();
  manifest.innerHTML = Object.entries(seed.deckManifest.targets)
    .map(([cardType, target]) => {
      const actual = counts[cardType] ?? 0;
      const status = actual === target ? "Ready" : "Needs seed data";
      return `
        <article class="content-item">
          <h3>${escapeHtml(cardType)}</h3>
          <p>${actual} of ${target}</p>
          <span class="badge ${actual === target ? "" : "warning"}">${status}</span>
        </article>
      `;
    })
    .join("");
}

function endConditionFor(playerCount) {
  return playerCount <= 3
    ? "First to 5 Epochs or Action deck exhausted"
    : "First to 4 Epochs or Action deck exhausted";
}

function setupGuideSteps(playerCount) {
  return [
    "Separate Muse, Epoch, Artist, and Action cards.",
    "Display Muse cards face up.",
    "Shuffle Artist, Epoch, and Action decks separately.",
    "Deal 5 Artist cards, 5 Epoch cards, and 3 Action cards to each player.",
    "Each player rolls a die.",
    "Players choose one unique Muse in order from highest roll to lowest.",
    `Use this end condition: ${endConditionFor(playerCount)}.`
  ];
}

function ensurePlayers() {
  const playerCount = Number(playerCountSelect.value);
  while (state.players.length < playerCount) {
    const nextNumber = state.players.length + 1;
    const availableMuse = seed.muses.find((muse) => !state.players.some((player) => player.museId === muse.id));
    state.players.push({
      id: `player-${nextNumber}`,
      name: nextNumber === 1 ? "You" : `NPC ${nextNumber - 1}`,
      museId: availableMuse?.id ?? "",
      roll: 0
    });
  }
  state.players = state.players.slice(0, playerCount);
}

function museOptions(selectedMuseId) {
  return [
    `<option value="">Choose Muse</option>`,
    ...seed.muses.map(
      (muse) =>
        `<option value="${escapeHtml(muse.id)}" ${muse.id === selectedMuseId ? "selected" : ""}>${escapeHtml(muse.name)}</option>`
    )
  ].join("");
}

function renderSetupCompanion() {
  ensurePlayers();
  const playerCount = Number(playerCountSelect.value);
  endCondition.textContent = endConditionFor(playerCount);
  setupSteps.innerHTML = setupGuideSteps(playerCount).map((step) => `<li>${escapeHtml(step)}</li>`).join("");

  const selectionOrder = [...state.players].sort((a, b) => b.roll - a.roll || a.name.localeCompare(b.name));
  const orderByPlayer = new Map(selectionOrder.map((player, index) => [player.id, index + 1]));

  playersSetup.innerHTML = state.players
    .map(
      (player) => `
        <div class="player-card" data-player-id="${escapeHtml(player.id)}">
          <label>
            <span>Player</span>
            <input class="player-name" value="${escapeHtml(player.name)}" aria-label="Player name">
          </label>
          <label>
            <span>Muse</span>
            <select class="player-muse">${museOptions(player.museId)}</select>
          </label>
          <div class="roll-display">
            <span>Roll</span>
            <strong>${player.roll || "-"}</strong>
          </div>
          <p class="muted">Selection order: ${player.roll ? orderByPlayer.get(player.id) : "Roll needed"}</p>
        </div>
      `
    )
    .join("");

  const chosenMuses = state.players.map((player) => player.museId).filter(Boolean);
  const duplicates = chosenMuses.filter((museId, index) => chosenMuses.indexOf(museId) !== index);
  setupWarning.textContent =
    duplicates.length > 0 ? "Each Muse can be chosen by only one player. Resolve duplicate Muse selections before play." : "";
  renderScoringHelper();
}

function epochOptions(selectedEpochId) {
  return [
    `<option value="">Choose Epoch</option>`,
    ...seed.epochs.map(
      (epoch) =>
        `<option value="${escapeHtml(epoch.id)}" ${epoch.id === selectedEpochId ? "selected" : ""}>${escapeHtml(epoch.name)}</option>`
    )
  ].join("");
}

function artistOptions(selectedArtistId) {
  return [
    `<option value="">Choose Artist</option>`,
    ...seed.artists.map(
      (artist) =>
        `<option value="${escapeHtml(artist.id)}" ${artist.id === selectedArtistId ? "selected" : ""}>${escapeHtml(artist.name)}</option>`
    )
  ].join("");
}

function playerOptions(selectedPlayerId) {
  return state.players
    .map(
      (player) =>
        `<option value="${escapeHtml(player.id)}" ${player.id === selectedPlayerId ? "selected" : ""}>${escapeHtml(player.name)}</option>`
    )
    .join("");
}

function scoreRowValidation(row) {
  const artist = artistById(row.artistId);
  if (!row.playerId || !row.epochId || !row.artistId) {
    return { valid: false, message: "Incomplete set. Choose player, Epoch, and Artist." };
  }
  if (!artist) {
    return { valid: false, message: "Artist not found." };
  }
  if (artist.requiredEpochId !== row.epochId) {
    return {
      valid: false,
      message: `${artist.name} belongs to ${artist.requiredEpochName ?? epochById.get(artist.requiredEpochId)?.name ?? artist.requiredEpochId}.`
    };
  }
  return { valid: true, message: "Valid set." };
}

function artistById(artistId) {
  return seed.artists.find((artist) => artist.id === artistId);
}

function playerById(playerId) {
  return state.players.find((player) => player.id === playerId);
}

function scoreForRow(row) {
  const validation = scoreRowValidation(row);
  const player = playerById(row.playerId);
  const artist = artistById(row.artistId);
  if (!validation.valid || !player?.museId || !artist?.scores) return 0;
  return artist.scores[player.museId] ?? 0;
}

function playerTotals() {
  const totals = new Map(state.players.map((player) => [player.id, 0]));
  for (const row of state.scoreRows) {
    totals.set(row.playerId, (totals.get(row.playerId) ?? 0) + scoreForRow(row));
  }
  return totals;
}

function renderScoringHelper() {
  if (state.scoreRows.length === 0 && state.players.length > 0) {
    state.scoreRows.push({ id: "set-1", playerId: state.players[0].id, epochId: "", artistId: "" });
  }

  scoreRowsContainer.innerHTML = state.scoreRows
    .map((row, index) => {
      const validation = scoreRowValidation(row);
      const rowScore = scoreForRow(row);
      return `
        <div class="score-row ${validation.valid ? "valid" : "invalid"}" data-row-id="${escapeHtml(row.id)}">
          <span class="row-number">${index + 1}</span>
          <label>
            <span>Player</span>
            <select class="score-player">${playerOptions(row.playerId)}</select>
          </label>
          <label>
            <span>Epoch</span>
            <select class="score-epoch">${epochOptions(row.epochId)}</select>
          </label>
          <label>
            <span>Artist</span>
            <select class="score-artist">${artistOptions(row.artistId)}</select>
          </label>
          <div class="row-score">
            <span>Score</span>
            <strong>${rowScore}</strong>
          </div>
          <button type="button" class="icon-button remove-score-row" aria-label="Remove set">x</button>
          <p>${escapeHtml(validation.message)}</p>
        </div>
      `;
    })
    .join("");

  renderScoreSummary();
}

function renderScoreSummary() {
  const totals = playerTotals();
  scoreSummary.innerHTML = state.players
    .map((player) => {
      const muse = museById.get(player.museId);
      return `
        <article class="score-total">
          <span>${escapeHtml(player.name)}</span>
          <strong>${totals.get(player.id) ?? 0}</strong>
          <small>${escapeHtml(muse?.name ?? "No Muse")}</small>
        </article>
      `;
    })
    .join("");

  const sortedScores = [...totals.entries()].sort((a, b) => b[1] - a[1]);
  const highScore = sortedScores[0]?.[1] ?? 0;
  const leaders = sortedScores.filter(([, score]) => score === highScore && highScore > 0);
  tieStatus.textContent =
    leaders.length > 1
      ? `Tie detected between ${leaders.map(([playerId]) => playerById(playerId)?.name).join(", ")}.`
      : "Artist Duel is available when players are tied.";
}

function validScoreRows() {
  return state.scoreRows.filter((row) => scoreRowValidation(row).valid);
}

function epochCountForPlayer(playerId) {
  return new Set(validScoreRows().filter((row) => row.playerId === playerId).map((row) => row.epochId)).size;
}

function loadPlaytests() {
  try {
    state.playtests = JSON.parse(localStorage.getItem(PLAYTEST_STORAGE_KEY) ?? "[]");
  } catch {
    state.playtests = [];
  }
}

function persistPlaytests() {
  localStorage.setItem(PLAYTEST_STORAGE_KEY, JSON.stringify(state.playtests));
}

function placePlayers(players) {
  return [...players]
    .sort((a, b) => b.finalScore - a.finalScore || b.finalEpochCount - a.finalEpochCount || a.playerName.localeCompare(b.playerName))
    .map((player, index) => ({ ...player, placement: index + 1 }));
}

function savePlaytestFromScoreSheet() {
  const totals = playerTotals();
  const sessionPlayers = placePlayers(
    state.players.map((player) => ({
      playerName: player.name,
      museId: player.museId,
      museName: museById.get(player.museId)?.name ?? "No Muse",
      finalScore: totals.get(player.id) ?? 0,
      finalEpochCount: epochCountForPlayer(player.id)
    }))
  );

  const missingMuse = sessionPlayers.some((player) => !player.museId);
  if (missingMuse) {
    playtestSaveStatus.textContent = "Choose a Muse for every player before saving.";
    return;
  }

  const session = {
    id: `playtest-${Date.now()}`,
    playedAt: playtestDate.value,
    playerCount: Number(playerCountSelect.value),
    rulesVersionId: seed.rulesVersion.id,
    rulesVersionLabel: seed.rulesVersion.versionLabel,
    deckManifestId: seed.deckManifest.id,
    deckManifestLabel: seed.deckManifest.versionLabel,
    durationMinutes: Number(playtestDuration.value || 0),
    endCondition: playtestEndCondition.value,
    notes: playtestNotes.value.trim(),
    players: sessionPlayers,
    sets: validScoreRows().map((row) => {
      const artist = artistById(row.artistId);
      const player = playerById(row.playerId);
      return {
        playerName: player?.name ?? "",
        museId: player?.museId ?? "",
        epochId: row.epochId,
        epochName: epochById.get(row.epochId)?.name ?? row.epochId,
        artistId: row.artistId,
        artistName: artist?.name ?? row.artistId,
        score: scoreForRow(row)
      };
    }),
    feedback: feedbackText.value.trim()
      ? [
          {
            severity: feedbackSeverity.value,
            text: feedbackText.value.trim(),
            createdAt: new Date().toISOString()
          }
        ]
      : []
  };

  state.playtests.unshift(session);
  persistPlaytests();
  playtestSaveStatus.textContent = "Playtest saved.";
  renderPlaytests();
}

function museBalanceRows() {
  const museStats = new Map(
    seed.muses.map((muse) => [
      muse.id,
      {
        muse,
        plays: 0,
        wins: 0,
        totalScore: 0,
        feedback: 0
      }
    ])
  );

  for (const session of state.playtests) {
    const bestPlacement = Math.min(...session.players.map((player) => player.placement));
    for (const player of session.players) {
      const stats = museStats.get(player.museId);
      if (!stats) continue;
      stats.plays += 1;
      stats.totalScore += player.finalScore;
      if (player.placement === bestPlacement) stats.wins += 1;
    }
    for (const item of session.feedback ?? []) {
      if (item.severity === "Balance Concern") {
        for (const player of session.players) {
          museStats.get(player.museId).feedback += 1;
        }
      }
    }
  }

  return [...museStats.values()].filter((stats) => stats.plays > 0);
}

function renderBalanceSummary() {
  const rows = museBalanceRows();
  if (rows.length === 0) {
    balanceSummary.innerHTML = `<div class="empty-state">No playtests saved yet. Save a score sheet to start balance tracking.</div>`;
    return;
  }

  balanceSummary.innerHTML = rows
    .map((stats) => {
      const averageScore = Math.round((stats.totalScore / stats.plays) * 10) / 10;
      const winRate = Math.round((stats.wins / stats.plays) * 100);
      return `
        <article class="balance-card">
          <h4>${escapeHtml(stats.muse.name)}</h4>
          <dl class="mini-stats">
            <div><dt>Plays</dt><dd>${stats.plays}</dd></div>
            <div><dt>Wins</dt><dd>${stats.wins}</dd></div>
            <div><dt>Win rate</dt><dd>${winRate}%</dd></div>
            <div><dt>Avg score</dt><dd>${averageScore}</dd></div>
          </dl>
        </article>
      `;
    })
    .join("");
}

function renderPlaytests() {
  renderBalanceSummary();

  if (state.playtests.length === 0) {
    playtestList.innerHTML = `<div class="empty-state">No playtests logged yet.</div>`;
    return;
  }

  playtestList.innerHTML = state.playtests
    .map((session) => {
      const winner = session.players.find((player) => player.placement === 1);
      const feedback = session.feedback ?? [];
      return `
        <article class="content-item playtest-card">
          <div class="panel-heading">
            <div>
              <p class="eyebrow">${escapeHtml(session.playedAt || "Undated")}</p>
              <h3>${escapeHtml(winner?.playerName ?? "No winner")} won with ${escapeHtml(winner?.museName ?? "No Muse")}</h3>
              <p class="muted">${session.playerCount} players - ${session.durationMinutes} min - ${escapeHtml(session.endCondition)}</p>
            </div>
            <span class="badge">${escapeHtml(session.rulesVersionLabel)}</span>
          </div>
          <div class="session-player-grid">
            ${session.players
              .map(
                (player) => `
                  <div>
                    <strong>${player.placement}. ${escapeHtml(player.playerName)}</strong>
                    <span>${escapeHtml(player.museName)} - ${player.finalScore} pts - ${player.finalEpochCount} Epochs</span>
                  </div>
                `
              )
              .join("")}
          </div>
          ${session.notes ? `<p>${escapeHtml(session.notes)}</p>` : ""}
          ${
            feedback.length > 0
              ? `<ul class="related-list">${feedback
                  .map((item) => `<li><strong>${escapeHtml(item.severity)}:</strong> ${escapeHtml(item.text)}</li>`)
                  .join("")}</ul>`
              : ""
          }
        </article>
      `;
    })
    .join("");
}

function createGamePlayer(index, name, isHuman) {
  return {
    id: `game-player-${index + 1}`,
    name,
    isHuman,
    roll: Math.floor(Math.random() * 6) + 1,
    museId: "",
    hand: {
      artists: [],
      epochs: [],
      actions: []
    },
    tableau: [],
    score: 0
  };
}

function defaultGamePlayerName(index) {
  return index === 0 ? "You" : `NPC ${index}`;
}

function gameSetupNames() {
  const typedNames = [...gameSetup.querySelectorAll(".game-setup-name")].map((input) => input.value.trim());
  return Array.from(
    { length: Number(gamePlayerCountSelect.value) },
    (_, index) => typedNames[index] || state.game?.players[index]?.name || defaultGamePlayerName(index)
  );
}

function renderGameSetup() {
  const count = Number(gamePlayerCountSelect.value);
  const names = gameSetupNames();
  const setupStep = state.setupFlow.step ?? setupStepForGame();
  const players =
    state.game?.players ??
    Array.from({ length: count }, (_, index) => ({
      id: `setup-player-${index + 1}`,
      name: names[index],
      isHuman: index === 0,
      roll: 0,
      museId: "",
      hand: { artists: [], epochs: [], actions: [] },
      tableau: [],
      score: 0
    }));
  const ordered = state.game ? gameSelectionOrder(state.game) : players;
  const orderByPlayerId = new Map(ordered.map((player, index) => [player.id, index + 1]));

  gameSetup.innerHTML = players
    .map((player, index) => {
      if (setupStep === 1) {
        return `
          <div class="game-setup-row setup-player-row" data-game-player-index="${index}">
            <label>
              <span>${player.isHuman ? "Human" : "NPC"}</span>
              <input class="game-setup-name" value="${escapeHtml(player.name)}" aria-label="Player ${index + 1} name">
            </label>
            <strong class="setup-seat-number">Seat ${index + 1}</strong>
          </div>
        `;
      }
      const muse = museById.get(player.museId);
      const handCount = player.hand.artists.length + player.hand.epochs.length + player.hand.actions.length;
      return `
        <div class="game-setup-row ${player.id === state.game?.currentPlayerId ? "active" : ""}" data-game-player-index="${index}">
          <label>
            <span>${player.isHuman ? "Human Player" : `NPC Player ${index + 1}`}</span>
            <input class="game-setup-name" value="${escapeHtml(player.name)}" aria-label="Player ${index + 1} name">
          </label>
          <div>
            <span>Turn Order</span>
            <strong>${state.game ? orderByPlayerId.get(player.id) : "-"}</strong>
          </div>
          <div>
            <span>Roll</span>
            <strong>${player.roll || "-"}</strong>
          </div>
          <div>
            <span>Muse</span>
            <strong>${escapeHtml(muse?.name ?? "Select after roll")}</strong>
          </div>
          <div>
            <span>Hand</span>
            <strong>${state.game ? handCount : "-"}</strong>
          </div>
          <div>
            <span>Score</span>
            <strong>${player.score ?? 0}</strong>
          </div>
        </div>
      `;
    })
    .join("");
}

function gameSelectionOrder(game) {
  return [...game.players].sort((a, b) => b.roll - a.roll || a.name.localeCompare(b.name));
}

function availableMuseIds(game) {
  const selected = new Set(game.players.map((player) => player.museId).filter(Boolean));
  return seed.muses.filter((muse) => !selected.has(muse.id)).map((muse) => muse.id);
}

function currentMusePicker(game) {
  return gameSelectionOrder(game).find((player) => !player.museId);
}

function resolveNpcMuseChoices() {
  const game = state.game;
  if (!game) return;

  let picker = currentMusePicker(game);
  while (picker && !picker.isHuman) {
    const available = availableMuseIds(game);
    picker.museId = shuffle(available)[0] ?? "";
    game.log.unshift(`${picker.name} chose ${museById.get(picker.museId)?.name ?? "a Muse"}.`);
    picker = currentMusePicker(game);
  }

  if (picker?.isHuman) {
    state.setupFlow.step = 3;
  }

  if (!picker) {
    state.setupFlow.step = 4;
    game.log.unshift("All Muses selected. The first digital turn is ready.");
    startFirstTurn(game);
    void runNpcTurnIfNeeded();
  }
}

function startNewGame() {
  const playerCount = Number(gamePlayerCountSelect.value);
  const playerNames = gameSetupNames();
  const artistDeck = shuffle(withInstances(seed.artists, "artist"));
  const epochDeck = shuffle(withInstances(expandedEpochDeck(), "epoch"));
  const actionDeck = shuffle(withInstances(seed.actions, "action"));
  const players = Array.from({ length: playerCount }, (_, index) =>
    createGamePlayer(index, playerNames[index] || defaultGamePlayerName(index), index === 0)
  );

  for (const player of players) {
    player.hand.artists = draw(artistDeck, 5);
    player.hand.epochs = draw(epochDeck, 5);
    player.hand.actions = draw(actionDeck, 3);
  }

  state.game = {
    phase: "Muse Selection",
    currentPlayerId: "",
    turnNumber: 0,
    artistsPlayedThisTurn: 0,
    actionPlayedThisTurn: false,
    selectedCards: { epoch: "", artist: "", action: "" },
    inspectedCard: null,
    draggedCard: null,
    diceRoll: {
      isRolling: false,
      value: null,
      actionName: "",
      outcome: "",
      history: []
    },
    pendingFateAction: null,
    players,
    decks: { artist: artistDeck, epoch: epochDeck, action: actionDeck },
    discards: { artist: [], epoch: [], action: [] },
    winnerIds: [],
    log: [
      "Dealt 5 Artists, 5 Epochs, and 3 Actions to each player.",
      "Rolled dice for Muse selection order."
    ]
  };

  state.setupFlow.open = true;
  state.setupFlow.step = 2;
  resolveNpcMuseChoices();
  renderGame();
}

function humanPlayer(game = state.game) {
  return game?.players.find((player) => player.isHuman);
}

function activePlayer(game = state.game) {
  return game?.players.find((player) => player.id === game.currentPlayerId);
}

function endEpochTarget(game = state.game) {
  return game.players.length <= 3 ? 5 : 4;
}

function scorePlayer(player) {
  return player.tableau.reduce(
    (total, set) =>
      total +
      set.artists.reduce(
        (artistTotal, artist) =>
          artistTotal + (isValidArtistEpochPair(artist, set.epoch) ? artist.scores[player.museId] ?? 0 : 0),
        0
      ),
    0
  );
}

function refreshScores(game = state.game) {
  enforceTableauValidity(game);
  for (const player of game.players) {
    player.score = scorePlayer(player);
  }
}

function scoreHeaderName(player) {
  if (player.name === "You") return "You";
  const npcNumber = player.name.match(/^NPC\s*(\d+)$/i)?.[1];
  return npcNumber ? `N${npcNumber}` : player.name;
}

function addGameLog(message) {
  state.game?.log.unshift(message);
}

function removeByInstance(cards, instanceId) {
  const index = cards.findIndex((card) => card.instanceId === instanceId);
  if (index < 0) return null;
  return cards.splice(index, 1)[0];
}

function isValidArtistEpochPair(artist, epoch) {
  return Boolean(
    artist?.requiredEpochId &&
    epoch?.epochId &&
    artist.requiredEpochId === epoch.epochId
  );
}

function logBlockedInvalidPair(artist, epoch) {
  console.error("Blocked invalid Artist/Epoch pair", {
    artistName: artist?.name,
    requiredEpochId: artist?.requiredEpochId,
    requiredEpochName: artist?.requiredEpochName,
    epochName: epoch?.name,
    epochId: epoch?.epochId
  });
}

function enforceTableauValidity(game = state.game) {
  if (!game) return;
  for (const player of game.players) {
    const validSets = [];
    for (const set of player.tableau) {
      const validArtists = [];
      for (const artist of set.artists) {
        const isValidPair = isValidArtistEpochPair(artist, set.epoch);
        const score = isValidPair ? artistMuseScore(player, artist) : 0;
        if (!isValidPair || (!player.isHuman && score <= 0)) {
          console.error("Removed invalid Artist/Epoch tableau pair", {
            player: player.name,
            muse: museById.get(player.museId)?.name ?? player.museId,
            artistName: artist?.name,
            requiredEpochId: artist?.requiredEpochId,
            requiredEpochName: artist?.requiredEpochName,
            epochName: set.epoch?.name,
            epochId: set.epoch?.epochId,
            isValidPair,
            score,
            reason: !isValidPair ? "epoch mismatch" : "zero-point NPC pair"
          });
          game.discards.artist.push(artist);
        } else {
          validArtists.push(artist);
        }
      }
      if (validArtists.length === 0) {
        game.discards.epoch.push(set.epoch);
      } else {
        set.artists = validArtists;
        validSets.push(set);
      }
    }
    player.tableau = validSets;
  }
}

function auditCanonicalEpochData() {
  const errors = [];
  const epochIdCounts = new Map();
  for (const epoch of seed.epochs) {
    epochIdCounts.set(epoch.epochId, (epochIdCounts.get(epoch.epochId) ?? 0) + 1);
    if (!epoch.epochId || !epoch.epochName) {
      errors.push({ type: "Epoch missing canonical fields", id: epoch.id, name: epoch.name, epochId: epoch.epochId, epochName: epoch.epochName });
    }
  }
  for (const [epochId, count] of epochIdCounts) {
    if (!epochId || count > 1) errors.push({ type: "Duplicate or blank Epoch ID", epochId, count });
  }
  const knownEpochIds = new Set(seed.epochs.map((epoch) => epoch.epochId).filter(Boolean));
  for (const artist of seed.artists) {
    if (!artist.requiredEpochId || !artist.requiredEpochName) {
      errors.push({
        type: "Artist missing canonical required Epoch",
        id: artist.id,
        name: artist.name,
        requiredEpochId: artist.requiredEpochId,
        requiredEpochName: artist.requiredEpochName
      });
      continue;
    }
    if (!knownEpochIds.has(artist.requiredEpochId)) {
      errors.push({
        type: "Artist requiredEpochId not found in Epoch deck",
        id: artist.id,
        name: artist.name,
        requiredEpochId: artist.requiredEpochId,
        requiredEpochName: artist.requiredEpochName
      });
    }
  }
  if (errors.length > 0) {
    console.error("[Xanadu canonical Epoch audit failed]", errors);
  }
}

function logNpcTableauDecision(player, { artist, epoch, isValidPair, score, decision }) {
  console.log("NPC pair check", {
    npc: player?.name ?? "NPC",
    muse: museById.get(player?.museId)?.name ?? player?.museId ?? "No Muse",
    artist: artist?.name ?? "Unknown Artist",
    artistRequiredEpochId: artist?.requiredEpochId ?? "",
    artistRequiredEpochName: artist?.requiredEpochName ?? "",
    epoch: epoch?.name ?? epoch?.epochName ?? "Unknown Epoch",
    epochId: epoch?.epochId ?? "",
    isValidPair,
    score,
    decision
  });
}

function artistMuseScore(player, artist) {
  return artist?.scores?.[player?.museId] ?? 0;
}

function matchingTableauSet(player, artist) {
  return player.tableau.find((set) => isValidArtistEpochPair(artist, set.epoch));
}

function legalEpochArtistPairs(player) {
  return player.hand.epochs.flatMap((epoch) =>
    player.hand.artists
      .filter((artist) => isValidArtistEpochPair(artist, epoch))
      .map((artist) => ({ epoch, artist }))
  );
}

function findPlayableTableauMove(player) {
  const playablePair = legalEpochArtistPairs(player)[0];
  if (playablePair) return { type: "new-set", ...playablePair };

  const attachArtist = player.hand.artists.find((artist) => matchingTableauSet(player, artist));
  if (attachArtist) {
    return {
      type: "attach",
      artist: attachArtist,
      targetSet: matchingTableauSet(player, attachArtist)
    };
  }

  return null;
}

function findBestNpcTableauMove(player) {
  const newSetMoves = player.hand.epochs.flatMap((epoch) =>
    player.hand.artists
      .map((artist) => {
        const isValidPair = isValidArtistEpochPair(artist, epoch);
        const score = isValidPair ? artistMuseScore(player, artist) : 0;
        const decision = !isValidPair ? "rejected: epoch mismatch" : score <= 0 ? "rejected: zero-point play" : "candidate";
        logNpcTableauDecision(player, { artist, epoch, isValidPair, score, decision });
        return isValidPair && score > 0 ? { type: "new-set", epoch, artist, score } : null;
      })
      .filter(Boolean)
  );

  const attachMoves = player.hand.artists
    .map((artist) => {
      const targetSet = player.tableau.find((set) => isValidArtistEpochPair(artist, set.epoch));
      if (!targetSet) return null;
      const isValidPair = isValidArtistEpochPair(artist, targetSet.epoch);
      const score = isValidPair ? artistMuseScore(player, artist) : 0;
      const decision = !isValidPair ? "rejected: epoch mismatch" : score <= 0 ? "rejected: zero-point play" : "candidate";
      logNpcTableauDecision(player, { artist, epoch: targetSet.epoch, isValidPair, score, decision });
      return isValidPair && score > 0 ? { type: "attach", artist, targetSet, score } : null;
    })
    .filter(Boolean);

  return [...newSetMoves, ...attachMoves].sort((a, b) => b.score - a.score)[0] ?? null;
}

function playTableauMove(player, move) {
  if (move.type === "new-set") {
    if (!isValidArtistEpochPair(move.artist, move.epoch)) {
      logBlockedInvalidPair(move.artist, move.epoch);
      addGameLog(`${move.artist?.name ?? "That Artist"} cannot be played with ${move.epoch?.name ?? "that Epoch"}; the Epoch must match.`);
      return false;
    }
    if (!player.isHuman && artistMuseScore(player, move.artist) <= 0) {
      addGameLog(`${player.name} skipped ${move.artist?.name ?? "that Artist"} because it scores 0 for their Muse.`);
      return false;
    }
    const playedEpoch = removeByInstance(player.hand.epochs, move.epoch.instanceId);
    const playedArtist = removeByInstance(player.hand.artists, move.artist.instanceId);
    if (!playedEpoch || !playedArtist) {
      addGameLog("That set could not be played because one of the cards is no longer in your hand.");
      return false;
    }
    player.tableau.push({ epoch: playedEpoch, artists: [playedArtist] });
    if (!player.isHuman) {
      logNpcTableauDecision(player, {
        artist: playedArtist,
        epoch: playedEpoch,
        isValidPair: true,
        score: artistMuseScore(player, playedArtist),
        decision: "played: highest-scoring valid pair"
      });
    }
    addGameLog(`${player.name} played ${playedEpoch.name} with ${playedArtist.name}.`);
    return true;
  }

  if (!isValidArtistEpochPair(move.artist, move.targetSet?.epoch)) {
    logBlockedInvalidPair(move.artist, move.targetSet?.epoch);
    addGameLog(`${move.artist?.name ?? "That Artist"} cannot attach to ${move.targetSet?.epoch?.name ?? "that Epoch"}; the Epoch must match.`);
    return false;
  }
  if (!player.isHuman && artistMuseScore(player, move.artist) <= 0) {
    addGameLog(`${player.name} skipped ${move.artist?.name ?? "that Artist"} because it scores 0 for their Muse.`);
    return false;
  }
  const playedArtist = removeByInstance(player.hand.artists, move.artist.instanceId);
  if (!playedArtist) {
    addGameLog("That Artist could not be played because it is no longer in your hand.");
    return false;
  }
  move.targetSet.artists.push(playedArtist);
  if (!player.isHuman) {
    logNpcTableauDecision(player, {
      artist: playedArtist,
      epoch: move.targetSet.epoch,
      isValidPair: true,
      score: artistMuseScore(player, playedArtist),
      decision: "played: highest-scoring valid attach"
    });
  }
  addGameLog(`${player.name} attached ${playedArtist.name} to ${move.targetSet.epoch.name}.`);
  return true;
}

function selectedHandCards(player) {
  const selected = state.game.selectedCards;
  return {
    epoch: player.hand.epochs.find((card) => card.instanceId === selected.epoch),
    artist: player.hand.artists.find((card) => card.instanceId === selected.artist),
    action: player.hand.actions.find((card) => card.instanceId === selected.action)
  };
}

function startFirstTurn(game = state.game) {
  game.phase = "Draw Action";
  game.currentPlayerId = gameSelectionOrder(game)[0]?.id ?? game.players[0].id;
  game.turnNumber = 1;
  game.artistsPlayedThisTurn = 0;
  game.actionPlayedThisTurn = false;
  game.selectedCards = { epoch: "", artist: "", action: "" };
  game.inspectedCard = null;
  game.draggedCard = null;
  game.pendingFateAction = null;
  addGameLog(`${activePlayer(game).name} starts turn 1.`);
}

function gameCardSubtitle(card, type) {
  if (type === "Artist") return card.requiredEpochName ?? epochById.get(card.requiredEpochId)?.name ?? card.requiredEpochId;
  if (type === "Epoch") return card.dateRange ?? "Epoch";
  if (type === "Action") return formatCategory(card.category);
  return card.domain ?? type;
}

function gameCardBody(card, type) {
  if (type === "Action") return card.effectText ?? card.rulesText ?? "";
  if (type === "Epoch") return card.flavorText ?? card.description ?? "";
  if (type === "Artist") return card.artistType ?? card.description ?? "";
  return card.description ?? "";
}

function gameCardGlyph(type) {
  return {
    Muse: "M",
    Epoch: "E",
    Artist: "A",
    Action: "!"
  }[type] ?? "X";
}

function gameCardScoreLabel(card, type, museId) {
  if (type !== "Artist" || !state.game) return "";
  const fallbackPlayer = activePlayer(state.game)?.isHuman ? activePlayer(state.game) : humanPlayer(state.game);
  const scoringMuseId = museId ?? fallbackPlayer?.museId;
  if (!scoringMuseId) return "";
  const muse = museById.get(scoringMuseId);
  const score = card.scores?.[scoringMuseId] ?? 0;
  return `${score} for ${muse?.name ?? "Muse"}`;
}

function deckBackPathForType(type) {
  return {
    Muse: "/assets/muses/muse-back.png",
    Epoch: "/assets/epochs/epoch-back.png",
    Artist: "/assets/artists/artist-back.png",
    Action: "/assets/actions/action-back.png"
  }[type] ?? sharedCardBackPath;
}

function cardTypeFromPileLabel(label) {
  if (/artist/i.test(label)) return "Artist";
  if (/epoch/i.test(label)) return "Epoch";
  if (/action/i.test(label)) return "Action";
  if (/muse/i.test(label)) return "Muse";
  return "";
}

function epochImagePath(card) {
  const epochIndex = epochIndexById.get(card.id);
  if (epochIndex === undefined) return card.imagePath ?? "";
  return `/assets/epochs/${card.id}.png`;
}

function finalDisplayCard(card, type) {
  if (type === "Muse") {
    const muse = museById.get(card.id) ?? card;
    return {
      ...muse,
      ...card,
      imagePath: card.imagePath ?? muse.imagePath,
      backImagePath: card.backImagePath ?? deckBackPathForType(type)
    };
  }
  if (type === "Epoch") {
    return {
      ...card,
      imagePath: card.imagePath ?? epochImagePath(card),
      backImagePath: card.backImagePath ?? deckBackPathForType(type)
    };
  }
  if (type === "Artist") {
    const epoch = epochById.get(card.requiredEpochId);
    return {
      ...card,
      cardKind: "artist",
      epochName: card.requiredEpochName ?? card.epochName ?? epoch?.name ?? card.requiredEpochId,
      artworkPath: card.artworkPath ?? "",
      artworkPrompt: card.artworkPrompt ?? generateArtistArtworkPrompt(card),
      backImagePath: card.backImagePath ?? deckBackPathForType(type)
    };
  }
  if (type === "Action") {
    return {
      ...card,
      cardKind: "action",
      artworkPath: card.artworkPath ?? "",
      artworkPrompt: card.artworkPrompt ?? generateActionArtworkPrompt(card),
      backImagePath: card.backImagePath ?? deckBackPathForType(type)
    };
  }
  return card;
}

function renderFinalCardFront(card, type) {
  const displayCard = finalDisplayCard(card, type);
  if (type === "Artist") return renderArtistCardFront(displayCard);
  if (type === "Action") return renderActionCardFront(displayCard);
  if (displayCard.imagePath) {
    return `<img class="physical-card-full-art" src="${escapeHtml(displayCard.imagePath)}" alt="${escapeHtml(`${displayCard.name} ${type} card front`)}">`;
  }
  return `<span class="card-art-window"><span class="card-glyph">${escapeHtml(gameCardGlyph(type))}</span></span>`;
}

function handCardStyle(index = 0, total = 1) {
  const middle = (total - 1) / 2;
  const rotation = Math.max(-12, Math.min(12, (index - middle) * 2.8));
  return `--card-index:${index}; --fan-rotate:${rotation.toFixed(2)}deg;`;
}

function renderPhysicalCard(card, type, options = {}) {
  const {
    interactive = true,
    selected = false,
    inspected = false,
    faceDown = false,
    index = 0,
    total = 1,
    extraClass = "",
    scoreMuseId = null
  } = options;
  const tag = interactive ? "button" : "div";
  const attrs = interactive
    ? `type="button" draggable="true" data-card-type="${escapeHtml(type.toLowerCase())}" data-instance-id="${escapeHtml(card.instanceId)}"`
    : `role="img"`;
  const displayCard = finalDisplayCard(card, type);
  const backPath = displayCard.backImagePath ?? deckBackPathForType(type);
  const style = handCardStyle(index, total);
  const cardClasses = [
    "play-card",
    "physical-card",
    "final-design-card",
    `card-type-${type.toLowerCase()}`,
    selected ? "selected" : "",
    inspected ? "inspected" : "",
    faceDown ? "face-down" : "",
    extraClass
  ]
    .filter(Boolean)
    .join(" ");

  if (faceDown) {
    return `
      <${tag} ${attrs} class="${cardClasses}" style="${style}" aria-label="${escapeHtml(`${type} card back`)}">
        <span class="physical-card-back">
          <img src="${escapeHtml(backPath)}" alt="">
        </span>
      </${tag}>
    `;
  }

  return `
    <${tag} ${attrs} class="${cardClasses}" style="${style}" aria-label="${escapeHtml(`${type} card: ${displayCard.name}`)}">
      <span class="physical-card-face">
        ${renderFinalCardFront(displayCard, type)}
      </span>
    </${tag}>
  `;
}

function renderGameCard(card, type, index = 0, total = 1) {
  const selected = state.game?.selectedCards?.[type.toLowerCase()] === card.instanceId;
  const inspected =
    state.game?.inspectedCard?.type === type.toLowerCase() && state.game?.inspectedCard?.instanceId === card.instanceId;
  return renderPhysicalCard(card, type, {
    interactive: true,
    selected,
    inspected,
    index,
    total
  });
}

function renderCardPile(label, count, variant = "deck") {
  const stackCount = Math.max(1, Math.min(3, count));
  const backPath = deckBackPathForType(cardTypeFromPileLabel(label));
  const stack = Array.from({ length: stackCount }, (_, index) => {
    const offset = count === 0 ? 0 : index;
    return `
      <span class="pile-card-back" style="--pile-offset:${offset};">
        <img src="${escapeHtml(backPath)}" alt="">
      </span>
    `;
  }).join("");
  return `
    <article class="card-pile ${variant} ${count === 0 ? "empty" : ""}" aria-label="${escapeHtml(`${label}: ${count} cards`)}">
      <div class="mini-card-stack">${stack}</div>
      <strong>${escapeHtml(label)}</strong>
      <span>${count} card${count === 1 ? "" : "s"}</span>
    </article>
  `;
}

function hiddenBackPathsForPlayer(player) {
  return [
    ...player.hand.epochs.map(() => deckBackPathForType("Epoch")),
    ...player.hand.artists.map(() => deckBackPathForType("Artist")),
    ...player.hand.actions.map(() => deckBackPathForType("Action"))
  ];
}

function renderFaceDownHand(count, backPaths = []) {
  const visible = Math.max(0, Math.min(5, count));
  if (visible === 0) return `<span class="opponent-hand-empty">0 cards</span>`;
  const visibleBacks = backPaths.length > 0
    ? backPaths.slice(0, visible)
    : Array.from({ length: visible }, (_, index) => {
        const types = ["Epoch", "Artist", "Action"];
        return deckBackPathForType(types[index % types.length]);
      });
  return `
    <div class="opponent-hand-backs" aria-label="${count} hidden cards">
      ${visibleBacks.map((backPath, index) => `
        <span class="opponent-card-back" style="--hidden-index:${index}; --hidden-total:${visible};">
          <img src="${escapeHtml(backPath)}" alt="">
        </span>
      `).join("")}
      <strong>${count}</strong>
      <span class="opponent-hand-hints" aria-hidden="true">
        <i class="hint-epoch"></i>
        <i class="hint-artist"></i>
        <i class="hint-action"></i>
      </span>
    </div>
  `;
}

function handCardsForPlayer(player) {
  return [
    ...player.hand.epochs.map((card) => ({ card, type: "Epoch" })),
    ...player.hand.artists.map((card) => ({ card, type: "Artist" })),
    ...player.hand.actions.map((card) => ({ card, type: "Action" }))
  ];
}

function renderPlayerHandZones(cards) {
  const groups = [
    { type: "Epoch", label: "Epoch Cards" },
    { type: "Artist", label: "Artist Cards" },
    { type: "Action", label: "Action Cards" }
  ];
  return groups
    .map(({ type, label }) => {
      const groupCards = cards.filter((entry) => entry.type === type);
      return `
        <section class="hand-lane hand-lane-${type.toLowerCase()}">
          <div class="hand-lane-heading">
            <h4>${escapeHtml(label)}</h4>
            <span>${groupCards.length}</span>
          </div>
          <div class="hand-lane-cards">
            ${
              groupCards.length
                ? groupCards.map(({ card }, index) => renderGameCard(card, type, index, groupCards.length)).join("")
                : `<p class="muted">No ${escapeHtml(type)} cards.</p>`
            }
          </div>
        </section>
      `;
    })
    .join("");
}

function renderPlayerHandSummary(player) {
  if (!player) return `<p class="muted">Start a game to see your hand.</p>`;
  const groups = [
    { type: "Epoch", label: "Epoch Cards", count: player.hand.epochs.length },
    { type: "Artist", label: "Artist Cards", count: player.hand.artists.length },
    { type: "Action", label: "Action Cards", count: player.hand.actions.length }
  ];
  return `
    <div class="hand-summary-list">
      ${groups
        .map(
          (group) => `
            <button type="button" class="hand-summary-button" data-open-hand="${escapeHtml(group.type.toLowerCase())}">
              <span>${escapeHtml(group.label)}</span>
              <strong>${group.count}</strong>
              <em>Open</em>
            </button>
          `
        )
        .join("")}
    </div>
  `;
}

function renderHandOverlay(game, player) {
  if (!handOverlay || !handOverlayContent || !handOverlayTitle) return;
  handOverlay.hidden = !state.handOverlay.open;
  handOverlay.classList.toggle("is-open", state.handOverlay.open);
  if (!state.handOverlay.open) return;
  if (!game || !player) {
    handOverlayContent.innerHTML = `<p class="muted">Start a game to inspect a hand.</p>`;
    return;
  }

  handOverlayTitle.textContent = "Current Hand";
  const selectedEntry = selectedEntryForPlayer(player);
  handOverlayContent.innerHTML = `
    <div class="hand-overlay-grid">
      <div class="hand-overlay-cards">
        ${renderPlayerHandZones(handCardsForPlayer(player))}
      </div>
      <aside class="hand-overlay-actions">
        <h3>Selected Card</h3>
        ${selectedEntry ? selectedCardSummary(game, player).replaceAll("data-panel-command", "data-overlay-command") : `<p class="muted">Select a card from your hand.</p>`}
        <h3>Tagged Set</h3>
        ${renderTaggedSetBuilder(game, player)}
        <h3>Available Actions</h3>
        <div class="turn-controls">
          ${overlayCommandMarkup(renderTurnControls(game, player))}
        </div>
      </aside>
    </div>
  `;
}

function renderTaggedSetBuilder(game, player) {
  if (!game || !player) return `<p class="muted">Open a game to tag cards.</p>`;
  const selected = selectedHandCards(player);
  const hasEpoch = Boolean(selected.epoch);
  const hasArtist = Boolean(selected.artist);
  const canPlay = hasEpoch && hasArtist && isValidArtistEpochPair(selected.artist, selected.epoch);
  const canAct = player.id === game.currentPlayerId && player.isHuman && game.phase !== "Draw Action" && !game.diceRoll?.isRolling;
  const reason = !hasEpoch || !hasArtist
    ? "Click one Epoch card and one matching Artist card to tag them."
    : canPlay
      ? "Tagged cards match and can be played."
      : "Tagged cards do not match. Choose an Artist from the same Epoch.";
  return `
    <div class="tagged-set-builder">
      <div class="tagged-set-row">
        <span>
          <small>Epoch</small>
          <strong>${escapeHtml(selected.epoch?.name ?? "None tagged")}</strong>
        </span>
        <span>
          <small>Artist</small>
          <strong>${escapeHtml(selected.artist?.name ?? "None tagged")}</strong>
        </span>
      </div>
      <p class="selected-card-reason">${escapeHtml(reason)}</p>
      <div class="button-row">
        <button type="button" class="command-button" data-overlay-command="play-selected-card" ${!canAct || !canPlay ? "disabled" : ""}>Play Tagged Set</button>
        <button type="button" class="command-button secondary" data-overlay-command="cancel-selection">Clear Tags</button>
      </div>
    </div>
  `;
}

function overlayCommandMarkup(markup) {
  return [
    "draw-action",
    "play-selected-card",
    "auto-tableau-play",
    "end-turn",
    "play-action",
    "discard-action",
    "cancel-selection",
    "roll-selected-fate",
    "resolve-fate-action"
  ].reduce(
    (html, command) => html.replaceAll(`id="${command}"`, `data-overlay-command="${command}"`),
    markup
  );
}

function renderTableauOverlay(game) {
  if (!tableauOverlay || !tableauOverlayContent || !tableauOverlayTitle) return;
  tableauOverlay.hidden = !state.tableauOverlay.open;
  tableauOverlay.classList.toggle("is-open", state.tableauOverlay.open);
  if (!state.tableauOverlay.open) return;
  const player = game?.players.find((player) => player.id === state.tableauOverlay.playerId);
  if (!game || !player) {
    tableauOverlayContent.innerHTML = `<p class="muted">No tableau selected.</p>`;
    return;
  }
  const muse = museById.get(player.museId);
  tableauOverlayTitle.textContent = `${player.name}'s Tableau`;
  tableauOverlayContent.innerHTML = `
    <div class="tableau-overlay-summary">
      <strong>${escapeHtml(muse?.name ?? "No Muse selected")}</strong>
      <span>${player.score} points</span>
      <span>${player.tableau.length} Epoch${player.tableau.length === 1 ? "" : "s"}</span>
    </div>
    <div class="tableau-overlay-sets">
      ${
        player.tableau.length
          ? player.tableau
              .map(
                (set) => `
                  <article class="tableau-overlay-set">
                    ${renderPhysicalCard(set.epoch, "Epoch", { interactive: false, extraClass: "overlay-card" })}
                    <div class="tableau-overlay-artists">
                      ${set.artists
                        .map((artist) =>
                          renderPhysicalCard(artist, "Artist", {
                            interactive: false,
                            extraClass: "overlay-card",
                            scoreMuseId: player.museId
                          })
                        )
                        .join("")}
                    </div>
                  </article>
                `
              )
              .join("")
          : `<p class="muted">No tableau cards played yet.</p>`
      }
    </div>
  `;
}

function renderLegalSetChoiceOverlay(game) {
  if (!legalSetOverlay || !legalSetContent) return;
  legalSetOverlay.hidden = !state.legalSetChoice.open;
  legalSetOverlay.classList.toggle("is-open", state.legalSetChoice.open);
  if (!state.legalSetChoice.open) return;
  const player = activePlayer(game);
  const pairs = state.legalSetChoice.pairs
    .map((pair) => ({
      epoch: player?.hand.epochs.find((card) => card.instanceId === pair.epochInstanceId),
      artist: player?.hand.artists.find((card) => card.instanceId === pair.artistInstanceId)
    }))
    .filter((pair) => isValidArtistEpochPair(pair.artist, pair.epoch));

  if (!game || !player || pairs.length === 0) {
    legalSetContent.innerHTML = `<p class="muted">No legal Epoch + Artist set available.</p>`;
    return;
  }

  legalSetContent.innerHTML = `
    <p class="muted">Choose the matching Epoch + Artist set to play. Only legal matches are shown. Scores use your Muse.</p>
    <div class="legal-set-list">
      ${pairs
        .map(
          ({ epoch, artist }, index) => {
            const muse = museById.get(player.museId);
            const score = artistMuseScore(player, artist);
            return `
            <button type="button" class="legal-set-option" data-legal-set-index="${index}">
              <span>
                <strong>${escapeHtml(epoch.name)}</strong>
                <small>Epoch</small>
              </span>
              <span aria-hidden="true">+</span>
              <span>
                <strong>${escapeHtml(artist.name)}</strong>
                <small>${escapeHtml(artist.requiredEpochName ?? epochById.get(artist.requiredEpochId)?.name ?? artist.requiredEpochId)}</small>
              </span>
              <span class="legal-set-score" aria-label="${escapeHtml(`Score for ${muse?.name ?? "your Muse"}: ${score}`)}">
                <strong>${score}</strong>
                <small>${escapeHtml(muse?.name ?? "Your Muse")} score</small>
              </span>
            </button>
          `;
          }
        )
        .join("")}
    </div>
  `;
}

function selectedEntryForPlayer(player) {
  if (!state.game || !player) return null;
  const selected = selectedHandCards(player);
  return (
    (selected.action && { card: selected.action, type: "Action" }) ||
    (selected.artist && { card: selected.artist, type: "Artist" }) ||
    (selected.epoch && { card: selected.epoch, type: "Epoch" }) ||
    null
  );
}

function selectedTableauPlayStatus(game, player, entry) {
  if (!entry || entry.type === "Action") return { canPlay: false, reason: "Select an Epoch or Artist to build a tableau set." };
  if (game.phase === "Draw Action") return { canPlay: false, reason: "Draw your Action card before playing tableau cards." };
  const selected = selectedHandCards(player);
  const maxArtists = 1 + (game.extraArtistPlays ?? 0);
  if (game.artistsPlayedThisTurn >= maxArtists) return { canPlay: false, reason: "Artist play limit reached this turn." };
  if (selected.epoch && selected.artist) {
    return isValidArtistEpochPair(selected.artist, selected.epoch)
      ? { canPlay: true, reason: "Play this Epoch + Artist set." }
      : { canPlay: false, reason: "Artist must match the selected Epoch." };
  }
  if (selected.epoch) {
    const matchingArtist = player.hand.artists.find((artist) => isValidArtistEpochPair(artist, selected.epoch));
    return matchingArtist
      ? { canPlay: true, reason: `Play ${selected.epoch.name} with ${matchingArtist.name}.` }
      : { canPlay: false, reason: "Select a matching Artist, or draw one later." };
  }
  if (selected.artist) {
    if (matchingTableauSet(player, selected.artist)) {
      return { canPlay: true, reason: "Attach this Artist to an existing matching Epoch." };
    }
    const matchingEpoch = player.hand.epochs.find((epoch) => isValidArtistEpochPair(selected.artist, epoch));
    return matchingEpoch
      ? { canPlay: true, reason: `Play ${matchingEpoch.name} with ${selected.artist.name}.` }
      : { canPlay: false, reason: "Select the matching Epoch, or play that Epoch first." };
  }
  return { canPlay: false, reason: "Select an Artist with this Epoch to play a set." };
}

function selectedCardCategory(card, type) {
  if (type === "Action") return actionCategoryLabel(card.category);
  if (type === "Artist") return card.requiredEpochName ?? epochById.get(card.requiredEpochId)?.name ?? card.requiredEpochId;
  if (type === "Epoch") return "Epoch";
  return type;
}

function renderSelectedCardPanelActions(game, player, entry, commandAttribute = "data-panel-command") {
  if (!entry) return "";
  const { card, type } = entry;
  const isHumanTurn = player?.id === game.currentPlayerId && player.isHuman;
  const canAct = isHumanTurn && game.phase !== "Draw Action" && !game.diceRoll?.isRolling;
  if (type === "Action") {
    const pendingFate = game.pendingFateAction?.instanceId === card.instanceId;
    return `
      <div class="selected-card-actions">
        ${
          card.diceOutcomes
            ? pendingFate
              ? `<button type="button" class="command-button" ${commandAttribute}="resolve-fate-action" ${!canAct ? "disabled" : ""}>Resolve / Discard</button>`
              : `<button type="button" class="command-button" ${commandAttribute}="roll-selected-fate" ${!canAct || game.actionPlayedThisTurn ? "disabled" : ""}>Roll Dice</button>`
            : `<button type="button" class="command-button" ${commandAttribute}="play-action" ${!canAct || game.actionPlayedThisTurn ? "disabled" : ""}>Play Action</button>`
        }
        <button type="button" class="command-button secondary" ${commandAttribute}="discard-action" ${!canAct ? "disabled" : ""}>Discard</button>
        <button type="button" class="command-button secondary" ${commandAttribute}="cancel-selection">Cancel</button>
      </div>
      ${!canAct ? `<p class="selected-card-reason">${escapeHtml(game.phase === "Draw Action" ? "Draw an Action before playing cards." : "Wait for your turn.")}</p>` : ""}
    `;
  }

  const status = selectedTableauPlayStatus(game, player, entry);
  return `
    <div class="selected-card-actions">
      <button type="button" class="command-button" ${commandAttribute}="play-selected-card" ${!canAct || !status.canPlay ? "disabled" : ""}>Play Set</button>
      <button type="button" class="command-button secondary" ${commandAttribute}="cancel-selection">Cancel</button>
    </div>
    <p class="selected-card-reason">${escapeHtml(status.reason)}</p>
  `;
}

function selectedCardSummary(game, player) {
  if (!game || !player) return `<p class="muted">Start a game to select cards.</p>`;
  const selectedEntry = selectedEntryForPlayer(player);
  if (!selectedEntry) return `<p class="muted">Select a card from your hand.</p>`;

  const { card, type } = selectedEntry;
  return `
    <article class="selected-card-summary-card">
      ${renderPhysicalCard(card, type, {
        interactive: false,
        inspected: true,
        extraClass: "selected-card-preview",
        scoreMuseId: player.museId
      })}
      <div class="selected-card-meta">
        <strong>${escapeHtml(card.name)}</strong>
        <span>${escapeHtml(type)}${selectedCardCategory(card, type) ? ` | ${escapeHtml(selectedCardCategory(card, type))}` : ""}</span>
      </div>
      ${renderSelectedCardPanelActions(game, player, selectedEntry)}
    </article>
  `;
}

function renderTurnControls(game, player) {
  if (game.phase === "Game Over") {
    const winners = game.winnerIds.map((id) => game.players.find((player) => player.id === id)?.name).filter(Boolean);
    return `
      <div class="game-over">
        <strong>Winner: ${escapeHtml(winners.join(", "))}</strong>
        <p>${escapeHtml(game.endReason ?? "Game over.")} Final scores are locked. Start a new game to play again.</p>
        <div class="final-score-grid">
          ${game.players
            .toSorted((a, b) => b.score - a.score || a.name.localeCompare(b.name))
            .map((player) => {
              const muse = museById.get(player.museId);
              return `<span>${escapeHtml(player.name)} (${escapeHtml(muse?.name ?? "No Muse")}): ${player.score}</span>`;
            })
            .join("")}
        </div>
      </div>
    `;
  }

  if (game.phase === "Muse Selection") {
    return `<p class="muted">Resolve Muse selection before the first turn begins.</p>`;
  }

  const isHumanTurn = Boolean(player?.isHuman && player.id === game.currentPlayerId);
  const isRolling = Boolean(game.diceRoll?.isRolling);
  const selected = player ? selectedHandCards(player) : {};
  const selectedAction = selected.action;
  const selectedEntry = selectedEntryForPlayer(player);
  const tableauStatus = selectedEntry ? selectedTableauPlayStatus(game, player, selectedEntry) : null;
  const legalPairCount = player?.isHuman && game.phase !== "Draw Action" ? legalEpochArtistPairs(player).length : 0;
  const pendingFate = selectedAction && game.pendingFateAction?.instanceId === selectedAction.instanceId;
  const canAct = isHumanTurn && game.phase !== "Draw Action" && !isRolling;
  return `
    <div class="button-row turn-primary-actions">
      ${game.phase === "Draw Action" ? `<button id="draw-action" type="button" class="command-button" ${!isHumanTurn || isRolling ? "disabled" : ""}>Draw Action</button>` : ""}
      ${
        selectedEntry && selectedEntry.type !== "Action"
          ? `<button id="play-selected-card" type="button" class="command-button" ${!canAct || !tableauStatus?.canPlay ? "disabled" : ""}>Play Selected Card</button>`
          : ""
      }
      ${game.phase !== "Draw Action" ? `<button id="auto-tableau-play" type="button" class="command-button secondary" ${!canAct ? "disabled" : ""}>${legalPairCount > 1 ? "Choose Legal Set" : "Auto Play Legal Set"}</button>` : ""}
      ${game.phase !== "Draw Action" ? `<button id="end-turn" type="button" class="command-button secondary" ${!isHumanTurn || isRolling ? "disabled" : ""}>End Turn</button>` : ""}
    </div>
    ${
      selectedAction
        ? `
          <div class="selected-action-controls">
            <strong>${escapeHtml(selectedAction.name)}</strong>
            <span>${escapeHtml(selectedAction.effectText ?? selectedAction.rulesText ?? "Action selected.")}</span>
            <div class="button-row">
              ${
                selectedAction.diceOutcomes
                  ? pendingFate
                    ? `<button id="resolve-fate-action" type="button" class="command-button" ${!canAct || isRolling ? "disabled" : ""}>Resolve / Discard</button>`
                    : `<button id="roll-selected-fate" type="button" class="command-button" ${!canAct || game.actionPlayedThisTurn || isRolling ? "disabled" : ""}>Roll Dice</button>`
                  : `<button id="play-action" type="button" class="command-button" ${!canAct || game.actionPlayedThisTurn ? "disabled" : ""}>Play Action</button>`
              }
              <button id="discard-action" type="button" class="command-button secondary" ${!canAct ? "disabled" : ""}>Discard Action</button>
              <button id="cancel-selection" type="button" class="command-button secondary">Cancel Selection</button>
            </div>
            ${pendingFate ? `<p class="muted">Rolled ${game.pendingFateAction.roll}: ${escapeHtml(game.pendingFateAction.outcome)}</p>` : ""}
          </div>
        `
        : ""
    }
    <p class="muted">${escapeHtml(turnHint(game, player))}</p>
  `;
}

function turnHint(game, player) {
  if (game.diceRoll?.isRolling) return "The Fate Dice is rolling. Wait for the result to settle.";
  if (!player?.isHuman) return "NPC is thinking through its turn automatically.";
  if (game.phase === "Draw Action") return "Draw 1 Action card to begin your turn.";
  if (game.phase === "Main") return "Select cards from your hand to play, use Auto Play Legal Set, or end your turn to pass.";
  return "Resolve the current game state.";
}

function dicePips(value) {
  const layouts = {
    1: [5],
    2: [1, 9],
    3: [1, 5, 9],
    4: [1, 3, 7, 9],
    5: [1, 3, 5, 7, 9],
    6: [1, 3, 4, 6, 7, 9]
  };
  const positions = new Set(layouts[value] ?? []);
  return Array.from({ length: 9 }, (_, index) =>
    positions.has(index + 1) ? `<span class="animated-die-pip"></span>` : `<span></span>`
  ).join("");
}

function renderAnimatedDie(value = 1, displayValue = value) {
  return `<div class="animated-die" data-value="${value}" aria-hidden="true">${dicePips(displayValue)}</div>`;
}

function renderDiceRoller(game) {
  const roll = game.diceRoll;
  if (!roll?.isRolling && !roll?.value) return "";
  const value = roll.value ?? 1;
  const displayValue = roll.isRolling ? 6 : value;
  return `
    <section class="dice-roll-panel ${roll.isRolling ? "is-rolling" : "has-result"}" aria-label="Fate Dice roll result">
      ${renderAnimatedDie(value, displayValue)}
      <div class="dice-result-copy">
        <span>${escapeHtml(roll.isRolling ? "Rolling Fate Dice" : `Rolled: ${value}`)}</span>
        <strong>${escapeHtml(roll.actionName || "Fate Dice")}</strong>
        ${roll.outcome ? `<p>${escapeHtml(roll.outcome)}</p>` : `<p>The die is tumbling across the table...</p>`}
      </div>
    </section>
  `;
}

function renderDiceTester() {
  if (!diceTesterStage) return;
  const tester = state.diceTester;
  const value = tester.value ?? 1;
  const displayValue = tester.isRolling ? 6 : value;
  diceTesterStage.innerHTML = `
    <section class="dice-roll-panel dice-tester-panel ${tester.isRolling ? "is-rolling" : tester.value ? "has-result" : ""}" aria-label="Studio dice tester result">
      ${renderAnimatedDie(value, displayValue)}
      <div class="dice-result-copy">
        <span>${escapeHtml(tester.isRolling ? "Rolling test die" : tester.value ? `Rolled: ${tester.value}` : "Ready to roll")}</span>
        <strong>Fate Dice Test</strong>
        <p>${escapeHtml(tester.value ? `Displayed result and stored value both equal ${tester.value}.` : "Press Roll Dice to test the animation.")}</p>
      </div>
    </section>
  `;
  if (diceTesterRollButton) diceTesterRollButton.disabled = tester.isRolling;
  if (diceTesterResult) diceTesterResult.textContent = tester.value ? `Stored value: ${tester.value}` : "Stored value: none";
  if (diceTesterHistory) diceTesterHistory.innerHTML = tester.history.length
    ? tester.history.map((result) => `<li>Rolled ${result}</li>`).join("")
    : `<li>No rolls yet.</li>`;
}

function rollStudioDice() {
  if (state.diceTester.isRolling) return;
  const value = Math.floor(Math.random() * 6) + 1;
  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  state.diceTester.value = value;
  state.diceTester.isRolling = true;
  renderDiceTester();
  window.setTimeout(
    () => {
      state.diceTester.isRolling = false;
      state.diceTester.history = [value, ...state.diceTester.history].slice(0, 8);
      renderDiceTester();
    },
    reduceMotion ? 180 : 1500
  );
}

function setupStepForGame(game = state.game) {
  if (!game) return 1;
  if (game.phase === "Muse Selection") return 3;
  return 4;
}

function openSetupModal() {
  state.setupFlow.open = true;
  state.setupFlow.step = setupStepForGame();
  renderGameSetup();
  renderSetupFlow();
}

function closeSetupModal() {
  state.setupFlow.open = false;
  renderSetupFlow();
}

function renderSetupOrder(game) {
  if (!game) return "";
  return `
    <ol class="setup-order-list">
      ${gameSelectionOrder(game)
        .map((player) => `<li><strong>${escapeHtml(player.name)}</strong><span>Roll ${player.roll}</span><em>${escapeHtml(museById.get(player.museId)?.name ?? "Choosing...")}</em></li>`)
        .join("")}
    </ol>
  `;
}

function renderSetupMuseChoices(game) {
  const picker = currentMusePicker(game);
  if (!picker) return "";
  if (!picker.isHuman) return `<p class="muted">${escapeHtml(picker.name)} is choosing automatically.</p>`;
  return `
    <div class="setup-muse-panel">
      <h3>${escapeHtml(picker.name)}, choose your Muse</h3>
      <div class="muse-button-grid setup-muse-grid">
        ${availableMuseIds(game)
          .map((museId) => {
            const muse = museById.get(museId);
            return `<button type="button" class="muse-pick setup-muse-pick" data-muse-id="${escapeHtml(muse.id)}">${escapeHtml(muse.name)}</button>`;
          })
          .join("")}
      </div>
    </div>
  `;
}

function renderSetupFlow() {
  if (!setupModal) return;
  setupModal.hidden = !state.setupFlow.open;
  setupModal.classList.toggle("is-open", state.setupFlow.open);
  if (!state.setupFlow.open) return;

  const game = state.game;
  const maxStep = setupStepForGame(game);
  const step = Math.min(Math.max(state.setupFlow.step || maxStep, 1), maxStep);
  state.setupFlow.step = step;
  setupModal.dataset.setupStep = String(step);
  const stepLabels = ["Players", "Roll", "Muses", "Deal"];
  setupStepIndicator.innerHTML = [1, 2, 3, 4]
    .map(
      (number) =>
        `<span class="${number === step ? "active" : number < step ? "complete" : ""}"><strong>${number}</strong>${stepLabels[number - 1]}</span>`
    )
    .join("");
  setupBackButton.hidden = step <= 1;
  setupStartGameButton.hidden = step !== 1;
  setupNextButton.hidden = step >= maxStep || step === 1;
  setupEnterPlayButton.hidden = step !== 4;
  renderGameSetup();

  if (step === 1) {
    setupStepContent.innerHTML = `
      <section class="setup-step-intro">
        <div class="setup-step-header-row">
          <div>
            <h3>Step 1: Player setup</h3>
            <p class="muted">Choose player count and edit names. Seat 1 is human; the rest are NPCs for now.</p>
          </div>
          <div id="setup-player-count-slot" class="setup-player-count-slot"></div>
        </div>
        <div id="setup-player-list-slot" class="setup-player-list-slot"></div>
      </section>
    `;
    const playerCountLabel = gamePlayerCountSelect?.closest("label");
    const playerCountSlot = setupStepContent.querySelector("#setup-player-count-slot");
    if (playerCountLabel && playerCountSlot) playerCountSlot.append(playerCountLabel);
    const playerListSlot = setupStepContent.querySelector("#setup-player-list-slot");
    if (gameSetup && playerListSlot) playerListSlot.append(gameSetup);
    return;
  }

  if (step === 2) {
    setupStepContent.innerHTML = `
      <section>
        <h3>Step 2: Muse order</h3>
        <p class="muted">Dice have been rolled. Muses are selected from highest roll to lowest.</p>
        ${renderSetupOrder(game)}
      </section>
    `;
    return;
  }

  if (step === 3) {
    setupStepContent.innerHTML = `
      <section>
        <h3>Step 3: Muse selection</h3>
        ${renderSetupMuseChoices(game)}
      </section>
    `;
    return;
  }

  setupStepContent.innerHTML = `
    <section>
      <h3>Step 4: Starting hands dealt</h3>
      <p class="muted">Each player has 5 Epoch cards, 5 Artist cards, and 3 Action cards. The table is ready.</p>
      ${renderSetupOrder(game)}
    </section>
  `;
}

function renderPlaceholderPlayerSeats(count = 4) {
  return Array.from(
    { length: count },
    (_, index) => `
      <article class="tableau-player seat-${index + 1} placeholder-seat">
        <div class="tableau-player-header">
          <h4>${index === 0 ? "You" : `NPC ${index}`}</h4>
          <span>Empty Muse slot</span>
        </div>
        <div class="seat-stats">
          <strong>0 pts</strong>
          <span>0 Epochs</span>
        </div>
        ${renderFaceDownHand(index === 0 ? 0 : 3)}
        <div class="empty-tableau-slots">
          <span>Empty Epoch slot</span>
          <span>Empty Artist slot</span>
        </div>
      </article>
    `
  ).join("");
}

function chooseHumanMuse(museId) {
  if (!state.game) return;
  const picker = currentMusePicker(state.game);
  if (!picker?.isHuman) return;
  picker.museId = museId;
  state.game.log.unshift(`You chose ${museById.get(picker.museId)?.name ?? "a Muse"}.`);
  resolveNpcMuseChoices();
  state.setupFlow.step = setupStepForGame(state.game);
  renderGame();
}

function renderGame() {
  const game = state.game;
  if (!game) {
    renderGameSetup();
    renderSetupFlow();
    gameTurnTitle.textContent = "No game in progress";
    gamePhase.textContent = "Start a new game to roll turn order, choose Muses, and deal cards.";
    gameTurnNumber.textContent = "0";
    gameScoreSummary.textContent = "No scores yet";
    gameDecks.innerHTML = `
      ${renderCardPile("Artist Deck", 0, "deck")}
      ${renderCardPile("Epoch Deck", 0, "deck")}
      ${renderCardPile("Action Deck", 0, "deck")}
      ${renderCardPile("Artist Discard", 0, "discard")}
      ${renderCardPile("Epoch Discard", 0, "discard")}
      ${renderCardPile("Action Discard", 0, "discard")}
    `;
    museChoice.innerHTML = "";
    gameControls.innerHTML = "";
    diceRoller.innerHTML = "";
    gamePlayers.innerHTML = `<div class="empty-state">Game Mode is the primary experience. Start here to play Xanadu digitally.</div>`;
    gameTableau.innerHTML = renderPlaceholderPlayerSeats();
    playerHandTitle.textContent = "Current Player Hand";
    playerHand.innerHTML = `<div class="empty-state">Your hand will appear after a game starts.</div>`;
    selectedCardPanel.innerHTML = `<p class="muted">Select a card from your hand.</p>`;
    gameLog.innerHTML = `<p class="muted">No game actions yet.</p>`;
    renderHandOverlay(null, null);
    renderTableauOverlay(null);
    renderLegalSetChoiceOverlay(null);
    return;
  }

  refreshScores(game);
  renderGameSetup();
  if (game.phase === "Muse Selection" && !state.setupFlow.open) {
    state.setupFlow.open = true;
  }
  renderSetupFlow();
  const currentPlayer = game.players.find((player) => player.id === game.currentPlayerId);
  const picker = currentMusePicker(game);
  gameTurnTitle.textContent =
    game.phase === "Game Over"
      ? "Game Over"
      : game.phase === "Muse Selection"
      ? `${picker?.name ?? "Players"} choosing Muses`
      : `${currentPlayer?.name ?? "Player"}'s turn`;
  gamePhase.textContent = game.phase;
  gameTurnNumber.textContent = String(game.turnNumber ?? 0);
  gameScoreSummary.textContent = game.players.map((player) => `${scoreHeaderName(player)} ${player.score}`).join(" | ");
  gameDecks.innerHTML = `
    ${renderCardPile("Artist Deck", game.decks.artist.length, "deck")}
    ${renderCardPile("Epoch Deck", game.decks.epoch.length, "deck")}
    ${renderCardPile("Action Deck", game.decks.action.length, "deck")}
    ${renderCardPile("Artist Discard", game.discards.artist.length, "discard")}
    ${renderCardPile("Epoch Discard", game.discards.epoch.length, "discard")}
    ${renderCardPile("Action Discard", game.discards.action.length, "discard")}
  `;

  museChoice.innerHTML = "";
  gameControls.innerHTML = renderTurnControls(game, currentPlayer);
  diceRoller.innerHTML = renderDiceRoller(game);

  gamePlayers.innerHTML = gameSelectionOrder(game)
    .map((player, index) => {
      const muse = museById.get(player.museId);
      return `
        <article class="game-player ${player.id === game.currentPlayerId ? "active" : ""}">
          <div>
            <h4>${escapeHtml(player.name)}</h4>
            <p class="muted">Order ${index + 1} | Roll ${player.roll}</p>
          </div>
          <strong>${escapeHtml(muse?.name ?? "Choosing...")}</strong>
          <span>${player.hand.artists.length + player.hand.epochs.length + player.hand.actions.length} cards in hand</span>
          <span>${player.tableau.length} Epochs | ${player.score} points</span>
        </article>
      `;
    })
    .join("");

  gameTableau.innerHTML =
    game.players
      .map(
        (player, index) => {
          const muse = museById.get(player.museId);
          const handCount = player.hand.artists.length + player.hand.epochs.length + player.hand.actions.length;
          return `
          <article class="tableau-player seat-${index + 1} ${player.id === game.currentPlayerId ? "active-seat" : ""}">
            <div class="tableau-player-header">
              <h4>${escapeHtml(player.name)}</h4>
              <span>${escapeHtml(muse?.name ?? "Empty Muse slot")}</span>
            </div>
            <div class="seat-stats">
              <strong>${player.score} pts</strong>
              <span>${player.tableau.length} Epochs</span>
            </div>
            ${player.isHuman && player.id === game.currentPlayerId ? `<p class="active-hand-note">Your hand is in the side panel</p>` : renderFaceDownHand(handCount, hiddenBackPathsForPlayer(player))}
            ${
              player.tableau.length === 0
                ? `<div class="empty-tableau-slots">
                    <span>Empty Epoch slot</span>
                    <span>Empty Artist slot</span>
                  </div>`
                : player.tableau
                    .map(
                      (set) => {
                        const setPoints = set.artists.reduce((total, artist) => total + (artist.scores[player.museId] ?? 0), 0);
                        const inspectCards = `
                          ${renderPhysicalCard(set.epoch, "Epoch", { interactive: false, extraClass: "tableau-inspect-card" })}
                          ${set.artists
                            .map((artist, index) =>
                              renderPhysicalCard(artist, "Artist", {
                                interactive: false,
                                index,
                                total: set.artists.length,
                                extraClass: "tableau-inspect-card",
                                scoreMuseId: player.museId
                              })
                            )
                            .join("")}
                        `;
                        return `
                        <div class="tableau-set" tabindex="0" aria-label="${escapeHtml(`${player.name} tableau: ${set.epoch.name} with ${set.artists.length} Artists`)}">
                          <div class="compact-tableau-summary">
                            <span>${escapeHtml(set.epoch.name)}</span>
                            <strong>${set.artists.length} Artist${set.artists.length === 1 ? "" : "s"}</strong>
                          </div>
                          <span class="tableau-set-summary">${set.artists.length} Artist${set.artists.length === 1 ? "" : "s"} | ${setPoints} points</span>
                          <div class="tableau-inspect-popover" aria-hidden="true">
                            <strong>${escapeHtml(set.epoch.name)}</strong>
                            <div class="tableau-inspect-cards">${inspectCards}</div>
                          </div>
                        </div>
                      `;
                      }
                    )
                    .join("")
            }
            <button type="button" class="tableau-view-button" data-view-tableau="${escapeHtml(player.id)}">View Tableau</button>
          </article>
        `;
        }
      )
      .join("");

  const human = humanPlayer(game);
  const visiblePlayer = currentPlayer?.isHuman ? currentPlayer : human;
  playerHandTitle.textContent = `${visiblePlayer.name}'s Hand`;
  const showVisibleHand = game.phase === "Muse Selection" || currentPlayer?.isHuman;
  const visibleHandCards = handCardsForPlayer(visiblePlayer);
  playerHand.innerHTML = showVisibleHand
    ? renderPlayerHandSummary(visiblePlayer)
    : `<div class="empty-state">${escapeHtml(currentPlayer?.name ?? "NPC")} is taking an automated turn. Your hand returns when it is your turn.</div>`;
  selectedCardPanel.innerHTML = showVisibleHand
    ? selectedCardSummary(game, visiblePlayer)
    : `<p class="muted">NPC turn in progress. Your selected card will return on your turn.</p>`;

  gameLog.innerHTML = game.log.map((entry) => `<p>${escapeHtml(entry)}</p>`).join("");
  renderHandOverlay(game, visiblePlayer);
  renderTableauOverlay(game);
  renderLegalSetChoiceOverlay(game);
}

async function drawActionForCurrentPlayer() {
  const game = state.game;
  const player = activePlayer(game);
  if (!game || !player || game.phase !== "Draw Action" || game.diceRoll?.isRolling) return;
  const card = draw(game.decks.action, 1)[0];
  if (!card) {
    endGame("Action deck exhausted.");
    return;
  }
  player.hand.actions.push(card);
  addGameLog(`${player.name} drew Action: ${card.name}.`);
  if (card.playCondition === "Play Immediately") {
    await resolveActionCard(player, card);
    removeByInstance(player.hand.actions, card.instanceId);
    game.discards.action.push(card);
    endTurn();
    return;
  }
  game.phase = "Main";
  renderGame();
}

async function playSelectedAction(playerOverride = null) {
  const game = state.game;
  const player = playerOverride ?? activePlayer(game);
  if (!game || !player || !player.isHuman || player.id !== game.currentPlayerId || game.actionPlayedThisTurn || game.diceRoll?.isRolling) return;
  const action = selectedHandCards(player).action;
  if (!action) {
    addGameLog("Select an Action card before playing an Action.");
    renderGame();
    return;
  }
  if (action.diceOutcomes) {
    await rollSelectedFateAction(player);
    return;
  }
  await resolveActionCard(player, action);
  removeByInstance(player.hand.actions, action.instanceId);
  game.discards.action.push(action);
  game.actionPlayedThisTurn = true;
  game.selectedCards.action = "";
  game.inspectedCard = null;
  game.pendingFateAction = null;
  checkEndGame();
  renderGame();
}

async function resolveActionCard(player, action) {
  const game = state.game;
  const effectText = action.effectText ?? action.rulesText ?? "";
  addGameLog(`${player.name} played ${action.name}: ${effectText || "Action effect."}`);

  if (action.category === "fate" && action.diceOutcomes) {
    const roll = await rollFateDie(action);
    const outcome = action.diceOutcomes[String(roll)];
    addGameLog(`${player.name} rolled ${roll} for ${action.name}: ${outcome}`);
    applySimpleEffect(player, outcome);
    return;
  }

  applySimpleEffect(player, effectText);
}

async function rollSelectedFateAction(playerOverride = null) {
  const game = state.game;
  const player = playerOverride ?? activePlayer(game);
  if (!game || !player?.isHuman || player.id !== game.currentPlayerId || game.actionPlayedThisTurn || game.diceRoll?.isRolling) return;
  const action = selectedHandCards(player).action;
  if (!action?.diceOutcomes) {
    addGameLog("Select a Fate Dice Action before rolling.");
    renderGame();
    return;
  }
  addGameLog(`${player.name} played ${action.name}: ${action.effectText ?? "Roll Fate Dice."}`);
  const roll = await rollFateDie(action);
  const outcome = action.diceOutcomes[String(roll)] ?? "";
  game.pendingFateAction = { instanceId: action.instanceId, actionId: action.id, roll, outcome };
  addGameLog(`${player.name} rolled ${roll} for ${action.name}: ${outcome}`);
  applySimpleEffect(player, outcome);
  renderGame();
}

function resolvePendingFateAction(playerOverride = null) {
  const game = state.game;
  const player = playerOverride ?? activePlayer(game);
  if (!game || !player?.isHuman || player.id !== game.currentPlayerId || game.diceRoll?.isRolling) return;
  const action = selectedHandCards(player).action;
  if (!action || game.pendingFateAction?.instanceId !== action.instanceId) {
    addGameLog("Roll a Fate Dice Action before resolving it.");
    renderGame();
    return;
  }
  removeByInstance(player.hand.actions, action.instanceId);
  game.discards.action.push(action);
  game.actionPlayedThisTurn = true;
  game.pendingFateAction = null;
  game.selectedCards.action = "";
  game.inspectedCard = null;
  addGameLog(`${action.name} resolved and moved to the Action discard pile.`);
  checkEndGame();
  renderGame();
}

function discardSelectedAction(playerOverride = null) {
  const game = state.game;
  const player = playerOverride ?? activePlayer(game);
  if (!game || !player?.isHuman || player.id !== game.currentPlayerId || game.diceRoll?.isRolling) return;
  const action = selectedHandCards(player).action;
  if (!action) {
    addGameLog("Select an Action card before discarding.");
    renderGame();
    return;
  }
  removeByInstance(player.hand.actions, action.instanceId);
  game.discards.action.push(action);
  if (game.pendingFateAction?.instanceId === action.instanceId) game.pendingFateAction = null;
  game.selectedCards.action = "";
  game.inspectedCard = null;
  addGameLog(`${player.name} discarded ${action.name}.`);
  checkEndGame();
  renderGame();
}

function cancelSelection() {
  if (!state.game) return;
  state.game.selectedCards = { epoch: "", artist: "", action: "" };
  state.game.inspectedCard = null;
  state.game.pendingFateAction = null;
  renderGame();
}

function playSelectedCard(playerOverride = null) {
  const game = state.game;
  const player = playerOverride ?? activePlayer(game);
  if (!game || !player?.isHuman || player.id !== game.currentPlayerId) return;
  const selected = selectedHandCards(player);
  if (selected.action) {
    void playSelectedAction(player);
    return;
  }
  playSelectedTableauCards(player);
}

function diceAnimationDuration() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ? 260 : 1500;
}

function rollFateDie(action) {
  const game = state.game;
  const value = Math.floor(Math.random() * 6) + 1;
  const outcome = action.diceOutcomes?.[String(value)] ?? "";
  game.diceRoll = {
    isRolling: true,
    value,
    actionName: action.name,
    outcome: "",
    history: [...(game.diceRoll?.history ?? []), { actionId: action.id, actionName: action.name, value, outcome }]
  };
  renderGame();
  return new Promise((resolve) => {
    window.setTimeout(() => {
      if (!state.game) return resolve(value);
      state.game.diceRoll = {
        ...state.game.diceRoll,
        isRolling: false,
        value,
        actionName: action.name,
        outcome
      };
      renderGame();
      resolve(value);
    }, diceAnimationDuration());
  });
}

function applySimpleEffect(player, effectText) {
  const text = String(effectText);
  const artistDraw = text.match(/Draw (\d+) Artist/i) ?? text.match(/(?:and|\+)\s*(\d+) Artist/i);
  const epochDraw = text.match(/Draw (\d+) Epoch/i) ?? text.match(/(?:and|\+)\s*(\d+) Epoch/i);
  const actionDraw = text.match(/Draw (\d+) Action/i) ?? text.match(/(?:and|\+)\s*(\d+) Action/i);
  const genericDraw = !artistDraw && !epochDraw && !actionDraw ? text.match(/Draw (\d+) card/i) : null;
  let handled = false;

  if (artistDraw) {
    const cards = draw(state.game.decks.artist, Number(artistDraw[1]));
    player.hand.artists.push(...cards);
    addGameLog(`${player.name} drew ${cards.length} Artist card${cards.length === 1 ? "" : "s"}.`);
    handled = true;
  }
  if (epochDraw) {
    const cards = draw(state.game.decks.epoch, Number(epochDraw[1]));
    player.hand.epochs.push(...cards);
    addGameLog(`${player.name} drew ${cards.length} Epoch card${cards.length === 1 ? "" : "s"}.`);
    handled = true;
  }
  if (actionDraw) {
    const cards = draw(state.game.decks.action, Number(actionDraw[1]));
    player.hand.actions.push(...cards);
    addGameLog(`${player.name} drew ${cards.length} Action card${cards.length === 1 ? "" : "s"}.`);
    handled = true;
  }
  if (genericDraw) {
    const count = Number(genericDraw[1]);
    const drawn = [];
    for (const type of ["artist", "epoch", "action"]) {
      if (drawn.length >= count) break;
      const card = draw(state.game.decks[type], 1)[0];
      if (card) {
        player.hand[`${type}s`].push(card);
        drawn.push(`${type}: ${card.name}`);
      }
    }
    addGameLog(
      drawn.length
        ? `${player.name} drew ${drawn.length} mixed card${drawn.length === 1 ? "" : "s"} (${drawn.join(", ")}).`
        : "No cards were available to draw."
    );
    handled = true;
  }
  if (/Recover 1 Artist|Take 1 Artist/i.test(text)) {
    const recovered = state.game.discards.artist.pop();
    if (recovered) {
      player.hand.artists.push(recovered);
      addGameLog(`${player.name} recovered ${recovered.name} from the Artist discard.`);
    } else {
      addGameLog("No Artist card is available in discard to recover.");
    }
    handled = true;
  }
  if (/Recover 1 Epoch|Take 1 Epoch/i.test(text)) {
    const recovered = state.game.discards.epoch.pop();
    if (recovered) {
      player.hand.epochs.push(recovered);
      addGameLog(`${player.name} recovered ${recovered.name} from the Epoch discard.`);
    } else {
      addGameLog("No Epoch card is available in discard to recover.");
    }
    handled = true;
  }
  if (/Recover 1 card|Take 1 card/i.test(text)) {
    const recovered =
      state.game.discards.artist.pop() ??
      state.game.discards.epoch.pop() ??
      state.game.discards.action.pop();
    if (recovered) {
      if (recovered.effectText || recovered.category) {
        player.hand.actions.push(recovered);
      } else if (recovered.scores) {
        player.hand.artists.push(recovered);
      } else {
        player.hand.epochs.push(recovered);
      }
      addGameLog(`${player.name} recovered ${recovered.name} from discard.`);
    } else {
      addGameLog("No card is available in discard to recover.");
    }
    handled = true;
  }
  if (/Discard 1(?!\s*(Artist|Epoch|Action))/i.test(text) || /Lose random card/i.test(text)) {
    const allCards = handCardsForPlayer(player);
    if (allCards.length > 0) {
      const selected = allCards[Math.floor(Math.random() * allCards.length)];
      const piles = { Artist: player.hand.artists, Epoch: player.hand.epochs, Action: player.hand.actions };
      const discards = { Artist: state.game.discards.artist, Epoch: state.game.discards.epoch, Action: state.game.discards.action };
      const discarded = removeByInstance(piles[selected.type], selected.card.instanceId);
      if (discarded) {
        discards[selected.type].push(discarded);
        addGameLog(`${player.name} discarded ${discarded.name}.`);
      }
    } else {
      addGameLog(`${player.name} has no cards to discard.`);
    }
    handled = true;
  }
  if (/Play 2 Artist|Play 1 extra Artist|Play extra Artist/i.test(text)) {
    state.game.extraArtistPlays = Math.max(state.game.extraArtistPlays ?? 0, 1);
    addGameLog(`${player.name} may play one extra Artist this turn.`);
    handled = true;
  }
  if (!handled) {
    addGameLog(`Manual resolution required: ${text}`);
  }
}

function playSelectedTableauCards(playerOverride = null) {
  const game = state.game;
  const player = playerOverride ?? activePlayer(game);
  if (!game || !player || !player.isHuman || player.id !== game.currentPlayerId || game.phase === "Draw Action") return;
  let { epoch, artist } = selectedHandCards(player);
  const maxArtists = 1 + (game.extraArtistPlays ?? 0);

  if (epoch && !artist) {
    const matchingArtists = player.hand.artists.filter((card) => isValidArtistEpochPair(card, epoch));
    if (matchingArtists.length > 1) {
      openLegalSetChoice(matchingArtists.map((match) => ({ epoch, artist: match })));
      return;
    }
    artist = matchingArtists[0];
  }
  if (artist && !epoch && !matchingTableauSet(player, artist)) {
    const matchingEpochs = player.hand.epochs.filter((card) => isValidArtistEpochPair(artist, card));
    if (matchingEpochs.length > 1) {
      openLegalSetChoice(matchingEpochs.map((match) => ({ epoch: match, artist })));
      return;
    }
    epoch = matchingEpochs[0];
  }

  if (!artist) {
    addGameLog("Select an Artist card, or choose an Epoch that has a matching Artist in your hand.");
    renderGame();
    return;
  }
  if (game.artistsPlayedThisTurn >= maxArtists) {
    addGameLog("You have already played the maximum number of Artists this turn.");
    renderGame();
    return;
  }

  if (epoch) {
    if (!isValidArtistEpochPair(artist, epoch)) {
      logBlockedInvalidPair(artist, epoch);
      addGameLog(`${artist.name} cannot be played with ${epoch.name}; the Epoch must match.`);
      renderGame();
      return;
    }
    if (!playTableauMove(player, { type: "new-set", epoch, artist })) {
      renderGame();
      return;
    }
    game.artistsPlayedThisTurn += 1;
    game.selectedCards = { ...game.selectedCards, epoch: "", artist: "" };
  } else {
    const targetSet = matchingTableauSet(player, artist);
    if (!targetSet) {
      addGameLog(`Select a matching Epoch from your hand, or first create a ${artist.requiredEpochName ?? epochById.get(artist.requiredEpochId)?.name ?? artist.requiredEpochId} tableau set.`);
      renderGame();
      return;
    }
    if (!playTableauMove(player, { type: "attach", artist, targetSet })) {
      renderGame();
      return;
    }
    game.artistsPlayedThisTurn += 1;
    game.selectedCards.artist = "";
  }

  refreshScores(game);
  checkEndGame();
  renderGame();
}

function autoPlayTableauCards(playerOverride = null) {
  const game = state.game;
  const player = playerOverride ?? activePlayer(game);
  if (!game || !player || !player.isHuman || player.id !== game.currentPlayerId || game.phase === "Draw Action") return;
  const maxArtists = 1 + (game.extraArtistPlays ?? 0);
  if (game.artistsPlayedThisTurn >= maxArtists) {
    addGameLog("You have already played the maximum number of Artists this turn.");
    renderGame();
    return;
  }

  const pairs = legalEpochArtistPairs(player);
  if (pairs.length === 0) {
    addGameLog("No legal Epoch + Artist set available.");
    renderGame();
    return;
  }
  if (pairs.length > 1) {
    openLegalSetChoice(pairs);
    return;
  }

  const pair = pairs[0];
  if (!playTableauMove(player, { type: "new-set", epoch: pair.epoch, artist: pair.artist })) {
    renderGame();
    return;
  }
  game.artistsPlayedThisTurn += 1;
  game.selectedCards = { epoch: "", artist: "", action: game.selectedCards.action };
  refreshScores(game);
  checkEndGame();
  renderGame();
}

function selectHandCard(cardElement, forceSelected = false) {
  if (!cardElement || !state.game) return;
  const type = cardElement.dataset.cardType;
  const instanceId = cardElement.dataset.instanceId;
  state.game.selectedCards[type] =
    forceSelected || state.game.selectedCards[type] !== instanceId ? instanceId : "";
  state.game.inspectedCard = { type, instanceId };
}

function playCardFromHandElement(cardElement) {
  if (!cardElement || !state.game) return;
  selectHandCard(cardElement, true);
  if (cardElement.dataset.cardType === "action") {
    void playSelectedAction();
    return;
  }
  playSelectedTableauCards();
}

function runGameCommand(command, playerOverride = null) {
  if (!command) return;
  if (command === "draw-action") void drawActionForCurrentPlayer();
  if (command === "play-selected-card") playSelectedCard(playerOverride);
  if (command === "play-action") void playSelectedAction(playerOverride);
  if (command === "discard-action") discardSelectedAction(playerOverride);
  if (command === "cancel-selection") cancelSelection();
  if (command === "roll-selected-fate") void rollSelectedFateAction(playerOverride);
  if (command === "resolve-fate-action") resolvePendingFateAction(playerOverride);
  if (command === "play-tableau-card") playSelectedTableauCards(playerOverride);
  if (command === "auto-tableau-play") autoPlayTableauCards(playerOverride);
  if (command === "end-turn") endTurn();
}

function currentRouteSectionId() {
  const routeMap = new Map([
    ["", "play"],
    ["play", "play"],
    ["rules", "rules"],
    ["dashboard", "dashboard"],
    ["dice-tester", "dashboard"],
    ["muse-deck", "muse-deck"],
    ["epoch-deck", "epoch-deck"],
    ["artist-deck", "artist-deck"],
    ["action-deck", "action-deck"],
    ["playtests", "playtests"],
    ["scoring", "scoring"]
  ]);
  const hash = location.hash.replace("#", "");
  return routeMap.get(hash) ?? "play";
}

function renderRoute() {
  const activeId = currentRouteSectionId();
  document.querySelectorAll("main > section[id]").forEach((section) => {
    section.classList.toggle("active-view", section.id === activeId);
    section.hidden = section.id !== activeId;
  });
  document.querySelectorAll(".top-nav a[href^='#']").forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${activeId}` || link.getAttribute("href") === location.hash);
  });
}

function closeGameOverlays() {
  state.handOverlay.open = false;
  state.tableauOverlay.open = false;
  state.legalSetChoice.open = false;
  state.legalSetChoice.pairs = [];
  renderHandOverlay(state.game, humanPlayer());
  renderTableauOverlay(state.game);
  renderLegalSetChoiceOverlay(state.game);
}

function openHandOverlay() {
  if (!state.game) return;
  state.handOverlay.open = true;
  renderGame();
}

function openTableauOverlay(playerId) {
  if (!state.game) return;
  state.tableauOverlay = { open: true, playerId };
  renderTableauOverlay(state.game);
}

function openLegalSetChoice(pairs) {
  state.handOverlay.open = false;
  state.legalSetChoice = {
    open: true,
    pairs: pairs.map(({ epoch, artist }) => ({
      epochInstanceId: epoch.instanceId,
      artistInstanceId: artist.instanceId
    }))
  };
  renderHandOverlay(state.game, humanPlayer());
  renderLegalSetChoiceOverlay(state.game);
}

function playChosenLegalSet(index) {
  const game = state.game;
  const player = activePlayer(game);
  const stored = state.legalSetChoice.pairs[index];
  if (!game || !player?.isHuman || !stored) return;
  const epoch = player.hand.epochs.find((card) => card.instanceId === stored.epochInstanceId);
  const artist = player.hand.artists.find((card) => card.instanceId === stored.artistInstanceId);
  if (!isValidArtistEpochPair(artist, epoch)) {
    logBlockedInvalidPair(artist, epoch);
    addGameLog("No legal Epoch + Artist set available.");
    closeGameOverlays();
    renderGame();
    return;
  }
  if (playTableauMove(player, { type: "new-set", epoch, artist })) {
    game.artistsPlayedThisTurn += 1;
    game.selectedCards = { epoch: "", artist: "", action: game.selectedCards.action };
    refreshScores(game);
    checkEndGame();
  }
  closeGameOverlays();
  renderGame();
}

function dropHandCardOntoTableau(cardElement) {
  const game = state.game;
  const player = activePlayer(game);
  if (!cardElement || !game || !player?.isHuman) return;
  selectHandCard(cardElement, true);
  if (game.phase === "Draw Action") {
    addGameLog("Draw your Action card before moving cards onto the tableau.");
    renderGame();
    return;
  }
  if (cardElement.dataset.cardType === "action") {
    addGameLog("Action cards are played from the hand, not placed onto the tableau.");
    renderGame();
    return;
  }
  playSelectedTableauCards();
}

function refillActionHand(player) {
  const startingCount = player.hand.actions.length;
  while (player.hand.actions.length < 3 && state.game.decks.action.length > 0) {
    player.hand.actions.push(draw(state.game.decks.action, 1)[0]);
  }
  const refilled = player.hand.actions.length - startingCount;
  if (refilled > 0) {
    addGameLog(`${player.name} refilled ${refilled} Action card${refilled === 1 ? "" : "s"} to return to 3.`);
  }
}

function nextPlayerId(game) {
  const ordered = gameSelectionOrder(game);
  const index = ordered.findIndex((player) => player.id === game.currentPlayerId);
  return ordered[(index + 1) % ordered.length].id;
}

function endTurn() {
  const game = state.game;
  if (!game || game.phase === "Game Over" || game.diceRoll?.isRolling) return;
  const player = activePlayer(game);
  refillActionHand(player);
  if (checkEndGame()) return;
  game.currentPlayerId = nextPlayerId(game);
  game.turnNumber += 1;
  game.phase = "Draw Action";
  game.artistsPlayedThisTurn = 0;
  game.extraArtistPlays = 0;
  game.actionPlayedThisTurn = false;
  game.selectedCards = { epoch: "", artist: "", action: "" };
  game.inspectedCard = null;
  game.draggedCard = null;
  game.pendingFateAction = null;
  game.diceRoll = { ...(game.diceRoll ?? {}), isRolling: false, value: null, actionName: "", outcome: "" };
  addGameLog(`${activePlayer(game).name} starts turn ${game.turnNumber}.`);
  renderGame();
  void runNpcTurnIfNeeded();
}

function checkEndGame() {
  const game = state.game;
  if (!game) return false;
  refreshScores(game);
  const target = endEpochTarget(game);
  const thresholdReached = game.players.some((player) => player.tableau.length >= target);
  if (thresholdReached) return endGame(`A player reached ${target} Epochs.`);
  if (game.decks.action.length === 0) return endGame("Action deck exhausted.");
  return false;
}

function resolveWinnerIds(game, highScore) {
  let contenders = game.players.filter((player) => player.score === highScore);
  let round = 1;

  while (contenders.length > 1 && game.decks.artist.length >= contenders.length) {
    const results = contenders.map((player) => {
      const artist = draw(game.decks.artist, 1)[0];
      const value = artist.scores[player.museId] ?? 0;
      game.discards.artist.push(artist);
      return { player, artist, value };
    });
    const bestValue = Math.max(...results.map((result) => result.value));
    game.log.unshift(
      `Tiebreaker round ${round}: ${results
        .map((result) => `${result.player.name} drew ${result.artist.name} for ${result.value}`)
        .join("; ")}.`
    );
    contenders = results.filter((result) => result.value === bestValue).map((result) => result.player);
    round += 1;
  }

  return contenders.map((player) => player.id);
}

function endGame(reason) {
  const game = state.game;
  refreshScores(game);
  const highScore = Math.max(...game.players.map((player) => player.score));
  game.winnerIds = resolveWinnerIds(game, highScore);
  game.phase = "Game Over";
  game.endReason = reason;
  const winners = game.winnerIds.map((id) => game.players.find((player) => player.id === id)?.name).filter(Boolean);
  addGameLog(`${reason} Game over. Winner: ${winners.join(", ")} with ${highScore} point${highScore === 1 ? "" : "s"}.`);
  renderGame();
  return true;
}

async function runNpcTurnIfNeeded() {
  const game = state.game;
  const player = activePlayer(game);
  if (!game || !player || player.isHuman || game.phase === "Game Over") return;
  await drawActionForCurrentPlayer();
  if (game.phase === "Game Over") return;
  if (activePlayer(game)?.id !== player.id) return;

  const move = findBestNpcTableauMove(player);

  if (move) {
    playTableauMove(player, move);
  } else {
    addGameLog(`${player.name} had no legal tableau play and passed.`);
  }

  endTurn();
}

function runTiebreaker() {
  const totals = playerTotals();
  const sortedScores = [...totals.entries()].sort((a, b) => b[1] - a[1]);
  const highScore = sortedScores[0]?.[1] ?? 0;
  const tiedPlayerIds = sortedScores.filter(([, score]) => score === highScore).map(([playerId]) => playerId);

  if (tiedPlayerIds.length < 2) {
    tiebreakerResult.innerHTML = `<div class="empty-state">No tied players to resolve.</div>`;
    return;
  }

  const duelResults = tiedPlayerIds.map((playerId) => {
    const player = playerById(playerId);
    const artist = seed.artists[Math.floor(Math.random() * seed.artists.length)];
    const value = artist.scores[player.museId] ?? 0;
    return { player, artist, value };
  });
  const bestValue = Math.max(...duelResults.map((result) => result.value));
  const winners = duelResults.filter((result) => result.value === bestValue);

  tiebreakerResult.innerHTML = `
    ${duelResults
      .map(
        (result) => `
          <article class="content-item">
            <h4>${escapeHtml(result.player.name)}</h4>
            <p>Drew ${escapeHtml(result.artist.name)} for ${result.value} point${result.value === 1 ? "" : "s"}.</p>
          </article>
        `
      )
      .join("")}
    <div class="empty-state">${
      winners.length === 1
        ? `${escapeHtml(winners[0].player.name)} wins the Artist Duel.`
        : `Still tied: ${winners.map((result) => escapeHtml(result.player.name)).join(", ")}. Run another duel.`
    }</div>
  `;
}

function bindEvents() {
  cardTypeTabs?.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-type]");
      if (!button) return;
      state.activeType = button.dataset.type;
      renderCards();
    });

  cardsList?.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-card-key]");
    if (!button) return;
    state.selectedCardKey = button.dataset.cardKey;
    renderCards();
  });

  for (const control of [cardSearch, epochFilter, museFilter, actionFilter, statusFilter]) {
    control?.addEventListener("input", renderCards);
  }

  rulesSearch.addEventListener("input", renderRules);

  playerCountSelect.addEventListener("input", renderSetupCompanion);
  rollDiceButton.addEventListener("click", () => {
    for (const player of state.players) {
      player.roll = Math.floor(Math.random() * 6) + 1;
    }
    renderSetupCompanion();
  });
  playersSetup.addEventListener("input", (event) => {
    const playerCard = event.target.closest("[data-player-id]");
    if (!playerCard) return;
    const player = playerById(playerCard.dataset.playerId);
    if (!player) return;
    if (event.target.classList.contains("player-name")) player.name = event.target.value;
    if (event.target.classList.contains("player-muse")) player.museId = event.target.value;
    renderSetupCompanion();
  });
  addScoreRowButton.addEventListener("click", () => {
    state.scoreRows.push({
      id: `set-${Date.now()}`,
      playerId: state.players[0]?.id ?? "",
      epochId: "",
      artistId: ""
    });
    renderScoringHelper();
  });
  scoreRowsContainer.addEventListener("input", (event) => {
    const rowElement = event.target.closest("[data-row-id]");
    if (!rowElement) return;
    const row = state.scoreRows.find((item) => item.id === rowElement.dataset.rowId);
    if (!row) return;
    if (event.target.classList.contains("score-player")) row.playerId = event.target.value;
    if (event.target.classList.contains("score-epoch")) row.epochId = event.target.value;
    if (event.target.classList.contains("score-artist")) row.artistId = event.target.value;
    renderScoringHelper();
  });
  scoreRowsContainer.addEventListener("click", (event) => {
    const button = event.target.closest(".remove-score-row");
    if (!button) return;
    const rowElement = button.closest("[data-row-id]");
    state.scoreRows = state.scoreRows.filter((row) => row.id !== rowElement.dataset.rowId);
    renderScoringHelper();
  });
  runTiebreakerButton.addEventListener("click", runTiebreaker);
  savePlaytestButton.addEventListener("click", savePlaytestFromScoreSheet);
  clearPlaytestsButton.addEventListener("click", () => {
    state.playtests = [];
    persistPlaytests();
    playtestSaveStatus.textContent = "Playtest logs cleared.";
    renderPlaytests();
  });
  museDeckPile.addEventListener("click", () => dealNextPhysicalCard("muse"));
  museDealNextButton.addEventListener("click", () => dealNextPhysicalCard("muse"));
  museRestartDeckButton.addEventListener("click", () => restartPhysicalDeck("muse"));
  museDealtArea.addEventListener("click", (event) => {
    const card = event.target.closest("[data-dealt-index]");
    if (!card) return;
    flipDealtPhysicalCard("muse", Number(card.dataset.dealtIndex));
  });
  epochDeckPile.addEventListener("click", () => dealNextPhysicalCard("epoch"));
  epochDealNextButton.addEventListener("click", () => dealNextPhysicalCard("epoch"));
  epochRestartDeckButton.addEventListener("click", () => restartPhysicalDeck("epoch"));
  epochDealtArea.addEventListener("click", (event) => {
    const card = event.target.closest("[data-dealt-index]");
    if (!card) return;
    flipDealtPhysicalCard("epoch", Number(card.dataset.dealtIndex));
  });
  artistDeckPile.addEventListener("click", () => dealNextPhysicalCard("artist"));
  artistDealNextButton.addEventListener("click", () => dealNextPhysicalCard("artist"));
  artistRestartDeckButton.addEventListener("click", () => restartPhysicalDeck("artist"));
  artistDealtArea.addEventListener("click", (event) => {
    const card = event.target.closest("[data-dealt-index]");
    if (!card) return;
    flipDealtPhysicalCard("artist", Number(card.dataset.dealtIndex));
  });
  actionDeckPile.addEventListener("click", () => dealNextPhysicalCard("action"));
  actionDealNextButton.addEventListener("click", () => dealNextPhysicalCard("action"));
  actionRestartDeckButton.addEventListener("click", () => restartPhysicalDeck("action"));
  actionDealtArea.addEventListener("click", (event) => {
    const card = event.target.closest("[data-dealt-index]");
    if (!card) return;
    flipDealtPhysicalCard("action", Number(card.dataset.dealtIndex));
  });
  diceTesterRollButton?.addEventListener("click", rollStudioDice);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && (state.handOverlay.open || state.tableauOverlay.open)) {
      event.preventDefault();
      closeGameOverlays();
      return;
    }
    const activeDeckKey =
      location.hash === "#muse-deck" || Boolean(event.target.closest?.("#muse-deck"))
        ? "muse"
        : location.hash === "#epoch-deck" || Boolean(event.target.closest?.("#epoch-deck"))
          ? "epoch"
          : location.hash === "#artist-deck" || Boolean(event.target.closest?.("#artist-deck"))
            ? "artist"
            : location.hash === "#action-deck" || Boolean(event.target.closest?.("#action-deck"))
              ? "action"
              : "";
    if (!activeDeckKey) return;
    if ((event.key === " " || event.key === "Enter") && event.target === document.body) {
      event.preventDefault();
      dealNextPhysicalCard(activeDeckKey);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      dealNextPhysicalCard(activeDeckKey);
    }
    if (event.key === "Escape") {
      event.preventDefault();
      const deckState = physicalDeckConfig(activeDeckKey).state;
      for (const dealtCard of deckState.dealt) {
        dealtCard.faceUp = false;
      }
      renderPhysicalDeckViewer(activeDeckKey);
    }
  });
  gamePlayerCountSelect.addEventListener("input", () => {
    if (!state.game) renderGameSetup();
  });
  gameSetup.addEventListener("input", (event) => {
    const input = event.target.closest(".game-setup-name");
    const row = event.target.closest("[data-game-player-index]");
    if (!input || !row || !state.game) return;
    const player = state.game.players[Number(row.dataset.gamePlayerIndex)];
    if (!player) return;
    player.name = input.value.trim() || defaultGamePlayerName(Number(row.dataset.gamePlayerIndex));
  });
  gameSetup.addEventListener("change", (event) => {
    const input = event.target.closest(".game-setup-name");
    const row = event.target.closest("[data-game-player-index]");
    if (!input || !row || !state.game) return;
    const player = state.game.players[Number(row.dataset.gamePlayerIndex)];
    if (!player) return;
    player.name = input.value.trim() || defaultGamePlayerName(Number(row.dataset.gamePlayerIndex));
    renderGame();
  });
  document.querySelectorAll("[data-open-new-game]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      location.hash = "play";
      openSetupModal();
    });
  });
  window.addEventListener("hashchange", renderRoute);
  newGameButton.addEventListener("click", openSetupModal);
  setupBackButton?.addEventListener("click", () => {
    state.setupFlow.step = Math.max(1, (state.setupFlow.step || setupStepForGame()) - 1);
    renderSetupFlow();
  });
  setupNextButton?.addEventListener("click", () => {
    state.setupFlow.step = Math.min(setupStepForGame(), (state.setupFlow.step || 1) + 1);
    renderSetupFlow();
  });
  setupStartGameButton?.addEventListener("click", startNewGame);
  setupEnterPlayButton?.addEventListener("click", closeSetupModal);
  closeSetupModalButton?.addEventListener("click", closeSetupModal);
  setupModal?.addEventListener("click", (event) => {
    if (event.target.closest("[data-close-setup]")) {
      closeSetupModal();
      return;
    }
    const button = event.target.closest("[data-muse-id]");
    if (!button) return;
    chooseHumanMuse(button.dataset.museId);
  });
  gameControls.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    runGameCommand(button.id);
  });
  selectedCardPanel.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-panel-command]");
    if (!button) return;
    runGameCommand(button.dataset.panelCommand);
  });
  playerHand.addEventListener("click", (event) => {
    const openButton = event.target.closest("[data-open-hand]");
    if (openButton) {
      openHandOverlay();
      return;
    }
    const card = event.target.closest("[data-card-type][data-instance-id]");
    if (!card || !state.game) return;
    if (event.detail > 1) return;
    selectHandCard(card);
    renderGame();
  });
  playerHand.addEventListener("dblclick", (event) => {
    const card = event.target.closest("[data-card-type][data-instance-id]");
    if (!card || !state.game) return;
    playCardFromHandElement(card);
  });
  playerHand.addEventListener("dragstart", (event) => {
    const card = event.target.closest("[data-card-type][data-instance-id]");
    if (!card || !state.game) return;
    selectHandCard(card, true);
    state.game.draggedCard = { type: card.dataset.cardType, instanceId: card.dataset.instanceId };
    card.classList.add("dragging");
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", JSON.stringify({ type: card.dataset.cardType, instanceId: card.dataset.instanceId }));
  });
  playerHand.addEventListener("dragend", (event) => {
    const card = event.target.closest("[data-card-type][data-instance-id]");
    card?.classList.remove("dragging");
    if (state.game) state.game.draggedCard = null;
    gameTableau.classList.remove("drop-ready");
  });
  gameTableau.addEventListener("dragover", (event) => {
    if (!state.game) return;
    event.preventDefault();
    gameTableau.classList.add("drop-ready");
    event.dataTransfer.dropEffect = "move";
  });
  gameTableau.addEventListener("dragleave", (event) => {
    if (!gameTableau.contains(event.relatedTarget)) gameTableau.classList.remove("drop-ready");
  });
  gameTableau.addEventListener("drop", (event) => {
    event.preventDefault();
    gameTableau.classList.remove("drop-ready");
    let payload = null;
    try {
      payload = JSON.parse(event.dataTransfer.getData("text/plain"));
    } catch {
      payload = null;
    }
    const droppedCard = payload ?? state.game?.draggedCard;
    const selector = droppedCard
      ? `[data-card-type="${CSS.escape(droppedCard.type)}"][data-instance-id="${CSS.escape(droppedCard.instanceId)}"]`
      : "[data-card-type][data-instance-id]";
    const card = playerHand.querySelector(selector);
    dropHandCardOntoTableau(card);
    if (state.game) state.game.draggedCard = null;
  });
  gameTableau.addEventListener("click", (event) => {
    const button = event.target.closest("[data-view-tableau]");
    if (!button) return;
    openTableauOverlay(button.dataset.viewTableau);
  });
  handOverlay?.addEventListener("click", (event) => {
    if (event.target.closest("[data-close-overlay]")) {
      closeGameOverlays();
      return;
    }
    const command = event.target.closest("[data-overlay-command]");
    if (command) {
      runGameCommand(command.dataset.overlayCommand, humanPlayer(state.game));
      return;
    }
    const card = event.target.closest("[data-card-type][data-instance-id]");
    if (!card || !state.game || event.detail > 1) return;
    selectHandCard(card);
    renderGame();
  });
  handOverlay?.addEventListener("dblclick", (event) => {
    const card = event.target.closest("[data-card-type][data-instance-id]");
    if (!card || !state.game) return;
    playCardFromHandElement(card);
  });
  tableauOverlay?.addEventListener("click", (event) => {
    if (event.target.closest("[data-close-overlay]")) closeGameOverlays();
  });
  legalSetOverlay?.addEventListener("click", (event) => {
    if (event.target.closest("[data-close-overlay]")) {
      closeGameOverlays();
      return;
    }
    const option = event.target.closest("[data-legal-set-index]");
    if (!option) return;
    playChosenLegalSet(Number(option.dataset.legalSetIndex));
  });
  museChoice.addEventListener("click", (event) => {
    const button = event.target.closest("[data-muse-id]");
    if (!button) return;
    chooseHumanMuse(button.dataset.museId);
  });
}

function init() {
  auditCanonicalEpochData();
  playtestDate.value = new Date().toISOString().slice(0, 10);
  loadPlaytests();
  renderSummary();
  renderMuseDeckViewer();
  renderEpochDeckViewer();
  renderArtistDeckViewer();
  renderActionDeckViewer();
  renderDiceTester();
  populateFilters();
  bindEvents();
  renderRoute();
  renderCards();
  renderRules();
  renderManifest();
  renderSetupCompanion();
  renderPlaytests();
  renderGame();
}

init();
