// Serves dist/ on http://localhost:4173 to look at the site before it goes
// anywhere. Build first with `node build.mjs`.

import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = path.join(path.dirname(fileURLToPath(import.meta.url)), 'dist');
const port = Number(process.env.PORT ?? 4173);

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};

async function find(address) {
  const file = path.join(dist, decodeURIComponent(address));
  if (!file.startsWith(dist)) return null;
  try {
    const info = await stat(file);
    return info.isDirectory() ? path.join(file, 'index.html') : file;
  } catch {
    return null;
  }
}

createServer(async (request, response) => {
  const address = new URL(request.url, 'http://localhost').pathname;
  let file = await find(address);
  let status = 200;
  if (!file) {
    // The Portuguese pages have their own "not found" page.
    file = path.join(dist, address.startsWith('/pt/') ? 'pt/404.html' : '404.html');
    status = 404;
  }
  try {
    const body = await readFile(file);
    response.writeHead(status, {
      'Content-Type': TYPES[path.extname(file)] ?? 'application/octet-stream',
      'Cache-Control': 'no-store',
    });
    response.end(body);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain' }).end('Not found. Run `node build.mjs` first.');
  }
}).listen(port, () => console.log(`http://localhost:${port}`));
