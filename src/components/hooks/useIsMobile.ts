"use client";

import { useState, useEffect } from 'react';

/**
 * Hook para detectar si el dispositivo es mobile
 * @returns true si es mobile (< 768px)
 */
export function useIsMobile(breakpoint: number = 768): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Función para verificar el tamaño de pantalla
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Verificar al montar
    checkIsMobile();

    // Escuchar cambios de tamaño
    window.addEventListener('resize', checkIsMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkIsMobile);
  }, [breakpoint]);

  return isMobile;
}

