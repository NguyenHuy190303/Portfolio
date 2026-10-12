import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://nguyenhuy190303.vercel.app";
export const OG_IMAGE = "/images/avatar.jpg";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const categoryId = (category: string) => category.toLowerCase().replace(/[^a-z0-9]+/g, "-");

// Alternate colour bands by a category's position among the categories in use.
export const toneFor = (category: string, categories: string[]) =>
  categories.indexOf(category) % 2 ? "tone-band2" : "tone-band1";
