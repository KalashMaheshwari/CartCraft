import type { FC } from "react";
import type { Product } from "../types";
import { money, discountPercent } from "../utils/format";
import { LOW_STOCK } from "../data/products";
import RatingStars from "./RatingStars";
import Badge from "./Badge";
import FavoriteButton from "./FavoriteButton";

interface Props {
  product: Product;
  favorite: boolean;
  cartQuantity?: number;
  onAdd: (p: Product, qty: number) => void;
  onInc?: (id: string) => void;
  onDec?: (id: string) => void;
  onQuickView: (p: Product) => void;
  onToggleFav: (id: string) => void;
}

const ProductCard: FC<Props> = ({
  product,
  favorite,
  cartQuantity = 0,
  onAdd,
  onInc,
  onDec,
  onQuickView,
  onToggleFav,
}) => {
  const low = product.stock <= LOW_STOCK;
  const sale = discountPercent(product.price, product.compareAt);

  return (
    <article className="cc-card">
      <div className="cc-card__media">
        <button className="cc-card__media-btn" onClick={() => onQuickView(product)} aria-label={`Quick view ${product.name}`}>
          <img className="cc-card__img" src={product.image} alt={product.name} loading="lazy" decoding="async" />

          <div className="cc-card__badges">
            {product.badge === "bestseller" && <Badge kind="bestseller" />}
            {product.badge === "new" && <Badge kind="new" />}
            {sale > 0 && <Badge kind="sale" label={`−${sale}%`} />}
          </div>
          <span className="cc-card__qv">Quick view</span>
        </button>
        <FavoriteButton active={favorite} onToggle={() => onToggleFav(product.id)} size="sm" />
      </div>

      <div className="cc-card__body">
        <span className="cc-card__brand">{product.brand}</span>
        <h3 className="cc-card__name">{product.name}</h3>
        <RatingStars rating={product.rating} reviews={product.reviews} />
        <div className="cc-card__pricerow">
          <span className="cc-card__amount">{money(product.price)}</span>
          {product.compareAt && <span className="cc-card__compare">{money(product.compareAt)}</span>}
          {low && <span className="cc-card__low">Only {product.stock} left</span>}
        </div>
      </div>

      <div className="cc-card__foot">
        {cartQuantity > 0 ? (
          <div className="cc-card__stepper">
            <button
              type="button"
              className="cc-card__stepper-btn"
              onClick={(e) => {
                e.stopPropagation();
                onDec?.(product.id);
              }}
              aria-label={`Decrease ${product.name}`}
            >
              −
            </button>
            <span className="cc-card__stepper-count">
              {cartQuantity} in cart
            </span>
            <button
              type="button"
              className="cc-card__stepper-btn"
              onClick={(e) => {
                e.stopPropagation();
                if (onInc) onInc(product.id);
                else onAdd(product, 1);
              }}
              aria-label={`Increase ${product.name}`}
            >
              +
            </button>
          </div>
        ) : (
          <button className="cc-add cc-add--block" onClick={() => onAdd(product, 1)}>
            <span className="cc-add__plus" aria-hidden="true">+</span> Add to cart
          </button>
        )}
      </div>
    </article>
  );
};

export default ProductCard;

