/**
 * Molecule: BackgroundGlow
 * Composición de múltiples LightGlow para crear efectos de fondo
 * Reutilizable para diferentes temas (amanecer, atardecer, etc.)
 * 
 * @example
 * ```tsx
 * <BackgroundGlow theme="sunrise" />
 * <BackgroundGlow theme="primary" />
 * <BackgroundGlow theme="secondary" />
 * ```
 */

import { LightGlow } from '../atoms/LightGlow';

type GlowTheme = 'sunrise' | 'primary' | 'secondary' | 'sunset' | 'teal' | 'marketing' | 'development' | 'custom';

interface BackgroundGlowProps {
  /** Tema del glow */
  theme?: GlowTheme;
  /** Intensidad general (0-1) - multiplica todas las opacidades */
  intensity?: number;
}

/**
 * Configuraciones predefinidas para diferentes temas
 */
const glowConfigs = {
  primary: {
    color: 'var(--primary)',
    lights: [
      { position: { top: '-20%', right: '-15%' }, size: { width: '80%', height: '80%' }, opacity: 0.6, blur: 100 },
      { position: { top: '0', right: '0' }, size: { width: '65%', height: '85%' }, opacity: 0.45, blur: 120 },
      { position: { top: '35%', right: '2%' }, size: { width: '55%', height: '45%' }, opacity: 0.4, blur: 110 },
      { position: { bottom: '5%', right: '8%' }, size: { width: '50%', height: '40%' }, opacity: 0.35, blur: 100 },
      { position: { top: '50%', right: '15%' }, size: { width: '45%', height: '35%' }, opacity: 0.3, blur: 90 },
      { position: { top: '-10%', right: '10%' }, size: { width: '60%', height: '60%' }, opacity: 0.5, blur: 130 },
      { position: { top: '70%', right: '-10%' }, size: { width: '70%', height: '70%' }, opacity: 0.4, blur: 110 },
      { position: { bottom: '-15%', left: '-10%' }, size: { width: '75%', height: '75%' }, opacity: 0.35, blur: 120 },
      { position: { top: '20%', left: '-20%' }, size: { width: '65%', height: '65%' }, opacity: 0.3, blur: 100 },
    ],
  },
  secondary: {
    color: 'var(--secondary)',
    lights: [
      { position: { top: '-20%', left: '-15%' }, size: { width: '80%', height: '80%' }, opacity: 0.4, blur: 100 },
      { position: { top: '0', left: '0' }, size: { width: '65%', height: '85%' }, opacity: 0.3, blur: 120 },
      { position: { top: '40%', left: '5%' }, size: { width: '55%', height: '45%' }, opacity: 0.25, blur: 110 },
    ],
  },
  sunrise: {
    // Tonos cálidos de amanecer (naranjas/amarillos)
    lights: [
      { 
        position: { top: '-20%', right: '-15%' }, 
        size: { width: '80%', height: '80%' }, 
        opacity: 0.5, 
        blur: 100,
        gradient: 'radial-gradient(ellipse at center, rgba(255, 200, 100, 0.7) 0%, rgba(255, 140, 60, 0.5) 20%, rgba(255, 100, 50, 0.3) 40%, transparent 70%)'
      },
      { 
        position: { top: '0', right: '0' }, 
        size: { width: '65%', height: '85%' }, 
        opacity: 0.35, 
        blur: 120,
        gradient: 'radial-gradient(ellipse at top right, rgba(255, 180, 120, 0.6) 0%, rgba(255, 120, 80, 0.4) 30%, transparent 60%)'
      },
      { 
        position: { top: '35%', right: '2%' }, 
        size: { width: '55%', height: '45%' }, 
        opacity: 0.3, 
        blur: 110,
        gradient: 'radial-gradient(ellipse at center, rgba(255, 160, 90, 0.5) 0%, rgba(255, 110, 70, 0.3) 40%, transparent 70%)'
      },
    ],
  },
  sunset: {
    // Tonos de atardecer (rosas/púrpuras)
    lights: [
      { 
        position: { bottom: '-10%', left: '-10%' }, 
        size: { width: '70%', height: '70%' }, 
        opacity: 0.4, 
        blur: 120,
        gradient: 'radial-gradient(ellipse at center, rgba(255, 100, 150, 0.6) 0%, rgba(200, 80, 200, 0.4) 30%, transparent 60%)'
      },
      { 
        position: { bottom: '0', left: '0' }, 
        size: { width: '60%', height: '80%' }, 
        opacity: 0.3, 
        blur: 100,
        gradient: 'radial-gradient(ellipse at bottom left, rgba(220, 120, 180, 0.5) 0%, rgba(180, 100, 220, 0.3) 40%, transparent 65%)'
      },
    ],
  },
  teal: {
    // Verde agua (#00d4aa) para automation
    lights: [
      { 
        position: { top: '-20%', right: '-15%' }, 
        size: { width: '80%', height: '80%' }, 
        opacity: 0.5, 
        blur: 100,
        gradient: 'radial-gradient(ellipse at center, rgba(0, 212, 170, 0.7) 0%, rgba(0, 212, 170, 0.5) 20%, rgba(0, 212, 170, 0.3) 40%, transparent 70%)'
      },
      { 
        position: { top: '0', right: '0' }, 
        size: { width: '65%', height: '85%' }, 
        opacity: 0.35, 
        blur: 120,
        gradient: 'radial-gradient(ellipse at top right, rgba(0, 212, 170, 0.6) 0%, rgba(0, 212, 170, 0.4) 30%, transparent 60%)'
      },
      { 
        position: { top: '35%', right: '2%' }, 
        size: { width: '55%', height: '45%' }, 
        opacity: 0.3, 
        blur: 110,
        gradient: 'radial-gradient(ellipse at center, rgba(0, 212, 170, 0.5) 0%, rgba(0, 212, 170, 0.3) 40%, transparent 70%)'
      },
      { 
        position: { bottom: '5%', right: '8%' }, 
        size: { width: '50%', height: '40%' }, 
        opacity: 0.25, 
        blur: 100,
        gradient: 'radial-gradient(ellipse at center, rgba(0, 212, 170, 0.4) 0%, rgba(0, 212, 170, 0.2) 50%, transparent 75%)'
      },
    ],
  },
  marketing: {
    // Morado marketing (#6c63ff) para marketing
    lights: [
      { 
        position: { top: '-20%', left: '-15%' }, 
        size: { width: '80%', height: '80%' }, 
        opacity: 0.5, 
        blur: 100,
        gradient: 'radial-gradient(ellipse at center, rgba(108, 99, 255, 0.7) 0%, rgba(108, 99, 255, 0.5) 20%, rgba(108, 99, 255, 0.3) 40%, transparent 70%)'
      },
      { 
        position: { top: '0', left: '0' }, 
        size: { width: '65%', height: '85%' }, 
        opacity: 0.35, 
        blur: 120,
        gradient: 'radial-gradient(ellipse at top left, rgba(108, 99, 255, 0.6) 0%, rgba(108, 99, 255, 0.4) 30%, transparent 60%)'
      },
      { 
        position: { top: '35%', left: '2%' }, 
        size: { width: '55%', height: '45%' }, 
        opacity: 0.3, 
        blur: 110,
        gradient: 'radial-gradient(ellipse at center, rgba(108, 99, 255, 0.5) 0%, rgba(108, 99, 255, 0.3) 40%, transparent 70%)'
      },
      { 
        position: { bottom: '5%', left: '8%' }, 
        size: { width: '50%', height: '40%' }, 
        opacity: 0.25, 
        blur: 100,
        gradient: 'radial-gradient(ellipse at center, rgba(108, 99, 255, 0.4) 0%, rgba(108, 99, 255, 0.2) 50%, transparent 75%)'
      },
    ],
  },
  development: {
    // Azul development (#007bff) para desarrollo web
    lights: [
      { 
        position: { top: '-20%', right: '-15%' }, 
        size: { width: '80%', height: '80%' }, 
        opacity: 0.5, 
        blur: 100,
        gradient: 'radial-gradient(ellipse at center, rgba(0, 123, 255, 0.7) 0%, rgba(0, 123, 255, 0.5) 20%, rgba(0, 123, 255, 0.3) 40%, transparent 70%)'
      },
      { 
        position: { top: '0', right: '0' }, 
        size: { width: '65%', height: '85%' }, 
        opacity: 0.35, 
        blur: 120,
        gradient: 'radial-gradient(ellipse at top right, rgba(0, 123, 255, 0.6) 0%, rgba(0, 123, 255, 0.4) 30%, transparent 60%)'
      },
      { 
        position: { top: '35%', right: '2%' }, 
        size: { width: '55%', height: '45%' }, 
        opacity: 0.3, 
        blur: 110,
        gradient: 'radial-gradient(ellipse at center, rgba(0, 123, 255, 0.5) 0%, rgba(0, 123, 255, 0.3) 40%, transparent 70%)'
      },
      { 
        position: { bottom: '5%', right: '8%' }, 
        size: { width: '50%', height: '40%' }, 
        opacity: 0.25, 
        blur: 100,
        gradient: 'radial-gradient(ellipse at center, rgba(0, 123, 255, 0.4) 0%, rgba(0, 123, 255, 0.2) 50%, transparent 75%)'
      },
    ],
  },
  custom: {
    // Naranja custom (#ff6b00) para página custom
    lights: [
      { 
        position: { top: '-20%', right: '-15%' }, 
        size: { width: '80%', height: '80%' }, 
        opacity: 0.5, 
        blur: 100,
        gradient: 'radial-gradient(ellipse at center, rgba(255, 107, 0, 0.7) 0%, rgba(255, 107, 0, 0.5) 20%, rgba(255, 107, 0, 0.3) 40%, transparent 70%)'
      },
      { 
        position: { top: '0', right: '0' }, 
        size: { width: '65%', height: '85%' }, 
        opacity: 0.35, 
        blur: 120,
        gradient: 'radial-gradient(ellipse at top right, rgba(255, 107, 0, 0.6) 0%, rgba(255, 107, 0, 0.4) 30%, transparent 60%)'
      },
      { 
        position: { top: '35%', right: '2%' }, 
        size: { width: '55%', height: '45%' }, 
        opacity: 0.3, 
        blur: 110,
        gradient: 'radial-gradient(ellipse at center, rgba(255, 107, 0, 0.5) 0%, rgba(255, 107, 0, 0.3) 40%, transparent 70%)'
      },
      { 
        position: { bottom: '5%', right: '8%' }, 
        size: { width: '50%', height: '40%' }, 
        opacity: 0.25, 
        blur: 100,
        gradient: 'radial-gradient(ellipse at center, rgba(255, 107, 0, 0.4) 0%, rgba(255, 107, 0, 0.2) 50%, transparent 75%)'
      },
    ],
  },
};

export function BackgroundGlow({ theme = 'primary', intensity = 1 }: BackgroundGlowProps) {
  const config = glowConfigs[theme];

  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      {config.lights.map((light, index) => (
        <LightGlow
          key={index}
          position={light.position}
          size={light.size}
          opacity={light.opacity * intensity}
          blur={light.blur}
          color={'color' in config ? config.color : undefined}
          gradient={'gradient' in light ? light.gradient : undefined}
        />
      ))}
    </div>
  );
}

