import { GenericWhySection } from "../GenericWhySection";
import { whyInvestData } from "@/data/custom/whyInvestData";

/**
 * Organism: CustomWhySection
 * Sección "Why Invest" para custom/software personalizado
 * Reutiliza GenericWhySection con color naranja
 */
export function CustomWhySection() {
  return (
    <GenericWhySection
      whyData={whyInvestData}
      titleHighlightClass="custom"
      translationNamespace="custom.whyInvest"
      showGlassmorphism={false}
      titleLevel="h3"
      cardTitleLevel="h3"
      cardTextSize="cardTextExtraSmall"
    />
  );
}

