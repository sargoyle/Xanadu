import { mkdir, copyFile } from "node:fs/promises";
import { join } from "node:path";
import { root } from "./read-seed.mjs";

const publicDataDir = join(root, "public", "data");

await mkdir(publicDataDir, { recursive: true });
await copyFile(join(root, "data", "seed.json"), join(publicDataDir, "seed.json"));

console.log("Prepared static Vercel data at public/data/seed.json");
