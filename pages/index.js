// pages/index.js
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import PWAInstall from "../components/PWAInstall";

const GAME_ENTRY_URL = "/play"; // <-- שנה כאן אם עמוד הכניסה שלך אחר

const SLOGANS = [
  "Ever wished you mined Bitcoin on day one? Start with MLEO today.",
  "Tap. Merge. Earn. Turn your play into MLEO.",
  "From meme to machine — mine the future with Leo.",
  "Fair emission. Real competition. Pure fun.",
  "No gas, no fuss (demo). Just mine and climb.",
  "Join early miners. Claim your share of the MLEO era."
];

export default function Home() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % SLOGANS.length), 2700);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <Head>
        <title>MLEO — Mine. Merge. Earn.</title>
        <meta
          name="description"
          content="MLEO is a playful crypto-mining experience. Tap, merge, and earn your way up with Leo — the real Shiba vibe."
        />
        {/* PWA */}
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#0b0b0d" />
        {/* iOS install */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="MLEO" />
        <link rel="apple-touch-icon" href="/icons/pwa-192.png" />
      </Head>

      <main className="min-h-[var(--app-100vh,100vh)] relative overflow-hidden bg-gradient-to-b from-[#0b0b0d] to-[#121217] text-white">
        {/* Animated background coins / sparkles */}
        <style jsx>{`
          .float {
            position: absolute;
            opacity: 0.12;
            animation: rise 12s linear infinite;
            pointer-events: none;
            filter: blur(0.3px);
          }
          .float:nth-child(odd) { animation-duration: 16s; }
          @keyframes rise {
            0%   { transform: translateY(10vh) translateX(0) scale(0.8); opacity: 0; }
            10%  { opacity: 0.25; }
            50%  { opacity: 0.2; }
            100% { transform: translateY(-110vh) translateX(6vw) scale(1.1); opacity: 0; }
          }
        `}</style>
        {Array.from({ length: 16 }).map((_, i) => (
          <div
            key={i}
            className="float"
            style={{
              left: `${(i * 6.3) % 100}vw`,
              bottom: `${(i * 5) % 30}vh`,
              width: `${24 + (i % 5) * 6}px`,
              height: `${24 + (i % 5) * 6}px`,
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 30% 30%, rgba(255,230,120,0.9), rgba(255,180,0,0.5), rgba(255,180,0,0.1))",
              boxShadow: "0 0 32px rgba(255,190,60,0.35)"
            }}
          />
        ))}

        {/* NAV (optional minimal) */}
        <header className="max-w-6xl mx-auto px-5 pt-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/images/leo-coin-gold.png" alt="MLEO" className="w-10 h-10 rounded-full object-contain" />
            <span className="text-xl font-bold tracking-wide">MLEO</span>
          </div>
          <div className="flex items-center gap-3">
            <PWAInstall />
            <Link
              href={GAME_ENTRY_URL}
              className="hidden sm:inline-flex px-4 py-2 rounded-xl bg-yellow-400 text-black font-bold hover:bg-yellow-300 transition"
            >
              START NOW
            </Link>
          </div>
        </header>

        {/* HERO */}
        <section className="relative max-w-6xl mx-auto px-5 pt-10 pb-20 sm:pt-16 sm:pb-28">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs mb-5">
                <span>New</span>
                <span className="opacity-60">Early miners welcome</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
                Mine. Merge. Earn.
                <br />
                <span className="text-yellow-400">Welcome to the MLEO Rush.</span>
              </h1>
              <p className="mt-5 text-base sm:text-lg text-white/80 max-w-xl">
                {SLOGANS[idx]}
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href={GAME_ENTRY_URL}
                  className="px-6 py-3 rounded-2xl bg-yellow-400 text-black font-extrabold text-lg shadow hover:bg-yellow-300 transition"
                >
                  START NOW
                </Link>
                <a
                  href="#how-it-works"
                  className="px-6 py-3 rounded-2xl border border-white/20 font-semibold hover:bg-white/5 transition text-center"
                >
                  How it works
                </a>
              </div>

              {/* Trust / highlights */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm text-white/70">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">Fair, capped emission (demo)</div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">Play to mine — no gas (demo)</div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">Mobile-first. Installable PWA</div>
              </div>
            </div>

            {/* Right illustration (kept generic; does not touch game) */}
            <div className="relative">
              <div className="absolute -inset-6 rounded-[32px] bg-yellow-400/10 blur-3xl" />
              <div className="relative rounded-3xl border border-white/10 bg-white/5 p-4 shadow-xl backdrop-blur">
                <img
                  src="/images/mleo-hero-preview.png"
                  alt="MLEO preview"
                  className="w-full h-auto rounded-2xl object-cover"
                />
                <p className="mt-3 text-xs text-white/60 text-center">
                  Preview only — tap START NOW to enter the game.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="max-w-6xl mx-auto px-5 pb-24">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">How it works</h2>
          <div className="grid md:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="font-bold mb-2">1) Start mining</h3>
              <p className="text-white/80 text-sm">
                Hit “START NOW” to enter the mining arena. Break rocks, earn coins, and open gifts. (Demo mode—no on-chain fees.)
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="font-bold mb-2">2) Merge & upgrade</h3>
              <p className="text-white/80 text-sm">
                Combine dogs to level up and multiply your mining power. Build your strategy to climb the leaderboard.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="font-bold mb-2">3) Earn MLEO</h3>
              <p className="text-white/80 text-sm">
                The play economy will map to MLEO via fair emission & future on-chain events. Early players get the edge.
              </p>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="max-w-6xl mx-auto px-5 pb-10 text-xs text-white/50">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 justify-between">
            <div>© {new Date().getFullYear()} MLEO. All rights reserved.</div>
            <div className="space-x-4">
              <a href="#" className="hover:text-white/80">Terms</a>
              <a href="#" className="hover:text-white/80">Privacy</a>
              <a href="#" className="hover:text-white/80">Docs</a>
            </div>
          </div>
          <p className="mt-3">
            <span className="font-semibold text-white/70">Disclaimer:</span> This is not financial advice. Demo mode only; on-chain integration will be announced separately.
          </p>
        </footer>
      </main>
    </>
  );
}
