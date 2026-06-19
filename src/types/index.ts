export interface WeddingConfig {
  slug?: string;
  bride: string;
  groom: string;
  eventDate: string; 
  akadDate?: string;
  resepsiDate?: string;
  location: string;
  address: string;
  mapsUrl: string;
  mapsEmbedUrl?: string;
  bridePhoto?: string;
  groomPhoto?: string;
  brideParents?: string;
  groomParents?: string;
  openingQuote?: string;
  music?: string;
  gallery?: string[];
  loveStory?: LoveStoryItem[];
  dressCode?: DressCode;
  googleScriptUrl?: string;
  checkinScriptUrl?: string;
  weddingGift?: WeddingGiftItem[];
  theme?: ThemeType;
}

export interface LoveStoryItem {
  date: string;
  title: string;
  description: string;
}

export interface DressCode {
  color: string;
  description: string;
}

export interface WeddingGiftItem {
  type: string;
  bank?: string;
  number: string;
  name?: string;
  icon?: string;
  logo?: string;
}

export interface RSVPData {
  guest: string;
  attending: string;
  pax: number | string;
  message: string;
  slug?: string;
}

export type ThemeType =
  | 'romantic'
  | 'elegant'
  | 'islami'
  | 'pastel'
  | 'rustic'
  | 'glamour'
  | 'minimalis'
  | 'tropical';

// Utility type untuk props komponen
export type WithChildren<T = Record<string, never>> = T & {
  children?: React.ReactNode;
};

// Untuk konfigurasi landing
export interface LandingConfig {
  brandName: string;
  tagline: string;
  description: string;
  heroImage?: string;
  features: Feature[];
  howToOrder: HowToStep[];
  pricing: PricingPlan[];
  testimonials: Testimonial[];
  contact: ContactInfo;
}

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface HowToStep {
  step: number;
  title: string;
  description: string;
}

interface PricingPlan {
  name: string;
  price: string;
  color: string;
  features: string[];
  popular?: boolean;
}

interface Testimonial {
  name: string;
  message: string;
  rating: number;
  role: string;
}

interface ContactInfo {
  whatsapp: string;
  instagram: string;
  email: string;
}