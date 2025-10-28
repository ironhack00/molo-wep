"use client";

import { useLocale } from '@/lib/i18n/IntlProvider';

/**
 * Componente simple para mostrar el idioma actual
 * En desarrollo, ayuda a verificar qué idioma está activo
 */
export function LanguageSwitcher() {
  const locale = useLocale();
  
  return (
    <div className="fixed bottom-4 right-4 z-[9999] bg-black/80 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white text-sm font-medium">
      <span className="opacity-60">Idioma:</span> {locale === 'es' ? '🇪🇸 Español' : '🇺🇸 English'}
    </div>
  );
}

