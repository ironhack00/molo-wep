"use client";

import { ReactNode, useEffect } from "react";

/**
 * Atom: SmoothScrollProvider
 * Opcional: Mejora la fluidez del scroll para efectos de apilamiento
 * Solo aplica en desktop para mejor rendimiento
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Solo en desktop
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    
    if (mediaQuery.matches) {
      document.documentElement.style.scrollBehavior = "smooth";
    }

    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  return <>{children}</>;
}

