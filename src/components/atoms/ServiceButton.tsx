"use client";

import { IconChevronRight } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "@/lib/i18n/IntlProvider";
import { cn, buttonBase, borderRadius } from "@/utils/classNames";

interface ServiceButtonProps {
  href: string;
  bgColor: string;
  size?: "sm" | "md";
}

export function ServiceButton({
  href,
  bgColor,
  size = "md",
}: ServiceButtonProps) {
  const router = useRouter();
  const t = useTranslations("common");

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("ServiceButton clicked:", href);
    router.push(href);
  };

  const sizeClasses = size === "sm" ? "gap-1 px-3 py-2" : "gap-2 px-4 py-3";

  const iconSize = size === "sm" ? "w-6 h-6" : "w-8 h-8";
  const iconInnerSize = size === "sm" ? "w-4 h-4" : "w-5 h-5";

  return (
    <button
      onClick={handleClick}
      className={cn(
        buttonBase,
        borderRadius.input,
        "bg-white text-gray-800 hover:scale-105 w-fit max-w-fit cursor-pointer select-none",
        // Mantener layout horizontal con texto + icono redondo
        "inline-flex items-center",
        sizeClasses
      )}
      style={{
        border: `2px solid ${bgColor}`,
        boxShadow: `0 0 20px ${bgColor}40`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 0 30px ${bgColor}60`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = `0 0 20px ${bgColor}40`;
      }}
    >
      {String(t("discoverMore"))}
      <div
        className={`${iconSize} rounded-full flex items-center justify-center`}
        style={{ backgroundColor: bgColor }}
      >
        <IconChevronRight className={`${iconInnerSize} text-white`} />
      </div>
    </button>
  );
}
