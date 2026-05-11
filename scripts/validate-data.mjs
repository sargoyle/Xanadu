import { validateSeed } from "../src/domain/validation.mjs";
import { readSeed } from "./read-seed.mjs";

const seed = await readSeed();
const report = validateSeed(seed);

console.log("Xanadu validation report");
console.log(`Blocking issues: ${report.issues.filter((issue) => issue.severity === "blocking").length}`);
console.log(`Warnings: ${report.issues.filter((issue) => issue.severity === "warning").length}`);
console.log("Manifest counts:", JSON.stringify(report.manifestCounts));

for (const item of report.issues) {
  console.log(`[${item.severity}] ${item.code}: ${item.message}`);
}

if (!report.ok) {
  process.exitCode = 1;
}
