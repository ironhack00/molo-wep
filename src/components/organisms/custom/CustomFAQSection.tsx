import { GenericFAQSection } from "../GenericFAQSection";
import { customFAQ } from "@/data/custom/faqData";
import { useTranslations } from '@/lib/i18n/IntlProvider';

/**
 * Organism: CustomFAQSection
 * Sección de FAQ para custom/software personalizado
 * Reutiliza GenericFAQSection con color naranja
 */
export function CustomFAQSection() {
  const tAria = useTranslations('ariaLabels');
  
  return (
    <GenericFAQSection
      faqData={customFAQ}
      accentColor="#ff6b00"
      titleHighlightClass="custom"
      translationNamespace="custom.faq"
      itemsPath="items"
      ariaLabel={String(tAria('customFaq'))}
      titleLevel="h3"
    />
  );
}

