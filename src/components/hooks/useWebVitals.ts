"use client";

import { useEffect } from "react";
import type { Metric } from "web-vitals";

/**
 * Hook: useWebVitals
 * Monitorea las métricas de rendimiento Core Web Vitals
 * 
 * Envía datos a Google Analytics automáticamente
 * Útil para Real User Monitoring (RUM)
 * 
 * Métricas monitoreadas:
 * - LCP (Largest Contentful Paint)
 * - FID (First Input Delay)
 * - CLS (Cumulative Layout Shift)
 * - FCP (First Contentful Paint)
 * - TTFB (Time to First Byte)
 * 
 * @example
 * // En un componente de página
 * useWebVitals();
 */
export function useWebVitals() {
  useEffect(() => {
    // Función para enviar métricas a analytics
    const sendToAnalytics = (metric: Metric) => {
      // Debug en desarrollo
      if (process.env.NODE_ENV === "development") {
        console.log("📊 Web Vitals:", {
          name: metric.name,
          value: metric.value,
          rating: metric.rating,
          delta: metric.delta,
        });
      }

      // Enviar a Google Analytics si está disponible
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", metric.name, {
          value: Math.round(
            metric.name === "CLS" ? metric.value * 1000 : metric.value
          ),
          event_category: "Web Vitals",
          event_label: metric.id,
          non_interaction: true,
        });
      }

      // También puedes enviar a tu propio backend
      // fetch('/api/analytics', {
      //   method: 'POST',
      //   body: JSON.stringify(metric),
      // });
    };

    // Importar y ejecutar web-vitals dinámicamente
    import("web-vitals").then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
      onCLS(sendToAnalytics);
      onINP(sendToAnalytics); // INP reemplaza a FID en web-vitals v3+
      onFCP(sendToAnalytics);
      onLCP(sendToAnalytics);
      onTTFB(sendToAnalytics);
    });
  }, []);
}

/**
 * Tipos para TypeScript
 */
declare global {
  interface Window {
    gtag?: (
      command: string,
      eventName: string,
      params: Record<string, unknown>
    ) => void;
  }
}

