/**
 * Data: Marketing Pricing Plans
 * Planes de precios para servicios de marketing
 * Los textos se obtienen de messages/[locale].json usando marketing.pricing.[category].plans.[id]
 */

export interface PricingPlan {
  id: string;
  price: number;
  currency: string;
  featured: boolean;
  stars: number;
  setupFee?: number;
  period?: string;
  idealFor?: string;
}

export interface PricingCategory {
  id: string;
  plans: PricingPlan[];
}

// Planes de Gestión de Redes Sociales
export const socialMediaPlans: PricingPlan[] = [
  {
    id: "social-start",
    price: 499.00,
    currency: "$",
    featured: false,
    stars: 1,
    period: "monthly",
    setupFee: 199.00,
  },
  {
    id: "social-pro",
    price: 699.00,
    currency: "$",
    featured: true,
    stars: 2,
    period: "monthly",
    setupFee: 299.00,
  },
  {
    id: "social-max",
    price: 1199.00,
    currency: "$",
    featured: false,
    stars: 3,
    period: "monthly",
    setupFee: 399.00,
  }
];

// Planes de Publicidad Pagada (Meta Ads)
export const paidAdsPlans: PricingPlan[] = [
  {
    id: "ads-essential",
    price: 599.00,
    currency: "$",
    featured: false,
    stars: 1,
    period: "monthly",
    setupFee: 459.00,
  },
  {
    id: "ads-growth",
    price: 799.00,
    currency: "$",
    featured: true,
    stars: 2,
    period: "monthly",
    setupFee: 659.00,
  },
  {
    id: "ads-premium",
    price: 999.00,
    currency: "$",
    featured: false,
    stars: 3,
    period: "monthly",
    setupFee: 859.00,
  }
];

// Planes de SEO
export const seoPlans: PricingPlan[] = [
  {
    id: "seo-essential",
    price: 859.00,
    currency: "$",
    featured: true,
    stars: 2,
    period: "monthly",
    setupFee: 629.00,
  },
  {
    id: "seo-advanced",
    price: 1359.00,
    currency: "$",
    featured: false,
    stars: 3,
    period: "monthly",
    setupFee: 529.00,
  }
];

// Array con todas las categorías de Marketing
export const allMarketingCategories: PricingCategory[] = [
  {
    id: "social-media",
    plans: socialMediaPlans,
  },
  {
    id: "paid-ads",
    plans: paidAdsPlans,
  },
  {
    id: "seo",
    plans: seoPlans,
  }
];

