/**
 * Utilities: ClassNames
 * Utilidades para combinar y generar clases CSS reutilizables
 */

/**
 * Combina múltiples clases CSS en un string
 * Filtra valores falsy (undefined, null, false, '')
 * 
 * @example
 * ```tsx
 * cn('base-class', isActive && 'active', className)
 * ```
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Colores temáticos reutilizables
 */
export const themeColors = {
  primary: "text-primary",
  secondary: "text-secondary",
  teal: "text-[#00d4aa]",
  marketing: "text-[#6c63ff]",
  development: "text-[#007bff]",
  custom: "text-[#ff6b00]",
  white: "text-white",
} as const;

// (Eliminado: themeBgColors no usado)

/**
 * Variantes de efecto glassmorphism reutilizable
 */
export const glassmorphism = {
  /** Glassmorphism ligero - para elementos sutiles */
  light: 'bg-white/5 backdrop-blur-md',
  
  /** Glassmorphism medio - uso general */
  medium: 'bg-white/10 backdrop-blur-lg',
  
  /** Glassmorphism fuerte - para elementos destacados */
  strong: 'bg-white/20 backdrop-blur-xl',
  
  /** Glassmorphism oscuro - para fondos oscuros */
  dark: 'bg-black/30 backdrop-blur-xl',
  
  /** Glassmorphism muy oscuro */
  darker: 'bg-black/50 backdrop-blur-2xl',
} as const;

/**
 * Variantes de bordes con glassmorphism
 */
export const glassBorder = {
  light: 'border border-white/10',
  medium: 'border border-white/20',
  strong: 'border border-white/30',
} as const;

/**
 * Combinaciones predefinidas de glassmorphism con bordes
 */
// (Eliminado: glassCard no usado)

/**
 * Estilos base para botones (reutilizable)
 */
export const buttonBase = "inline-flex items-center justify-center font-semibold transition-all duration-300";

/**
 * Variantes de tamaños para botones
 */
export const buttonSizes = {
  sm: "px-4 py-2 text-sm rounded-lg",
  md: "px-6 py-3 text-base rounded-full",
  lg: "px-8 py-4 text-lg rounded-full",
} as const;

/**
 * Variantes de estilos para botones
 */
export const buttonVariants = {
  primary: "bg-primary hover:bg-primary text-white hover:scale-105 shadow-[0_0_20px_rgba(37,217,216,0.5)] hover:shadow-[0_0_30px_rgba(37,217,216,0.8)]",
  secondary: cn(glassmorphism.light, glassBorder.medium, "hover:bg-white/20 text-white"),
  outline: "bg-transparent hover:bg-white/10 text-white border-2 border-white hover:border-primary",
  glass: "backdrop-blur-xl border border-white/20 hover:border-white/40 text-white hover:bg-white/5",
  teal: "bg-[#00d4aa] hover:bg-[#00d4aa]/90 text-white hover:scale-105",
  marketing: "bg-[#6c63ff] hover:bg-[#6c63ff]/90 text-white hover:scale-105",
  development: "bg-[#007bff] hover:bg-[#007bff]/90 text-white hover:scale-105",
  custom: "bg-[#ff6b00] hover:bg-[#ff6b00]/90 text-white hover:scale-105",
  whatsapp: "bg-white hover:bg-white/90 text-black hover:scale-105 shadow-lg hover:shadow-xl",
  ghost: "hover:text-primary transition-colors",
  icon: "cursor-pointer hover:text-primary transition-colors",
} as const;

/**
 * Espaciados consistentes para secciones
 */
export const sectionPadding = {
  /** Padding horizontal responsivo para secciones */
  x: "px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16",
  /** Padding vertical responsivo para secciones */
  y: "py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32",
  /** Padding vertical para hero sections */
  yHero: "py-32 sm:py-28 md:py-24 lg:py-20",
  /** Padding vertical extra grande */
  yLarge: "py-20 sm:py-24 md:py-28 lg:py-32 xl:py-40",
  /** Combinación x + y */
  all: "px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32",
} as const;

/**
 * Máximos anchos containers reutilizables
 */
export const maxWidths = {
  sm: "max-w-3xl mx-auto",
  md: "max-w-5xl mx-auto",
  lg: "max-w-7xl mx-auto",
  xl: "max-w-[1800px] mx-auto",
  prose: "max-w-4xl mx-auto", // Para contenido de texto
} as const;

/**
 * Espaciados de margin bottom responsivos
 */
export const marginBottom = {
  sm: "mb-6 sm:mb-8 md:mb-10",
  md: "mb-8 sm:mb-10 md:mb-12",
  lg: "mb-12 sm:mb-16 md:mb-20",
  xl: "mb-16 sm:mb-20 md:mb-24 lg:mb-28",
} as const;

/**
 * Tamaños de texto centralizados
 * CAMBIA AQUÍ → Cambia en todo el sitio
 */
export const textSizes = {
  /** Títulos principales de sección (FAQ, About) */
  sectionTitle: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl",
  
  /** Títulos hero/principales extra grandes */
  heroTitle: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl",
  
  /** Títulos de cards/items/servicios */
  cardTitle: "text-base sm:text-lg md:text-xl lg:text-2xl",
  
  /** Títulos medianos (secciones about/valores) */
  mediumTitle: "text-3xl sm:text-4xl md:text-5xl",
  
  /** Sub-títulos (visión/misión) */
  subTitle: "text-2xl sm:text-3xl md:text-4xl",
  
  /** Precios */
  price: "text-4xl md:text-5xl",
  
  /** Párrafos de cards */
  cardText: "text-sm sm:text-base",
  
  /** Párrafos de cards más pequeños (para páginas con títulos reducidos) */
  cardTextSmall: "text-xs sm:text-sm",
  
  /** Párrafos de cards extra pequeños (para cards muy compactas) */
  cardTextExtraSmall: "text-xs",
  
  /** Descripción de sección */
  sectionDescription: "text-base sm:text-lg md:text-xl",
  
  /** Stats/números grandes */
  statNumber: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl",
  
  /** Stats/texto pequeño */
  statText: "text-sm sm:text-base md:text-lg lg:text-xl",
} as const;

/**
 * Tamaños de iconos/logos centralizados
 * CAMBIA AQUÍ → Cambia en todo el sitio
 */
export const iconSizes = {
  /** Iconos en cards de servicios/beneficios */
  card: "w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32",
  
  /** Iconos en hero/grandes */
  hero: "w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48",
  
  /** Iconos pequeños en botones */
  button: "w-5 h-5 sm:w-6 sm:h-6",
  
  /** Logos en navbar */
  navbar: "h-8 md:h-10",
  
  /** Logos en footer */
  footer: "h-10 md:h-12",
  
  /** Logo principal (M) */
  logoMain: "w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48",
} as const;

/**
 * Pesos de fuente centralizados
 * CAMBIA AQUÍ → Cambia en todo el sitio
 * 
 * CONFIGURACIÓN ACTUAL (definida en globals.css):
 * - H1: League Spartan Semi Bold (600)
 * - H2, H3: Poppins Semi Bold (600)
 * - H4, H5, H6: Poppins Regular (400)
 * - Body/Párrafos: Poppins Regular (400)
 */
// (Eliminado: fontWeights no usado)

/**
 * Familias de fuente disponibles
 * USAR estas clases para override manual si es necesario
 */
// (Eliminado: fontFamilies no usado)

/**
 * Line heights centralizados
 */
// (Eliminado: lineHeights no usado)

/**
 * Border radius centralizados
 */
export const borderRadius = {
  sm: "rounded-lg",
  md: "rounded-xl",
  lg: "rounded-2xl",
  xl: "rounded-3xl",
  "2xl": "rounded-[32px]",
  full: "rounded-full",
  card: "rounded-2xl",          // Cards estándar
  button: "rounded-full",       // Botones
  input: "rounded-lg",          // Inputs
} as const;

