import type { FC } from "react";

const PromoBar: FC = () => (
  <div className="cc-promo" role="note">
    <span className="cc-promo__item">Free shipping over $50</span>
    <span className="cc-promo__sep" aria-hidden="true">·</span>
    <span className="cc-promo__item">30-day returns</span>
    <span className="cc-promo__sep" aria-hidden="true">·</span>
    <span className="cc-promo__item">Same-day dispatch before 2pm</span>
  </div>
);

export default PromoBar;
