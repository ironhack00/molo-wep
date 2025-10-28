"use client";

interface TextProps {
  children: React.ReactNode;
  variant?: "brand" | "body" | "small" | "xs";
  className?: string;
}

/**
 * Atom: Text (Global/Compartido)
 * Componente de texto reutilizable
 */
export function Text({ children, variant = "body", className = "" }: TextProps) {
  const variants = {
    brand: "font-bold text-base",
    body: "text-base",
    small: "text-sm",
    xs: "text-xs",
  };

  return <span className={`${variants[variant]} ${className}`}>{children}</span>;
}

