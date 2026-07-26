import type { FC } from "react";

export interface ToastMessage {
  id: number;
  message: string;
}

interface Props {
  toast: ToastMessage | null;
}

const Toast: FC<Props> = ({ toast }) => (
  <div className="cc-toast" aria-live="polite">
    {toast && (
      <div key={toast.id} className="cc-toast__item" role="status">
        <svg className="cc-toast__icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20 6 9 17l-5-5" />
        </svg>
        {toast.message}
      </div>
    )}
  </div>
);

export default Toast;
