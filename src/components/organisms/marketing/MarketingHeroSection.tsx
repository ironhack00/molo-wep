'use client';

import { GenericHeroSection } from "../global/GenericHeroSection";
import { useTranslations } from '@/lib/i18n/IntlProvider';
import { HERO_ICONS } from '@/components/constants/heroIcons';

/**
 * Organism: MarketingHeroSection
 * Hero de la página de Marketing
 * Reutiliza GenericHeroSection con configuración específica
 */
export function MarketingHeroSection() {
  const t = useTranslations('marketing.hero');
  
  return (
    <GenericHeroSection
      colorOverlay="#6c63ff"
      titleBefore={String(t('titleBefore'))}
      titleHighlight={String(t('titleHighlight'))}
      highlightColor="marketing"
      titleAfter={String(t('titleAfter'))}
      description={String(t('description'))}
      buttons={[
        {
          text: String(t('btnPortfolio')),
          href: "#success-stories",
          variant: "glass",
          icon: HERO_ICONS.megaphone,
        },
        {
          text: String(t('btnServices')),
          href: "#digital-presence",
          variant: "glass",
          icon: HERO_ICONS.worldLines,
        },
      ]}
      ariaLabel={String(useTranslations('ariaLabels')('marketingHero'))}
    />
  );
}

