import type { FC } from "react";

interface Props {
  rating: number;
  reviews?: number;
  size?: "sm" | "md";
  showCount?: boolean;
}

/** Fractional star rating — gold fill clipped over a gray track. */
const RatingStars: FC<Props> = ({ rating, reviews, size = "sm", showCount = true }) => {
  const pct = Math.max(0, Math.min(100, (rating / 5) * 100));
  return (
    <span
      className={"cc-stars cc-stars--" + size}
      role="img"
      aria-label={`Rated ${rating.toFixed(1)} out of 5${reviews != null ? `, ${reviews} reviews` : ""}`}
    >
      <span className="cc-stars__stars" aria-hidden="true">
        <span className="cc-stars__track">★★★★★</span>
        <span className="cc-stars__fill" style={{ width: pct + "%" }}>★★★★★</span>
      </span>
      {showCount && (
        <span className="cc-stars__meta">
          <span className="cc-stars__rating">{rating.toFixed(1)}</span>
          {reviews != null && <span className="cc-stars__count">({reviews.toLocaleString()})</span>}
        </span>
      )}
    </span>
  );
};

export default RatingStars;
