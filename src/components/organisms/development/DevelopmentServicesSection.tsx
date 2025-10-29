import { GenericServicesSection } from "../global/GenericServicesSection";
import { developmentServices } from "@/data/development/servicesData";

/**
 * Organism: DevelopmentServicesSection
 * Sección de servicios para development
 * Reutiliza GenericServicesSection con header, 2 columnas
 */
export function DevelopmentServicesSection() {
  return (
    <GenericServicesSection
      servicesData={developmentServices}
      titleHighlightClass="development"
      translationNamespace="development.services"
      showHeader={true}
      gridCols={2}
    />
  );
}

