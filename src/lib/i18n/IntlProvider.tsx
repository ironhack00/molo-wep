'use client';

import { createContext, useContext, ReactNode } from 'react';

interface IntlContextType {
  locale: string;
  messages: Record<string, unknown>;
}

const IntlContext = createContext<IntlContextType | null>(null);

export function IntlProvider({ 
  locale, 
  messages, 
  children 
}: { 
  locale: string; 
  messages: Record<string, unknown>; 
  children: ReactNode;
}) {
  return (
    <IntlContext.Provider value={{ locale, messages }}>
      {children}
    </IntlContext.Provider>
  );
}

export function useTranslations(namespace?: string) {
  const context = useContext(IntlContext);
  if (!context) {
    throw new Error('useTranslations must be used within IntlProvider');
  }

  const { messages } = context;

  return (key: string) => {
    const fullKey = namespace ? `${namespace}.${key}` : key;
    const keys = fullKey.split('.');
    let result: unknown = messages;

    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = (result as Record<string, unknown>)[k];
      } else {
        return fullKey;
      }
    }

    // Retornar el resultado tal cual (string, array, object)
    return result !== undefined ? result : fullKey;
  };
}

export function useLocale() {
  const context = useContext(IntlContext);
  if (!context) {
    throw new Error('useLocale must be used within IntlProvider');
  }
  return context.locale;
}

