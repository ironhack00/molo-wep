import { GenericHowWeWorkSection } from "../global/GenericHowWeWorkSection";

/**
 * Organism: CustomHowWeWorkSection
 * Sección "How We Work" para development-software
 * Reutiliza GenericHowWeWorkSection con color naranja
 */
export function CustomHowWeWorkSection() {
  return (
    <GenericHowWeWorkSection
      accentColor="#ff6b00"
      titleHighlightClass="text-[#ff6b00]"
      translationNamespace="custom"
      showTrustBanner={false}
      titleLevel="h3"
    />
  );
}

