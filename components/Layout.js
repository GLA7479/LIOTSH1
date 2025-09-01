import Head from "next/head";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>MLEO Miners</title>
        <meta name="viewport"
              content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#0b1220" />
        {/* iOS PWA */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </Head>
      {children}
    </>
  );
}
