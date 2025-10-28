"use client";

import {
  IconDevicesCode,
  IconInfoCircle,
  IconHome,
  IconMenu2,
  IconMessage,
  IconQuestionMark,
  IconNews,
} from "@tabler/icons-react";

interface IconProps {
  name: "home" | "services" | "about" | "faq" | "contact" | "menu" | "blog";
  className?: string;
  stroke?: number;
}

/**
 * Atom: Icon (Global/Compartido)
 * Iconos reutilizables en todo el proyecto
 */
export function Icon({ name, className = "w-6 h-6", stroke = 2 }: IconProps) {
  const icons = {
    home: IconHome,
    services: IconDevicesCode,
    about: IconInfoCircle,
    faq: IconQuestionMark,
    contact: IconMessage,
    menu: IconMenu2,
    blog: IconNews,
  };

  const IconComponent = icons[name];

  return <IconComponent className={className} stroke={stroke} />;
}

