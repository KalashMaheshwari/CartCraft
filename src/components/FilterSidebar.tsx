import type { FC } from "react";
import PriceRangeSlider from "./PriceRangeSlider";
import { money } from "../utils/format";

interface Props {
  categories: { name: string; count: number }[];
  activeCategory: string;
  onCategory: (c: string) => void;
  brands: string[];
  selectedBrands: Set<string>;
  onToggleBrand: (b: string) => void;
  minRating: number;
  onMinRating: (r: number) => void;
  price: [number, number];
  onPrice: (p: [number, number]) => void;
  priceMin: number;
  priceMax: number;
  inStockOnly: boolean;
  onToggleStock: () => void;
  favOnly: boolean;
  onToggleFav: () => void;
  fastShipOnly: boolean;
  onToggleFastShip: () => void;
  favCount: number;
  onClearAll: () => void;
}

const RATING_OPTIONS = [
  { v: 4, label: "4★ & up" },
  { v: 3, label: "3★ & up" },
];

/** Presentational left-rail filter panel (also reused inside the mobile modal). */
const FilterSidebar: FC<Props> = (p) => {
  const total = p.categories.reduce((n, c) => n + c.count, 0);
  return (
    <div className="cc-sidebar">
      <div className="cc-sidebar__head">
        <span className="cc-sidebar__title">Filters</span>
        <button className="cc-sidebar__clear" onClick={p.onClearAll}>Clear all</button>
      </div>

      <section className="cc-side">
        <h4 className="cc-side__title">Department</h4>
        <ul className="cc-side__list">
          <li>
            <button className={"cc-side__cat" + (p.activeCategory === "ALL" ? " is-active" : "")} onClick={() => p.onCategory("ALL")}>
              <span>All departments</span><span className="cc-side__count">{total}</span>
            </button>
          </li>
          {p.categories.map((c) => (
            <li key={c.name}>
              <button className={"cc-side__cat" + (p.activeCategory === c.name ? " is-active" : "")} onClick={() => p.onCategory(c.name)}>
                <span>{c.name}</span><span className="cc-side__count">{c.count}</span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="cc-side">
        <h4 className="cc-side__title">Brand</h4>
        <ul className="cc-side__checks">
          {p.brands.map((b) => (
            <li key={b}>
              <label className="cc-check">
                <input type="checkbox" checked={p.selectedBrands.has(b)} onChange={() => p.onToggleBrand(b)} />
                <span className="cc-check__box" aria-hidden="true" />
                <span>{b}</span>
              </label>
            </li>
          ))}
        </ul>
      </section>

      <section className="cc-side">
        <h4 className="cc-side__title">Customer Reviews</h4>
        <ul className="cc-side__checks">
          <li>
            <label className="cc-check">
              <input type="radio" name="rating" checked={p.minRating === 0} onChange={() => p.onMinRating(0)} />
              <span className="cc-check__box cc-check__box--radio" aria-hidden="true" />
              <span>Any rating</span>
            </label>
          </li>
          {RATING_OPTIONS.map((r) => (
            <li key={r.v}>
              <label className="cc-check">
                <input type="radio" name="rating" checked={p.minRating === r.v} onChange={() => p.onMinRating(r.v)} />
                <span className="cc-check__box cc-check__box--radio" aria-hidden="true" />
                <span>{r.label}</span>
              </label>
            </li>
          ))}
        </ul>
      </section>

      <section className="cc-side">
        <div className="cc-side__title-row">
          <h4 className="cc-side__title">Price</h4>
          <span className="cc-side__price">{money(p.price[0])} – {money(p.price[1])}</span>
        </div>
        <PriceRangeSlider min={p.priceMin} max={p.priceMax} onChange={p.onPrice} />
      </section>

      <section className="cc-side">
        <h4 className="cc-side__title">Availability</h4>
        <ul className="cc-side__checks">
          <li>
            <label className="cc-check">
              <input type="checkbox" checked={p.inStockOnly} onChange={p.onToggleStock} />
              <span className="cc-check__box" aria-hidden="true" />
              <span>In stock only</span>
            </label>
          </li>
          <li>
            <label className="cc-check">
              <input type="checkbox" checked={p.fastShipOnly} onChange={p.onToggleFastShip} />
              <span className="cc-check__box" aria-hidden="true" />
              <span>Fast dispatch</span>
            </label>
          </li>
          <li>
            <label className="cc-check">
              <input type="checkbox" checked={p.favOnly} onChange={p.onToggleFav} />
              <span className="cc-check__box" aria-hidden="true" />
              <span>Wishlist ({p.favCount})</span>
            </label>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default FilterSidebar;
