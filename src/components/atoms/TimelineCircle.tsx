/**
 * Atom: TimelineCircle
 * Círculo con número de la línea de tiempo
 * Acepta color personalizado para diferentes páginas
 */

interface TimelineCircleProps {
  number: number;
  isActive?: boolean;
  accentColor?: string; // Color personalizable
}

export function TimelineCircle({ number, isActive = false, accentColor = "#25d9d8" }: TimelineCircleProps) {
  return (
    <div className="relative flex items-center justify-center z-20 w-16 h-16">
      {/* Círculo con color de fondo */}
      <div 
        className="absolute w-16 h-16 rounded-full transition-all duration-500 z-15 flex items-center justify-center"
        style={{
          backgroundColor: accentColor,
          boxShadow: isActive ? `0 0 20px ${accentColor}80, 0 0 40px ${accentColor}40` : `0 0 10px ${accentColor}50`
        }}
      >
        {/* Número en el centro */}
        <span 
          className="text-2xl font-bold transition-all duration-500 relative z-20"
          style={{
            color: '#ffffff',
            textShadow: 'none'
          }}
        >
          {number}
        </span>
      </div>
    </div>
  );
}

