
export interface Package {
  id: string;
  name: string;
  stepPoles: number;
  waktuPengerjaan: string;
  ketahanan: string;
  proteksi: string;
  garansi: string;
  retakRambut: boolean;
  harga: number;
  isBestSeller: boolean;
  visible: boolean;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Step {
  id: string;
  number: number;
  title: string;
  description: string;
}

export interface AnalyticsData {
  totalVisits: number;
  uniqueVisits: number;
  dailyStats: Record<string, number>;
  lastReset: string;
}

export interface LandingPageContent {
  adminConfig: {
    password: string;
    showAdminButton: boolean;
  };
  branding: {
    logoUrl: string;
    faviconUrl: string;
    brandName: string;
    accentColor: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    ctaText: string;
    imageUrl: string;
    visible: boolean;
    badgeWarranty: string;
    badgeRating: string;
    badgeTestimonial: string;
    badgeTrust: string;
    trustBadges: string[];
  };
  pricing: {
    sectionTitle: string;
    sectionSubtitle: string;
    packages: Package[];
    visible: boolean;
  };
  features: {
    sectionTitle: string;
    items: Feature[];
    visible: boolean;
  };
  process: {
    sectionTitle: string;
    steps: Step[];
    visible: boolean;
  };
  cta: {
    headline: string;
    subheadline: string;
    buttonText: string;
    whatsappNumber: string;
    visible: boolean;
  };
  footer: {
    tagline: string;
    contact: string;
    address: string;
    visible: boolean;
  };
  analytics: AnalyticsData;
}
