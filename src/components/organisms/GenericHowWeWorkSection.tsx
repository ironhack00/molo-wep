"use client";

import { useEffect, useRef } from "react";
import { SectionTitle } from "../molecules/SectionTitle";
import { TimelineItem } from "../molecules/TimelineItem";
import { TimelineConnector } from "../molecules/TimelineConnector";
import { timelineData } from "@/data/timelineData";
import { motion, useInView } from "framer-motion";
// import { TrustBanner } from "../molecules/TrustBanner"; // Comentado por solicitud del usuario
import { CTAWhatsApp } from "../molecules/CTAWhatsApp";
import { TestimonialCard } from "../molecules/TestimonialCard";
import { testimonialsData } from "@/data/testimonialsData";
import { useAutoRotate } from "../hooks/useAutoRotate";
import { useResponsiveValue } from "../hooks/useResponsiveValue";
import { cn, sectionPadding, marginBottom, maxWidths } from "@/utils/classNames";
import { useTranslations } from '@/lib/i18n/IntlProvider';

interface GenericHowWeWorkSectionProps {
  /** Color del acento para la timeline y highlights */
  accentColor?: string;
  /** Color CSS class del highlight del título */
  titleHighlightClass?: string;
  /** Namespace de traducción para el título */
  translationNamespace?: string;
  /** Mostrar TrustBanner y CTA WhatsApp al final */
  showTrustBanner?: boolean;
  /** Nivel del título principal */
  titleLevel?: "h1" | "h2" | "h3";
}

/**
 * Organism: GenericHowWeWorkSection
 * Sección "Cómo trabajamos" reutilizable con timeline animada
 * Acepta diferentes colores para diferentes páginas
 */
export function GenericHowWeWorkSection({
  accentColor = "#25d9d8",
  titleHighlightClass = "text-primary",
  translationNamespace = "home",
  showTrustBanner = true,
  titleLevel = "h2",
}: GenericHowWeWorkSectionProps) {
  const t = useTranslations(translationNamespace);
  const tTimeline = useTranslations('timeline');
  const tTestimonials = useTranslations('testimonials');
  const tAria = useTranslations('ariaLabels');
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  
  // Hook reutilizable para auto-rotate - siempre activo
  const { currentIndex, setCurrentIndex } = useAutoRotate(
    timelineData.length,
    undefined,
    true // Siempre activo, no depende de isInView
  );

  // Hook reutilizable para valores responsive
  const lineOffset = useResponsiveValue({
    mobile: "3.5rem",
    tablet: "5rem",
    desktop: "5rem",
  });

  return (
    <section 
      ref={sectionRef}
      className={cn("relative", "pt-24 sm:pt-20 md:pt-24 lg:pt-28 xl:pt-32 pb-20 px-4 md:px-8", "overflow-hidden")}
      style={{ 
        zIndex: 10, // Z-index alto para estar por encima de las cards fijas
        background: "transparent"
      }}
      aria-label={String(tAria('howWeWork'))}
    >
      <div className={maxWidths.lg} style={{ position: 'relative', zIndex: 2 }}>
        {/* Título de la sección */}
        <div className={cn("text-center", "mb-20")}>
          <SectionTitle level={titleLevel} className="text-white">
            {String(t('howWeWork.title'))} <span className={titleHighlightClass}>{String(t('howWeWork.titleHighlight'))}</span>
          </SectionTitle>
        </div>

        {/* Timeline vertical */}
        <div className="relative max-w-5xl mx-auto pl-0">
          <TimelineConnector 
            activeIndex={currentIndex}
            totalItems={timelineData.length}
            lineOffset={lineOffset}
            accentColor={accentColor}
          />

          {/* Items */}
          <div className="relative space-y-12 sm:space-y-16 md:space-y-20 z-10">
            {timelineData.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative z-10"
              >
                <TimelineItem
                  number={index + 1}
                  title={String(tTimeline(`${item.id}.title`))}
                  description={String(tTimeline(`${item.id}.description`))}
                  isActive={index === currentIndex}
                  accentColor={accentColor}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Sección de Testimonios */}
      <div 
        className={cn("w-full max-w-[2000px] mx-auto flex flex-col justify-center items-center gap-20 py-20 mt-40 relative", sectionPadding.x)} 
        style={{ 
          zIndex: 2,
          background: 'transparent' // Fondo transparente para que no se note la unión
        }}
      >
        {/* Título */}
        <div className={cn(maxWidths.xl, "text-center", marginBottom.md, sectionPadding.x)}>
          <SectionTitle level={titleLevel} className="text-white leading-tight max-w-4xl mx-auto">
            {String(tTestimonials('title'))}
          </SectionTitle>
        </div>

        {/* Carrusel infinito - Fila 1 (izquierda a derecha) */}
        <div className="overflow-hidden w-full mb-5">
          <div className="flex w-max animate-scroll-x-left gap-5">
            {[...testimonialsData, ...testimonialsData].map((testimonial, index) => (
              <TestimonialCard
                key={`row1-${index}`}
                name={String(tTestimonials(`${testimonial.id}.name`))}
                testimonial={String(tTestimonials(`${testimonial.id}.testimonial`))}
                platform={testimonial.platform}
              />
            ))}
          </div>
        </div>

        
      </div>

      {/* Sección de confianza con banner y CTA - solo si showTrustBanner es true */}
      {showTrustBanner && (
        <>
          {/* TrustBanner comentado por solicitud del usuario */}
          {/* <div className={cn("relative hidden md:block", sectionPadding.yLarge, sectionPadding.x)}>
            <TrustBanner />
          </div> */}
          
          {/* CTA WhatsApp - visible en todas las pantallas */}
          <div className={cn("relative", sectionPadding.x)} style={{ zIndex: 2 }}>
            <CTAWhatsApp />
          </div>
        </>
      )}
    </section>
  );
}

