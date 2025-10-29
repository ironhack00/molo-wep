"use client";

import { Footer } from "../organisms";

interface FooterImageSection {
  imageSrc?: string;
  imageAlt?: string;
  title?: string;
  lines: string[];
}

interface FooterTemplateProps {
  services?: string[] | { text: string; href: string }[];
  links?: string[] | { text: string; href: string }[];
  imageSections?: FooterImageSection[];
}

/**
 * Template: FooterTemplate
 * Plantilla del footer que organiza el organismo
 */
export function FooterTemplate({ services, links, imageSections }: FooterTemplateProps) {
  return <Footer services={services} links={links} imageSections={imageSections} />;
}

