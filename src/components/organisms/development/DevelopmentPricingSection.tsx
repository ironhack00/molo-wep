"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconChevronDown } from "@tabler/icons-react";
import { SectionTitle } from "../../molecules/SectionTitle";
import { SectionDescription } from "../../molecules/SectionDescription";
import { RadialGlowCard } from "../../atoms/RadialGlowCard";
import { Heading } from "../../atoms/Heading";
import { Paragraph } from "../../atoms/Paragraph";
import { PricingGlowButton } from "../../molecules/PricingGlowButton";
import { cn, sectionPadding, maxWidths, themeColors, glassmorphism, textSizes } from "@/utils/classNames";
import { useTranslations } from '@/lib/i18n/IntlProvider';
import { useIsMobile } from "../../hooks/useIsMobile";
import { allPricingCategories } from "@/data/development/pricingData";

/**
 * Organism: DevelopmentPricingSection
 * Sección de pricing para development con múltiples categorías
 * Muestra solo servicios relacionados con desarrollo: Web Development, Maintenance, Ecommerce, Ecosystem
 */
export function DevelopmentPricingSection() {
  const t = useTranslations('development.pricing');
  const tCommon = useTranslations('common');
  const [activeCategory, setActiveCategory] = useState<string>('web-development');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const accentColor = "#007bff";
  
  // Filtrar solo categorías relacionadas con desarrollo (excluir marketing)
  const developmentCategories = allPricingCategories.filter(cat => 
    ['web-development', 'web-maintenance', 'ecommerce', 'ecommerce-maintenance', 'ecosystem'].includes(cat.id)
  );
  
  // Obtener la categoría activa
  const currentCategory = developmentCategories.find(cat => cat.id === activeCategory);
  
  const handleCategorySelect = (categoryId: string) => {
    setActiveCategory(categoryId);
    setIsDropdownOpen(false);
  };

  return (
    <section 
      className={cn("relative", sectionPadding.y)}
      aria-label={String(t('title'))}
    >
      <div className={cn(maxWidths.xl, sectionPadding.x)}>
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <SectionTitle className={cn(themeColors.white, "leading-tight mb-6 md:mb-8")}>
            {String(t('title'))} <span className={themeColors.development}>{String(t('titleHighlight'))}</span> {String(t('titleEnd') || '')}
          </SectionTitle>
          
          <SectionDescription size="lg" className="text-white/80 max-w-4xl mx-auto">
            {String(t('description'))}
          </SectionDescription>
        </div>

        {/* Tabs para seleccionar categoría - Responsive */}
        {isMobile ? (
          /* Dropdown para Mobile */
          <div className="relative mb-12 max-w-md mx-auto">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={cn(
                "w-full px-6 py-4 rounded-2xl transition-all duration-300 flex items-center justify-between",
                "border-2 hover:border-blue-400/60",
                "bg-black/40 backdrop-blur-xl"
              )}
              style={{
                borderColor: accentColor + "80",
                boxShadow: `0 0 20px ${accentColor}40`
              }}
            >
              <span className="text-white font-semibold text-base">
                {String(t(`categories.${activeCategory}.title`))}
              </span>
              <IconChevronDown 
                className={cn(
                  "w-5 h-5 transition-transform duration-300",
                  isDropdownOpen && "rotate-180"
                )}
                style={{ color: accentColor }}
                strokeWidth={2.5}
              />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    "absolute top-full left-0 right-0 mt-2 rounded-2xl overflow-hidden z-50",
                    "border-2 shadow-2xl",
                    "bg-black/95 backdrop-blur-xl"
                  )}
                  style={{
                    borderColor: accentColor + "60",
                    boxShadow: `0 0 40px ${accentColor}60, 0 10px 30px rgba(0,0,0,0.5)`
                  }}
                >
                  {developmentCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategorySelect(category.id)}
                      className={cn(
                        "w-full px-6 py-4 text-left transition-all duration-200",
                        "border-b border-white/10 last:border-b-0",
                        "active:scale-98",
                        activeCategory === category.id 
                          ? "text-white font-semibold" 
                          : "text-white/70 hover:text-white"
                      )}
                      style={
                        activeCategory === category.id
                          ? {
                              backgroundColor: accentColor + "30",
                              boxShadow: `inset 0 0 20px ${accentColor}20`
                            }
                          : undefined
                      }
                      onMouseEnter={(e) => {
                        if (activeCategory !== category.id) {
                          e.currentTarget.style.backgroundColor = accentColor + "15";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (activeCategory !== category.id) {
                          e.currentTarget.style.backgroundColor = "transparent";
                        }
                      }}
                    >
                      {String(t(`categories.${category.id}.title`))}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          /* Botones horizontales para Desktop */
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {developmentCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "px-6 py-3 rounded-full transition-all duration-300",
                  "border border-white/20 hover:border-white/40",
                  activeCategory === category.id 
                    ? "bg-blue-600 text-white" 
                    : "bg-white/5 text-white/70 hover:text-white"
                )}
              >
                {String(t(`categories.${category.id}.title`))}
              </button>
            ))}
          </div>
        )}

        {/* Descripción de la categoría activa */}
        {currentCategory && (
          <div className="text-center mb-8">
            <Paragraph size="lg" className="text-white/70 max-w-3xl mx-auto">
              {String(t(`categories.${activeCategory}.description`))}
            </Paragraph>
          </div>
        )}

        {/* Grid de Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {currentCategory?.plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
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
                      {String(t(`categories.${activeCategory}.plans.${plan.id}.name`))}
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
                        {String(t(`categories.${activeCategory}.period`))}
                      </Paragraph>
                    </div>
                  </div>

                  {/* Setup Fee si existe */}
                  {plan.setupFee && (
                    <div className="px-8 md:px-10 mb-4">
                      <Paragraph size="sm" className="text-white/60 text-center">
                        {String(t(`categories.${activeCategory}.plans.${plan.id}.setupFee`))}
                      </Paragraph>
                    </div>
                  )}

                  {/* Ideal For si existe */}
                  {(() => {
                    const idealFor = t(`categories.${activeCategory}.plans.${plan.id}.idealFor`);
                    return idealFor && idealFor !== `categories.${activeCategory}.plans.${plan.id}.idealFor` ? (
                      <div className="px-8 md:px-10 mb-6">
                        <div className={cn(
                          "p-4 rounded-lg border border-white/10 min-h-[120px] flex items-center justify-center",
                          glassmorphism.light
                        )}>
                          <Paragraph size="sm" className="text-white/70 text-center italic leading-relaxed">
                            {String(idealFor)}
                          </Paragraph>
                        </div>
                      </div>
                    ) : null;
                  })()}

                  {/* Features */}
                  <div className="px-8 md:px-10 pb-8 flex-grow flex flex-col">
                    <Heading level="h5" className={cn(themeColors.white, "text-base mb-6")}>
                      {String(tCommon('features'))}
                    </Heading>
                    
                    <ul className="space-y-4 mb-10 flex-grow">
                      {(() => {
                        const features = t(`categories.${activeCategory}.plans.${plan.id}.features`);
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

                    {/* Botón Comenzar - Siempre al final */}
                    <div className="mt-auto">
                      <PricingGlowButton accentColor={accentColor}>
                        {String(tCommon('getStarted'))}
                      </PricingGlowButton>
                    </div>
                  </div>
                </div>
              </RadialGlowCard>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer de precios */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
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

