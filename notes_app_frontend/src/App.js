import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useParams, useNavigate } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import NotesList from "./components/NotesList";
import NoteEditor from "./components/NoteEditor";
import SearchBar from "./components/SearchBar";
import ConfirmDialog from "./components/ConfirmDialog";
import Toasts from "./components/Toasts";
import useNotes from "./hooks/useNotes";
import { NotesProvider } from "./context/NotesContext";

/**
 * PUBLIC_INTERFACE
 * App entry point: Handles routing, layout, theme, keyboard shortcuts,
 * and places main Ocean Professional split-pane UI with context.
 */
function AppShell() {
  const { notes, addNote, updateNote, deleteNote, loading, error, selectedId, setSelectedId, filter, setFilter } = useNotes();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();
  const selectedNote = notes.find(n => n.id === selectedId);

  // Keyboard shortcuts (Cmd/Ctrl+N: new, Cmd/Ctrl+S: save)
  useEffect(() => {
    const handleShortcut = e => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "n") {
        e.preventDefault();
        const newId = addNote();
        setSelectedId(newId);
        navigate(`/notes/${newId}`);
        setToast({ type: "success", text: "New note created" });
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        if (selectedNote) {
          updateNote(selectedNote.id, { ...selectedNote }, true);
          setToast({ type: "success", text: "Note saved" });
        }
      }
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, [addNote, updateNote, selectedNote, navigate, setSelectedId]);

  // Confirm delete dialog management
  const handleDelete = () => {
    if (selectedNote) {
      deleteNote(selectedNote.id);
      setConfirmOpen(false);
      setToast({ type: "error", text: "Note deleted" });
      navigate("/notes");
    }
  };

  return (
    <div className="app-container ocean-theme">
      <NavBar />
      <main className="split-pane">
        <aside className="notes-sidebar" aria-label="Notes list">
          <SearchBar value={filter} onChange={setFilter} />
          <NotesList
            notes={notes}
            loading={loading}
            error={error}
            filter={filter}
            selectedId={selectedId}
            onSelect={id => {
              setSelectedId(id);
              navigate(`/notes/${id}`);
            }}
            onNew={() => {
              const newId = addNote();
              setSelectedId(newId);
              navigate(`/notes/${newId}`);
            }}
          />
        </aside>
        <section className="notes-detail" aria-label="Note detail or editor">
          <Routes>
            <Route
              path="/notes/:id"
              element={
                selectedNote ? (
                  <NoteEditor
                    note={selectedNote}
                    onUpdate={(fields, auto) => updateNote(selectedNote.id, fields, auto)}
                    onDelete={() => setConfirmOpen(true)}
                    onSave={() => setToast({ type: "success", text: "Note saved" })}
                  />
                ) : (
                  <div className="empty-state" role="main">
                    Select or create a note.
                  </div>
                )
              }
            />
            <Route path="/notes" element={
              <div className="empty-state" role="main">
                {notes.length ? "Select a note to start editing." : "No notes found. Use the + button or keyboard shortcut to add a new note."}
              </div>
            } />
            <Route path="/" element={<Navigate to="/notes" replace />} />
            <Route path="*" element={
              <div className="error-state">
                <span aria-label="Error" role="alert">404: Page not found</span>
              </div>
            } />
          </Routes>
        </section>
      </main>
      <ConfirmDialog
        open={confirmOpen}
        title="Delete this note?"
        description="This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
      />
      <Toasts toast={toast} onClose={() => setToast(null)} />
      {error &&
        <div className="error-boundary" role="alert">
          Error: {error}
        </div>
      }
      <footer className="help-footer">
        <span>Shortcuts: <kbd>Ctrl/Cmd+N</kbd> New note, <kbd>Ctrl/Cmd+S</kbd> Save note</span>
      </footer>
    </div>
  );
}

// PUBLIC_INTERFACE
function App() {
  /**
   * Top-level App with Router. Wrap in NotesProvider and error boundary.
   */
  return (
    <NotesProvider>
      <Router>
        <AppShell />
      </Router>
    </NotesProvider>
  );
}

export default App;
