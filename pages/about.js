<<<<<<< HEAD
import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

export default function About() {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;800&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Header />
      <motion.main
        className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden px-6 pt-28"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        {/* 🔹 רקע וידאו */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
          src="/videos/home-bg.mp4"
        />

        <div className="relative z-10 w-full max-w-6xl bg-black/40 p-6 rounded-xl backdrop-blur-sm">

          {/* 🔹 חלק פתיחה */}
=======
import Layout from "../components/Layout";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <Layout page="about">
      {/* 🎥 וידאו ברקע */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/about-bg.mp4" type="video/mp4" />
      </video>

      <motion.main
        className="relative min-h-screen flex flex-col items-center text-white p-0 m-0 overflow-hidden pt-0 mt-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-black/50 z-10"></div>

        <div className="relative z-20 w-full max-w-6xl p-6 rounded-xl">
>>>>>>> f2198a3 (Auto update and deploy)
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
            <div className="flex-shrink-0">
              <Image
                src="/images/lio.png"
                alt="LIO the Shiba Inu"
                width={300}
                height={300}
<<<<<<< HEAD
                className="rounded-2xl shadow-lg border-2 border-cyan-300"
              />
            </div>
            <div className="text-center md:text-left max-w-xl">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]">
                About LIOSH Token
              </h1>
              <p className="text-lg md:text-xl mb-4 text-cyan-100 drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]">
                LIOSH Token is a next-generation meme cryptocurrency inspired by{" "}
                <span className="text-purple-300 font-semibold">LIO</span>, a playful and loyal Shiba Inu.
              </p>
              <p className="text-lg md:text-xl text-cyan-100 drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]">
                The project blends meme culture with real utility – staking, presale opportunities, NFTs,
                and ecosystem features for long-term value.
=======
                className="rounded-2xl border-2 border-cyan-300 shadow-lg"
              />
            </div>

            <div className="text-center md:text-left max-w-xl">
              <motion.h1
                className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                Meet LIO – The Real Shiba Inu Behind LIOSH
              </motion.h1>

              <p className="text-lg md:text-xl mb-4 text-cyan-100">
                LIO is our playful and loyal 3-year-old Shiba Inu – the heart and soul of LIOSH Token.
                His charm and energy inspired the creation of a meme coin that combines fun, community power,
                and real crypto utility.
              </p>

              <p className="text-lg md:text-xl text-cyan-100">
                LIOSH is the only meme coin truly backed by a real Shiba Inu mascot, making it unique,
                authentic, and full of personality!
>>>>>>> f2198a3 (Auto update and deploy)
              </p>
            </div>
          </div>

<<<<<<< HEAD
          {/* 🔹 Mission & Vision */}
          <section className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-md">
              🌟 Our Mission & Vision
            </h2>
            <p className="text-lg text-cyan-100 max-w-3xl mx-auto drop-shadow-[0_0_6px_rgba(0,0,0,0.8)] mb-4">
              Our mission is to build a fun, strong, and rewarding crypto community inspired by LIO.
              We aim to combine entertainment, utility, and community-driven growth.
            </p>
            <p className="text-lg text-cyan-100 max-w-3xl mx-auto drop-shadow-[0_0_6px_rgba(0,0,0,0.8)]">
=======
          {/* Mission Section */}
          <section className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              🌟 Our Mission & Vision
            </h2>
            <p className="text-lg md:text-xl text-cyan-100 max-w-3xl mx-auto mb-4">
              Our mission is to build a fun, strong, and rewarding crypto community inspired by LIO.
              We aim to combine entertainment, utility, and community-driven growth.
            </p>
            <p className="text-lg md:text-xl text-cyan-100 max-w-3xl mx-auto">
>>>>>>> f2198a3 (Auto update and deploy)
              Our vision is to make LIOSH Token the next big meme coin with staking, partnerships,
              NFTs, and metaverse integration.
            </p>
          </section>

<<<<<<< HEAD
          {/* 🔹 Why LIOSH */}
=======
          {/* Why Choose Section */}
>>>>>>> f2198a3 (Auto update and deploy)
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-300 to-cyan-400 bg-clip-text text-transparent">
              🚀 Why Choose LIOSH?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              {[
                { title: "Strong Community", text: "A loyal and growing community driven by the spirit of LIO." },
                { title: "Real Utility", text: "Staking rewards, presale benefits, and future NFT integrations." },
                { title: "Fun & Value", text: "A meme coin that is both fun and built for long-term growth." }
              ].map((item, i) => (
<<<<<<< HEAD
                <div key={i} className="bg-gray-900/60 p-6 rounded-xl shadow-lg hover:scale-105 transition">
                  <h3 className="text-xl font-bold text-purple-300 mb-2">{item.title}</h3>
                  <p className="text-cyan-100">{item.text}</p>
                </div>
=======
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-900/60 p-6 rounded-xl shadow-md"
                >
                  <h3 className="text-xl font-bold text-purple-300 mb-2">{item.title}</h3>
                  <p className="text-cyan-100">{item.text}</p>
                </motion.div>
>>>>>>> f2198a3 (Auto update and deploy)
              ))}
            </div>
          </section>

<<<<<<< HEAD
          {/* 🔹 Mini Roadmap */}
          <section className="mb-8">
=======
          {/* Roadmap Section */}
          <section>
>>>>>>> f2198a3 (Auto update and deploy)
            <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              📅 Mini Roadmap
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center mb-8">
              {[
                { phase: "Phase 1", text: "Token Launch, Website, Community Building" },
                { phase: "Phase 2", text: "Presale, Marketing Campaigns, Early Partnerships" },
                { phase: "Phase 3", text: "Exchange Listings, Staking Launch" },
                { phase: "Phase 4", text: "NFTs, Metaverse, Major Partnerships" }
              ].map((phase, i) => (
<<<<<<< HEAD
                <div key={i} className="p-6 bg-gray-900/60 rounded-xl shadow-lg hover:scale-105 transition">
                  <h3 className="text-xl font-bold text-yellow-300 mb-2">{phase.phase}</h3>
                  <p className="text-cyan-100">{phase.text}</p>
                </div>
              ))}
            </div>

            {/* 🔹 כפתור Join Presale */}
            <div className="text-center">
              <Link href="/presale">
                <button className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 px-8 py-4 rounded-xl text-lg font-bold text-black hover:scale-105 transition shadow-lg">
=======
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="p-6 bg-gray-900/60 rounded-xl shadow-md"
                >
                  <h3 className="text-xl font-bold text-yellow-300 mb-2">{phase.phase}</h3>
                  <p className="text-cyan-100">{phase.text}</p>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <Link href="/presale">
                <button className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 px-8 py-4 rounded-xl text-lg font-bold text-black hover:scale-105 transition">
>>>>>>> f2198a3 (Auto update and deploy)
                  🚀 Join Presale
                </button>
              </Link>
            </div>
          </section>
        </div>
      </motion.main>
<<<<<<< HEAD
      <Footer />
    </>
=======
    </Layout>
>>>>>>> f2198a3 (Auto update and deploy)
  );
}
