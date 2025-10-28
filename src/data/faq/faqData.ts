/**
 * Data: General FAQ
 * Preguntas frecuentes generales
 */

export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  points?: string[];
}

export const generalFAQ: FAQItem[] = [
  {
    id: "impulso-negocio",
    category: "Beneficios y Tecnología",
    question: "¿Cómo puede un sitio web impulsar mi negocio?",
    answer: "Tener un sitio web ayuda a que más personas descubran tu negocio, facilita que se pongan en contacto contigo y construye confianza y credibilidad. Con un diseño bien estructurado y una promoción efectiva, atraerás más clientes y harás crecer tu negocio exitosamente."
  },
  {
    id: "que-es-seo",
    category: "Beneficios y Tecnología",
    question: "¿Qué es SEO y por qué mi negocio lo necesita?",
    answer: "SEO (Optimización para Motores de Búsqueda) ayuda a que tu sitio web se posicione mejor en los resultados de los motores de búsqueda, aumentando tu visibilidad en línea y atrayendo a más clientes potenciales. Posiciona tu negocio por delante de los competidores, facilitando que los clientes te encuentren y te elijan."
  },
  {
    id: "landing-page",
    category: "Beneficios y Tecnología",
    question: "¿Cómo puede una página de aterrizaje ayudarme a vender más?",
    answer: "Una página de aterrizaje está específicamente diseñada para convertir visitantes en leads o clientes. Destaca claramente un producto o oferta específica, guiando a los usuarios directamente hacia una acción (comprar, registrarse o solicitar información), lo que aumenta directamente tus ventas."
  },
  {
    id: "publicidad-pagada",
    category: "Beneficios y Tecnología",
    question: "¿Cómo funciona la publicidad pagada y cuánto debería invertir?",
    answer: "La publicidad pagada (Google Ads, Facebook Ads, etc.) te permite dirigir tus anuncios a una audiencia específica. El presupuesto depende de tus objetivos, mercado e industria; puedes comenzar con una pequeña inversión y ajustarla según los resultados y el presupuesto asignado. Esto siempre está respaldado por estrategias bien diseñadas y personalizadas para optimizar el rendimiento de la campaña, asegurando que tu inversión genere el mayor impacto posible en tu audiencia y en el crecimiento de tu negocio."
  },
  {
    id: "web-vs-mobile",
    category: "Beneficios y Tecnología",
    question: "¿Cuál es la diferencia entre una aplicación web y una aplicación móvil?",
    answer: "Una aplicación web se ejecuta directamente en tu navegador, ofreciendo accesibilidad instantánea sin instalación. Una aplicación móvil, sin embargo, está específicamente diseñada para ser descargada, proporcionando mejor rendimiento, características únicas y acceso sin conexión. Ambas están optimizadas para todos los dispositivos."
  },
  {
    id: "software-personalizado",
    category: "Beneficios y Tecnología",
    question: "¿Cuáles son los beneficios del software personalizado y cómo sé si mi negocio lo necesita?",
    answer: "Si el software que utilizas actualmente no se alinea con tus procesos de negocio, requiere la integración manual de múltiples herramientas, o si deseas automatizar tareas, una solución de software personalizada puede ser la mejor opción.",
    points: [
      "Adaptabilidad total y accesibilidad para satisfacer las necesidades de tu negocio",
      "Mayor productividad y eficiencia",
      "Automatización de procesos para ahorrar tiempo",
      "Escalabilidad para crecer junto con tu negocio",
      "Integración con las herramientas que ya utilizas",
      "Capacitación de usuarios y servicios de soporte"
    ]
  },
  {
    id: "servicios-molokaih",
    category: "Información general",
    question: "¿Qué servicios ofrece Molokaih?",
    answer: "Ofrecemos desarrollo y diseño web, automatización, inteligencia artificial, software a medida, marketing digital, mantenimiento y soporte."
  },
  {
    id: "paises",
    category: "Información general",
    question: "¿En qué países tienen presencia o atienden clientes?",
    answer: "Tenemos presencia digital en Norteamérica y Latinoamérica, y atendemos clientes en países como Estados Unidos, Canadá, México, Argentina, Colombia y más."
  },
  {
    id: "tipo-empresas",
    category: "Información general",
    question: "¿A qué tipo de empresas atiende Molokaih?",
    answer: "Trabajamos con empresas de todos los tamaños, principalmente en el sector B2B. Apoyamos a emprendedores y negocios de diversos rubros como construcción, retail, servicios profesionales y más."
  },
  {
    id: "idiomas",
    category: "Información general",
    question: "¿En qué idiomas pueden atenderme?",
    answer: "Atendemos en inglés, español y portugués."
  },
  {
    id: "servicios-individuales",
    category: "Información general",
    question: "¿Puedo contratar solo un servicio o deben ser paquetes completos?",
    answer: "Puedes contratar servicios individuales o paquetes integrales, según las necesidades de tu empresa."
  },
  {
    id: "proceso-trabajo",
    category: "Proceso y Soporte",
    question: "¿Cómo es el proceso de trabajo con Molokaih?",
    answer: "Comenzamos con una consultoría para entender tus objetivos, definimos el alcance, gestionamos el proyecto en etapas claras y te mantenemos informado durante todo el proceso."
  },
  {
    id: "mantenimiento",
    category: "Proceso y Soporte",
    question: "¿Ofrecen soporte y mantenimiento después de la entrega?",
    answer: "Sí, contamos con planes de mantenimiento y soporte proactivo para asegurar el funcionamiento óptimo de tus plataformas digitales."
  },
  {
    id: "contacto-soporte",
    category: "Proceso y Soporte",
    question: "¿Cómo puedo contactar al equipo de soporte?",
    answer: "Puedes comunicarte con nosotros a través de correo electrónico, teléfono, redes sociales o chat en nuestro sitio web."
  }
];

export const faqCategories = ["Beneficios y Tecnología", "Información general", "Proceso y Soporte"];

