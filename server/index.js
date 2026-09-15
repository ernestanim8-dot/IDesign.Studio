import { createServer } from "node:http";
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const dataDir = path.join(__dirname, "data");

const inquiriesFile = path.join(dataDir, "inquiries.jsonl");
const projectsFile = path.join(dataDir, "projects.json");
const servicesFile = path.join(dataDir, "services.json");
const testimonialsFile = path.join(dataDir, "testimonials.json");
const statsFile = path.join(dataDir, "stats.json");
const portfoliosFile = path.join(dataDir, "portfolios.json");

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
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type,Authorization",
  });
  res.end(JSON.stringify(payload));
}

async function readJsonFile(filePath, fallback = []) {
  try {
    const content = await readFile(filePath, "utf8");
    return JSON.parse(content);
  } catch {
    return fallback;
  }
}

async function writeJsonFile(filePath, data) {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
}

async function readRequestBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
    if (Buffer.concat(chunks).length > 1024 * 512) {
      throw new Error("Request body too large. Maximum size is 512KB.");
    }
  }
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

function cleanString(val, fallback = "") {
  return typeof val === "string" ? val.trim().slice(0, 5000) : fallback;
}

// Handler: Inquiries / Contact
async function handleContact(req, res) {
  try {
    const body = await readRequestBody(req);
    const fullName = cleanString(body.fullName);
    const email = cleanString(body.email).toLowerCase();
    const phone = cleanString(body.phone);
    const interest = cleanString(body.interest, "General Inquiry");
    const timeline = cleanString(body.timeline, "Flexible");
    const budget = cleanString(body.budget, "Flexible");
    const message = cleanString(body.message);

    const errors = [];
    if (!fullName) errors.push("Full name is required.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("A valid email address is required.");
    if (!message) errors.push("Project details are required.");

    if (errors.length > 0) {
      sendJson(res, 400, { ok: false, errors });
      return;
    }

    await mkdir(dataDir, { recursive: true });

    const newInquiry = {
      id: "inq-" + Math.random().toString(36).slice(2, 10),
      createdAt: new Date().toISOString(),
      fullName,
      email,
      phone,
      interest,
      timeline,
      budget,
      message,
      status: "New",
    };

    await writeFile(inquiriesFile, `${JSON.stringify(newInquiry)}\n`, { flag: "a" });

    sendJson(res, 201, {
      ok: true,
      message: "Inquiry received successfully. We will get back to you shortly.",
      inquiry: newInquiry,
    });
  } catch (err) {
    sendJson(res, 500, { ok: false, errors: [err.message || "Failed to process inquiry."] });
  }
}

// Handler: Get Inquiries (for studio manager drawer)
async function handleGetInquiries(req, res) {
  try {
    const exists = await stat(inquiriesFile).catch(() => null);
    if (!exists) {
      sendJson(res, 200, { ok: true, inquiries: [] });
      return;
    }

    const content = await readFile(inquiriesFile, "utf8");
    const lines = content
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
    const inquiries = lines
      .map((line) => {
        try {
          return JSON.parse(line);
        } catch {
          return null;
        }
      })
      .filter(Boolean)
      .reverse();

    sendJson(res, 200, { ok: true, inquiries });
  } catch (err) {
    sendJson(res, 500, { ok: false, errors: [err.message] });
  }
}

// Handler: Portfolio Builder (Save, Get List, Get Single)
async function handleBuilderPost(req, res) {
  try {
    const body = await readRequestBody(req);
    const name = cleanString(body.name, "Untitled Portfolio");
    const headline = cleanString(body.headline, "Visual Creator");
    const bio = cleanString(body.bio, "");
    const avatar = cleanString(body.avatar, "");
    const theme = cleanString(body.theme, "obsidian-gold");
    const layout = cleanString(body.layout, "masonry");
    const accentColor = cleanString(body.accentColor, "#c8a54a");
    const email = cleanString(body.email, "");
    const location = cleanString(body.location, "");
    const socialLinks = typeof body.socialLinks === "object" ? body.socialLinks : {};
    const projects = Array.isArray(body.projects) ? body.projects : [];

    const portfolios = await readJsonFile(portfoliosFile, []);

    const newPortfolio = {
      id: "pf-" + Math.random().toString(36).slice(2, 9),
      createdAt: new Date().toISOString(),
      name,
      headline,
      bio,
      avatar,
      theme,
      layout,
      accentColor,
      email,
      location,
      socialLinks,
      projects,
    };

    portfolios.unshift(newPortfolio);
    await writeJsonFile(portfoliosFile, portfolios);

    sendJson(res, 201, {
      ok: true,
      message: "Digital portfolio created successfully.",
      portfolio: newPortfolio,
    });
  } catch (err) {
    sendJson(res, 500, { ok: false, errors: [err.message] });
  }
}

async function handleBuilderGet(req, res, id) {
  const portfolios = await readJsonFile(portfoliosFile, []);
  if (id) {
    const item = portfolios.find((p) => p.id === id);
    if (!item) {
      sendJson(res, 404, { ok: false, error: "Portfolio not found" });
      return;
    }
    sendJson(res, 200, { ok: true, portfolio: item });
    return;
  }
  sendJson(res, 200, { ok: true, portfolios });
}

// Handler: Projects
async function handleProjectsGet(req, res, searchParams) {
  const projects = await readJsonFile(projectsFile, []);
  const category = searchParams.get("category");
  const q = searchParams.get("q")?.toLowerCase();

  let filtered = projects;
  if (category && category !== "All") {
    filtered = filtered.filter(
      (p) => p.category.toLowerCase().replace(/\s+/g, "-") === category.toLowerCase().replace(/\s+/g, "-")
    );
  }
  if (q) {
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.tags?.some((t) => t.toLowerCase().includes(q))
    );
  }

  sendJson(res, 200, { ok: true, projects: filtered });
}

async function handleProjectCreate(req, res) {
  try {
    const body = await readRequestBody(req);
    const projects = await readJsonFile(projectsFile, []);

    const newProj = {
      id: "proj-" + (projects.length + 1),
      title: cleanString(body.title, "Untitled Project"),
      category: cleanString(body.category, "Graphic Design"),
      subcategory: cleanString(body.subcategory, "General"),
      year: cleanString(body.year, new Date().getFullYear().toString()),
      client: cleanString(body.client, "Studio Commission"),
      description: cleanString(body.description, ""),
      imageUrl: cleanString(body.imageUrl, "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200"),
      tags: Array.isArray(body.tags) ? body.tags : ["Design"],
      featured: Boolean(body.featured),
    };

    projects.push(newProj);
    await writeJsonFile(projectsFile, projects);
    sendJson(res, 201, { ok: true, project: newProj });
  } catch (err) {
    sendJson(res, 500, { ok: false, errors: [err.message] });
  }
}

// Static Fallback Server
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

// Master HTTP Server
const server = createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    sendJson(res, 204, {});
    return;
  }

  const requestUrl = new URL(req.url || "/", `http://${req.headers.host}`);
  const pathname = requestUrl.pathname;

  // Health
  if (pathname === "/api/health" && req.method === "GET") {
    sendJson(res, 200, {
      ok: true,
      service: "idesign-api",
      version: "2.0.0",
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor(process.uptime()),
    });
    return;
  }

  // Stats
  if (pathname === "/api/stats" && req.method === "GET") {
    const stats = await readJsonFile(statsFile, {
      projectsCompleted: 180,
      clientSatisfaction: "99%",
      awardsWon: 12,
    });
    sendJson(res, 200, { ok: true, stats });
    return;
  }

  // Services
  if (pathname === "/api/services" && req.method === "GET") {
    const services = await readJsonFile(servicesFile, []);
    sendJson(res, 200, { ok: true, services });
    return;
  }

  // Testimonials
  if (pathname === "/api/testimonials" && req.method === "GET") {
    const testimonials = await readJsonFile(testimonialsFile, []);
    sendJson(res, 200, { ok: true, testimonials });
    return;
  }

  if (pathname === "/api/testimonials" && req.method === "POST") {
    try {
      const body = await readRequestBody(req);
      const testimonials = await readJsonFile(testimonialsFile, []);
      const newReview = {
        id: "test-" + (testimonials.length + 1),
        name: cleanString(body.name),
        role: cleanString(body.role, "Client"),
        company: cleanString(body.company, "Verified Partner"),
        avatar: cleanString(body.avatar, "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"),
        quote: cleanString(body.quote),
        rating: Math.min(5, Math.max(1, Number(body.rating) || 5)),
        project: cleanString(body.project, "Creative Studio Engagement"),
        date: "Recently",
      };
      testimonials.unshift(newReview);
      await writeJsonFile(testimonialsFile, testimonials);
      sendJson(res, 201, { ok: true, testimonial: newReview });
      return;
    } catch (err) {
      sendJson(res, 500, { ok: false, errors: [err.message] });
      return;
    }
  }

  // Projects
  if (pathname === "/api/projects" && req.method === "GET") {
    await handleProjectsGet(req, res, requestUrl.searchParams);
    return;
  }

  if (pathname.startsWith("/api/projects/") && req.method === "GET") {
    const id = pathname.replace("/api/projects/", "");
    const projects = await readJsonFile(projectsFile, []);
    const found = projects.find((p) => p.id === id);
    if (!found) {
      sendJson(res, 404, { ok: false, error: "Project not found" });
      return;
    }
    sendJson(res, 200, { ok: true, project: found });
    return;
  }

  if (pathname === "/api/projects" && req.method === "POST") {
    await handleProjectCreate(req, res);
    return;
  }

  // Inquiries / Contact
  if (pathname === "/api/contact" && req.method === "POST") {
    await handleContact(req, res);
    return;
  }

  if (pathname === "/api/inquiries" && req.method === "GET") {
    await handleGetInquiries(req, res);
    return;
  }

  // Digital Portfolio Builder
  if (pathname === "/api/builder" && req.method === "GET") {
    await handleBuilderGet(req, res);
    return;
  }

  if (pathname.startsWith("/api/builder/") && req.method === "GET") {
    const id = pathname.replace("/api/builder/", "");
    await handleBuilderGet(req, res, id);
    return;
  }

  if (pathname === "/api/builder" && req.method === "POST") {
    await handleBuilderPost(req, res);
    return;
  }

  // API 404
  if (pathname.startsWith("/api/")) {
    sendJson(res, 404, { ok: false, errors: ["API route not found."] });
    return;
  }

  // Fallback to static dist
  await serveStatic(req, res);
});

server.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
