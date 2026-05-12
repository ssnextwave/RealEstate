import hero from "@/assets/hero-villa.jpg";
import p1 from "@/assets/property-1.jpg";
import p2 from "@/assets/property-2.jpg";
import p3 from "@/assets/property-3.jpg";
import p4 from "@/assets/property-4.jpg";
import p5 from "@/assets/property-5.jpg";
import p6 from "@/assets/property-6.jpg";
import i1 from "@/assets/interior-1.jpg";
import i2 from "@/assets/interior-2.jpg";
import i3 from "@/assets/interior-3.jpg";

/** Maps logical image keys (used in JSON) to bundled URLs.
 *  Keeps JSON DB-friendly: when migrating to a CMS/DB, swap to URLs. */
export const imageMap: Record<string, string> = {
  "hero-villa": hero,
  "property-1": p1,
  "property-2": p2,
  "property-3": p3,
  "property-4": p4,
  "property-5": p5,
  "property-6": p6,
  "interior-1": i1,
  "interior-2": i2,
  "interior-3": i3,
};

export const img = (key: string) => imageMap[key] ?? imageMap["property-1"];
