import React, { createContext, useContext } from "react";

// PUBLIC_INTERFACE
export const NotesContext = createContext();

export function useNotesContext() {
  return useContext(NotesContext);
}

// PUBLIC_INTERFACE
export function NotesProvider({ children, ...props }) {
  // In the actual app, useNotes will come via hooks/useNotes.js. Here just context structure.
  const notesApi = props.notesApi || {};
  return <NotesContext.Provider value={notesApi}>{children}</NotesContext.Provider>;
}
