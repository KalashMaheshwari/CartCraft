import { useState } from "react";
import type { FC, FormEvent, ChangeEvent } from "react";
import type { Totals } from "../utils/totals";
import { money } from "../utils/format";
import Modal from "./Modal";

interface Props {
  open: boolean;
  onClose: () => void;
  totals: Totals;
  count: number;
  orderNo: string;
  placed: boolean;
  snap: { count: number; total: number } | null;
  onPlaceOrder: (e: FormEvent) => void;
}

/** Presentational checkout — modal dialog with form & confirmation. */
const CheckoutModal: FC<Props> = ({ open, onClose, totals, count, orderNo, placed, snap, onPlaceOrder }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  const handleCardChange = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 16);
    const formatted = raw.replace(/(.{4})/g, "$1 ").trim();
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (raw.length >= 3) {
      setExpiry(`${raw.slice(0, 2)}/${raw.slice(2)}`);
    } else {
      setExpiry(raw);
    }
  };

  const handleCvcChange = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 4);
    setCvc(raw);
  };

  return (
    <Modal open={open} onClose={onClose} label="Checkout" size="md">
      <button className="cc-modal__close" onClick={onClose} aria-label="Close checkout">✕</button>
      {placed ? (
        <div className="cc-checkout__success">
          <div className="cc-checkout__check" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5" /></svg>
          </div>
          <h2 className="cc-checkout__title">Order confirmed</h2>
          <p className="cc-checkout__sub">
            Thank you. Pick ticket <strong>{orderNo}</strong> for {money(snap?.total ?? 0)} ({snap?.count ?? 0} units) has been received.
          </p>
          <p className="cc-checkout__note">A confirmation has been sent to your email. Fulfillment has been scheduled.</p>
          <div className="cc-checkout__success-btns">
            <button className="cc-add cc-add--block" onClick={onClose}>Continue shopping</button>
            <button className="cc-checkout__print" onClick={() => window.print()}>🖨 Print Pick Ticket</button>
          </div>
        </div>
      ) : (
        <div className="cc-checkout">
          <h2 className="cc-checkout__title">Checkout</h2>
          <p className="cc-checkout__sub">Order {orderNo} · {count} units</p>
          <form className="cc-checkout__form" onSubmit={onPlaceOrder}>
            <label className="cc-field">
              <span>Email</span>
              <input type="email" required placeholder="you@company.com" />
            </label>
            <div className="cc-field__row">
              <label className="cc-field">
                <span>Card number</span>
                <input
                  required
                  inputMode="numeric"
                  placeholder="4242 4242 4242 4242"
                  value={cardNumber}
                  onChange={handleCardChange}
                />
              </label>
              <label className="cc-field cc-field--sm">
                <span>Expiry</span>
                <input
                  required
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={handleExpiryChange}
                />
              </label>
              <label className="cc-field cc-field--sm">
                <span>CVC</span>
                <input
                  required
                  inputMode="numeric"
                  placeholder="123"
                  value={cvc}
                  onChange={handleCvcChange}
                />
              </label>
            </div>
            <label className="cc-field">
              <span>Ship to</span>
              <input required placeholder="123 Workshop Lane, Suite 400" />
            </label>
            <div className="cc-checkout__summary">
              <div className="cc-ticket__sumrow"><span>Subtotal</span><span className="cc-ticket__sumval">{money(totals.subtotal)}</span></div>
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
              <div className="cc-ticket__sumrow"><span>Estimated tax</span><span className="cc-ticket__sumval">{money(totals.tax)}</span></div>
              <div className="cc-ticket__grand">
                <span className="cc-ticket__grand-label">Total</span>
                <span className="cc-ticket__grand-total">{money(totals.total)}</span>
              </div>
            </div>
            <button type="submit" className="cc-add cc-add--block">Pay {money(totals.total)}</button>
            <p className="cc-checkout__secure">Secure demo checkout — no real payment is processed.</p>
          </form>
        </div>
      )}
    </Modal>
  );
};

export default CheckoutModal;

