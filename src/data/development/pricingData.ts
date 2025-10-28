/**
 * Data: Web Development Pricing Plans
 * Planes de precios para desarrollo web y todos los servicios
 * Los textos se obtienen de messages/[locale].json usando development.pricing.[category].plans.[id]
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

// Planes de Desarrollo Web
export const webDevelopmentPlans: PricingPlan[] = [
  {
    id: "simple-kit",
    price: 659.00,
    currency: "$",
    featured: false,
    stars: 1,
    period: "one-time",
  },
  {
    id: "professional-kit",
    price: 959.00,
    currency: "$",
    featured: true,
    stars: 2,
    period: "one-time",
  },
  {
    id: "ultimate-kit",
    price: 1259.00,
    currency: "$",
    featured: false,
    stars: 3,
    period: "one-time",
  }
];

// Planes de Mantenimiento Web
export const webMaintenancePlans: PricingPlan[] = [
  {
    id: "care-basic",
    price: 299.00,
    currency: "$",
    featured: false,
    stars: 1,
    period: "annual",
  },
  {
    id: "care-plus",
    price: 399.00,
    currency: "$",
    featured: true,
    stars: 2,
    period: "annual",
  },
  {
    id: "care-pro",
    price: 499.00,
    currency: "$",
    featured: false,
    stars: 3,
    period: "annual",
  }
];

// Planes de Ecommerce
export const ecommercePlans: PricingPlan[] = [
  {
    id: "launch-store",
    price: 699.00,
    currency: "$",
    featured: false,
    stars: 1,
    period: "one-time",
  },
  {
    id: "business-store",
    price: 999.00,
    currency: "$",
    featured: true,
    stars: 2,
    period: "one-time",
  },
  {
    id: "full-commerce",
    price: 1299.00,
    currency: "$",
    featured: false,
    stars: 3,
    period: "one-time",
  }
];

// Planes de Mantenimiento Ecommerce
export const ecommerceMaintenancePlans: PricingPlan[] = [
  {
    id: "ecare-basic",
    price: 399.00,
    currency: "$",
    featured: false,
    stars: 1,
    period: "annual",
  },
  {
    id: "ecare-plus",
    price: 499.00,
    currency: "$",
    featured: true,
    stars: 2,
    period: "annual",
  },
  {
    id: "ecare-pro",
    price: 599.00,
    currency: "$",
    featured: false,
    stars: 3,
    period: "annual",
  }
];

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

// Paquetes de Ecosistemas
export const ecosystemPackages: PricingPlan[] = [
  {
    id: "full-digital",
    price: 999.00,
    currency: "$",
    featured: true,
    stars: 2,
    period: "monthly",
    setupFee: 199.00,
  },
  {
    id: "automate-ecommerce",
    price: 1199.00,
    currency: "$",
    featured: false,
    stars: 3,
    period: "monthly",
    setupFee: 299.00,
  }
];

// Array con todas las categorías
export const allPricingCategories: PricingCategory[] = [
  {
    id: "web-development",
    plans: webDevelopmentPlans,
  },
  {
    id: "web-maintenance",
    plans: webMaintenancePlans,
  },
  {
    id: "ecommerce",
    plans: ecommercePlans,
  },
  {
    id: "ecommerce-maintenance",
    plans: ecommerceMaintenancePlans,
  },
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
  },
  {
    id: "ecosystem",
    plans: ecosystemPackages,
  }
];

// Export default para mantener compatibilidad
export const developmentPlans = webDevelopmentPlans;

