import type { FC } from "react";

interface Props {
  inventoryCount: number;
}

const StatusFooter: FC<Props> = ({ inventoryCount }) => (
  <footer className="cc-status">
    <div className="cc-status__inner">
      <span className="cc-status__brand">CartCraft</span>
      <span className="cc-status__spacer" />
      <span className="cc-status__item">
        <i className="cc-status__led" aria-hidden="true" /> {inventoryCount} components in catalog
      </span>
    </div>
  </footer>
);

export default StatusFooter;
