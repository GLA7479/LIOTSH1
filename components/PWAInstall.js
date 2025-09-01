// components/PWAInstall.js
import { useEffect, useRef, useState } from "react";

export default function PWAInstall() {
  const deferredPrompt = useRef(null);
  const [canInstall, setCanInstall] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showIOSHint, setShowIOSHint] = useState(false);

  useEffect(() => {
    const standalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;
    setIsStandalone(standalone);

    const handler = (e) => {
      e.preventDefault();
      deferredPrompt.current = e;
      setCanInstall(true);
    };
    window.addEventListener("beforeinstallprompt", handler);

    const onInstalled = () => {
      setCanInstall(false);
      setIsStandalone(true);
    };
    window.addEventListener("appinstalled", onInstalled);

    // iOS hint: no beforeinstallprompt; show tip on Safari iOS if not standalone
    const isIOS = /iphone|ipad|ipod/i.test(window.navigator.userAgent);
    const isSafari = /^((?!chrome|android).)*safari/i.test(window.navigator.userAgent);
    if (isIOS && isSafari && !standalone) {
      setShowIOSHint(true);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (isStandalone) return null;

  return (
    <div className="relative">
      {canInstall ? (
        <button
          onClick={async () => {
            try {
              await deferredPrompt.current.prompt();
              const { outcome } = await deferredPrompt.current.userChoice;
              if (outcome === "accepted") {
                deferredPrompt.current = null;
                setCanInstall(false);
              }
            } catch {}
          }}
          className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 hover:bg-white/15 transition"
        >
          Install App
        </button>
      ) : (
        <button
          onClick={() => setShowIOSHint((v) => !v)}
          className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 hover:bg-white/15 transition"
          title="Install"
        >
          Install App
        </button>
      )}

      {showIOSHint && (
        <div className="absolute right-0 mt-2 w-72 p-3 rounded-xl bg-black/80 border border-white/15 text-xs backdrop-blur">
          <b>iOS Safari:</b> Tap the <span className="inline-block px-1 py-0.5 bg-white/10 rounded">Share</span> icon →{" "}
          <span className="inline-block px-1 py-0.5 bg-white/10 rounded">Add to Home Screen</span>. The app will always open on the Home page.
        </div>
      )}
    </div>
  );
}
