import { DECK_TARGETS } from "./constants.mjs";

export function countManifest(seed) {
  return {
    MUSE: seed.muses.length,
    EPOCH: seed.epochs.reduce((total, epoch) => total + (epoch.copyCount ?? 1), 0),
    ARTIST: seed.artists.reduce((total, artist) => total + (artist.copyCount ?? 1), 0),
    ACTION: seed.actions.reduce((total, action) => total + (action.copyCount ?? 1), 0)
  };
}

export function compareManifest(counts, targets = DECK_TARGETS) {
  return Object.entries(targets).map(([cardType, target]) => {
    const actual = counts[cardType] ?? 0;
    return {
      cardType,
      actual,
      target,
      status: actual === target ? "pass" : "warning"
    };
  });
}
