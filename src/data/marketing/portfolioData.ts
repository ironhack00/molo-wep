/**
 * Data: Marketing Portfolio
 * Datos de portfolio de marketing organizados por categoría
 */

export interface PortfolioItem {
  id: number;
  category: "Redes Sociales" | "Branding" | "Reels";
  imageUrl: string;
  alt: string;
  title?: string;
  isVideo?: boolean;
  link?: string;
}

export const marketingPortfolio: PortfolioItem[] = [
  // Redes Sociales
  { id: 1, category: "Redes Sociales", imageUrl: "/images/marketing/social-1.webp", alt: "Campaña Redes Sociales 1", title: "Instagram - Campaña Orgánica" },
  { id: 2, category: "Redes Sociales", imageUrl: "/images/marketing/social-2.webp", alt: "Campaña Redes Sociales 2", title: "Facebook - Engagement" },
  { id: 3, category: "Redes Sociales", imageUrl: "/images/marketing/social-3.webp", alt: "Campaña Redes Sociales 3", title: "LinkedIn - B2B Marketing" },
  
  // Branding
  { id: 4, category: "Branding", imageUrl: "/images/marketing/brand-1.webp", alt: "Branding 1", title: "Brand Identity Design", link: "/images/marketing/brand-1.webp" },
  { id: 5, category: "Branding", imageUrl: "/images/marketing/brand-2.webp", alt: "Branding 2", title: "Corporate Branding", link: "/images/marketing/brand-2.webp" },
  { id: 13, category: "Branding", imageUrl: "/images/marketing/brand-3.webp", alt: "Branding 3", title: "Brand Guidelines", link: "/images/marketing/brand-3.webp" },
  
  // Reels
  { id: 6, category: "Reels", imageUrl: "https://molokaih.b-cdn.net/m2.mp4", alt: "Reel 1", title: "Reel Marketing 1", isVideo: true },
  { id: 7, category: "Reels", imageUrl: "https://molokaih.b-cdn.net/m1.mp4", alt: "Reel 2", title: "Reel Marketing 2", isVideo: true },
  { id: 8, category: "Reels", imageUrl: "https://molokaih.b-cdn.net/m5.mp4", alt: "Reel 3", title: "Reel Marketing 3", isVideo: true },
  { id: 9, category: "Reels", imageUrl: "https://molokaih.b-cdn.net/m6.mp4", alt: "Reel 4", title: "Reel Marketing 4", isVideo: true },
  { id: 10, category: "Reels", imageUrl: "https://molokaih.b-cdn.net/m3.mp4", alt: "Reel 5", title: "Reel Marketing 5", isVideo: true },
  { id: 11, category: "Reels", imageUrl: "https://molokaih.b-cdn.net/m7.mp4", alt: "Reel 6", title: "Reel Marketing 6", isVideo: true },
  { id: 12, category: "Reels", imageUrl: "https://molokaih.b-cdn.net/m8.mp4", alt: "Reel 7", title: "Reel Marketing 7", isVideo: true },
];

export type FilterCategory = "Redes Sociales" | "Branding" | "Reels";

export const filterCategories: FilterCategory[] = ["Redes Sociales", "Branding", "Reels"];

