import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { registerSW } from 'virtual:pwa-register'

// Register PWA Service Worker for offline capability & automatic updates
registerSW({
  immediate: true,
  onNeedRefresh() {
    console.log('[IDesign.Studio PWA] New update ready');
  },
  onOfflineReady() {
    console.log('[IDesign.Studio PWA] Offline caching active');
  },
})

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
