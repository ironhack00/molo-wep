/**
 * Data: Marketing FAQ
 * Preguntas frecuentes sobre marketing y publicidad
 */

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const marketingFAQ: FAQItem[] = [
  {
    id: "presupuesto-meta",
    question: "¿Cuál es el presupuesto mínimo recomendado para una campaña de publicidad en Meta (Facebook/Instagram)?",
    answer: "Recomendamos un presupuesto mínimo de $500-$1,000 USD mensuales para campañas efectivas en Meta Ads. Este monto permite al algoritmo de Meta recopilar datos suficientes para optimizar tus anuncios, realizar pruebas A/B y alcanzar a tu audiencia objetivo de manera consistente. Con presupuestos menores, la campaña puede tardar más en generar resultados medibles y limita las opciones de segmentación y optimización."
  },
  {
    id: "resultados-tiempo",
    question: "¿Cuánto tiempo tarda en verse resultados con una estrategia de marketing digital?",
    answer: "Los primeros indicadores de rendimiento suelen aparecer en 2-4 semanas, pero los resultados sólidos y consistentes generalmente se observan entre 3-6 meses. El marketing digital es un proceso continuo de optimización: los primeros 30 días se destinan a recopilar datos, los siguientes 60 días a ajustar y optimizar, y a partir del tercer mes es cuando se consolidan los resultados. La paciencia y el análisis constante son clave para el éxito a largo plazo."
  },
  {
    id: "google-vs-meta",
    question: "¿Es mejor invertir en Google Ads o en Meta Ads para mi negocio?",
    answer: "Depende de tus objetivos y tipo de negocio. Google Ads es ideal para captar demanda existente (personas que ya buscan tu producto/servicio), mientras que Meta Ads funciona mejor para generar demanda y crear awareness. Lo más efectivo suele ser una estrategia combinada: usar Google Ads para conversiones directas de alto intent y Meta Ads para construir audiencia, remarketing y engagement. Analizamos tu caso específico para determinar la mejor distribución de presupuesto entre ambas plataformas."
  },
  {
    id: "roi-medicion",
    question: "¿Cómo se mide el retorno de inversión (ROI) en marketing digital?",
    answer: "Medimos el ROI a través de múltiples métricas: costo por adquisición (CPA), valor del tiempo de vida del cliente (LTV), tasa de conversión, y retorno sobre inversión publicitaria (ROAS). Implementamos píxeles de seguimiento, configuramos conversiones en Analytics, y generamos reportes mensuales detallados que muestran exactamente cuántos leads, ventas o acciones valiosas generó cada peso invertido. La transparencia total en métricas es fundamental para demostrar el impacto real de cada campaña."
  }
];

