// pages/index.js
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import PWAInstall from "../components/PWAInstall";

const GAME_ENTRY_URL = "/play"; // שנה אם עמוד הכניסה שלך אחר

const SLOGANS = [
  "Ever wished you mined Bitcoin on day one? Start with MLEO today.",
  "Tap. Merge. Earn. Turn your play into MLEO.",
  "From meme to machine — mine the future with Leo.",
  "Fair emission. Real competition. Pure fun.",
  "No gas, no fuss (demo). Just mine and climb.",
  "Join early miners. Claim your share of the MLEO era.",
];

export default function Home() {
  const [idx, setIdx] = useState(0);
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [mounted, setMounted] = useState(false); // SSR guard for portals

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setIdx((i) => (i + 1) % SLOGANS.length), 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <Head>
        <title>MLEO — Mine. Merge. Earn.</title>
        <meta
          name="description"
          content="MLEO is a playful crypto-mining experience. Focused, fair, and fun—designed for early miners."
        />
        <link rel="manifest" href="/manifest.json" />

        <meta name="theme-color" content="#0b0b0d" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="MLEO" />
        <link rel="apple-touch-icon" href="/icons/pwa-192.png" />
      </Head>

      {/* BACKGROUND – “AI” look */}
      <main className="min-h-[var(--app-100vh,100vh)] relative overflow-hidden bg-[#0b0b0d] text-white">
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute -top-1/3 -left-1/4 w-[70vw] h-[70vw] rounded-full blur-3xl opacity-30"
            style={{
              background:
                "radial-gradient(50% 50% at 50% 50%, #a855f7 0%, rgba(168,85,247,0) 70%)",
            }}
          />
          <div
            className="absolute -bottom-1/3 -right-1/4 w-[70vw] h-[70vw] rounded-full blur-3xl opacity-30"
            style={{
              background:
                "radial-gradient(50% 50% at 50% 50%, #f59e0b 0%, rgba(245,158,11,0) 70%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(1000px 600px at 50% -200px, rgba(250,204,21,.08), transparent)",
            }}
          />
        </div>

        {/* NAV */}
        <header className="relative z-10 max-w-6xl mx-auto px-5 pt-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/images/leo-coin-gold.png"
              alt="MLEO"
              className="w-10 h-10 rounded-full object-contain"
            />
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
        <section className="relative z-10 max-w-6xl mx-auto px-5 pt-10 pb-20 sm:pt-16 sm:pb-28 grid md:grid-cols-2 gap-10 items-center">
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
            <p className="mt-5 text-base sm:text-lg text-white/80 max-w-xl">{SLOGANS[idx]}</p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href={GAME_ENTRY_URL}
                className="px-6 py-3 rounded-2xl bg-yellow-400 text-black font-extrabold text-lg shadow hover:bg-yellow-300 transition"
              >
                START NOW
              </Link>

              {/* HOW IT WORKS → opens modal with MLEO accrual only */}
              <button
                onClick={() => setShowHowItWorks(true)}
                className="px-6 py-3 rounded-2xl border border-white/20 font-semibold hover:bg-white/5 transition text-center"
              >
                How it works
              </button>
            </div>

            {/* Trust bullets */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm text-white/70">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                Fair, capped daily accrual
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                Anti-abuse & soft limits
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">Installable PWA</div>
            </div>
          </div>

          {/* VIDEO – teaser */}
          <div className="relative">
            <div className="absolute -inset-6 rounded-[32px] bg-yellow-400/10 blur-3xl" />
            <div className="relative rounded-3xl border border-white/10 bg-white/5 p-4 shadow-xl backdrop-blur">
              <video
                autoPlay
                loop
                muted
                playsInline
                poster="/images/mleo-hero-preview.png"
                className="w-full h-auto rounded-2xl object-cover"
                src="/videos/intro.mp4"
              />
              <p className="mt-3 text-xs text-white/60 text-center">
                Teaser — the full experience starts when you hit START NOW.
              </p>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="relative z-10 max-w-6xl mx-auto px-5 pb-10 text-xs text-white/50">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 justify-between">
            <div>© {new Date().getFullYear()} MLEO. All rights reserved.</div>
            <div className="space-x-4">
              <a href="#" className="hover:text-white/80">
                Terms
              </a>
              <a href="#" className="hover:text-white/80">
                Privacy
              </a>
              <a href="#" className="hover:text-white/80">
                Docs
              </a>
            </div>
          </div>
        </footer>
      </main>

      {/* === HOW IT WORKS (MLEO only) MODAL via Portal === */}
      {showHowItWorks &&
        mounted &&
        createPortal(
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur"
            style={{
              zIndex: 10050,
              paddingTop: "calc(env(safe-area-inset-top, 0px) + 6vh)",
              paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 2vh)",
            }}
            role="dialog"
            aria-modal="true"
          >
            <div className="mx-auto max-w-2xl w-[92%] max-h-[88vh] overflow-auto bg-neutral-900 text-white rounded-2xl border border-white/10 shadow-2xl relative">
              {/* Sticky header */}
              <div className="sticky top-0 z-10 bg-neutral-900/95 backdrop-blur p-4 border-b border-white/10 rounded-t-2xl flex items-center justify-between">
                <h2 className="text-2xl font-bold">How MLEO Accrual Works</h2>
                <button
                  onClick={() => setShowHowItWorks(false)}
                  className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20"
                  aria-label="Close"
                  title="Close"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-4 text-sm text-white/80">
                <section>
                  <h3 className="font-semibold text-white mb-1">1) What you actually earn</h3>
                  <p>
                    <b>MLEO</b> is a utility token earned through play. As you progress, a portion
                    of your eligible in-game outcomes can translate into MLEO. The translation is{" "}
                    <b>variable</b>, designed for fairness and long-term stability, and may change
                    over time without prior notice.
                  </p>
                </section>

                <section>
                  <h3 className="font-semibold text-white mb-1">2) Conversion (high level)</h3>
                  <ul className="list-disc ml-5 space-y-1">
                    <li>Only specific in-game events qualify for accrual.</li>
                    <li>
                      The conversion uses internal balancing rules and{" "}
                      <b>doesn’t expose exact formulas</b> or fixed rates.
                    </li>
                    <li>
                      Protective mechanisms (like soft-caps) gradually reduce accrual as you
                      approach your personal daily range.
                    </li>
                  </ul>
                </section>

                <section>
                  <h3 className="font-semibold text-white mb-1">3) Daily range & fairness</h3>
                  <ul className="list-disc ml-5 space-y-1">
                    <li>
                      Each account has an internal daily range for accrual to help prevent abuse and
                      keep things fair.
                    </li>
                    <li>Approaching that range gradually tapers new accrual for the rest of the day.</li>
                    <li>Ranges and pacing can be adjusted over time for ecosystem health.</li>
                  </ul>
                </section>

                <section>
                  <h3 className="font-semibold text-white mb-1">4) Vault & Claim</h3>
                  <ul className="list-disc ml-5 space-y-1">
                    <li>
                      Your accrued MLEO appears as a balance that you can <b>CLAIM</b> into your
                      in-game <b>Vault</b>.
                    </li>
                    <li>
                      When/if on-chain claiming opens, additional unlock windows and eligibility
                      checks may apply.
                    </li>
                    <li>
                      Until then, accrual remains an in-app utility balance for entertainment
                      purposes.
                    </li>
                  </ul>
                </section>

                <section>
                  <h3 className="font-semibold text-white mb-1">5) Activity when you’re away</h3>
                  <ul className="list-disc ml-5 space-y-1">
                    <li>Limited progress can accrue while offline at a reduced efficiency.</li>
                    <li>
                      Exact behavior is dynamic and may change; it’s intended as a light boost, not
                      a replacement for play.
                    </li>
                  </ul>
                </section>

                <section>
                  <h3 className="font-semibold text-white mb-1">6) Important notes</h3>
                  <ul className="list-disc ml-5 space-y-1">
                    <li>Token availability, rates, caps and schedules are subject to change, pause or reset.</li>
                    <li>We may adjust balances to address bugs, exploits or abnormal activity.</li>
                    <li>
                      <b>Not financial advice.</b> MLEO has no guaranteed monetary value.
                    </li>
                  </ul>
                </section>
              </div>

              <div className="px-6 pb-6 flex justify-end">
                <Link
                  href={GAME_ENTRY_URL}
                  className="px-5 py-2 rounded-xl bg-yellow-400 text-black font-extrabold hover:bg-yellow-300 transition"
                  onClick={() => setShowHowItWorks(false)}
                >
                  START NOW
                </Link>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
