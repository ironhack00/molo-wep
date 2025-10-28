import { cn } from "@/utils/classNames";

interface GradientOverlayProps {
  direction?: "top" | "bottom" | "left" | "right";
  height?: string;
  className?: string;
  /** Color base del gradiente (usa variables CSS) */
  color?: string;
}

/**
 * Atom: GradientOverlay
 * Overlay con gradiente para transiciones suaves
 */
export function GradientOverlay({ 
  direction = "bottom", 
  height = "h-24 sm:h-28 md:h-32 lg:h-36",
  className = "",
  color = "from-black"
}: GradientOverlayProps) {
  const positions = {
    top: "top-0 left-0 right-0",
    bottom: "bottom-0 left-0 right-0",
    left: "top-0 left-0 bottom-0",
    right: "top-0 right-0 bottom-0",
  };

  const gradients = {
    top: `bg-gradient-to-b ${color} to-transparent`,
    bottom: `bg-gradient-to-t ${color} to-transparent`,
    left: `bg-gradient-to-r ${color} to-transparent`,
    right: `bg-gradient-to-l ${color} to-transparent`,
  };

  return (
    <div 
      className={cn(
        "absolute",
        positions[direction],
        height,
        gradients[direction],
        className
      )} 
    />
  );
}

