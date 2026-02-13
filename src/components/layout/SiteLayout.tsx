"use client";

import { useCallback, useState } from "react";
import { Sidebar, Navigation, FullMenu, ScrollProgressBar, MobileMenuButton } from "@/components/hero";
import { CustomCursor, PageWipe } from "@/components/ui";

interface SiteLayoutProps {
  children: React.ReactNode;
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  const [isFullMenuOpen, setIsFullMenuOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetUrl, setTargetUrl] = useState<string | null>(null);

  const navigateWithWipe = useCallback((href: string) => {
    setTargetUrl(href);
    setIsTransitioning(true);
  }, []);

  return (
    <>
      {/* Texture de grain globale - Fixed pour lier toutes les sections */}
      <div className="grain-bg" aria-hidden="true" />
      
      {/* Curseur personnalisé haute performance */}
      <CustomCursor enabled={true} />
      
      {/* Éléments fixes globaux */}
      <Sidebar onMenuClick={() => setIsFullMenuOpen(true)} />
      <Navigation onNavigateWithWipe={navigateWithWipe} />
      <MobileMenuButton onMenuClick={() => setIsFullMenuOpen(true)} />
      <FullMenu
        isOpen={isFullMenuOpen}
        onClose={() => setIsFullMenuOpen(false)}
        onNavigateWithWipe={navigateWithWipe}
      />
      <ScrollProgressBar className="fixed left-0 top-0 z-[90] w-full" />

      {/* Contenu de la page */}
      {children}

      <PageWipe
        isActive={isTransitioning}
        targetUrl={targetUrl}
        color="#40B4A6"
        onComplete={() => {
          setIsTransitioning(false);
          setTargetUrl(null);
        }}
      />
    </>
  );
}
