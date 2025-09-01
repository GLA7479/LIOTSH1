// pages/index.js
import Head from "next/head";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import PWAInstall from "../components/PWAInstall";

// ===== Supported locales =====
const SUPPORTED = {
  en: "English",
  he: "עברית",
  pt: "Português",
  ja: "日本語",
  zh: "简体中文",
  ko: "한국어",
};

// ===== Translations (all strings, incl. HOW IT WORKS) =====
const T = {
  en: {
    brand: "MLEO",
    heroTitleLine1: "Mine. Merge. Earn.",
    heroTitleLine2: "Welcome to the MLEO Rush.",
    newBadge: "New",
    earlyBadge: "Early miners welcome",
    startNow: "START NOW",
    howItWorksBtn: "How it works",
    teaserNote: "Teaser — the full experience starts when you hit START NOW.",
    bullets: [
      "Fair, capped daily accrual",
      "Anti-abuse & soft limits",
      "Installable PWA",
    ],
    footerTerms: "Terms",
    footerPrivacy: "Privacy",
    footerDocs: "Docs",
    footerCopy: (y) => `© ${y} MLEO. All rights reserved.`,
    slogans: [
      "Ever wished you mined Bitcoin on day one? Start with MLEO today.",
      "Tap. Merge. Earn. Turn your play into MLEO.",
      "From meme to machine — mine the future with Leo.",
      "Fair emission. Real competition. Pure fun.",
      "No gas, no fuss (demo). Just mine and climb.",
      "Join early miners. Claim your share of the MLEO era.",
    ],
    how: {
      title: "How MLEO Accrual Works",
      close: "Close",
      s1t: "1) What you actually earn",
      s1p:
        "MLEO is a utility token earned through play. As you progress, a portion of your eligible in-game outcomes can translate into MLEO. The translation is variable, designed for fairness and long-term stability, and may change over time without prior notice.",
      s2t: "2) Conversion (high level)",
      s2l: [
        "Only specific in-game events qualify for accrual.",
        "The conversion uses internal balancing rules and doesn’t expose exact formulas or fixed rates.",
        "Protective mechanisms (like soft-caps) gradually reduce accrual as you approach your personal daily range.",
      ],
      s3t: "3) Daily range & fairness",
      s3l: [
        "Each account has an internal daily range for accrual to help prevent abuse and keep things fair.",
        "Approaching that range gradually tapers new accrual for the rest of the day.",
        "Ranges and pacing can be adjusted over time for ecosystem health.",
      ],
      s4t: "4) Vault & Claim",
      s4l: [
        "Your accrued MLEO appears as a balance that you can CLAIM into your in-game Vault.",
        "When/if on-chain claiming opens, additional unlock windows and eligibility checks may apply.",
        "Until then, accrual remains an in-app utility balance for entertainment purposes.",
      ],
      s5t: "5) Activity when you’re away",
      s5l: [
        "Limited progress can accrue while offline at a reduced efficiency.",
        "Exact behavior is dynamic and may change; it’s intended as a light boost, not a replacement for play.",
      ],
      s6t: "6) Important notes",
      s6l: [
        "Token availability, rates, caps and schedules are subject to change, pause or reset.",
        "We may adjust balances to address bugs, exploits or abnormal activity.",
        "Not financial advice. MLEO has no guaranteed monetary value.",
      ],
      cta: "START NOW",
    },
  },

  he: {
    brand: "MLEO",
    heroTitleLine1: "כרו. מיזגו. הרוויחו.",
    heroTitleLine2: "ברוכים הבאים ל-MLEO Rush.",
    newBadge: "חדש",
    earlyBadge: "ברוכים הבאים לכורים הראשונים",
    startNow: "התחילו עכשיו",
    howItWorksBtn: "איך זה עובד",
    teaserNote: "טיזר — החוויה המלאה מתחילה בלחיצה על \"התחילו עכשיו\".",
    bullets: [
      "צבירה יומית הוגנת ומוגבלת",
      "הגנות אנטי-הונאה והפחתה רכה",
      "אפליקציית PWA להתקנה",
    ],
    footerTerms: "תנאים",
    footerPrivacy: "פרטיות",
    footerDocs: "מסמכים",
    footerCopy: (y) => `©‏ ${y} ‏MLEO. כל הזכויות שמורות.`,
    slogans: [
      "תמיד רציתם לכרות ביטקוין ביום הראשון? התחילו עם MLEO כבר היום.",
      "לחצו. מיזגו. הרוויחו. הפכו את המשחק ל-MLEO.",
      "מ'מם' למכונה — כורים את העתיד עם ליאו.",
      "הנפקה הוגנת. תחרות אמיתית. כיף טהור.",
      "בלי גז ובלי בלאגן (דמו). פשוט לכרות ולהתקדם.",
      "הצטרפו לכורים הראשונים. תבעו את החלק שלכם בעידן MLEO.",
    ],
    how: {
      title: "איך צבירת MLEO עובדת",
      close: "סגירה",
      s1t: "1) מה באמת נצבר",
      s1p:
        "‏MLEO הוא טוקן שימושי שנצבר דרך המשחק. תוך כדי התקדמות, חלק מהתוצאות המזכות במשחק יכולות להתרגם ל-MLEO. ההמרה דינמית למען הוגנות ויציבות לטווח ארוך, ועשויה להשתנות ללא הודעה מוקדמת.",
      s2t: "2) המרה (בגבוה)",
      s2l: [
        "רק אירועים מסוימים במשחק זכאים לצבירה.",
        "ההמרה מתבססת על כללי איזון פנימיים ואינה חושפת נוסחאות או שיעורים קבועים.",
        "מנגנוני הגנה (כמו soft-cap) מפחיתים בהדרגה את הקצב כשמתקרבים לטווח היומי האישי.",
      ],
      s3t: "3) טווח יומי והוגנות",
      s3l: [
        "לכל חשבון טווח יומי פנימי לצבירה לשמירה על הוגנות ומניעת ניצול.",
        "התקרבות לטווח מחלישה בהדרגה צבירה נוספת לאותו היום.",
        "ניתן לכוונן טווחים וקצבים עם הזמן לפי צרכי המערכת.",
      ],
      s4t: "4) Vault ו-CLAIM",
      s4l: [
        "ה-MLEO שנצבר מופיע כיתרה שניתן ל-CLAIM אל ה-Vault בתוך המשחק.",
        "אם/כשהמימוש און-צ'יין ייפתח, עשויים לחול חלונות שחרור ובדיקות כשירות נוספות.",
        "עד אז, הצבירה נשארת כיתרת שימוש למשחק בלבד.",
      ],
      s5t: "5) פעילות כשאתם לא מחוברים",
      s5l: [
        "קיימת צבירה מוגבלת גם באופליין ביעילות מופחתת.",
        "ההתנהגות דינמית ומשתנה; מטרתה דחיפה קלה, לא תחליף למשחק פעיל.",
      ],
      s6t: "6) חשוב לדעת",
      s6l: [
        "זמינות, שיעורים, תקרות ולוחות זמנים כפופים לשינוי/השהיה/איפוס.",
        "ייתכנו התאמות ביתרות לטיפול בבאגים, ניצול או פעילות לא תקינה.",
        "לא ייעוץ פיננסי. ל-MLEO אין ערך כספי מובטח.",
      ],
      cta: "התחילו עכשיו",
    },
  },

  pt: {
    brand: "MLEO",
    heroTitleLine1: "Minerar. Fundir. Ganhar.",
    heroTitleLine2: "Bem-vindo à corrida MLEO.",
    newBadge: "Novo",
    earlyBadge: "Primeiros mineradores são bem-vindos",
    startNow: "COMEÇAR",
    howItWorksBtn: "Como funciona",
    teaserNote:
      "Teaser — a experiência completa começa quando você clica em COMEÇAR.",
    bullets: [
      "Acúmulo diário justo e limitado",
      "Anti-abuso e limites suaves",
      "PWA instalável",
    ],
    footerTerms: "Termos",
    footerPrivacy: "Privacidade",
    footerDocs: "Documentos",
    footerCopy: (y) => `© ${y} MLEO. Todos os direitos reservados.`,
    slogans: [
      "Já quis minerar Bitcoin no primeiro dia? Comece com MLEO hoje.",
      "Toque. Una. Ganhe. Converta seu jogo em MLEO.",
      "Do meme à máquina — mine o futuro com Leo.",
      "Emissão justa. Competição real. Diversão pura.",
      "Sem gas, sem complicação (demo). Apenas minere e evolua.",
      "Junte-se aos primeiros mineradores. Garanta sua parte da era MLEO.",
    ],
    how: {
      title: "Como funciona o acúmulo de MLEO",
      close: "Fechar",
      s1t: "1) O que você realmente ganha",
      s1p:
        "MLEO é um token utilitário ganho jogando. Conforme avança, parte dos resultados elegíveis no jogo pode se converter em MLEO. A conversão é variável, projetada para justiça e estabilidade de longo prazo, e pode mudar sem aviso prévio.",
      s2t: "2) Conversão (visão geral)",
      s2l: [
        "Apenas eventos específicos no jogo qualificam para acúmulo.",
        "A conversão usa regras internas de balanceamento e não expõe fórmulas exatas nem taxas fixas.",
        "Mecanismos de proteção (como limites suaves) reduzem gradualmente o acúmulo ao se aproximar da sua faixa diária.",
      ],
      s3t: "3) Faixa diária & justiça",
      s3l: [
        "Cada conta tem uma faixa diária interna para evitar abuso e manter a justiça.",
        "Ao se aproximar dessa faixa, o novo acúmulo diminui gradualmente no restante do dia.",
        "Faixas e ritmos podem ser ajustados ao longo do tempo para a saúde do ecossistema.",
      ],
      s4t: "4) Cofre & Claim",
      s4l: [
        "Seu MLEO acumulado aparece como saldo que você pode CLAIM para o Cofre do jogo.",
        "Se/quando o claim on-chain abrir, podem existir janelas de desbloqueio e verificações adicionais.",
        "Até lá, o acúmulo permanece como saldo utilitário no app para entretenimento.",
      ],
      s5t: "5) Quando você está ausente",
      s5l: [
        "Progresso limitado pode ocorrer offline com eficiência reduzida.",
        "O comportamento é dinâmico e pode mudar; é um impulso leve, não um substituto do jogo ativo.",
      ],
      s6t: "6) Observações importantes",
      s6l: [
        "Disponibilidade, taxas, tetos e cronogramas podem mudar, pausar ou reiniciar.",
        "Saldos podem ser ajustados para corrigir bugs, abusos ou atividade anormal.",
        "Não é aconselhamento financeiro. MLEO não possui valor monetário garantido.",
      ],
      cta: "COMEÇAR",
    },
  },

  ja: {
    brand: "MLEO",
    heroTitleLine1: "採掘・合体・稼ぐ",
    heroTitleLine2: "MLEOラッシュへようこそ。",
    newBadge: "新着",
    earlyBadge: "アーリーマイナー大歓迎",
    startNow: "今すぐ開始",
    howItWorksBtn: "仕組み",
    teaserNote:
      "ティーザー映像 — 本編は「今すぐ開始」を押すとスタートします。",
    bullets: ["公正で日次上限付きの獲得", "不正対策・ソフト上限", "インストール可能なPWA"],
    footerTerms: "利用規約",
    footerPrivacy: "プライバシー",
    footerDocs: "ドキュメント",
    footerCopy: (y) => `© ${y} MLEO. All rights reserved.`,
    slogans: [
      "ビットコインを初日に採掘したかった？ MLEOで今日から。",
      "タップ、合体、獲得。遊びをMLEOに変えよう。",
      "ミームからマシンへ — Leoと未来を掘る。",
      "公正なエミッション。真の競争。ピュアな楽しさ。",
      "ガス不要、面倒なし（デモ）。採掘して上へ。",
      "アーリーマイナーに参加しよう。MLEO時代のシェアを確保せよ。",
    ],
    how: {
      title: "MLEOの獲得メカニズム",
      close: "閉じる",
      s1t: "1) 実際に得られるもの",
      s1p:
        "MLEO はプレイを通じて得られるユーティリティトークンです。進行に伴い、条件を満たすゲーム内成果の一部が MLEO に変換されます。変換は可変で、公平性と長期安定性のために設計され、予告なく変更される場合があります。",
      s2t: "2) 変換（概要）",
      s2l: [
        "特定のゲーム内イベントのみが対象です。",
        "内部バランス規則に基づき、正確な式や固定レートは公開しません。",
        "ソフトキャップ等の保護により、日次上限に近づくと徐々に獲得が減少します。",
      ],
      s3t: "3) 日次レンジと公平性",
      s3l: [
        "アカウントごとに不正防止と公平性のための内部日次レンジがあります。",
        "そのレンジに近づくほど、その日の新規獲得は段階的に抑制されます。",
        "レンジやペースはエコシステム維持のため随時調整される場合があります。",
      ],
      s4t: "4) VaultとCLAIM",
      s4l: [
        "獲得した MLEO は残高として表示され、ゲーム内の Vault に CLAIM できます。",
        "オンチェーンの請求が開放される場合、追加のロック解除期間や適格性チェックが適用されることがあります。",
        "それまでは、娯楽目的のアプリ内ユーティリティ残高です。",
      ],
      s5t: "5) 不在時の挙動",
      s5l: [
        "オフライン中も効率を抑えた限定的な進行が発生する場合があります。",
        "挙動は動的で変更される可能性があり、あくまで軽いブーストです。",
      ],
      s6t: "6) 重要事項",
      s6l: [
        "利用可否、レート、上限、スケジュールは変更・一時停止・リセットされる場合があります。",
        "バグや不正等への対処として残高を調整することがあります。",
        "これは投資助言ではありません。MLEO に保証された金銭的価値はありません。",
      ],
      cta: "今すぐ開始",
    },
  },

  zh: {
    brand: "MLEO",
    heroTitleLine1: "挖矿·合成·赚取",
    heroTitleLine2: "欢迎加入 MLEO 热潮。",
    newBadge: "全新",
    earlyBadge: "欢迎早期矿工",
    startNow: "立即开始",
    howItWorksBtn: "如何运作",
    teaserNote: "预告片 — 点击“立即开始”即可体验完整内容。",
    bullets: ["公平且有日上限的积累", "反作弊与软上限", "可安装的 PWA"],
    footerTerms: "条款",
    footerPrivacy: "隐私",
    footerDocs: "文档",
    footerCopy: (y) => `© ${y} MLEO. 保留所有权利。`,
    slogans: [
      "是否想过在第一天就挖到比特币？现在就从 MLEO 开始。",
      "点击、合成、赚取。把你的游玩转化为 MLEO。",
      "从梗到引擎 —— 和 Leo 一起挖掘未来。",
      "公平发行。真实竞争。纯粹乐趣。",
      "无 Gas、无繁琐（演示）。只需挖矿、升级。",
      "加入早期矿工。领取你在 MLEO 时代的份额。",
    ],
    how: {
      title: "MLEO 的积累机制",
      close: "关闭",
      s1t: "1) 你真正获得的是什么",
      s1p:
        "MLEO 是通过游玩获得的实用型代币。随着进度推进，部分符合条件的游戏结果会转化为 MLEO。转化是可变的，为公平与长期稳定而设计，可能随时调整且恕不另行通知。",
      s2t: "2) 转化（高层说明）",
      s2l: [
        "仅特定的游戏事件符合积累资格。",
        "转化基于内部平衡规则，不公开具体公式或固定比率。",
        "保护机制（如软上限）会在接近日度范围时逐步降低新的积累。",
      ],
      s3t: "3) 日度范围与公平",
      s3l: [
        "每个账户都有内部日度范围，以防滥用并保持公平。",
        "接近该范围时，当天的新积累会逐步放缓。",
        "为生态健康，范围与节奏可能随时间调整。",
      ],
      s4t: "4) 保险库（Vault）与领取（Claim）",
      s4l: [
        "已积累的 MLEO 会显示为余额，你可以领取（CLAIM）到游戏内的 Vault。",
        "当/如果开放上链领取，可能会有额外的解锁窗口与资格校验。",
        "在此之前，积累仍是应用内的娱乐性实用余额。",
      ],
      s5t: "5) 你离线时",
      s5l: [
        "离线状态下可能以较低效率获得有限的进度。",
        "具体行为是动态可变的，仅作为轻度加成，并非替代主动游玩。",
      ],
      s6t: "6) 重要提示",
      s6l: [
        "可用性、比率、上限与时间表可能变更、暂停或重置。",
        "我们可能为修复漏洞、应对作弊或异常而调整余额。",
        "非投资建议。MLEO 不保证任何货币价值。",
      ],
      cta: "立即开始",
    },
  },

  ko: {
    brand: "MLEO",
    heroTitleLine1: "채굴·합성·획득",
    heroTitleLine2: "MLEO 러시에 오신 것을 환영합니다.",
    newBadge: "신규",
    earlyBadge: "초기 채굴자 환영",
    startNow: "지금 시작",
    howItWorksBtn: "작동 방식",
    teaserNote:
      "티저 — ‘지금 시작’을 누르면 전체 경험이 시작됩니다.",
    bullets: ["공정한 일일 상한", "남용 방지 & 소프트 캡", "설치형 PWA"],
    footerTerms: "이용약관",
    footerPrivacy: "개인정보",
    footerDocs: "문서",
    footerCopy: (y) => `© ${y} MLEO. All rights reserved.`,
    slogans: [
      "비트코인을 첫날에 채굴하고 싶었나요? 오늘 MLEO로 시작하세요.",
      "탭하고, 합치고, 획득하세요. 플레이를 MLEO로 전환하세요.",
      "밈에서 머신으로 — 레오와 함께 미래를 채굴하세요.",
      "공정한 발행. 진짜 경쟁. 순수한 재미.",
      "가스 걱정 없음(데모). 채굴하고 랭크업!",
      "초기 채굴자에 합류하고 MLEO 시대의 지분을 확보하세요.",
    ],
    how: {
      title: "MLEO 적립 방식",
      close: "닫기",
      s1t: "1) 실제로 얻는 것",
      s1p:
        "MLEO는 플레이를 통해 적립되는 유틸리티 토큰입니다. 진행하면서 게임 내 적격 결과의 일부가 MLEO로 변환될 수 있습니다. 변환은 가변적이며 공정성과 장기 안정성을 위해 설계되었고, 사전 고지 없이 변경될 수 있습니다.",
      s2t: "2) 변환(개요)",
      s2l: [
        "특정 게임 이벤트만 적립 대상입니다.",
        "내부 밸런싱 규칙을 사용하며, 정확한 수식이나 고정 비율은 공개하지 않습니다.",
        "소프트 캡 등 보호 장치로 인해 개인 일일 범위에 가까워질수록 적립이 점차 줄어듭니다.",
      ],
      s3t: "3) 일일 범위와 공정성",
      s3l: [
        "계정마다 남용 방지와 공정성을 위한 내부 일일 범위가 있습니다.",
        "해당 범위에 가까워질수록 그날의 신규 적립이 점차 완화됩니다.",
        "생태계 건강을 위해 범위와 속도는 시간이 지나며 조정될 수 있습니다.",
      ],
      s4t: "4) Vault & Claim",
      s4l: [
        "적립된 MLEO는 잔액으로 표시되며, 게임 내 Vault로 CLAIM할 수 있습니다.",
        "온체인 청구가 열릴 경우, 추가 잠금 해제 기간과 자격 확인이 적용될 수 있습니다.",
        "그 전까지는 앱 내 엔터테인먼트 용도의 유틸리티 잔액입니다.",
      ],
      s5t: "5) 부재 중 활동",
      s5l: [
        "오프라인 상태에서도 효율이 낮은 제한적 진행이 발생할 수 있습니다.",
        "행동은 동적으로 바뀔 수 있으며, 가벼운 보조일 뿐 플레이를 대체하지 않습니다.",
      ],
      s6t: "6) 중요 사항",
      s6l: [
        "가용성, 비율, 상한, 일정은 변경/일시중지/리셋될 수 있습니다.",
        "버그/악용/비정상 활동 대응을 위해 잔액 조정이 이뤄질 수 있습니다.",
        "투자 조언이 아닙니다. MLEO는 보장된 화폐 가치를 갖지 않습니다.",
      ],
      cta: "지금 시작",
    },
  },
};

// Game entry (unchanged)
const GAME_ENTRY_URL = "/play";

// Infer initial locale from ?lang, localStorage, or navigator
function getInitialLocale() {
  try {
    const qs = new URLSearchParams(window.location.search);
    const q = (qs.get("lang") || "").toLowerCase();
    if (q && T[q]) return q;
    const ls = localStorage.getItem("mleo_lang");
    if (ls && T[ls]) return ls;
    const nav = (navigator.language || "en").toLowerCase();
    const short = nav.slice(0, 2);
    if (T[short]) return short;
  } catch {}
  return "en";
}

export default function Home() {
  const [locale, setLocale] = useState("en");
  const [idx, setIdx] = useState(0);
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [mounted, setMounted] = useState(false); // for portals

  useEffect(() => {
    setMounted(true);
    const init = getInitialLocale();
    setLocale(init);
    try {
      // set html attributes for RTL/LTR
      document.documentElement.lang = init;
      document.documentElement.dir = init === "he" ? "rtl" : "ltr";
    } catch {}
  }, []);

  // rotate slogans
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % (T[locale]?.slogans?.length || 1)), 2800);
    return () => clearInterval(id);
  }, [locale]);

  // memoized dictionary
  const t = useMemo(() => T[locale] || T.en, [locale]);

  // switcher handler
  const onLangChange = (e) => {
    const v = e.target.value;
    setLocale(v);
    try {
      localStorage.setItem("mleo_lang", v);
      document.documentElement.lang = v;
      document.documentElement.dir = v === "he" ? "rtl" : "ltr";
      const url = new URL(window.location.href);
      url.searchParams.set("lang", v);
      window.history.replaceState({}, "", url.toString());
    } catch {}
  };

  return (
    <>
      <Head>
        <title>MLEO — {t.heroTitleLine1}</title>
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

      {/* BACKGROUND */}
      <main
        className="min-h-[var(--app-100vh,100vh)] relative overflow-hidden bg-[#0b0b0d] text-white"
      >
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
        <header className="relative z-10 max-w-6xl mx-auto px-5 pt-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img
              src="/images/leo-coin-gold.png"
              alt="MLEO"
              className="w-10 h-10 rounded-full object-contain"
            />
            <span className="text-xl font-bold tracking-wide">{t.brand}</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Language selector */}
            <select
              className="px-3 py-2 rounded-xl bg-white/10 border border-white/15 text-sm"
              value={locale}
              onChange={onLangChange}
              aria-label="Language"
              title="Language"
            >
              {Object.entries(SUPPORTED).map(([k, label]) => (
                <option key={k} value={k}>
                  {label}
                </option>
              ))}
            </select>

            <PWAInstall />

            <Link
              href={GAME_ENTRY_URL}
              className="hidden sm:inline-flex px-4 py-2 rounded-xl bg-yellow-400 text-black font-bold hover:bg-yellow-300 transition"
            >
              {t.startNow}
            </Link>
          </div>
        </header>

        {/* HERO */}
        <section className="relative z-10 max-w-6xl mx-auto px-5 pt-10 pb-20 sm:pt-16 sm:pb-28 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs mb-5">
              <span>{t.newBadge}</span>
              <span className="opacity-60">{t.earlyBadge}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
              {t.heroTitleLine1}
              <br />
              <span className="text-yellow-400">{t.heroTitleLine2}</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-white/80 max-w-xl">
              {(t.slogans || T.en.slogans)[idx]}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href={GAME_ENTRY_URL}
                className="px-6 py-3 rounded-2xl bg-yellow-400 text-black font-extrabold text-lg shadow hover:bg-yellow-300 transition"
              >
                {t.startNow}
              </Link>

              <button
                onClick={() => setShowHowItWorks(true)}
                className="px-6 py-3 rounded-2xl border border-white/20 font-semibold hover:bg-white/5 transition text-center"
              >
                {t.howItWorksBtn}
              </button>
            </div>

            {/* Trust bullets */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm text-white/70">
              {(t.bullets || T.en.bullets).map((b, i) => (
                <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10">
                  {b}
                </div>
              ))}
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
              <p className="mt-3 text-xs text-white/60 text-center">{t.teaserNote}</p>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="relative z-10 max-w-6xl mx-auto px-5 pb-10 text-xs text-white/50">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 justify-between">
            <div>{t.footerCopy(new Date().getFullYear())}</div>
            <div className="space-x-4">
              <a href="#" className="hover:text-white/80">
                {t.footerTerms}
              </a>
              <a href="#" className="hover:text-white/80">
                {t.footerPrivacy}
              </a>
              <a href="#" className="hover:text-white/80">
                {t.footerDocs}
              </a>
            </div>
          </div>
        </footer>
      </main>

      {/* HOW IT WORKS Modal via Portal */}
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
                <h2 className="text-2xl font-bold">{t.how.title}</h2>
                <button
                  onClick={() => setShowHowItWorks(false)}
                  className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20"
                  aria-label={t.how.close}
                  title={t.how.close}
                >
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-4 text-sm text-white/80">
                <section>
                  <h3 className="font-semibold text-white mb-1">{t.how.s1t}</h3>
                  <p>{t.how.s1p}</p>
                </section>

                <section>
                  <h3 className="font-semibold text-white mb-1">{t.how.s2t}</h3>
                  <ul className="list-disc ml-5 space-y-1">
                    {t.how.s2l.map((x, i) => (
                      <li key={i}>{x}</li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h3 className="font-semibold text-white mb-1">{t.how.s3t}</h3>
                  <ul className="list-disc ml-5 space-y-1">
                    {t.how.s3l.map((x, i) => (
                      <li key={i}>{x}</li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h3 className="font-semibold text-white mb-1">{t.how.s4t}</h3>
                  <ul className="list-disc ml-5 space-y-1">
                    {t.how.s4l.map((x, i) => (
                      <li key={i}>{x}</li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h3 className="font-semibold text-white mb-1">{t.how.s5t}</h3>
                  <ul className="list-disc ml-5 space-y-1">
                    {t.how.s5l.map((x, i) => (
                      <li key={i}>{x}</li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h3 className="font-semibold text-white mb-1">{t.how.s6t}</h3>
                  <ul className="list-disc ml-5 space-y-1">
                    {t.how.s6l.map((x, i) => (
                      <li key={i}>{x}</li>
                    ))}
                  </ul>
                </section>
              </div>

              <div className="px-6 pb-6 flex justify-end">
                <Link
                  href={GAME_ENTRY_URL}
                  className="px-5 py-2 rounded-xl bg-yellow-400 text-black font-extrabold hover:bg-yellow-300 transition"
                  onClick={() => setShowHowItWorks(false)}
                >
                  {t.how.cta}
                </Link>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
