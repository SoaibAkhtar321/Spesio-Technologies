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
}

export interface EstimateOptions {
  serviceType: string;
  platform: string;
  complexity: 'simple' | 'medium' | 'advanced' | 'enterprise';
  aiIntegration: boolean;
  timeline: string;
}

export interface ContactFormState {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  budget: string;
}