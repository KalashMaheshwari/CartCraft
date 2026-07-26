import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Cart from "./models/Cart.js";
import { PRODUCTS, productById } from "./data/products";
import { loadCart, saveCart, loadFavs, saveFavs } from "./utils/storage";
import { computeTotals } from "./utils/totals";
import type { CartLine, Product } from "./types";
import ControlBar from "./components/ControlBar";
import PromoBar from "./components/PromoBar";
import StatusFooter from "./components/StatusFooter";
import Toast, { type ToastMessage } from "./components/Toast";
import RecentlyViewed from "./components/RecentlyViewed";
import QuickViewContainer from "./containers/QuickViewContainer";
import CheckoutContainer from "./containers/CheckoutContainer";
import ProductListContainer from "./containers/ProductListContainer";
import CartContainer from "./containers/CartContainer";

function makeOrderNo(): string {
  return "No." + String(Math.floor(1000 + Math.random() * 8999));
}

export default function App() {
  // OOJS Cart — single source of truth, instantiated once, hydrated from storage.
  // (See README: ownership lives at the root so the catalog's Add and the cart
  // share one instance; CartContainer consumes it via props.)
  const cartRef = useRef<Cart | null>(null);
  if (cartRef.current === null) {
    const cart = new Cart();
    loadCart().forEach(({ id, quantity }) => {
      const p = productById(id);
      if (p) cart.addItem(p, quantity);
    });
    cartRef.current = cart;
  }
  const cart = cartRef.current;

  const [items, setItems] = useState<CartLine[]>(() => cart.getItems());
  const [orderNo] = useState(makeOrderNo);
  const [favorites, setFavorites] = useState<Set<string>>(() => new Set(loadFavs()));
  const [recentIds, setRecentIds] = useState<string[]>([]);

  const [search, setSearch] = useState("");
  const [favOnlyFilter, setFavOnlyFilter] = useState(false);
  const [promoCode, setPromoCode] = useState<string | null>(null);

  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [quickView, setQuickView] = useState<Product | null>(null);

  const [flashId, setFlashId] = useState<string | null>(null);
  const [flashTick, setFlashTick] = useState(0);
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [toast, setToast] = useState<ToastMessage | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const sync = useCallback(() => setItems(cart.getItems()), [cart]);
  const showToast = useCallback((message: string) => {
    setToast({ id: Date.now(), message });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2400);
  }, []);
  const triggerFlash = useCallback((id: string) => {
    setFlashTick((t) => t + 1);
    setFlashId(id);
    if (flashTimer.current) clearTimeout(flashTimer.current);
    flashTimer.current = setTimeout(() => setFlashId(null), 900);
  }, []);

  const handleApplyPromo = useCallback(
    (code: string): boolean => {
      const normalized = code.trim().toUpperCase();
      if (["DEMO10", "FREESHIP", "SAVE5"].includes(normalized)) {
        setPromoCode(normalized);
        showToast(`Promo code ${normalized} applied!`);
        return true;
      }
      return false;
    },
    [showToast]
  );

  const handleRemovePromo = useCallback(() => {
    setPromoCode(null);
    showToast("Promo code removed");
  }, [showToast]);

  const handleAdd = useCallback(
    (p: Product, qty = 1) => {
      cart.addItem(p, qty);
      sync();
      triggerFlash(p.id);
      showToast(`Added ${p.name}`);
    },
    [cart, sync, triggerFlash, showToast]
  );

  const openCheckout = useCallback(() => {
    setCartOpen(false);
    setCheckoutOpen(true);
  }, []);

  const handleBuyNow = useCallback(
    (p: Product, qty: number) => {
      cart.addItem(p, qty);
      sync();
      triggerFlash(p.id);
      showToast("Proceeding to checkout");
      openCheckout();
    },
    [cart, sync, triggerFlash, showToast, openCheckout]
  );

  const handleInc = useCallback(
    (id: string) => {
      const line = cart.getItem(id);
      if (line) {
        cart.updateQuantity(id, line.quantity + 1);
        sync();
      }
    },
    [cart, sync]
  );
  const handleDec = useCallback(
    (id: string) => {
      const line = cart.getItem(id);
      if (line) {
        cart.updateQuantity(id, line.quantity - 1);
        sync();
      }
    },
    [cart, sync]
  );
  const handleRemove = useCallback((id: string) => { cart.removeItem(id); sync(); }, [cart, sync]);
  const handleClear = useCallback(() => { cart.clear(); sync(); }, [cart, sync]);
  const handleCheckout = useCallback(() => {
    cart.clear();
    sync();
    setPromoCode(null);
    showToast("Order placed — thank you!");
  }, [cart, sync, showToast]);

  const handleToggleFav = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleToggleFavFilter = useCallback(() => {
    if (favorites.size === 0) {
      showToast("No items in wishlist yet! Click the ♥ on any component.");
      setFavOnlyFilter(false);
      return;
    }
    setFavOnlyFilter((prev) => {
      const next = !prev;
      if (next) showToast(`Showing ${favorites.size} wishlist ${favorites.size === 1 ? "item" : "items"}`);
      return next;
    });
  }, [favorites.size, showToast]);

  const openQuickView = useCallback((p: Product) => {
    setQuickView(p);
    setRecentIds((prev) => [p.id, ...prev.filter((id) => id !== p.id)].slice(0, 8));
  }, []);

  // Persistence.
  useEffect(() => { saveCart(cart.serialize()); }, [items, cart]);
  useEffect(() => { saveFavs(Array.from(favorites)); }, [favorites]);

  const count = useMemo(() => items.reduce((n, i) => n + i.quantity, 0), [items]);
  const cartMap = useMemo(() => {
    const map: Record<string, number> = {};
    items.forEach((it) => {
      map[it.product.id] = it.quantity;
    });
    return map;
  }, [items]);

  const totals = useMemo(() => computeTotals(items, promoCode), [items, promoCode]);
  const recentProducts = useMemo(
    () => recentIds.map((id) => productById(id)).filter((p): p is Product => !!p),
    [recentIds]
  );

  return (
    <div className="cc-app">
      <PromoBar />
      <ControlBar
        search={search}
        onSearch={setSearch}
        favCount={favorites.size}
        cartCount={count}
        favOnly={favOnlyFilter}
        onToggleFavFilter={handleToggleFavFilter}
        onOpenCart={() => setCartOpen(true)}
        orderNo={orderNo}
      />

      <main className="cc-shell container-fluid">
        <div className="row g-4">
          <div className="col-12 col-lg-8 col-xl-9 cc-main-col">
            <ProductListContainer
              search={search}
              onClearSearch={() => setSearch("")}
              favorites={favorites}
              favOnly={favOnlyFilter}
              onToggleFavOnly={handleToggleFavFilter}
              onToggleFav={handleToggleFav}
              cartMap={cartMap}
              onInc={handleInc}
              onDec={handleDec}
              onQuickView={openQuickView}
              onAdd={handleAdd}
            />
            <RecentlyViewed products={recentProducts} onQuickView={openQuickView} />
          </div>
          <div className="col-12 col-lg-4 col-xl-3 cc-cart-col">
            <CartContainer
              open={cartOpen}
              onClose={() => setCartOpen(false)}
              items={items}
              orderNo={orderNo}
              flashId={flashId}
              flashTick={flashTick}
              promoCode={promoCode}
              onInc={handleInc}
              onDec={handleDec}
              onRemove={handleRemove}
              onClear={handleClear}
              onCheckout={openCheckout}
              onApplyPromo={handleApplyPromo}
              onRemovePromo={handleRemovePromo}
            />
          </div>
        </div>
      </main>

      <QuickViewContainer
        product={quickView}
        onClose={() => setQuickView(null)}
        onAdd={handleAdd}
        onBuyNow={handleBuyNow}
        onQuickView={openQuickView}
        favorite={quickView ? favorites.has(quickView.id) : false}
        onToggleFav={handleToggleFav}
      />

      <CheckoutContainer
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        totals={totals}
        count={count}
        orderNo={orderNo}
        onPlaceOrder={handleCheckout}
      />

      <Toast toast={toast} />
    </div>
  );
}


