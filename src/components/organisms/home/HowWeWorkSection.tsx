import { GenericHowWeWorkSection } from "../global/GenericHowWeWorkSection";

/**
 * Organism: HowWeWorkSection
 * Sección "How We Work" para el home
 * Reutiliza GenericHowWeWorkSection con color primario
 */
export function HowWeWorkSection() {
  return (
    <GenericHowWeWorkSection
      accentColor="#25d9d8"
      titleHighlightClass="text-primary"
      translationNamespace="home"
      showTrustBanner={true}
    />
  );
}

