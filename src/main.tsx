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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
