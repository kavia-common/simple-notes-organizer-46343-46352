import React from "react";
import "./NavBar.css";

/**
 * PUBLIC_INTERFACE
 * NavBar component: Application header/nav bar stylized with Ocean Professional theme.
 */
function NavBar() {
  return (
    <nav className="nav-bar ocean-theme" role="navigation" aria-label="Main navigation">
      <span className="nav-title" tabIndex={0}>📝 Notes App</span>
      <span className="nav-brand">Ocean Professional</span>
      <span className="nav-shortcuts" aria-label="Keyboard shortcuts help">
        <abbr title="Ctrl/Cmd+N">+ Note</abbr> &nbsp;
        <abbr title="Ctrl/Cmd+S">💾 Save</abbr>
      </span>
    </nav>
  );
}

export default NavBar;
