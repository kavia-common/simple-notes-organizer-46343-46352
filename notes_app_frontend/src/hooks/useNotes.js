import { useEffect, useRef, useState } from "react";

// Seed/demo notes for first load, used in localStorage
const SEED_NOTES = [
  {
    id: "1",
    title: "Welcome to Ocean Notes!",
    body: "This is your first note. You can edit, delete, or create new notes using the buttons or keyboard shortcuts.\n\nTry searching, or click '+' for a new note!",
    updated: Date.now(),
  },
  {
    id: "2",
    title: "Ocean Professional Theme Guide",
    body: "Enjoy clean aesthetics, split-pane layout, keyboard shortcuts (Ctrl/Cmd+N/S), full localStorage persistence, and accessibility features.",
    updated: Date.now(),
  },
];

/**
 * PUBLIC_INTERFACE
 * useNotes: Provides notes list, CRUD, filter, selection, error/loading state API.
 */
export default function useNotes() {
  // notes, selectedId, filter
  const [notes, setNotes] = useState([]);
  const [selectedId, setSelectedId] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("");
  const localKey = "user_notes_v1";
  const loadedRef = useRef(false);

  // Load notes on mount from localStorage (or seed)
  useEffect(() => {
    setLoading(true);
    try {
      const stored = window.localStorage.getItem(localKey);
      if (stored) {
        const loaded = JSON.parse(stored);
        setNotes(Array.isArray(loaded) ? loaded : []);
      } else {
        setNotes(SEED_NOTES);
        window.localStorage.setItem(localKey, JSON.stringify(SEED_NOTES));
      }
      setLoading(false);
      loadedRef.current = true;
    } catch (e) {
      setError("Failed to load notes");
      setNotes([]);
      setLoading(false);
    }
  }, []);

  // SelectedId sync with route
  useEffect(() => {
    if (notes.length && !selectedId) {
      setSelectedId(notes[0].id);
    }
  }, [notes, selectedId]);

  // Save notes to localStorage
  useEffect(() => {
    if (loadedRef.current) {
      try {
        window.localStorage.setItem(localKey, JSON.stringify(notes));
      } catch (e) {
        setError("Failed to save note");
      }
    }
  }, [notes]);

  // CRUD API, all client-side for now
  function addNote() {
    const id = Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 7);
    const newNote = { id, title: "", body: "", updated: Date.now() };
    setNotes(prev => [newNote, ...prev]);
    setSelectedId(id);
    return id;
  }
  function updateNote(id, fields, isAuto) {
    setNotes(prev =>
      prev.map(n =>
        n.id === id ? { ...n, ...fields, updated: Date.now() } : n
      )
    );
  }
  function deleteNote(id) {
    setNotes(prev => prev.filter(n => n.id !== id));
    if (selectedId === id) setSelectedId(undefined);
  }

  // Filter logic
  const filteredNotes = filter
    ? notes.filter(
        n =>
          n.title.toLowerCase().includes(filter.toLowerCase()) ||
          n.body.toLowerCase().includes(filter.toLowerCase())
      )
    : notes;

  return {
    notes: filteredNotes,
    addNote,
    updateNote,
    deleteNote,
    loading,
    error,
    selectedId,
    setSelectedId,
    filter,
    setFilter,
  };
}
