"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence, Variants, useMotionValue, useSpring, useScroll, useTransform, useInView } from "framer-motion";
import { Users, Target, FlaskConical, ArrowRight } from "lucide-react";
import PageWipe from "@/components/ui/PageWipe";
import BackgroundEffects from "./BackgroundEffects";
import FilmGrain from "./FilmGrain";

interface Pole {
  id: "talent" | "strategy" | "lab";
  number: string;
  shortTitle: string;
  title: string;
  slogan: string;
  description: string;
  subServices: string[];
  buttonText: string;
  buttonHref: string;
  icon: typeof Users;
  canvasBg?: string;
}

const poles: Pole[] = [
    {
      id: "talent",
    number: "01",
    shortTitle: "TALENT",
      title: "Talent Solutions",
    slogan: "L'élite digitale africaine au service de vos ambitions.",
      description:
        "Nous ne nous contentons pas de trouver des profils ; nous bâtissons des équipes de choc. Accédez au top 3% des experts digitaux africains pour propulser vos développements techniques et vos designs d'interface.",
    subServices: [
      "Recrutement Top Management",
      "Staff Augmentation",
      "Headhunting Technologique",
      "Gestion de Carrière d'Excellence",
    ],
    buttonText: "Explorer nos Talents",
    buttonHref: "/solutions/talent",
      icon: Users,
    },
    {
      id: "strategy",
    number: "02",
    shortTitle: "STRATEGY",
      title: "Digital Strategy",
    slogan: "Transformer votre vision en leadership de marché.",
      description:
        "Le digital n'est pas une option, c'est votre moteur de croissance. Nos consultants dessinent la feuille de route de votre transformation, de l'audit initial au déploiement de solutions scalables et sécurisées.",
    subServices: [
      "Conseil en Transformation Digitale",
      "Audit & Roadmap Stratégique",
      "Optimisation de la Performance",
      "Ingénierie de Processus",
    ],
    buttonText: "Consulter nos Stratégies",
    buttonHref: "/solutions/strategy",
      icon: Target,
    canvasBg: "bg-blue-50/30",
    },
    {
      id: "lab",
    number: "03",
    shortTitle: "LAB",
      title: "Innovation Lab",
    slogan: "Expérimenter aujourd'hui les technologies de demain.",
      description:
        "Le laboratoire où les idées deviennent des produits. Nous incubons des projets disruptifs et explorons les technologies émergentes (IA, Web3, IoT) pour maintenir votre entreprise à l'avant-garde du marché.",
    subServices: [
      "Développement MVP",
      "Design Sprint & UX Avancée",
      "Architecture IA & Data",
      "Prototypage de Solutions",
    ],
    buttonText: "Entrer dans le Lab",
    buttonHref: "/solutions/lab",
      icon: FlaskConical,
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Composant MagneticTitle pour l'effet magnétique
interface MagneticTitleProps {
  children: React.ReactNode;
  className?: string;
  animate?: {
    color?: string;
  };
  transition?: {
    duration?: number;
  };
}

const MagneticTitle = ({ children, className, animate, transition }: MagneticTitleProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLHeadingElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distance = Math.sqrt(
      Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
    );
    const force = Math.min(30 / Math.max(distance, 1), 1);
    x.set((e.clientX - centerX) * force * 0.1);
    y.set((e.clientY - centerY) * force * 0.1);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.h2
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={animate}
      transition={transition}
    >
      {children}
    </motion.h2>
  );
};

// Composant CanvasCard pour l'Assemblage Magnétique Desktop
interface CanvasCardProps {
  pole: Pole;
  hoveredService: number | null;
  setHoveredService: (idx: number | null) => void;
  handleSubServiceClick: (service: string) => void;
  handleKeyDown: (e: React.KeyboardEvent, action: () => void) => void;
  handleButtonClick: (href: string) => void;
  isLoading: boolean;
  isTransitioning: boolean;
  glowPosition: { x: number; y: number };
}

const CanvasCard = ({
  pole,
  hoveredService,
  setHoveredService,
  handleSubServiceClick,
  handleKeyDown,
  handleButtonClick,
  isLoading,
  isTransitioning,
  glowPosition,
}: CanvasCardProps) => {
  const cardRef = useRef<HTMLElement>(null);
  const isInView = useInView(cardRef, { 
    once: false,
    amount: 0.5,
  });

  const springConfig = { stiffness: 100, damping: 20 };

  // Parallaxe interne : motion values pour le titre massif en arrière-plan
  const titleParallaxX = useMotionValue(0);
  const titleParallaxY = useMotionValue(0);
  const titleSpringX = useSpring(titleParallaxX, { stiffness: 150, damping: 25 });
  const titleSpringY = useSpring(titleParallaxY, { stiffness: 150, damping: 25 });

  // Suivre la position de la souris sur la carte pour la parallaxe
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) / rect.width;
      const deltaY = (e.clientY - centerY) / rect.height;
      
      // Le titre massif bouge plus lentement (facteur 0.3) que le texte de devant
      titleParallaxX.set(deltaX * 30);
      titleParallaxY.set(deltaY * 30);
    };

    const handleMouseLeave = () => {
      titleParallaxX.set(0);
      titleParallaxY.set(0);
    };

    const card = cardRef.current;
    if (card) {
      card.addEventListener("mousemove", handleMouseMove, { passive: true });
      card.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (card) {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [titleParallaxX, titleParallaxY]);

  // Courbes organiques pour transitions entre pôles
  const getPathForPole = (poleId: string) => {
    switch (poleId) {
      case "talent":
        return "M 0 50 Q 25 30 50 50 T 100 50"; // Courbe vers le bas
      case "strategy":
        return "M 0 50 Q 25 70 50 50 T 100 50"; // Courbe vers le haut
      case "lab":
        return "M 0 50 Q 50 20 50 50 Q 50 80 100 50"; // Courbe circulaire
      default:
        return "M 0 50 L 100 50"; // Ligne droite par défaut
    }
  };

  return (
    <motion.article
      ref={cardRef}
      key={pole.id}
      initial={{ y: 100, opacity: 0, scale: 0.95 }}
      animate={{ 
        y: 0, 
        opacity: 1,
        scale: 1,
        borderColor: isInView ? "rgba(64, 180, 166, 0.5)" : "rgba(64, 180, 166, 0.05)",
        filter: isInView 
          ? "drop-shadow(0 0 15px rgba(64, 180, 166, 0.3))" 
          : "drop-shadow(0 0 0px rgba(64, 180, 166, 0))",
      }}
      exit={{ y: -100, opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full h-full max-w-3xl rounded-2xl p-12 lg:p-16 flex flex-col overflow-hidden"
      style={{
        background: "radial-gradient(ellipse 150% 100% at 100% 50%, #40B4A6 0%, rgba(64, 180, 166, 0.2) 30%, rgba(255, 255, 255, 0.7) 60%, rgba(255, 255, 255, 0.98) 100%)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        willChange: "transform, opacity",
        boxShadow: "0 20px 60px rgba(64, 180, 166, 0.15), 0 0 0 1px rgba(64, 180, 166, 0.05)",
      }}
      aria-labelledby={`canvas-title-${pole.id}`}
    >
      {/* Courbe SVG organique pour transition entre pôles - Style FullMenu */}
      <svg 
        className="absolute top-4 left-0 w-full h-24 pointer-events-none z-0"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
        style={{ opacity: 0.25 }}
      >
        <defs>
          <linearGradient id={`lianeGradient-${pole.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#40B4A6" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#8FD6CC" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#40B4A6" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <motion.path
          d={getPathForPole(pole.id)}
          fill="none"
          stroke={`url(#lianeGradient-${pole.id})`}
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          exit={{ pathLength: 0, opacity: 0 }}
          transition={{ 
            duration: 0.8, 
            ease: [0.22, 1, 0.36, 1],
            pathLength: { duration: 0.6 },
          }}
        />
      </svg>
      {/* Glow Source Interactive */}
      <motion.div
        className="absolute w-96 h-96 bg-secondary/30 rounded-full blur-3xl pointer-events-none z-0"
        style={{
          left: glowPosition.x - 192,
          top: glowPosition.y - 192,
          transition: "left 0.1s ease-out, top 0.1s ease-out",
        }}
        animate={{
          opacity: hoveredService !== null ? 0.5 : 0.3,
          scale: hoveredService !== null ? 1.2 : 1,
        }}
      />

      {/* Image de fond au hover des sous-services */}
      <AnimatePresence>
        {hoveredService !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.08 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              backgroundImage: pole.id === "talent"
                ? "url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 400 400%27%3E%3Ccircle cx=%27200%27 cy=%27200%27 r=%27150%27 fill=%27none%27 stroke=%27%2340B4A6%27 stroke-width=%272%27 opacity=%270.3%27/%3E%3C/svg%27)"
                : pole.id === "lab"
                ? "url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 400 400%27%3E%3Cpath d=%27M50 200 L350 200 M200 50 L200 350%27 stroke=%27%2340B4A6%27 stroke-width=%272%27 opacity=%270.2%27/%3E%3C/svg%27)"
                : "url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 400 400%27%3E%3Crect x=%2750%27 y=%2750%27 width=%27300%27 height=%27300%27 fill=%27none%27 stroke=%27%2340B4A6%27 stroke-width=%272%27 opacity=%270.2%27/%3E%3C/svg%27)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        )}
      </AnimatePresence>

      {/* Titre massif en arrière-plan avec Reveal Cinématique et Parallaxe Interne */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0" aria-hidden="true">
        <motion.h2 
          className="text-8xl lg:text-9xl font-extrabold opacity-10 select-none relative overflow-hidden tracking-[-0.04em] leading-[1.1]"
          style={{
            color: "#1B365D",
            textShadow: "0 0 40px rgba(27, 54, 93, 0.3), 0 0 80px rgba(27, 54, 93, 0.2)",
            x: titleSpringX,
            y: titleSpringY,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 0.8 }}
        >
          <span className="relative inline-block">
            {pole.shortTitle}
            {/* Balayage de lumière turquoise */}
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[#40B4A6]/40 to-transparent"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
              style={{
                mixBlendMode: "overlay",
              }}
            />
          </span>
        </motion.h2>
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Titre principal (masqué visuellement mais présent pour l'accessibilité) */}
        <h1 id={`canvas-title-${pole.id}`} className="sr-only">
          {pole.title}
        </h1>

        {/* Slogan avec ombre colorée - Assemblage depuis la gauche avec Scale-In */}
        <motion.p 
          className="text-xl lg:text-2xl font-light italic mb-6" 
          role="text"
          style={{
            color: "#1B365D",
            textShadow: "0 2px 8px rgba(255, 255, 255, 0.9), 0 1px 3px rgba(27, 54, 93, 0.2)",
          }}
          initial={{ x: -30, opacity: 0, scale: 0.95 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ type: "spring", ...springConfig }}
        >
          {pole.slogan}
        </motion.p>

        {/* Description avec ombre colorée - Assemblage depuis le bas avec Scale-In */}
        <motion.p 
          className="text-lg lg:text-xl font-light leading-relaxed max-w-2xl mb-12"
          style={{
            color: "#1B365D",
            textShadow: "0 1px 5px rgba(255, 255, 255, 0.7), 0 1px 2px rgba(27, 54, 93, 0.15)",
          }}
          initial={{ y: 30, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ type: "spring", ...springConfig, delay: 0.1 }}
        >
          {pole.description}
        </motion.p>

        {/* Liste de sous-services avec staggerChildren */}
        <motion.ul
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4 mb-12 list-none"
          role="list"
        >
          {pole.subServices.map((service, idx) => (
            <motion.li
              key={idx}
              variants={itemVariants}
              className="relative"
              style={{ willChange: "clip-path, opacity" }}
              animate={{
                opacity: hoveredService !== null && hoveredService !== idx ? 0.4 : 1,
              }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
            >
              <button
                type="button"
                onMouseEnter={() => setHoveredService(idx)}
                onMouseLeave={() => setHoveredService(null)}
                onClick={() => handleSubServiceClick(service)}
                onKeyDown={(e) => handleKeyDown(e, () => handleSubServiceClick(service))}
                className="relative w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded px-2 py-1 transition-all"
                aria-label={`En savoir plus sur ${service}`}
              >
                {/* Ligne turquoise au hover */}
                <AnimatePresence>
                  {hoveredService === idx && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      exit={{ scaleX: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute bottom-0 left-0 h-[2px] w-full bg-secondary origin-left"
                      aria-hidden="true"
                    />
                  )}
                </AnimatePresence>
                <span 
                  className="text-base font-medium relative z-10 cursor-pointer"
                  style={{
                    color: "#1B365D",
                    textShadow: "0 1px 3px rgba(255, 255, 255, 0.6), 0 1px 2px rgba(27, 54, 93, 0.15)",
                  }}
                >
                  {service}
                </span>
              </button>
            </motion.li>
          ))}
        </motion.ul>

        {/* Bouton du pôle optimisé - Assemblage depuis la droite avec Scale-In */}
        <motion.div
          initial={{ x: 30, opacity: 0, scale: 0.95 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ type: "spring", ...springConfig, delay: 0.2 }}
          className="mb-6"
        >
          <motion.button
            type="button"
            onClick={() => handleButtonClick(pole.buttonHref)}
            disabled={isLoading || isTransitioning}
            className="group relative px-6 py-3 bg-transparent border border-secondary rounded-full font-medium text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
            style={{ 
              color: "#1B365D",
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="absolute inset-0 bg-secondary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={false}
            />
            <span 
              className="relative flex items-center gap-2 z-10 transition-colors duration-300 group-hover:text-white"
              style={{ color: "#1B365D" }}
            >
              {isLoading ? "Chargement..." : pole.buttonText}
              {!isLoading && (
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  aria-hidden="true"
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.span>
              )}
            </span>
          </motion.button>
        </motion.div>
      </div>
    </motion.article>
  );
};

// Composant MobilePoleSection pour utiliser les hooks correctement
interface MobilePoleSectionProps {
  pole: Pole;
  clickedService: { poleId: string; serviceIdx: number } | null;
  setClickedService: (service: { poleId: string; serviceIdx: number } | null) => void;
  handleButtonClick: (href: string) => void;
  isLoading: boolean;
  isTransitioning: boolean;
}

const MobilePoleSection = ({
  pole,
  clickedService,
  setClickedService,
  handleButtonClick,
  isLoading,
  isTransitioning,
}: MobilePoleSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { 
    once: false,
    amount: 0.3,
    margin: "-100px 0px -100px 0px"
  });

  return (
    <motion.article
      className="relative w-full min-h-[80dvh] py-20 px-6"
      initial={{ opacity: 0.6 }}
      animate={{ 
        opacity: isInView ? 1 : 0.6,
      }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Carte Glassmorphism Monumentale avec Halo Turquoise au focus */}
      <motion.div
        ref={ref}
        className="relative w-full h-full rounded-3xl backdrop-blur-xl border border-white/20 p-8"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.07)",
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        animate={{
          boxShadow: isInView 
            ? "0 8px 32px 0 rgba(31, 38, 135, 0.07), 0 0 40px rgba(64, 180, 166, 0.2)" 
            : "0 8px 32px 0 rgba(31, 38, 135, 0.07)",
        }}
      >
        <div className="relative z-10 flex flex-col">
          {/* Titre de Pôle */}
          <motion.div
            className="relative mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            {/* Numéro en fond avec opacité 0.1 */}
            <div
              className="font-title absolute -left-4 -top-8 text-[12rem] font-black select-none pointer-events-none"
              style={{
                color: "#1B365D",
                opacity: 0.1,
                lineHeight: 1,
              }}
            >
              {pole.number}
            </div>

            {/* Titre principal massif */}
            <h2
              className="relative text-5xl md:text-6xl font-bold leading-[1.1] tracking-[-0.04em]"
              style={{
                color: "#1B365D",
                textShadow: "0 2px 8px rgba(27, 54, 93, 0.1)",
              }}
            >
              {pole.title}
            </h2>
          </motion.div>

        {/* Slogan */}
        <motion.p
          className="text-lg md:text-xl font-light italic mb-8"
          style={{
            color: "#40B4A6",
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {pole.slogan}
        </motion.p>

        {/* Description */}
        <motion.p
          className="text-base md:text-lg leading-relaxed mb-12 max-w-2xl"
          style={{
            color: "#333333",
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {pole.description}
        </motion.p>

          {/* Cartes de Services Glassmorphism avec Cascade */}
          <div className="space-y-4 mb-8">
            {pole.subServices.map((service, serviceIdx) => (
              <motion.div
                key={serviceIdx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.4 + serviceIdx * 0.1 }}
                className="relative"
              >
                {/* Glow au clic */}
                <AnimatePresence>
                  {clickedService?.poleId === pole.id && clickedService?.serviceIdx === serviceIdx && (
                <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 2, opacity: [0.5, 0, 0] }}
                      exit={{ scale: 2.5, opacity: 0 }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0 rounded-3xl bg-secondary/30 blur-xl pointer-events-none z-0"
                    />
                  )}
                </AnimatePresence>

                {/* Carte Glassmorphism */}
                <motion.button
                  type="button"
                  onClick={() => {
                    setClickedService({ poleId: pole.id, serviceIdx });
                    setTimeout(() => setClickedService(null), 600);
                  }}
                  className="relative w-full text-left p-6 rounded-3xl backdrop-blur-xl border border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.07)",
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: serviceIdx * 0.1 }}
                  whileTap={{ scale: 0.98, opacity: 0.8 }}
                >
                  <span
                    className="text-lg font-medium flex items-center gap-2"
                    style={{
                      color: "#1B365D",
                    }}
                  >
                    <span 
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: "#40B4A6" }}
                    />
                    {service}
                  </span>
                </motion.button>
              </motion.div>
            ))}
          </div>

          {/* Bouton Organique Élégant */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-auto"
          >
            <motion.button
              type="button"
              onClick={() => handleButtonClick(pole.buttonHref)}
              disabled={isLoading || isTransitioning}
              className="group flex items-center gap-3 px-6 py-4 border-2 rounded-full font-medium text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
              style={{
                color: "#40B4A6",
                borderColor: "#40B4A6",
                backgroundColor: "transparent",
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98, opacity: 0.8 }}
            >
              <span>{pole.buttonText}</span>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight className="h-4 w-4" />
              </motion.span>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </motion.article>
  );
};

const ExpertiseSection = () => {
  const [activePole, setActivePole] = useState<Pole["id"]>("talent");
  const [hoveredPole, setHoveredPole] = useState<Pole["id"] | null>(null);
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [lianePosition, setLianePosition] = useState({ top: "50%", height: "120px" });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetUrl, setTargetUrl] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [clickedService, setClickedService] = useState<{ poleId: string; serviceIdx: number } | null>(null);
  const poleRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const canvasRef = useRef<HTMLElement | null>(null);
  const mobileSectionRef = useRef<HTMLElement>(null);

  // Scroll progress pour la liane mobile (basé sur le scroll de la page)
  const { scrollYProgress } = useScroll({
    target: mobileSectionRef,
    offset: ["start end", "end start"],
  });

  const lianeProgress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Fonction utilitaire pour la navigation clavier
  const handleKeyDown = useCallback((e: React.KeyboardEvent, action: () => void) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      action();
    }
  }, []);

  // Gestion de la touche Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setHoveredPole(null);
        setHoveredService(null);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);


  // Mettre à jour la position de la liane quand activePole change
  useEffect(() => {
    const updateLianePosition = () => {
      const activeIndex = poles.findIndex((p) => p.id === activePole);
      const activeElement = poleRefs.current[activeIndex];
      
      if (activeElement) {
        const rect = activeElement.getBoundingClientRect();
        const containerRect = activeElement.parentElement?.getBoundingClientRect();
        if (containerRect) {
          const relativeTop = rect.top - containerRect.top + rect.height / 2;
          setLianePosition({
            top: `${relativeTop - 60}px`,
            height: "120px",
          });
        }
      }
    };

    const timeout = setTimeout(updateLianePosition, 100);
    const resizeTimeout = setTimeout(updateLianePosition, 300);
    window.addEventListener("resize", updateLianePosition);
    
    return () => {
      clearTimeout(timeout);
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", updateLianePosition);
    };
  }, [activePole]);

  // Synchroniser avec la Sidebar
  useEffect(() => {
    const event = new CustomEvent("expertiseHover", {
      detail: { poleId: activePole },
    });
    window.dispatchEvent(event);
  }, [activePole]);

  // Parallax inversé pour les titres outline avec debounce
  useEffect(() => {
    let rafId: number;
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setMousePosition({
          x: (e.clientX / window.innerWidth - 0.5) * 20,
          y: (e.clientY / window.innerHeight - 0.5) * 20,
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Glow Source qui suit le curseur dans le Canvas
  useEffect(() => {
    let rafId: number;
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = canvasRef.current?.getBoundingClientRect();
        if (rect) {
          setGlowPosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          });
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const handleButtonClick = useCallback((href: string) => {
    setIsLoading(true);
    setTargetUrl(href);
    setIsTransitioning(true);
  }, []);

  const handleSubServiceClick = useCallback((service: string) => {
    // Action à définir : pourrait ouvrir un modal, scroll vers une section, etc.
    void service;
  }, []);

  const currentPole = useMemo(() => poles.find((p) => p.id === activePole) || poles[0], [activePole]);
  const displayPole = useMemo(
    () => (hoveredPole ? poles.find((p) => p.id === hoveredPole) : currentPole),
    [hoveredPole, currentPole]
  );

  return (
    <section
      ref={mobileSectionRef}
      className="relative h-auto min-h-screen lg:h-dvh w-full overflow-hidden pt-0 lg:pt-24 expertise-section bg-white"
      aria-label="Section Expertise Lianet"
      role="main"
    >
      {/* Texture de grain premium globale - Fixed pour couvrir tout le scroll */}

      {/* Background Effects - Orbes de lumière */}
      <BackgroundEffects />

      {/* Film Grain Texture */}
      <FilmGrain />

      {/* Titre de Section & Orientation */}
      <div className="absolute top-24 left-0 right-0 z-10 hidden lg:block">
        <div className="flex items-center gap-6 px-16 lg:px-24">
          <p className="text-sm tracking-[0.3em] uppercase text-gray-400 whitespace-nowrap">
            DÉCOUVREZ L&apos;ÉCOSYSTÈME LIANET
          </p>
          <div className="h-[1px] w-full bg-gray-200" />
        </div>
      </div>

      {/* Page Wipe Transition */}
      <PageWipe
        isActive={isTransitioning}
        targetUrl={targetUrl}
        color="#40B4A6"
        onComplete={() => {
          setIsTransitioning(false);
          setTargetUrl(null);
          setIsLoading(false);
        }}
      />

      {/* Desktop Layout - Split Screen */}
      <div className="hidden lg:flex h-full w-full pt-32">
        {/* Gauche - 40% : Liste des pôles */}
        <nav
          className="relative w-[40%] flex flex-col justify-center pl-16 lg:pl-24"
          aria-label="Navigation des pôles d'expertise"
          role="navigation"
        >
          {/* Liane narrative verticale avec halo turquoise - Shared Element depuis Hero */}
          <motion.div
            layoutId="hero-liane-glow"
            className="absolute left-8"
            style={{
              top: lianePosition.top,
              height: lianePosition.height,
              width: "2px",
            }}
            animate={{
              top: lianePosition.top,
              height: lianePosition.height,
            }}
            transition={{ 
              type: "spring",
              stiffness: 200,
              damping: 20,
              bounce: 0.3,
            }}
          >
            {/* Halo turquoise qui diffuse sur le fond blanc - Amélioré pour transition */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to right, rgba(64, 180, 166, 0.1), rgba(64, 180, 166, 0.05), transparent)",
                filter: "blur(8px)",
                width: "40px",
                left: "-19px",
              }}
              animate={{
                opacity: hoveredPole ? [0.3, 0.6, 0.3] : 0.2,
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            {/* Ligne principale avec box-shadow et pulse - Scale morphing amélioré */}
            <motion.div
              className="absolute inset-0 bg-secondary/60"
              style={{
                background: "linear-gradient(to top, rgba(64, 180, 166, 0.8), rgba(64, 180, 166, 0.4), rgba(143, 214, 204, 0.2))",
                boxShadow: "0 0 20px rgba(64, 180, 166, 0.6), 0 0 40px rgba(64, 180, 166, 0.3)",
              }}
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            {/* Spark effect - étincelle qui parcourt la liane pendant la transition */}
            <motion.div
              className="absolute w-1 h-1 bg-secondary rounded-full"
              style={{
                boxShadow: "0 0 8px rgba(64, 180, 166, 0.8), 0 0 16px rgba(64, 180, 166, 0.4)",
                left: "50%",
                transform: "translateX(-50%)",
              }}
              animate={{
                y: [0, lianePosition.height ? parseInt(lianePosition.height.replace("px", "")) - 4 : 116, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Effet stroke-dasharray pour flux d'information */}
            <motion.svg
              className="absolute inset-0"
              viewBox="0 0 2 120"
              preserveAspectRatio="none"
            >
              <motion.line
                x1="1"
                y1="0"
                x2="1"
                y2="120"
                stroke="#40B4A6"
                strokeWidth="2"
                strokeDasharray="4 8"
                animate={{
                  strokeDashoffset: [0, -12],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </motion.svg>

            {/* Spark (étincelle) qui parcourt la ligne */}
            <motion.div
              className="absolute w-2 h-2 bg-secondary rounded-full blur-sm"
              animate={{
                y: [0, lianePosition.height ? parseInt(lianePosition.height.replace("px", "")) - 4 : 116],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
              </motion.div>

          {/* Liane SVG - Tracé organique qui relie les pôles */}
          <svg 
            className="absolute left-8 top-0 w-[2px] h-full z-0 pointer-events-none"
            style={{ height: "100%" }}
          >
            <motion.path
              d={`M 1 0 Q 1 ${100 / 3}% 1 ${200 / 3}% T 1 ${300 / 3}% T 1 100%`}
              fill="none"
              stroke="#40B4A6"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1, 
                opacity: hoveredPole ? 0.5 : 0.3,
              }}
              transition={{ 
                pathLength: { duration: 2, ease: "easeInOut" },
                opacity: { duration: 0.3 }
              }}
            />
          </svg>

          {/* Liste des pôles */}
          <ul className="space-y-16 list-none relative z-10">
            {poles.map((pole, index) => {
              const isActive = activePole === pole.id;
              const isHovered = hoveredPole === pole.id;
              const shouldHighlight = isActive || isHovered;

            return (
                <li key={pole.id} className="relative">
                  <button
                    type="button"
                    ref={(el) => {
                      poleRefs.current[index] = el;
                    }}
                    className="relative w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-lg transition-all"
                    onMouseEnter={() => setHoveredPole(pole.id)}
                    onMouseLeave={() => setHoveredPole(null)}
                    onClick={() => setActivePole(pole.id)}
                    onKeyDown={(e) => handleKeyDown(e, () => setActivePole(pole.id))}
                    aria-label={`Sélectionner ${pole.title}`}
                    aria-current={isActive ? "true" : "false"}
                    aria-describedby={`pole-${pole.id}-description`}
                  >
                  {/* Ligne horizontale qui s'étire au hover */}
                  <AnimatePresence>
                    {shouldHighlight && (
              <motion.div
                        initial={{ scaleX: 0, originX: 0 }}
                        animate={{ scaleX: 1 }}
                        exit={{ scaleX: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute left-0 top-1/2 h-[1px] w-16 bg-secondary -translate-y-1/2"
                      />
                    )}
                  </AnimatePresence>

                  {/* Numéro discret */}
                  <div className="text-xs font-mono text-foreground/40 mb-2">{pole.number}</div>

                  {/* Titre avec outline géant en parallax inversé */}
                  <div className="relative">
                    {/* Titre outline fantôme */}
                    <motion.h3
                      className="font-title absolute -left-8 -top-16 text-[15rem] font-black text-transparent pointer-events-none select-none"
                      style={{
                        WebkitTextStroke: "1px rgba(0, 0, 0, 0.05)",
                        stroke: "rgba(0, 0, 0, 0.05)",
                        strokeWidth: "1px",
                      }}
                      animate={{
                        x: -mousePosition.x * 0.3,
                        y: -mousePosition.y * 0.3,
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      {pole.shortTitle}
                    </motion.h3>

                    {/* Titre principal avec effet magnétique et Reveal Cinématique */}
                    <MagneticTitle
                      className="relative text-4xl lg:text-5xl font-bold leading-[1.1] tracking-[-0.04em] transition-colors z-10 overflow-hidden"
                      animate={{
                        color: shouldHighlight ? "#40B4A6" : "#333333",
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="relative inline-block">
                        {pole.shortTitle}
                        {/* Balayage de lumière turquoise */}
                        <motion.span
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-[#40B4A6]/40 to-transparent"
                          initial={{ x: "-100%" }}
                          animate={shouldHighlight ? { x: "100%" } : { x: "-100%" }}
                          transition={{ duration: 1.2, delay: 0.2, ease: "easeInOut" }}
                          style={{
                            mixBlendMode: "overlay",
                          }}
                        />
                      </span>
                    </MagneticTitle>
                  </div>
                  <span id={`pole-${pole.id}-description`} className="sr-only">
                    {pole.description}
                  </span>
                  </button>
                </li>
            );
          })}
          </ul>
        </nav>

        {/* Droite - 60% : Le Canvas */}
        <article
          ref={canvasRef}
          className="w-[60%] flex items-center justify-center p-12 lg:p-16"
          aria-live="polite"
          aria-atomic="true"
        >
          <AnimatePresence mode="wait">
            {displayPole && (
              <CanvasCard
                key={displayPole.id}
                pole={displayPole}
                hoveredService={hoveredService}
                setHoveredService={setHoveredService}
                handleSubServiceClick={handleSubServiceClick}
                handleKeyDown={handleKeyDown}
                handleButtonClick={handleButtonClick}
                isLoading={isLoading}
                isTransitioning={isTransitioning}
                glowPosition={glowPosition}
              />
            )}
          </AnimatePresence>
        </article>
      </div>

      {/* Mobile Layout - The Continuous Flow */}
      <div className="lg:hidden relative w-full">
        {/* Liane horizontale - Progress Bar en haut (sticky) */}
        <div className="sticky top-0 left-0 right-0 z-50 h-[2px] bg-gray-200/30">
          <motion.div
            className="h-full bg-secondary"
            style={{
              width: lianeProgress,
            }}
          />
        </div>

        {/* Texture grainée pour toute la section mobile avec gradient de transition */}
        <div 
          className="absolute inset-0 min-h-full z-0 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.3) 20%, rgba(255, 255, 255, 0.3) 80%, rgba(27, 54, 93, 0.05) 100%)",
          }}
        >
          <FilmGrain />
        </div>

        {/* Sections pour chaque pôle - Flux continu vertical avec espacement généreux */}
        <div className="relative z-10 space-y-20">
          {poles.map((pole) => (
            <MobilePoleSection
              key={pole.id}
              pole={pole}
              clickedService={clickedService}
              setClickedService={setClickedService}
              handleButtonClick={handleButtonClick}
              isLoading={isLoading}
              isTransitioning={isTransitioning}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
