"use client";

import dynamic from "next/dynamic";
import { AutomationHeroSection } from "../organisms/automation/AutomationHeroSection";
import { BackgroundGlow } from "../molecules/BackgroundGlow";

// Lazy load secciones below the fold
const AutomationWhySection = dynamic(() => import("../organisms/automation/AutomationWhySection").then(mod => ({ default: mod.AutomationWhySection })), {
  loading: () => <div className="min-h-screen" />,
});

const AutomationNotebookSection = dynamic(() => import("../organisms/automation/AutomationNotebookSection").then(mod => ({ default: mod.AutomationNotebookSection })), {
  loading: () => <div className="min-h-screen" />,
});

const AutomationAssistantSection = dynamic(() => import("../organisms/automation/AutomationAssistantSection").then(mod => ({ default: mod.AutomationAssistantSection })), {
  loading: () => <div className="min-h-screen" />,
});

const AutomationServicesSection = dynamic(() => import("../organisms/automation/AutomationServicesSection").then(mod => ({ default: mod.AutomationServicesSection })), {
  loading: () => <div className="min-h-screen" />,
});

const AutomationFAQSection = dynamic(() => import("../organisms/automation/AutomationFAQSection").then(mod => ({ default: mod.AutomationFAQSection })), {
  loading: () => <div className="min-h-screen" />,
});

/**
 * Template: AutomationTemplate
 * Estructura de la página de Automatización
 * Reutiliza BackgroundGlow y componentes existentes
 */
export function AutomationTemplate() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Efecto de luz de fondo con color verde agua */}
      <BackgroundGlow theme="teal" intensity={1} />
      
      {/* Contenido de las secciones */}
      <div className="relative z-10">
        <AutomationHeroSection />
        <AutomationWhySection />
        <AutomationAssistantSection />
        <AutomationNotebookSection />
        <AutomationServicesSection />
        <AutomationFAQSection />
        
        {/* Aquí puedes agregar más secciones */}
        {/* <BenefitsSection /> */}
        {/* <FeaturesSection /> */}
        {/* <CaseStudiesSection /> */}
      </div>
    </main>
  );
}

