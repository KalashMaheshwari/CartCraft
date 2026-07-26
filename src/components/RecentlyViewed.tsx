import type { FC } from "react";
import type { Product } from "../types";
import { money } from "../utils/format";
import RatingStars from "./RatingStars";

interface Props {
  products: Product[];
  onQuickView: (p: Product) => void;
}

const RecentlyViewed: FC<Props> = ({ products, onQuickView }) => {
  if (products.length === 0) return null;
  return (
    <section className="cc-recent">
      <h3 className="cc-recent__title">Recently viewed</h3>
      <div className="cc-recent__row">
        {products.map((p) => (
          <button key={p.id} className="cc-recent__item" onClick={() => onQuickView(p)}>
            <img src={p.image} alt={p.name} loading="lazy" />
            <div className="cc-recent__meta">
              <span className="cc-recent__name">{p.name}</span>
              <RatingStars rating={p.rating} reviews={p.reviews} showCount={false} />
              <span className="cc-recent__price">{money(p.price)}</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default RecentlyViewed;
