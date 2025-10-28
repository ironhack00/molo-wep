"use client";

import { NavbarTemplate } from "@/components/templates/NavbarTemplate";
import { useNavbarState } from "@/components/hooks/useNavbarState";

/**
 * Navbar Component
 * Componente que envuelve NavbarTemplate con estado y lógica
 */
export default function Navbar() {
  const {
    scrolled,
    openMenu,
    selectLink,
    viewServicesPhone,
    toggleMenu,
    closeMenu,
    toggleServices,
  } = useNavbarState();

  return (
    <NavbarTemplate
      scrolled={scrolled}
      openMenu={openMenu}
      selectLink={selectLink}
      viewServicesPhone={viewServicesPhone}
      onMenuToggle={toggleMenu}
      onMenuClose={closeMenu}
      onServicesToggle={toggleServices}
    />
  );
}

