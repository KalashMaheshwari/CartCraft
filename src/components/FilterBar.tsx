import type { FC } from "react";
import PriceRangeSlider from "./PriceRangeSlider";

interface Props {
  categories: string[];
  active: string;
  onCategory: (c: string) => void;
  sort: string;
  onSort: (s: string) => void;
  price: [number, number];
  onPrice: (p: [number, number]) => void;
  min: number;
  max: number;
  count: number;
  search: string;
  onSearch: (s: string) => void;
  inStockOnly: boolean;
  onToggleStock: () => void;
  favOnly: boolean;
  onToggleFav: () => void;
  favCount: number;
}

const SORTS = [
  { v: "featured", l: "Featured" },
  { v: "rating", l: "Top rated" },
  { v: "price-asc", l: "Price: Low to High" },
  { v: "price-desc", l: "Price: High to Low" },
  { v: "name", l: "Name: A–Z" },
];

const FilterBar: FC<Props> = (p) => (
  <div className="cc-filter">
    <div className="cc-filter__row">
      <div className="cc-search">
        <svg className="cc-search__icon" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          className="cc-search__input"
          type="search"
          value={p.search}
          onChange={(e) => p.onSearch(e.target.value)}
          placeholder="Search components, SKU, brand…"
          aria-label="Search products"
        />
      </div>
      <div className="cc-filter__sort">
        <select value={p.sort} onChange={(e) => p.onSort(e.target.value)} aria-label="Sort products">
          {SORTS.map((s) => (
            <option key={s.v} value={s.v}>
              {s.l}
            </option>
          ))}
        </select>
      </div>
    </div>

    <div className="cc-filter__row cc-filter__row--chips">
      <div className="cc-filter__chips">
        <button
          className={"cc-chip" + (p.active === "ALL" ? " cc-chip--active" : "")}
          onClick={() => p.onCategory("ALL")}
        >
          All
        </button>
        {p.categories.map((c) => (
          <button
            key={c}
            className={"cc-chip" + (p.active === c ? " cc-chip--active" : "")}
            onClick={() => p.onCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="cc-filter__toggles">
        <button
          className={"cc-toggle" + (p.inStockOnly ? " is-active" : "")}
          onClick={p.onToggleStock}
          aria-pressed={p.inStockOnly}
        >
          In stock
        </button>
        <button
          className={"cc-toggle" + (p.favOnly ? " is-active" : "")}
          onClick={p.onToggleFav}
          aria-pressed={p.favOnly}
        >
          ♥ Wishlist{p.favCount > 0 ? ` (${p.favCount})` : ""}
        </button>
        <span className="cc-filter__count">{p.count} results</span>
      </div>
    </div>

    <div className="cc-filter__row cc-filter__row--price">
      <div className="cc-filter__price">
        <div className="cc-filter__price-head">
          <span className="u-label">Price range</span>
          <span className="cc-filter__price-values">${p.price[0]} – ${p.price[1]}</span>
        </div>
        <PriceRangeSlider min={p.min} max={p.max} onChange={p.onPrice} />
      </div>
    </div>
  </div>
);

export default FilterBar;
