"use client";

import { useState, useEffect } from 'react';

/**
 * Hook para detectar si el dispositivo es mobile
 * @returns true si es mobile (< 768px)
 */
export function useIsMobile(breakpoint: number = 768): boolean {
  const [isMobile, setIsMobile] = useState(() => {
    // SSR-safe initialization
    if (typeof window !== 'undefined') {
      return window.innerWidth < breakpoint;
    }
    return false;
  });

  useEffect(() => {
    // Función para verificar el tamaño de pantalla con debounce
    let timeoutId: NodeJS.Timeout;
    const checkIsMobile = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth < breakpoint);
      }, 100); // Debounce de 100ms
    };

    // Verificar al montar
    setIsMobile(window.innerWidth < breakpoint);

    // Escuchar cambios de tamaño
    window.addEventListener('resize', checkIsMobile);

    // Cleanup
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', checkIsMobile);
    };
  }, [breakpoint]);

  return isMobile;
}

