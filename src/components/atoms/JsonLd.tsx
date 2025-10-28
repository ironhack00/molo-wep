"use client";

interface JsonLdProps {
  data: Record<string, unknown>;
  /**
   * ID opcional para el script (útil para múltiples JSON-LD en la misma página)
   */
  id?: string;
}

/**
 * Atom: JsonLd
 * Componente para inyectar datos estructurados Schema.org en el HTML
 * 
 * Mejora el SEO y la comprensión de:
 * - Motores de búsqueda (Google, Bing)
 * - IAs (ChatGPT, Claude, Gemini)
 * - Rich snippets en resultados de búsqueda
 * 
 * @example
 * <JsonLd 
 *   id="organization-schema"
 *   data={{
 *     "@context": "https://schema.org",
 *     "@type": "Organization",
 *     "name": "Molokaih"
 *   }} 
 * />
 */
export function JsonLd({ data, id }: JsonLdProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      suppressHydrationWarning
    />
  );
}

