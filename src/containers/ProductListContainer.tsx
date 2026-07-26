import { useEffect, useMemo, useRef, useState } from "react";
import type { FC } from "react";
import {
  PRODUCTS,
  CATEGORIES,
  BRANDS,
  PRICE_MIN,
  PRICE_MAX,
  LOW_STOCK,
  PAGE_SIZE,
  categoryCounts,
} from "../data/products";
import type { Product } from "../types";
import FilterSidebar from "../components/FilterSidebar";
import ProductGrid from "../components/ProductGrid";
import Modal from "../components/Modal";
import { money, discountPercent } from "../utils/format";

interface Props {
  search: string;
  onClearSearch?: () => void;
  favorites: Set<string>;
  favOnly?: boolean;
  onToggleFavOnly?: () => void;
  onToggleFav: (id: string) => void;
  cartMap?: Record<string, number>;
  onInc?: (id: string) => void;
  onDec?: (id: string) => void;
  onQuickView: (p: Product) => void;
  onAdd: (p: Product, qty: number) => void;
}

const SORTS = [
  { v: "featured", l: "Featured" },
  { v: "rating", l: "Avg. customer review" },
  { v: "price-asc", l: "Price: Low to High" },
  { v: "price-desc", l: "Price: High to Low" },
  { v: "name-asc", l: "Name: A to Z" },
  { v: "name-desc", l: "Name: Z to A" },
  { v: "sale", l: "Highest Discount" },
];

/**
 * STATEFUL container — owns catalog display dimensions and delegates to the
 * presentational FilterSidebar + ProductGrid.
 */
const ProductListContainer: FC<Props> = ({
  search,
  onClearSearch,
  favorites,
  favOnly: externalFavOnly,
  onToggleFavOnly,
  onToggleFav,
  cartMap,
  onInc,
  onDec,
  onQuickView,
  onAdd,
}) => {
  const [category, setCategory] = useState("ALL");
  const [selectedBrands, setSelectedBrands] = useState<Set<string>>(new Set());
  const [minRating, setMinRating] = useState(0);
  const [price, setPrice] = useState<[number, number]>([PRICE_MIN, PRICE_MAX]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [internalFavOnly, setInternalFavOnly] = useState(false);
  const [fastShipOnly, setFastShipOnly] = useState(false);
  const [sort, setSort] = useState("featured");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [mobileFilters, setMobileFilters] = useState(false);

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const favOnly = externalFavOnly !== undefined ? externalFavOnly : internalFavOnly;
  const handleFavOnlyToggle = () => {
    if (onToggleFavOnly) {
      onToggleFavOnly();
    } else {
      setInternalFavOnly((v) => !v);
    }
  };

  const catsWithCounts = useMemo(
    () => {
      const counts = categoryCounts();
      return CATEGORIES.map((c) => ({ name: c, count: counts[c] ?? 0 }));
    },
    []
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = PRODUCTS.filter((p) => {
      if (favOnly) {
        if (!favorites.has(p.id)) return false;
        if (q && !`${p.name} ${p.sku} ${p.brand} ${p.spec} ${p.category}`.toLowerCase().includes(q)) return false;
        return true;
      }
      if (category !== "ALL" && p.category !== category) return false;
      if (p.price < price[0] || p.price > price[1]) return false;
      if (minRating && p.rating < minRating) return false;
      if (selectedBrands.size && !selectedBrands.has(p.brand)) return false;
      if (inStockOnly && p.stock <= LOW_STOCK) return false;
      if (fastShipOnly && !p.fastShip) return false;
      if (q && !`${p.name} ${p.sku} ${p.brand} ${p.spec} ${p.category}`.toLowerCase().includes(q)) return false;
      return true;
    });

    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    else if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    else if (sort === "name-asc") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === "name-desc") list = [...list].sort((a, b) => b.name.localeCompare(a.name));
    else if (sort === "sale")
      list = [...list].sort(
        (a, b) => discountPercent(b.price, b.compareAt) - discountPercent(a.price, a.compareAt)
      );

    return list;
  }, [search, category, price, minRating, selectedBrands, inStockOnly, fastShipOnly, favOnly, favorites, sort]);

  // Reset pagination whenever the filter set changes.
  const filterKey = `${search}|${category}|${price[0]}-${price[1]}|${minRating}|${[...selectedBrands].join(",")}|${inStockOnly}|${fastShipOnly}|${favOnly}|${sort}`;
  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [filterKey]);

  const shown = filtered.slice(0, visible);
  const remaining = filtered.length - shown.length;

  // IntersectionObserver for lightweight automatic infinite scroll at bottom
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || remaining <= 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible((v) => v + PAGE_SIZE);
        }
      },
      { rootMargin: "800px 0px 800px 0px" } // Pre-fetch items 800px ahead for zero perceived latency
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [remaining]);

  const toggleBrand = (b: string) =>
    setSelectedBrands((prev) => {
      const next = new Set(prev);
      if (next.has(b)) next.delete(b);
      else next.add(b);
      return next;
    });

  const clearAll = () => {
    setCategory("ALL");
    setSelectedBrands(new Set());
    setMinRating(0);
    setPrice([PRICE_MIN, PRICE_MAX]);
    setInStockOnly(false);
    if (externalFavOnly && onToggleFavOnly) onToggleFavOnly();
    else setInternalFavOnly(false);
    setFastShipOnly(false);
    if (onClearSearch) onClearSearch();
  };

  const hasActiveFilters =
    category !== "ALL" ||
    selectedBrands.size > 0 ||
    minRating > 0 ||
    price[0] > PRICE_MIN ||
    price[1] < PRICE_MAX ||
    inStockOnly ||
    fastShipOnly ||
    favOnly ||
    !!search;

  const sidebarProps = {
    categories: catsWithCounts,
    activeCategory: category,
    onCategory: setCategory,
    brands: BRANDS,
    selectedBrands,
    onToggleBrand: toggleBrand,
    minRating,
    onMinRating: setMinRating,
    price,
    onPrice: setPrice,
    priceMin: PRICE_MIN,
    priceMax: PRICE_MAX,
    inStockOnly,
    onToggleStock: () => setInStockOnly((v) => !v),
    favOnly,
    onToggleFav: handleFavOnlyToggle,
    fastShipOnly,
    onToggleFastShip: () => setFastShipOnly((v) => !v),
    favCount: favorites.size,
    onClearAll: clearAll,
  };

  return (
    <section className="cc-catalog">
      <div className="row cc-catalog__row">
        <aside className="col-lg-3 cc-sidebar-col">
          <FilterSidebar {...sidebarProps} />
        </aside>

        <div className="col-lg-9 cc-results-col">
          <div className="cc-results__bar">
            <nav className="cc-breadcrumb" aria-label="Breadcrumb">
              <span>Home</span>
              <span className="cc-breadcrumb__sep" aria-hidden="true">/</span>
              <span className="cc-breadcrumb__current">
                {favOnly ? "Wishlist" : category === "ALL" ? "All products" : category}
              </span>
            </nav>
            <div className="cc-results__sort">
              <span className="u-label">Sort by</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort products">
                {SORTS.map((s) => (
                  <option key={s.v} value={s.v}>{s.l}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="cc-results__meta">
            <span>
              {favOnly ? (
                <>Wishlist · <strong>{filtered.length}</strong> {filtered.length === 1 ? "saved item" : "saved items"}</>
              ) : search ? (
                <>Results for <strong>“{search}”</strong> · <strong>{filtered.length}</strong> {filtered.length === 1 ? "result" : "results"}</>
              ) : (
                <>{category === "ALL" ? "All products" : category} · <strong>{filtered.length}</strong> {filtered.length === 1 ? "result" : "results"}</>
              )}
            </span>
            <button className="cc-filters-toggle" onClick={() => setMobileFilters(true)}>
              ⚙ Filters
            </button>
          </div>

          {hasActiveFilters && (
            <div className="cc-active-chips">
              <span className="cc-active-chips__label">Active filters:</span>
              {search && (
                <button className="cc-chip" onClick={onClearSearch}>
                  Search: "{search}" <span className="cc-chip__close">✕</span>
                </button>
              )}
              {category !== "ALL" && !favOnly && (
                <button className="cc-chip" onClick={() => setCategory("ALL")}>
                  Dept: {category} <span className="cc-chip__close">✕</span>
                </button>
              )}
              {Array.from(selectedBrands).map((b) => (
                <button key={b} className="cc-chip" onClick={() => toggleBrand(b)}>
                  Brand: {b} <span className="cc-chip__close">✕</span>
                </button>
              ))}
              {minRating > 0 && !favOnly && (
                <button className="cc-chip" onClick={() => setMinRating(0)}>
                  {minRating}★ & up <span className="cc-chip__close">✕</span>
                </button>
              )}
              {(price[0] > PRICE_MIN || price[1] < PRICE_MAX) && !favOnly && (
                <button className="cc-chip" onClick={() => setPrice([PRICE_MIN, PRICE_MAX])}>
                  {money(price[0])} – {money(price[1])} <span className="cc-chip__close">✕</span>
                </button>
              )}
              {inStockOnly && !favOnly && (
                <button className="cc-chip" onClick={() => setInStockOnly(false)}>
                  In stock <span className="cc-chip__close">✕</span>
                </button>
              )}
              {fastShipOnly && !favOnly && (
                <button className="cc-chip" onClick={() => setFastShipOnly(false)}>
                  Fast dispatch <span className="cc-chip__close">✕</span>
                </button>
              )}
              {favOnly && (
                <button className="cc-chip" onClick={handleFavOnlyToggle}>
                  Wishlist only <span className="cc-chip__close">✕</span>
                </button>
              )}
              <button className="cc-chip cc-chip--clear" onClick={clearAll}>
                Clear all
              </button>
            </div>
          )}

          <ProductGrid
            products={shown}
            favorites={favorites}
            favOnly={favOnly}
            cartMap={cartMap}
            onAdd={onAdd}
            onInc={onInc}
            onDec={onDec}
            onQuickView={onQuickView}
            onToggleFav={onToggleFav}
            onClearFilters={clearAll}
          />

          {remaining > 0 ? (
            <div ref={sentinelRef} className="cc-results__sentinel">
              <span className="cc-sentinel__spinner" aria-hidden="true" />
              <span>Loading components… ({remaining} remaining)</span>
            </div>
          ) : (
            filtered.length > 0 && (
              <div className="cc-catalog-end">
                <div className="cc-catalog-end__head">
                  <span className="cc-catalog-end__badge">
                    End of catalog
                  </span>
                  <button
                    type="button"
                    className="cc-catalog-end__topbtn"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  >
                    ⬆ Back to top
                  </button>
                </div>

                <div className="cc-catalog-end__grid">
                  <div className="cc-catalog-end__item">
                    <span className="cc-catalog-end__icon" aria-hidden="true">⚡</span>
                    <div>
                      <strong>Same-Day Dispatch</strong>
                      <p>Orders placed by 4 PM ship same business day from our local fulfillment bins.</p>
                    </div>
                  </div>
                  <div className="cc-catalog-end__item">
                    <span className="cc-catalog-end__icon" aria-hidden="true">🛡️</span>
                    <div>
                      <strong>ISO 9001 Quality Assured</strong>
                      <p>100% batch-tested, dimensionally inspected hardware & components.</p>
                    </div>
                  </div>
                  <div className="cc-catalog-end__item">
                    <span className="cc-catalog-end__icon" aria-hidden="true">🏷️</span>
                    <div>
                      <strong>Bulk & Enterprise Quotes</strong>
                      <p>Need custom specs or volume tiering? Contact our B2B engineering desk.</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      <Modal open={mobileFilters} onClose={() => setMobileFilters(false)} label="Filters" size="md">
        <div className="cc-modal__filters">
          <div className="cc-modal__filters-head">
            <span>Filters</span>
            <button onClick={() => setMobileFilters(false)}>Done</button>
          </div>
          <FilterSidebar {...sidebarProps} />
        </div>
      </Modal>
    </section>
  );
};

export default ProductListContainer;

