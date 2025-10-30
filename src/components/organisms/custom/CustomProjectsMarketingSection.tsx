"use client";

import { motion } from "framer-motion";
import { SectionTitle } from "../../molecules/SectionTitle";
import { SectionDescription } from "../../molecules/SectionDescription";
import { UniversalImage } from "../../atoms/UniversalImage";
import { cn, sectionPadding, maxWidths, themeColors } from "@/utils/classNames";
import { useTranslations } from '@/lib/i18n/IntlProvider';
import Link from "next/link";

interface Project {
  id: string;
  image: string;
}

const projects: Project[] = [
  {
    id: "erp",
    image: "/images/why-choose-us/desarrollo-software.webp"
  },
  {
    id: "automation",
    image: "/images/why-choose-us/automatizacion-procesos.webp"
  },
  {
    id: "dashboard",
    image: "/images/why-choose-us/dashboard-simple-Photoroom.webp"
  },
  {
    id: "analytics",
    image: "/images/why-choose-us/dashboard-avanzado-Photoroom.webp"
  }
];

/**
 * Organism: CustomProjectsMarketingSection
 * Sección de proyectos con enfoque de marketing
 * Versión alternativa más orientada a ventas
 */
export function CustomProjectsMarketingSection() {
  const t = useTranslations('custom');
  
  return (
    <section 
      className={cn("relative projects-marketing", sectionPadding.y)}
      aria-label="Custom Projects Marketing Section"
    >
      <div className={cn(maxWidths.xl, sectionPadding.x)}>
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <SectionTitle level="h3" className={cn(themeColors.white, "leading-tight mb-6 md:mb-8")}>
            {String(t('projectsMarketing.title'))} <span className={themeColors.custom}>{String(t('projectsMarketing.titleHighlight'))}</span>
          </SectionTitle>
          
          <SectionDescription size="lg" className="text-white/80 max-w-4xl mx-auto">
            {String(t('projectsMarketing.description'))}
          </SectionDescription>
        </div>

        {/* Grid de proyectos - 2 columnas con CTAs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-7xl mx-auto">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="relative w-full h-[500px] md:h-[600px] group rounded-3xl overflow-hidden"
            >
              {/* Glow detrás de la imagen */}
              <div 
                className="absolute inset-0 blur-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 z-0"
                style={{
                  background: `radial-gradient(circle at center, rgba(255, 107, 0, 0.4), transparent 70%)`
                }}
              />
              
              {/* Contenedor de imagen sin fondo */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden border border-white/10 group-hover:border-custom/50 transition-all duration-300 bg-transparent p-6 md:p-8">
                <UniversalImage
                  src={project.image}
                  alt={String(t(`projectsMarketing.items.${project.id}.title`))}
                  size="full"
                  objectFit="contain"
                  className="w-full h-full transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundColor: 'transparent',
                    mixBlendMode: 'multiply'
                  }}
                />
                
                {/* Overlay con info del proyecto - aparece solo con hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
                      {String(t(`projectsMarketing.items.${project.id}.title`))}
                    </h3>
                    <p className="text-white/90 text-base md:text-lg lg:text-xl mb-6 md:mb-8 leading-relaxed">
                      {String(t(`projectsMarketing.items.${project.id}.description`))}
                    </p>
                    
                    {/* CTA Button */}
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold text-sm md:text-base
                        bg-custom/20 border-2 border-custom text-white backdrop-blur-xl
                        hover:bg-custom/40 hover:scale-105 transition-all duration-300 cursor-pointer
                        w-fit"
                      style={{
                        boxShadow: "0 0 30px rgba(255, 107, 0, 0.5), 0 0 60px rgba(255, 107, 0, 0.3)"
                      }}
                    >
                      {String(t(`projectsMarketing.items.${project.id}.cta`))}
                      <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

