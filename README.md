# IDesign.Studio

> **Luxury Photography, Graphic Design & Creative Concepts Studio**  
> *We Design · We Print · We Serve*

---

## 🌟 Overview

**IDesign.Studio** is a premium, full-stack digital portfolio and creative studio application engineered for high-end visual storytelling. Built with modern web architecture, it showcases editorial photography collections, identity systems, bespoke print craftsmanship, and multidisciplinary brand campaigns.

The application is configured as a fully compliant **Progressive Web App (PWA)**, allowing seamless installation to iOS, Android, macOS, and Windows devices with offline support and instant asset caching.

---

## ✨ Key Features

- **📱 Progressive Web App (PWA)**:
  - Installable across desktop and mobile with custom luxury icons.
  - Workbox caching strategy for offline visual showcase browsing.
  - Interactive PWA installation banner and offline readiness status.
- **🎨 Editorial UI/UX Aesthetics**:
  - Curated luxury color palette: Obsidian (`#0d0c09`), Warm Sand (`#faf8f4`), Artisanal Gold (`#c8a54a`), and Slate.
  - Fluid micro-interactions and smooth scroll animations powered by Framer Motion.
  - Typographic pairing: *DM Serif Display*, *Work Sans*, and *DM Mono*.
- **📸 Curated Showcase Portfolios**:
  - **Graphic Design**: Identity suites, brand guidelines, packaging, editorial layout.
  - **Photography**: Editorial portraits, high-fashion campaigns, fine art landscapes, architectural imagery.
  - **Creative Concepts**: Experimental typography, digital art direction, spatial installations.
- **⚡ Full-Stack Node.js REST API**:
  - Live studio metrics (`/api/stats`).
  - Portfolio project filtering and search (`/api/projects`).
  - Service tiers and deliverables (`/api/services`).
  - Client review submissions (`/api/testimonials`).
  - Inbound booking and studio inquiries management (`/api/contact`, `/api/inquiries`).
- **💬 Real-Time Client Inquiries & WhatsApp Integration**:
  - Direct WhatsApp floating action button.
  - Discreet studio owner inquiry log drawer for incoming customer briefs.

---

## 🛠️ Technology Stack

- **Frontend**: [React 19](https://react.dev/), [Vite](https://vitejs.dev/), [Tailwind CSS v4](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Routing**: [React Router](https://reactrouter.com/)
- **PWA Engine**: [vite-plugin-pwa](https://vite-pwa-org.netlify.app/), Workbox
- **Backend API**: Node.js HTTP Server (`server/index.js`) with file-backed JSON persistence
- **Package Manager**: [pnpm](https://pnpm.io/) (`pnpm@12.4.2`)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- pnpm (`corepack enable pnpm` or `npm install -g pnpm`)

### Installation
Clone the repository and install dependencies using `pnpm`:

```bash
pnpm install
```

### Running Locally

To start the Vite development frontend server:
```bash
pnpm dev
```

To start both the Node.js REST backend and the Vite frontend:
```bash
# Terminal 1: Backend Server (Port 8787)
pnpm dev:backend

# Terminal 2: Frontend Dev Server (Port 8443 / default)
pnpm dev:frontend
```

---

## 📦 Available Scripts

| Command | Description |
| :--- | :--- |
| `pnpm dev` | Starts Vite dev server with Hot Module Replacement (HMR) |
| `pnpm build` | Compiles TypeScript, bundles assets, and builds PWA service worker |
| `pnpm preview` | Serves the production build locally for verification |
| `pnpm dev:backend` | Starts the local Node.js API backend server on port 8787 |
| `pnpm start` | Production backend server launcher |
| `pnpm format` | Formats code with oxfmt |

---

## 📂 Project Structure

```
├── .figma/                 # Figma Make site configuration
├── public/                 # PWA icons, manifest.webmanifest, favicons
│   ├── icon-192.png
│   ├── icon-512.png
│   ├── apple-touch-icon.png
│   ├── favicon.png
│   └── manifest.webmanifest
├── server/                 # REST API backend
│   ├── index.js            # Node HTTP server and route handlers
│   └── data/               # Persistent JSON datasets (projects, stats, etc.)
├── src/                    # Frontend source code
│   ├── app/
│   │   ├── components/     # Reusable components (PWAInstallPrompt, InquiriesDrawer, etc.)
│   │   ├── pages/          # Pages (Home, GraphicDesign, Photography, Contact, etc.)
│   │   ├── Layout.tsx      # Global sticky nav, footer, and shell
│   │   ├── routes.ts       # React Router route registry
│   │   └── api.ts          # API client with offline fallbacks
│   ├── imports/            # Studio asset brand marks and logos
│   ├── main.tsx            # React root & PWA service worker registration
│   ├── index.css           # Tailwind CSS v4 entrypoint & fonts
│   └── tokens.ts           # Luxury color and design tokens
├── package.json            # Pinned packageManager and scripts
└── vite.config.ts          # Vite configuration with Tailwind v4 & VitePWA
```

---

## 📬 Contact & Studio Inquiries

- **Email**: [idesign6048@gmail.com](mailto:idesign6048@gmail.com)
- **WhatsApp**: [+233 50 233 0663](https://wa.me/233502330663)
- **Location**: Accra, Ghana

---

© 2026 **IDesign.Studio**. All rights reserved.
