import { GenericWhySection } from "../global/GenericWhySection";
import { whyChooseDev } from "@/data/development/whyChooseData";

/**
 * Organism: DevelopmentWhyChooseSection
 * Sección "Why Choose" para development
 * Reutiliza GenericWhySection con color azul y glassmorphism
 */
export function DevelopmentWhyChooseSection() {
  return (
    <GenericWhySection
      whyData={whyChooseDev}
      titleHighlightClass="development"
      translationNamespace="development.whyChoose"
      showGlassmorphism={true}
    />
  );
}

