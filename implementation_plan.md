# Full-Stack Digital Portfolio Builder & Luxury Creative Studio

This plan details the full-stack architecture combining a robust Node.js REST API backend with a luxury UI/UX frontend featuring the iDESIGN Creative Studio and an interactive Digital Portfolio Builder tool.

## User Review Required

> [!IMPORTANT]
> - Backend runs via `server/index.js` on port `8787`, proxied automatically by Vite's dev server (`/api/*`).
> - Frontend will include a dedicated **Portfolio Builder** route (`/builder`) allowing users to design, preview, and save digital portfolios to the backend with device-responsive previews and shareable links.
> - The studio site gets dynamic data integration (projects, stats, testimonials, inquiries) with offline/mock fallback resilience.

## Proposed Architecture & Changes

### 1. Backend REST API (`server/`)
We will expand `server/index.js` into a comprehensive, modular REST API with file-based JSON persistence in `server/data/`:
- **`server/data/`**:
  - `projects.json`: Curated studio projects (Graphic Design, Photography, Branding, Concepts) with high-res images, metrics, and tags.
  - `services.json`: Studio service tiers, deliverables, and base pricing.
  - `testimonials.json`: Verified client testimonials with ratings and avatars.
  - `stats.json`: Live studio stats (completed projects, happy clients, creative awards, client satisfaction).
  - `inquiries.jsonl`: Inbound client inquiries and quote requests.
  - `portfolios.json`: User-built portfolios saved from the interactive Portfolio Builder.
- **REST Endpoints (`server/index.js`)**:
  - `GET /api/health` - Service health check
  - `GET /api/stats` - Live metrics
  - `GET /api/projects` & `GET /api/projects/:id` - Filter by category or search
  - `POST /api/projects` - Add new portfolio project
  - `GET /api/services` - Studio services & pricing tiers
  - `GET /api/testimonials` & `POST /api/testimonials` - Reviews list & client review submission
  - `GET /api/inquiries` - Studio inquiry log for management
  - `POST /api/contact` - Inquiry & quote booking submission
  - `GET /api/builder` & `GET /api/builder/:id` - Fetch user-created portfolios
  - `POST /api/builder` - Save/publish user-created digital portfolio

### 2. Frontend UI/UX Redesign (`src/`)
- **Design System & Tokens (`src/tokens.ts`, `src/index.css`)**:
  - Luxury editorial color palette: Obsidian `#0d0c09`, Warm Sand `#faf8f4`, Artisanal Gold `#c8a54a`, Radiant Gold `#e4c06e`, Slate `#2a2824`, Cream `#f2ede5`.
  - Glassmorphic navigation bar, glowing accent badges, typography pairing (`DM Serif Display`, `Work Sans`, `DM Mono`).
  - Toast notification system for instant feedback.
- **Interactive Digital Portfolio Builder (`src/app/pages/PortfolioBuilder.tsx`)**:
  - **Customizer Suite**:
    - *Profile & Bio*: Name, headline, bio, avatar, specialty, social handles.
    - *Aesthetic Themes*: Obsidian Gold, Warm Editorial, Nordic Monochrome, Emerald Noir.
    - *Layout Styles*: Masonry Grid, Editorial Storyboard, Minimal Modern, Split Showcase.
    - *Project Manager*: Add, edit, remove projects with custom tags, images, and descriptions (with 1-click sample filler).
    - *Device Previewer*: Desktop, Tablet, and Mobile frames with real-time responsive rendering.
    - *Save & Share*: POST to `/api/builder`, generate share link, and export configuration JSON.
- **Studio Inquiries Manager Drawer (`src/app/components/InquiriesDrawer.tsx`)**:
  - Discreet studio owner button in header/footer to view real-time inbound inquiries from `/api/inquiries`.
- **Pages & Route Updates (`src/app/routes.ts`, `src/app/Layout.tsx`)**:
  - Add "Portfolio Builder" to navigation with high-visibility badge.
  - Connect `Home.tsx`, `GraphicDesign.tsx`, `Photography.tsx`, and `Contact.tsx` to backend API endpoints with graceful offline caching.

## Verification Plan

### Automated / Server Verification
- Start backend server on port 8787 and verify all endpoints via curl:
  - `GET /api/health`
  - `GET /api/projects`
  - `GET /api/stats`
  - `POST /api/builder` & `GET /api/builder/:id`
  - `POST /api/contact` & `GET /api/inquiries`
- Run Vite TypeScript build check: `npm run build`

### UI / Browser Verification
- Verify navigation between Home, Graphic Design, Photography, Creative Concepts, Contact, and the new **Portfolio Builder**.
- Test creating a digital portfolio in the builder, switching themes and layouts, previewing in mobile/tablet frames, and saving to backend.
- Test submitting an inquiry and inspecting it in the Inquiries Manager.
