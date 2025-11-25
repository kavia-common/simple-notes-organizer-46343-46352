import React from "react";

/**
 * PUBLIC_INTERFACE
 * SearchBar component: For filtering notes.
 */
function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar ocean-theme">
      <input
        type="search"
        className="search-input"
        placeholder="Search notes…"
        value={value}
        onChange={e => onChange(e.target.value)}
        aria-label="Search notes"
      />
    </div>
  );
}

export default SearchBar;
