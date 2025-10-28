/**
 * Organism: CustomHeroSection
 * Hero section para la página Custom
 * Reutiliza GenericHeroSection con configuración específica
 */

"use client";

import { GenericHeroSection } from '../GenericHeroSection';
import { useTranslations } from '@/lib/i18n/IntlProvider';
import { HERO_ICONS } from '@/components/constants/heroIcons';

export function CustomHeroSection() {
  const t = useTranslations('custom');
  
  return (
    <GenericHeroSection
      colorOverlay="#ff6b00"
      titleBefore={String(t('hero.titleBefore'))}
      titleHighlight={String(t('hero.titleHighlight'))}
      highlightColor="custom"
      titleAfter={String(t('hero.titleAfter'))}
      description={String(t('hero.description'))}
      buttons={[
        {
          text: String(t('hero.btnServices')),
          href: "#services",
          variant: "glass",
          icon: HERO_ICONS.arrow,
        },
        {
          text: String(t('hero.btnContact')),
          href: "/contact",
          variant: "glass",
          icon: HERO_ICONS.contact,
        },
      ]}
      ariaLabel="Hero de Custom"
      titleLevel="h2"
    />
  );
}

