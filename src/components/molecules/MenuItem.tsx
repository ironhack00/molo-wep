"use client";

import { Icon } from "../atoms/Icon";
import { NavLink } from "../atoms/NavLink";

interface MenuItemProps {
  href: string;
  label: string;
  icon?: "home" | "services" | "about" | "faq" | "contact" | "blog";
  isActive?: boolean;
  onClick?: () => void;
}

/**
 * Molecule: MenuItem
 * Item de menú con icono y texto
 */
export function MenuItem({ href, label, icon, isActive, onClick }: MenuItemProps) {
  return (
    <NavLink
      href={href}
      onClick={onClick}
      className={`flex items-center justify-start border-l-3 gap-2 py-2 px-2 w-full active:scale-95 transition-all ${
        isActive ? "border-primary" : "bg-transparent border-transparent text-white/60"
      }`}
    >
      {icon && <Icon name={icon} stroke={2} />}
      {label}
    </NavLink>
  );
}

