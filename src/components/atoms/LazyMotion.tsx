"use client";

import { useState, useEffect, ReactNode } from "react";
import dynamic from "next/dynamic";

// Componente que carga Framer Motion solo cuando es necesario
const LazyMotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  { 
    ssr: false,
    loading: () => <div className="contents" />
  }
);

interface LazyMotionProps {
  children: ReactNode;
  className?: string;
  initial?: Record<string, unknown>;
  animate?: Record<string, unknown>;
  exit?: Record<string, unknown>;
  transition?: Record<string, unknown>;
  whileInView?: Record<string, unknown>;
  viewport?: Record<string, unknown>;
  onAnimationComplete?: () => void;
  [key: string]: unknown;
}

export function LazyMotion({ 
  children, 
  className = "",
  initial,
  animate,
  exit,
  transition,
  whileInView,
  viewport,
  onAnimationComplete,
  ...props 
}: LazyMotionProps) {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    // Solo activar animaciones después de un delay para mejorar LCP
    const timer = setTimeout(() => {
      setShouldAnimate(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Si no debe animar o no hay props de animación, renderizar div normal
  if (!shouldAnimate || (!initial && !animate && !exit && !whileInView)) {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    );
  }

  return (
    <LazyMotionDiv
      className={className}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      initial={initial as any}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      animate={animate as any}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      exit={exit as any}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transition={transition as any}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      whileInView={whileInView as any}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      viewport={viewport as any}
      onAnimationComplete={onAnimationComplete}
      {...props}
    >
      {children}
    </LazyMotionDiv>
  );
}
