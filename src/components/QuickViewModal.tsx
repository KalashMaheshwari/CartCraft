import type { FC } from "react";
import type { Product } from "../types";
import { money, discountPercent } from "../utils/format";
import { LOW_STOCK, relatedProducts } from "../data/products";
import Modal from "./Modal";
import RatingStars from "./RatingStars";
import Badge from "./Badge";
import FavoriteButton from "./FavoriteButton";

interface Props {
  product: Product | null;
  qty: number;
  onDecQty: () => void;
  onIncQty: () => void;
  onClose: () => void;
  onAdd: (product: Product, qty: number) => void;
  onBuyNow: (product: Product, qty: number) => void;
  onQuickView: (p: Product) => void;
  favorite: boolean;
  onToggleFav: (id: string) => void;
}

/** Presentational Quick View — pure function of props (no internal state). */
const QuickViewModal: FC<Props> = ({
  product,
  qty,
  onDecQty,
  onIncQty,
  onClose,
  onAdd,
  onBuyNow,
  onQuickView,
  favorite,
  onToggleFav,
}) => {
  const related = product ? relatedProducts(product) : [];

  return (
    <Modal open={!!product} onClose={onClose} label={product ? `Quick view: ${product.name}` : ""} size="lg">
      {product && (
        <div className="cc-qv">
          <button className="cc-modal__close" onClick={onClose} aria-label="Close quick view">✕</button>
          <div className="cc-qv__media">
            <img src={product.image} alt={product.name} />
            <div className="cc-qv__badges">
              {product.badge === "bestseller" && <Badge kind="bestseller" />}
              {product.badge === "new" && <Badge kind="new" />}
              {discountPercent(product.price, product.compareAt) > 0 && (
                <Badge kind="sale" label={`−${discountPercent(product.price, product.compareAt)}%`} />
              )}
            </div>
          </div>
          <div className="cc-qv__body">
            <span className="cc-qv__brand">{product.brand}</span>
            <h2 className="cc-qv__name">{product.name}</h2>
            <div className="cc-qv__rating">
              <RatingStars rating={product.rating} reviews={product.reviews} size="md" />
            </div>
            <div className="cc-qv__price">
              <span className="cc-qv__amount">{money(product.price)}</span>
              {product.compareAt && <span className="cc-qv__compare">{money(product.compareAt)}</span>}
              <span className="cc-qv__unit">/ ea</span>
            </div>
            <p className="cc-qv__desc">{product.description}</p>
            <dl className="cc-qv__specs">
              <div><dt>SKU</dt><dd>{product.sku}</dd></div>
              <div><dt>Bin</dt><dd>{product.bin}</dd></div>
              <div><dt>Specification</dt><dd>{product.spec}</dd></div>
              <div>
                <dt>Availability</dt>
                <dd className={product.stock <= LOW_STOCK ? "is-low" : ""}>
                  {product.stock <= LOW_STOCK ? `Only ${product.stock} left` : `${product.stock} in stock`}
                </dd>
              </div>
            </dl>

            <div className="cc-qv__actions">
              <div className="cc-qv__row">
                <div className="cc-stepper">
                  <button onClick={onDecQty} aria-label="Decrease quantity">–</button>
                  <span className="cc-stepper__qty">{qty}</span>
                  <button onClick={onIncQty} aria-label="Increase quantity">+</button>
                </div>
                <FavoriteButton active={favorite} onToggle={() => onToggleFav(product.id)} />
              </div>
              <button className="cc-add cc-add--block" onClick={() => { onAdd(product, qty); onClose(); }}>
                Add to cart · {money(product.price * qty)}
              </button>
              <button className="cc-qv__buynow" onClick={() => { onBuyNow(product, qty); onClose(); }}>
                Buy now
              </button>
            </div>

            {related.length > 0 && (
              <div className="cc-qv__related">
                <h4 className="cc-qv__related-title">Customers also view</h4>
                <div className="cc-qv__related-row">
                  {related.map((r) => (
                    <button key={r.id} className="cc-qv__rel" onClick={() => onQuickView(r)}>
                      <img src={r.image} alt={r.name} loading="lazy" />
                      <span className="cc-qv__rel-name">{r.name}</span>
                      <span className="cc-qv__rel-price">{money(r.price)}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
};

export default QuickViewModal;
