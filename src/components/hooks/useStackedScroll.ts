import { useRef } from "react";
import { useScroll, useTransform, MotionValue } from "framer-motion";

interface UseStackedScrollReturn {
  cardRef: React.RefObject<HTMLDivElement | null>;
  scale: MotionValue<number>;
  opacity: MotionValue<number>;
  y: MotionValue<number>;
  rotateX: MotionValue<number>;
  scrollYProgress: MotionValue<number>;
}

/**
 * Hook: useStackedScroll
 * Calcula transformaciones para efecto de cards apiladas
 * Cada card sube desde una profundidad específica
 * 
 * @param index - Índice de la card (0, 1, 2, 3)
 * @param total - Total de cards
 * @returns Transformaciones para la card
 */
export function useStackedScroll(
  index: number,
  _total: number
): UseStackedScrollReturn {
  const cardRef = useRef<HTMLDivElement>(null);
  void _total; // evitar warning por variable no usada
  const isFirstCard = index === 0;

  // Detecta el progreso del scroll de la card
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"],
  });

  // Transformaciones - SIEMPRE se llaman (cumple reglas de hooks)
  // Usar operadores ternarios en los valores, no en las llamadas
  const y = useTransform(
    scrollYProgress, 
    [0, 1], 
    isFirstCard ? [0, 0] : [300, 0]
  );
  
  const scale = useTransform(
    scrollYProgress, 
    [0, 1], 
    isFirstCard ? [1, 1] : [0.85, 1]
  );
  
  const opacity = useTransform(
    scrollYProgress, 
    [0, 0.5, 1], 
    isFirstCard ? [1, 1, 1] : [0, 0.5, 1]
  );
  
  const rotateX = useTransform(
    scrollYProgress, 
    [0, 1], 
    isFirstCard ? [0, 0] : [15, 0]
  );

  return { cardRef, scale, opacity, y, rotateX, scrollYProgress };
}

