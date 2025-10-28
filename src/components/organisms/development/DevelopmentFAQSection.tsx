import { GenericFAQSection } from "../GenericFAQSection";
import { developmentFAQ } from "@/data/development/faqData";

/**
 * Organism: DevelopmentFAQSection
 * Sección de FAQ para development
 * Reutiliza GenericFAQSection con color azul
 */
export function DevelopmentFAQSection() {
  return (
    <GenericFAQSection
      faqData={developmentFAQ}
      accentColor="#007bff"
      titleHighlightClass="development"
      translationNamespace="development.faq"
      itemsPath="items"
    />
  );
}

