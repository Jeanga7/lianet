"use client";

import { motion, useScroll, useInView, MotionValue } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

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
        padding: "clamp(3rem, 8vw, 4rem)",
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
            opacity: 0.02,
          }}
        >
          <h2 className="text-[15rem] md:text-[20rem] font-black uppercase tracking-wider text-white">
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

// Composant pour le scanner (orbe qui suit les bordures avec traînée longue)
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
  const [blockPositions, setBlockPositions] = useState<
    Array<{ x: number; y: number; width: number; height: number }>
  >([]);
  const [hoveredBlock, setHoveredBlock] = useState<number | null>(null);
  const [blockCenters, setBlockCenters] = useState<
    Array<{ x: number; y: number }>
  >([]);

  // Scroll progress pour cette section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Mettre à jour les positions des blocs pour le scanner
  useEffect(() => {
    const updatePositions = () => {
      const blocks = sectionRef.current?.querySelectorAll("[data-monolith-block]");
      if (!blocks) return;

      const positions = Array.from(blocks).map((block) => {
        const rect = block.getBoundingClientRect();
        return {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          width: rect.width,
          height: rect.height,
        };
      });

      setBlockPositions(positions);

      // Calculer les centres pour les lianes
      const centers = Array.from(blocks).map((block) => {
        const rect = block.getBoundingClientRect();
        return {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        };
      });
      setBlockCenters(centers);
    };

    updatePositions();
    window.addEventListener("resize", updatePositions);
    window.addEventListener("scroll", updatePositions);

    return () => {
      window.removeEventListener("resize", updatePositions);
      window.removeEventListener("scroll", updatePositions);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="manifeste"
      className="relative min-h-screen w-full lg:w-[calc(100%-5rem)] lg:ml-20 snap-start snap-always flex-shrink-0 overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at center, #1B365D 0%, #0A0F1A 100%)",
      }}
      aria-label="Manifeste Lianet - Strategic Monolith"
    >
      {/* Texture de grain cinématographique (graphite) */}
      <div
        className="absolute inset-0 z-0 grain-bg pointer-events-none"
        style={{
          opacity: 0.15,
          filter: "contrast(200%) brightness(80%)",
        }}
        aria-hidden="true"
      />

      {/* Lianes de connexion (traversant les espaces) */}
      {blockCenters.length >= 2 && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          {blockCenters.map((center, index) => {
            if (index < blockCenters.length - 1) {
              return (
                <ConnectionLiane
                  key={index}
                  from={center}
                  to={blockCenters[index + 1]}
                  isActive={hoveredBlock === index || hoveredBlock === index + 1}
                  sectionRef={sectionRef}
                />
              );
            }
            return null;
          })}
        </div>
      )}

      {/* Scanner Beam */}
      <ScannerBeam scrollProgress={scrollYProgress} blocks={blockPositions} />

      {/* Contenu principal */}
      <div className="relative z-20 container mx-auto px-6 py-16 md:py-24 lg:py-32">
        {/* Grille asymétrique (Grid 12 colonnes) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Bloc 1: La Vision (Le Manifeste) - Pleine largeur */}
          <MonolithBlock
            backgroundTitle="VISION"
            delay={0}
            className="md:col-span-12"
            data-monolith-block
            onHover={(hovered) => setHoveredBlock(hovered ? 0 : null)}
            isHovered={hoveredBlock === 0}
            isOtherHovered={hoveredBlock !== null && hoveredBlock !== 0}
            style={{ minHeight: "50dvh" }}
          >
            <div className="flex flex-col items-center justify-center text-center max-w-5xl mx-auto px-[10%] min-h-[50dvh]">
              <GlitchTitle scrollProgress={scrollYProgress} blockIndex={0} totalBlocks={4} size="large">
                L&apos;Audace du Lien
              </GlitchTitle>
              <motion.p
                className="text-xl md:text-2xl lg:text-3xl text-white/80 font-light leading-relaxed mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                L&apos;innovation n&apos;est pas une destination, c&apos;est une architecture. Chez Lianet, nous ne nous contentons pas de suivre le flux technologique ; nous forgeons les connexions invisibles entre vos talents, votre stratégie et les outils de demain. Nous créons la clarté là où règne la complexité.
              </motion.p>
              <motion.p
                className="text-lg md:text-xl text-[#40B4A6] italic font-serif"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Penser global, agir précis.
              </motion.p>
            </div>
          </MonolithBlock>

          {/* Bloc 2: L'Équation (La Méthode) - 7 colonnes */}
          <MonolithBlock
            backgroundTitle="METHOD"
            delay={0.2}
            className="md:col-span-7"
            data-monolith-block
            onHover={(hovered) => setHoveredBlock(hovered ? 1 : null)}
            isHovered={hoveredBlock === 1}
            isOtherHovered={hoveredBlock !== null && hoveredBlock !== 1}
          >
            <div className="flex flex-col h-full">
              <GlitchTitle scrollProgress={scrollYProgress} blockIndex={1} totalBlocks={4}>
                L&apos;Équation
              </GlitchTitle>
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  <span className="text-[#40B4A6]">Talent</span>
                  <span className="text-white/60 mx-3">+</span>
                  <span className="text-[#40B4A6]">Stratégie</span>
                  <span className="text-white/60 mx-3">+</span>
                  <span className="text-[#40B4A6]">Lab</span>
                </div>
              </motion.div>
              <div className="flex-1 flex flex-col justify-end">
                <motion.p
                  className="text-lg md:text-xl text-white/80 font-light leading-relaxed mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  Trois forces, un seul impact. Nous mobilisons l&apos;intelligence humaine, nous la cadrons par une vision marché rigoureuse, et nous l&apos;éprouvons dans notre Lab pour garantir une exécution sans faille.
                </motion.p>
                <motion.p
                  className="text-base md:text-lg text-[#40B4A6] font-semibold uppercase tracking-wider"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  L&apos;ingénierie du succès.
                </motion.p>
              </div>
            </div>
          </MonolithBlock>

          {/* Bloc 3: L'Impact (Preuve de Valeur) - 5 colonnes */}
          <MonolithBlock
            backgroundTitle="IMPACT"
            delay={0.4}
            className="md:col-span-5"
            data-monolith-block
            onHover={(hovered) => setHoveredBlock(hovered ? 2 : null)}
            isHovered={hoveredBlock === 2}
            isOtherHovered={hoveredBlock !== null && hoveredBlock !== 2}
          >
            <div className="flex flex-col h-full">
              <GlitchTitle scrollProgress={scrollYProgress} blockIndex={2} totalBlocks={4}>
                L&apos;Impact
              </GlitchTitle>
              <div className="flex-1 flex flex-col justify-center space-y-8 mb-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <div
                    className="text-5xl md:text-6xl lg:text-7xl font-black mb-3"
                    style={{
                      color: "#40B4A6",
                      filter: "drop-shadow(0 0 15px rgba(64, 180, 166, 0.6))",
                    }}
                  >
                    +10 ans
                  </div>
                  <p className="text-base text-white/60">d&apos;expertise hybride</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                >
                  <div
                    className="text-5xl md:text-6xl lg:text-7xl font-black mb-3"
                    style={{
                      color: "#40B4A6",
                      filter: "drop-shadow(0 0 15px rgba(64, 180, 166, 0.6))",
                    }}
                  >
                    100%
                  </div>
                  <p className="text-base text-white/60">Focus Solutions</p>
                </motion.div>
              </div>
              <motion.p
                className="text-lg md:text-xl text-white/80 font-light leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
              >
                Notre obsession : la transformation concrète. Chaque ligne de code, chaque conseil stratégique est une brique posée vers votre leadership de marché.
              </motion.p>
            </div>
          </MonolithBlock>

          {/* Bloc 4: L'Engagement (CTA) - Pleine largeur */}
          <MonolithBlock
            backgroundTitle="ACTION"
            delay={0.6}
            className="md:col-span-12"
            data-monolith-block
            onHover={(hovered) => setHoveredBlock(hovered ? 3 : null)}
            isHovered={hoveredBlock === 3}
            isOtherHovered={hoveredBlock !== null && hoveredBlock !== 3}
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-12">
              <motion.div
                className="flex-1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <GlitchTitle scrollProgress={scrollYProgress} blockIndex={3} totalBlocks={4}>
                  Prêt pour l&apos;ascension ?
                </GlitchTitle>
                <p className="text-xl md:text-2xl text-white/80 font-light leading-relaxed mt-6">
                  Votre vision mérite une exécution d&apos;exception. Collaborons pour transformer vos défis en actifs stratégiques.
                </p>
              </motion.div>
              <motion.button
                className="group relative px-12 py-6 bg-[#40B4A6] text-white font-semibold rounded-full overflow-hidden whitespace-nowrap text-lg md:text-xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.9, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-3 uppercase tracking-tighter">
                  Initier le mouvement
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
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
