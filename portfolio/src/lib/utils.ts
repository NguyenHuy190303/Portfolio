import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://nguyenhuy190303.vercel.app";
export const OG_IMAGE = "/images/avatar.jpg";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
