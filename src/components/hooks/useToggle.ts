"use client";

import { useState, useCallback } from "react";

/**
 * Hook: useToggle (Global/Compartido)
 * Hook genérico para manejar estados booleanos
 * Reutilizable en todo el proyecto
 */
export function useToggle(initialState = false): [boolean, () => void, () => void, () => void] {
  const [isOpen, setIsOpen] = useState(initialState);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return [isOpen, open, close, toggle];
}

