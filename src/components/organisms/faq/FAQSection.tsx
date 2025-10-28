"use client";

import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { Heading } from "../../atoms/Heading";
import { Paragraph } from "../../atoms/Paragraph";
import { AccordionItem } from "../../molecules/AccordionItem";
import { generalFAQ, faqCategories } from "@/data/faq/faqData";
import { cn, sectionPadding, maxWidths, textSizes } from "@/utils/classNames";
import { useTranslations } from '@/lib/i18n/IntlProvider';

const ACCENT_COLOR = "#25d9d8";

/**
 * Organism: FAQSection
 * Sección de FAQ con filtros por categoría
 * Reutiliza: Heading, Paragraph, AccordionItem
 * Optimizado con useMemo y useCallback para performance
 */
export function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const t = useTranslations('faq');
  
  // Traducciones de categorías
  const translatedCategories = useMemo(() => {
    return faqCategories.map(cat => {
      if (cat === "Beneficios y Tecnología") return String(t('categories.benefits'));
      if (cat === "Información general") return String(t('categories.general'));
      if (cat === "Proceso y Soporte") return String(t('categories.process'));
      return cat;
    });
  }, [t]);
  
  const [selectedCategory, setSelectedCategory] = useState(translatedCategories[0]);

  // Memoizar FAQs filtradas para evitar re-filtrados innecesarios
  const filteredFAQs = useMemo(() => {
    // Convertir categoría seleccionada a la categoría original
    let originalCategory = selectedCategory;
    if (selectedCategory === String(t('categories.benefits'))) originalCategory = "Beneficios y Tecnología";
    if (selectedCategory === String(t('categories.general'))) originalCategory = "Información general";
    if (selectedCategory === String(t('categories.process'))) originalCategory = "Proceso y Soporte";
    
    return generalFAQ.filter(faq => faq.category === originalCategory);
  }, [selectedCategory, t]);

  // Memoizar handlers para evitar re-renders de children
  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
    setActiveIndex(null); // Reset accordion al cambiar categoría
  }, []);

  const handleAccordionToggle = useCallback((index: number) => {
    setActiveIndex(prev => prev === index ? null : index);
  }, []);

  return (
    <section 
      className="relative min-h-screen py-40 max-md:py-30"
      aria-label={String(useTranslations('ariaLabels')('faqSection'))}
    >
      {/* Efectos de fondo - Similar a Molokaih-web-v3 */}
      <div className="w-30 h-[110%] absolute bg-primary -top-[20%] -right-[10%] rotate-[40deg] origin-top-right blur-2xl opacity-5 -z-10" />
      <div className="w-30 h-[120%] absolute bg-primary top-[5%] -right-[10%] rotate-[40deg] origin-top-right blur-2xl opacity-5 -z-10" />

      {/* Header */}
      <div className={cn(maxWidths.lg, "text-center space-y-10 py-20", sectionPadding.x)}>
        <div>
          <Heading 
            level="h1" 
            className={cn(
              textSizes.heroTitle,
              "font-semibold pb-2",
              "text-transparent bg-clip-text bg-gradient-to-t from-white/30 from-0% to-white to-50%"
            )}
          >
            {String(t('title'))}
          </Heading>
          <Paragraph size="lg" className="text-white/70 mt-2">
            {String(t('subtitle'))}
          </Paragraph>
        </div>
      </div>

        {/* Filtros por categoría */}
      <div className={cn("w-full max-w-[1400px] mx-auto space-y-10", sectionPadding.x)}>
        <div className="flex justify-center gap-4 md:gap-6 flex-wrap w-full">
          {translatedCategories.map((category) => {
            const isActive = selectedCategory === category;
            
            return (
              <motion.button
                key={category}
                onClick={() => handleCategoryChange(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "px-6 py-3 rounded-full text-base font-semibold transition-all duration-300",
                  "backdrop-blur-xl bg-white/5 border-2 cursor-pointer",
                  isActive 
                    ? "text-white border-primary" 
                    : "border-white/20 text-white/70 hover:border-white/40 hover:text-white"
                )}
                style={
                  isActive 
                    ? { 
                        boxShadow: `0 0 30px ${ACCENT_COLOR}80, 0 0 60px ${ACCENT_COLOR}40, inset 0 0 20px ${ACCENT_COLOR}20` 
                      } 
                    : undefined
                }
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.boxShadow = `0 0 20px ${ACCENT_COLOR}60, 0 0 40px ${ACCENT_COLOR}30`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.boxShadow = "none";
                  }
                }}
              >
                {category}
              </motion.button>
            );
          })}
        </div>

        {/* Lista de FAQs */}
        <div className={cn("w-full flex flex-col gap-4 sm:gap-5 md:gap-6", maxWidths.lg, "mx-auto")}>
          {filteredFAQs.map((faq, index) => {
            // Obtener traducciones para la pregunta y respuesta
            const faqTranslation = t(`items.${faq.id}`) as { question: string; answer: string; points?: string[] };
            const points = faqTranslation?.points;
            
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <AccordionItem
                  question={String(t(`items.${faq.id}.question`))}
                  answer={points 
                    ? `${String(t(`items.${faq.id}.answer`))}\n\n${points.map((point: string) => `• ${point}`).join('\n')}`
                    : String(t(`items.${faq.id}.answer`))
                  }
                  isOpen={activeIndex === index}
                  onClick={() => handleAccordionToggle(index)}
                  accentColor={ACCENT_COLOR}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

