"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface PageWipeProps {
  isActive: boolean;
  targetUrl: string | null;
  color?: string;
  onComplete?: () => void;
}

const PageWipe = ({ isActive, targetUrl, color = "#40B4A6", onComplete }: PageWipeProps) => {
  const router = useRouter();

  useEffect(() => {
    if (isActive && targetUrl) {
      const timer = setTimeout(() => {
        if (targetUrl.startsWith("/")) {
          router.push(targetUrl);
        } else {
          window.location.href = targetUrl;
        }
        if (onComplete) {
          onComplete();
        }
      }, 800); // Durée de l'animation

      return () => clearTimeout(timer);
    }
  }, [isActive, targetUrl, router, onComplete]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0)" }}
          exit={{ clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] pointer-events-none"
          style={{ backgroundColor: color }}
        />
      )}
    </AnimatePresence>
  );
};

export default PageWipe;
