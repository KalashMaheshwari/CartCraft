import type { CartLine, Product } from "../types";

/**
 * Type declaration for the framework-agnostic OOJS Cart (see Cart.js).
 * Keeps the implementation in plain JavaScript while giving consumers types.
 */
declare class Cart {
  constructor();
  addItem(product: Product, quantity?: number): this;
  removeItem(productId: string): this;
  updateQuantity(productId: string, quantity: number): this;
  getItems(): CartLine[];
  getItem(productId: string): CartLine | null;
  getItemCount(): number;
  getSubtotal(): number;
  has(productId: string): boolean;
  clear(): this;
  serialize(): { id: string; quantity: number }[];
}

export default Cart;
