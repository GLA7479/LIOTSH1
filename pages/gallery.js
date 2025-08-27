import { useState, useEffect } from "react";
<<<<<<< HEAD
import Header from "../components/Header";
import Footer from "../components/Footer";
=======
>>>>>>> f2198a3 (Auto update and deploy)
import { motion } from "framer-motion";
import Layout from "../components/Layout";

export default function Gallery() {
  const [items, setItems] = useState([]);
<<<<<<< HEAD

  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => {
        const images = data.images.map((src) => ({ type: "image", src }));
        const videos = data.videos.map((src) => ({ type: "video", src }));
        setItems([...images, ...videos]);
      });
  }, []);

  const [selectedIndex, setSelectedIndex] = useState(null);
  const openModal = (i) => setSelectedIndex(i);
  const closeModal = () => setSelectedIndex(null);
  const prevItem = () =>
    setSelectedIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  const nextItem = () =>
    setSelectedIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
=======
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => {
        const images = data.images.map((src) => ({ type: "image", src }));
        const videos = data.videos.map((src) => ({ type: "video", src }));
        setItems([...images, ...videos]);
      });
  }, []);

  const openModal = (i) => setSelectedIndex(i);
  const closeModal = () => setSelectedIndex(null);
  const prevItem = () => setSelectedIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  const nextItem = () => setSelectedIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
>>>>>>> f2198a3 (Auto update and deploy)

  return (
    <Layout page="gallery">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover -z-10"
      >
        <source src="/videos/gallery-bg.mp4" type="video/mp4" />
      </video>

      <motion.main
<<<<<<< HEAD
        className="relative min-h-screen flex flex-col items-center justify-center p-6 text-white"
=======
        className="relative min-h-screen flex flex-col items-center p-6 text-white overflow-hidden"
>>>>>>> f2198a3 (Auto update and deploy)
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
<<<<<<< HEAD
        {/* ✅ רקע וידאו */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover -z-10"
          src="/videos/background.mp4"
        />
        <div className="absolute inset-0 bg-black/30 -z-10"></div>

        <h1 className="text-4xl text-yellow-400 mb-6 font-bold drop-shadow-lg">
          🐾 LIOSH Gallery
        </h1>

        {items.length === 0 ? (
          <p className="text-gray-200">Loading gallery...</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="cursor-pointer rounded-lg overflow-hidden hover:scale-105 transform transition relative"
                onClick={() => openModal(index)}
              >
                {item.type === "image" ? (
                  <img
                    src={item.src}
                    alt={`media-${index}`}
                    className="w-40 h-40 object-cover"
                  />
                ) : (
                  <>
                    <video
                      src={item.src}
                      className="w-40 h-40 object-cover"
                      muted
                      playsInline
                    />
                    <span className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 text-xs rounded">
                      🎥 Video
                    </span>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* ✅ Modal */}
        {selectedIndex !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
            <motion.div
              className="relative max-w-4xl max-h-[90vh]"
=======
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 -z-10"></div>

        <motion.h1
          className="text-5xl sm:text-6xl font-extrabold mb-3 flex items-center gap-3 text-center drop-shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <span>🐾</span>
          <span className="bg-gradient-to-r from-yellow-300 via-yellow-500 to-orange-500 bg-clip-text text-transparent">
            LIOSH Gallery
          </span>
        </motion.h1>

        <motion.p
          className="text-lg text-gray-300 max-w-2xl text-center mb-8"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Explore the best moments of Lio – The Real Shiba Inu! Photos, videos, and exclusive highlights.
        </motion.p>

        {items.length === 0 ? (
          <p className="text-gray-400 text-xl">Loading gallery...</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.8, delay: index * 0.05 }}
                whileHover={{ scale: 1.08 }}
                className="cursor-pointer rounded-xl overflow-hidden shadow-lg hover:shadow-yellow-400/50 border border-gray-700"
                onClick={() => openModal(index)}
              >
                {item.type === "image" ? (
                  <img src={item.src} alt={`media-${index}`} className="w-44 h-44 object-cover" />
                ) : (
                  <video src={item.src} className="w-44 h-44 object-cover" muted playsInline />
                )}
              </motion.div>
            ))}
          </div>
        )}

        {selectedIndex !== null && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <motion.div
              className="relative max-w-5xl w-full max-h-[90vh]"
>>>>>>> f2198a3 (Auto update and deploy)
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {items[selectedIndex].type === "image" ? (
<<<<<<< HEAD
                <img
                  src={items[selectedIndex].src}
                  className="max-h-[90vh] rounded-lg"
                />
=======
                <img src={items[selectedIndex].src} className="w-full max-h-[80vh] object-contain rounded-xl shadow-xl" />
>>>>>>> f2198a3 (Auto update and deploy)
              ) : (
                <video
                  src={items[selectedIndex].src}
                  autoPlay
                  controls
                  className="w-full max-h-[80vh] object-contain rounded-xl shadow-xl"
                />
              )}

<<<<<<< HEAD
              {/* כפתור סגירה */}
=======
>>>>>>> f2198a3 (Auto update and deploy)
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
              >
                ✖
              </button>
<<<<<<< HEAD

              {/* ניווט */}
=======
>>>>>>> f2198a3 (Auto update and deploy)
              <button
                onClick={prevItem}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-red-500 text-white px-3 py-2 text-2xl rounded-full hover:bg-red-600"
              >
                ⬅
              </button>
              <button
                onClick={nextItem}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-red-500 text-white px-3 py-2 text-2xl rounded-full hover:bg-red-600"
              >
                ➡
              </button>
            </motion.div>
          </div>
        )}
      </motion.main>
    </Layout>
  );
}
