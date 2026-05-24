import { createServer } from "node:http";
import { readFile, rm, mkdir } from "node:fs/promises";
import { createRequire } from "node:module";
import { extname, join, normalize, resolve } from "node:path";
import { root } from "./read-seed.mjs";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const sharp = require("sharp");

const port = Number(process.env.EXPORT_PORT ?? 4194);
const publicRoot = join(root, "public");
const outputRoot = resolve(root, "exports", "artist-cards-jpg");
const chromePath = process.env.CHROME_PATH ?? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml"
};

function resolveRequestPath(url) {
  const parsed = new URL(url, `http://127.0.0.1:${port}`);
  if (parsed.pathname === "/data/seed.json") return join(root, "data", "seed.json");
  const requested = parsed.pathname === "/" ? "/index.html" : parsed.pathname;
  return normalize(join(publicRoot, requested));
}

function createStaticServer() {
  const server = createServer(async (request, response) => {
    try {
      const filePath = resolveRequestPath(request.url ?? "/");
      const bytes = await readFile(filePath);
      response.writeHead(200, {
        "Content-Type": mimeTypes[extname(filePath)] ?? "application/octet-stream"
      });
      response.end(bytes);
    } catch {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Not found");
    }
  });

  return new Promise((resolveServer) => {
    server.listen(port, "127.0.0.1", () => resolveServer(server));
  });
}

function safeFileName(name, index) {
  const cleaned = String(name)
    .replace(/^Flip\s+/i, "")
    .replace(/\s+face\s+down\.?$/i, "")
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .toLowerCase();
  return `${String(index + 1).padStart(3, "0")}-${cleaned || "artist-card"}.jpg`;
}

async function main() {
  await rm(outputRoot, { recursive: true, force: true });
  await mkdir(outputRoot, { recursive: true });

  const server = await createStaticServer();
  let browser;

  try {
    browser = await chromium.launch({
      headless: true,
      executablePath: chromePath
    });
    const page = await browser.newPage({
      viewport: { width: 1800, height: 1400 },
      deviceScaleFactor: 2
    });

    await page.goto(`http://127.0.0.1:${port}/#artist-deck`, { waitUntil: "networkidle" });
    await page.addStyleTag({
      content: `
        body { background: #0f111d !important; }
        .artist-dealt-area { grid-template-columns: repeat(auto-fill, 420px) !important; align-items: start !important; }
        .muse-table-card[data-deck-key="artist"] { width: 420px !important; }
        .muse-table-card { transition: none !important; animation: none !important; }
        .muse-deck-card-inner { transition: none !important; }
      `
    });

    for (let index = 0; index < 150; index += 1) {
      await page.click("#artist-deal-next");
    }

    await page.waitForFunction(() => document.querySelectorAll('.muse-table-card[data-deck-key="artist"]').length === 150);
    await page.waitForTimeout(400);

    const cards = await page.$$('.muse-table-card[data-deck-key="artist"]');
    for (let index = 0; index < cards.length; index += 1) {
      const card = cards[index];
      const label = (await card.getAttribute("aria-label")) ?? `Artist card ${index + 1}`;
      const fileName = safeFileName(label, index);
      const png = await card.screenshot({ type: "png", omitBackground: false });
      await sharp(png)
        .flatten({ background: "#0f111d" })
        .jpeg({ quality: 94, mozjpeg: true })
        .toFile(join(outputRoot, fileName));
    }

    console.log(`Exported ${cards.length} Artist card JPGs to ${outputRoot}`);
  } finally {
    await browser?.close();
    await new Promise((resolveClose) => server.close(resolveClose));
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
