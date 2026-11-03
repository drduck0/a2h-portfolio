/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { ASSETS } from '../../../constants/assets';
import { PERSONAL_INFO } from '../../../constants/portfolioData';

interface HeroSectionProps {
  onOpenResume?: () => void;
  onOpenContact?: () => void;
}

const RAIL_DOTS = Array.from({ length: 15 }, (_, i) => i);

export const HeroSection: React.FC<HeroSectionProps> = () => {
  const [activeDotIndex, setActiveDotIndex] = useState<number>(8);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleHeroScroll = (e: Event) => {
      const customEvent = e as CustomEvent<number>;
      const progress = Math.max(0, Math.min(1, customEvent.detail ?? 0));

      // Update active dot on the right 15-dot rail based on scroll progress
      const dotIdx = Math.min(14, Math.max(2, Math.round(2 + progress * 12)));
      setActiveDotIndex(dotIdx);
    };

    window.addEventListener('a2h-hero-scroll', handleHeroScroll);
    return () => {
      window.removeEventListener('a2h-hero-scroll', handleHeroScroll);
    };
  }, []);

  const handleStartExperience = () => {
    setIsMobileMenuOpen(false);
    const nextSection = document.getElementById('stats') || document.getElementById('about');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <section className="hero a2h-hero" id="hero">
      {/* 1. Full-Viewport Meadow Background (Same Meadow Scene Used in the Footer) */}
      <div className="a2h-hero__bg" aria-hidden="true">
        <video
          id="heroVideo"
          className="a2h-hero__video"
          src={ASSETS.MEADOW_VIDEO}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className="a2h-hero__sky-tint" />
      </div>

      {/* 2. Right Scroll-To-Play 3D Scene Rail */}
      <div className="a2h-hero__right-hud">
        <a href="#stats" className="a2h-scroll-prompt">
          <span>SCROLL TO PLAY</span>
          <span>3D SCENE ↓</span>
        </a>

        <div className="a2h-dot-rail" aria-hidden="true">
          <span className="a2h-dot-rail__menu">
            <span />
            <span />
          </span>
          <div className="a2h-dot-rail__dots">
            {RAIL_DOTS.map((idx) => (
              <span
                key={idx}
                className={`a2h-dot-rail__dot ${
                  idx === 2 || idx === activeDotIndex || idx === 14 ? 'is-bright' : ''
                }`}
              />
            ))}
          </div>
        </div>

        <div className="a2h-Viewfinder-icon" aria-hidden="true">
          <svg
            viewBox="0 0 20 20"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          >
            <path d="M3 7V4a1 1 0 0 1 1-1h3" />
            <path d="M13 3h3a1 1 0 0 1 1 1v3" />
            <path d="M17 13v3a1 1 0 0 1-1 1h-3" />
            <path d="M7 17H4a1 1 0 0 1-1-1v-3" />
          </svg>
        </div>
      </div>

      {/* 3. Center Stage: Frosted Glass Navigation & Hero Panel */}
      <div className="a2h-hero__center">
        <div className="a2h-glass-stack">
          {/* Top secondary glass lip */}
          <div className="a2h-glass-lip" aria-hidden="true" />

          {/* Main Frosted Glass Viewport Card */}
          <div className="a2h-glass-card hero-content">
            {/* Inner Header Bar */}
            <div className="a2h-glass-header">
              <a
                href="#hero"
                className="a2h-glass-brand"
                aria-label="A2H Home"
                onClick={closeMobileMenu}
              >
                <svg viewBox="0 0 30 22" width="24" height="18" aria-hidden="true">
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

              {/* Desktop / Tablet Inline Navigation */}
              <nav className="a2h-glass-nav" aria-label="Hero Navigation">
                <a href="#projects" className="a2h-glass-nav__link">
                  WORK
                </a>
                <a href="#stats" className="a2h-glass-nav__link">
                  ABOUT
                </a>
                <a href="#contact" className="a2h-glass-nav__link">
                  CONNECT
                </a>
                <a href="#expertise" className="a2h-glass-nav__link">
                  SERVICES
                </a>
              </nav>

              {/* Mobile Hamburger Toggle Button */}
              <button
                type="button"
                className={`a2h-glass-hamburger ${isMobileMenuOpen ? 'is-open' : ''}`}
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={isMobileMenuOpen}
              >
                <span className="a2h-glass-hamburger__line" />
                <span className="a2h-glass-hamburger__line" />
                <span className="a2h-glass-hamburger__line" />
              </button>
            </div>

            {/* Mobile Collapsible Frosted Menu */}
            {isMobileMenuOpen && (
              <nav className="a2h-glass-mobile-menu" aria-label="Mobile Hero Navigation">
                <a
                  href="#projects"
                  className="a2h-glass-mobile-menu__link"
                  onClick={closeMobileMenu}
                >
                  WORK
                </a>
                <a
                  href="#stats"
                  className="a2h-glass-mobile-menu__link"
                  onClick={closeMobileMenu}
                >
                  ABOUT
                </a>
                <a
                  href="#contact"
                  className="a2h-glass-mobile-menu__link"
                  onClick={closeMobileMenu}
                >
                  CONNECT
                </a>
                <a
                  href="#expertise"
                  className="a2h-glass-mobile-menu__link"
                  onClick={closeMobileMenu}
                >
                  SERVICES
                </a>
              </nav>
            )}

            {/* Inner Hero Copy & CTAs */}
            <div className="a2h-glass-body">
              <p className="a2h-glass-kicker hero-pill-role">
                Designing Ideas. Creating Experiences.
              </p>

              <h1 id="heroTitle" className="a2h-glass-title split">
                Scroll-Triggered
                <br />
                3D Motion Portfolio
              </h1>

              <div className="a2h-glass-actions hero-actions">
                <a href="#projects" className="a2h-btn-dark">
                  EXPLORE PROJECTS
                </a>
                <button
                  type="button"
                  onClick={handleStartExperience}
                  className="a2h-btn-light"
                >
                  START EXPERIENCE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Centered Frosted Glass Connect Dock */}
      <div className="a2h-connect-dock">
        <div className="a2h-connect-dock__inner">
          <span className="a2h-connect-dock__label">CONNECT</span>

          <ul className="a2h-connect-dock__links">
            <li>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="a2h-connect-dock__link"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                <span>LinkedIn</span>
              </a>
            </li>

            <li>
              <a
                href={PERSONAL_INFO.behance}
                target="_blank"
                rel="noopener noreferrer"
                className="a2h-connect-dock__link"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-4.976 3-3.401 0-4.75-2.509-4.75-4.996 0-3.328 1.94-5.004 4.887-5.004 3.754 0 4.847 2.646 4.673 5.37h-6.793c.097 1.246.852 2.37 2.293 2.37 1.139 0 1.921-.611 2.293-1.32l2.376.58zm-4.97-4.63c-1.127 0-1.859.721-1.996 1.89h3.945c-.047-1.148-.737-1.89-1.949-1.89zm-10.756 4.63h-3.5v-10h3.818c2.617 0 3.782 1.191 3.782 2.809 0 1.055-.611 2.051-1.631 2.451 1.344.381 2.031 1.543 2.031 2.76 0 1.83-1.488 1.98-4.5 1.98zm-1.0-6.19h1.164c.957 0 1.637-.41 1.637-1.25 0-.859-.68-1.21-1.637-1.21h-1.164v2.46zm0 4.84h1.363c1.074 0 1.855-.429 1.855-1.406 0-.938-.781-1.387-1.855-1.387h-1.363v2.793z" />
                </svg>
                <span>Behance</span>
              </a>
            </li>

            <li>
              <a
                href={PERSONAL_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="a2h-connect-dock__link"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                <span>Instagram</span>
              </a>
            </li>

            <li>
              <a
                href="https://figma.com/@amarnath"
                target="_blank"
                rel="noopener noreferrer"
                className="a2h-connect-dock__link"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M8 24c2.209 0 4-1.791 4-4v-4H8c-2.209 0-4 1.791-4 4s1.791 4 4 4z" />
                  <path d="M4 12c0-2.209 1.791-4 4-4h4v8H8c-2.209 0-4-1.791-4-4z" />
                  <path d="M4 4c0-2.209 1.791-4 4-4h4v8H8C5.791 8 4 6.209 4 4z" />
                  <path d="M12 0h4c2.209 0 4 1.791 4 4s-1.791 4-4 4h-4V0z" />
                  <path d="M20 12c0 2.209-1.791 4-4 4s-4-1.791-4-4 1.791-4 4-4 4 1.791 4 4z" />
                </svg>
                <span>Figma</span>
              </a>
            </li>

            <li>
              <a
                href={PERSONAL_INFO.dribbble}
                target="_blank"
                rel="noopener noreferrer"
                className="a2h-connect-dock__link"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm7.886 6.07a10.155 10.155 0 0 1 2.057 5.093c-.452-.093-2.617-.502-5.074-.085-.102-.236-.208-.475-.32-.716-.367-.788-.775-1.587-1.226-2.383 2.766-1.045 4.316-1.848 4.563-1.909zM12 1.86a10.134 10.134 0 0 1 5.926 1.895c-.207.123-1.638.932-4.27 1.947a32.062 32.062 0 0 0-4.329-3.235A10.274 10.274 0 0 1 12 1.86zM7.34 3.092c1.23.905 2.7 2.065 4.14 3.242-1.688 2.92-3.155 6.06-4.04 8.57A10.17 10.17 0 0 1 1.86 12c0-3.79 2.09-7.094 5.48-8.908zm-4.35 12.82c.162-.393.363-.842.6-1.341.86-1.84 2.155-4.664 3.73-7.464 2.217 1.342 4.417 3.226 5.86 5.228-2.673 1.055-6.07 1.488-10.19 3.577zm11.373 6.175c-1.385.586-2.89.873-4.463.873-1.58 0-3.08-.287-4.46-.873 3.51-1.745 6.45-2.144 8.923-3.056.76 1.157 1.41 2.216 1.95 3.056h-.05-.95zm2.57-2.38c-.52-.8-1.15-1.82-1.88-2.934 2.19-.395 4.22-.058 4.67.027a10.155 10.155 0 0 1-2.79 2.907z" />
                </svg>
                <span>Dribbble</span>
              </a>
            </li>
          </ul>

          <p className="a2h-connect-dock__copy">
            © 2026 A2H · Amarnath. All rights reserved. Built with{' '}
            <span aria-label="love">💙</span> by{' '}
            <span className="a2h-connect-dock__author">
              <span className="a2h-connect-dock__avatar" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <rect width="24" height="24" rx="12" fill="#e6e6e3" />
                  <circle cx="12" cy="9.2" r="4.4" fill="#1b1b1b" />
                  <path d="M3 25c0-6 4-9.4 9-9.4S21 19 21 25Z" fill="#1b1b1b" />
                </svg>
              </span>
              <strong>Amarnath</strong>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};
