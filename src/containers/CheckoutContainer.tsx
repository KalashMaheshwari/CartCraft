import { useEffect, useState } from "react";
import type { FC, FormEvent } from "react";
import type { Totals } from "../utils/totals";
import CheckoutModal from "../components/CheckoutModal";

interface Props {
  open: boolean;
  onClose: () => void;
  totals: Totals;
  count: number;
  orderNo: string;
  onPlaceOrder: () => void;
}

/**
 * STATEFUL container for checkout — owns the placed/snapshot UI state and
 * delegates rendering to the stateless CheckoutModal.
 */
const CheckoutContainer: FC<Props> = ({ open, onClose, totals, count, orderNo, onPlaceOrder }) => {
  const [placed, setPlaced] = useState(false);
  const [snap, setSnap] = useState<{ count: number; total: number } | null>(null);

  useEffect(() => {
    if (!open) {
      setPlaced(false);
      setSnap(null);
    }
  }, [open]);

  const handlePlace = (e: FormEvent) => {
    e.preventDefault();
    setSnap({ count, total: totals.total });
    setPlaced(true);
    onPlaceOrder();
  };

  return (
    <CheckoutModal
      open={open}
      onClose={onClose}
      totals={totals}
      count={count}
      orderNo={orderNo}
      placed={placed}
      snap={snap}
      onPlaceOrder={handlePlace}
    />
  );
};

export default CheckoutContainer;
