import { readdir, readFile } from "node:fs/promises";
import { join, extname } from "node:path";
import { root } from "./read-seed.mjs";

const checkedExtensions = new Set([".mjs", ".js", ".json", ".md", ".css", ".html", ".sql"]);
const ignoredDirectories = new Set([".git", "node_modules"]);
const issues = [];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      if (!ignoredDirectories.has(entry.name)) {
        await walk(path);
      }
      continue;
    }

    if (!checkedExtensions.has(extname(entry.name))) {
      continue;
    }

    const text = await readFile(path, "utf8");
    if (text.includes("\t")) {
      issues.push(`${path}: contains tab indentation`);
    }
    if (/[ \t]+$/m.test(text)) {
      issues.push(`${path}: contains trailing whitespace`);
    }
  }
}

await walk(root);

if (issues.length > 0) {
  console.error(issues.join("\n"));
  process.exitCode = 1;
} else {
  console.log("Lint checks passed.");
}
