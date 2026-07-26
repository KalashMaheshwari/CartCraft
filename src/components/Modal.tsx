import { useEffect } from "react";
import type { FC, ReactNode } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  label?: string;
  size?: "md" | "lg";
}

/**
 * Accessible modal shell: backdrop click + ESC to close, body scroll-lock while
 * open. Presentational — content is provided as children.
 */
const Modal: FC<Props> = ({ open, onClose, children, label, size = "md" }) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="cc-modal" role="dialog" aria-modal="true" aria-label={label}>
      <div className="cc-modal__backdrop" onClick={onClose} />
      <div className={"cc-modal__panel cc-modal__panel--" + size}>{children}</div>
    </div>
  );
};

export default Modal;
