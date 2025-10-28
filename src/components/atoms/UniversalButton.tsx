"use client";

import { memo } from "react";
import { LocalizedLink } from "./LocalizedLink";
import Image from "next/image";
import { cn, buttonBase, buttonSizes, buttonVariants } from "@/utils/classNames";

interface BaseButtonProps {
  children: React.ReactNode;
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  className?: string;
  icon?: string;
  style?: React.CSSProperties;
}

interface ButtonAsButton extends BaseButtonProps {
  href?: never;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

interface ButtonAsLink extends BaseButtonProps {
  href: string;
  onClick?: never;
  type?: never;
  target?: string;
  rel?: string;
}

type UniversalButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * Atom: UniversalButton
 * Componente de botón unificado que puede ser <button> o <Link>
 * Consolida Button y CTAButton en un solo componente reutilizable
 * Optimizado con React.memo para mejor performance
 * 
 * @example
 * // Como botón
 * <UniversalButton onClick={handleClick} variant="primary">Click</UniversalButton>
 * 
 * // Como link
 * <UniversalButton href="/page" variant="glass" icon="/icon.svg">Link</UniversalButton>
 */
export const UniversalButton = memo(function UniversalButton({
  children,
  variant = "primary",
  size = "lg",
  className = "",
  icon,
  ...props
}: UniversalButtonProps) {
  const classes = cn(
    buttonBase,
    buttonSizes[size],
    icon && "gap-3",
    buttonVariants[variant],
    className
  );

  const content = (
    <>
      {icon && (
        <div className="flex-shrink-0 w-5 h-5 relative">
          <Image
            src={icon}
            alt=""
            fill
            className="object-contain brightness-200"
            priority
          />
        </div>
      )}
      {children}
    </>
  );

  // Si tiene href, renderiza como Link localizado
  if ('href' in props && props.href) {
    const { href, target, rel, style } = props as ButtonAsLink;
    return (
      <LocalizedLink href={href} className={classes} style={style} target={target} rel={rel}>
        {content}
      </LocalizedLink>
    );
  }

  // Si no, renderiza como button
  const { onClick, type = "button", disabled, style } = props as ButtonAsButton;
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes} style={style}>
      {content}
    </button>
  );
});

