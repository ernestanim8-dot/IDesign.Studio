import { handleRequest } from "../server/index.js";

export default async function handler(req, res) {
  try {
    await handleRequest(req, res);
  } catch (err) {
    if (!res.headersSent) {
      res.writeHead(500, { "Content-Type": "application/json; charset=utf-8" });
    }
    res.end(JSON.stringify({ ok: false, errors: [err?.message || "Internal server error"] }));
  }
}
