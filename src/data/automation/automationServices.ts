/**
 * Data: Automation Services
 * Datos para la sección de servicios de automatización
 * Los textos se obtienen de messages/[locale].json usando automation.services.[id]
 */

export interface AutomationService {
  id: string;
  icon: string;
  iconAlt: string;
}

export const automationServicesData: AutomationService[] = [
  {
    id: "publicacionesRedes",
    icon: "/images/automation/publicaciones-redes.webp",
    iconAlt: "Publicaciones automatizadas para redes sociales",
  },
  {
    id: "chatbots247",
    icon: "/images/automation/chatbots-247.webp",
    iconAlt: "Chatbots inteligentes con atención 24/7",
  },
  {
    id: "integraciones",
    icon: "/images/automation/integraciones.webp",
    iconAlt: "Integraciones y automatizaciones",
  },
  {
    id: "consultasTecnologicas",
    icon: "/images/automation/consultas-tecnologicas.webp",
    iconAlt: "Consultas tecnológicas",
  }
];

