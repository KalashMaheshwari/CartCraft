import type { FC } from "react";

interface Props {
  search: string;
  onSearch: (s: string) => void;
  favCount: number;
  cartCount: number;
  favOnly?: boolean;
  onToggleFavFilter?: () => void;
  onOpenCart: () => void;
  orderNo: string;
}

const ControlBar: FC<Props> = ({
  search,
  onSearch,
  favCount,
  cartCount,
  favOnly,
  onToggleFavFilter,
  onOpenCart,
  orderNo,
}) => (
  <header className="cc-control-bar">
    <div className="cc-control-bar__inner">
      <a className="cc-control-bar__brand" href="#" onClick={(e) => e.preventDefault()}>
        <div className="cc-brand__logo">
          <img className="cc-brand__img" src="/logo.png" alt="CartCraft" />
        </div>
        <div className="cc-brand__text">
          <span className="cc-brand__title">CartCraft</span>
          <span className="cc-brand__sub">COMPONENTS</span>
        </div>
      </a>

      <div className="cc-control-bar__search">
        <svg className="cc-search__icon" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          className="cc-search__input"
          type="search"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search components, SKU, brand…"
          aria-label="Search products"
        />
        {search && (
          <button
            className="cc-search__clear"
            type="button"
            onClick={() => onSearch("")}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      <div className="cc-control-bar__meta">
        <button
          className={"cc-control-bar__stat" + (favOnly ? " is-active" : "")}
          onClick={onToggleFavFilter}
          title={favOnly ? "Show all items" : "Filter by wishlist"}
          aria-pressed={favOnly}
        >
          <svg className="cc-control-bar__icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 20.5 4.6 13C2.4 10.8 2.5 7.2 4.9 5.2c2-1.7 5-1.3 6.6.6l.5.6.5-.6c1.6-1.9 4.6-2.3 6.6-.6 2.4 2 2.5 5.6.3 7.8L12 20.5z" />
          </svg>
          <span className="cc-control-bar__statval">{favCount}</span>
        </button>
        <button className="cc-control-bar__stat cc-control-bar__stat--cart" onClick={onOpenCart} title="Cart">
          {cartCount > 0 && <span className="cc-control-bar__cartcount">{cartCount}</span>}
          <svg className="cc-control-bar__icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 8h12l-1 12H7L6 8z" />
            <path d="M9 8V6a3 3 0 0 1 6 0v2" />
          </svg>
          <span className="cc-control-bar__cartlabel">Cart</span>
        </button>
        <div className="cc-control-bar__session">
          <span className="u-label">Order</span>
          <span className="cc-control-bar__order">{orderNo}</span>
        </div>
      </div>
    </div>
  </header>
);

export default ControlBar;

