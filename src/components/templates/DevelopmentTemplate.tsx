"use client";

import dynamic from "next/dynamic";
import { 
  DevelopmentHeroSection
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
        
        {/* Secciones below-the-fold (carga diferida) */}
        <DynamicDevelopmentWhySection />
        <DynamicDevelopmentProjectsSection />
        <DynamicDevelopmentServicesSection />
        <DynamicDevelopmentWhyChooseSection />
        <DynamicDevelopmentPricingSection />
        <DynamicDevelopmentFAQSection />
      </div>
      
      {/* Aquí se pueden agregar más secciones en el futuro */}
    </div>
  );
}

// Imports dinámicos al final para mejor lectura
const DynamicDevelopmentWhySection = dynamic(() => import("../organisms/development/DevelopmentWhySection").then(m => ({ default: m.DevelopmentWhySection })), {
  loading: () => <div className="min-h-screen" />,
});

const DynamicDevelopmentProjectsSection = dynamic(() => import("../organisms/development/DevelopmentProjectsSection").then(m => ({ default: m.DevelopmentProjectsSection })), {
  loading: () => <div className="min-h-screen" />,
});

const DynamicDevelopmentServicesSection = dynamic(() => import("../organisms/development/DevelopmentServicesSection").then(m => ({ default: m.DevelopmentServicesSection })), {
  loading: () => <div className="min-h-screen" />,
});

const DynamicDevelopmentWhyChooseSection = dynamic(() => import("../organisms/development/DevelopmentWhyChooseSection").then(m => ({ default: m.DevelopmentWhyChooseSection })), {
  loading: () => <div className="min-h-screen" />,
});

const DynamicDevelopmentPricingSection = dynamic(() => import("../organisms/development/DevelopmentPricingSection").then(m => ({ default: m.DevelopmentPricingSection })), {
  loading: () => <div className="min-h-screen" />,
});

const DynamicDevelopmentFAQSection = dynamic(() => import("../organisms/development/DevelopmentFAQSection").then(m => ({ default: m.DevelopmentFAQSection })), {
  loading: () => <div className="min-h-screen" />,
});

