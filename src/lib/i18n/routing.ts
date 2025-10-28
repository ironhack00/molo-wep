/**
 * Utilidades para manejo de rutas con i18n
 */

export const defaultLocale = 'en';
export const supportedLocales = ['en', 'es'] as const;
export type Locale = typeof supportedLocales[number];

/**
 * Obtiene el prefijo de locale para URLs
 * @param locale - Idioma actual
 * @returns Prefijo para URL (vacío para inglés, '/es' para español)
 */
export function getLocalePrefix(locale: string): string {
  return locale === 'es' ? '/es' : '';
}

/**
 * Construye una URL con el prefijo de locale correcto
 * @param path - Ruta base (ej: '/contact', '/about')
 * @param locale - Idioma actual
 * @returns URL completa con prefijo si es necesario
 */
export function localizedPath(path: string, locale: string): string {
  const prefix = getLocalePrefix(locale);
  // Asegurar que path comience con /
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${prefix}${cleanPath}`;
}

