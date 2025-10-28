"use client";

import { SectionTitle } from "../../molecules/SectionTitle";
import { SectionDescription } from "../../molecules/SectionDescription";
import { FeatureContent } from "../../molecules/FeatureContent";
import { WhyChooseCarousel } from "../../molecules/WhyChooseCarousel";
import { whyChooseUsData } from "@/data/whyChooseUs";
import { usePinnedScroll } from "../../hooks/usePinnedScroll";
import { useIsMobile } from "../../hooks/useIsMobile";
import { cn, sectionPadding, marginBottom, maxWidths } from "@/utils/classNames";
import { useTranslations } from '@/lib/i18n/IntlProvider';

/**
 * Organism: WhyChooseUsSection
 * Sección "Por qué elegirnos" con efecto scroll pinned en desktop
 * y carrusel en mobile
 */
export function WhyChooseUsSection() {
  const { containerRef, currentIndex } = usePinnedScroll(whyChooseUsData.length);
  const currentFeature = whyChooseUsData[currentIndex];
  const isMobile = useIsMobile();
  const t = useTranslations('home');
  const tWhy = useTranslations('whyChooseUs');

  // Preparar datos para el carrusel mobile
  const carouselItems = whyChooseUsData.map(feature => ({
    id: feature.id,
    title: String(tWhy(`${feature.id}.title`)),
    description: String(tWhy(`${feature.id}.description`)),
    image: feature.image,
    imageAlt: feature.imageAlt,
    icon: feature.icon,
  }));

  return (
    <section 
      className={cn("relative", sectionPadding.y)}
      aria-label={String(t('whyChooseTitleHighlight'))}
    >
      {/* Header de la sección */}
      <div className={cn(maxWidths.md, "text-center", marginBottom.xl, sectionPadding.x)}>
        <SectionTitle level="h2" className={cn("text-white leading-relaxed", marginBottom.md)}>
          {String(t('whyChooseTitle'))} <span className="text-primary">{String(t('whyChooseTitleHighlight'))}</span> {String(t('whyChooseTitleEnd'))}
        </SectionTitle>

        <SectionDescription size="lg" className="text-white/80 leading-relaxed">
          {String(t('whyChooseDescription'))}
        </SectionDescription>
      </div>

      {/* Mobile: Carrusel */}
      {isMobile && (
        <div className="md:hidden">
          <WhyChooseCarousel items={carouselItems} />
        </div>
      )}

      {/* Desktop: Contenedor con scroll pinned */}
      {!isMobile && (
        <div 
          ref={containerRef}
          className={cn("relative min-h-screen flex items-center justify-center", sectionPadding.x)}
        >
          <div className={cn(maxWidths.xl, "w-full")}>
            <FeatureContent
              currentIndex={currentIndex}
              title={String(tWhy(`${currentFeature.id}.title`))}
              description={String(tWhy(`${currentFeature.id}.description`))}
              image={currentFeature.image}
              imageAlt={currentFeature.imageAlt}
              icon={currentFeature.icon}
            />
          </div>
        </div>
      )}
    </section>
  );
}

