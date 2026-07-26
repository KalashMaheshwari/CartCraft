import { useEffect, useState } from "react";
import type { FC } from "react";
import type { Product } from "../types";
import QuickViewModal from "../components/QuickViewModal";

interface Props {
  product: Product | null;
  onClose: () => void;
  onAdd: (p: Product, qty: number) => void;
  onBuyNow: (p: Product, qty: number) => void;
  onQuickView: (p: Product) => void;
  favorite: boolean;
  onToggleFav: (id: string) => void;
}

/**
 * STATEFUL container for the Quick View — owns the ephemeral quantity state and
 * resets it when the displayed product changes. Delegates rendering to the
 * stateless QuickViewModal.
 */
const QuickViewContainer: FC<Props> = ({ product, onClose, onAdd, onBuyNow, onQuickView, favorite, onToggleFav }) => {
  const [qty, setQty] = useState(1);
  useEffect(() => {
    setQty(1);
  }, [product?.id]);

  return (
    <QuickViewModal
      product={product}
      qty={qty}
      onDecQty={() => setQty((q) => Math.max(1, q - 1))}
      onIncQty={() => setQty((q) => q + 1)}
      onClose={onClose}
      onAdd={onAdd}
      onBuyNow={onBuyNow}
      onQuickView={onQuickView}
      favorite={favorite}
      onToggleFav={onToggleFav}
    />
  );
};

export default QuickViewContainer;
