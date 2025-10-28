"use client";

import { useState, useEffect } from "react";

interface BreakpointValue {
  mobile: string;
  tablet: string;
  desktop: string;
}

/**
 * Hook: useResponsiveValue
 * Retorna diferentes valores según el tamaño de pantalla
 * 
 * @param values - Objeto con valores para cada breakpoint
 * @returns valor actual según el viewport
 */
export function useResponsiveValue(values: BreakpointValue) {
  const [value, setValue] = useState(values.mobile);

  useEffect(() => {
    const updateValue = () => {
      if (typeof window !== "undefined") {
        if (window.innerWidth >= 768) {
          setValue(values.desktop);
        } else if (window.innerWidth >= 640) {
          setValue(values.tablet);
        } else {
          setValue(values.mobile);
        }
      }
    };

    updateValue();
    window.addEventListener("resize", updateValue);

    return () => window.removeEventListener("resize", updateValue);
  }, [values]);

  return value;
}

