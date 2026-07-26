import type { FC } from "react";
import type { CartLine } from "../types";
import type { Totals } from "../utils/totals";
import PickTicketItem from "./PickTicketItem";
import PickTicketSummary from "./PickTicketSummary";

interface Props {
  items: CartLine[];
  flashId: string | null;
  flashTick: number;
  totals: Totals;
  count: number;
  onInc: (id: string) => void;
  onDec: (id: string) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
  onClear: () => void;
  onApplyPromo?: (code: string) => boolean;
  onRemovePromo?: () => void;
}

/** Shared ticket body — list (or empty state) plus the order summary. */
const PickTicketBody: FC<Props> = ({
  items,
  flashId,
  flashTick,
  totals,
  count,
  onInc,
  onDec,
  onRemove,
  onCheckout,
  onClear,
  onApplyPromo,
  onRemovePromo,
}) => {
  return (
    <>
      {items.length === 0 ? (
        <div className="cc-ticket__empty">
          <p>Your pick list is empty.</p>
        </div>
      ) : (
        <ul className="cc-ticket__list">
          {items.map((it) => (
            <PickTicketItem
              key={it.product.id}
              product={it.product}
              quantity={it.quantity}
              onInc={() => onInc(it.product.id)}
              onDec={() => onDec(it.product.id)}
              onRemove={() => onRemove(it.product.id)}
              flash={flashId === it.product.id}
              flashTick={flashTick}
            />
          ))}
        </ul>
      )}
      <PickTicketSummary
        totals={totals}
        count={count}
        distinct={items.length}
        onCheckout={onCheckout}
        onClear={onClear}
        onApplyPromo={onApplyPromo}
        onRemovePromo={onRemovePromo}
      />
    </>
  );
};

export default PickTicketBody;

