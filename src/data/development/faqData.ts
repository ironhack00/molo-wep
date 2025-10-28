/**
 * Data: Development FAQ
 * Preguntas frecuentes sobre desarrollo web
 */

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const developmentFAQ: FAQItem[] = [
  {
    id: "tiempo-desarrollo",
    question: "¿Cuánto tiempo tarda el desarrollo de un sitio web profesional?",
    answer: "El tiempo varía según la complejidad del proyecto. Una landing page simple puede estar lista en 2-3 semanas, un sitio corporativo de 5-10 páginas toma entre 4-6 semanas, y una tienda online completa puede requerir 8-12 semanas. Incluimos fases de diseño, desarrollo, revisiones y optimización. Te entregamos un cronograma detallado desde el inicio para que sepas exactamente qué esperar en cada etapa."
  },
  {
    id: "costo-mantenimiento",
    question: "¿Necesito pagar mantenimiento mensual para mi sitio web?",
    answer: "Depende de tus necesidades. El hosting y dominio tienen costos anuales estándar ($100-300 USD/año). El mantenimiento técnico (actualizaciones de seguridad, plugins, backups) es opcional pero recomendado ($50-150 USD/mes). Si tu sitio requiere actualizaciones frecuentes de contenido, cambios de diseño o soporte prioritario, ofrecemos planes de mantenimiento que incluyen estos servicios más horas de desarrollo mensuales."
  },
  {
    id: "cms-editar",
    question: "¿Podré editar el contenido de mi sitio yo mismo después de entregado?",
    answer: "Absolutamente. Todos nuestros sitios incluyen un panel de administración intuitivo (CMS) donde puedes editar textos, agregar imágenes, crear páginas nuevas y actualizar contenido sin necesidad de programar. Además, te capacitamos en una sesión de 1-2 horas para que domines todas las funciones. Para cambios de diseño o estructura más complejos, siempre puedes contar con nuestro soporte técnico."
  },
  {
    id: "responsive-mobile",
    question: "¿El sitio web se verá bien en celulares y tablets?",
    answer: "Sí, diseñamos con enfoque mobile-first. Esto significa que tu sitio se adapta perfectamente a cualquier dispositivo (celular, tablet, laptop, desktop) sin perder funcionalidad ni estética. Más del 70% de usuarios navegan desde móviles, por eso optimizamos especialmente la experiencia mobile: velocidad de carga, navegación táctil, botones accesibles y contenido bien distribuido. Probamos en múltiples dispositivos antes de entregar."
  },
  {
    id: "seo-posicionamiento",
    question: "¿Mi sitio web aparecerá en Google automáticamente?",
    answer: "Sí, pero posicionar bien requiere trabajo continuo. Entregamos tu sitio con SEO técnico optimizado: código limpio, velocidad rápida, sitemap, meta tags, y estructura correcta. Esto da las bases para que Google te indexe. Sin embargo, aparecer en primeros resultados requiere estrategia de contenido, keywords research, link building y optimización continua. Ofrecemos servicios de SEO mensual si buscas posicionamiento competitivo en tu industria."
  }
];

