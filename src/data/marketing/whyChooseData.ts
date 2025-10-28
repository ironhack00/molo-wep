/**
 * Data: Why Choose Molokaih
 * Razones para elegir Molokaih
 * Los textos se obtienen de messages/[locale].json usando marketing.whyChoose.[id]
 */

export interface WhyChooseItem {
  id: string;
  icon: string;
  iconAlt: string;
}

export const whyChooseMolokaih: WhyChooseItem[] = [
  {
    id: "estrategia",
    icon: "/icons/marketing/strategy.webp",
    iconAlt: "Personalized Strategies",
  },
  {
    id: "resultados",
    icon: "/icons/marketing/results.webp",
    iconAlt: "Measurable Results",
  },
  {
    id: "contenido",
    icon: "/icons/marketing/content.webp",
    iconAlt: "Connecting Content",
  },
  {
    id: "ia",
    icon: "/icons/marketing/ai.webp",
    iconAlt: "AI Automation",
  },
  {
    id: "equipo",
    icon: "/icons/marketing/team.webp",
    iconAlt: "Multidisciplinary Team",
  },
  {
    id: "todo-en-uno",
    icon: "/icons/marketing/all-in-one.webp",
    iconAlt: "All in One Place",
  },
];

