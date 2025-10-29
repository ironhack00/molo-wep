import { GenericServicesSection } from "../global/GenericServicesSection";
import { customServices } from "@/data/custom/servicesData";
import { useTranslations } from '@/lib/i18n/IntlProvider';

/**
 * Organism: CustomServicesSection
 * Sección de servicios para custom/software personalizado
 * Reutiliza GenericServicesSection con header, 2 columnas
 */
export function CustomServicesSection() {
  const tAria = useTranslations('ariaLabels');
  
  return (
    <GenericServicesSection
      servicesData={customServices}
      titleHighlightClass="custom"
      translationNamespace="custom.services"
      showHeader={true}
      gridCols={2}
      ariaLabel={String(tAria('customServices'))}
      titleLevel="h3"
      cardTitleLevel="h3"
      cardTextSize="cardTextExtraSmall"
    />
  );
}

