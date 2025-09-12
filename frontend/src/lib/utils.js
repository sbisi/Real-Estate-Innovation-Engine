import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Alternative simple version without tailwind-merge
export function cnSimple(...inputs) {
  return inputs.filter(Boolean).join(' ')
}

