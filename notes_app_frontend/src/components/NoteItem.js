import React from "react";

/**
 * PUBLIC_INTERFACE
 * NoteItem component: Represents a single note preview for list.
 */
function NoteItem({ note, selected, onClick }) {
  return (
    <li
      className={`note-item${selected ? " selected" : ""}`}
      tabIndex={0}
      role="button"
      aria-pressed={selected}
      aria-label={`Note ${note.title}`}
      onClick={onClick}
      onKeyDown={e => (e.key === "Enter" || e.key === " ") && onClick()}
    >
      <div className="note-title">{note.title || "Untitled"}</div>
      <div className="note-preview">{note.body?.slice(0, 40) || ""}{(note.body && note.body.length > 40) ? "…" : ""}</div>
      <div className="note-updated">{new Date(note.updated).toLocaleString()}</div>
    </li>
  );
}

export default NoteItem;
