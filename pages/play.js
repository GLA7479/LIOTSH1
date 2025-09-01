import dynamic from "next/dynamic";

// נטען בלי SSR כדי לעבוד טוב עם Canvas/Audio/localStorage
const Game = dynamic(() => import("../game/mleo-miners"), { ssr: false });

export default function PlayPage() {
  return <Game />;
}