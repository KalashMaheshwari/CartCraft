// Lightweight localStorage persistence for cart + favorites.
// Kept framework-agnostic and defensive (SSR / disabled storage never throws).

const CART_KEY = "cartcraft:cart:v1";
const FAV_KEY = "cartcraft:favs:v1";

export interface CartEntry {
  id: string;
  quantity: number;
}

export function loadCart(): CartEntry[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((x): x is CartEntry => x && typeof x.id === "string" && typeof x.quantity === "number")
      .map((x) => ({ id: x.id, quantity: Math.max(1, Math.trunc(x.quantity)) }));
  } catch {
    return [];
  }
}

export function saveCart(entries: CartEntry[]): void {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(entries));
  } catch {
    /* ignore */
  }
}

export function loadFavs(): string[] {
  try {
    const raw = localStorage.getItem(FAV_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

export function saveFavs(ids: string[]): void {
  try {
    localStorage.setItem(FAV_KEY, JSON.stringify(ids));
  } catch {
    /* ignore */
  }
}
