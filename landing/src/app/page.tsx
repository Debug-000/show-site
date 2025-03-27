"use client";
import { useEffect, useState } from "react";
import Companies from "./home/Companies";
import FAQ from "./home/FAQ";
import Footer from "./home/Footer";
import Header from "./home/Header";
import KeyFeatures from "./home/KeyFeatures";
import Navbar from "./home/Navbar";
import Showing from "./home/Showing";
import Testimonials from "./home/Testimonials";
import { motion } from "framer-motion";
import Blog from "./home/Blog";
import BackToTopButton from "./SmallComp/BackToTop";

export default function Home() {
  interface Bubble {
    size: number;
    positionX: number;
    positionY: number;
    animationDuration: number;
    animationDelay: number;
  }

  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    const newBubbles = Array.from({ length: 10 }).map(() => ({
      size: Math.random() * 50 + 20,
      positionX: Math.random() * 100,
      positionY: Math.random() * 100,
      animationDuration: Math.random() * 4 + 4,
      animationDelay: Math.random() * 2,
    }));

    setBubbles(newBubbles);
  }, []);
  return (
    <div className="max-w-screen">
      <div className="flex justify-between items-center px-[10rem] w-full fixed top-0 z-[-1]">
        <div className="w-[2px] bg-neutral-100 h-screen"></div>
        <div className="w-[2px] bg-neutral-100 h-screen"></div>
        <div className="w-[2px] bg-neutral-100 h-screen"></div>
        <div className="w-[2px] bg-neutral-100 h-screen"></div>
      </div>
      <Navbar />

      <div className="bg-neutral-100 clip-path h-fit rounded-[1.5rem] max-w-[1440px] mx-auto">
        <Header />
      </div>
      <Companies />
      <KeyFeatures />
      <div className="bg-[#282f3d]">
        <Showing />
      </div>
      <FAQ />
      <div className="relative bg-blue-700">
        <div className="absolute inset-0 z-0">
          {bubbles.map((bubble, index) => (
            <motion.div
              key={index}
              className="absolute rounded-full bg-white opacity-50"
              style={{
                width: bubble.size,
                height: bubble.size,
                top: `${bubble.positionY}%`,
                left: `${bubble.positionX}%`,
              }}
              initial={{
                y: 0,
                opacity: 0.5,
                scale: 1,
              }}
              animate={{
                y: ["0%", "500%"],
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.5, 1],
              }}
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                duration: bubble.animationDuration,
                delay: bubble.animationDelay,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
        <div className="relative z-10">
          <Testimonials />
        </div>
      </div>
      <Blog />
      <Footer />
      <BackToTopButton />
    </div>
  );
}
