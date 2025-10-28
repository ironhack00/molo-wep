"use client";

import { motion } from "framer-motion";
import { SectionTitle } from "../../molecules/SectionTitle";
import { SectionDescription } from "../../molecules/SectionDescription";
import { WhyCard } from "../../molecules/WhyCard";
import { customBenefits } from "@/data/custom/benefitsData";
import { cn, sectionPadding, maxWidths, themeColors, glassmorphism, textSizes, iconSizes } from "@/utils/classNames";
import { useTranslations } from '@/lib/i18n/IntlProvider';

/**
 * Organism: CustomBenefitsSection
 * Beneficios clave de trabajar con Molokaih
 * Reutiliza: SectionTitle, SectionDescription, Heading, Paragraph, UniversalImage, glassmorphism
 * Mismo patrón que MarketingWhySection (con recuadro glassmorphism)
 */
export function CustomBenefitsSection() {
  const t = useTranslations('custom');
  const tAria = useTranslations('ariaLabels');
  
  return (
    <section 
      className={cn("relative", sectionPadding.y)}
      aria-label={String(tAria('customBenefits'))}
    >
      <div className={cn(maxWidths.xl, sectionPadding.x)}>
        {/* Contenedor con glassmorphism */}
        <div className={cn(glassmorphism.medium, "rounded-3xl p-8 md:p-12 lg:p-16")}>
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <SectionTitle level="h3" className={cn(themeColors.white, "leading-tight mb-6 md:mb-8")}>
              {String(t('benefits.title'))} <span className={themeColors.custom}>{String(t('benefits.titleHighlight'))}</span>
            </SectionTitle>
            
            <SectionDescription size="lg" className="text-white/80 max-w-4xl mx-auto">
              {String(t('benefits.description'))}
            </SectionDescription>
          </div>

          {/* Grid de beneficios */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
            {customBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <WhyCard
                  icon={benefit.icon}
                  iconAlt={benefit.iconAlt}
                  title={String(t(`benefits.${benefit.id}.title`))}
                  description={String(t(`benefits.${benefit.id}.description`))}
                  titleLevel="h3"
                  textSize="cardTextExtraSmall"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

