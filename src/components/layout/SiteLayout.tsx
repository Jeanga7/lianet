"use client";

import { useState } from "react";
import { Sidebar, Navigation, FullMenu, ScrollProgressBar, MobileMenuButton } from "@/components/hero";
import { CustomCursor } from "@/components/ui";

interface SiteLayoutProps {
  children: React.ReactNode;
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  const [isFullMenuOpen, setIsFullMenuOpen] = useState(false);

  return (
    <>
      {/* Texture de grain globale - Fixed pour lier toutes les sections */}
      <div className="grain-bg" aria-hidden="true" />
      
      {/* Curseur personnalisé haute performance */}
      <CustomCursor enabled={true} />
      
      {/* Éléments fixes globaux */}
      <Sidebar onMenuClick={() => setIsFullMenuOpen(true)} />
      <Navigation />
      <MobileMenuButton onMenuClick={() => setIsFullMenuOpen(true)} />
      <FullMenu isOpen={isFullMenuOpen} onClose={() => setIsFullMenuOpen(false)} />
      <ScrollProgressBar className="fixed left-0 top-0 z-[90] w-full" />

      {/* Contenu de la page */}
      {children}
    </>
  );
}
