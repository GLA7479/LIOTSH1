// pages/mleo-miners.js
export async function getServerSideProps() {
  return {
    redirect: { destination: "/play", permanent: false },
  };
}
export default function LegacyRedirect() {
  if (typeof window !== "undefined") {
    window.location.replace("/play");
  }
  return null;
}
