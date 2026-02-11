"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Users, Target, FlaskConical, TrendingUp, Eye, Lightbulb, Zap, Sparkles, CheckCircle2, Award, Globe, Code, Briefcase, Rocket, Hexagon, Circle, Diamond, Plus, Minus } from "lucide-react";
import { HeroPrimaryButton } from "@/components/ui/HeroButtons";

// Composant Lens Flare pour le socle
const LensFlare = () => {
  return (
    <motion.div
      className="absolute top-0 h-[2px] w-32 pointer-events-none z-30"
      style={{
        background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), rgba(64, 180, 166, 0.4), rgba(255, 255, 255, 0.6), transparent)",
        filter: "blur(1px)",
        left: "-8rem",
      }}
      animate={{
        left: ["-8rem", "100%"],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
};

// Composant Badge pour les éléments clés
const Badge = ({ 
  children, 
  variant = "default",
  icon: Icon,
  className = "" 
}: { 
  children: React.ReactNode; 
  variant?: "default" | "accent" | "highlight";
  icon?: React.ElementType;
  className?: string;
}) => {
  const variants = {
    default: "bg-white/5 border-white/10 text-white",
    accent: "bg-[#40B4A6]/10 border-[#40B4A6]/30 text-[#40B4A6]",
    highlight: "bg-[#40B4A6]/20 border-[#40B4A6]/50 text-white",
  };

  return (
    <motion.span
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs md:text-sm font-semibold border ${variants[variant]} ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {Icon && <Icon className="w-3 h-3" />}
      {children}
    </motion.span>
  );
};

// Composant Séparateur décoratif
const DecorativeSeparator = ({ 
  orientation = "horizontal",
  variant = "default",
  className = "" 
}: { 
  orientation?: "horizontal" | "vertical";
  variant?: "default" | "accent" | "bold";
  className?: string;
}) => {
  const variants = {
    default: "bg-white/15",
    accent: "bg-[#40B4A6]/40",
    bold: "bg-white/25",
  };

  if (orientation === "vertical") {
    return (
      <motion.div
        className={`w-[1px] h-full ${variants[variant]} ${className}`}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />
    );
  }

  return (
    <motion.div
      className={`h-[1px] w-full ${variants[variant]} ${className}`}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    />
  );
};

// Composant Icône décorative en arrière-plan
const DecorativeIcon = ({ 
  icon: Icon,
  position = "top-right",
  size = "large",
  opacity = 0.05,
  className = "" 
}: { 
  icon: React.ElementType;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "center";
  size?: "small" | "medium" | "large";
  opacity?: number;
  className?: string;
}) => {
  const positions = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "center": "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  };

  const sizes = {
    small: "w-12 h-12 md:w-16 md:h-16",
    medium: "w-16 h-16 md:w-24 md:h-24",
    large: "w-24 h-24 md:w-32 md:h-32",
  };

  return (
    <motion.div
      className={`absolute ${positions[position]} ${sizes[size]} pointer-events-none z-0 ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <Icon className="w-full h-full text-white" />
    </motion.div>
  );
};

// Composant Forme géométrique décorative
const GeometricShape = ({ 
  shape = "circle",
  size = "medium",
  position = "top-right",
  className = "" 
}: { 
  shape?: "circle" | "hexagon" | "diamond";
  size?: "small" | "medium" | "large";
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  className?: string;
}) => {
  const positions = {
    "top-right": "top-2 right-2",
    "top-left": "top-2 left-2",
    "bottom-right": "bottom-2 right-2",
    "bottom-left": "bottom-2 left-2",
  };

  const sizes = {
    small: "w-2 h-2",
    medium: "w-3 h-3",
    large: "w-4 h-4",
  };

  const shapes = {
    circle: Circle,
    hexagon: Hexagon,
    diamond: Diamond,
  };

  const ShapeIcon = shapes[shape];

  return (
    <motion.div
      className={`absolute ${positions[position]} ${sizes[size]} pointer-events-none z-10 ${className}`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 0.3, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <ShapeIcon className="w-full h-full text-[#40B4A6]" />
    </motion.div>
  );
};

// Composant pour une carte de la grille cinétique
const KineticCard = ({
  title,
  icon: Icon,
  content,
  isHovered,
  onHover,
  onLeave,
  isMobile,
  isExpanded,
  onToggle,
  isBottomRow = false,
  watermark,
  cardId,
}: {
  title: string;
  icon: React.ElementType;
  content: React.ReactNode;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  isMobile: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  isBottomRow?: boolean;
  watermark?: string;
  cardId: string;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, {
    once: false,
    amount: 0.3,
    margin: "-100px 0px -100px 0px",
  });

  // Pour mobile : effet Reveal au scroll
  const mobileReveal = isMobile && isInView;
  // Pour Bottom Row (Action), toujours expanded - pas d'état compact
  const isExpandedState = isBottomRow || isHovered || isExpanded || (isMobile && mobileReveal);

  return (
            <motion.div
              ref={cardRef}
              className="relative h-full rounded-2xl"
              style={{
                overflow: isMobile ? "visible" : "hidden",
                minHeight: 0,
                maxHeight: isMobile ? "none" : "100%",
                cursor: isMobile ? "pointer" : "default",
              }}
      initial={false}
      layout
      animate={{
        flex: isMobile
          ? undefined
          : isHovered
          ? 2
          : 0.5,
        scale: mobileReveal ? 1.02 : 1,
        boxShadow: isMobile && isExpanded
          ? "0 0 20px rgba(64, 180, 166, 0.4), 0 0 40px rgba(64, 180, 166, 0.2)"
          : isMobile
          ? "0 0 0px rgba(64, 180, 166, 0)"
          : undefined,
      }}
      transition={{
        type: "spring",
        bounce: 0.3,
        stiffness: 150,
        damping: 20,
        layout: {
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1],
        },
      }}
      onMouseEnter={!isMobile ? onHover : undefined}
      onMouseLeave={!isMobile ? onLeave : undefined}
      onClick={isMobile ? onToggle : undefined}
    >
      {/* Lens Flare pour le socle (Bottom Row) */}
      {isBottomRow && <LensFlare />}

      {/* Watermark arrière-plan */}
      {watermark && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
          animate={{
            opacity: isExpandedState ? 0.1 : 0.05,
          }}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <span
            className="font-title text-[clamp(4rem,15vw,12rem)] font-black text-white uppercase tracking-[-0.04em] leading-[1.1]"
            style={{
              writingMode: "horizontal-tb",
            }}
          >
            {watermark}
          </span>
        </motion.div>
      )}

      {/* Bordure dégradé "Verre de Quartz" avec shared transition */}
      <motion.div
        layoutId={`card-border-${cardId}`}
        className="absolute inset-0 rounded-2xl pointer-events-none z-10"
        style={{
          borderTop: "1px solid rgba(255, 255, 255, 0.2)",
          borderLeft: "1px solid rgba(255, 255, 255, 0.2)",
          borderRight: isMobile && isBottomRow ? "2px solid rgba(64, 180, 166, 0.6)" : "none",
          borderBottom: isMobile && isBottomRow ? "2px solid rgba(64, 180, 166, 0.6)" : "none",
          boxShadow: isExpandedState
            ? isMobile
              ? "inset 0 0 20px rgba(0, 0, 0, 0.2), 0 0 20px rgba(64, 180, 166, 0.4), 0 0 40px rgba(64, 180, 166, 0.2)"
              : "inset 0 0 20px rgba(0, 0, 0, 0.2), 0 0 20px rgba(64, 180, 166, 0.3)"
            : isMobile && isBottomRow
            ? "inset 0 0 20px rgba(0, 0, 0, 0.2), 0 0 10px rgba(64, 180, 166, 0.3)"
            : "inset 0 0 20px rgba(0, 0, 0, 0.2)",
        }}
        animate={{
          opacity: isExpandedState ? 1 : 0.8,
          borderColor: isMobile && isExpanded
            ? "rgba(64, 180, 166, 0.5)"
            : isMobile && isBottomRow
            ? "rgba(64, 180, 166, 0.6)"
            : undefined,
        }}
        transition={{
          type: "spring",
          bounce: 0.3,
          stiffness: 150,
          damping: 20,
          layout: {
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
          },
        }}
      />

      {/* Fond "Verre de Quartz" */}
      <motion.div
        className="absolute inset-0 backdrop-blur-2xl"
        style={{
          backgroundColor: isMobile && isBottomRow
            ? "rgba(64, 180, 166, 0.05)"
            : "rgba(255, 255, 255, 0.03)",
        }}
        animate={{
          backgroundColor: isExpandedState
            ? isMobile && isBottomRow
              ? "rgba(64, 180, 166, 0.08)"
              : "rgba(255, 255, 255, 0.06)"
            : isMobile && isBottomRow
            ? "rgba(64, 180, 166, 0.05)"
            : "rgba(255, 255, 255, 0.03)",
          backdropFilter: isExpandedState ? "blur(32px)" : "blur(24px)",
        }}
        transition={{
          type: "spring",
          bounce: 0.3,
          stiffness: 150,
          damping: 20,
        }}
      />

      {/* Formes géométriques décoratives (visibles uniquement en expanded) */}
      {isExpandedState && (
        <>
          <motion.div
            className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[#40B4A6]/20 pointer-events-none z-5"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          />
          <motion.div
            className="absolute bottom-4 left-4 w-3 h-3 rounded-full bg-[#40B4A6]/15 pointer-events-none z-5"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          />
          <motion.div
            className="absolute top-1/2 right-8 w-1 h-16 bg-gradient-to-b from-transparent via-[#40B4A6]/10 to-transparent pointer-events-none z-5"
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          />
        </>
      )}

      {/* Contenu de la carte avec padding dynamique */}
      <motion.div
        className="relative z-20 h-full flex flex-col"
        style={{
          minHeight: 0,
          maxHeight: "100%",
        }}
        animate={{
          padding: isExpandedState
            ? isBottomRow
              ? "1rem 2rem"
              : "2rem 2.5rem"
            : "1rem",
        }}
        transition={{
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {/* État Repos : Différent selon mobile/desktop et Bottom Row */}
        <AnimatePresence mode="wait">
          {!isExpandedState && !isBottomRow ? (
            isMobile ? (
              // État compact mobile : Titre horizontal + Icône + Plus
              <motion.div
                key="compact-mobile"
                className="flex flex-row items-center justify-between h-full w-full px-4"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-3">
                  {/* Icône avec shared transition */}
                  <motion.div
                    layoutId={`card-icon-${cardId}`}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    transition={{
                      type: "spring",
                      bounce: 0.3,
                      stiffness: 150,
                      damping: 20,
                      layout: {
                        duration: 0.6,
                        ease: [0.16, 1, 0.3, 1],
                      },
                    }}
                  >
                    <Icon className="w-6 h-6 text-[#40B4A6] flex-shrink-0" />
                  </motion.div>

                  {/* Titre horizontal pour mobile */}
                  <motion.h2
                    layoutId={`card-title-${cardId}`}
                    className="font-title text-white font-bold uppercase tracking-tighter text-base"
                    style={{
                      writingMode: "horizontal-tb",
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    transition={{
                      type: "spring",
                      bounce: 0.3,
                      stiffness: 150,
                      damping: 20,
                      layout: {
                        duration: 0.6,
                        ease: [0.16, 1, 0.3, 1],
                      },
                    }}
                  >
                    {title}
                  </motion.h2>
                </div>

                {/* Icône Plus en Turquoise */}
                <motion.div
                  animate={{
                    rotate: 0,
                    scale: 1,
                  }}
                  transition={{
                    type: "spring",
                    bounce: 0.3,
                    stiffness: 150,
                    damping: 20,
                  }}
                >
                  <Plus className="w-5 h-5 text-[#40B4A6] flex-shrink-0" />
                </motion.div>
              </motion.div>
            ) : (
              // État compact vertical pour desktop (cartes normales)
              <motion.div
                key="compact-vertical"
                className="flex flex-col items-center justify-center h-full"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Icône avec shared transition */}
                <motion.div
                  layoutId={`card-icon-${cardId}`}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    type: "spring",
                    bounce: 0.3,
                    stiffness: 150,
                    damping: 20,
                    layout: {
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  }}
                >
                  <Icon className="w-8 h-8 md:w-10 md:h-10 text-[#40B4A6] mb-4" />
                </motion.div>

                {/* Titre vertical avec shared transition */}
                <motion.div
                  layoutId={`card-title-${cardId}`}
                  className="font-title writing-vertical-rl text-white font-bold uppercase tracking-wider text-base md:text-lg"
                  style={{
                    writingMode: "vertical-rl",
                    textOrientation: "mixed",
                  }}
                  animate={{
                    opacity: 1,
                    rotate: 0,
                  }}
                  transition={{
                    type: "spring",
                    bounce: 0.3,
                    stiffness: 150,
                    damping: 20,
                    layout: {
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  }}
                >
                  {title}
                </motion.div>
              </motion.div>
            )
          ) : isBottomRow ? (
            // Layout horizontal pour Bottom Row (carte Action)
            <motion.div
              key="expanded-horizontal"
              className="h-full flex flex-row items-center gap-4 md:gap-6 w-full"
              style={{ minHeight: 0, maxHeight: "100%" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* Zone gauche : Titre */}
              <motion.h2
                layoutId={`card-title-${cardId}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0,
                  ease: [0.16, 1, 0.3, 1],
                  layout: {
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  },
                }}
                className="font-title text-white font-bold uppercase tracking-tighter leading-tight flex-shrink-0"
                style={{
                  fontSize: "clamp(1.5rem, 2vw + 1rem, 2.5rem)",
                  writingMode: "horizontal-tb",
                }}
              >
                {title}
              </motion.h2>

              {/* Zone centre : Texte descriptif (flex-grow) */}
              <motion.div
                className="flex-grow flex items-center min-w-0"
                style={{
                  overflow: "hidden",
                }}
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.2,
                      delayChildren: 0.2,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  },
                }}
                initial="hidden"
                animate="show"
              >
                {content}
              </motion.div>
            </motion.div>
          ) : (
            // Layout expanded : Vertical pour desktop, Accordion pour mobile
            <motion.div
              key={isMobile ? "expanded-mobile" : "expanded-vertical"}
              className={isMobile ? "h-full flex flex-col" : "h-full flex flex-col justify-between"}
              style={{ minHeight: 0, maxHeight: "100%" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {isMobile ? (
                // Layout mobile accordion : Header + Contenu animé
                <>
                  {/* Header mobile : Titre + Icône + Minus */}
                  <motion.div
                    className="flex flex-row items-center justify-between px-4 py-3 border-b border-white/10"
                    layout
                  >
                    <div className="flex items-center gap-3">
                      <motion.div
                        layoutId={`card-icon-${cardId}`}
                        animate={{
                          opacity: 1,
                          scale: 1,
                        }}
                        transition={{
                          type: "spring",
                          bounce: 0.3,
                          stiffness: 150,
                          damping: 20,
                          layout: {
                            duration: 0.6,
                            ease: [0.16, 1, 0.3, 1],
                          },
                        }}
                      >
                        <Icon className="w-6 h-6 text-[#40B4A6] flex-shrink-0" />
                      </motion.div>
                      <motion.h2
                        layoutId={`card-title-${cardId}`}
                        className="font-title text-white font-bold uppercase tracking-tighter text-base"
                        style={{
                          writingMode: "horizontal-tb",
                        }}
                        animate={{
                          opacity: 1,
                        }}
                        transition={{
                          type: "spring",
                          bounce: 0.3,
                          stiffness: 150,
                          damping: 20,
                          layout: {
                            duration: 0.6,
                            ease: [0.16, 1, 0.3, 1],
                          },
                        }}
                      >
                        {title}
                      </motion.h2>
                    </div>
                    <motion.div
                      animate={{
                        rotate: 45,
                        scale: 1,
                      }}
                      transition={{
                        type: "spring",
                        bounce: 0.3,
                        stiffness: 150,
                        damping: 20,
                      }}
                    >
                      <Minus className="w-5 h-5 text-[#40B4A6] flex-shrink-0" />
                    </motion.div>
                  </motion.div>

                  {/* Contenu mobile avec animation fade + slide - Expansion naturelle sans scroll interne */}
                  <motion.div
                    className="flex-grow px-6 py-8"
                    style={{
                      overflow: "visible",
                      minHeight: 0,
                    }}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      show: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          staggerChildren: 0.1,
                          delayChildren: 0.1,
                          ease: [0.16, 1, 0.3, 1],
                        },
                      },
                    }}
                    initial="hidden"
                    animate="show"
                    exit={{ opacity: 0, y: 20 }}
                  >
                    {content}
                  </motion.div>
                </>
              ) : (
                // Layout desktop vertical (existant)
                <>
                  {/* Ligne de séparation SVG supérieure */}
                  <motion.svg
                    className="absolute top-16 left-0 right-0 h-[0.5px]"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{
                      duration: 0.6,
                      delay: 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <line
                      x1="0%"
                      y1="0"
                      x2="100%"
                      y2="0"
                      stroke="rgba(255, 255, 255, 0.15)"
                      strokeWidth="0.5"
                    />
                  </motion.svg>

                  {/* Titre horizontal en haut avec shared transition */}
                  <motion.h2
                    layoutId={`card-title-${cardId}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0,
                      ease: [0.16, 1, 0.3, 1],
                      layout: {
                        duration: 0.6,
                        ease: [0.16, 1, 0.3, 1],
                      },
                    }}
                    className="font-title mb-4 md:mb-5 text-white font-bold uppercase tracking-tighter leading-tight"
                    style={{
                      fontSize: "clamp(1.75rem, 2.5vw + 1.25rem, 3rem)",
                      writingMode: "horizontal-tb",
                    }}
                  >
                    {title}
                  </motion.h2>

                  {/* Contenu central avec flex-grow - optimisé pour éviter overflow */}
                  <motion.div
                    className="flex-grow flex flex-col justify-center scrollbar-hide"
                    style={{
                      minHeight: 0,
                      maxHeight: "100%",
                      overflow: "hidden",
                      alignItems: "stretch",
                    }}
                    variants={{
                      hidden: { opacity: 0 },
                      show: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.2,
                          delayChildren: 0.2,
                          ease: [0.16, 1, 0.3, 1],
                        },
                      },
                    }}
                    initial="hidden"
                    animate="show"
                  >
                    <style jsx>{`
                      div::-webkit-scrollbar {
                        display: none;
                      }
                    `}</style>
                    {content}
                  </motion.div>

                  {/* Ligne de séparation SVG inférieure */}
                  <motion.svg
                    className="absolute bottom-12 left-0 right-0 h-[0.5px]"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{
                      duration: 0.6,
                      delay: 0.3,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <line
                      x1="0%"
                      y1="0"
                      x2="100%"
                      y2="0"
                      stroke="rgba(255, 255, 255, 0.15)"
                      strokeWidth="0.5"
                    />
                  </motion.svg>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

const ManifesteSection = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const cardRef0 = useRef<HTMLDivElement>(null);
  const cardRef1 = useRef<HTMLDivElement>(null);
  const cardRef2 = useRef<HTMLDivElement>(null);
  const cardRef3 = useRef<HTMLDivElement>(null);
  const cardRefs = [cardRef0, cardRef1, cardRef2, cardRef3];
  const isClient = typeof window !== "undefined";

  // Contenu des 4 cartes
  const cardsData = [
    {
      title: "Vision",
      number: "01",
      icon: Eye,
      watermark: "VISION",
      content: (
        <>
          {/* Icônes décoratives en arrière-plan */}
          <DecorativeIcon icon={Sparkles} position="top-right" size="medium" opacity={0.08} />
          <DecorativeIcon icon={Globe} position="bottom-left" size="small" opacity={0.06} />
          <GeometricShape shape="hexagon" size="small" position="top-left" />
          <GeometricShape shape="diamond" size="small" position="bottom-right" />

          {/* Paragraphe principal enrichi - delay 0.2s */}
          <motion.p
            variants={{
              hidden: { opacity: 0, x: -20 },
              show: { opacity: 1, x: 0 },
            }}
            className="text-sm md:text-base text-white font-light leading-snug mb-4 relative z-10"
          >
            L&apos;innovation n&apos;est pas une destination, c&apos;est une architecture. Chez Lianet, nous ne nous contentons pas de suivre le flux technologique ; nous forgeons les connexions invisibles entre vos talents, votre stratégie et les outils de demain.
          </motion.p>

          {/* Points clés avec icônes - delay 0.3s */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -20 },
              show: { opacity: 1, x: 0 },
            }}
            className="space-y-3 mb-4 relative z-10"
          >
            <div className="relative flex items-start gap-3 bg-white/5 rounded-lg p-3 border border-white/10 hover:border-[#40B4A6]/30 transition-colors">
              <Sparkles className="w-5 h-5 text-[#40B4A6] mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm md:text-base text-white font-semibold mb-1">Architecture Technologique</p>
                <p className="text-xs md:text-sm text-white/80 font-light leading-snug">Conception de systèmes évolutifs et performants qui s&apos;adaptent à vos besoins croissants.</p>
              </div>
            </div>
            <div className="relative flex items-start gap-3 bg-white/5 rounded-lg p-3 border border-white/10 hover:border-[#40B4A6]/30 transition-colors">
              <Globe className="w-5 h-5 text-[#40B4A6] mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm md:text-base text-white font-semibold mb-1">Vision Globale</p>
                <p className="text-xs md:text-sm text-white/80 font-light leading-snug">Pensée stratégique à l&apos;échelle internationale avec une compréhension approfondie des marchés.</p>
              </div>
            </div>
            <div className="relative flex items-start gap-3 bg-white/5 rounded-lg p-3 border border-white/10 hover:border-[#40B4A6]/30 transition-colors">
              <Code className="w-5 h-5 text-[#40B4A6] mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm md:text-base text-white font-semibold mb-1">Excellence Technique</p>
                <p className="text-xs md:text-sm text-white/80 font-light leading-snug">Maîtrise des technologies de pointe avec une approche pragmatique et orientée résultats.</p>
              </div>
            </div>
          </motion.div>

          {/* Citation - delay 0.4s */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -20 },
              show: { opacity: 1, x: 0 },
            }}
            className="relative z-10 border-l-2 border-[#40B4A6]/50 pl-4 pt-2"
          >
            <p className="text-sm md:text-base text-[#40B4A6] italic font-serif leading-snug">
              &quot;Penser global, agir précis.&quot;
            </p>
          </motion.div>
        </>
      ),
    },
    {
      title: "Méthode",
      number: "02",
      icon: Lightbulb,
      watermark: "STRATEGY",
      content: (
        <>
          {/* Icônes décoratives en arrière-plan */}
          <DecorativeIcon icon={Lightbulb} position="top-right" size="medium" opacity={0.08} />
          <DecorativeIcon icon={Target} position="bottom-left" size="small" opacity={0.06} />
          <GeometricShape shape="circle" size="small" position="top-left" />
          <GeometricShape shape="hexagon" size="small" position="bottom-right" />

          {/* Introduction avec badge - delay 0.2s */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -20 },
              show: { opacity: 1, x: 0 },
            }}
            className="mb-4 relative z-10"
          >
            <p className="text-sm md:text-base text-white font-light leading-snug">
              Notre approche repose sur trois piliers fondamentaux qui se renforcent mutuellement pour créer un impact durable.
            </p>
          </motion.div>

          {/* Piliers développés - delay 0.3s */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -20 },
              show: { opacity: 1, x: 0 },
            }}
            className="space-y-3 mb-4 relative z-10"
          >
            <div className="relative bg-white/5 rounded-lg p-3 border border-white/10 hover:border-[#40B4A6]/30 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-5 h-5 text-[#40B4A6] flex-shrink-0" />
                <span className="text-sm md:text-base font-bold text-white">Talent</span>
              </div>
              <p className="text-xs md:text-sm text-white/90 font-light leading-snug ml-8">
                Mobilisation de l&apos;intelligence humaine et des compétences expertes pour transformer vos idées en réalité.
              </p>
            </div>
            <div className="relative bg-white/5 rounded-lg p-3 border border-white/10 hover:border-[#40B4A6]/30 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <Target className="w-5 h-5 text-[#40B4A6] flex-shrink-0" />
                <span className="text-sm md:text-base font-bold text-white">Stratégie</span>
              </div>
              <p className="text-xs md:text-sm text-white/90 font-light leading-snug ml-8">
                Vision marché rigoureuse et cadrage stratégique pour aligner chaque décision sur vos objectifs business.
              </p>
            </div>
            <div className="relative bg-white/5 rounded-lg p-3 border border-white/10 hover:border-[#40B4A6]/30 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <FlaskConical className="w-5 h-5 text-[#40B4A6] flex-shrink-0" />
                <span className="text-sm md:text-base font-bold text-white">Lab</span>
              </div>
              <p className="text-xs md:text-sm text-white/90 font-light leading-snug ml-8">
                Épreuve et validation dans notre laboratoire d&apos;innovation pour garantir une exécution sans faille.
              </p>
            </div>
          </motion.div>

          {/* Tagline - delay 0.4s */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -20 },
              show: { opacity: 1, x: 0 },
            }}
            className="flex items-center gap-2 pt-2 relative z-10"
          >
            <CheckCircle2 className="w-5 h-5 text-[#40B4A6]" />
            <p className="text-sm md:text-base text-white font-semibold">
              Trois forces, un seul impact.
            </p>
          </motion.div>
        </>
      ),
    },
    {
      title: "Impact",
      number: "03",
      icon: TrendingUp,
      watermark: "IMPACT",
      content: (
        <>
          {/* Icônes décoratives en arrière-plan */}
          <DecorativeIcon icon={TrendingUp} position="top-right" size="medium" opacity={0.08} />
          <DecorativeIcon icon={Award} position="bottom-left" size="small" opacity={0.06} />
          <GeometricShape shape="diamond" size="small" position="top-left" />
          <GeometricShape shape="circle" size="small" position="bottom-right" />

          {/* Introduction avec badge - delay 0.2s */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -20 },
              show: { opacity: 1, x: 0 },
            }}
            className="mb-2 relative z-10"
          >
            <p className="text-xs md:text-sm text-white font-light leading-tight">
              Notre obsession : la transformation concrète. Chaque ligne de code, chaque conseil stratégique est une brique posée vers votre leadership de marché.
            </p>
          </motion.div>

          {/* Grille de métriques - delay 0.3s */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -20 },
              show: { opacity: 1, x: 0 },
            }}
            className="grid grid-cols-2 gap-3 mb-4 relative z-10"
          >
            <div className="relative bg-white/5 rounded-lg p-3 border border-white/10 hover:border-[#40B4A6]/30 transition-colors">
              <div
                className="text-3xl md:text-4xl font-black mb-2"
                style={{
                  color: "#40B4A6",
                  filter: "drop-shadow(0 0 15px rgba(64, 180, 166, 0.6))",
                }}
              >
                +10 ans
              </div>
              <p className="text-xs md:text-sm text-white font-semibold mb-1">Expertise hybride</p>
              <p className="text-xs text-white/70 font-light">Technologie & Stratégie</p>
            </div>
            <div className="relative bg-white/5 rounded-lg p-3 border border-white/10 hover:border-[#40B4A6]/30 transition-colors">
              <div
                className="text-3xl md:text-4xl font-black mb-2"
                style={{
                  color: "#40B4A6",
                  filter: "drop-shadow(0 0 15px rgba(64, 180, 166, 0.6))",
                }}
              >
                100%
              </div>
              <p className="text-xs md:text-sm text-white font-semibold mb-1">Focus Solutions</p>
              <p className="text-xs text-white/70 font-light">Pas de remplissage</p>
            </div>
            <div className="relative bg-white/5 rounded-lg p-3 border border-white/10 hover:border-[#40B4A6]/30 transition-colors">
              <div
                className="text-3xl md:text-4xl font-black mb-2"
                style={{
                  color: "#40B4A6",
                  filter: "drop-shadow(0 0 15px rgba(64, 180, 166, 0.6))",
                }}
              >
                50+
              </div>
              <p className="text-xs md:text-sm text-white font-semibold mb-1">Projets livrés</p>
              <p className="text-xs text-white/70 font-light">Réussis & déployés</p>
            </div>
            <div className="relative bg-white/5 rounded-lg p-3 border border-white/10 hover:border-[#40B4A6]/30 transition-colors">
              <div
                className="text-3xl md:text-4xl font-black mb-2"
                style={{
                  color: "#40B4A6",
                  filter: "drop-shadow(0 0 15px rgba(64, 180, 166, 0.6))",
                }}
              >
                24/7
              </div>
              <p className="text-xs md:text-sm text-white font-semibold mb-1">Support</p>
              <p className="text-xs text-white/70 font-light">Disponibilité totale</p>
            </div>
          </motion.div>

          {/* Métriques supplémentaires - delay 0.35s */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
            className="grid grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6 relative z-10"
          >
            <div className="text-center bg-white/3 rounded-lg p-4 border border-white/5">
              <div className="text-2xl md:text-3xl font-bold text-[#40B4A6] mb-1">98%</div>
              <p className="text-xs md:text-sm text-white/70">Satisfaction</p>
            </div>
            <div className="text-center bg-white/3 rounded-lg p-4 border border-white/5">
              <div className="text-2xl md:text-3xl font-bold text-[#40B4A6] mb-1">15+</div>
              <p className="text-xs md:text-sm text-white/70">Pays</p>
            </div>
            <div className="text-center bg-white/3 rounded-lg p-4 border border-white/5">
              <div className="text-2xl md:text-3xl font-bold text-[#40B4A6] mb-1">200+</div>
              <p className="text-xs md:text-sm text-white/70">Clients</p>
            </div>
          </motion.div>

          {/* Séparateur décoratif */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1 },
            }}
            className="mb-4 md:mb-6"
          >
            <DecorativeSeparator variant="default" />
          </motion.div>

          {/* Badge de confiance enrichi - delay 0.4s */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -20 },
              show: { opacity: 1, x: 0 },
            }}
            className="flex items-center gap-3 md:gap-4 pt-2 relative z-10 flex-wrap"
          >
            <Award className="w-5 h-5 text-[#40B4A6] flex-shrink-0" />
            <p className="text-xs md:text-sm text-white font-light">
              <span className="font-semibold text-[#40B4A6]">Excellence certifiée</span> dans l&apos;exécution de projets complexes
            </p>
            <Badge variant="highlight" icon={Award}>Certifié</Badge>
          </motion.div>
        </>
      ),
    },
    {
      title: "Action",
      number: "04",
      icon: Zap,
      watermark: "ACTION",
      content: (
        <>
          {/* Icônes décoratives en arrière-plan */}
          <DecorativeIcon icon={Zap} position="top-right" size="medium" opacity={0.08} />
          <DecorativeIcon icon={Rocket} position="bottom-left" size="small" opacity={0.06} />
          <GeometricShape shape="hexagon" size="small" position="top-left" />
          <GeometricShape shape="diamond" size="small" position="bottom-right" />

          {/* Conteneur horizontal pour texte + bouton */}
          <div className="flex items-center gap-4 md:gap-6 w-full min-w-0 relative z-10">
            {/* Texte descriptif enrichi - flex-grow pour occuper l'espace */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -20 },
                show: { opacity: 1, x: 0 },
              }}
              className="flex-grow min-w-0"
            >
              <div className="mb-3">
                <Badge variant="default" icon={Zap}>Action</Badge>
              </div>
              <p className="text-sm md:text-base text-white font-light leading-snug mb-3">
                Votre vision mérite une exécution d&apos;exception. Collaborons pour transformer vos défis en actifs stratégiques.
              </p>
              <div className="flex items-center gap-3 text-xs md:text-sm text-white/70 flex-wrap">
                <Badge variant="accent" icon={Briefcase}>Consultation gratuite</Badge>
                <Badge variant="accent" icon={Rocket}>Déploiement rapide</Badge>
              </div>
            </motion.div>
            {/* Séparateur vertical décoratif */}
            <DecorativeSeparator orientation="vertical" variant="accent" className="hidden md:block" />
            {/* Bouton CTA - fixe à droite */}
            <HeroPrimaryButton
              variants={{
                hidden: { opacity: 0, x: -20, scale: 0.9 },
                show: { opacity: 1, x: 0, scale: 1 },
              }}
              label="Initier le mouvement"
              className="px-4 md:px-6 py-4.5 md:py-4.5 text-xs md:text-sm flex-shrink-0 uppercase tracking-tighter"
            />
          </div>
        </>
      ),
    },
  ];

  const handleCardHover = (index: number) => {
    setHoveredCard(index);
  };

  const handleCardLeave = () => {
    setHoveredCard(null);
  };

  const handleCardToggle = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  // Séparer les cartes : Top Row (0-2) et Bottom Row (3)
  const topRowCards = cardsData.slice(0, 3);
  const bottomRowCard = cardsData[3];

  return (
    <section
      id="manifeste"
      className="relative h-auto min-h-screen md:h-auto lg:h-screen w-full lg:w-[calc(100%-5rem)] lg:ml-20 snap-start snap-always flex-shrink-0 overflow-visible lg:overflow-hidden"
      style={{
        background: "#1B365D",
        paddingTop: "calc(8vh + 4rem)",
        paddingBottom: "8vh",
        paddingLeft: "1.5rem",
        paddingRight: "1.5rem",
      }}
      aria-label="Manifeste Lianet - Triptyque Vertical"
    >
      {/* Texture de grain */}

      {/* Layout Principal : Triptyque + Socle */}
      {!isClient ? (
        // Pendant le SSR, rendre une version simple avec toutes les versions pour éviter l'hydratation mismatch
        <>
          {/* Desktop: Triptyque Vertical + Socle Horizontal */}
          <div className="hidden lg:flex flex-col h-full gap-4 md:gap-6" style={{ minHeight: 0 }}>
            <div className="flex-grow flex gap-4 md:gap-6" style={{ minHeight: 0 }}>
              {topRowCards.map((card, index) => (
                <KineticCard
                  key={index}
                  title={card.title}
                  icon={card.icon}
                  content={card.content}
                  isHovered={false}
                  onHover={() => {}}
                  onLeave={() => {}}
                  isMobile={false}
                  isExpanded={false}
                  onToggle={() => {}}
                  isBottomRow={false}
                  watermark={card.watermark}
                  cardId={`card-${index}`}
                />
              ))}
            </div>
            <div className="h-[15vh] w-full relative">
              <KineticCard
                title={bottomRowCard.title}
                icon={bottomRowCard.icon}
                content={bottomRowCard.content}
                isHovered={false}
                onHover={() => {}}
                onLeave={() => {}}
                isMobile={false}
                isExpanded={false}
                onToggle={() => {}}
                isBottomRow={true}
                watermark={bottomRowCard.watermark}
                cardId="card-3"
              />
            </div>
          </div>
          {/* Tablette: Layout 2x2 ou 3+1 - Rendu mais caché en SSR */}
          <div className="hidden md:flex lg:hidden flex-col h-full gap-4 md:gap-6" style={{ minHeight: 0 }}>
            {/* Top Row : 3 cartes */}
            <div className="flex-grow grid grid-cols-3 gap-4 md:gap-6" style={{ minHeight: 0 }}>
              {topRowCards.map((card, index) => (
                <motion.div
                  key={index}
                  className="relative rounded-2xl"
                  style={{
                    overflow: "hidden",
                    minHeight: 0,
                    maxHeight: "100%",
                    height: "100%",
                  }}
                  initial={false}
                  animate={{
                    height: "100%",
                  }}
                >
                  <KineticCard
                    title={card.title}
                    icon={card.icon}
                    content={card.content}
                    isHovered={false}
                    onHover={() => {}}
                    onLeave={() => {}}
                    isMobile={true}
                    isExpanded={false}
                    onToggle={() => {}}
                    isBottomRow={false}
                    watermark={card.watermark}
                    cardId={`card-${index}`}
                  />
                </motion.div>
              ))}
            </div>
            {/* Bottom Row : 1 carte */}
            <div className="h-[15vh] w-full">
              <KineticCard
                title={bottomRowCard.title}
                icon={bottomRowCard.icon}
                content={bottomRowCard.content}
                isHovered={false}
                onHover={() => {}}
                onLeave={() => {}}
                isMobile={true}
                isExpanded={false}
                onToggle={() => {}}
                isBottomRow={true}
                watermark={bottomRowCard.watermark}
                cardId="card-3"
              />
            </div>
          </div>
          {/* Mobile: Cartes empilées verticalement - Rendu mais caché en SSR */}
          <div className="md:hidden flex flex-col gap-6 md:gap-8 pb-8">
            {cardsData.map((card, index) => (
              <div key={index} className="relative rounded-2xl" style={{ minHeight: "200px", height: "200px", overflow: "hidden" }}>
                <KineticCard
                  title={card.title}
                  icon={card.icon}
                  content={card.content}
                  isHovered={false}
                  onHover={() => {}}
                  onLeave={() => {}}
                  isMobile={true}
                  isExpanded={false}
                  onToggle={() => {}}
                  isBottomRow={index === 3}
                  watermark={card.watermark}
                  cardId={`card-${index}`}
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* Desktop: Triptyque Vertical + Socle Horizontal */}
          <div className="hidden lg:flex flex-col h-full gap-4 md:gap-6" style={{ minHeight: 0 }}>
            {/* Top Row : Les 3 Piliers */}
            <div className="flex-grow flex gap-4 md:gap-6" style={{ minHeight: 0 }}>
              {topRowCards.map((card, index) => (
                <KineticCard
                  key={index}
                  title={card.title}
                  icon={card.icon}
                  content={card.content}
                  isHovered={hoveredCard === index}
                  onHover={() => handleCardHover(index)}
                  onLeave={handleCardLeave}
                  isMobile={false}
                  isExpanded={false}
                  onToggle={() => {}}
                  isBottomRow={false}
                  watermark={card.watermark}
                  cardId={`card-${index}`}
                />
              ))}
            </div>

            {/* Bottom Row : Le Socle (Action) */}
            <div className="h-[15vh] w-full relative">
              <KineticCard
                title={bottomRowCard.title}
                icon={bottomRowCard.icon}
                content={bottomRowCard.content}
                isHovered={hoveredCard === 3}
                onHover={() => handleCardHover(3)}
                onLeave={handleCardLeave}
                isMobile={false}
                isExpanded={false}
                onToggle={() => {}}
                isBottomRow={true}
                watermark={bottomRowCard.watermark}
                cardId="card-3"
              />
            </div>
          </div>

          {/* Tablette: Layout 2x2 ou 3+1 */}
          <div className="hidden md:flex lg:hidden flex-col h-full gap-4 md:gap-6" style={{ minHeight: 0 }}>
            {/* Top Row : 3 cartes */}
            <div className="flex-grow grid grid-cols-3 gap-4 md:gap-6" style={{ minHeight: 0 }}>
              {topRowCards.map((card, index) => (
                <motion.div
                  key={index}
                  ref={cardRefs[index]}
                  className="relative rounded-2xl"
                  style={{
                    overflow: "hidden",
                    minHeight: 0,
                    maxHeight: "100%",
                    height: "100%",
                  }}
                  initial={false}
                  animate={{
                    height: expandedCard === index ? "auto" : "100%",
                  }}
                  transition={{
                    type: "spring",
                    bounce: 0.3,
                    stiffness: 150,
                    damping: 20,
                  }}
                  onClick={() => handleCardToggle(index)}
                >
                  <KineticCard
                    title={card.title}
                    icon={card.icon}
                    content={card.content}
                    isHovered={false}
                    onHover={() => {}}
                    onLeave={() => {}}
                    isMobile={true}
                    isExpanded={expandedCard === index}
                    onToggle={() => handleCardToggle(index)}
                    isBottomRow={false}
                    watermark={card.watermark}
                    cardId={`card-${index}`}
                  />
                </motion.div>
              ))}
            </div>
            {/* Bottom Row : 1 carte */}
            <div className="h-[15vh] w-full">
              <KineticCard
                title={bottomRowCard.title}
                icon={bottomRowCard.icon}
                content={bottomRowCard.content}
                isHovered={false}
                onHover={() => {}}
                onLeave={() => {}}
                isMobile={true}
                isExpanded={expandedCard === 3}
                onToggle={() => handleCardToggle(3)}
                isBottomRow={true}
                watermark={bottomRowCard.watermark}
                cardId="card-3"
              />
            </div>
          </div>

          {/* Mobile: Cartes empilées verticalement - Inspiré de ExpertiseSection avec hauteur libre */}
          <div className="md:hidden flex flex-col gap-6 md:gap-8 pb-8">
            {cardsData.map((card, index) => (
              <motion.div
                key={index}
                ref={cardRefs[index]}
                className="relative rounded-2xl"
                style={{
                  minHeight: expandedCard === index ? "auto" : "200px",
                  height: expandedCard === index ? "auto" : "200px",
                  overflow: "hidden",
                }}
                initial={false}
                animate={{
                  minHeight: expandedCard === index ? "auto" : "200px",
                  height: expandedCard === index ? "auto" : "200px",
                }}
                transition={{
                  type: "spring",
                  bounce: 0.3,
                  stiffness: 150,
                  damping: 20,
                  layout: {
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  },
                }}
                layout
                onClick={() => handleCardToggle(index)}
              >
                <KineticCard
                  title={card.title}
                  icon={card.icon}
                  content={card.content}
                  isHovered={false}
                  onHover={() => {}}
                  onLeave={() => {}}
                  isMobile={true}
                  isExpanded={expandedCard === index}
                  onToggle={() => handleCardToggle(index)}
                  isBottomRow={index === 3}
                  watermark={card.watermark}
                  cardId={`card-${index}`}
                />
              </motion.div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default ManifesteSection;
