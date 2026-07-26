/**
 * Cart — a framework-agnostic, Object-Oriented JavaScript model.
 *
 * Deliberately ZERO React / DOM dependencies so it is unit-testable in
 * isolation and could be lifted into any framework. It is the single source
 * of truth for line items; React only reads a snapshot of it.
 *
 * - Adding an existing item increments quantity, never duplicates.
 * - Setting quantity to 0 removes the line.
 * - Negative / NaN quantities are rejected.
 */
class Cart {
  constructor() {
    /** @type {Map<string, {product: object, quantity: number}>} */
    this.items = new Map();
  }

  /** Resolve a stable key for a product. */
  _key(product) {
    if (product == null) return null;
    return product.id != null ? product.id : product.sku;
  }

  /** Coerce a quantity into a safe integer, or null if invalid. */
  _safeQty(quantity) {
    const q = Math.trunc(Number(quantity));
    return Number.isFinite(q) && q > 0 ? q : null;
  }

  /**
   * Add a product (increments quantity if already present).
   * @param {object} product
   * @param {number} [quantity=1]
   * @returns {Cart} this (for chaining)
   */
  addItem(product, quantity = 1) {
    const key = this._key(product);
    if (key == null) return this;
    const qty = this._safeQty(quantity);
    if (qty == null) return this;

    const existing = this.items.get(key);
    if (existing) {
      existing.quantity += qty;
    } else {
      this.items.set(key, { product, quantity: qty });
    }
    return this;
  }

  /** Remove a line entirely by product id. */
  removeItem(productId) {
    this.items.delete(productId);
    return this;
  }

  /**
   * Set an absolute quantity. A value of 0 (or any non-positive) removes the
   * line. Returns this for chaining.
   */
  updateQuantity(productId, quantity) {
    const qty = Math.trunc(Number(quantity));
    if (!Number.isFinite(qty)) return this;
    if (qty <= 0) {
      this.items.delete(productId);
      return this;
    }
    const existing = this.items.get(productId);
    if (existing) existing.quantity = qty;
    return this;
  }

  /** Snapshot of line items as an array (order = insertion order). */
  getItems() {
    return Array.from(this.items.values());
  }

  /** Look up a single line by product id (or null). */
  getItem(productId) {
    return this.items.get(productId) || null;
  }

  /** Total units across every line. */
  getItemCount() {
    let total = 0;
    for (const { quantity } of this.items.values()) total += quantity;
    return total;
  }

  /** Sum of price * quantity across every line. */
  getSubtotal() {
    let subtotal = 0;
    for (const { product, quantity } of this.items.values()) {
      subtotal += (Number(product?.price) || 0) * quantity;
    }
    return subtotal;
  }

  /** Is a product currently in the cart? */
  has(productId) {
    return this.items.has(productId);
  }

  /** Empty the cart. */
  clear() {
    this.items.clear();
    return this;
  }

  /** Plain-data snapshot for persistence ([{ id, quantity }]). Stays framework-agnostic. */
  serialize() {
    const out = [];
    for (const { product, quantity } of this.items.values()) {
      out.push({ id: this._key(product), quantity });
    }
    return out;
  }
}

export default Cart;
