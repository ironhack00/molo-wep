"use client";

import { SectionTitle } from "../../molecules/SectionTitle";
import { SectionDescription } from "../../molecules/SectionDescription";
// import { ChatbotDemo } from "./ChatbotDemo"; // Comentado - no se usa
import { ChatbotDemoVariant2 } from "./ChatbotDemoVariant2";
import { cn, sectionPadding, marginBottom, maxWidths, themeColors, textSizes } from "@/utils/classNames";
import { useTranslations } from '@/lib/i18n/IntlProvider';

/**
 * Organism: AutomationAssistantSection
 * Sección "El Mejor asistente personalizado para ti"
 * Reutiliza SectionTitle, SectionDescription y ChatbotDemo
 */
export function AutomationAssistantSection() {
  const t = useTranslations('automation');
  const tAria = useTranslations('ariaLabels');
  
  return (
    <section 
      id="chatbot-demo"
      className={cn("relative", sectionPadding.y)}
      aria-label={String(tAria('customAssistant'))}
    >
      {/* Header de la sección */}
      <div className={cn(maxWidths.md, "text-center", marginBottom.xl, sectionPadding.x)}>
        <SectionTitle level="h2" className={cn(themeColors.white, "leading-relaxed", textSizes.sectionTitle, marginBottom.md)}>
          {String(t('assistant.title'))}
        </SectionTitle>

        <SectionDescription size="lg" className={cn("text-white/80 leading-relaxed", textSizes.sectionDescription)}>
          {String(t('assistant.description'))}
        </SectionDescription>
      </div>

      {/* Demo interactivo de chatbot - Primera instancia - COMENTADO */}
      {/* <div className={sectionPadding.x}>
        <ChatbotDemo />
      </div>

      <div className="h-16 md:h-24"></div> */}

      {/* Demo interactivo de chatbot - Segunda instancia con layout diferente */}
      <div className={sectionPadding.x}>
        <ChatbotDemoVariant2 />
      </div>
    </section>
  );
}

