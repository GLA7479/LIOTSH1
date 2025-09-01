// pages/index.js
import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Home() {
  const [introDone, setIntroDone] = useState(false);
  const videoRef = useRef(null);
  const { isConnected } = useAccount();

  // אם אין וידאו/שגיאה – מסיימים Splash אחרי ~3.2 שניות
  useEffect(() => {
    const t = setTimeout(() => setIntroDone(true), 3200);
    return () => clearTimeout(t);
  }, []);

  const finishIntro = () => setIntroDone(true);

  return (
    <Layout>
      <Head>
        <title>MLEO Miners</title>
        <meta name="description" content="Merge miners • Break rocks • Earn coins" />
      </Head>

      {/* ===== SPLASH (וידאו פתיחה אם קיים; אחרת אנימציה) ===== */}
      {!introDone && (
        <div className="fixed inset-0 z-[100] overflow-hidden mleo-splash-bg">
          {/* שים קובץ ב: /public/videos/intro.mp4 (אופציונלי) */}
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover opacity-90"
            src="/videos/intro.mp4"
            autoPlay
            muted
            playsInline
            onEnded={finishIntro}
            onError={() => {/* נשארים על הרקע האנימטיבי עד הטיימאאוט */}}
          />
          {/* שכבת לוגו/טקסט מעל הווידאו או לבד אם אין קובץ */}
          <div className="absolute inset-0 grid place-items-center">
            <div className="text-center">
              <div className="mx-auto mb-6 h-24 w-24 rounded-3xl bg-yellow-400/90 shadow-2xl ring-8 ring-yellow-300/30 animate-mleo-pop">
                {/* אופציונלי: /public/images/logo.png */}
                <img
                  src="/images/logo.png"
                  alt="MLEO"
                  className="w-full h-full object-contain p-3 drop-shadow-xl"
                  onError={(e)=>{ e.currentTarget.style.display='none'; }}
                />
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white animate-mleo-fadeUp">
                MLEO Miners
              </h1>
              <p className="mt-2 text-sm sm:text-base text-white/80 animate-mleo-fadeUp [animation-delay:.12s]">
                Merge miners • Break rocks • Earn coins
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ===== HERO ===== */}
      <div className="relative min-h-[calc(var(--app-100vh,100svh)-0px)] grid place-items-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
        {/* דקורציות רקע קלות */}
        <div className="pointer-events-none absolute -top-24 -left-24 w-[36rem] h-[36rem] rounded-full blur-3xl opacity-25 bg-yellow-500/20" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 w-[36rem] h-[36rem] rounded-full blur-3xl opacity-20 bg-cyan-500/20" />

        <main className="relative z-10 max-w-4xl w-full px-4 text-center">
          <h1 className="text-4xl sm:text-6xl font-black text-white drop-shadow-xl animate-mleo-fadeUp">
           ⛏️ MLEO Miners
          </h1>
          <p className="mt-3 text-white/80 animate-mleo-fadeUp [animation-delay:.08s]">
            משחק Merge casual. חוצבים סלעים, ממזגים כורים, וצוברים Coins. חלק מה-Coins עשוי להמיר ל-MLEO לפי כללים פנימיים.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 justify-center animate-mleo-fadeUp [animation-delay:.15s]">
            {/* התחבר לארנק (RainbowKit) */}
            <ConnectButton showBalance={false} />

            {/* מעבר למשחק (ללא מסך פתיחה פנימי) */}
            <Link
              href="/mleo-miners"
              className="px-5 py-3 rounded-xl font-extrabold bg-yellow-400 hover:bg-yellow-300 text-black shadow-lg ring-2 ring-yellow-300 active:scale-95 transition"
            >
              START MINING
            </Link>

            {/* מידע: How To / Mining / Terms – אותם תכנים שהיו במסך הפתיחה של המשחק */}
            <Link
              href="/mleo-miners#howto"
              className="px-4 py-3 rounded-xl font-extrabold bg-emerald-400 hover:bg-emerald-300 text-black shadow ring-2 ring-emerald-300 active:scale-95 transition"
            >
              HOW TO PLAY
            </Link>
            <Link
              href="/mleo-miners#mining"
              className="px-4 py-3 rounded-xl font-extrabold bg-cyan-400 hover:bg-cyan-300 text-black shadow ring-2 ring-cyan-300 active:scale-95 transition"
            >
              MINING
            </Link>
            <Link
              href="/mleo-miners#terms"
              className="px-4 py-3 rounded-xl font-extrabold bg-teal-400 hover:bg-teal-300 text-black shadow ring-2 ring-teal-300 active:scale-95 transition"
            >
              TERMS
            </Link>
          </div>

          {/* שורת פיצ'רים */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="rounded-2xl bg-white/5 p-4 backdrop-blur-sm border border-white/10 text-white">
              <div className="text-lg font-extrabold">Merge & Upgrade</div>
              <div className="text-white/80 text-sm">מיזוג כורים ושדרוגים מספריים פשוטים, כיף ומהיר.</div>
            </div>
            <div className="rounded-2xl bg-white/5 p-4 backdrop-blur-sm border border-white/10 text-white">
              <div className="text-lg font-extrabold">Break Rocks</div>
              <div className="text-white/80 text-sm">HP של סלעים גדל בהדרגה; DPS גדל עם הרמות.</div>
            </div>
            <div className="rounded-2xl bg-white/5 p-4 backdrop-blur-sm border border-white/10 text-white">
              <div className="text-lg font-extrabold">MLEO Balance</div>
              <div className="text-white/80 text-sm">חלק מה-Coins עשוי להפוך ל-MLEO לפי מגבלות יומיות ואיזון.</div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}
