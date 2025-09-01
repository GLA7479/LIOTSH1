// lib/wagmi.js
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { cookieStorage, createStorage, http } from "wagmi";
import { mainnet, polygon, arbitrum, base, optimism, sepolia } from "wagmi/chains";

// Fallback ידידותי כדי שלא תראה 500 אם ה-ENV לא נטען עדיין
const WC_PROJECT_ID =
  process.env.NEXT_PUBLIC_WC_PROJECT_ID?.trim() ||
  "be3ad62c2aa9264ea256b81e4c1da41d";

if (!process.env.NEXT_PUBLIC_WC_PROJECT_ID) {
  // לא עוצר את האפליקציה; רק מזהיר
  console.warn(
    "[wagmi] NEXT_PUBLIC_WC_PROJECT_ID לא הוגדר – משתמש ב-fallback לפיתוח."
  );
}

export const wagmiConfig = getDefaultConfig({
  appName: "MLEO Miners",
  projectId: WC_PROJECT_ID,
  chains: [mainnet, polygon, arbitrum, base, optimism, sepolia],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [arbitrum.id]: http(),
    [base.id]: http(),
    [optimism.id]: http(),
    [sepolia.id]: http(),
  },
  ssr: true,
  storage: createStorage({ storage: cookieStorage }),
});
