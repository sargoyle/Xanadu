import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

export async function readSeed() {
  const raw = await readFile(join(root, "data", "seed.json"), "utf8");
  return JSON.parse(raw);
}

export { root };
