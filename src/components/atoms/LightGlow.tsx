/**
 * Atom: LightGlow
 * Componente reutilizable para crear efectos de luz/glow
 * 
 * @example
 * ```tsx
 * <LightGlow
 *   position={{ top: '-20%', right: '-15%' }}
 *   size={{ width: '80%', height: '80%' }}
 *   opacity={0.5}
 *   blur={100}
 *   color="var(--primary)"
 * />
 * ```
 */

interface LightGlowProps {
  /** Posición del glow (top, right, bottom, left) */
  position: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
  /** Tamaño del glow */
  size: {
    width: string;
    height: string;
  };
  /** Opacidad (0-1) */
  opacity: number;
  /** Intensidad del blur en px */
  blur: number;
  /** Color base (usar variables CSS como 'var(--primary)') */
  color?: string;
  /** Gradiente personalizado (opcional, sobrescribe color) */
  gradient?: string;
  /** className adicional (opcional) */
  className?: string;
}

export function LightGlow({
  position,
  size,
  opacity,
  blur,
  color = 'var(--primary)',
  gradient,
  className = '',
}: LightGlowProps) {
  // Convertir color CSS variable a RGB para usar en gradiente
  const getGradient = () => {
    if (gradient) return gradient;
    
    // Si el color es una variable CSS, usamos el color primario por defecto
    // En el navegador, las variables CSS se resolverán automáticamente
    return `radial-gradient(ellipse at center, 
      color-mix(in srgb, ${color} 70%, transparent) 0%, 
      color-mix(in srgb, ${color} 50%, transparent) 20%, 
      color-mix(in srgb, ${color} 30%, transparent) 40%, 
      transparent 70%)`;
  };

  return (
    <div
      className={`absolute pointer-events-none ${className}`}
      style={{
        ...position,
        width: size.width,
        height: size.height,
        opacity,
        background: getGradient(),
        filter: `blur(${blur}px)`,
      }}
      aria-hidden="true"
    />
  );
}

