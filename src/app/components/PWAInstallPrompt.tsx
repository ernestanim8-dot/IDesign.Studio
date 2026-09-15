import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GOLD, DARKER } from "@/tokens";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [justInstalled, setJustInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsVisible(true);
    };

    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setIsVisible(false);
      setJustInstalled(true);
      setTimeout(() => setJustInstalled(false), 4000);
    };

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    window.addEventListener("appinstalled", handleAppInstalled);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
      window.removeEventListener("appinstalled", handleAppInstalled);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === "accepted") {
      setIsVisible(false);
    }
    setDeferredPrompt(null);
  };

  return (
    <>
      {/* Offline Status Pill */}
      <AnimatePresence>
        {isOffline && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#251f15] text-[#e4c06e] border border-[#c8a54a]/40 px-4 py-1.5 rounded-full text-xs font-mono shadow-xl flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            <span>Offline Mode Active • Cached Content Available</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Successfully Installed Toast */}
      <AnimatePresence>
        {justInstalled && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 left-6 z-50 bg-[#16140e] text-white border border-[#c8a54a] px-4 py-3 rounded-xl text-xs font-mono shadow-2xl flex items-center gap-3"
          >
            <span className="text-base text-[#c8a54a]">✓</span>
            <span>IDesign.Studio installed to your device!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating PWA Install Prompt Banner */}
      <AnimatePresence>
        {isVisible && deferredPrompt && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-24 left-6 z-50 max-w-sm rounded-2xl border border-[#332e24] p-4 shadow-2xl backdrop-blur-xl"
            style={{ background: "rgba(18, 16, 12, 0.95)" }}
          >
            <div className="flex items-start gap-3">
              <img
                src="/icon-192.png"
                alt="IDesign.Studio"
                className="w-11 h-11 rounded-xl object-cover border border-[#443e30]"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-sm font-semibold text-white tracking-wide">
                    IDesign.Studio
                  </h4>
                  <button
                    onClick={() => setIsVisible(false)}
                    className="text-[#787165] hover:text-white text-xs px-1.5 py-0.5 rounded transition-colors"
                    aria-label="Close install prompt"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-[11px] text-[#9a9182] mt-0.5 font-light leading-relaxed">
                  Install our Progressive Web App for full-screen showcase & fast offline access.
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <button
                    onClick={handleInstall}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-medium font-mono text-black transition-all hover:scale-105"
                    style={{ background: GOLD }}
                  >
                    Install App
                  </button>
                  <button
                    onClick={() => setIsVisible(false)}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono text-[#8a8172] hover:text-white transition-colors"
                  >
                    Later
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
