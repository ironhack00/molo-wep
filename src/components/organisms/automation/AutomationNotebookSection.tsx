"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SectionTitle } from "../../molecules/SectionTitle";
import { cn, sectionPadding, themeColors, textSizes } from "@/utils/classNames";
import { useTranslations } from '@/lib/i18n/IntlProvider';

/**
 * Organism: AutomationNotebookSection
 * Sección con notebook grande y título superpuesto
 * Reutiliza SectionTitle, Image y utilidades para consistencia
 */
export function AutomationNotebookSection() {
  const t = useTranslations('automation');
  const tAria = useTranslations('ariaLabels');
  
  return (
    <section 
      className={cn("relative", sectionPadding.y)}
      aria-label={String(tAria('automationShowcase'))}
    >
      <div className={cn("relative flex justify-center", sectionPadding.x)}>
        {/* Contenedor con la imagen y título superpuesto */}
        <div className="relative w-full max-w-5xl">
          {/* Imagen de la notebook */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative w-full aspect-[16/10] md:aspect-[16/9]"
          >
            <Image
              src="/images/automation/notebook.webp"
              alt={String(t('notebook.title'))}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 1200px"
              priority
              style={{
                maskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)'
              }}
            />
          </motion.div>

          {/* Título superpuesto sobre la parte inferior de la notebook */}
          <div className="absolute bottom-[-15%] sm:bottom-[-18%] md:bottom-[-20%] left-1/2 -translate-x-1/2 w-full text-center px-4 sm:px-6 md:px-4 z-20">
            <SectionTitle 
              level="h2" 
              className={cn(
                themeColors.white,
                "leading-relaxed",
                "drop-shadow-[0_8px_40px_rgba(0,0,0,0.9)]",
                "drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]",
                "drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]",
                "text-shadow-[0_4px_8px_rgba(0,0,0,0.9)]",
                "text-shadow-[0_2px_4px_rgba(0,0,0,0.8)]",
                textSizes.sectionTitle
              )}
            >
              <span className={themeColors.teal}>{String(t('notebook.title')).split(' ')[0]}</span>
              {" "}{String(t('notebook.title')).split(' ').slice(1).join(' ')}
            </SectionTitle>
          </div>
        </div>
      </div>
    </section>
  );
}

