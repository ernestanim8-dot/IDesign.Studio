# iDESIGN Studio — Project Audit & Go-Live Checklist

## ✅ What's Fixed (This Session)

- **TypeScript error** `Cannot find namespace 'JSX'` in `Layout.tsx` → resolved by importing `React` and using `React.ReactNode`
- **Social icons** — text links replaced with SVG icons (Instagram, Facebook, TikTok, YouTube) with real URLs and hover animations
- **Facebook link** — wired to official studio Facebook share profile
- **Custom 404 page** — created `NotFound.tsx` with gold typography and router catch-all
- **Per-route document.title** — added page titles across Home, Photography, Graphic Design, Creative Concepts, and Contact
- **Open Graph banner** — generated high-res 1200x630 banner with official logo and rich gold cartouche framing
- **UX improvements** — scroll-to-top button, mobile navigation active indicators, image skeleton preloading shimmer

---

## 🐛 Current Code Issues Found

| # | File | Issue | Severity |
| - | ---- | ----- | -------- |
| 1 | `Layout.tsx` | `JSX.Element` → `React.ReactNode` | ✅ Fixed |
| 2 | `Home.tsx` | Testimonials use **fake Unsplash avatar photos** of strangers | ⚠️ Content |
| 3 | `Home.tsx` | Stats (340+ projects, 80+ clients, 5+ years) are **hardcoded placeholders** | ⚠️ Content |
| 4 | `Home.tsx` | TESTIMONIALS array has **fabricated client names & companies** | ⚠️ Content |
| 5 | `GraphicDesign.tsx` | ALL portfolio images are **stock Unsplash photos**, not real work | 🔴 Critical |
| 6 | `Photography.tsx` | ALL gallery images are **stock Unsplash photos**, not real work | 🔴 Critical |
| 7 | `CreativeConcepts.tsx` | Projects use **stock images** and fabricated client names | 🔴 Critical |
| 8 | `Layout.tsx` | Facebook link | ✅ Fixed |
| 9 | `server/index.js` | `/api/stats` returns hardcoded data — no real DB behind it | ⚠️ Backend |

---

## 🔴 Must-Do Before Going Live

### 1. Replace All Portfolio Images with Your Real Work

> This is the single most important task. The site currently shows random stock photos.

**Files to update:**

- [`GraphicDesign.tsx`](file:///c:/Users/ernes/Desktop/Digital%20Portfolio%20Builder/src/app/pages/GraphicDesign.tsx) — 8 projects, all stock images
- [`Photography.tsx`](file:///c:/Users/ernes/Desktop/Digital%20Portfolio%20Builder/src/app/pages/Photography.tsx) — 10+ photos, all stock images
- [`CreativeConcepts.tsx`](file:///c:/Users/ernes/Desktop/Digital%20Portfolio%20Builder/src/app/pages/CreativeConcepts.tsx) — projects + hero, all stock images
- [`Home.tsx`](file:///c:/Users/ernes/Desktop/Digital%20Portfolio%20Builder/src/app/pages/Home.tsx) — service cards use stock photos

**What you need to provide:**

- Upload your real design/photo files (JPEG/PNG/WebP, ideally 1200×800px+)
- Either host them on Cloudinary/Vercel Blob/Google Drive public links, or drop them in `src/imports/` and import them

---

### 2. Replace Placeholder Content

| Item | Location | What to provide |
| ---- | -------- | --------------- |
| Real testimonials | `Home.tsx` lines 40–65 | Actual client quotes, names, roles |
| Real stats | `Home.tsx` lines 33–38 | Your accurate numbers (years, projects, clients) |
| Client names | All pages | Replace "Meridian Group", "Nova Magazine" etc. with real or anonymised names |
| Hero tagline | `Home.tsx` | Confirm "Full-service creative studio — design, print, photography" is what you want |
| Footer copyright year | `Layout.tsx` | Currently "© 2026 iDESIGN Photography" — confirm year and legal name |

---

### 3. Contact Form Email Delivery

> The contact form currently sends to WhatsApp only. The "Send via Email" path calls `/api/contact` which stores inquiries in the DB but does **not** send an email to you.

**What you need to decide:**

- Do you want email notifications when someone submits the form? (Requires an email service like Resend, SendGrid, or Nodemailer)
- Or is WhatsApp-only fine?

---

### 4. Domain & Custom URL

- Currently live at `idesign-studio-inky.vercel.app`
- For a professional launch you should use a custom domain like `idesign.studio` or `idesigngh.com`
- Vercel makes this easy — just buy the domain and add it in the Vercel dashboard

---

## 🟡 UI/UX Improvements Implemented

These are improvements within the existing code that elevate the experience:

| # | Improvement | Impact | Status |
| - | ----------- | ------ | ------ |
| A | **Scroll-to-top button** — appears after scrolling 400px | Medium | ✅ Done |
| B | **Active page indicator** in mobile menu | Medium | ✅ Done |
| C | **Image lazy-loading skeleton** — shimmer while photos load | High | ✅ Done |
| D | **Footer social icons** — clean spacing & hover effects | Low | ✅ Done |
| E | **Top bar** — hide on mobile to avoid crowding | Medium | ✅ Done |
| F | **404 page** — luxury custom not-found page | Medium | ✅ Done |
| G | **Page `<title>` tags per route** | High (SEO) | ✅ Done |
| H | **Open Graph banner** — 1200×630 banner with official logo | Medium (SEO) | ✅ Done |

---

## ✅ What's Already Good

- ✅ PWA setup (installable app)
- ✅ Service Worker & offline caching
- ✅ Smooth page transitions (Framer Motion)
- ✅ Lightbox gallery (click-to-zoom on all portfolio pages)
- ✅ WhatsApp floating button
- ✅ Real-time Inquiries Drawer
- ✅ Responsive mobile nav with hamburger menu
- ✅ Proper favicon.ico (ICO format, not PNG)
- ✅ SEO meta tags (title, description, OG) in `index.html`
- ✅ Social icons (Instagram, TikTok, YouTube, Facebook) with real links
- ✅ Contact form with WhatsApp + email paths
- ✅ Sticky header with blur backdrop
- ✅ TypeScript throughout
- ✅ Vercel deployment pipeline

---

## 🚀 Recommended Go-Live Order

```text
1. ➡️  Add your real portfolio images (photos + designs)
2. ➡️  Update testimonials & stats with real data
3. ➡️  Apply UI improvements (A–H completed)
4. ➡️  Decide on email notifications for contact form
5. ➡️  Buy & connect a custom domain
6. ➡️  Launch 🎉
```
