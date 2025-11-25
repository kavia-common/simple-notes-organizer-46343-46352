import React, { useEffect } from "react";

/**
 * PUBLIC_INTERFACE
 * Toasts: Notification system with simple fade in/fade out.
 */
function Toasts({ toast, onClose }) {
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(onClose, 1800);
      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);
  if (!toast) return null;
  return (
    <div
      className={`toast-container toast-${toast.type}`}
      role="status"
      aria-live="polite"
    >
      {toast.text}
      <button className="toast-close" onClick={onClose} aria-label="Close notification">
        ×
      </button>
    </div>
  );
}

export default Toasts;
