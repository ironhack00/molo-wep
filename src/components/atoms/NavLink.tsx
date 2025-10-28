"use client";

import { LocalizedLink } from "./LocalizedLink";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

/**
 * Atom: NavLink (Global/Compartido)
 * Link de navegación base con soporte de i18n
 */
export function NavLink({ href, children, className = "", onClick }: NavLinkProps) {
  return (
    <LocalizedLink href={href} className={className} onClick={onClick}>
      {children}
    </LocalizedLink>
  );
}

