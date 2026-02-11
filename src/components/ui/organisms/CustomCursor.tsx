"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, animate, useMotionTemplate } from "framer-motion";
import { ChevronDown } from "lucide-react";

type CursorState = "default" | "hover" | "text" | "drag" | "scroll" | "glow";

interface CustomCursorProps {
  enabled?: boolean;
}

// Fonction helper récursive pour obtenir la couleur de fond (définie en dehors du composant)
const getBackgroundColorRecursive = (element: HTMLElement | null, depth = 0): { r: number; g: number; b: number } => {
  if (!element || depth > 10) return { r: 255, g: 255, b: 255 }; // Par défaut blanc, limite de profondeur
  
  const style = window.getComputedStyle(element);
  const bgColor = style.backgroundColor;
  
  // Si la couleur est transparente ou rgba, remonter dans le DOM
  if (!bgColor || bgColor === "transparent" || bgColor === "rgba(0, 0, 0, 0)") {
    const parent = element.parentElement;
    if (parent) {
      return getBackgroundColorRecursive(parent, depth + 1);
    }
    return { r: 255, g: 255, b: 255 }; // Par défaut blanc
  }
  
  // Parser la couleur RGB
  const rgbMatch = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (rgbMatch) {
    return {
      r: parseInt(rgbMatch[1], 10),
      g: parseInt(rgbMatch[2], 10),
      b: parseInt(rgbMatch[3], 10),
    };
  }
  
  return { r: 255, g: 255, b: 255 }; // Par défaut blanc
};

// Fonction pour calculer la luminosité d'une couleur
const getLuminance = (r: number, g: number, b: number): number => {
  const [rs, gs, bs] = [r, g, b].map((val) => {
    val = val / 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

// Fonction pour détecter le type de fond (bleu profond, turquoise, blanc, ou autre)
const getBackgroundType = (r: number, g: number, b: number): "blue" | "turquoise" | "white" | "dark" | "light" => {
  // Bleu profond #1B365D (27, 54, 93)
  if (r >= 20 && r <= 35 && g >= 45 && g <= 65 && b >= 85 && b <= 100) {
    return "blue";
  }
  // Turquoise #40B4A6 (64, 180, 166) - Plage élargie pour mieux détecter
  if (r >= 40 && r <= 90 && g >= 150 && g <= 200 && b >= 140 && b <= 180) {
    return "turquoise";
  }
  // Blanc (luminosité très élevée)
  if (r >= 240 && g >= 240 && b >= 240) {
    return "white";
  }
  // Fond sombre (luminosité faible)
  const luminance = getLuminance(r, g, b);
  if (luminance < 0.3) {
    return "dark";
  }
  // Fond clair
  return "light";
};

const CustomCursor = ({ enabled = true }: CustomCursorProps) => {
  const [cursorState, setCursorState] = useState<CursorState>("default");
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverTarget, setHoverTarget] = useState<HTMLElement | null>(null);
  const [isLightBackground, setIsLightBackground] = useState(true);
  const [backgroundType, setBackgroundType] = useState<"blue" | "turquoise" | "white" | "dark" | "light">("light");
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const lastTimeRef = useRef(0);

  // Position du curseur (suivi direct, latence zéro pour le Dot)
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Position du Ring avec spring physics (retard organique)
  const ringX = useSpring(cursorX, {
    stiffness: 250,
    damping: 30,
    mass: 0.5,
  });
  const ringY = useSpring(cursorY, {
    stiffness: 250,
    damping: 30,
    mass: 0.5,
  });

  // Position magnétique (pour l'effet sticky sur les boutons)
  const magneticX = useMotionValue(0);
  const magneticY = useMotionValue(0);
  const magneticSpringX = useSpring(magneticX, {
    stiffness: 400,
    damping: 25,
    mass: 0.3,
  });
  const magneticSpringY = useSpring(magneticY, {
    stiffness: 400,
    damping: 25,
    mass: 0.3,
  });

  // Transformations pour le Ring selon l'état
  const ringSize = useMotionValue(40);
  const ringOpacity = useMotionValue(0.6); // Augmenté pour plus de visibilité
  const ringScaleY = useMotionValue(1);

  // Mettre à jour les valeurs du ring selon l'état
  useEffect(() => {
    switch (cursorState) {
      case "hover":
        animate(ringSize, 80, { duration: 0.3, ease: [0.16, 1, 0.3, 1] });
        animate(ringOpacity, 1, { duration: 0.3 });
        animate(ringScaleY, 1, { duration: 0.3 });
        break;
      case "glow":
        // Ring devient une lueur turquoise plus large pour le CTA primaire
        animate(ringSize, 120, { duration: 0.3, ease: [0.16, 1, 0.3, 1] });
        animate(ringOpacity, 1, { duration: 0.3 });
        animate(ringScaleY, 1, { duration: 0.3 });
        break;
      case "text":
        animate(ringSize, 2, { duration: 0.3, ease: [0.16, 1, 0.3, 1] });
        animate(ringOpacity, 0.8, { duration: 0.3 });
        animate(ringScaleY, 1.5, { duration: 0.3 });
        break;
      case "drag":
        animate(ringSize, 30, { duration: 0.3, ease: [0.16, 1, 0.3, 1] });
        animate(ringOpacity, 0.9, { duration: 0.3 });
        animate(ringScaleY, 1, { duration: 0.3 });
        break;
      case "scroll":
        // Ring s'étend de 40px à 100px avec spring physics
        animate(ringSize, 100, { 
          type: "spring",
          stiffness: 200,
          damping: 25,
        });
        animate(ringOpacity, 1, { duration: 0.3 });
        animate(ringScaleY, 1, { duration: 0.3 });
        break;
      default:
        animate(ringSize, 40, { duration: 0.3, ease: [0.16, 1, 0.3, 1] });
        animate(ringOpacity, 0.7, { duration: 0.3 }); // Augmenté pour plus de visibilité
        animate(ringScaleY, 1, { duration: 0.3 });
    }
  }, [cursorState, ringSize, ringOpacity, ringScaleY]);

  // Position combinée du Ring (position + magnétique)
  const ringXCombined = useTransform(
    [ringX, magneticSpringX, ringSize],
    ([x, mx, size]: number[]) => (x as number) - (size as number) / 2 + (mx as number)
  );
  const ringYCombined = useTransform(
    [ringY, magneticSpringY, ringSize],
    ([y, my, size]: number[]) => (y as number) - (size as number) / 2 + (my as number)
  );

  // Position du Dot (direct, sans retard)
  const dotX = useTransform(cursorX, (x: number) => x - 3);
  const dotY = useTransform(cursorY, (y: number) => y - 3);

  // Position de l'indicateur hover (halo + point central)
  const hoverIndicatorX = useTransform([cursorX, magneticSpringX], ([x, mx]: number[]) => (x as number) + (mx as number));
  const hoverIndicatorY = useTransform([cursorY, magneticSpringY], ([y, my]: number[]) => (y as number) + (my as number));
  
  // Position du halo externe (hover)
  const haloX = useTransform(hoverIndicatorX, (x: number) => x - 12);
  const haloY = useTransform(hoverIndicatorY, (y: number) => y - 12);
  
  // Position du point central (hover)
  const hoverDotX = useTransform(hoverIndicatorX, (x: number) => x - 4);
  const hoverDotY = useTransform(hoverIndicatorY, (y: number) => y - 4);

  // Traînée de lumière (ghost effect)
  const trailOpacity = useMotionValue(0);
  
  // Position de la traînée (doit être déclarée avant le return)
  const trailX = useTransform(ringX, (x: number) => x - 4);
  const trailY = useTransform(ringY, (y: number) => y - 4);

  // Position du contenu scroll (déclarée en dehors du JSX conditionnel)
  // ringXCombined et ringYCombined pointent vers le coin supérieur gauche du ring
  // Pour centrer le contenu, on doit ajouter la moitié de la taille du ring
  const scrollContentX = useTransform(
    [ringXCombined, ringSize],
    ([x, size]: number[]) => (x as number) + (size as number) / 2
  );
  const scrollContentY = useTransform(
    [ringYCombined, ringSize],
    ([y, size]: number[]) => (y as number) + (size as number) / 2
  );
  
  // Template de transformation pour centrer le contenu
  const scrollTransform = useMotionTemplate`translate(${scrollContentX}px, ${scrollContentY}px) translate(-50%, -50%)`;

  // Écouter les événements de la zone de scroll
  useEffect(() => {
    if (!enabled) return;

    const handleScrollZoneHover = (e: CustomEvent) => {
      const { isHovered } = e.detail;
      if (isHovered) {
        setCursorState("scroll");
      } else {
        // Ne pas réinitialiser si on est déjà dans un autre état
        if (cursorState === "scroll") {
          setCursorState("default");
        }
      }
    };

    window.addEventListener("scrollZoneHover", handleScrollZoneHover as EventListener);

    return () => {
      window.removeEventListener("scrollZoneHover", handleScrollZoneHover as EventListener);
    };
  }, [enabled, cursorState]);

  useEffect(() => {
    if (!enabled) return;

    // Détecter si on est sur un appareil tactile
    const isTouchDevice =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      // @ts-expect-error - msMaxTouchPoints is a legacy IE property
      navigator.msMaxTouchPoints > 0;

    if (isTouchDevice) {
      return; // Ne pas afficher le curseur sur mobile/tablette
    }

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      // Initialiser lastTimeRef si c'est le premier mouvement
      if (lastTimeRef.current === 0) {
        lastTimeRef.current = now;
      }
      const deltaTime = now - lastTimeRef.current;
      const deltaX = e.clientX - lastPositionRef.current.x;
      const deltaY = e.clientY - lastPositionRef.current.y;

      // Calculer la vélocité pour la traînée
      if (deltaTime > 0) {
        const velX = (deltaX / deltaTime) * 10;
        const velY = (deltaY / deltaTime) * 10;
        const speed = Math.sqrt(velX * velX + velY * velY);
        
        // Mettre à jour l'opacité de la traînée
        const intensity = Math.min(speed * 0.1, 0.3);
        animate(trailOpacity, intensity, { duration: 0.1 });
      }

      // Mettre à jour la position du curseur
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      lastPositionRef.current = { x: e.clientX, y: e.clientY };
      lastTimeRef.current = now;
      setIsVisible(true);

      // Détecter la couleur du fond sous le curseur
      try {
        const elementUnderCursor = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement;
        if (elementUnderCursor && typeof getBackgroundColorRecursive === 'function') {
          const bgColor = getBackgroundColorRecursive(elementUnderCursor);
          const luminance = getLuminance(bgColor.r, bgColor.g, bgColor.b);
          // Si la luminosité est > 0.5, c'est un fond clair
          setIsLightBackground(luminance > 0.5);
          // Détecter le type de fond
          const bgType = getBackgroundType(bgColor.r, bgColor.g, bgColor.b);
          setBackgroundType(bgType);
        }
      } catch (error) {
        // En cas d'erreur, utiliser le fond clair par défaut
        console.warn('Error detecting background color:', error);
        setIsLightBackground(true);
        setBackgroundType("light");
      }

      // Effet magnétique sur les éléments hover
      if (isHovering && hoverTarget) {
        const rect = hoverTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.sqrt(
          Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
        );
        const force = Math.min(30 / Math.max(distance, 1), 1); // Force magnétique
        magneticX.set((centerX - e.clientX) * force * 0.3);
        magneticY.set((centerY - e.clientY) * force * 0.3);
      } else {
        magneticX.set(0);
        magneticY.set(0);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      animate(trailOpacity, 0, { duration: 0.2 });
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Détecter les éléments interactifs
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Vérifier d'abord les attributs data-cursor spécifiques
      const glowElement = target.closest('[data-cursor="glow"]');
      const hoverElement = target.closest('[data-cursor="hover"]');
      
      if (glowElement) {
        setCursorState("glow");
        setIsHovering(true);
        setHoverTarget(glowElement as HTMLElement);
      } else if (hoverElement) {
        setCursorState("hover");
        setIsHovering(true);
        setHoverTarget(hoverElement as HTMLElement);
      } else {
        // Vérifier si c'est un élément interactif standard
        const isInteractive =
          target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.closest("button") ||
          target.closest("a") ||
          target.closest('[role="button"]');

        if (isInteractive) {
          setCursorState("hover");
          setIsHovering(true);
          setHoverTarget(
            (target.closest("button") ||
              target.closest("a") ||
              target.closest('[role="button"]') ||
              target) as HTMLElement
          );
        } else if (
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.closest("input") ||
          target.closest("textarea") ||
          target.closest('[data-cursor="text"]')
        ) {
          setCursorState("text");
          setIsHovering(false);
          setHoverTarget(null);
        } else if (
          target.closest('[data-cursor="drag"]') ||
          target.closest(".draggable")
        ) {
          setCursorState("drag");
          setIsHovering(false);
          setHoverTarget(null);
        } else {
          setCursorState("default");
          setIsHovering(false);
          setHoverTarget(null);
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [
    enabled,
    cursorX,
    cursorY,
    isHovering,
    hoverTarget,
    magneticX,
    magneticY,
    trailOpacity,
  ]);

  if (!enabled) return null;

  return (
    <>
      {/* Curseur personnalisé */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          visibility: isVisible ? "visible" : "hidden",
        }}
      >
        {/* Traînée de lumière (ghost effect) - très subtile - Palette Lianet */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 8,
            height: 8,
            backgroundColor: "rgb(64, 180, 166)", // --color-secondary #40B4A6
            x: trailX,
            y: trailY,
            opacity: trailOpacity,
            filter: "blur(4px)",
          }}
        />

        {/* Ring (Aura) - avec spring physics - Palette Lianet avec adaptation de couleur */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: ringSize,
            height: ringSize,
            borderRadius: cursorState === "scroll" ? "50px" : "50%",
            backgroundColor: cursorState === "scroll" 
              ? "rgba(64, 180, 166, 0.15)" 
              : cursorState === "glow"
              ? "rgba(64, 180, 166, 0.2)"
              : "transparent",
            backdropFilter: cursorState === "scroll" ? "blur(12px)" : cursorState === "glow" ? "blur(8px)" : "none",
            border: cursorState === "scroll"
              ? "1.5px solid rgba(64, 180, 166, 0.5)" // Bordure nette pour scroll
              : cursorState === "glow"
              ? "2px solid rgba(64, 180, 166, 1)" // Bordure turquoise pour glow
              : backgroundType === "turquoise"
              ? "2px solid rgba(255, 255, 255, 0.9)" // Blanc sur fond turquoise
              : isLightBackground
              ? "2px solid rgba(64, 180, 166, 0.9)" // Turquoise sur fond clair
              : "2px solid rgba(255, 255, 255, 0.9)", // Blanc sur fond sombre
            boxShadow: cursorState === "glow"
              ? "0 0 0 2px rgba(64, 180, 166, 0.3), 0 0 20px rgba(64, 180, 166, 0.8), 0 0 40px rgba(64, 180, 166, 0.4)" // Glow intense pour l'état glow
              : backgroundType === "turquoise"
              ? "0 0 0 1px rgba(27, 54, 93, 0.2), 0 0 8px rgba(255, 255, 255, 0.5)" // Ombre blanche sur turquoise
              : isLightBackground
              ? "0 0 0 1px rgba(0, 0, 0, 0.1), 0 0 8px rgba(64, 180, 166, 0.4)" // Contour sombre + glow turquoise
              : "0 0 0 1px rgba(64, 180, 166, 0.3), 0 0 8px rgba(255, 255, 255, 0.3)", // Contour turquoise + glow blanc
            x: ringXCombined,
            y: ringYCombined,
            opacity: ringOpacity,
            scaleY: ringScaleY,
          }}
          animate={
            cursorState === "drag"
              ? {
                  scale: [1, 1.1, 1],
                  boxShadow: isLightBackground
                    ? [
                        "0 0 0 1px rgba(0, 0, 0, 0.1), 0 0 8px rgba(64, 180, 166, 0.4), 0 0 0px rgba(64, 180, 166, 0)",
                        "0 0 0 1px rgba(0, 0, 0, 0.1), 0 0 8px rgba(64, 180, 166, 0.4), 0 0 20px rgba(64, 180, 166, 0.8)",
                        "0 0 0 1px rgba(0, 0, 0, 0.1), 0 0 8px rgba(64, 180, 166, 0.4), 0 0 0px rgba(64, 180, 166, 0)",
                      ]
                    : [
                        "0 0 0 1px rgba(64, 180, 166, 0.3), 0 0 8px rgba(255, 255, 255, 0.3), 0 0 0px rgba(255, 255, 255, 0)",
                        "0 0 0 1px rgba(64, 180, 166, 0.3), 0 0 8px rgba(255, 255, 255, 0.3), 0 0 20px rgba(255, 255, 255, 0.6)",
                        "0 0 0 1px rgba(64, 180, 166, 0.3), 0 0 8px rgba(255, 255, 255, 0.3), 0 0 0px rgba(255, 255, 255, 0)",
                      ],
                }
              : cursorState === "hover"
              ? {
                  borderColor: backgroundType === "turquoise"
                    ? "rgba(255, 255, 255, 1)" // Blanc sur fond turquoise pour contraste
                    : isLightBackground
                    ? "rgba(64, 180, 166, 1)" // Turquoise plein sur fond clair
                    : "rgba(255, 255, 255, 1)", // Blanc plein sur fond sombre
                  boxShadow: backgroundType === "turquoise"
                    ? "0 0 0 2px rgba(27, 54, 93, 0.3), 0 0 12px rgba(255, 255, 255, 0.6)" // Ombre blanche sur turquoise
                    : isLightBackground
                    ? "0 0 0 2px rgba(0, 0, 0, 0.15), 0 0 12px rgba(64, 180, 166, 0.5)"
                    : "0 0 0 2px rgba(64, 180, 166, 0.4), 0 0 12px rgba(255, 255, 255, 0.4)",
                }
              : {}
          }
          transition={
            cursorState === "drag"
              ? {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
              : {
                  type: "spring",
                  stiffness: 250,
                  damping: 30,
                  mass: 0.5,
                }
          }
        />

            {/* Dot (Point central) - latence zéro - Adaptation de couleur selon le fond */}
            {cursorState !== "hover" && cursorState !== "scroll" && cursorState !== "glow" && (
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 6,
              height: 6,
              backgroundColor: backgroundType === "turquoise"
                ? "rgb(255, 255, 255)" // Blanc sur fond turquoise
                : isLightBackground
                ? "rgb(64, 180, 166)" // Turquoise sur fond clair
                : "rgb(255, 255, 255)", // Blanc sur fond sombre
              boxShadow: backgroundType === "turquoise"
                ? "0 0 0 1px rgba(27, 54, 93, 0.3), 0 0 4px rgba(255, 255, 255, 0.8)" // Ombre blanche sur turquoise
                : isLightBackground
                ? "0 0 0 1px rgba(0, 0, 0, 0.2), 0 0 4px rgba(64, 180, 166, 0.5)"
                : "0 0 0 1px rgba(64, 180, 166, 0.3), 0 0 4px rgba(255, 255, 255, 0.5)",
              x: dotX,
              y: dotY,
            }}
          />
        )}

        {/* Indicateur glow - Halo pulsant turquoise (état glow) */}
        {cursorState === "glow" && (
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 150,
              height: 150,
              background: "radial-gradient(circle, rgba(64, 180, 166, 0.4), rgba(64, 180, 166, 0.1), transparent)",
              filter: "blur(12px)",
              x: ringXCombined,
              y: ringYCombined,
              left: "-75px",
              top: "-75px",
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.6, 0.9, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}

        {/* Indicateur hover premium - Halo pulsant avec point central (état hover) */}
        {cursorState === "hover" && (
          <>
            {/* Halo externe pulsant */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 24,
                height: 24,
                border: backgroundType === "turquoise"
                  ? "2px solid rgba(255, 255, 255, 0.4)" // Blanc sur fond turquoise
                  : isLightBackground
                  ? "2px solid rgba(64, 180, 166, 0.4)" // Turquoise sur fond clair
                  : "2px solid rgba(255, 255, 255, 0.4)", // Blanc sur fond sombre
                x: haloX,
                y: haloY,
                boxShadow: backgroundType === "turquoise"
                  ? "0 0 0 0 rgba(255, 255, 255, 0.7), 0 0 0 0 rgba(255, 255, 255, 0.5)"
                  : isLightBackground
                  ? "0 0 0 0 rgba(64, 180, 166, 0.7), 0 0 0 0 rgba(64, 180, 166, 0.5)"
                  : "0 0 0 0 rgba(255, 255, 255, 0.7), 0 0 0 0 rgba(255, 255, 255, 0.5)",
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: [0.6, 1, 0.6],
                scale: [1, 1.2, 1],
                boxShadow: backgroundType === "turquoise"
                  ? [
                      "0 0 0 0 rgba(255, 255, 255, 0.7), 0 0 0 0 rgba(255, 255, 255, 0.5)",
                      "0 0 0 8px rgba(255, 255, 255, 0), 0 0 0 12px rgba(255, 255, 255, 0)",
                      "0 0 0 0 rgba(255, 255, 255, 0.7), 0 0 0 0 rgba(255, 255, 255, 0.5)",
                    ]
                  : isLightBackground
                  ? [
                      "0 0 0 0 rgba(64, 180, 166, 0.7), 0 0 0 0 rgba(64, 180, 166, 0.5)",
                      "0 0 0 8px rgba(64, 180, 166, 0), 0 0 0 12px rgba(64, 180, 166, 0)",
                      "0 0 0 0 rgba(64, 180, 166, 0.7), 0 0 0 0 rgba(64, 180, 166, 0.5)",
                    ]
                  : [
                      "0 0 0 0 rgba(255, 255, 255, 0.7), 0 0 0 0 rgba(255, 255, 255, 0.5)",
                      "0 0 0 8px rgba(255, 255, 255, 0), 0 0 0 12px rgba(255, 255, 255, 0)",
                      "0 0 0 0 rgba(255, 255, 255, 0.7), 0 0 0 0 rgba(255, 255, 255, 0.5)",
                    ],
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            {/* Point central solide */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 8,
                height: 8,
                backgroundColor: backgroundType === "turquoise"
                  ? "rgb(255, 255, 255)" // Blanc sur fond turquoise
                  : isLightBackground
                  ? "rgb(64, 180, 166)" // Turquoise sur fond clair
                  : "rgb(255, 255, 255)", // Blanc sur fond sombre
                boxShadow: backgroundType === "turquoise"
                  ? "0 0 0 2px rgba(27, 54, 93, 0.3), 0 0 8px rgba(255, 255, 255, 0.8)" // Ombre blanche sur turquoise
                  : isLightBackground
                  ? "0 0 0 2px rgba(64, 180, 166, 0.3), 0 0 8px rgba(64, 180, 166, 0.6)"
                  : "0 0 0 2px rgba(255, 255, 255, 0.3), 0 0 8px rgba(255, 255, 255, 0.6)",
                x: hoverDotX,
                y: hoverDotY,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: 1,
                scale: [1, 1.1, 1],
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{
                opacity: { duration: 0.2 },
                scale: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            />
          </>
        )}

        {/* Contenu du curseur scroll (état scroll) */}
        {cursorState === "scroll" && (
          <motion.div
            className="absolute pointer-events-none flex flex-col items-center justify-center gap-1"
            style={{
              transform: scrollTransform,
              fontFamily: "var(--font-varela), 'Varela Round', sans-serif",
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              duration: 0.3,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {/* Texte SCROLL */}
            <span
              className="text-[10px] tracking-[0.2em] font-bold whitespace-nowrap"
              style={{
                color: backgroundType === "blue" 
                  ? "rgb(255, 255, 255)" // Blanc sur bleu profond
                  : backgroundType === "turquoise"
                  ? "rgb(27, 54, 93)" // Bleu profond sur turquoise
                  : backgroundType === "white"
                  ? "rgb(27, 54, 93)" // Bleu profond sur blanc
                  : isLightBackground
                  ? "rgb(27, 54, 93)" // Bleu profond sur fond clair
                  : "rgb(255, 255, 255)", // Blanc sur fond sombre
                textShadow: backgroundType === "blue" || (!isLightBackground && backgroundType !== "turquoise" && backgroundType !== "white")
                  ? "0 1px 2px rgba(0, 0, 0, 0.5)"
                  : "0 1px 2px rgba(255, 255, 255, 0.8)",
              }}
            >
              SCROLL
            </span>

            {/* Flèche animée */}
            <motion.div
              animate={{
                y: [-2, 2, -2],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ChevronDown
                className="w-3 h-3"
                style={{
                  color: backgroundType === "blue" 
                    ? "rgb(255, 255, 255)" // Blanc sur bleu profond
                    : backgroundType === "turquoise"
                    ? "rgb(27, 54, 93)" // Bleu profond sur turquoise
                    : backgroundType === "white"
                    ? "rgb(27, 54, 93)" // Bleu profond sur blanc
                    : isLightBackground
                    ? "rgb(27, 54, 93)" // Bleu profond sur fond clair
                    : "rgb(255, 255, 255)", // Blanc sur fond sombre
                  filter: backgroundType === "blue" || (!isLightBackground && backgroundType !== "turquoise" && backgroundType !== "white")
                    ? "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5))"
                    : "drop-shadow(0 1px 2px rgba(255, 255, 255, 0.8))",
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Masquer le curseur système */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
        @media (hover: none) and (pointer: coarse) {
          * {
            cursor: auto !important;
          }
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
