import type { FC } from "react";

type Kind = "bestseller" | "new" | "sale";

interface Props {
  kind: Kind;
  label?: string;
}

const DEFAULTS: Record<Kind, string> = {
  bestseller: "Best seller",
  new: "New",
  sale: "Sale",
};

const Badge: FC<Props> = ({ kind, label }) => (
  <span className={"cc-badge cc-badge--" + kind}>{label ?? DEFAULTS[kind]}</span>
);

export default Badge;
