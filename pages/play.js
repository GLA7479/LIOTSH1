// pages/play.js
import { useEffect, useState } from "react";

export default function PlayPage() {
  const [GameComp, setGameComp] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        // נסה קודם בתיקיית /game
        let mod;
        try {
          mod = await import("../game/mleo-miners");
        } catch {
          // ואם אין /game — נופל חזרה ל-/pages
          mod = await import("./mleo-miners");
        }
        if (alive) setGameComp(() => mod.default || mod);
      } catch (e) {
        console.error("[PLAY] failed to load game module:", e);
        if (alive) setErr(e);
      }
    })();

    return () => { alive = false; };
  }, []);

  if (err) {
    return (
      <div className="min-h-screen grid place-items-center bg-[#0b1220] text-white p-6">
        <div className="max-w-xl text-center">
          <h1 className="text-2xl font-extrabold mb-2">Failed to load game</h1>
          <p className="opacity-80 break-all">{String(err?.message || err)}</p>
        </div>
      </div>
    );
  }

  if (!GameComp) {
    return (
      <div className="min-h-screen grid place-items-center bg-[#0b1220] text-white">
        <div className="text-center">
          <img
            src="/images/logo.png"
            alt="MLEO"
            width={96}
            height={96}
            className="mx-auto mb-4 rounded-full"
          />
          <div className="text-lg font-bold">Loading game...</div>
        </div>
      </div>
    );
  }

  return <GameComp />;
}
