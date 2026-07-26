/** Format a number as a fixed 2-decimal dollar string. */
export const money = (n: number): string => `$${n.toFixed(2)}`;

/** Whole-percent discount from a compare-at price (0 when not on sale). */
export const discountPercent = (price: number, compareAt?: number): number =>
  compareAt && compareAt > price ? Math.round((1 - price / compareAt) * 100) : 0;
