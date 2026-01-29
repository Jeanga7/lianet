"use client";

import { motion, useInView, MotionValue, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, Users, Target, FlaskConical } from "lucide-react";

// Composant pour un bloc monolithique
const MonolithBlock = ({
  children,
  delay = 0,
  className = "",
  backgroundTitle,
  onHover,
  isHovered,
  isOtherHovered,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  backgroundTitle?: string;
  onHover?: (hovered: boolean) => void;
  isHovered?: boolean;
  isOtherHovered?: boolean;
  style?: React.CSSProperties;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      className={`relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 ${className}`}
      style={{
        padding: "clamp(2rem, 4vw, 3rem)",
        borderColor: isHovered ? "rgba(64, 180, 166, 0.3)" : "rgba(255, 255, 255, 0.1)",
        ...style,
      }}
      initial={{ scale: 1.05, opacity: 0, y: 50 }}
      animate={
        isInView
          ? {
              scale: isHovered ? 1.02 : isOtherHovered ? 1 : 1,
              opacity: isOtherHovered ? 0.5 : 1,
              backdropFilter: isHovered ? "blur(32px)" : "blur(24px)",
            }
          : {
              scale: 1.05,
              opacity: 0,
              y: 50,
            }
      }
      transition={{
        duration: 0.8,
        delay,
        type: "spring",
        stiffness: 100,
        damping: 20,
      }}
      onMouseEnter={() => onHover?.(true)}
      onMouseLeave={() => onHover?.(false)}
    >
      {/* Titre géant en arrière-plan */}
      {backgroundTitle && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            opacity: 0.08,
          }}
        >
          <h2 className="text-[15rem] md:text-[20rem] font-black uppercase tracking-wider" style={{ color: "#40B4A6" }}>
            {backgroundTitle}
          </h2>
        </div>
      )}

      {/* Contenu */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

// Composant pour le titre avec effet glitch au passage du scanner
const GlitchTitle = ({
  children,
  scrollProgress,
  blockIndex,
  totalBlocks,
  size = "default",
}: {
  children: React.ReactNode;
  scrollProgress: MotionValue<number>;
  blockIndex: number;
  totalBlocks: number;
  size?: "default" | "large";
}) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollProgress.on("change", (value) => {
      const currentBlock = Math.floor(value * totalBlocks);
      if (currentBlock === blockIndex) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 200);
      }
    });

    return () => unsubscribe();
  }, [scrollProgress, blockIndex, totalBlocks]);

  const sizeClass = size === "large" 
    ? "text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
    : "text-3xl md:text-4xl lg:text-5xl xl:text-6xl";

  return (
    <motion.h2
      className={`${sizeClass} font-bold uppercase tracking-tighter text-white mb-6`}
      animate={{
        opacity: isGlitching ? [0.2, 1, 0.2, 1] : 1,
        x: isGlitching ? [0, -2, 2, 0] : 0,
      }}
      transition={{
        duration: 0.2,
      }}
    >
      {children}
    </motion.h2>
  );
};

// Composant pour les lianes de connexion (traversant les espaces vides)
const ConnectionLiane = ({
  from,
  to,
  isActive,
  sectionRef,
}: {
  from: { x: number; y: number };
  to: { x: number; y: number };
  isActive: boolean;
  sectionRef: React.RefObject<HTMLElement | null>;
}) => {
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);
  const [path, setPath] = useState("");

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, [path]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const sectionRect = sectionRef.current.getBoundingClientRect();
    
    // Calculer les positions relatives à la section
    const fromX = from.x - sectionRect.left;
    const fromY = from.y - sectionRect.top;
    const toX = to.x - sectionRect.left;
    const toY = to.y - sectionRect.top;

    // Point de contrôle pour une courbe organique qui traverse l'espace
    const controlX = (fromX + toX) / 2;
    const controlY = Math.min(fromY, toY) - 100; // Plus haut pour traverser l'espace

    setPath(`M ${fromX} ${fromY} Q ${controlX} ${controlY} ${toX} ${toY}`);
  }, [from, to, sectionRef]);

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: isActive ? 0.6 : 0.2 }}
    >
      <motion.path
        ref={pathRef}
        d={path}
        fill="none"
        stroke="#40B4A6"
        strokeWidth="0.5"
        strokeDasharray={pathLength}
        strokeDashoffset={pathLength}
        initial={{ strokeDashoffset: pathLength }}
        animate={{
          strokeDashoffset: isActive ? 0 : pathLength * 0.5,
          strokeWidth: isActive ? 1 : 0.5,
          opacity: isActive ? 0.8 : 0.2,
        }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
        }}
      />
    </svg>
  );
};

// Composant pour l'orbe guide qui suit la souris (loupe lumineuse)
const GuidingOrb = ({ sectionRef }: { sectionRef: React.RefObject<HTMLElement | null> }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener("mousemove", handleMouseMove);
      return () => section.removeEventListener("mousemove", handleMouseMove);
    }
  }, [sectionRef, mouseX, mouseY]);

  return (
    <>
      {/* Masque radial pour éclairer le texte sous l'orbe */}
      <motion.div
        className="pointer-events-none fixed z-40"
        style={{
          left: springX,
          top: springY,
          transform: "translate(-50%, -50%)",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(64, 180, 166, 0.15) 0%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />
      {/* Orbe lumineuse */}
      <motion.div
        className="pointer-events-none fixed z-50"
        style={{
          left: springX,
          top: springY,
          transform: "translate(-50%, -50%)",
        }}
      >
        <motion.div
          className="w-8 h-8 bg-[#40B4A6] rounded-full"
          style={{
            filter: "blur(8px)",
            boxShadow: "0 0 40px rgba(64, 180, 166, 0.8), 0 0 80px rgba(64, 180, 166, 0.4)",
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </>
  );
};

// Composant pour le scanner (orbe qui suit les bordures avec traînée longue) - DEPRECATED
const ScannerBeam = ({
  scrollProgress,
  blocks,
}: {
  scrollProgress: MotionValue<number>;
  blocks: Array<{ x: number; y: number; width: number; height: number }>;
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [previousPosition, setPreviousPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (blocks.length === 0) return;

    const updatePosition = (value: number) => {
      const blockIndex = Math.floor(value * blocks.length);
      const currentBlock = Math.min(blockIndex, blocks.length - 1);
      const block = blocks[currentBlock];

      if (block) {
        setPreviousPosition((prev) => ({ ...prev, ...position }));
        setPosition({
          x: block.x,
          y: block.y,
        });
      }
    };

    // Initialiser la position
    updatePosition(scrollProgress.get());

    // Écouter les changements
    const unsubscribe = scrollProgress.on("change", (value: number) => updatePosition(value));

    return () => unsubscribe();
  }, [scrollProgress, blocks, position]);

  if (blocks.length === 0) return null;

  // Calculer la distance pour la traînée
  const distance = Math.sqrt(
    Math.pow(position.x - previousPosition.x, 2) + Math.pow(position.y - previousPosition.y, 2)
  );
  const trailLength = Math.min(distance * 0.5, 200);

  return (
    <motion.div
      className="fixed pointer-events-none z-50"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translate(-50%, -50%)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Traînée lumineuse longue */}
      <motion.div
        className="absolute"
        style={{
          width: "4px",
          height: `${trailLength}px`,
          background: "linear-gradient(to bottom, rgba(64, 180, 166, 0.9), rgba(64, 180, 166, 0.3), transparent)",
          filter: "blur(3px)",
          boxShadow: "0 0 30px rgba(64, 180, 166, 0.8), 0 0 60px rgba(64, 180, 166, 0.4)",
          transform: "translate(-50%, -100%)",
          transformOrigin: "bottom center",
        }}
        animate={{
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
      {/* Faisceau de balayage principal */}
      <div
        className="w-4 h-32 md:w-5 md:h-48"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(64, 180, 166, 0.9), transparent)",
          filter: "blur(3px)",
          boxShadow: "0 0 30px rgba(64, 180, 166, 0.8), 0 0 60px rgba(64, 180, 166, 0.4)",
        }}
      />
      {/* Point lumineux */}
      <motion.div
        className="absolute inset-0 w-6 h-6 md:w-8 md:h-8 bg-[#40B4A6] rounded-full"
        style={{
          filter: "blur(6px)",
          boxShadow: "0 0 30px rgba(64, 180, 166, 1), 0 0 60px rgba(64, 180, 166, 0.6)",
        }}
        animate={{
          scale: [1, 1.5],
          opacity: [0.8, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
};

const ManifesteSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredBlock, setHoveredBlock] = useState<number | null>(null);


  return (
    <section
      ref={sectionRef}
      id="manifeste"
      className="relative h-screen sm:h-auto sm:min-h-screen w-full lg:w-[calc(100%-5rem)] lg:ml-20 snap-start snap-always flex-shrink-0 overflow-hidden sm:overflow-y-auto"
      style={{
        background: "#1B365D",
      }}
      aria-label="Manifeste Lianet - Strategic Monolith"
    >
      {/* Texture de grain cinématographique (réduite pour la lisibilité) */}
      <div
        className="absolute inset-0 z-0 grain-bg pointer-events-none"
        style={{
          opacity: 0.05,
          filter: "contrast(150%) brightness(90%)",
        }}
        aria-hidden="true"
      />


      {/* Orbe Guide (Desktop uniquement) */}
      <div className="hidden lg:block">
        <GuidingOrb sectionRef={sectionRef} />
      </div>

      {/* Contenu principal - Desktop: Grid fixe 100vh, Mobile: Stack fluide */}
      <div className="relative z-20 h-full sm:h-auto">
        {/* Desktop: Grid 12x6 pour 100vh */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:grid-rows-6 h-full gap-6 p-8">
          {/* Bloc 1: La Vision (Le Manifeste) - col-span-7 row-span-4 */}
          <MonolithBlock
            backgroundTitle="VISION"
            delay={0}
            className="col-span-7 row-span-4 border-r border-white/10"
            data-monolith-block
            onHover={(hovered) => setHoveredBlock(hovered ? 0 : null)}
            isHovered={hoveredBlock === 0}
            isOtherHovered={hoveredBlock !== null && hoveredBlock !== 0}
          >
            <div className="flex flex-col items-center justify-center h-full text-center px-8 py-6">
              <motion.h2
                className="text-4xl md:text-5xl font-bold uppercase tracking-tighter text-white mb-6 leading-snug"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                L&apos;Audace du Lien
              </motion.h2>
              <motion.p
                className="text-base md:text-lg text-white font-light leading-snug mb-6 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                L&apos;innovation n&apos;est pas une destination, c&apos;est une architecture. Chez Lianet, nous ne nous contentons pas de suivre le flux technologique ; nous forgeons les connexions invisibles entre vos talents, votre stratégie et les outils de demain. Nous créons la clarté là où règne la complexité.
              </motion.p>
              <motion.p
                className="text-sm md:text-base text-[#40B4A6] italic font-serif"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Penser global, agir précis.
              </motion.p>
            </div>
          </MonolithBlock>

          {/* Bloc 2: L'Équation (La Méthode) - col-span-5 row-span-2 */}
          <MonolithBlock
            backgroundTitle="METHOD"
            delay={0.2}
            className="col-span-5 row-span-2"
            data-monolith-block
            onHover={(hovered) => setHoveredBlock(hovered ? 1 : null)}
            isHovered={hoveredBlock === 1}
            isOtherHovered={hoveredBlock !== null && hoveredBlock !== 1}
          >
            <div className="flex flex-col h-full justify-center px-4 py-6">
              <motion.h2
                className="text-3xl md:text-4xl font-bold uppercase tracking-tighter text-white mb-6 leading-snug"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                L&apos;Équation
              </motion.h2>
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-4">
                  <Users className="w-7 h-7 text-[#40B4A6]" />
                  <span className="text-xl md:text-2xl font-bold text-white">Talent</span>
                </div>
                <div className="flex items-center gap-4">
                  <Target className="w-7 h-7 text-[#40B4A6]" />
                  <span className="text-xl md:text-2xl font-bold text-white">Stratégie</span>
                </div>
                <div className="flex items-center gap-4">
                  <FlaskConical className="w-7 h-7 text-[#40B4A6]" />
                  <span className="text-xl md:text-2xl font-bold text-white">Lab</span>
                </div>
              </div>
              <motion.p
                className="text-sm md:text-base text-white font-light leading-snug"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Trois forces, un seul impact.
              </motion.p>
            </div>
          </MonolithBlock>

          {/* Bloc 3: L'Impact (Preuve de Valeur) - col-span-5 row-span-2 */}
          <MonolithBlock
            backgroundTitle="IMPACT"
            delay={0.4}
            className="col-span-5 row-span-2"
            data-monolith-block
            onHover={(hovered) => setHoveredBlock(hovered ? 2 : null)}
            isHovered={hoveredBlock === 2}
            isOtherHovered={hoveredBlock !== null && hoveredBlock !== 2}
          >
            <div className="flex flex-col h-full justify-center px-4 py-6">
              <motion.h2
                className="text-3xl md:text-4xl font-bold uppercase tracking-tighter text-white mb-6 leading-snug"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                L&apos;Impact
              </motion.h2>
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <div
                    className="text-3xl md:text-4xl font-black mb-2"
                    style={{
                      color: "#40B4A6",
                      filter: "drop-shadow(0 0 10px rgba(64, 180, 166, 0.6))",
                    }}
                  >
                    +10 ans
                  </div>
                  <p className="text-xs md:text-sm text-white">d&apos;expertise hybride</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <div
                    className="text-3xl md:text-4xl font-black mb-2"
                    style={{
                      color: "#40B4A6",
                      filter: "drop-shadow(0 0 10px rgba(64, 180, 166, 0.6))",
                    }}
                  >
                    100%
                  </div>
                  <p className="text-xs md:text-sm text-white">Focus Solutions</p>
                </motion.div>
              </div>
            </div>
          </MonolithBlock>

          {/* Bloc 4: L'Engagement (CTA) - col-span-12 row-span-2 */}
          <MonolithBlock
            backgroundTitle="ACTION"
            delay={0.6}
            className="col-span-12 row-span-2"
            data-monolith-block
            onHover={(hovered) => setHoveredBlock(hovered ? 3 : null)}
            isHovered={hoveredBlock === 3}
            isOtherHovered={hoveredBlock !== null && hoveredBlock !== 3}
          >
            <div className="flex flex-col md:flex-row items-center justify-between h-full gap-6 px-6 py-4">
              <motion.div
                className="flex-1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter text-white mb-3 leading-snug">
                  Prêt pour l&apos;ascension ?
                </h2>
                <p className="text-sm md:text-base text-white font-light leading-snug">
                  Votre vision mérite une exécution d&apos;exception. Collaborons pour transformer vos défis en actifs stratégiques.
                </p>
              </motion.div>
              <motion.button
                className="group relative px-8 py-4 bg-[#40B4A6] text-white font-semibold rounded-full overflow-hidden whitespace-nowrap text-sm md:text-base"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.9, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-2 uppercase tracking-tighter">
                  Initier le mouvement
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-[#8FD6CC]"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </div>
          </MonolithBlock>
        </div>

        {/* Mobile: Stack fluide avec scroll */}
        <div className="lg:hidden space-y-8 p-8">
          {/* Bloc 1 Mobile */}
          <MonolithBlock
            backgroundTitle="VISION"
            delay={0}
            className=""
            data-monolith-block
            onHover={(hovered) => setHoveredBlock(hovered ? 0 : null)}
            isHovered={hoveredBlock === 0}
            isOtherHovered={hoveredBlock !== null && hoveredBlock !== 0}
          >
            <div className="flex flex-col items-center justify-center text-center py-8">
              <motion.h2
                className="text-4xl font-bold uppercase tracking-tighter text-white mb-6 leading-snug"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                L&apos;Audace du Lien
              </motion.h2>
              <motion.p
                className="text-base text-white font-light leading-snug mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                L&apos;innovation n&apos;est pas une destination, c&apos;est une architecture. Chez Lianet, nous ne nous contentons pas de suivre le flux technologique ; nous forgeons les connexions invisibles entre vos talents, votre stratégie et les outils de demain. Nous créons la clarté là où règne la complexité.
              </motion.p>
              <motion.p
                className="text-sm text-[#40B4A6] italic font-serif"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Penser global, agir précis.
              </motion.p>
            </div>
          </MonolithBlock>

          {/* Bloc 2 Mobile */}
          <MonolithBlock
            backgroundTitle="METHOD"
            delay={0.2}
            className=""
            data-monolith-block
            onHover={(hovered) => setHoveredBlock(hovered ? 1 : null)}
            isHovered={hoveredBlock === 1}
            isOtherHovered={hoveredBlock !== null && hoveredBlock !== 1}
          >
            <div className="flex flex-col py-8">
              <motion.h2
                className="text-3xl font-bold uppercase tracking-tighter text-white mb-6 leading-snug"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                L&apos;Équation
              </motion.h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Users className="w-6 h-6 text-[#40B4A6]" />
                  <span className="text-xl font-bold text-white">Talent</span>
                </div>
                <div className="flex items-center gap-4">
                  <Target className="w-6 h-6 text-[#40B4A6]" />
                  <span className="text-xl font-bold text-white">Stratégie</span>
                </div>
                <div className="flex items-center gap-4">
                  <FlaskConical className="w-6 h-6 text-[#40B4A6]" />
                  <span className="text-xl font-bold text-white">Lab</span>
                </div>
              </div>
            </div>
          </MonolithBlock>

          {/* Bloc 3 Mobile */}
          <MonolithBlock
            backgroundTitle="IMPACT"
            delay={0.4}
            className=""
            data-monolith-block
            onHover={(hovered) => setHoveredBlock(hovered ? 2 : null)}
            isHovered={hoveredBlock === 2}
            isOtherHovered={hoveredBlock !== null && hoveredBlock !== 2}
          >
            <div className="flex flex-col py-8">
              <motion.h2
                className="text-3xl font-bold uppercase tracking-tighter text-white mb-6 leading-snug"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                L&apos;Impact
              </motion.h2>
              <div className="space-y-6">
                <div>
                  <div
                    className="text-4xl font-black mb-2"
                    style={{
                      color: "#40B4A6",
                      filter: "drop-shadow(0 0 10px rgba(64, 180, 166, 0.6))",
                    }}
                  >
                    +10 ans
                  </div>
                  <p className="text-sm text-white/80">d&apos;expertise hybride</p>
                </div>
                <div>
                  <div
                    className="text-4xl font-black mb-2"
                    style={{
                      color: "#40B4A6",
                      filter: "drop-shadow(0 0 10px rgba(64, 180, 166, 0.6))",
                    }}
                  >
                    100%
                  </div>
                  <p className="text-sm text-white/80">Focus Solutions</p>
                </div>
              </div>
            </div>
          </MonolithBlock>

          {/* Bloc 4 Mobile */}
          <MonolithBlock
            backgroundTitle="ACTION"
            delay={0.6}
            className=""
            data-monolith-block
            onHover={(hovered) => setHoveredBlock(hovered ? 3 : null)}
            isHovered={hoveredBlock === 3}
            isOtherHovered={hoveredBlock !== null && hoveredBlock !== 3}
          >
            <div className="flex flex-col items-center text-center py-8">
              <motion.h2
                className="text-3xl font-bold uppercase tracking-tighter text-white mb-4 leading-snug"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                Prêt pour l&apos;ascension ?
              </motion.h2>
              <p className="text-base text-white font-light leading-snug mb-6">
                Votre vision mérite une exécution d&apos;exception. Collaborons pour transformer vos défis en actifs stratégiques.
              </p>
              <motion.button
                className="group relative px-8 py-4 bg-[#40B4A6] text-white font-semibold rounded-full overflow-hidden whitespace-nowrap text-base"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.9, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-2 uppercase tracking-tighter">
                  Initier le mouvement
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-[#8FD6CC]"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </div>
          </MonolithBlock>
        </div>
      </div>
    </section>
  );
};

export default ManifesteSection;
