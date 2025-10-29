"use client";

import { IconMenu2 } from "@tabler/icons-react";

interface MobileNavigationProps {
  onMenuOpen: () => void;
}

/**
 * Organism: MobileNavigation
 * Botón hamburguesa para abrir el menú mobile
 */
export function MobileNavigation({ onMenuOpen }: MobileNavigationProps) {
  return (
    <button 
      onClick={onMenuOpen} 
      className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-all active:scale-95"
      aria-label="Abrir menú"
    >
      <IconMenu2 className="w-7 h-7 text-white" stroke={2} />
    </button>
  );
}

