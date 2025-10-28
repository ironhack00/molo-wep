"use client";

import { motion } from "framer-motion";
import { SectionTitle } from "../../molecules/SectionTitle";
import { SectionDescription } from "../../molecules/SectionDescription";
import { UniversalImage } from "../../atoms/UniversalImage";
import { customProjects } from "@/data/custom/projectsData";
import { cn, sectionPadding, maxWidths, themeColors } from "@/utils/classNames";
import { useTranslations } from '@/lib/i18n/IntlProvider';

/**
 * Organism: CustomProjectsSection
 * Grid de proyectos destacados
 * Reutiliza: SectionTitle, SectionDescription, UniversalImage
 */
export function CustomProjectsSection() {

  const t = useTranslations('custom');
  
  return (
    <section 
      className={cn("relative", sectionPadding.y)}
      aria-label={String(useTranslations('ariaLabels')('customProjects'))}
    >
      <div className={cn(maxWidths.xl, sectionPadding.x)}>
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <SectionTitle className={cn(themeColors.white, "leading-tight mb-6 md:mb-8")}>
            {String(t('projects.title'))} <span className={themeColors.custom}>{String(t('projects.titleHighlight'))}</span>
          </SectionTitle>
          
          <SectionDescription size="lg" className="text-white/80 max-w-4xl mx-auto">
            {String(t('projects.description'))}
          </SectionDescription>
        </div>

        {/* Grid de proyectos - 2 columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          {customProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="relative w-full h-[500px] md:h-[600px] group rounded-3xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300 bg-black/20"
            >
              <UniversalImage
                src={project.image}
                alt={String(t(`projects.items.${project.id}.title`))}
                size="full"
                objectFit="contain"
                className="w-full h-full transition-transform duration-300 group-hover:scale-105"
              />
              
              {/* Overlay con info del proyecto */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <p className="text-white text-xl md:text-2xl font-semibold">
                    {String(t(`projects.items.${project.id}.title`))}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

