"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const FloatingBubbles = () => {
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
    <div className="absolute inset-0 z-0">
      {bubbles.map((bubble, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-white-1 opacity-50"
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
  );
};

export default FloatingBubbles;
