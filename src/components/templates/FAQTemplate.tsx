"use client";

import { FAQSection } from "../organisms/faq";
import { BackgroundGlow } from "../molecules/BackgroundGlow";

/**
 * Template: FAQTemplate
 * Plantilla principal de la página FAQ
 */
export function FAQTemplate() {
  return (
    <div className="min-h-screen bg-black relative">
      {/* Iluminación de fondo - Reutiliza BackgroundGlow */}
      <BackgroundGlow theme="primary" intensity={0.6} />
      
      {/* Contenido con z-index */}
      <div className="relative z-10">
        {/* FAQ Section */}
        <FAQSection />
      </div>
    </div>
  );
}

