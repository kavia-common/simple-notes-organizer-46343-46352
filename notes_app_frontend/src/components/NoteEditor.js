import React, { useState, useEffect, useRef } from "react";

/**
 * PUBLIC_INTERFACE
 * NoteEditor component: Edits note fields, autosaves or saves explicitly.
 */
function NoteEditor({ note, onUpdate, onDelete, onSave }) {
  const [title, setTitle] = useState(note.title);
  const [body, setBody] = useState(note.body);
  const [autosaving, setAutosaving] = useState(false);
  const saveTimeout = useRef();

  // Autosave on change with debounce
  useEffect(() => {
    setTitle(note.title);
    setBody(note.body);
  }, [note.id]);

  useEffect(() => {
    setAutosaving(true);
    clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => {
      onUpdate({ title, body }, true);
      setAutosaving(false);
    }, 600);
    return () => clearTimeout(saveTimeout.current);
    // eslint-disable-next-line
  }, [title, body]);

  return (
    <form
      className="note-editor ocean-theme"
      onSubmit={e => {
        e.preventDefault();
        onUpdate({ title, body }, false);
        onSave && onSave();
      }}
      aria-label={`Editing ${note.title || "Untitled note"}`}
    >
      <label htmlFor="note-title" className="editor-label">
        Title
        <input
          id="note-title"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Enter note title"
          className="editor-title-input"
          autoFocus
        />
      </label>
      <label htmlFor="note-body" className="editor-label">
        Body
        <textarea
          id="note-body"
          value={body}
          onChange={e => setBody(e.target.value)}
          placeholder="Start typing your note…"
          className="editor-body-input"
          rows={8}
        />
      </label>
      <div className="editor-actions">
        <button type="submit" className="save-btn">
          Save
        </button>
        <button type="button" className="delete-btn" onClick={onDelete} aria-label="Delete note">
          Delete
        </button>
        {autosaving && <span className="autosave-indicator">Autosaving…</span>}
      </div>
    </form>
  );
}

export default NoteEditor;
