import propertiesData from "@/data/properties/properties.json";
import agentsData from "@/data/agents/agents.json";
import testimonialsData from "@/data/testimonials/testimonials.json";
import blogsData from "@/data/blogs/blogs.json";
import faqsData from "@/data/faqs/faqs.json";
import locationsData from "@/data/locations/locations.json";
import type { Property, Agent, Testimonial, BlogPost, Faq } from "@/types";

/** Service layer — single seam for future DB swap (Supabase/Postgres/Firebase). */
const properties = propertiesData as Property[];
const agents = agentsData as Agent[];
const testimonials = testimonialsData as Testimonial[];
const blogs = blogsData as BlogPost[];
const faqs = faqsData as Faq[];

export const propertyService = {
  list: () => properties,
  featured: () => properties.filter((p) => p.featured),
  bySlug: (slug: string) => properties.find((p) => p.slug === slug),
  similar: (p: Property, take = 3) =>
    properties.filter((x) => x.id !== p.id && x.type === p.type).slice(0, take),
  byAgent: (agentId: string) => properties.filter((p) => p.agentId === agentId),
};

export const agentService = {
  list: () => agents,
  byId: (id: string) => agents.find((a) => a.id === id),
};

export const testimonialService = { list: () => testimonials };
export const faqService = { list: () => faqs };
export const locationService = { list: () => locationsData as Array<{ id: string; city: string; country: string; image: string; count: number }> };

export const blogService = {
  list: () => blogs,
  bySlug: (slug: string) => blogs.find((b) => b.slug === slug),
  related: (b: BlogPost, take = 2) => blogs.filter((x) => x.id !== b.id).slice(0, take),
};
