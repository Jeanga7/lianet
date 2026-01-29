"use client";

import { useState } from "react";
import Sidebar from "@/components/hero/Sidebar";
import Navigation from "@/components/hero/Navigation";
import FullMenu from "@/components/hero/FullMenu";
import ScrollProgressBar from "@/components/hero/ScrollProgressBar";
import MobileMenuButton from "@/components/hero/MobileMenuButton";

interface SiteLayoutProps {
  children: React.ReactNode;
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  const [isFullMenuOpen, setIsFullMenuOpen] = useState(false);

  return (
    <>
      {/* Texture de grain globale - Fixed pour lier toutes les sections */}
      <div className="fixed inset-0 z-0 grain-bg pointer-events-none" aria-hidden="true" />
      
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
