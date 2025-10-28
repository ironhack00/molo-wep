"use client";

import { useEffect, useState } from "react";

/**
 * Hook: useScroll (Global/Compartido)
 * Detecta el scroll de la página
 * Reutilizable en todo el proyecto
 */
export function useScroll(threshold = 0): boolean {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return isScrolled;
}

