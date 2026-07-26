import type { CartLine } from "../types";

export const FREE_SHIP_THRESHOLD = 50;
export const SHIP_COST = 6.95;
export const TAX_RATE = 0.08;

export interface Totals {
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  remaining: number;
  freeShipping: boolean;
  promoCode?: string | null;
}

/** Order math — subtotal, promo discounts, shipping, estimated tax, total, and free-shipping progress. */
export function computeTotals(items: CartLine[], promoCode?: string | null): Totals {
  const subtotal = items.reduce((n, i) => n + i.product.price * i.quantity, 0);

  let discount = 0;
  const normalizedPromo = promoCode ? promoCode.trim().toUpperCase() : null;

  if (normalizedPromo === "DEMO10") {
    discount = Math.round(subtotal * 0.10 * 100) / 100;
  } else if (normalizedPromo === "SAVE5") {
    discount = Math.min(subtotal, 5);
  }

  const discountedSubtotal = Math.max(0, subtotal - discount);
  const freeShipping = discountedSubtotal >= FREE_SHIP_THRESHOLD || normalizedPromo === "FREESHIP";
  const shipping = subtotal === 0 || freeShipping ? 0 : SHIP_COST;
  const tax = discountedSubtotal * TAX_RATE;
  const total = discountedSubtotal + shipping + tax;
  const remaining = Math.max(0, FREE_SHIP_THRESHOLD - discountedSubtotal);

  return {
    subtotal,
    discount,
    shipping,
    tax,
    total,
    remaining,
    freeShipping,
    promoCode: normalizedPromo,
  };
}

