"use client";

import { motion } from "framer-motion";
import { SectionTitle } from "../../molecules/SectionTitle";
import { SectionDescription } from "../../molecules/SectionDescription";
import { Heading } from "../../atoms/Heading";
import { Paragraph } from "../../atoms/Paragraph";
import { UniversalImage } from "../../atoms/UniversalImage";
import { WhyCard } from "../../molecules/WhyCard";
import { cn, sectionPadding, maxWidths, themeColors, glassmorphism, textSizes, iconSizes } from "@/utils/classNames";
import { useTranslations } from '@/lib/i18n/IntlProvider';

interface WhyItem {
  id: string;
  icon: string;
  iconAlt: string;
}

interface GenericWhySectionProps {
  /** Array de items con sus ids */
  whyData: WhyItem[];
  /** Clase de color del highlight del título */
  titleHighlightClass: keyof typeof themeColors;
  /** Namespace de traducción */
  translationNamespace: string;
  /** Mostrar glassmorphism container */
  showGlassmorphism?: boolean;
  /** Nivel del título principal */
  titleLevel?: "h1" | "h2" | "h3";
  /** Nivel de los títulos de las cards */
  cardTitleLevel?: "h1" | "h2" | "h3";
  /** Tamaño del texto de las cards */
  cardTextSize?: "cardText" | "cardTextSmall" | "cardTextExtraSmall";
}

/**
 * Organism: GenericWhySection
 * Sección "Por qué" reutilizable con grid de items
 * Acepta diferentes colores y datos para diferentes páginas
 */
export function GenericWhySection({
  whyData,
  titleHighlightClass,
  translationNamespace,
  showGlassmorphism = false,
  titleLevel = "h2",
  cardTitleLevel = "h3",
  cardTextSize = "cardText",
}: GenericWhySectionProps) {
  const t = useTranslations(translationNamespace);
  
  const content = (
    <>
      {/* Header de la sección */}
      <div className="text-center mb-12 md:mb-16">
        <SectionTitle level={titleLevel} className={cn(themeColors.white, "leading-tight mb-6 md:mb-8")}>
          {String(t('title'))} <span className={themeColors[titleHighlightClass]}>{String(t('titleHighlight'))}</span> {String(t('titleEnd') || '')}
        </SectionTitle>
        
        <SectionDescription size="lg" className="text-white/80 max-w-4xl mx-auto">
          {String(t('description'))}
        </SectionDescription>
      </div>

      {/* Grid de razones */}
      <div className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12",
        whyData.length === 2 && "max-w-4xl mx-auto"
      )}>
        {whyData.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={whyData.length === 2 ? "flex justify-center" : ""}
          >
            <WhyCard
              icon={item.icon}
              iconAlt={item.iconAlt}
              title={String(t(`${item.id}.title`))}
              description={String(t(`${item.id}.description`))}
              titleLevel={cardTitleLevel}
              textSize={cardTextSize}
            />
          </motion.div>
        ))}
      </div>
    </>
  );

  return (
    <section 
      className={cn("relative", sectionPadding.y)}
      aria-label={String(t('titleHighlight'))}
    >
      <div className={cn(maxWidths.xl, sectionPadding.x)}>
        {showGlassmorphism ? (
          <div className={cn(
            glassmorphism.medium,
            "border border-white/10 rounded-3xl p-8 md:p-12 lg:p-16"
          )}>
            {content}
          </div>
        ) : (
          content
        )}
      </div>
    </section>
  );
}

