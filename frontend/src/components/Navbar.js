import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../ThemeContext";
import "./Navbar.css";

const links = [
  { to: "/",            label: "Home",         end: true },
  { to: "/upload",      label: "Upload" },
  { to: "/edit",        label: "Edit Resume" },
  { to: "/build",       label: "Build Resume" },
  { to: "/analysis",    label: "Analysis" },
  { to: "/cover-letter",label: "Cover Letter" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { dark, toggle } = useTheme();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="brand-icon"></span>
        <span className="brand-name">ResumeAI</span>
      </div>

      <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.end}
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            onClick={() => setMenuOpen(false)}
          >
            {l.label}
          </NavLink>
        ))}
      </div>

      <div className="navbar-right">
        <button
          className="theme-toggle"
          onClick={toggle}
          aria-label="Toggle dark mode"
          title={dark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {dark ? "☀️" : "🌙"}
        </button>

        <button
          className="hamburger"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
