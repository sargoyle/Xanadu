import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { root } from "./read-seed.mjs";

const port = Number(process.env.PORT ?? 4184);
const publicRoot = join(root, "public");

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml"
};

function resolveRequestPath(url) {
  const parsed = new URL(url, `http://127.0.0.1:${port}`);
  if (parsed.pathname === "/data/seed.json") {
    return join(root, "data", "seed.json");
  }

  const requested = parsed.pathname === "/" ? "/index.html" : parsed.pathname;
  return normalize(join(publicRoot, requested));
}

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

server.listen(port, "127.0.0.1", () => {
  console.log(`Xanadu dev server running at http://127.0.0.1:${port}`);
});
