"use client";

import { 
  MarketingHeroSection, 
  MarketingIntroSection,
  MarketingPortfolioSection,
  MarketingServicesSection,
  MarketingWhySection,
  MarketingPricingSection,
  MarketingFAQSection
} from "../organisms/marketing";

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

