"use client";

import { GenericHeroSection } from "../global/GenericHeroSection";
import { useTranslations } from '@/lib/i18n/IntlProvider';
import { HERO_ICONS } from '@/components/constants/heroIcons';

/**
 * Organism: AutomationHeroSection
 * Hero de la página de Automatización
 * Reutiliza GenericHeroSection con configuración específica
 */
export function AutomationHeroSection() {
  const t = useTranslations('automation');
  
  return (
    <GenericHeroSection
      colorOverlay="#00d4aa"
      titleBefore={String(t('hero.titleBefore'))}
      titleHighlight={String(t('hero.titleHighlight'))}
      highlightColor="teal"
      titleAfter={String(t('hero.titleAfter'))}
      description={String(t('hero.description'))}
      buttons={[
        {
          text: String(t('hero.btnDemo')),
          href: "#chatbot-demo",
          variant: "glass",
          icon: HERO_ICONS.robot,
        },
        {
          text: String(t('hero.btnContact')),
          href: "/contact",
          variant: "glass",
          icon: HERO_ICONS.contact,
        },
      ]}
      ariaLabel="Hero de Automatización"
    />
  );
}

