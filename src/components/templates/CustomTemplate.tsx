/**
 * Template: CustomTemplate
 * Template completo para la página Custom
 * Organiza todos los organismos de la página
 */

"use client";

import { CustomHeroSection } from '../organisms/custom/CustomHeroSection';
import { CustomWhySection } from '../organisms/custom/CustomWhySection';
import { CustomProjectsSection } from '../organisms/custom/CustomProjectsSection';
import { CustomProjectsMarketingSection } from '../organisms/custom/CustomProjectsMarketingSection';
import { CustomServicesSection } from '../organisms/custom/CustomServicesSection';
import { CustomBenefitsSection } from '../organisms/custom/CustomBenefitsSection';
import { CustomHowWeWorkSection } from '../organisms/custom/CustomHowWeWorkSection';
import { CustomFAQSection } from '../organisms/custom/CustomFAQSection';
import { BackgroundGlow } from '../molecules/BackgroundGlow';

export function CustomTemplate() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Iluminación de fondo naranja - Reutiliza BackgroundGlow */}
      <BackgroundGlow theme="custom" intensity={0.6} />
      
      {/* Contenido con z-index */}
      <div className="relative z-10">
        {/* Hero Section con video y overlay naranja */}
        <CustomHeroSection />
        
        {/* Why Section */}
        <CustomWhySection />
        
        {/* Projects Carousel Section */}
        {/* <CustomProjectsSection /> */}
        
        {/* Projects Marketing Section - Nueva versión con enfoque de ventas */}
        <CustomProjectsMarketingSection />
        
        {/* Services Section */}
        <CustomServicesSection />
        
        {/* Benefits Section */}
        <CustomBenefitsSection />
        
        {/* How We Work Section con color naranja */}
        <CustomHowWeWorkSection />
        
        {/* FAQ Section */}
        <CustomFAQSection />
      </div>
    </main>
  );
}

