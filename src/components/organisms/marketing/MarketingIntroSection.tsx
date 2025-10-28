"use client";

import { SectionTitle } from "../../molecules/SectionTitle";
import { SectionDescription } from "../../molecules/SectionDescription";
import { BackgroundGlow } from "../../molecules/BackgroundGlow";
import { cn, sectionPadding, themeColors } from "@/utils/classNames";
import { useTranslations } from '@/lib/i18n/IntlProvider';

/**
 * Organism: MarketingIntroSection
 * Sección de introducción de marketing
 * Reutiliza SectionTitle, SectionDescription y BackgroundGlow
 */
export function MarketingIntroSection() {
  const t = useTranslations('marketing.intro');
  
  return (
    <section 
      id="digital-presence"
      className={cn(
        "relative py-16 sm:py-20 md:py-24 lg:py-28 bg-black overflow-x-hidden",
        sectionPadding.x
      )}
      aria-label={String(t('titleHighlight'))}
    >
      {/* Iluminación de fondo - Reutiliza BackgroundGlow */}
      <BackgroundGlow theme="marketing" intensity={0.8} />

      <div className="relative z-10 max-w-7xl mx-auto text-center">
        {/* Título - Reutiliza SectionTitle */}
        <SectionTitle className={cn(themeColors.white, "leading-tight mb-6 md:mb-8")}>
          {String(t('title'))}{" "}
          <span className={themeColors.marketing}>{String(t('titleHighlight'))}</span>
          {" "}{String(t('titleEnd'))}
        </SectionTitle>

        {/* Descripción - Reutiliza SectionDescription */}
        <SectionDescription size="lg" className="text-white/80 max-w-4xl mx-auto">
          {String(t('description'))}
        </SectionDescription>
      </div>
    </section>
  );
}

