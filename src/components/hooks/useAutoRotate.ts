"use client";

import { useState, useEffect } from "react";

/**
 * Hook: useAutoRotate
 * Cambia automáticamente entre items con intervalo configurable
 * 
 * @param itemsCount - Número total de items
 * @param interval - Tiempo en ms entre cambios (default: 3000)
 * @param isActive - Si el auto-rotate está activo (default: true)
 * @returns { currentIndex, setCurrentIndex } - Índice actual y función para cambiarlo
 */
export function useAutoRotate(
  itemsCount: number, 
  interval: number = 2000,
  isActive: boolean = true
) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!isActive || itemsCount <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % itemsCount);
    }, interval);

    return () => clearInterval(timer);
  }, [itemsCount, interval, isActive]);

  return { currentIndex, setCurrentIndex };
}

