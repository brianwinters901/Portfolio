"use client";

import Link from "next/link";
import { useState } from "react";

interface NavbarProps {
  activePath?: "home" | "resume-analyzer";
}

export default function Navbar({ activePath = "home" }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const homeHref = activePath === "home" ? "#about" : "/#about";
  const sectionHref = (id: string) => (activePath === "home" ? `#${id}` : `/#${id}`);

  return (
    <nav className="navbar">
      <div className="container">
        <Link href="/" className="nav-brand" onClick={() => setMenuOpen(false)}>
          Brian <span>Winters</span>
        </Link>
        <button
          className="nav-toggle"
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          ☰
        </button>
        <ul className={`nav-links${menuOpen ? " open" : ""}`}>
          <li>
            <Link href={homeHref} onClick={() => setMenuOpen(false)}>About</Link>
          </li>
          <li>
            <Link href={sectionHref("skills")} onClick={() => setMenuOpen(false)}>Skills</Link>
          </li>
          <li>
            <Link href={sectionHref("experience")} onClick={() => setMenuOpen(false)}>Experience</Link>
          </li>
          <li>
            <Link href={sectionHref("projects")} onClick={() => setMenuOpen(false)}>Projects</Link>
          </li>
          <li>
            <Link href={sectionHref("contact")} onClick={() => setMenuOpen(false)}>Contact</Link>
          </li>
          <li>
            <Link
              href="/resume-analyzer"
              className={activePath === "resume-analyzer" ? "active" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              AI Resume Analyzer
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
