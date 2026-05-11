import assert from "node:assert/strict";
import { getEndCondition } from "../src/domain/setup.mjs";
import { calculatePlayerScore, validateSet } from "../src/domain/scoring.mjs";
import { countManifest } from "../src/domain/manifest.mjs";
import { validateSeed } from "../src/domain/validation.mjs";
import { readSeed } from "../scripts/read-seed.mjs";

const tests = [];

function test(name, fn) {
  tests.push({ name, fn });
}

test("player count controls end condition", () => {
  assert.equal(getEndCondition(2), "First to 5 Epochs OR Action deck exhausted");
  assert.equal(getEndCondition(3), "First to 5 Epochs OR Action deck exhausted");
  assert.equal(getEndCondition(4), "First to 4 Epochs OR Action deck exhausted");
  assert.throws(() => getEndCondition(1), /at least 2/);
  assert.throws(() => getEndCondition(10), /up to 9/);
});

test("set validation requires matching Epoch and Artist", async () => {
  const seed = await readSeed();
  const artist = seed.artists.find((item) => item.id === "marble-maven");

  assert.deepEqual(validateSet({ epochId: "ancient-rome", artist }), {
    valid: true,
    reason: "Valid Muse-Epoch-Artist set."
  });

  assert.equal(validateSet({ epochId: "1980s-neon-dreams", artist }).valid, false);
});

test("player score totals valid sets only", async () => {
  const seed = await readSeed();
  const marbleMaven = seed.artists.find((item) => item.id === "marble-maven");
  const cassetteCrooner = seed.artists.find((item) => item.id === "cassette-crooner");

  const total = calculatePlayerScore({
    museId: "calliope",
    sets: [
      { epochId: "ancient-rome", artist: marbleMaven },
      { epochId: "ancient-rome", artist: cassetteCrooner }
    ]
  });

  assert.equal(total, 3);
});

test("manifest counts copy quantities", async () => {
  const seed = await readSeed();
  assert.deepEqual(countManifest(seed), {
    MUSE: 9,
    EPOCH: 90,
    ARTIST: 150,
    ACTION: 64
  });
});

test("seed validation has no blocking issues", async () => {
  const seed = await readSeed();
  const report = validateSeed(seed);
  assert.equal(report.ok, true);
  assert.equal(report.issues.filter((issue) => issue.severity === "blocking").length, 0);
});

let failed = 0;

for (const item of tests) {
  try {
    await item.fn();
    console.log(`PASS ${item.name}`);
  } catch (error) {
    failed += 1;
    console.error(`FAIL ${item.name}`);
    console.error(error);
  }
}

console.log(`${tests.length - failed}/${tests.length} tests passed.`);

if (failed > 0) {
  process.exitCode = 1;
}
