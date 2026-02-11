"use client";

import { useEffect, useRef } from "react";

interface ScrollZoneProps {
  targetSectionId: string;
}

const ScrollZone = ({ targetSectionId }: ScrollZoneProps) => {
  const zoneRef = useRef<HTMLDivElement>(null);

  // Détecter si on est sur mobile
  const isMobile = typeof window !== "undefined" && (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0
  );

  useEffect(() => {
    if (isMobile) return;

    const handleMouseEnter = () => {
      window.dispatchEvent(new CustomEvent("scrollZoneHover", {
        detail: { isHovered: true }
      }));
    };

    const handleMouseLeave = () => {
      window.dispatchEvent(new CustomEvent("scrollZoneHover", {
        detail: { isHovered: false }
      }));
    };

    const handleClick = (e: MouseEvent) => {
      e.preventDefault();
      
      // Scroll fluide vers la section suivante
      const targetSection = document.getElementById(targetSectionId);
      if (targetSection) {
        targetSection.scrollIntoView({ 
          behavior: "smooth", 
          block: "start" 
        });
      }
    };

    const handleWheel = (e: WheelEvent) => {
      // Permettre le scroll normal en propageant l'événement au conteneur de scroll
      const mainScroll = document.getElementById("main-scroll");
      if (mainScroll) {
        mainScroll.scrollBy({
          top: e.deltaY,
          left: e.deltaX,
          behavior: "auto"
        });
      }
    };

    const zone = zoneRef.current;
    if (zone) {
      zone.addEventListener("mouseenter", handleMouseEnter);
      zone.addEventListener("mouseleave", handleMouseLeave);
      zone.addEventListener("click", handleClick);
      zone.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (zone) {
        zone.removeEventListener("mouseenter", handleMouseEnter);
        zone.removeEventListener("mouseleave", handleMouseLeave);
        zone.removeEventListener("click", handleClick);
        zone.removeEventListener("wheel", handleWheel);
      }
    };
  }, [isMobile, targetSectionId]);

  if (isMobile) return null;

  return (
    <div
      ref={zoneRef}
      className="fixed bottom-0 left-0 right-0 h-[6vh] pointer-events-auto cursor-none z-40 w-full lg:w-[calc(100%-5rem)] lg:ml-20"
      aria-hidden="true"
    />
  );
};

export default ScrollZone;
