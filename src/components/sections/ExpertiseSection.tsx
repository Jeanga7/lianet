"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Target, FlaskConical } from "lucide-react";

interface Pole {
  id: "talent" | "strategy" | "lab";
  title: string;
  description: string;
  tags: string;
  color: string;
  bgColor: string;
  icon: typeof Users;
}

const poles: Pole[] = [
  {
    id: "talent",
    title: "Talent Solutions",
    description:
      "Nous ne nous contentons pas de trouver des profils ; nous bâtissons des équipes de choc. Accédez au top 3% des experts digitaux africains pour propulser vos développements techniques et vos designs d'interface.",
    tags: "Staff Augmentation • Recrutement Expert • Agilité",
    color: "#1B365D", // Bleu Profond
    bgColor: "bg-primary",
    icon: Users,
  },
  {
    id: "strategy",
    title: "Digital Strategy",
    description:
      "Le digital n'est pas une option, c'est votre moteur de croissance. Nos consultants dessinent la feuille de route de votre transformation, de l'audit initial au déploiement de solutions scalables et sécurisées.",
    tags: "Conseil • Roadmap • ROI Mesurable",
    color: "#40B4A6", // Turquoise Vibrant
    bgColor: "bg-secondary",
    icon: Target,
  },
  {
    id: "lab",
    title: "Innovation Lab",
    description:
      "Le laboratoire où les idées deviennent des produits. Nous incubons des projets disruptifs et explorons les technologies émergentes (IA, Web3, IoT) pour maintenir votre entreprise à l'avant-garde du marché.",
    tags: "R&D • Prototypage rapide • Futurisme",
    color: "#FFFFFF", // Blanc
    bgColor: "bg-background",
    icon: FlaskConical,
  },
];

const ExpertiseSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activePole = poles[activeIndex];

  // Auto-fade entre les pôles (peut être désactivé si besoin)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % poles.length);
    }, 9000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative flex h-full w-full items-center justify-center overflow-hidden">
      {/* Fond dynamique qui change selon le pôle actif */}
      <motion.div
        className={`absolute inset-0 ${activePole.bgColor}`}
        key={activePole.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />

      {/* Slide unique avec transition entre les pôles */}
      <div className="relative flex h-full w-full items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePole.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 max-w-4xl px-8 text-center"
          >
            <div className="mb-6 flex items-center justify-center gap-3 text-sm font-semibold tracking-[0.2em] uppercase text-foreground/60">
              <span>01 — Expertise</span>
            </div>

            <motion.h3
              className="text-5xl font-bold leading-tight tracking-tighter md:text-6xl lg:text-7xl"
              style={{ color: activePole.color }}
            >
              {activePole.title}
            </motion.h3>

            <motion.p
              className="mt-6 text-lg font-light leading-relaxed md:text-xl"
              style={{ color: activePole.color }}
            >
              {activePole.description}
            </motion.p>

            <motion.p
              className="mt-4 text-sm font-medium tracking-wide opacity-80"
              style={{ color: activePole.color }}
            >
              {activePole.tags}
            </motion.p>
          </motion.div>
        </AnimatePresence>

        {/* Motif iconique en arrière-plan */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activePole.id}-icon`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.16, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <activePole.icon className="h-80 w-80 opacity-10" style={{ color: activePole.color }} />
          </motion.div>
        </AnimatePresence>

        {/* Onglets / puces de navigation interne */}
        <div className="absolute bottom-16 left-1/2 z-20 flex -translate-x-1/2 items-center gap-4">
          {poles.map((pole, index) => (
            <button
              key={pole.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className="group flex flex-col items-center gap-2 focus-visible:outline-none"
            >
              <span
                className={`h-2.5 w-2.5 rounded-full transition-all ${
                  activeIndex === index ? "bg-secondary scale-125" : "bg-foreground/30 group-hover:bg-secondary/60"
                }`}
              />
              <span
                className={`text-xs uppercase tracking-[0.16em] ${
                  activeIndex === index ? "text-foreground" : "text-foreground/60"
                }`}
              >
                {index + 1}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
