"use client";

import { useEffect, useRef, useState } from "react";

interface LazyGsapOptions {
  dependencies?: unknown[];
  delay?: number;
}

export function useLazyGsap(options: LazyGsapOptions = {}) {
  const { dependencies = [], delay = 200 } = options;
  const [gsap, setGsap] = useState<unknown>(null);
  const [ScrollTrigger, setScrollTrigger] = useState<unknown>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;

    const loadGsap = async () => {
      try {
        // Delay para mejorar LCP
        await new Promise(resolve => setTimeout(resolve, delay));
        
        if (!mounted) return;

        // Cargar GSAP dinámicamente
        const gsapModule = await import("gsap");
        const scrollTriggerModule = await import("gsap/ScrollTrigger");
        
        if (!mounted) return;

        const gsapInstance = gsapModule.gsap;
        const scrollTriggerInstance = scrollTriggerModule.ScrollTrigger;
        
        gsapInstance.registerPlugin(scrollTriggerInstance);
        
        setGsap(gsapInstance);
        setScrollTrigger(scrollTriggerInstance);
        setIsLoaded(true);
      } catch (error) {
        console.warn("Error loading GSAP:", error);
      }
    };

    loadGsap();

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, ...dependencies]);

  return {
    gsap,
    ScrollTrigger,
    isLoaded,
    containerRef,
  };
}
