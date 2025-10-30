"use client";

import { buttonSizes } from "@/utils/classNames";
import { UniversalButton } from "../atoms/UniversalButton";

interface WhatsAppButtonProps {
  phoneNumber?: string;
  text?: string;
  size?: keyof typeof buttonSizes;
}

/**
 * Molecule: WhatsAppButton
 * Botón de contacto por WhatsApp con estilos reutilizables
 */
export function WhatsAppButton({ 
  phoneNumber = "1234567890",
  text = "Hablemos por WhatsApp",
  size = "lg"
}: WhatsAppButtonProps) {
  return (
    <UniversalButton
      href={`https://wa.me/${phoneNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      variant="whatsapp"
      size={size}
      className="gap-3 whitespace-nowrap"
      icon="/icons/automation/whatsapp.svg"
    >
      <span className="whitespace-nowrap">{text}</span>
    </UniversalButton>
  );
}

