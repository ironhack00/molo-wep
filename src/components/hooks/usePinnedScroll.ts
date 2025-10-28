"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hook: usePinnedScroll
 * Crea efecto donde la sección se queda fija mientras cambias contenido al hacer scroll
 * (desactivado en mobile) - Con lazy loading de GSAP
 * 
 * @param itemsCount - Número de items que cambiarán
 * @returns { containerRef, currentIndex, gsapLoaded } - Ref del contenedor, índice actual y estado de carga
 */
export function usePinnedScroll(itemsCount: number) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [gsapLoaded, setGsapLoaded] = useState(false);
  const lastUpdateTime = useRef(0);

  useEffect(() => {
    if (!containerRef.current || typeof window === "undefined") return;
    
    // Desactivar en mobile (< 768px)
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const container = containerRef.current;

    // Cargar GSAP de forma lazy para mejorar LCP
    const loadGsap = async () => {
      try {
        // Delay reducido para mejor responsividad
        await new Promise(resolve => setTimeout(resolve, 100));
        
        const { gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        
        gsap.registerPlugin(ScrollTrigger);
        
        const scrollTrigger = ScrollTrigger.create({
          trigger: container,
          pin: true,
          start: "top top",
          end: `+=${window.innerHeight * (itemsCount * 0.6)}`, // Reducido de 0.8 a 0.6 para menos scroll
          scrub: 0.1, // Reducido de 0.5 a 0.1 para mayor velocidad
          anticipatePin: 1,
          snap: {
            snapTo: 1 / (itemsCount - 1),
            duration: 0.15, // Reducido de 0.3 a 0.15
            ease: "power2.out",
            directional: false, // Mejora la responsividad
            onComplete: () => {
              // Callback para feedback inmediato
            }
          },
          onUpdate: (self) => {
            // Throttling para mejor performance
            const now = Date.now();
            if (now - lastUpdateTime.current < 16) return; // ~60fps
            lastUpdateTime.current = now;
            
            const progress = self.progress;
            const exactIndex = progress * (itemsCount - 1);
            const index = Math.round(exactIndex);
            setCurrentIndex(Math.min(index, itemsCount - 1));
          },
        });
        
        setGsapLoaded(true);
        
        return () => {
          scrollTrigger.kill();
        };
      } catch (error) {
        console.warn("Error loading GSAP:", error);
      }
    };

    const cleanupPromise = loadGsap();
    
    return () => {
      cleanupPromise.then(cleanupFn => cleanupFn?.());
    };
  }, [itemsCount]);

  return { containerRef, currentIndex, gsapLoaded };
}

