import { GenericWhySection } from "../global/GenericWhySection";
import { whyModernWebData } from "@/data/development/whyModernWeb";

/**
 * Organism: DevelopmentWhySection
 * Sección "Why Modern Website" para development
 * Reutiliza GenericWhySection con color azul
 */
export function DevelopmentWhySection() {
  return (
    <GenericWhySection
      whyData={whyModernWebData}
      titleHighlightClass="development"
      translationNamespace="development.why"
      showGlassmorphism={false}
    />
  );
}

