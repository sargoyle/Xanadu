import { ACTION_CATEGORIES, ACTION_CATEGORY_TARGETS, MUSE_IDS, PRINT_STATUSES } from "./constants.mjs";
import { compareManifest, countManifest } from "./manifest.mjs";

function issue(severity, code, message, ref = null) {
  return { severity, code, message, ref };
}

export function validateSeed(seed) {
  const issues = [];
  const museIds = new Set(seed.muses.map((muse) => muse.id));
  const epochIds = new Set(seed.epochs.map((epoch) => epoch.id));
  const artistKeyCounts = new Map();

  for (const requiredMuse of MUSE_IDS) {
    if (!museIds.has(requiredMuse)) {
      issues.push(issue("blocking", "MISSING_MUSE", `Missing Muse: ${requiredMuse}.`, requiredMuse));
    }
  }

  for (const collectionName of ["muses", "epochs", "artists", "actions"]) {
    for (const card of seed[collectionName]) {
      if (!PRINT_STATUSES.includes(card.printStatus)) {
        issues.push(issue("blocking", "INVALID_PRINT_STATUS", `${card.name} has invalid print status.`, card.id));
      }
    }
  }

  for (const artist of seed.artists) {
    if (!epochIds.has(artist.epochId)) {
      issues.push(issue("blocking", "UNKNOWN_EPOCH", `${artist.name} references unknown Epoch ${artist.epochId}.`, artist.id));
    }

    const scoreMuseIds = Object.keys(artist.scores ?? {});
    for (const museId of MUSE_IDS) {
      if (!scoreMuseIds.includes(museId)) {
        issues.push(issue("blocking", "MISSING_SCORE", `${artist.name} is missing score for ${museId}.`, artist.id));
      }
    }

    for (const [museId, score] of Object.entries(artist.scores ?? {})) {
      if (!museIds.has(museId)) {
        issues.push(issue("blocking", "UNKNOWN_SCORE_MUSE", `${artist.name} scores unknown Muse ${museId}.`, artist.id));
      }

      if (!Number.isInteger(score) || score < 0 || score > 3) {
        issues.push(issue("blocking", "INVALID_SCORE", `${artist.name} has invalid score ${score} for ${museId}.`, artist.id));
      }
    }

    const duplicateKey = `${artist.name.toLowerCase()}::${artist.epochId}`;
    artistKeyCounts.set(duplicateKey, (artistKeyCounts.get(duplicateKey) ?? 0) + 1);
  }

  for (const [duplicateKey, count] of artistKeyCounts.entries()) {
    const [name, epochId] = duplicateKey.split("::");
    const matchingArtists = seed.artists.filter(
      (artist) => artist.name.toLowerCase() === name && artist.epochId === epochId
    );
    const allMarkedIntentional = matchingArtists.every((artist) => artist.isIntentionalDuplicate);
    if (count > 1 && !allMarkedIntentional) {
      issues.push(issue("warning", "DUPLICATE_ARTIST", `Duplicate Artist/Epoch pair requires review: ${duplicateKey}.`, duplicateKey));
    }
  }

  const actionCategoryCounts = new Map(ACTION_CATEGORIES.map((category) => [category, 0]));
  for (const action of seed.actions) {
    if (!ACTION_CATEGORIES.includes(action.category)) {
      issues.push(issue("blocking", "INVALID_ACTION_CATEGORY", `${action.name} has invalid category.`, action.id));
    } else {
      actionCategoryCounts.set(action.category, (actionCategoryCounts.get(action.category) ?? 0) + 1);
    }

    if (action.category === "fate" && !action.diceOutcomes) {
      issues.push(issue("blocking", "MISSING_DICE_OUTCOMES", `${action.name} needs dice outcomes.`, action.id));
    } else if (action.category === "fate" && Object.keys(action.diceOutcomes).length !== 6) {
      issues.push(issue("blocking", "INVALID_DICE_OUTCOMES", `${action.name} must define exactly 6 dice outcomes.`, action.id));
    }
  }

  for (const [category, target] of Object.entries(ACTION_CATEGORY_TARGETS)) {
    const actual = actionCategoryCounts.get(category) ?? 0;
    if (actual !== target) {
      issues.push(
        issue(
          "warning",
          "ACTION_CATEGORY_MISMATCH",
          `${category} Action count is ${actual}; target is ${target}.`,
          category
        )
      );
    }
  }

  const manifestCounts = countManifest(seed);
  for (const result of compareManifest(manifestCounts, seed.deckManifest.targets)) {
    if (result.status !== "pass") {
      issues.push(
        issue(
          "warning",
          "DECK_COUNT_MISMATCH",
          `${result.cardType} count is ${result.actual}; target is ${result.target}.`,
          result.cardType
        )
      );
    }
  }

  return {
    ok: issues.every((item) => item.severity !== "blocking"),
    issues,
    manifestCounts
  };
}
