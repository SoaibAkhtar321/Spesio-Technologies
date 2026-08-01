export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: 'code' | 'globe' | 'smartphone' | 'brain';
  technologies: string[];
  features: string[];
}

export interface PortfolioItem {
  id: string;
  name: string;
  category: string;
  status: 'Production' | 'In Development';
  description: string;
  stack: string[];
  liveUrl?: string;
}

export interface EstimateOptions {
  serviceType: string;
  platform: string;
  complexity: 'simple' | 'medium' | 'advanced' | 'enterprise';
  aiIntegration: boolean;
  timeline: string;
}

export type PackageTierId = 'bronze' | 'silver' | 'gold' | 'diamond';

export interface PricingPackage {
  id: PackageTierId;
  emoji: string;
  name: string;
  price: number;
  features: string[];
  cta: string;
  highlight?: boolean;
}

export interface BundlePackage {
  id: string;
  name: string;
  websiteTier: PackageTierId;
  androidTier: PackageTierId;
  price: number;
  highlight?: boolean;
}

export interface MaintenancePlan {
  tier: PackageTierId;
  priceLabel: string;
}

export interface ContactFormState {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  budget: string;
}