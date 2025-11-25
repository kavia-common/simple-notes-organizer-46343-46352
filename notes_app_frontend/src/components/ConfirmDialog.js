import React from "react";

/**
 * PUBLIC_INTERFACE
 * ConfirmDialog: Simple modal confirmation dialog.
 */
function ConfirmDialog({ open, title, description, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div
      className="confirm-dialog-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
    >
      <div className="confirm-dialog ocean-theme">
        <h2 id="confirm-dialog-title">{title}</h2>
        <p>{description}</p>
        <div className="dialog-actions">
          <button className="confirm-btn" onClick={onConfirm} autoFocus>
            Confirm
          </button>
          <button className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
