"use client";

import { motion } from "framer-motion";
import { SectionTitle } from "../molecules/SectionTitle";
import { SectionDescription } from "../molecules/SectionDescription";
import { WhyCard } from "../molecules/WhyCard";
import { cn, sectionPadding, maxWidths, themeColors, textSizes, iconSizes } from "@/utils/classNames";
import { useTranslations } from '@/lib/i18n/IntlProvider';

interface ServiceItem {
  id: string;
  icon: string;
  iconAlt: string;
}

interface GenericServicesSectionProps {
  /** Array de servicios con sus ids */
  servicesData: ServiceItem[];
  /** Clase de color del highlight del título */
  titleHighlightClass?: keyof typeof themeColors;
  /** Namespace de traducción */
  translationNamespace: string;
  /** Mostrar header (título y descripción) */
  showHeader?: boolean;
  /** Grid columns en desktop (2 o 3) */
  gridCols?: 2 | 3;
  /** ARIA label para la sección */
  ariaLabel?: string;
  /** Nivel del título principal */
  titleLevel?: "h1" | "h2" | "h3";
  /** Nivel de los títulos de las cards */
  cardTitleLevel?: "h1" | "h2" | "h3";
  /** Tamaño del texto de las cards */
  cardTextSize?: "cardText" | "cardTextSmall" | "cardTextExtraSmall";
}

/**
 * Organism: GenericServicesSection
 * Sección de servicios reutilizable con grid de cards
 * Acepta diferentes configuraciones para diferentes páginas
 */
export function GenericServicesSection({
  servicesData,
  titleHighlightClass,
  translationNamespace,
  showHeader = true,
  gridCols = 2,
  ariaLabel,
  titleLevel = "h2",
  cardTitleLevel = "h3",
  cardTextSize = "cardText",
}: GenericServicesSectionProps) {
  const t = useTranslations(translationNamespace);
  const tAria = useTranslations('ariaLabels');
  
  const gridClass = gridCols === 3
    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12"
    : "grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12";

  const content = (
    <div className={cn(gridClass, showHeader ? "" : maxWidths.xl, sectionPadding.x)}>
      {servicesData.map((service, index) => (
        <motion.div
          key={service.id}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className={cn(
            // Centrar el último elemento si queda solo en la fila (solo para 3 cols)
            gridCols === 3 && index === servicesData.length - 1 && servicesData.length % 3 === 1 && "lg:col-start-2"
          )}
        >
          <WhyCard
            icon={service.icon}
            iconAlt={service.iconAlt}
            title={String(t(`${service.id}.title`))}
            description={String(t(`${service.id}.description`))}
            titleLevel={cardTitleLevel}
            textSize={cardTextSize}
          />
        </motion.div>
      ))}
    </div>
  );

  return (
    <section 
      id="services"
      className={cn("relative", sectionPadding.y)}
      aria-label={ariaLabel || String(tAria('services'))}
    >
      {showHeader ? (
        <div className={cn(maxWidths.lg, sectionPadding.x)}>
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <SectionTitle level={titleLevel} className={cn(themeColors.white, "leading-tight mb-6 md:mb-8")}>
              {String(t('title'))} {titleHighlightClass && <span className={themeColors[titleHighlightClass]}>{String(t('titleHighlight'))}</span>} {String(t('titleEnd') || '')}
            </SectionTitle>
            
            <SectionDescription size="lg" className="text-white/80 max-w-4xl mx-auto">
              {String(t('description'))}
            </SectionDescription>
          </div>

          {content}
        </div>
      ) : (
        content
      )}
    </section>
  );
}

