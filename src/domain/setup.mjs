export function getEndCondition(playerCount) {
  if (!Number.isInteger(playerCount) || playerCount < 2) {
    throw new RangeError("Xanadu requires at least 2 players.");
  }

  if (playerCount > 9) {
    throw new RangeError("Xanadu supports up to 9 Muses/players.");
  }

  return playerCount <= 3
    ? "First to 5 Epochs OR Action deck exhausted"
    : "First to 4 Epochs OR Action deck exhausted";
}

export function getSetupSteps(playerCount) {
  return [
    "Separate the Muse, Epoch, Artist and Action cards.",
    "Display the Muse cards face up.",
    "Shuffle the Epoch, Artist and Action decks separately.",
    "Place the decks in the centre of the tableau, face down.",
    "Deal 3 Action cards to each player.",
    "Deal 5 Epoch cards to each player.",
    "Deal 5 Artist cards to each player.",
    "Each player rolls the dice; highest roller chooses a Muse first.",
    `Game end condition: ${getEndCondition(playerCount)}.`
  ];
}
