"use client";

import { useCallback, useEffect, useState } from "react";
import { Sidebar, Navigation, FullMenu, ScrollProgressBar, MobileHeader } from "@/components/hero";
import { CustomCursor, PageWipe, WhatsAppButton } from "@/components/ui";

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

  useEffect(() => {
    const handleWipeNavigation = (event: Event) => {
      const customEvent = event as CustomEvent<{ href?: string }>;
      const href = customEvent.detail?.href;
      if (!href) return;
      navigateWithWipe(href);
    };

    window.addEventListener("navigateWithWipe", handleWipeNavigation as EventListener);
    return () => {
      window.removeEventListener("navigateWithWipe", handleWipeNavigation as EventListener);
    };
  }, [navigateWithWipe]);

  return (
    <>
      {/* Texture de grain globale - Fixed pour lier toutes les sections */}
      <div className="grain-bg" aria-hidden="true" />

      {/* Curseur personnalisé haute performance */}
      <CustomCursor enabled={true} />

      {/* Éléments fixes globaux */}
      <Sidebar onMenuClick={() => setIsFullMenuOpen(true)} />
      <Navigation onNavigateWithWipe={navigateWithWipe} />
      <MobileHeader onMenuClick={() => setIsFullMenuOpen(true)} />
      <WhatsAppButton />
      <FullMenu
        isOpen={isFullMenuOpen}
        onClose={() => setIsFullMenuOpen(false)}
        onNavigateWithWipe={navigateWithWipe}
      />
      <ScrollProgressBar className="fixed left-0 top-0 z-[90] w-full" />

      <div className="relative h-screen w-full overflow-hidden lg:pl-20">
        {children}
      </div>

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
