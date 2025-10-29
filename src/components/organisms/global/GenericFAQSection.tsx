"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionTitle } from "../../molecules/SectionTitle";
import { AccordionItem } from "../../molecules/AccordionItem";
import { cn, sectionPadding, marginBottom, maxWidths, themeColors, textSizes } from "@/utils/classNames";
import { useTranslations } from '@/lib/i18n/IntlProvider';

interface FAQItem {
  id: string;
}

interface GenericFAQSectionProps {
  /** Array de items de FAQ con sus ids */
  faqData: FAQItem[];
  /** Color del acento para el acordeón */
  accentColor?: string;
  /** Clase de color del highlight del título */
  titleHighlightClass: keyof typeof themeColors;
  /** Namespace de traducción */
  translationNamespace: string;
  /** Path dentro del namespace para los items (ej: 'faq.items' o solo 'faq') */
  itemsPath?: string;
  /** ARIA label para la sección */
  ariaLabel?: string;
  /** Nivel del título principal */
  titleLevel?: "h1" | "h2" | "h3";
}

/**
 * Organism: GenericFAQSection
 * Sección de preguntas frecuentes reutilizable
 * Acepta diferentes colores y datos para diferentes páginas
 */
export function GenericFAQSection({
  faqData,
  accentColor,
  titleHighlightClass,
  translationNamespace,
  itemsPath = 'items',
  ariaLabel,
  titleLevel = "h2",
}: GenericFAQSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const t = useTranslations(translationNamespace);

  return (
    <section 
      className={cn("relative", sectionPadding.y)}
      aria-label={ariaLabel || String(t('titleHighlight'))}
    >
      {/* Título de la sección */}
      <div className={cn(maxWidths.md, "text-center", marginBottom.xl, sectionPadding.x)}>
        <SectionTitle level={titleLevel} className={cn(themeColors.white, "leading-relaxed", textSizes.sectionTitle)}>
          {String(t('title'))}{" "}
          <span className={themeColors[titleHighlightClass]}>{String(t('titleHighlight'))}</span>
          {String(t('titleEnd') || '')}
        </SectionTitle>
      </div>

      {/* Lista de FAQs con acordeón */}
      <div className={cn(
        "w-full flex flex-col gap-4 sm:gap-5 md:gap-6",
        maxWidths.lg,
        sectionPadding.x
      )}>
        {faqData.map((faq, index) => (
          <motion.div
            key={faq.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <AccordionItem
              question={String(t(`${itemsPath}.${faq.id}.question`))}
              answer={String(t(`${itemsPath}.${faq.id}.answer`))}
              isOpen={activeIndex === index}
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              accentColor={accentColor}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

