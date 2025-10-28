import { GenericServicesSection } from "../GenericServicesSection";
import { marketingServices } from "@/data/marketing/servicesData";
import { useTranslations } from '@/lib/i18n/IntlProvider';

/**
 * Organism: MarketingServicesSection
 * Sección de servicios para marketing
 * Reutiliza GenericServicesSection sin header, 3 columnas
 */
export function MarketingServicesSection() {
  const tAria = useTranslations('ariaLabels');
  
  return (
    <GenericServicesSection
      servicesData={marketingServices}
      translationNamespace="marketing.services"
      showHeader={false}
      gridCols={3}
      ariaLabel={String(tAria('marketingServices'))}
    />
  );
}

