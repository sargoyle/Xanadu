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
const gamePlayerCountSelect = document.querySelector("#game-player-count");
const gameSetup = document.querySelector("#game-setup");
const gameTurnTitle = document.querySelector("#game-turn-title");
const gamePhase = document.querySelector("#game-phase");
const gameDecks = document.querySelector("#game-decks");
const museChoice = document.querySelector("#muse-choice");
const gameControls = document.querySelector("#game-controls");
const gamePlayers = document.querySelector("#game-players");
const gameTableau = document.querySelector("#game-tableau");
const playerHandTitle = document.querySelector("#player-hand-title");
const playerHand = document.querySelector("#player-hand");
const gameLog = document.querySelector("#game-log");
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
  players: [],
  scoreRows: [],
  playtests: [],
  game: null
};

const museById = new Map(seed.muses.map((muse) => [muse.id, muse]));
const epochById = new Map(seed.epochs.map((epoch) => [epoch.id, epoch]));
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
      name: epoch.name,
      imagePath: `/assets/epochs/epoch-front-${String(epochIndex + 1).padStart(2, "0")}.png`,
      backImagePath: "/assets/epochs/epoch-back.png"
    }))
  );
}

function generateArtistArtworkPrompt(artist) {
  const epoch = epochById.get(artist.epochId);
  return [
    `Create premium tabletop card artwork for "${artist.name}".`,
    `Epoch: ${epoch?.name ?? artist.epochId}.`,
    `Artist type: ${artist.artistType}.`,
    `Flavour: ${artist.description}.`,
    "Style: illuminated manuscript meets gilded art deco oracle card, painterly, collectible card game quality, elegant composition, textured, rich but readable.",
    "Do not include text, labels, borders, score grids, logos, UI, watermarks, or card frame elements in the artwork."
  ].join(" ");
}

function artistDeckCards() {
  return seed.artists.map((artist) => {
    const epoch = epochById.get(artist.epochId);
    return {
      ...artist,
      cardKind: "artist",
      epochName: epoch?.name ?? artist.epochId,
      artworkPath: artist.artworkPath ?? "",
      artworkPrompt: artist.artworkPrompt ?? generateArtistArtworkPrompt(artist),
      backImagePath: "/assets/artists/artist-back.png"
    };
  });
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
  const source = `${card.epochId}-${card.artistType}`;
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
      ${seed.muses
        .map(
          (muse) => `
            <span class="artist-score-cell">
              <span>${escapeHtml(muse.name.slice(0, 2))}</span>
              <strong>${card.scores?.[muse.id] ?? 0}</strong>
            </span>
          `
        )
        .join("")}
    </span>
  `;
}

function renderArtistCardFront(card) {
  return `
    <span class="artist-card-front">
      <span class="artist-card-top">
        <span class="artist-card-name">${escapeHtml(card.name)}</span>
        <span class="artist-artwork-frame">${renderArtistArtworkPanel(card)}</span>
      </span>
      <span class="artist-card-middle">
        <span class="artist-card-meta">
          <strong>${escapeHtml(card.epochName)}</strong>
          <span>${escapeHtml(card.artistType)}</span>
        </span>
        <span class="artist-card-flavour">${escapeHtml(card.description)}</span>
      </span>
      <span class="artist-card-bottom">
        ${renderArtistScoreGrid(card)}
      </span>
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
      meta: `${card.artistType} · ${epochById.get(card.epochId)?.name ?? card.epochId}`
    })),
    ...seed.actions.map((card) => ({ ...card, cardType: "Action", meta: formatCategory(card.category) }))
  ];
}

function populateFilters() {
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
  cardTypeTabs.innerHTML = CARD_TYPES.map(
    (type) => `
      <button type="button" class="${state.activeType === type ? "active" : ""}" data-type="${escapeHtml(type)}">
        ${escapeHtml(type)}
      </button>
    `
  ).join("");
}

function matchesFilters(card) {
  const query = cardSearch.value.trim().toLowerCase();
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
    epochById.get(card.epochId)?.name,
    Object.keys(card.scores ?? {})
      .map((museId) => museById.get(museId)?.name)
      .join(" ")
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (state.activeType !== "All" && card.cardType !== state.activeType) return false;
  if (query && !haystack.includes(query)) return false;
  if (statusFilter.value && card.printStatus !== statusFilter.value) return false;
  if (epochFilter.value && card.cardType === "Artist" && card.epochId !== epochFilter.value) return false;
  if (epochFilter.value && card.cardType === "Epoch" && card.id !== epochFilter.value) return false;
  if (epochFilter.value && card.cardType !== "Artist" && card.cardType !== "Epoch") return false;
  if (museFilter.value && card.cardType === "Artist" && !Object.hasOwn(card.scores ?? {}, museFilter.value)) return false;
  if (museFilter.value && card.cardType === "Muse" && card.id !== museFilter.value) return false;
  if (museFilter.value && card.cardType !== "Artist" && card.cardType !== "Muse") return false;
  if (actionFilter.value && (card.cardType !== "Action" || card.category !== actionFilter.value)) return false;

  return true;
}

function filteredCards() {
  return normalizedCards().filter(matchesFilters);
}

function renderCards() {
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
      .filter((artist) => artist.epochId === card.id)
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
    return [epochById.get(card.epochId)?.name].filter(Boolean);
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
  if (!card) return;
  const related = relatedCards(card);
  const epoch = card.cardType === "Artist" ? epochById.get(card.epochId) : null;
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
  if (artist.epochId !== row.epochId) {
    return {
      valid: false,
      message: `${artist.name} belongs to ${epochById.get(artist.epochId)?.name ?? artist.epochId}.`
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
      const muse = museById.get(player.museId);
      const handCount = player.hand.artists.length + player.hand.epochs.length + player.hand.actions.length;
      return `
        <div class="game-setup-row ${player.id === state.game?.currentPlayerId ? "active" : ""}" data-game-player-index="${index}">
          <label>
            <span>${player.isHuman ? "Human Player" : `Player ${index + 1}`}</span>
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

  if (!picker) {
    game.log.unshift("All Muses selected. The first digital turn is ready.");
    startFirstTurn(game);
    runNpcTurnIfNeeded();
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
    players,
    decks: { artist: artistDeck, epoch: epochDeck, action: actionDeck },
    discards: { artist: [], epoch: [], action: [] },
    winnerIds: [],
    log: [
      "Dealt 5 Artists, 5 Epochs, and 3 Actions to each player.",
      "Rolled dice for Muse selection order."
    ]
  };

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
      set.artists.reduce((artistTotal, artist) => artistTotal + (artist.scores[player.museId] ?? 0), 0),
    0
  );
}

function refreshScores(game = state.game) {
  for (const player of game.players) {
    player.score = scorePlayer(player);
  }
}

function addGameLog(message) {
  state.game?.log.unshift(message);
}

function removeByInstance(cards, instanceId) {
  const index = cards.findIndex((card) => card.instanceId === instanceId);
  if (index < 0) return null;
  return cards.splice(index, 1)[0];
}

function matchingTableauSet(player, artist) {
  return player.tableau.find((set) => set.epoch.id === artist.epochId);
}

function findPlayableTableauMove(player) {
  const playablePair = player.hand.artists
    .map((artist) => ({ artist, epoch: player.hand.epochs.find((epoch) => epoch.id === artist.epochId) }))
    .find((pair) => pair.epoch);
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

function playTableauMove(player, move) {
  if (move.type === "new-set") {
    const playedEpoch = removeByInstance(player.hand.epochs, move.epoch.instanceId);
    const playedArtist = removeByInstance(player.hand.artists, move.artist.instanceId);
    player.tableau.push({ epoch: playedEpoch, artists: [playedArtist] });
    addGameLog(`${player.name} played ${playedEpoch.name} with ${playedArtist.name}.`);
    return;
  }

  const playedArtist = removeByInstance(player.hand.artists, move.artist.instanceId);
  move.targetSet.artists.push(playedArtist);
  addGameLog(`${player.name} attached ${playedArtist.name} to ${move.targetSet.epoch.name}.`);
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
  addGameLog(`${activePlayer(game).name} starts turn 1.`);
}

function gameCardSubtitle(card, type) {
  if (type === "Artist") return epochById.get(card.epochId)?.name ?? card.epochId;
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
  const backPath = card.backImagePath ?? sharedCardBackPath;
  const scoreLabel = gameCardScoreLabel(card, type, scoreMuseId);
  const style = handCardStyle(index, total);
  const cardClasses = [
    "play-card",
    "physical-card",
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

  const fullArt = card.imagePath
    ? `<img class="physical-card-full-art" src="${escapeHtml(card.imagePath)}" alt="${escapeHtml(`${card.name} artwork`)}">`
    : `<span class="card-art-window"><span class="card-glyph">${escapeHtml(gameCardGlyph(type))}</span></span>`;

  return `
    <${tag} ${attrs} class="${cardClasses}" style="${style}" aria-label="${escapeHtml(`${type} card: ${card.name}`)}">
      <span class="physical-card-face">
        <span class="card-inner-frame">
          <span class="card-kicker">${escapeHtml(type)}</span>
          <strong class="card-title">${escapeHtml(card.name)}</strong>
          <span class="card-subtitle">${escapeHtml(gameCardSubtitle(card, type) ?? "")}</span>
          ${fullArt}
          <span class="card-rules-text">${escapeHtml(gameCardBody(card, type))}</span>
          ${scoreLabel ? `<span class="card-score-chip">${escapeHtml(scoreLabel)}</span>` : ""}
        </span>
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
  const stack = Array.from({ length: stackCount }, (_, index) => {
    const offset = count === 0 ? 0 : index;
    return `
      <span class="pile-card-back" style="--pile-offset:${offset};">
        <img src="${sharedCardBackPath}" alt="">
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

function handCardsForPlayer(player) {
  return [
    ...player.hand.epochs.map((card) => ({ card, type: "Epoch" })),
    ...player.hand.artists.map((card) => ({ card, type: "Artist" })),
    ...player.hand.actions.map((card) => ({ card, type: "Action" }))
  ];
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

  const isHumanTurn = player?.isHuman;
  return `
    <div class="button-row">
      <button id="draw-action" type="button" class="command-button" ${!isHumanTurn || game.phase !== "Draw Action" ? "disabled" : ""}>Draw Action</button>
      <button id="play-action" type="button" class="command-button secondary" ${!isHumanTurn || game.phase === "Draw Action" || game.actionPlayedThisTurn ? "disabled" : ""}>Play Action</button>
      <button id="play-tableau-card" type="button" class="command-button" ${!isHumanTurn || game.phase === "Draw Action" ? "disabled" : ""}>Play Epoch / Artist</button>
      <button id="auto-tableau-play" type="button" class="command-button secondary" ${!isHumanTurn || game.phase === "Draw Action" ? "disabled" : ""}>Auto Play Legal Set</button>
      <button id="end-turn" type="button" class="command-button secondary" ${!isHumanTurn || game.phase === "Draw Action" ? "disabled" : ""}>End Turn</button>
    </div>
    <p class="muted">${escapeHtml(turnHint(game, player))}</p>
  `;
}

function turnHint(game, player) {
  if (!player?.isHuman) return "NPC is thinking through its turn automatically.";
  if (game.phase === "Draw Action") return "Draw 1 Action card to begin your turn.";
  if (game.phase === "Main") return "Select cards from your hand to play, use Auto Play Legal Set, or end your turn to pass.";
  return "Resolve the current game state.";
}

function renderGame() {
  const game = state.game;
  if (!game) {
    renderGameSetup();
    gameTurnTitle.textContent = "No game in progress";
    gamePhase.textContent = "Start a new game to roll turn order, choose Muses, and deal cards.";
    gameDecks.innerHTML = "";
    museChoice.innerHTML = "";
    gameControls.innerHTML = "";
    gamePlayers.innerHTML = `<div class="empty-state">Game Mode is the primary experience. Start here to play Xanadu digitally.</div>`;
    gameTableau.innerHTML = `<div class="empty-state">Tableau sets will appear here after cards are played.</div>`;
    playerHandTitle.textContent = "Current Player Hand";
    playerHand.innerHTML = `<div class="empty-state">Your hand will appear after a game starts.</div>`;
    gameLog.innerHTML = `<p class="muted">No game actions yet.</p>`;
    return;
  }

  refreshScores(game);
  renderGameSetup();
  const currentPlayer = game.players.find((player) => player.id === game.currentPlayerId);
  const picker = currentMusePicker(game);
  gameTurnTitle.textContent =
    game.phase === "Game Over"
      ? "Game Over"
      : game.phase === "Muse Selection"
      ? `${picker?.name ?? "Players"} choosing Muses`
      : `${currentPlayer?.name ?? "Player"}'s turn`;
  gamePhase.textContent = game.phase;
  gameDecks.innerHTML = `
    ${renderCardPile("Artist Deck", game.decks.artist.length, "deck")}
    ${renderCardPile("Epoch Deck", game.decks.epoch.length, "deck")}
    ${renderCardPile("Action Deck", game.decks.action.length, "deck")}
    ${renderCardPile("Artist Discard", game.discards.artist.length, "discard")}
    ${renderCardPile("Epoch Discard", game.discards.epoch.length, "discard")}
    ${renderCardPile("Action Discard", game.discards.action.length, "discard")}
    <article class="card-pile target">
      <div class="mini-card-stack target-marker">${endEpochTarget(game)}</div>
      <strong>End Target</strong>
      <span>${endEpochTarget(game)} Epochs</span>
    </article>
  `;

  museChoice.innerHTML =
    picker?.isHuman
      ? `
        <h3>Choose Your Muse</h3>
        <div class="muse-button-grid">
          ${availableMuseIds(game)
            .map((museId) => {
              const muse = museById.get(museId);
              return `<button type="button" class="muse-pick" data-muse-id="${escapeHtml(muse.id)}">${escapeHtml(muse.name)}</button>`;
            })
            .join("")}
        </div>
      `
      : "";
  gameControls.innerHTML = renderTurnControls(game, currentPlayer);

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
        (player) => `
          <article class="tableau-player">
            <h4>${escapeHtml(player.name)} Tableau</h4>
            ${
              player.tableau.length === 0
                ? `<p class="muted">No Epochs yet.</p>`
                : player.tableau
                    .map(
                      (set) => `
                        <div class="tableau-set">
                          <div class="tableau-card-row">
                            ${renderPhysicalCard(set.epoch, "Epoch", { interactive: false, extraClass: "tableau-epoch" })}
                            <div class="tableau-artist-stack" aria-label="${escapeHtml(`${set.artists.length} Artists on ${set.epoch.name}`)}">
                              ${set.artists
                                .map((artist, index) =>
                                  renderPhysicalCard(artist, "Artist", {
                                    interactive: false,
                                    index,
                                    total: set.artists.length,
                                    extraClass: "tableau-artist",
                                    scoreMuseId: player.museId
                                  })
                                )
                                .join("")}
                            </div>
                          </div>
                          <span class="tableau-set-summary">${set.artists.length} Artist${set.artists.length === 1 ? "" : "s"} | ${set.artists.reduce((total, artist) => total + (artist.scores[player.museId] ?? 0), 0)} points</span>
                        </div>
                      `
                    )
                    .join("")
            }
          </article>
        `
      )
      .join("");

  const human = humanPlayer(game);
  const visiblePlayer = currentPlayer?.isHuman ? currentPlayer : human;
  playerHandTitle.textContent = `${visiblePlayer.name}'s Hand`;
  const showVisibleHand = game.phase === "Muse Selection" || currentPlayer?.isHuman;
  const visibleHandCards = handCardsForPlayer(visiblePlayer);
  playerHand.innerHTML = showVisibleHand
    ? `
      ${visibleHandCards.map(({ card, type }, index) => renderGameCard(card, type, index, visibleHandCards.length)).join("")}
    `
    : `<div class="empty-state">${escapeHtml(currentPlayer?.name ?? "NPC")} is taking an automated turn. Your hand returns when it is your turn.</div>`;

  gameLog.innerHTML = game.log.map((entry) => `<p>${escapeHtml(entry)}</p>`).join("");
}

function drawActionForCurrentPlayer() {
  const game = state.game;
  const player = activePlayer(game);
  if (!game || !player || game.phase !== "Draw Action") return;
  const card = draw(game.decks.action, 1)[0];
  if (!card) {
    endGame("Action deck exhausted.");
    return;
  }
  player.hand.actions.push(card);
  addGameLog(`${player.name} drew Action: ${card.name}.`);
  if (card.playCondition === "Play Immediately") {
    resolveActionCard(player, card);
    removeByInstance(player.hand.actions, card.instanceId);
    game.discards.action.push(card);
    endTurn();
    return;
  }
  game.phase = "Main";
  renderGame();
}

function playSelectedAction() {
  const game = state.game;
  const player = activePlayer(game);
  if (!game || !player || !player.isHuman || game.actionPlayedThisTurn) return;
  const action = selectedHandCards(player).action;
  if (!action) {
    addGameLog("Select an Action card before playing an Action.");
    renderGame();
    return;
  }
  resolveActionCard(player, action);
  removeByInstance(player.hand.actions, action.instanceId);
  game.discards.action.push(action);
  game.actionPlayedThisTurn = true;
  game.selectedCards.action = "";
  checkEndGame();
  renderGame();
}

function resolveActionCard(player, action) {
  const game = state.game;
  addGameLog(`${player.name} played Action: ${action.name}.`);

  if (action.category === "fate" && action.diceOutcomes) {
    const roll = Math.floor(Math.random() * 6) + 1;
    const outcome = action.diceOutcomes[String(roll)];
    addGameLog(`Fate roll ${roll}: ${outcome}`);
    applySimpleEffect(player, outcome);
    return;
  }

  applySimpleEffect(player, action.effectText ?? action.rulesText ?? "");
}

function applySimpleEffect(player, effectText) {
  const text = String(effectText);
  const artistDraw = text.match(/Draw (\d+) Artist/i);
  const epochDraw = text.match(/Draw (\d+) Epoch/i);
  const actionDraw = text.match(/Draw (\d+) Action/i);

  if (artistDraw) {
    const cards = draw(state.game.decks.artist, Number(artistDraw[1]));
    player.hand.artists.push(...cards);
    addGameLog(`${player.name} drew ${cards.length} Artist card${cards.length === 1 ? "" : "s"}.`);
  }
  if (epochDraw) {
    const cards = draw(state.game.decks.epoch, Number(epochDraw[1]));
    player.hand.epochs.push(...cards);
    addGameLog(`${player.name} drew ${cards.length} Epoch card${cards.length === 1 ? "" : "s"}.`);
  }
  if (actionDraw) {
    const cards = draw(state.game.decks.action, Number(actionDraw[1]));
    player.hand.actions.push(...cards);
    addGameLog(`${player.name} drew ${cards.length} Action card${cards.length === 1 ? "" : "s"}.`);
  }
  if (/Play 2 Artist/i.test(text)) {
    state.game.extraArtistPlays = Math.max(state.game.extraArtistPlays ?? 0, 1);
    addGameLog(`${player.name} may play one extra Artist this turn.`);
  }
  if (!artistDraw && !epochDraw && !actionDraw && !/Play 2 Artist/i.test(text)) {
    addGameLog(`Manual resolution required: ${text}`);
  }
}

function playSelectedTableauCards() {
  const game = state.game;
  const player = activePlayer(game);
  if (!game || !player || !player.isHuman || game.phase === "Draw Action") return;
  const { epoch, artist } = selectedHandCards(player);
  const maxArtists = 1 + (game.extraArtistPlays ?? 0);

  if (!artist) {
    addGameLog("Select an Artist card before building your tableau, or use Auto Play Legal Set.");
    renderGame();
    return;
  }
  if (game.artistsPlayedThisTurn >= maxArtists) {
    addGameLog("You have already played the maximum number of Artists this turn.");
    renderGame();
    return;
  }

  if (epoch) {
    if (epoch.id !== artist.epochId) {
      addGameLog(`${artist.name} cannot be played with ${epoch.name}; the Epoch must match.`);
      renderGame();
      return;
    }
    playTableauMove(player, { type: "new-set", epoch, artist });
    game.artistsPlayedThisTurn += 1;
    game.selectedCards = { ...game.selectedCards, epoch: "", artist: "" };
  } else {
    const targetSet = matchingTableauSet(player, artist);
    if (!targetSet) {
      addGameLog(`Select a matching Epoch from your hand, or first create a ${epochById.get(artist.epochId)?.name ?? artist.epochId} tableau set.`);
      renderGame();
      return;
    }
    playTableauMove(player, { type: "attach", artist, targetSet });
    game.artistsPlayedThisTurn += 1;
    game.selectedCards.artist = "";
  }

  refreshScores(game);
  checkEndGame();
  renderGame();
}

function autoPlayTableauCards() {
  const game = state.game;
  const player = activePlayer(game);
  if (!game || !player || !player.isHuman || game.phase === "Draw Action") return;
  const maxArtists = 1 + (game.extraArtistPlays ?? 0);
  if (game.artistsPlayedThisTurn >= maxArtists) {
    addGameLog("You have already played the maximum number of Artists this turn.");
    renderGame();
    return;
  }

  const move = findPlayableTableauMove(player);
  if (!move) {
    addGameLog("No legal Epoch + Artist play is available. You may end your turn to pass.");
    renderGame();
    return;
  }

  playTableauMove(player, move);
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
    playSelectedAction();
    return;
  }
  playSelectedTableauCards();
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
  if (!game || game.phase === "Game Over") return;
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
  addGameLog(`${activePlayer(game).name} starts turn ${game.turnNumber}.`);
  renderGame();
  runNpcTurnIfNeeded();
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

function runNpcTurnIfNeeded() {
  const game = state.game;
  const player = activePlayer(game);
  if (!game || !player || player.isHuman || game.phase === "Game Over") return;
  drawActionForCurrentPlayer();
  if (game.phase === "Game Over") return;

  const move = findPlayableTableauMove(player);

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
  cardTypeTabs.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-type]");
    if (!button) return;
    state.activeType = button.dataset.type;
    renderCards();
  });

  cardsList.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-card-key]");
    if (!button) return;
    state.selectedCardKey = button.dataset.cardKey;
    renderCards();
  });

  for (const control of [cardSearch, epochFilter, museFilter, actionFilter, statusFilter]) {
    control.addEventListener("input", renderCards);
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
  document.addEventListener("keydown", (event) => {
    const activeDeckKey =
      location.hash === "#muse-deck" || Boolean(event.target.closest?.("#muse-deck"))
        ? "muse"
        : location.hash === "#epoch-deck" || Boolean(event.target.closest?.("#epoch-deck"))
          ? "epoch"
          : location.hash === "#artist-deck" || Boolean(event.target.closest?.("#artist-deck"))
            ? "artist"
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
  gameSetup.addEventListener("change", (event) => {
    const input = event.target.closest(".game-setup-name");
    const row = event.target.closest("[data-game-player-index]");
    if (!input || !row || !state.game) return;
    const player = state.game.players[Number(row.dataset.gamePlayerIndex)];
    if (!player) return;
    player.name = input.value.trim() || defaultGamePlayerName(Number(row.dataset.gamePlayerIndex));
    renderGame();
  });
  newGameButton.addEventListener("click", startNewGame);
  gameControls.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    if (button.id === "draw-action") drawActionForCurrentPlayer();
    if (button.id === "play-action") playSelectedAction();
    if (button.id === "play-tableau-card") playSelectedTableauCards();
    if (button.id === "auto-tableau-play") autoPlayTableauCards();
    if (button.id === "end-turn") endTurn();
  });
  playerHand.addEventListener("click", (event) => {
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
  museChoice.addEventListener("click", (event) => {
    const button = event.target.closest("[data-muse-id]");
    if (!button || !state.game) return;
    const picker = currentMusePicker(state.game);
    if (!picker?.isHuman) return;
    picker.museId = button.dataset.museId;
    state.game.log.unshift(`You chose ${museById.get(picker.museId)?.name ?? "a Muse"}.`);
    resolveNpcMuseChoices();
    renderGame();
  });
}

function init() {
  playtestDate.value = new Date().toISOString().slice(0, 10);
  loadPlaytests();
  renderSummary();
  renderMuseDeckViewer();
  renderEpochDeckViewer();
  renderArtistDeckViewer();
  populateFilters();
  bindEvents();
  renderCards();
  renderRules();
  renderManifest();
  renderSetupCompanion();
  renderPlaytests();
  renderGame();
}

init();
