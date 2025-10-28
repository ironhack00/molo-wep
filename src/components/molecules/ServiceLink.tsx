"use client";

import { NavLink } from "../atoms/NavLink";

interface ServiceLinkProps {
  name: string;
  slug: string;
  onClick: () => void;
}

/**
 * Molecule: ServiceLink
 * Link de servicio individual
 */
export function ServiceLink({ name, slug, onClick }: ServiceLinkProps) {
  return (
    <NavLink
      href={`/${slug}`}
      onClick={onClick}
      className="hover:bg-black/10 active:scale-95 transition-all p-2 rounded-md text-sm"
    >
      {name}
    </NavLink>
  );
}

