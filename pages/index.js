// pages/index.js
import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [introDone, setIntroDone] = useState(false);
  const videoRef = useRef(null);

  // אם אין וידאו / יש שגיאה – נסגור את הספלש אחרי ~2.6 שניות
  useEffect(() => {
    if (introDone) return;
    const t = setTimeout(() => setIntroDone(true), 2600);
    return () => clearTimeout(t);
  }, [introDone]);

  const finishIntro = () => setIntroDone(true);

  return (
    <>
      <Head>
        <title>MLEO Miners</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/>
      </Head>

      {/* ===== SPLASH (וידאו אם קיים, אחרת אנימציה) ===== */}
      {!introDone && (
        <div className="fixed inset-0 z-[100] overflow-hidden mleo-splash-bg">
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover opacity-90"
            src="/videos/intro.mp4" // אופציונלי; אם לא קיים נקבל אנימציה בלבד
            autoPlay
            muted
            playsInline
            onEnded={finishIntro}
            onError={() => { /* נשארים עד הטיימר ב-useEffect */ }}
          />
          <div className="absolute inset-0 grid place-items-center">
            <div className="text-center">
              <div className="mx-auto mb-6 h-24 w-24 rounded-3xl bg-yellow-400 ring-4 ring-yellow-300/30 animate-mleo-pop" />
              <div className="text-white/90 font-black tracking-tight text-2xl animate-mleo-fadeUp">
                Loading MLEO…
              </div>
              <div className="mt-4 w-40 h-1.5 bg-white/15 rounded-full overflow-hidden mx-auto">
                <div className="h-full w-1/3 bg-yellow-400 animate-mleo-loader" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== MAIN ===== */}
      <main className="min-h-[100svh] bg-gray-950 text-white relative overflow-hidden">
        {/* רקע דקורטיבי */}
        <div className="pointer-events-none absolute -top-40 -left-20 w-[36rem] h-[36rem] rounded-full blur-3xl opacity-20"
             style={{ background: "radial-gradient(circle, #fde047 0%, transparent 60%)" }} />
        <div className="pointer-events-none absolute -bottom-40 -right-20 w-[36rem] h-[36rem] rounded-full blur-3xl opacity-15"
             style={{ background: "radial-gradient(circle, #38bdf8 0%, transparent 60%)" }} />

        {/* Header קטן */}
        <header className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/images/logo.png" alt="" className="w-9 h-9 rounded-lg bg-white/10 object-cover" />
            <span className="font-extrabold tracking-tight">MLEO</span>
          </div>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/play" className="text-white/80 hover:text-white">Play</Link>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-white/60 hover:text-white">Twitter</a>
          </nav>
        </header>

        {/* HERO */}
        <section className="max-w-6xl mx-auto px-4 pt-10 pb-16 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
            ⛏️ MLEO Miners
          </h1>
          <p className="mt-3 text-white/80 max-w-2xl mx-auto">
            Merge dogs, break rocks, earn coins — and accrue MLEO in demo mode.
          </p>

          <div className="mt-7 flex items-center justify-center gap-3 flex-wrap">
            <Link
              href="/play"
              className="px-5 py-3 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold shadow-lg active:scale-95 transition"
            >
              PLAY NOW
            </Link>
            <Link
              href="/play"
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white/90 font-extrabold active:scale-95 transition"
            >
              HOW IT WORKS
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}