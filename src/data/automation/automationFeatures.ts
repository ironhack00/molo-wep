/**
 * Datos de features de automatización
 * Centraliza contenido para la sección de automation
 * Los textos se obtienen de messages/[locale].json usando automation.why.[id]
 */

export interface AutomationFeature {
  id: string;
  icon: string;
  iconAlt: string;
}

export const automationFeaturesData: AutomationFeature[] = [
  {
    id: "chatbots",
    icon: "/images/automation/chatbots.webp",
    iconAlt: "Diseño de chatbots para tu marca",
  },
  {
    id: "redesSociales",
    icon: "/images/automation/redes-sociales.webp",
    iconAlt: "Especialistas en estrategias de Redes Sociales",
  },
  {
    id: "resultados",
    icon: "/images/automation/resultados.webp",
    iconAlt: "Resultados tangibles desde el Primer día",
  },
];

