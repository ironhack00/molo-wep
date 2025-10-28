"use client";

import { ContactFormSection, ContactInfoSection } from "../organisms/contact";
import { BackgroundGlow } from "../molecules/BackgroundGlow";

/**
 * Template: ContactTemplate
 * Plantilla principal de la página de Contacto
 */
export function ContactTemplate() {
  return (
    <div className="min-h-screen bg-black relative">
      {/* Iluminación de fondo - Reutiliza BackgroundGlow */}
      <BackgroundGlow theme="primary" intensity={0.6} />
      
      {/* Contenido con z-index */}
      <div className="relative z-10 pt-20 md:pt-24 lg:pt-28">
        {/* Form Section */}
        <ContactFormSection />
        
        {/* Contact Info Section */}
        <ContactInfoSection />
      </div>
    </div>
  );
}

