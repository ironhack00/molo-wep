"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registrar plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Hook: useGsapStacking
 * Efecto de cards apiladas con GSAP ScrollTrigger (desactivado en mobile)
 * La primera card se vuelve fixed cuando llega a su sección
 * Las demás suben para taparla
 * 
 * @param index - Índice de la card
 * @param total - Total de cards
 */
export function useGsapStacking(_index: number, _total: number) {
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFixed] = useState(false); // Siempre false - sin efecto fixed
  void _total; // evitar warning por variable no usada

  // useEffect comentado - sin efecto fixed
  // useEffect(() => {
  //   if (!cardRef.current || !containerRef.current) return;
    
  //   // Desactivar en mobile (< 768px)
  //   const isMobile = window.innerWidth < 768;
  //   if (isMobile) return;

  //   const card = cardRef.current;
  //   const container = containerRef.current;
  //   const stackingSection = document.getElementById('services-stacking-section');

  //   // TODAS las cards: controlar cuándo se vuelven fixed
  //   const fixedTrigger = ScrollTrigger.create({
  //     trigger: container,
  //     start: "top top", // Cuando la card llega arriba
  //     end: () => {
  //       // Calcular hasta dónde debe estar fixed
  //       // Debe ocultarse antes de que llegue la siguiente sección
  //       if (!stackingSection) return "bottom bottom";
  //       const sectionBottom = stackingSection.offsetTop + stackingSection.offsetHeight;
  //       const containerTop = container.offsetTop;
  //       // Reducir el área para que se oculte antes
  //       const reducedHeight = (sectionBottom - containerTop) * 0.7; // 70% del área original
  //       return `+=${reducedHeight}px`;
  //     },
  //     pin: false,
  //     onToggle: (self) => {
  //       setIsFixed(self.isActive);
  //     },
  //   });

  //   // DESACTIVADO: Sin animaciones GSAP para que los botones funcionen
  //   // Las animaciones estaban interfiriendo con los eventos de click

  //   return () => {
  //     fixedTrigger.kill();
  //   };
  // }, [index, isFirstCard]);

  return { cardRef, containerRef, isFixed };
}

