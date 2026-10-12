import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://portfolio-green-rho-77xo24r41y.vercel.app";
export const OG_IMAGE = "/images/avatar.jpg";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
