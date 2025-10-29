import { GenericServicesSection } from "../global/GenericServicesSection";
import { automationServicesData } from "@/data/automation/automationServices";
import { useTranslations } from '@/lib/i18n/IntlProvider';
import { cn, sectionPadding, maxWidths } from "@/utils/classNames";

/**
 * Organism: AutomationServicesSection
 * Sección de servicios para automation
 * Reutiliza GenericServicesSection sin header, 2 columnas, con ancho reducido
 */
export function AutomationServicesSection() {
  const tAria = useTranslations('ariaLabels');
  
  return (
    <section 
      className={cn("relative", sectionPadding.y)}
      aria-label={String(tAria('automationServices'))}
    >
      <div className={cn(maxWidths.lg, sectionPadding.x)}>
        <GenericServicesSection
          servicesData={automationServicesData}
          translationNamespace="automation.services"
          showHeader={false}
          gridCols={2}
          ariaLabel={String(tAria('automationServices'))}
        />
      </div>
    </section>
  );
}

