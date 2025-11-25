# Ocean Professional Notes App (React)

This project provides a modern notes app UI using the Ocean Professional theme, React, and localStorage for persistence.

## Features

- **Split-pane layout:** Left notes list with search/filter, right detail/editor pane, top navigation bar.
- **CRUD:** Create, view, edit, and delete notes entirely client-side.
- **LocalStorage Persistence:** All notes saved on the device; no backend required.
- **Routing:** Direct links via `/notes/:id` for shareable URLs.
- **Keyboard Shortcuts:** 
  - <kbd>Ctrl/Cmd+N</kbd>: New note
  - <kbd>Ctrl/Cmd+S</kbd>: Save note
- **Responsive & accessible:** Mobile-friendly, proper labels, focus rings, aria support.
- **Ocean Professional Theme:** Blue primary (#2563EB), amber secondary (#F59E0B), error (#EF4444), shaded gradient backgrounds, rounded corners, subtle shadows, and clean modern design.
- **Components:** Organized as React components (`NavBar`, `NotesList`, `NoteItem`, `NoteEditor`, `SearchBar`, `ConfirmDialog`, `Toasts`).
- **Hooks:** Business logic through hooks (`useNotes`, `useLocalStorage`). Context for extensibility.
- **Empty States & Error Boundaries:** Friendly messages for no notes, errors, and 404 pages.
- **Demo/Seed Notes:** Initial sample notes shown on first load.

## Getting Started

In the project directory, you can run:

### `npm start`

Runs the app in development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.  
It correctly bundles React in production mode and optimizes the build for the best performance.

## Customization

### Colors

The Ocean Professional theme is defined as CSS variables in `src/App.css`:

```css
:root {
  --ocean-primary: #2563EB;
  --ocean-secondary: #F59E0B;
  --ocean-success: #F59E0B;
  --ocean-error: #EF4444;
  --ocean-gradient-from: #2563eb1a;
  --ocean-gradient-to: #f9fafb;
  --ocean-background: #f9fafb;
  --ocean-surface: #ffffff;
  --ocean-text: #111827;
}
```

### Extending to a Backend

All note logic is client-side with localStorage.  
To connect to a backend in the future:

1. Replace the logic in `src/hooks/useNotes.js` with API calls to your backend (RESTful or GraphQL). 
2. Use environment variables if helpful (`REACT_APP_API_BASE`, etc.).
3. The hooks/context structure is ready for swapping out data sources—the interface (return values and actions) can stay the same.

### Components

Components live in `src/components/`. Common components:

- `NavBar` (header/navigation bar)
- `NotesList`, `NoteItem`
- `NoteEditor`
- `SearchBar`
- `ConfirmDialog`
- `Toasts`

### Learn More

To learn React, check out the [React documentation](https://reactjs.org/).

## LICENSE

MIT or as specified.

