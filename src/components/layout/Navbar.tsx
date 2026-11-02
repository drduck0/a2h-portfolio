/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X as CloseIcon } from 'lucide-react';

interface NavbarProps {
  onOpenResume?: () => void;
  onOpenContact?: () => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isFooterReached, setIsFooterReached] = useState(false);

  useEffect(() => {
    const footerEl = document.getElementById('footer');
    if (!footerEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const reached = entry.isIntersecting;
        setIsFooterReached(reached);
        if (reached) {
          setMobileMenuOpen(false);
        }
      },
      {
        root: null,
        threshold: 0.08,
      }
    );

    observer.observe(footerEl);
    return () => observer.disconnect();
  }, []);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className={`nav ${isFooterReached ? 'nav--hidden' : ''}`}>
        <a className="brand" href="#hero" aria-label="A2H portfolio home" onClick={handleNavClick}>
          <svg viewBox="0 0 30 22" width="28" height="20" aria-hidden="true">
            <circle cx="4" cy="17" r="3.6" fill="currentColor" />
            <path
              d="M10.5 18.5 16.8 5.2 25.5 18.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="5.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>A2H</span>
        </a>

        {/* Navigation Links (visible on tablet and desktop) */}
        <nav className="nav-links" aria-label="Primary Navigation">
          <a className="nav-link" href="#about">
            About
          </a>
          <a className="nav-link" href="#expertise">
            Expertise
          </a>
          <a className="nav-link" href="#projects">
            Projects
          </a>
          <a className="nav-link" href="#process">
            Process
          </a>
          <a className="nav-link" href="#contact">
            Contact
          </a>
        </nav>

        {/* Mobile Hamburger Button (shown only on mobile screens) */}
        <button
          className="nav-hamburger"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <CloseIcon size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* Mobile Dropdown Navigation Menu */}
      {mobileMenuOpen && !isFooterReached && (
        <div className="mobile-nav-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-nav-panel" onClick={(e) => e.stopPropagation()}>
            <nav className="mobile-nav-links" aria-label="Mobile Navigation">
              <a className="mobile-nav-link" href="#about" onClick={handleNavClick}>
                About
              </a>
              <a className="mobile-nav-link" href="#expertise" onClick={handleNavClick}>
                Expertise
              </a>
              <a className="mobile-nav-link" href="#projects" onClick={handleNavClick}>
                Projects
              </a>
              <a className="mobile-nav-link" href="#process" onClick={handleNavClick}>
                Process
              </a>
              <a className="mobile-nav-link" href="#contact" onClick={handleNavClick}>
                Contact
              </a>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};
