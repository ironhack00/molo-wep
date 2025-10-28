import { GenericFAQSection } from "../GenericFAQSection";
import { automationFaqsData } from "@/data/automation/automationFaqs";
import { useTranslations } from '@/lib/i18n/IntlProvider';

/**
 * Organism: AutomationFAQSection
 * Sección de FAQ para automation
 * Reutiliza GenericFAQSection con color turquesa
 */
export function AutomationFAQSection() {
  const tAria = useTranslations('ariaLabels');
  
  return (
    <GenericFAQSection
      faqData={automationFaqsData}
      accentColor="#00d4aa"
      titleHighlightClass="teal"
      translationNamespace="automation.faq"
      itemsPath="items"
      ariaLabel={String(tAria('automationFaq'))}
    />
  );
}

