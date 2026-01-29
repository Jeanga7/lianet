"use client";

import { motion, useScroll, useTransform } from "framer-motion";

const BackgroundEffects = () => {
  // Scroll progress pour transitions de couleur
  const { scrollYProgress } = useScroll();
  
  // Transition de couleur : Bleu Profond → Turquoise au scroll
  const blueOrbColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      "rgba(27, 54, 93, 0.3)", // Bleu Profond initial
      "rgba(64, 180, 166, 0.25)", // Transition vers Turquoise
      "rgba(64, 180, 166, 0.3)", // Turquoise final
    ]
  );


  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
      {/* Orbe Turquoise */}
      <motion.div
        className="absolute rounded-full blur-3xl opacity-30"
        style={{
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(64, 180, 166, 0.4), transparent 70%)",
          left: "20%",
          top: "30%",
        }}
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -40, 20, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Orbe Bleu - Transition vers Turquoise au scroll */}
      <motion.div
        className="absolute rounded-full blur-3xl opacity-25"
        style={{
          width: "500px",
          height: "500px",
          background: useTransform(blueOrbColor, (color) => 
            `radial-gradient(circle, ${color}, transparent 70%)`
          ),
          right: "15%",
          bottom: "25%",
        }}
        animate={{
          x: [0, -25, 15, 0],
          y: [0, 35, -25, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Orbe Turquoise Clair */}
      <motion.div
        className="absolute rounded-full blur-3xl opacity-20"
        style={{
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(143, 214, 204, 0.35), transparent 70%)",
          left: "50%",
          top: "60%",
        }}
        animate={{
          x: [0, 20, -15, 0],
          y: [0, -30, 25, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default BackgroundEffects;
