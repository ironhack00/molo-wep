"use client";

import { 
  AboutHeroSection, 
  AboutMissionSection, 
  AboutValuesSection,
  AboutTeamSection
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
        
        {/* Mission Section */}
        <AboutMissionSection />
        
        {/* Values Section */}
        <AboutValuesSection />
        
        {/* Team Section */}
        <AboutTeamSection />
        
        {/* CTA WhatsApp */}
        <section className={cn(sectionPadding.y, sectionPadding.x)}>
          <CTAWhatsApp />
        </section>
      </div>
    </div>
  );
}

