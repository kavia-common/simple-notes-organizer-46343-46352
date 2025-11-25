import React from "react";
import NoteItem from "./NoteItem";

/**
 * PUBLIC_INTERFACE
 * NotesList component: Shows all notes matching filter,
 * highlights selected note, supports loading, error, and create new.
 */
function NotesList({
  notes, loading, error, filter, selectedId,
  onSelect, onNew
}) {
  return (
    <section className="notes-list ocean-theme" aria-label="Notes list">
      <div className="list-header">
        <button className="new-note-btn" type="button" onClick={onNew} aria-label="Add new note">
          ＋
        </button>
      </div>
      {loading ? (
        <div className="loading" role="status">Loading…</div>
      ) : error ? (
        <div className="error" role="alert">{error}</div>
      ) : notes.length ? (
        <ul>
          {notes.map(note => (
            <NoteItem key={note.id}
              note={note}
              selected={note.id === selectedId}
              onClick={() => onSelect(note.id)}
            />
          ))}
        </ul>
      ) : (
        <div className="empty-list">No notes. Add one!</div>
      )}
    </section>
  );
}

export default NotesList;
