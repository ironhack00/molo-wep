"use client";

import dynamic from "next/dynamic";
import { 
  MarketingHeroSection, 
  MarketingPortfolioSection,
} from "../organisms/marketing";

// Cargar bajo demanda secciones below-the-fold para mejorar LCP
const MarketingIntroSection = dynamic(() => import("../organisms/marketing/MarketingIntroSection").then(m => ({ default: m.MarketingIntroSection })), {
  loading: () => <div className="h-screen" />,
});

const MarketingServicesSection = dynamic(() => import("../organisms/marketing/MarketingServicesSection").then(m => ({ default: m.MarketingServicesSection })), {
  loading: () => <div className="h-screen" />,
});

const MarketingWhySection = dynamic(() => import("../organisms/marketing/MarketingWhySection").then(m => ({ default: m.MarketingWhySection })), {
  loading: () => <div className="h-screen" />,
});

const MarketingPricingSection = dynamic(() => import("../organisms/marketing/MarketingPricingSection").then(m => ({ default: m.MarketingPricingSection })), {
  loading: () => <div className="h-screen" />,
});

const MarketingFAQSection = dynamic(() => import("../organisms/marketing/MarketingFAQSection").then(m => ({ default: m.MarketingFAQSection })), {
  loading: () => <div className="h-screen" />,
});

/**
 * Template: MarketingTemplate
 * Plantilla principal de la página de Marketing
 * Organiza todos los organismos de la sección
 */
export function MarketingTemplate() {
  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      {/* Hero Section */}
      <MarketingHeroSection />
      
      {/* Portfolio Section */}
      <MarketingPortfolioSection />
      
      {/* Intro Section */}
      <MarketingIntroSection />
      
      {/* Services Section */}
      <MarketingServicesSection />
      
      {/* Why Choose Section */}
      <MarketingWhySection />
      
      {/* Pricing Section */}
      <MarketingPricingSection />
      
      {/* FAQ Section */}
      <MarketingFAQSection />
    </div>
  );
}

