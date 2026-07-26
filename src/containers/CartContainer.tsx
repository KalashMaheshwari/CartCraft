import { useEffect, useMemo } from "react";
import type { FC } from "react";
import type { CartLine } from "../types";
import { computeTotals } from "../utils/totals";
import PickTicketBody from "../components/PickTicketBody";

interface Props {
  open: boolean;
  onClose: () => void;
  items: CartLine[];
  orderNo: string;
  flashId: string | null;
  flashTick: number;
  promoCode?: string | null;
  onInc: (id: string) => void;
  onDec: (id: string) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
  onCheckout: () => void;
  onApplyPromo?: (code: string) => boolean;
  onRemovePromo?: () => void;
}

/**
 * CartContainer — renders the cart as a slide-over drawer (works on every
 * breakpoint). Computes order totals and reuses the shared PickTicketBody.
 */
const CartContainer: FC<Props> = (props) => {
  const count = useMemo(() => props.items.reduce((n, i) => n + i.quantity, 0), [props.items]);
  const totals = useMemo(() => computeTotals(props.items, props.promoCode), [props.items, props.promoCode]);

  useEffect(() => {
    if (!props.open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") props.onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [props.open, props.onClose]);

  return (
    <>
      {/* Desktop Persistent Ledger Panel */}
      <aside className="cc-desktop-ledger" aria-label="Warehouse Cart Ledger">
        <div className="cc-ticket">
          <div className="cc-ticket__head">
            <div>
              <span className="cc-ticket__title">Warehouse Cart Ledger</span>
              <span className="cc-ticket__order">{count} {count === 1 ? "item" : "items"} · {props.orderNo}</span>
            </div>
          </div>
          <div className="cc-ticket__body">
            <PickTicketBody
              items={props.items}
              flashId={props.flashId}
              flashTick={props.flashTick}
              totals={totals}
              count={count}
              onInc={props.onInc}
              onDec={props.onDec}
              onRemove={props.onRemove}
              onCheckout={props.onCheckout}
              onClear={props.onClear}
              onApplyPromo={props.onApplyPromo}
              onRemovePromo={props.onRemovePromo}
            />
          </div>
        </div>
      </aside>

      {/* Mobile Collapsible Sheet */}
      <div className={"cc-drawer" + (props.open ? " is-open" : "")} aria-hidden={!props.open}>
        <div className="cc-drawer__backdrop" onClick={props.onClose} />
        <aside className="cc-drawer__panel" role="dialog" aria-modal="true" aria-label="Your cart">
          <div className="cc-drawer__head">
            <div>
              <span className="cc-drawer__title">Warehouse Cart Ledger</span>
              <span className="cc-drawer__sub">{count} {count === 1 ? "item" : "items"} · {props.orderNo}</span>
            </div>
            <button className="cc-drawer__close" onClick={props.onClose} aria-label="Close cart">✕</button>
          </div>
          <div className="cc-drawer__body">
            <PickTicketBody
              items={props.items}
              flashId={props.flashId}
              flashTick={props.flashTick}
              totals={totals}
              count={count}
              onInc={props.onInc}
              onDec={props.onDec}
              onRemove={props.onRemove}
              onCheckout={props.onCheckout}
              onClear={props.onClear}
              onApplyPromo={props.onApplyPromo}
              onRemovePromo={props.onRemovePromo}
            />
          </div>
        </aside>
      </div>
    </>
  );
};

export default CartContainer;

