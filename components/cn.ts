import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges class names using clsx and tailwind-merge.
 * @param inputs - Class name inputs to merge.
 * @returns A single merged class name string.
 */
export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}