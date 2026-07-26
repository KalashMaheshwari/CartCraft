import type { FC } from "react";
import type { Product } from "../types";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
  favorites: Set<string>;
  favOnly?: boolean;
  cartMap?: Record<string, number>;
  onAdd: (p: Product, qty: number) => void;
  onInc?: (id: string) => void;
  onDec?: (id: string) => void;
  onQuickView: (p: Product) => void;
  onToggleFav: (id: string) => void;
  onClearFilters?: () => void;
}

const ProductGrid: FC<Props> = ({
  products,
  favorites,
  favOnly,
  cartMap = {},
  onAdd,
  onInc,
  onDec,
  onQuickView,
  onToggleFav,
  onClearFilters,
}) => {
  if (products.length === 0) {
    if (favOnly) {
      return (
        <div className="cc-grid__empty">
          <div className="cc-grid__empty-icon" aria-hidden="true">❤️</div>
          <h3>No wishlist components saved yet</h3>
          <p>Click the ♥ icon on any component card to add it to your wishlist.</p>
        </div>
      );
    }

    return (
      <div className="cc-grid__empty">
        <div className="cc-grid__empty-icon" aria-hidden="true">🔍</div>
        <h3>No matching components found</h3>
        <p>Try adjusting your search query, price sliders, or category filters.</p>
        {onClearFilters && (
          <button className="cc-add" onClick={onClearFilters}>
            Clear all filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="cc-grid">
      <div className="row g-3">
        {products.map((p) => (
          <div key={p.id} className="col-12 col-sm-6 col-xl-4">
            <ProductCard
              product={p}
              favorite={favorites.has(p.id)}
              cartQuantity={cartMap[p.id] ?? 0}
              onAdd={onAdd}
              onInc={onInc}
              onDec={onDec}
              onQuickView={onQuickView}
              onToggleFav={onToggleFav}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;


