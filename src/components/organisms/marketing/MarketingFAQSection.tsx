import { GenericFAQSection } from "../GenericFAQSection";
import { marketingFAQ } from "@/data/marketing/faqData";

/**
 * Organism: MarketingFAQSection
 * Sección de FAQ para marketing
 * Reutiliza GenericFAQSection con color morado
 */
export function MarketingFAQSection() {
  return (
    <GenericFAQSection
      faqData={marketingFAQ}
      accentColor="#6c63ff"
      titleHighlightClass="marketing"
      translationNamespace="marketing.faq"
      itemsPath="items"
    />
  );
}

