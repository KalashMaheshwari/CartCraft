import { useState } from "react";
import type { FC, FormEvent } from "react";
import type { Totals } from "../utils/totals";
import { FREE_SHIP_THRESHOLD } from "../utils/totals";
import { money } from "../utils/format";

interface Props {
  totals: Totals;
  count: number;
  distinct: number;
  onCheckout: () => void;
  onClear: () => void;
  onApplyPromo?: (code: string) => boolean;
  onRemovePromo?: () => void;
}

const PickTicketSummary: FC<Props> = ({
  totals,
  count,
  distinct,
  onCheckout,
  onClear,
  onApplyPromo,
  onRemovePromo,
}) => {
  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState("");

  const pct = Math.max(0, Math.min(100, (totals.subtotal / FREE_SHIP_THRESHOLD) * 100));

  const handlePromoSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim() || !onApplyPromo) return;
    const ok = onApplyPromo(promoInput.trim());
    if (ok) {
      setPromoError("");
      setPromoInput("");
    } else {
      setPromoError("Invalid code. Try DEMO10, FREESHIP, or SAVE5");
    }
  };

  return (
    <div className="cc-ticket__summary">
      <div className="cc-ship">
        <div className="cc-ship__label">
          {totals.freeShipping
            ? "You've unlocked free shipping"
            : `Add ${money(totals.remaining)} for free shipping`}
        </div>
        <div className="cc-ship__bar">
          <span style={{ width: pct + "%" }} />
        </div>
      </div>

      <div className="cc-ticket__sumrow">
        <span>Subtotal · {distinct} {distinct === 1 ? "item" : "items"}</span>
        <span className="cc-ticket__sumval">{money(totals.subtotal)}</span>
      </div>

      {totals.discount > 0 && (
        <div className="cc-ticket__sumrow cc-ticket__sumrow--discount">
          <span>Discount ({totals.promoCode})</span>
          <span className="cc-ticket__sumval">−{money(totals.discount)}</span>
        </div>
      )}

      <div className="cc-ticket__sumrow">
        <span>Shipping</span>
        <span className={"cc-ticket__sumval" + (totals.shipping === 0 ? " is-free" : "")}>
          {totals.shipping === 0 ? "Free" : money(totals.shipping)}
        </span>
      </div>
      <div className="cc-ticket__sumrow">
        <span>Estimated tax</span>
        <span className="cc-ticket__sumval">{money(totals.tax)}</span>
      </div>

      <div className="cc-ticket__grand">
        <span className="cc-ticket__grand-label">Total</span>
        <span className="cc-ticket__grand-total">{money(totals.total)}</span>
      </div>

      <div className="cc-promo-section">
        {totals.promoCode ? (
          <div className="cc-promo-tag">
            <span>Promo <strong>{totals.promoCode}</strong> applied</span>
            <button type="button" onClick={onRemovePromo} aria-label="Remove promo code">✕</button>
          </div>
        ) : (
          <form className="cc-promo-form" onSubmit={handlePromoSubmit}>
            <input
              type="text"
              placeholder="Promo code (e.g. DEMO10)"
              value={promoInput}
              onChange={(e) => {
                setPromoInput(e.target.value);
                setPromoError("");
              }}
            />
            <button type="submit" disabled={!promoInput.trim()}>Apply</button>
          </form>
        )}
        {promoError && <p className="cc-promo-error">{promoError}</p>}
      </div>

      <button className="cc-add cc-add--block" onClick={onCheckout} disabled={count === 0}>
        Checkout
      </button>
      <button className="cc-ticket__clear" onClick={onClear} disabled={count === 0}>
        Clear pick list
      </button>
    </div>
  );
};

export default PickTicketSummary;

