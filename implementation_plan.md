# Implementation Plan: PWA Setup, Brand Update to IDesign.Studio & Removal of Portfolio Builder

Transform the site into a Progressive Web App (PWA) with installability and offline support, apply the provided brand logo for all site and PWA icons, update the project title and branding from "Figma Make App" to "IDesign.Studio", and remove the Portfolio Builder tool and showcase section.

## User Review Required

> [!IMPORTANT]
> - The source icon `src/imports/i design logo gh.png` will be copied into `public/` as `favicon.png`, `favicon.ico`, `icon-192.png`, `icon-512.png`, and `apple-touch-icon.png`.
> - The "Portfolio Builder" navigation item (`/builder`), routes, and showcase section in `Home.tsx` will be removed as requested.
> - All occurrences of "Figma Make App" will be replaced with "IDesign.Studio".

## Proposed Changes

### 1. Brand Logo & Site Icons
Copy `C:\Users\ernes\Desktop\Digital Portfolio Builder\src\imports\i design logo gh.png` to:
- `public/favicon.ico`
- `public/favicon.png`
- `public/icon-192.png`
- `public/icon-512.png`
- `public/apple-touch-icon.png`
- `public/idesign-logo.png`
- Update `src/app/Layout.tsx` navbar and footer logo to import and display `i design logo gh.png`.

---

### 2. Branding & Title Updates ("Figma Make App" → "IDesign.Studio")
- **`index.html`**: Set default title to `IDesign.Studio`, update `<meta name="apple-mobile-web-app-title" content="IDesign.Studio" />`.
- **`.figma/make/site.json`**: Set `"title": "IDesign.Studio"`.
- **`public/manifest.webmanifest`**: Set `"name": "IDesign.Studio"` and `"short_name": "IDesign.Studio"`.
- **`vite.config.ts`**: Update PWA manifest with `name: "IDesign.Studio"`, `short_name: "IDesign.Studio"`, fallback title to `"IDesign.Studio"`.
- **`# Figma Make App.txt`**: Update title and references.

---

### 3. Removal of Portfolio Builder
- **`src/app/Layout.tsx`**: Remove `{ label: "Portfolio Builder", to: "/builder", isSpecial: true }` from `NAV_LINKS`.
- **`src/app/routes.ts`**: Remove `/builder` route configuration.
- **`src/app/pages/Home.tsx`**: Remove the `Interactive Digital Portfolio Builder Studio Highlight` section and CTA buttons linking to `/builder`.

---

### 4. PWA Installation & Service Worker Integration
- **`src/app/components/PWAInstallPrompt.tsx`**: Add a luxury floating PWA Install button & offline ready notification.
- **`src/main.tsx`**: Register service worker using `registerSW` from `virtual:pwa-register`.
- **`src/app/Layout.tsx`**: Mount `PWAInstallPrompt` into layout.

---

## Verification Plan

### Automated / Build Verification
- Copy logo files and verify sizes.
- Run `npm run build` to verify clean compilation, service worker generation, and manifest validation.
- Verify `dist/manifest.webmanifest`, `dist/sw.js`, and icon assets in production output.

### Manual Verification
- Test site loading in browser.
- Verify site icon in browser tab and PWA install prompt button.
- Verify that "Portfolio Builder" is completely removed from navigation, home page, and routes.
- Confirm branding displays as `IDesign.Studio`.
