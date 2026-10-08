import { createReadStream } from "node:fs";
import { createServer } from "node:http";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { buildDashboardView } from "./view.mjs";

const PUBLIC_ROOT = join(dirname(fileURLToPath(import.meta.url)), "public");
const STATIC = new Map([
  ["/", ["index.html", "text/html; charset=utf-8"]],
  ["/index.html", ["index.html", "text/html; charset=utf-8"]],
  ["/app.js", ["app.js", "text/javascript; charset=utf-8"]],
  ["/styles.css", ["styles.css", "text/css; charset=utf-8"]],
]);

function headers(type) {
  return {
    "Content-Type": type,
    "Cache-Control": "no-store",
    "Content-Security-Policy": "default-src 'self'; script-src 'self'; style-src 'self'; connect-src 'self'; img-src 'none'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'",
    "Referrer-Policy": "no-referrer",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
  };
}

function sendJson(response, status, value, headOnly) {
  const body = JSON.stringify(value);
  response.writeHead(status, { ...headers("application/json; charset=utf-8"), "Content-Length": Buffer.byteLength(body) });
  response.end(headOnly ? undefined : body);
}

export function createDashboardServer({ viewOptions = {}, viewBuilder = buildDashboardView } = {}) {
  return createServer((request, response) => {
    const method = request.method ?? "GET";
    const headOnly = method === "HEAD";
    if (method !== "GET" && method !== "HEAD") {
      response.setHeader("Allow", "GET, HEAD");
      sendJson(response, 405, { error: { code: "READ_ONLY", message: "Dashboard is read-only." } }, false);
      return;
    }
    const url = new URL(request.url ?? "/", "http://127.0.0.1");
    if (url.pathname === "/api/view") {
      try { sendJson(response, 200, viewBuilder(viewOptions), headOnly); }
      catch { sendJson(response, 500, { error: { code: "VIEW_ERROR", message: "Unable to build the read-only view." } }, headOnly); }
      return;
    }
    const asset = STATIC.get(url.pathname);
    if (!asset) {
      response.writeHead(404, headers("text/plain; charset=utf-8"));
      response.end(headOnly ? undefined : "Not found\n");
      return;
    }
    response.writeHead(200, headers(asset[1]));
    if (headOnly) response.end();
    else createReadStream(join(PUBLIC_ROOT, asset[0])).on("error", () => response.destroy()).pipe(response);
  });
}

function valueAfter(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

export function main() {
  const requestedPort = Number(valueAfter("--port") ?? process.env.CONTENT_OS_DASHBOARD_PORT ?? 4173);
  if (!Number.isInteger(requestedPort) || requestedPort < 0 || requestedPort > 65535) throw new Error("Invalid port");
  const server = createDashboardServer({ viewOptions: { explicitInstanceRoot: valueAfter("--instance-root"), configPath: valueAfter("--config") } });
  server.listen(requestedPort, "127.0.0.1", () => {
    const address = server.address();
    process.stdout.write(`content-os dashboard: http://127.0.0.1:${address.port}\n`);
  });
  for (const signal of ["SIGINT", "SIGTERM"]) process.on(signal, () => server.close(() => process.exit(0)));
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) main();
