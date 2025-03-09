"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface Page {
  type: "intro" | "content";
  text: string;
  image?: string;
}

interface Star {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
}

const generateStars = (count: number): Star[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 3 + 2,
  }));
};

export default function Home() {
  const [stars, setStars] = useState<Star[]>([]);
  const [mounted, setMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setStars(generateStars(50));
    setMounted(true);
  }, []);

  const pages: Page[] = [
    {
      type: "intro",
      text: "Happy Birthday, Rits! 🎉💖 Tumhari zindagi khushiyon, pyaar aur safalta se bhari rahe. Har sapna sach ho aur har din khoobsurat ho! ✨🎂💐",
    },
    {
      type: "content",
      text: "Janti ho! Tumse baat karna aur tumhe text karna ek alag hi ehsaas dilata hai. Tumhari maujudgi kuch khas hai, jo main bohot pasand karta hoon. 💖✨",
      image: "/j_anime.png",
    },
    {
      type: "content",
      text: "Tum jiyo hazaron saal, har saal ke din ho pachaas hazaar!",
      image: "/j2.png",
    },
    {
      type: "content",
      text: `🌸 Phoolon ki tarah mehka kare jeevan tumhara,
              Sitaron ki tarah chamka kare aangan tumhara,
              Dua hai meri is rab se,
              Har janamdin ho sabse pyaara tumhara! 🎉🎁✨`,
      image: "/j31.jpg",
    },
  ];

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-black overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-black">
          {stars.map((star) => (
            <motion.div
              key={star.id}
              className="absolute rounded-full bg-white"
              initial={{ opacity: 0.1 }}
              animate={{
                opacity: [0.1, 1, 0.1],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: star.duration,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 space-y-4">
        {pages.map((_, index) => (
          <motion.button
            key={index}
            className={`w-3 h-3 rounded-full ${currentPage === index ? "bg-white" : "bg-white/50"
              }`}
            onClick={() => {
              const element = document.getElementById(`page-${index}`);
              element?.scrollIntoView({ behavior: "smooth" });
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>

      {/* Content Pages */}
      {pages.map((page, index) => (
        <motion.section
          key={index}
          id={`page-${index}`}
          className="min-h-screen w-full flex items-center justify-center p-4 sm:p-8 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, margin: "-20%" }}
          onViewportEnter={() => setCurrentPage(index)}
        >
          {page.type === "intro" ? (
            // Intro page with centered text
            <motion.div
              className="max-w-4xl w-full bg-[#f5e6d3] rounded-lg shadow-2xl border-t-8 border-r-8 border-[#2a1810] overflow-hidden p-12"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="text-center space-y-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {page.text.split("\n").map((line, i) => (
                  <div
                    key={i}
                    className={`font-serif ${i === 0
                        ? "text-4xl md:text-5xl font-bold"
                        : "text-2xl md:text-3xl"
                      } text-[#2a1810]`}
                  >
                    {line}
                  </div>
                ))}
                <motion.div
                  className="text-[#2a1810] text-lg mt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  Scroll down to begin ↓
                </motion.div>
              </motion.div>
            </motion.div>
          ) : (
            // Regular content pages
            <div className="max-w-6xl w-full bg-[#f5e6d3] rounded-lg shadow-2xl border-t-8 border-r-8 border-[#2a1810] overflow-hidden">
              <div className="flex flex-col md:flex-row min-h-[600px]">
                {/* Image Section */}
                <motion.div
                  className="w-full md:w-1/2 relative aspect-square md:aspect-auto"
                  initial={{ x: -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <Image
                    src={page.image!}
                    alt={`Illustration ${index}`}
                    fill
                    className="object-cover"
                    priority={index === 1}
                  />
                </motion.div>

                {/* Text Section */}
                <motion.div
                  className="w-full md:w-1/2 p-8 flex flex-col justify-center"
                  initial={{ x: 50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="font-serif text-xl sm:text-2xl leading-relaxed text-[#2a1810]">
                    {page.text}
                  </div>

                  {/* Form on second last page */}
                  {index === pages.length - 2 && (
                    <motion.form
                      className="mt-8 space-y-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      <p className="mt-4 text-[#2a1810] font-serif">
                        Wishing you a very very beautiful happy birthday!
                      </p>
                    </motion.form>
                  )}
                </motion.div>
              </div>
            </div>
          )}
        </motion.section>
      ))}
    </main>
  );
}
