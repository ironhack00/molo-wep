/**
 * Atom: DiagonalGradient
 * Efecto de gradiente diagonal con SVG para fondos de cards
 */

interface DiagonalGradientProps {
  /** ID único para el gradiente (requerido para múltiples instancias) */
  id: string;
  /** Dirección del gradiente */
  direction?: 'bottom-left-to-top-right' | 'top-left-to-bottom-right' | 'bottom-right-to-top-left' | 'top-right-to-bottom-left';
  /** Color base del gradiente (usa variables CSS) */
  color?: string;
  /** Intensidad (0-1) */
  intensity?: number;
}

const directions = {
  'bottom-left-to-top-right': { x1: '0%', y1: '100%', x2: '100%', y2: '0%' },
  'top-left-to-bottom-right': { x1: '0%', y1: '0%', x2: '100%', y2: '100%' },
  'bottom-right-to-top-left': { x1: '100%', y1: '100%', x2: '0%', y2: '0%' },
  'top-right-to-bottom-left': { x1: '100%', y1: '0%', x2: '0%', y2: '100%' },
};

export function DiagonalGradient({ 
  id, 
  direction = 'bottom-left-to-top-right',
  color = 'rgba(0,0,0,1)',
  intensity = 1,
}: DiagonalGradientProps) {
  const dir = directions[direction];
  
  const layers = [
    { width: 150, opacity: 0.85 * intensity, blur: 20 },
    { width: 220, opacity: 0.7 * intensity, blur: 40 },
    { width: 290, opacity: 0.55 * intensity, blur: 65 },
    { width: 360, opacity: 0.4 * intensity, blur: 90 },
    { width: 430, opacity: 0.28 * intensity, blur: 120 },
    { width: 500, opacity: 0.16 * intensity, blur: 160 },
    { width: 570, opacity: 0.08 * intensity, blur: 200 },
  ];

  return (
    <svg 
      className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={id} x1={dir.x1} y1={dir.y1} x2={dir.x2} y2={dir.y2}>
          <stop offset="0%" stopColor={color} stopOpacity="0.85" />
          <stop offset="15%" stopColor={color} stopOpacity="0.75" />
          <stop offset="30%" stopColor={color} stopOpacity="0.6" />
          <stop offset="45%" stopColor={color} stopOpacity="0.45" />
          <stop offset="60%" stopColor={color} stopOpacity="0.3" />
          <stop offset="75%" stopColor={color} stopOpacity="0.15" />
          <stop offset="90%" stopColor={color} stopOpacity="0.05" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      
      {layers.map((layer, index) => (
        <line 
          key={index}
          x1={dir.x1}
          y1={dir.y1}
          x2={dir.x2}
          y2={dir.y2}
          stroke={`url(#${id})`}
          strokeWidth={layer.width}
          opacity={layer.opacity}
          style={{ filter: `blur(${layer.blur}px)` }}
        />
      ))}
    </svg>
  );
}

