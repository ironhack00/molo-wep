"use client";

import { 
  DevelopmentHeroSection, 
  DevelopmentWhySection,
  DevelopmentProjectsSection,
  DevelopmentServicesSection,
  DevelopmentWhyChooseSection,
  DevelopmentPricingSection,
  DevelopmentFAQSection
} from "../organisms/development";
import { BackgroundGlow } from "../molecules/BackgroundGlow";

/**
 * Template: DevelopmentTemplate
 * Plantilla principal de la página de Desarrollo Web
 * Organiza todos los organismos de la sección
 */
export function DevelopmentTemplate() {
  return (
    <div className="min-h-screen bg-black relative">
      {/* Iluminación de fondo - Reutiliza BackgroundGlow */}
      <BackgroundGlow theme="development" intensity={0.6} />
      
      {/* Contenido con z-index */}
      <div className="relative z-10">
        {/* Hero Section */}
        <DevelopmentHeroSection />
        
        {/* Why Modern Web Section */}
        <DevelopmentWhySection />
        
        {/* Projects Section */}
        <DevelopmentProjectsSection />
        
        {/* Services Section */}
        <DevelopmentServicesSection />
        
        {/* Why Choose Section */}
        <DevelopmentWhyChooseSection />
        
        {/* Pricing Section */}
        <DevelopmentPricingSection />
        
        {/* FAQ Section */}
        <DevelopmentFAQSection />
      </div>
      
      {/* Aquí se pueden agregar más secciones en el futuro */}
    </div>
  );
}

