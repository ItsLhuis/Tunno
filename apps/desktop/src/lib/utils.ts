import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Conditionally joins CSS class names together and merges Tailwind CSS classes.
 *
 * This utility function combines the functionality of `clsx` (for conditional class joining)
 * and `tailwind-merge` (for resolving conflicting Tailwind classes, e.g., `p-4` and `p-8` becomes `p-8`).
 * It's commonly used to build dynamic `className` strings in React components.
 *
 * @param inputs - A variadic array of class values, which can be strings, objects, or arrays.
 * @returns A single string containing the merged and resolved CSS class names.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <div className={cn("text-red-500", "font-bold")} /> // => "text-red-500 font-bold"
 *
 * // Conditional classes
 * <div className={cn("p-4", isActive && "bg-blue-500")} />
 *
 * // Merging conflicting Tailwind classes
 * <div className={cn("p-4", "px-6", "py-2")} /> // => "px-6 py-2"
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
