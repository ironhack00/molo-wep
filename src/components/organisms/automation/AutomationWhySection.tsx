import { GenericWhySection } from "../GenericWhySection";
import { automationFeaturesData } from "@/data/automation/automationFeatures";

/**
 * Organism: AutomationWhySection
 * Sección "Why Choose" para automation
 * Reutiliza GenericWhySection con color turquesa
 */
export function AutomationWhySection() {
  return (
    <GenericWhySection
      whyData={automationFeaturesData}
      titleHighlightClass="teal"
      translationNamespace="automation.why"
      showGlassmorphism={false}
    />
  );
}

