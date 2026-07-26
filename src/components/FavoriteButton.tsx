import type { FC } from "react";

interface Props {
  active: boolean;
  onToggle: () => void;
  size?: "sm" | "md";
  label?: string;
}

/** Heart favorite toggle — UI chrome icon (not a product icon). */
const FavoriteButton: FC<Props> = ({ active, onToggle, size = "md", label }) => (
  <button
    type="button"
    className={"cc-fav" + (active ? " is-active" : "") + " cc-fav--" + size}
    onClick={(e) => {
      e.stopPropagation();
      onToggle();
    }}
    aria-pressed={active}
    aria-label={label ?? (active ? "Remove from wishlist" : "Add to wishlist")}

  >
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 20.5 4.6 13C2.4 10.8 2.5 7.2 4.9 5.2c2-1.7 5-1.3 6.6.6l.5.6.5-.6c1.6-1.9 4.6-2.3 6.6-.6 2.4 2 2.5 5.6.3 7.8L12 20.5z" />
    </svg>
  </button>
);

export default FavoriteButton;
