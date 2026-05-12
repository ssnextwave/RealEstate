import type { Localized, Locale } from "@/types";

export const DEFAULT_LOCALE: Locale = "en";

/** Pick a localized value with safe fallback to English. */
export function t<T>(value: Localized<T>, locale: Locale = DEFAULT_LOCALE): T {
  return value[locale] ?? value.en;
}

export function formatPrice(value: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatArea(sqft: number) {
  return `${new Intl.NumberFormat("en-US").format(sqft)} sq ft`;
}
