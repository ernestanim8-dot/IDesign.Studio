import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { registerSW } from 'virtual:pwa-register'

// A visitor may keep an open tab while a deployment replaces its hashed
// bundles. Reload once to fetch the current application shell instead of
// leaving them on React Router's import-error screen.
window.addEventListener("vite:preloadError", (event) => {
  event.preventDefault();

  const reloadKey = "idesign:chunk-reload";
  if (sessionStorage.getItem(reloadKey)) return;

  sessionStorage.setItem(reloadKey, "1");
  window.location.reload();
});

window.addEventListener("pageshow", () => {
  sessionStorage.removeItem("idesign:chunk-reload");
});

// Let first paint and route assets win the network before offline caching begins.
window.addEventListener("load", () => {
  const updateSW = registerSW({
    immediate: true,
    onNeedRefresh() {
      console.log("[IDesign.Studio PWA] New version detected, updating...");
      updateSW(true);
    },
    onOfflineReady() {
      console.log("[IDesign.Studio PWA] Offline caching active");
    },
  });
});

// Dynamically set theme-color for supported browsers without triggering static HTML compatibility warnings
if (typeof document !== 'undefined') {
  let themeMeta = document.querySelector('meta[name="theme-color"]');
  if (!themeMeta) {
    themeMeta = document.createElement('meta');
    themeMeta.setAttribute('name', 'theme-color');
    document.head.appendChild(themeMeta);
  }
  themeMeta.setAttribute('content', '#c8a54a');
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
