/** Merge class names — lightweight alternative to clsx for this project */
export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ')
}

/** Format a number with comma separators */
export function formatNumber(n: number): string {
  return n.toLocaleString()
}

/** Clamp a value between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}
