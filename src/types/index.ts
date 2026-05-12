// Centralized types — multilingual-friendly via Localized<T>
export type Locale = "en";
export type Localized<T> = Partial<Record<Locale, T>> & { en: T };

export type PropertyType = "villa" | "apartment" | "house" | "penthouse" | "townhouse" | "chalet";
export type ListingStatus = "for-sale" | "for-rent" | "sold";

export interface Property {
  id: string;
  slug: string;
  title: Localized<string>;
  description: Localized<string>;
  price: number;
  currency: "USD";
  status: ListingStatus;
  type: PropertyType;
  bedrooms: number;
  bathrooms: number;
  area: number; // sqft
  yearBuilt: number;
  location: {
    city: string;
    region: string;
    country: string;
    address: string;
    lat: number;
    lng: number;
  };
  images: string[];
  amenities: string[];
  featured?: boolean;
  agentId: string;
  createdAt: string;
}

export interface Agent {
  id: string;
  name: string;
  title: Localized<string>;
  email: string;
  phone: string;
  avatar: string;
  bio: Localized<string>;
}

export interface Testimonial {
  id: string;
  name: string;
  role: Localized<string>;
  quote: Localized<string>;
  rating: number;
  avatar: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: Localized<string>;
  excerpt: Localized<string>;
  content: Localized<string>;
  cover: string;
  category: string;
  author: string;
  date: string;
  readMinutes: number;
}

export interface Faq {
  id: string;
  q: Localized<string>;
  a: Localized<string>;
}
