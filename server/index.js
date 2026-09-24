import { createServer } from "node:http";
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const dataDir = process.env.VERCEL ? path.join(os.tmpdir(), "idesign-data") : path.join(__dirname, "data");
const seedDataDir = path.join(__dirname, "data");

const inquiriesFile = path.join(dataDir, "inquiries.jsonl");
const projectsFile = process.env.VERCEL
  ? path.join(dataDir, "projects.json")
  : path.join(seedDataDir, "projects.json");
const seedProjectsFile = path.join(seedDataDir, "projects.json");
const servicesFile = path.join(seedDataDir, "services.json");
const testimonialsFile = process.env.VERCEL
  ? path.join(dataDir, "testimonials.json")
  : path.join(seedDataDir, "testimonials.json");
const seedTestimonialsFile = path.join(seedDataDir, "testimonials.json");
const statsFile = path.join(seedDataDir, "stats.json");
const portfoliosFile = path.join(dataDir, "portfolios.json");

const port = Number(process.env.API_PORT || process.env.PORT || 8787);
const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/$/, "");
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const hasSupabase = Boolean(supabaseUrl && supabaseServiceRoleKey);

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webmanifest": "application/manifest+json",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
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

function isAuthorizedAdminRequest(req) {
  const adminToken = process.env.ADMIN_TOKEN;
  if (!adminToken) return true;

  const authHeader = req.headers.authorization || "";
  const bearerToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : "";
  const headerToken = req.headers["x-admin-token"] || "";

  return bearerToken === adminToken || headerToken === adminToken;
}

async function readJsonFile(filePath, fallback = []) {
  try {
    const content = await readFile(filePath, "utf8");
    return JSON.parse(content);
  } catch {
    return fallback;
  }
}

async function readSeededJsonFile(filePath, seedFilePath, fallback = []) {
  const current = await readJsonFile(filePath, null);
  if (current !== null) return current;
  return readJsonFile(seedFilePath, fallback);
}

async function writeJsonFile(filePath, data) {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
}

async function readRequestBody(req) {
  if (req.body) {
    if (typeof req.body === "object") return req.body;
    if (typeof req.body === "string") {
      try {
        return JSON.parse(req.body);
      } catch {
        return {};
      }
    }
  }
  const chunks = [];
  try {
    for await (const chunk of req) {
      chunks.push(chunk);
      if (Buffer.concat(chunks).length > 1024 * 512) {
        throw new Error("Request body too large. Maximum size is 512KB.");
      }
    }
  } catch (err) {
    if (chunks.length === 0) return {};
    throw err;
  }
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

function cleanString(val, fallback = "") {
  return typeof val === "string" ? val.trim().slice(0, 5000) : fallback;
}

function toSupabaseInquiry(inquiry) {
  return {
    id: inquiry.id,
    created_at: inquiry.createdAt,
    full_name: inquiry.fullName,
    email: inquiry.email,
    phone: inquiry.phone,
    interest: inquiry.interest,
    timeline: inquiry.timeline,
    budget: inquiry.budget,
    message: inquiry.message,
    status: inquiry.status,
  };
}

function fromSupabaseInquiry(row) {
  return {
    id: row.id,
    createdAt: row.created_at,
    fullName: row.full_name,
    email: row.email,
    phone: row.phone || "",
    interest: row.interest,
    timeline: row.timeline,
    budget: row.budget || "",
    message: row.message,
    status: row.status,
  };
}

async function supabaseRequest(pathname, options = {}) {
  if (!hasSupabase) {
    throw new Error("Supabase is not configured.");
  }

  const res = await fetch(`${supabaseUrl}/rest/v1/${pathname}`, {
    ...options,
    headers: {
      apikey: supabaseServiceRoleKey,
      Authorization: `Bearer ${supabaseServiceRoleKey}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || `Supabase request failed with ${res.status}`);
  }

  const text = await res.text();
  if (!text.trim()) return null;

  try {
    return JSON.parse(text);
  } catch {
    throw new Error("Supabase returned an invalid JSON response.");
  }
}

async function saveInquiry(inquiry) {
  if (hasSupabase) {
    try {
      const createdRows = await supabaseRequest("inquiries", {
        method: "POST",
        headers: { Prefer: "return=representation" },
        body: JSON.stringify(toSupabaseInquiry(inquiry)),
      });
      const created = Array.isArray(createdRows) ? createdRows[0] : null;
      if (created) return fromSupabaseInquiry(created);
    } catch (supabaseErr) {
      console.warn("Supabase save failed, falling back to storage:", supabaseErr?.message || supabaseErr);
    }
  }

  try {
    await mkdir(dataDir, { recursive: true });
    await writeFile(inquiriesFile, `${JSON.stringify(inquiry)}\n`, { flag: "a" });
  } catch (fsErr) {
    console.warn("Local storage write failed:", fsErr?.message || fsErr);
  }
  return inquiry;
}

async function listInquiries() {
  if (hasSupabase) {
    const rows = await supabaseRequest("inquiries?select=*&order=created_at.desc");
    return rows.map(fromSupabaseInquiry);
  }

  const exists = await stat(inquiriesFile).catch(() => null);
  if (!exists) return [];

  const content = await readFile(inquiriesFile, "utf8");
  const lines = content
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  return lines
    .map((line) => {
      try {
        return JSON.parse(line);
      } catch {
        return null;
      }
    })
    .filter(Boolean)
    .reverse();
}

async function updateInquiryStatus(id, status) {
  const allowedStatuses = new Set(["New", "Contacted", "Qualified", "Booked", "Closed"]);
  if (!allowedStatuses.has(status)) throw new Error("Invalid inquiry status.");

  if (hasSupabase) {
    const rows = await supabaseRequest(`inquiries?id=eq.${encodeURIComponent(id)}`, {
      method: "PATCH",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify({ status }),
    });
    const updated = Array.isArray(rows) ? rows[0] : null;
    return updated ? fromSupabaseInquiry(updated) : null;
  }

  const inquiries = await listInquiries();
  const index = inquiries.findIndex((inquiry) => inquiry.id === id);
  if (index === -1) return null;
  inquiries[index] = { ...inquiries[index], status };
  await mkdir(dataDir, { recursive: true });
  await writeFile(inquiriesFile, `${inquiries.slice().reverse().map((inquiry) => JSON.stringify(inquiry)).join("\n")}\n`, "utf8");
  return inquiries[index];
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
    const message = cleanString(body.message, "General inquiry — no specific details provided.");

    const errors = [];
    if (!fullName) errors.push("Full name is required.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("A valid email address is required.");

    if (errors.length > 0) {
      sendJson(res, 400, { ok: false, errors });
      return;
    }

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

    const inquiry = await saveInquiry(newInquiry);

    // Automated email notifications via Resend API (fires in parallel — does not block response)
    if (process.env.RESEND_API_KEY) {
      const fromAddress = process.env.RESEND_FROM_EMAIL || "iDESIGN Studio <onboarding@resend.dev>";
      const notifyAddress = process.env.NOTIFICATION_EMAIL || "idesign6048@gmail.com";
      const receivedDate = new Date(inquiry.createdAt).toLocaleString("en-US", {
        weekday: "long", year: "numeric", month: "long", day: "numeric",
        hour: "2-digit", minute: "2-digit", timeZoneName: "short",
      });

      const studioNotificationHtml = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
<body style="margin:0;padding:0;background:#f4f1eb;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f1eb;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        <!-- Header -->
        <tr>
          <td style="background:#1a1814;padding:28px 40px;text-align:center;">
            <p style="margin:0;font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:#c8a54a;font-family:'Courier New',monospace;">iDESIGN Studio</p>
            <h1 style="margin:8px 0 4px;font-size:22px;font-weight:700;color:#ffffff;letter-spacing:-0.02em;">New Client Inquiry</h1>
            <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.45);">${receivedDate}</p>
          </td>
        </tr>
        <!-- Gold accent bar -->
        <tr><td style="height:3px;background:linear-gradient(to right,#c8a54a,#e8c97a,#c8a54a);"></td></tr>

        <!-- Alert badge -->
        <tr>
          <td style="padding:24px 40px 0;">
            <div style="display:inline-block;background:#fef9ec;border:1px solid #c8a54a;border-radius:4px;padding:6px 14px;">
              <span style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#c8a54a;font-family:'Courier New',monospace;">&#10022; New Inquiry — Reply Required</span>
            </div>
          </td>
        </tr>

        <!-- Client Details -->
        <tr>
          <td style="padding:20px 40px 0;">
            <h2 style="margin:0 0 16px;font-size:18px;color:#1a1814;border-bottom:1px solid #ede8df;padding-bottom:10px;">Client Information</h2>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td width="160" style="padding:8px 0;font-size:12px;color:#8a8070;font-family:'Courier New',monospace;text-transform:uppercase;letter-spacing:0.1em;">Full Name</td>
                <td style="padding:8px 0;font-size:14px;color:#1a1814;font-weight:600;">${inquiry.fullName}</td>
              </tr>
              <tr style="background:#fafaf8;">
                <td width="160" style="padding:8px 0;font-size:12px;color:#8a8070;font-family:'Courier New',monospace;text-transform:uppercase;letter-spacing:0.1em;">Email</td>
                <td style="padding:8px 0;font-size:14px;"><a href="mailto:${inquiry.email}" style="color:#c8a54a;text-decoration:none;">${inquiry.email}</a></td>
              </tr>
              <tr>
                <td width="160" style="padding:8px 0;font-size:12px;color:#8a8070;font-family:'Courier New',monospace;text-transform:uppercase;letter-spacing:0.1em;">Phone / WhatsApp</td>
                <td style="padding:8px 0;font-size:14px;color:#1a1814;">${inquiry.phone || "<em style='color:#aaa;'>Not provided</em>"}</td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Project Details -->
        <tr>
          <td style="padding:20px 40px 0;">
            <h2 style="margin:0 0 16px;font-size:18px;color:#1a1814;border-bottom:1px solid #ede8df;padding-bottom:10px;">Project Brief</h2>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td width="160" style="padding:8px 0;font-size:12px;color:#8a8070;font-family:'Courier New',monospace;text-transform:uppercase;letter-spacing:0.1em;">Service</td>
                <td style="padding:8px 0;font-size:14px;color:#1a1814;font-weight:600;">${inquiry.interest}</td>
              </tr>
              <tr style="background:#fafaf8;">
                <td width="160" style="padding:8px 0;font-size:12px;color:#8a8070;font-family:'Courier New',monospace;text-transform:uppercase;letter-spacing:0.1em;">Timeline</td>
                <td style="padding:8px 0;font-size:14px;color:#1a1814;">${inquiry.timeline}</td>
              </tr>
              <tr>
                <td width="160" style="padding:8px 0;font-size:12px;color:#8a8070;font-family:'Courier New',monospace;text-transform:uppercase;letter-spacing:0.1em;">Budget</td>
                <td style="padding:8px 0;font-size:14px;color:#1a1814;">${inquiry.budget || "Flexible"}</td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Message -->
        <tr>
          <td style="padding:20px 40px 0;">
            <h2 style="margin:0 0 12px;font-size:18px;color:#1a1814;border-bottom:1px solid #ede8df;padding-bottom:10px;">Message</h2>
            <div style="background:#f7f5f0;border-left:3px solid #c8a54a;padding:16px 18px;border-radius:0 4px 4px 0;">
              <p style="margin:0;font-size:14px;line-height:1.75;color:#3a3530;white-space:pre-wrap;">${inquiry.message}</p>
            </div>
          </td>
        </tr>

        <!-- Quick Reply CTA -->
        <tr>
          <td style="padding:28px 40px;">
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td style="background:#c8a54a;border-radius:4px;">
                  <a href="mailto:${inquiry.email}?subject=Re: Your iDESIGN Studio Inquiry&body=Hi ${encodeURIComponent(inquiry.fullName)},%0A%0AThank you for reaching out to iDESIGN Studio!" style="display:inline-block;padding:13px 28px;font-size:13px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#ffffff;text-decoration:none;">Reply to ${inquiry.fullName} &rarr;</a>
                </td>
                ${inquiry.phone ? `<td width="12"></td><td style="border:1px solid #c8a54a;border-radius:4px;"><a href="https://wa.me/${inquiry.phone.replace(/[^0-9]/g, "")}" style="display:inline-block;padding:13px 24px;font-size:13px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:#c8a54a;text-decoration:none;">WhatsApp &rarr;</a></td>` : ""}
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f7f5f0;padding:20px 40px;border-top:1px solid #ede8df;">
            <p style="margin:0;font-size:11px;color:#aaa;font-family:'Courier New',monospace;letter-spacing:0.08em;">
              Inquiry ID: ${inquiry.id} &nbsp;&bull;&nbsp; iDESIGN Studio Notification System &nbsp;&bull;&nbsp; This email was generated automatically.
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

      const clientConfirmationHtml = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
<body style="margin:0;padding:0;background:#f4f1eb;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f1eb;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        <!-- Header -->
        <tr>
          <td style="background:#1a1814;padding:36px 40px;text-align:center;">
            <p style="margin:0 0 6px;font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:#c8a54a;font-family:'Courier New',monospace;">iDESIGN Studio</p>
            <h1 style="margin:0;font-size:28px;font-weight:700;color:#ffffff;letter-spacing:-0.02em;">We received your inquiry</h1>
          </td>
        </tr>
        <tr><td style="height:3px;background:linear-gradient(to right,#c8a54a,#e8c97a,#c8a54a);"></td></tr>

        <!-- Body -->
        <tr>
          <td style="padding:36px 40px 0;">
            <p style="margin:0 0 16px;font-size:16px;color:#1a1814;font-weight:600;">Hi ${inquiry.fullName},</p>
            <p style="margin:0 0 16px;font-size:14px;line-height:1.75;color:#5a5248;">Thank you for reaching out to <strong>iDESIGN Studio</strong>. We've received your project inquiry and our team will review your brief carefully.</p>
            <p style="margin:0 0 28px;font-size:14px;line-height:1.75;color:#5a5248;">You can expect a personal response from us within <strong>1–2 business days</strong>. If your project is time-sensitive, feel free to reach out on WhatsApp for a faster reply.</p>

            <!-- Summary box -->
            <div style="background:#f7f5f0;border:1px solid #ede8df;border-radius:6px;padding:20px 24px;margin-bottom:24px;">
              <p style="margin:0 0 12px;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#c8a54a;font-family:'Courier New',monospace;">Your Inquiry Summary</p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:6px 0;font-size:12px;color:#8a8070;font-family:'Courier New',monospace;width:130px;text-transform:uppercase;letter-spacing:0.1em;">Service</td>
                  <td style="padding:6px 0;font-size:13px;color:#1a1814;font-weight:600;">${inquiry.interest}</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;font-size:12px;color:#8a8070;font-family:'Courier New',monospace;width:130px;text-transform:uppercase;letter-spacing:0.1em;">Timeline</td>
                  <td style="padding:6px 0;font-size:13px;color:#1a1814;">${inquiry.timeline}</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;font-size:12px;color:#8a8070;font-family:'Courier New',monospace;width:130px;text-transform:uppercase;letter-spacing:0.1em;">Budget</td>
                  <td style="padding:6px 0;font-size:13px;color:#1a1814;">${inquiry.budget || "Flexible"}</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;font-size:12px;color:#8a8070;font-family:'Courier New',monospace;width:130px;text-transform:uppercase;letter-spacing:0.1em;">Reference ID</td>
                  <td style="padding:6px 0;font-size:12px;color:#aaa;font-family:'Courier New',monospace;">${inquiry.id}</td>
                </tr>
              </table>
            </div>

            <!-- WhatsApp CTA -->
            <table cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
              <tr>
                <td style="background:#22c55e;border-radius:4px;">
                  <a href="https://wa.me/233502330663?text=${encodeURIComponent(`Hi iDESIGN! I submitted an inquiry (${inquiry.id}) and wanted to follow up.`)}" style="display:inline-block;padding:13px 24px;font-size:13px;font-weight:700;letter-spacing:0.04em;color:#ffffff;text-decoration:none;">Chat on WhatsApp &#128172;</a>
                </td>
              </tr>
            </table>

            <p style="margin:0 0 6px;font-size:13px;color:#8a8070;line-height:1.7;">Looking forward to creating something exceptional with you,</p>
            <p style="margin:0;font-size:15px;font-weight:700;color:#1a1814;">The iDESIGN Studio Team</p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:24px 40px 28px;">
            <hr style="border:0;border-top:1px solid #ede8df;margin:0 0 20px;" />
            <p style="margin:0;font-size:11px;color:#bbb;line-height:1.6;font-family:'Courier New',monospace;letter-spacing:0.05em;">
              iDESIGN Studio &nbsp;&bull;&nbsp; Visual Identity &amp; Photography &nbsp;&bull;&nbsp; Ghana<br />
              You are receiving this because you submitted an inquiry via our website. If this was a mistake, please disregard this email.
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

      // Fire both emails in parallel; failures are non-fatal
      Promise.allSettled([
        fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: fromAddress,
            to: [notifyAddress],
            reply_to: inquiry.email,
            subject: `✦ New Inquiry [${inquiry.id}]: ${inquiry.fullName} — ${inquiry.interest}`,
            html: studioNotificationHtml,
          }),
        }),
        fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: fromAddress,
            to: [inquiry.email],
            reply_to: notifyAddress,
            subject: `We received your inquiry — iDESIGN Studio`,
            html: clientConfirmationHtml,
          }),
        }),
      ]).then((results) => {
        results.forEach((r, i) => {
          if (r.status === "rejected") {
            console.warn(`Email dispatch ${i === 0 ? "studio notification" : "client confirmation"} failed:`, r.reason?.message || r.reason);
          }
        });
      }).catch((mailErr) => {
        console.warn("Email dispatch failed:", mailErr?.message || mailErr);
      });
    } // end if (RESEND_API_KEY)

    sendJson(res, 201, {
      ok: true,
      message: "Inquiry received successfully. We will get back to you shortly.",
      inquiry,
    });
  } catch (err) {
    sendJson(res, 500, { ok: false, errors: [err.message || "Failed to process inquiry."] });
  }
}

// Handler: Get Inquiries (for studio manager drawer)
async function handleGetInquiries(req, res) {
  try {
    const inquiries = await listInquiries();
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
  const projects = await readSeededJsonFile(projectsFile, seedProjectsFile, []);
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
    const projects = await readSeededJsonFile(projectsFile, seedProjectsFile, []);

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
export async function handleRequest(req, res) {
  if (req.method === "OPTIONS") {
    sendJson(res, 204, {});
    return;
  }

  const requestUrl = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
  const pathname = requestUrl.pathname;
  const matchApi = (route) => pathname === route || pathname === route.replace(/^\/api/, "");

  // Health
  if (matchApi("/api/health") && req.method === "GET") {
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
  if (matchApi("/api/stats") && req.method === "GET") {
    const stats = await readJsonFile(statsFile, {
      projectsCompleted: 180,
      clientSatisfaction: "99%",
      awardsWon: 12,
    });
    sendJson(res, 200, { ok: true, stats });
    return;
  }

  // Services
  if (matchApi("/api/services") && req.method === "GET") {
    const services = await readJsonFile(servicesFile, []);
    sendJson(res, 200, { ok: true, services });
    return;
  }

  // Testimonials
  if (matchApi("/api/testimonials") && req.method === "GET") {
    const testimonials = await readSeededJsonFile(testimonialsFile, seedTestimonialsFile, []);
    sendJson(res, 200, { ok: true, testimonials });
    return;
  }

  if (matchApi("/api/testimonials") && req.method === "POST") {
    try {
      const body = await readRequestBody(req);
      const testimonials = await readSeededJsonFile(testimonialsFile, seedTestimonialsFile, []);
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
  if (matchApi("/api/projects") && req.method === "GET") {
    await handleProjectsGet(req, res, requestUrl.searchParams);
    return;
  }

  if ((pathname.startsWith("/api/projects/") || (pathname.startsWith("/projects/") && !pathname.includes("."))) && req.method === "GET") {
    const id = pathname.replace(/^\/api\/projects\//, "").replace(/^\/projects\//, "");
    const projects = await readSeededJsonFile(projectsFile, seedProjectsFile, []);
    const found = projects.find((p) => p.id === id);
    if (!found) {
      sendJson(res, 404, { ok: false, error: "Project not found" });
      return;
    }
    sendJson(res, 200, { ok: true, project: found });
    return;
  }

  if (matchApi("/api/projects") && req.method === "POST") {
    await handleProjectCreate(req, res);
    return;
  }

  // Inquiries / Contact
  if (matchApi("/api/contact") && req.method === "POST") {
    await handleContact(req, res);
    return;
  }

  if (matchApi("/api/inquiries") && req.method === "GET") {
    if (!isAuthorizedAdminRequest(req)) {
      sendJson(res, 401, { ok: false, errors: ["Admin token is required."] });
      return;
    }
    await handleGetInquiries(req, res);
    return;
  }

  if ((pathname.startsWith("/api/inquiries/") || pathname.startsWith("/inquiries/")) && req.method === "PATCH") {
    if (!isAuthorizedAdminRequest(req)) {
      sendJson(res, 401, { ok: false, errors: ["Admin token is required."] });
      return;
    }
    try {
      const id = pathname.replace(/^\/api\/inquiries\//, "").replace(/^\/inquiries\//, "");
      const body = await readRequestBody(req);
      const inquiry = await updateInquiryStatus(id, cleanString(body.status));
      if (!inquiry) {
        sendJson(res, 404, { ok: false, errors: ["Inquiry not found."] });
        return;
      }
      sendJson(res, 200, { ok: true, inquiry });
    } catch (err) {
      sendJson(res, 400, { ok: false, errors: [err.message || "Failed to update inquiry."] });
    }
    return;
  }

  // Digital Portfolio Builder
  if (matchApi("/api/builder") && req.method === "GET") {
    await handleBuilderGet(req, res);
    return;
  }

  if ((pathname.startsWith("/api/builder/") || (pathname.startsWith("/builder/") && !pathname.includes("."))) && req.method === "GET") {
    const id = pathname.replace(/^\/api\/builder\//, "").replace(/^\/builder\//, "");
    await handleBuilderGet(req, res, id);
    return;
  }

  if (matchApi("/api/builder") && req.method === "POST") {
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
}

const server = createServer(handleRequest);

if (!process.env.VERCEL) {
  server.listen(port, () => {
    console.log(`Backend running at http://localhost:${port}`);
  });
}
