import { GenericWhySection } from "../GenericWhySection";
import { whyChooseMolokaih } from "@/data/marketing/whyChooseData";

/**
 * Organism: MarketingWhySection
 * Sección "Why Choose" para marketing
 * Reutiliza GenericWhySection con color morado y glassmorphism
 */
export function MarketingWhySection() {
  return (
    <GenericWhySection
      whyData={whyChooseMolokaih}
      titleHighlightClass="marketing"
      translationNamespace="marketing.whyChoose"
      showGlassmorphism={true}
    />
  );
}

