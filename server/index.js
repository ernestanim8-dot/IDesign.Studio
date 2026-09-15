import { createServer } from "node:http";
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const dataDir = path.join(__dirname, "data");
const inquiriesFile = path.join(dataDir, "inquiries.jsonl");

const port = Number(process.env.API_PORT || process.env.PORT || 8787);

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
};

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": process.env.CORS_ORIGIN || "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end(JSON.stringify(payload));
}

async function readRequestBody(req) {
  const chunks = [];

  for await (const chunk of req) {
    chunks.push(chunk);

    if (Buffer.concat(chunks).length > 1024 * 64) {
      throw new Error("Request body is too large.");
    }
  }

  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

function cleanString(value, fallback = "") {
  return typeof value === "string" ? value.trim().slice(0, 2000) : fallback;
}

function validateInquiry(body) {
  const inquiry = {
    fullName: cleanString(body.fullName),
    email: cleanString(body.email).toLowerCase(),
    phone: cleanString(body.phone),
    interest: cleanString(body.interest, "General Inquiry"),
    timeline: cleanString(body.timeline, "Flexible"),
    message: cleanString(body.message),
  };

  const errors = [];

  if (!inquiry.fullName) errors.push("Full name is required.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiry.email)) errors.push("A valid email address is required.");
  if (!inquiry.message) errors.push("Project details are required.");

  return { inquiry, errors };
}

async function handleContact(req, res) {
  try {
    const body = await readRequestBody(req);
    const { inquiry, errors } = validateInquiry(body);

    if (errors.length > 0) {
      sendJson(res, 400, { ok: false, errors });
      return;
    }

    await mkdir(dataDir, { recursive: true });

    const savedInquiry = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      ...inquiry,
    };

    await writeFile(inquiriesFile, `${JSON.stringify(savedInquiry)}\n`, { flag: "a" });

    sendJson(res, 201, {
      ok: true,
      message: "Inquiry received.",
      inquiryId: savedInquiry.id,
    });
  } catch (error) {
    sendJson(res, 500, {
      ok: false,
      errors: [error instanceof Error ? error.message : "Unable to save inquiry."],
    });
  }
}

async function serveStatic(req, res) {
  const requestUrl = new URL(req.url || "/", `http://${req.headers.host}`);
  const pathname = decodeURIComponent(requestUrl.pathname);
  const requestedPath = path.normalize(path.join(distDir, pathname));
  const isInsideDist = requestedPath.startsWith(distDir);
  const fallbackPath = path.join(distDir, "index.html");

  let filePath = isInsideDist ? requestedPath : fallbackPath;

  try {
    const fileStats = await stat(filePath);
    if (fileStats.isDirectory()) {
      filePath = path.join(filePath, "index.html");
    }
  } catch {
    filePath = fallbackPath;
  }

  try {
    const file = await readFile(filePath);
    const ext = path.extname(filePath);
    res.writeHead(200, { "Content-Type": contentTypes[ext] || "application/octet-stream" });
    res.end(file);
  } catch {
    sendJson(res, 404, { ok: false, errors: ["Frontend build not found. Run npm run build first."] });
  }
}

const server = createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    sendJson(res, 204, {});
    return;
  }

  const requestUrl = new URL(req.url || "/", `http://${req.headers.host}`);

  if (requestUrl.pathname === "/api/health" && req.method === "GET") {
    sendJson(res, 200, { ok: true, service: "idesign-api", timestamp: new Date().toISOString() });
    return;
  }

  if (requestUrl.pathname === "/api/contact" && req.method === "POST") {
    await handleContact(req, res);
    return;
  }

  if (requestUrl.pathname.startsWith("/api/")) {
    sendJson(res, 404, { ok: false, errors: ["API route not found."] });
    return;
  }

  await serveStatic(req, res);
});

server.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
