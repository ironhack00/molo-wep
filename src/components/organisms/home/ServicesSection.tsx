"use client";

import { SectionTitle } from "../../molecules/SectionTitle";
import { SectionDescription } from "../../molecules/SectionDescription";
import { StackedServiceCard } from "../../molecules/StackedServiceCard";
import { ServicesCarousel } from "../../molecules/ServicesCarousel";
import { servicesCardsData } from "@/data/servicesCards";
import { useIsMobile } from "../../hooks/useIsMobile";
import { cn, sectionPadding, marginBottom, maxWidths } from "@/utils/classNames";
import { useTranslations } from '@/lib/i18n/IntlProvider';

/**
 * Organism: ServicesSection
 * Sección con cards apiladas y efecto de scroll fluido en desktop
 * y carrusel en mobile
 */
export function ServicesSection() {
  const isMobile = useIsMobile();
  const t = useTranslations('home');
  const tCards = useTranslations('servicesCards');

  // Preparar datos para el carrusel mobile
  const carouselItems = servicesCardsData.map((service, index) => ({
    id: service.id,
    title: String(tCards(`${service.id}.title`)),
    description: String(tCards(`${service.id}.description`)),
    bgColor: service.bgColor,
    image: service.image,
    imageAlt: service.imageAlt,
    index,
  }));
  
  return (
    <section 
      id="services"
      className="relative min-h-screen"
      aria-label={String(t('servicesTitleHighlight'))}
    >
      {/* Header */}
      <div className={cn(sectionPadding.yLarge, sectionPadding.x, "text-center")}>
        <SectionTitle level="h2" className={cn("text-white", marginBottom.md)}>
          {String(t('servicesTitle'))} <span className="text-primary">{String(t('servicesTitleHighlight'))}</span>
        </SectionTitle>

        <SectionDescription size="lg" className={cn("text-white/80 leading-relaxed", maxWidths.prose)}>
          {String(t('servicesDescription'))}
        </SectionDescription>
      </div>

      {/* Mobile: Carrusel */}
      {isMobile && (
        <div className="md:hidden">
          <ServicesCarousel items={carouselItems} />
        </div>
      )}

      {/* Desktop: Cards apiladas con scroll fluido */}
      {!isMobile && (
        <>
          <div className="relative" id="services-stacking-section">
            {servicesCardsData.map((service, index) => {
              // Mapear IDs a URLs
              const getServiceUrl = (id: string) => {
                switch (id) {
                  case 'webDev': return '/development';
                  case 'design': return '/development-software';
                  case 'marketing': return '/marketing';
                  case 'automation': return '/automation';
                  default: return '/';
                }
              };

              const serviceUrl = getServiceUrl(service.id);
              console.log(`Service ${service.id} -> URL: ${serviceUrl}`);

              return (
                <StackedServiceCard
                  key={service.id}
                  title={String(tCards(`${service.id}.title`))}
                  description={String(tCards(`${service.id}.description`))}
                  bgColor={service.bgColor}
                  image={service.image}
                  imageAlt={service.imageAlt}
                  index={index}
                  total={servicesCardsData.length}
                  href={serviceUrl}
                />
              );
            })}
            
            {/* Espaciador para que las cards fixed no se superpongan con la siguiente sección */}
            <div style={{ height: "20vh" }} />
          </div>
          
          {/* Push final para asegurar que la siguiente sección quede por encima */}
          <div className="relative" style={{ zIndex: 5, background: "transparent", minHeight: "5vh" }} />
        </>
      )}
    </section>
  );
}

