"use client";

import { motion, useScroll, useTransform } from "framer-motion";

const MobileBackgroundPattern = () => {
  const { scrollY } = useScroll();
  
  // Parallax léger pour la liane
  const lianeY = useTransform(scrollY, [0, 500], [0, -30]);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden lg:hidden" aria-hidden="true">
      {/* Gradient radial animé */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at 30% 50%, rgba(143, 214, 204, 0.25) 0%, rgba(143, 214, 204, 0.15) 30%, rgba(143, 214, 204, 0.08) 50%, rgba(255, 255, 255, 0) 70%)",
          }}
          animate={{
            background: [
              "radial-gradient(circle at 30% 50%, rgba(143, 214, 204, 0.25) 0%, rgba(143, 214, 204, 0.15) 30%, rgba(143, 214, 204, 0.08) 50%, rgba(255, 255, 255, 0) 70%)",
              "radial-gradient(circle at 35% 55%, rgba(143, 214, 204, 0.3) 0%, rgba(143, 214, 204, 0.18) 30%, rgba(143, 214, 204, 0.1) 50%, rgba(255, 255, 255, 0) 70%)",
              "radial-gradient(circle at 30% 50%, rgba(143, 214, 204, 0.25) 0%, rgba(143, 214, 204, 0.15) 30%, rgba(143, 214, 204, 0.08) 50%, rgba(255, 255, 255, 0) 70%)",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
      {/* Motif 1 : Liane stylisée (bas droite) - Accentuée */}
      <motion.svg
        className="absolute bottom-0 right-0 h-[600px] w-[400px]"
        viewBox="0 0 400 600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{ y: lianeY }}
      >
        {/* Liane principale - plus visible */}
        <motion.path
          d="M 20 550 Q 120 450, 200 400 T 320 350 Q 360 330, 400 310"
          fill="none"
          stroke="#8FD6CC"
          strokeWidth="2.5"
          opacity="0.4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* Branche secondaire */}
        <motion.path
          d="M 200 400 Q 260 360, 300 330 Q 340 300, 380 280"
          fill="none"
          stroke="#8FD6CC"
          strokeWidth="2"
          opacity="0.35"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* Branche tertiaire */}
        <motion.path
          d="M 300 330 Q 320 310, 340 290"
          fill="none"
          stroke="#8FD6CC"
          strokeWidth="1.5"
          opacity="0.3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 1, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* Branche supplémentaire pour remplir l'espace vide (bas gauche) */}
        <motion.path
          d="M 50 500 Q 100 480, 150 460 Q 200 440, 250 420"
          fill="none"
          stroke="#8FD6CC"
          strokeWidth="2"
          opacity="0.3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* Branche pour le milieu droit */}
        <motion.path
          d="M 250 420 Q 280 400, 320 380"
          fill="none"
          stroke="#8FD6CC"
          strokeWidth="1.5"
          opacity="0.25"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.6, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* Petites feuilles/branches pour densifier */}
        <motion.path
          d="M 150 460 Q 170 450, 180 440"
          fill="none"
          stroke="#40B4A6"
          strokeWidth="1"
          opacity="0.3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.path
          d="M 320 350 Q 330 340, 340 330"
          fill="none"
          stroke="#40B4A6"
          strokeWidth="1"
          opacity="0.3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.svg>

    </div>
  );
};

export default MobileBackgroundPattern;
