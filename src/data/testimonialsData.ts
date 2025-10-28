/**
 * Data: Testimonials
 * Datos de testimonios de clientes
 * Los textos se obtienen de messages/[locale].json usando testimonials.[id]
 */

export interface Testimonial {
  id: string;
  platform: "google" | "facebook" | "instagram";
}

export const testimonialsData: Testimonial[] = [
  { id: "1", platform: "google" },
  { id: "2", platform: "instagram" },
  { id: "3", platform: "facebook" },
  { id: "4", platform: "google" },
  { id: "5", platform: "instagram" },
  { id: "6", platform: "google" },
  { id: "7", platform: "instagram" },
  { id: "8", platform: "instagram" },
  { id: "9", platform: "google" },
  { id: "10", platform: "facebook" },
  { id: "11", platform: "google" },
  { id: "12", platform: "facebook" },
];

