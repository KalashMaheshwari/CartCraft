import type { FC } from "react";
import type { Product } from "../types";
import { money } from "../utils/format";

interface Props {
  product: Product;
  quantity: number;
  onInc: () => void;
  onDec: () => void;
  onRemove: () => void;
  flash: boolean;
  flashTick: number;
}

const PickTicketItem: FC<Props> = ({ product, quantity, onInc, onDec, onRemove, flash, flashTick }) => (
  <li className={"cc-line" + (flash ? " is-flash" : "")}>
    <span key={flashTick} className="cc-line__tick" aria-hidden="true">✓</span>
    <div className="cc-line__top">
      <span className="cc-line__name">{product.name}</span>
      <span className="cc-line__total">{money(product.price * quantity)}</span>
    </div>
    <div className="cc-line__bottom">
      <div className="cc-stepper">
        <button onClick={onDec} aria-label={`Decrease ${product.name}`}>–</button>
        <span className="cc-stepper__qty">{quantity}</span>
        <button onClick={onInc} aria-label={`Increase ${product.name}`}>+</button>
      </div>
      <span className="cc-line__meta">{product.sku} · {money(product.price)} each</span>
      <button className="cc-line__remove" onClick={onRemove}>Remove</button>
    </div>
  </li>
);

export default PickTicketItem;
