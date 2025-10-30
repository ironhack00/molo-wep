"use client";

import dynamic from "next/dynamic";
import { 
  AboutHeroSection
} from "../organisms/about";
import { BackgroundGlow } from "../molecules/BackgroundGlow";
import { CTAWhatsApp } from "../molecules/CTAWhatsApp";
import { cn, sectionPadding } from "@/utils/classNames";

/**
 * Template: AboutTemplate
 * Plantilla principal de la página About
 * Organiza todos los organismos de la sección
 */
export function AboutTemplate() {
  return (
    <div className="min-h-screen bg-black relative">
      {/* Iluminación de fondo - Reutiliza BackgroundGlow */}
      <BackgroundGlow theme="primary" intensity={0.6} />
      
      {/* Contenido con z-index */}
      <div className="relative z-10">
        {/* Hero Section */}
        <AboutHeroSection />
        
        {/* Secciones below-the-fold (carga diferida) */}
        <DynamicAboutMissionSection />
        <DynamicAboutValuesSection />
        <DynamicAboutTeamSection />
        
        {/* CTA WhatsApp */}
        <section className={cn(sectionPadding.y, sectionPadding.x)}>
          <CTAWhatsApp />
        </section>
      </div>
    </div>
  );
}

// Imports dinámicos al final
const DynamicAboutMissionSection = dynamic(() => import("../organisms/about/AboutMissionSection").then(m => ({ default: m.AboutMissionSection })), {
  loading: () => <div className="min-h-screen" />,
});

const DynamicAboutValuesSection = dynamic(() => import("../organisms/about/AboutValuesSection").then(m => ({ default: m.AboutValuesSection })), {
  loading: () => <div className="min-h-screen" />,
});

const DynamicAboutTeamSection = dynamic(() => import("../organisms/about/AboutTeamSection").then(m => ({ default: m.AboutTeamSection })), {
  loading: () => <div className="min-h-screen" />,
});

