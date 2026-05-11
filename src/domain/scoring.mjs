export function scoreArtistForMuse(artist, museId) {
  if (!artist || !artist.scores) {
    throw new Error("Artist scores are missing.");
  }

  const score = artist.scores[museId];
  if (!Number.isInteger(score)) {
    throw new Error(`Missing score for ${artist.name} and muse ${museId}.`);
  }

  return score;
}

export function validateSet({ epochId, artist }) {
  if (!epochId) {
    return { valid: false, reason: "Choose an Epoch." };
  }

  if (!artist) {
    return { valid: false, reason: "Choose an Artist." };
  }

  if (artist.epochId !== epochId) {
    return {
      valid: false,
      reason: `${artist.name} belongs to ${artist.epochId}, not ${epochId}.`
    };
  }

  return { valid: true, reason: "Valid Muse-Epoch-Artist set." };
}

export function calculatePlayerScore({ museId, sets }) {
  if (!museId) {
    throw new Error("A Muse must be selected before scoring.");
  }

  return sets.reduce((total, set) => {
    const validation = validateSet(set);
    if (!validation.valid) {
      return total;
    }

    return total + scoreArtistForMuse(set.artist, museId);
  }, 0);
}
