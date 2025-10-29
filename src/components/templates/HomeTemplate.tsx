"use client";

import dynamic from "next/dynamic";
import { HeroSection } from "../organisms/home/HeroSection";
import { BackgroundGlow } from "../molecules/BackgroundGlow";

// Lazy load secciones below the fold para mejor performance en mobile
const WhyChooseUsSection = dynamic(() => import("../organisms/home/WhyChooseUsSection").then(mod => ({ default: mod.WhyChooseUsSection })), {
  loading: () => <div className="h-screen" />, // Height fijo, no min-height
});

const ServicesSection = dynamic(() => import("../organisms/home/ServicesSection").then(mod => ({ default: mod.ServicesSection })), {
  loading: () => <div className="h-screen" />, // Height fijo
});

const HowWeWorkSection = dynamic(() => import("../organisms/home/HowWeWorkSection").then(mod => ({ default: mod.HowWeWorkSection })), {
  loading: () => <div className="h-screen" />, // Height fijo
});

/**
 * Template: HomeTemplate
 * Estructura de la página Home
 */
export function HomeTemplate() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      {/* Efecto de luz de fondo - ahora es un componente reutilizable */}
      <BackgroundGlow theme="primary" intensity={1.2} />
      
      {/* Contenido de las secciones */}
      <div className="relative z-10">
        <HeroSection />
        <WhyChooseUsSection />
        <ServicesSection />
        <HowWeWorkSection />
        
        {/* Aquí puedes agregar más secciones */}
        {/* <TestimonialsSection /> */}
        {/* <ContactSection /> */}
      </div>
    </main>
  );
}

