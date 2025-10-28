"use client";

import { motion } from "framer-motion";
import { SectionTitle } from "../molecules/SectionTitle";
import { SectionDescription } from "../molecules/SectionDescription";
import { RadialGlowCard } from "../atoms/RadialGlowCard";
import { Heading } from "../atoms/Heading";
import { Paragraph } from "../atoms/Paragraph";
import { PricingGlowButton } from "../molecules/PricingGlowButton";
import { cn, sectionPadding, maxWidths, themeColors, glassmorphism, textSizes } from "@/utils/classNames";
import { useTranslations } from '@/lib/i18n/IntlProvider';

interface PricingPlan {
  id: string;
  price: number;
  currency: string;
  featured: boolean;
  stars: number;
}

interface GenericPricingSectionProps {
  /** Array de planes de pricing */
  plans: PricingPlan[];
  /** Color del acento (hex) */
  accentColor: string;
  /** Clase de color para el highlight del título */
  titleHighlightClass: keyof typeof themeColors;
  /** Namespace de traducción (ej: 'marketing.pricing') */
  translationNamespace: string;
}

/**
 * Organism: GenericPricingSection
 * Sección de pricing reutilizable
 * Acepta diferentes planes y colores para diferentes páginas
 */
export function GenericPricingSection({
  plans,
  accentColor,
  titleHighlightClass,
  translationNamespace,
}: GenericPricingSectionProps) {
  const t = useTranslations(translationNamespace);
  const tCommon = useTranslations('common');
  
  return (
    <section 
      className={cn("relative", sectionPadding.y)}
      aria-label={String(t('title'))}
    >
      <div className={cn(maxWidths.xl, sectionPadding.x)}>
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <SectionTitle className={cn(themeColors.white, "leading-tight mb-6 md:mb-8")}>
            {String(t('title'))} <span className={themeColors[titleHighlightClass]}>{String(t('titleHighlight'))}</span> {String(t('titleEnd') || '')}
          </SectionTitle>
          
          <SectionDescription size="lg" className="text-white/80 max-w-4xl mx-auto">
            {String(t('description'))}
          </SectionDescription>
        </div>

        {/* Grid de Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <RadialGlowCard
                glowColor={accentColor}
                glowPosition={{ x: "50%", y: "20%" }}
                className="h-full"
              >
                <div className="relative h-full flex flex-col">
                  {/* Header con glassmorphism */}
                  <div className={cn(
                    glassmorphism.medium,
                    "rounded-t-[32px] p-8 md:p-10 space-y-6"
                  )}>
                    {/* Estrellas */}
                    <div className="flex justify-center gap-1">
                      {[1, 2, 3].map((star) => (
                        <svg
                          key={star}
                          className={cn(
                            "w-5 h-5",
                            star <= plan.stars ? "fill-yellow-400" : "fill-white/20"
                          )}
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>

                    {/* Nombre del plan */}
                    <Heading level="h5" className={cn(themeColors.white, "text-center text-lg")}>
                      {String(t(`plans.${plan.id}.name`))}
                    </Heading>

                    {/* Precio */}
                    <div className="text-center">
                      <span className={cn("font-bold text-white", textSizes.price)}>
                        {plan.currency}{plan.price.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Badge periodo */}
                  <div className="flex justify-center -mt-4 mb-6 relative z-10">
                    <div className={cn(
                      "px-6 py-2 rounded-full border border-white/20",
                      glassmorphism.light
                    )}>
                      <Paragraph size="sm" className="text-white/90 font-medium">
                        {String(t('period'))}
                      </Paragraph>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="px-8 md:px-10 pb-8 flex-grow">
                    <Heading level="h5" className={cn(themeColors.white, "text-base mb-6")}>
                      {String(tCommon('features'))}
                    </Heading>
                    
                    <ul className="space-y-4 mb-10">
                      {(() => {
                        const features = t(`plans.${plan.id}.features`);
                        return Array.isArray(features) ? features.map((feature: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-3">
                            <svg 
                              className="w-5 h-5 flex-shrink-0 mt-0.5" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                              style={{ color: accentColor }}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <Paragraph size="sm" className="text-white/80">
                              {feature}
                            </Paragraph>
                          </li>
                        )) : null;
                      })()}
                    </ul>

                    {/* Botón Comenzar */}
                    <PricingGlowButton accentColor={accentColor}>
                      {String(tCommon('getStarted'))}
                    </PricingGlowButton>
                  </div>
                </div>
              </RadialGlowCard>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer de precios */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <Paragraph size="sm" className="text-white/60 leading-relaxed">
            {String(tCommon('priceDisclaimer'))}
          </Paragraph>
        </motion.div>
      </div>
    </section>
  );
}

