'use client';

import { GenericHeroSection } from "../GenericHeroSection";
import { useTranslations } from '@/lib/i18n/IntlProvider';
import { HERO_ICONS } from '@/components/constants/heroIcons';

/**
 * Organism: DevelopmentHeroSection
 * Hero de la página de Desarrollo Web
 * Reutiliza GenericHeroSection con configuración específica
 */
export function DevelopmentHeroSection() {
  const t = useTranslations('development.hero');
  
  return (
    <GenericHeroSection
      colorOverlay="#007bff"
      titleBefore={String(t('titleBefore'))}
      titleHighlight={String(t('titleHighlight'))}
      highlightColor="development"
      titleAfter={String(t('titleAfter'))}
      description={String(t('description'))}
      buttons={[
        {
          text: String(t('btnServices')),
          href: "#services",
          variant: "glass",
          icon: HERO_ICONS.arrow,
        },
        {
          text: String(t('btnContact')),
          href: "/contact",
          variant: "glass",
          icon: HERO_ICONS.contact,
        },
      ]}
      ariaLabel="Hero de Desarrollo Web"
    />
  );
}

