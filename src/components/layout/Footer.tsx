/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '../../constants/portfolioData';

interface FooterProps {
  onOpenResume?: () => void;
  onOpenContact?: () => void;
  onCopyEmail?: () => void;
  copiedEmail?: boolean;
}

export const Footer: React.FC<FooterProps> = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer footer--minimal" id="footer" data-section="footer">
      {/* 1. Footer Stage: Full cover looping video */}
      <div className="footer__stage" aria-hidden="true">
        <video
          className="footer__video"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260330_153826_e9005cf7-a1c7-4c7d-886f-fea22d644a9c.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      </div>

      {/* 2. Giant Frosted-Glass "A2H" Wordmark (Continuous word, centered, sinking into lavender fog) */}
      <p className="footer__wordmark" aria-hidden="true">
        A2H
      </p>

      {/* 3. Bottom Lavender Fog Layer */}
      <div className="footer__fog" aria-hidden="true" />

      {/* 4. Clean & Minimal Top Bar */}
      <div className="footer__minimal-content">
        <div className="footer__minimal-top">
          <div className="footer__minimal-main">
            {/* Brand Info (Left Side) */}
            <div className="footer__minimal-brand">
              <a className="brand__logo" href="#hero" aria-label="A2H home">
                <span className="brand__mark" aria-hidden="true">
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
                </span>
                A2H
              </a>
              <p className="footer__minimal-tagline">
                Designing Ideas. Creating Experiences.
              </p>
              <p className="footer__minimal-copy">
                © 2026 A2H · Amarnath. All rights reserved.
              </p>
              <p className="brand__by">
                Built with <span className="brand__heart" aria-label="love">💙</span> by{' '}
                <span className="brand__author">
                  <span className="brand__avatar" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <rect width="24" height="24" fill="#e6e6e3" />
                      <circle cx="12" cy="9.2" r="4.4" fill="#1b1b1b" />
                      <path d="M3 25c0-6 4-9.4 9-9.4S21 19 21 25Z" fill="#1b1b1b" />
                    </svg>
                  </span>
                  Amarnath
                </span>
              </p>
            </div>

            {/* Connect Section on Right Side (Icon + Name only, no pill effect) */}
            <nav className="footer__connect-block" aria-label="Connect">
              <span className="footer__connect-heading">Connect</span>
              <ul className="footer__connect-grid">
                <li>
                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer__connect-item"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
                    className="footer__connect-item"
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
                    className="footer__connect-item"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
                    className="footer__connect-item"
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
                    className="footer__connect-item"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm7.886 6.07a10.155 10.155 0 0 1 2.057 5.093c-.452-.093-2.617-.502-5.074-.085-.102-.236-.208-.475-.32-.716-.367-.788-.775-1.587-1.226-2.383 2.766-1.045 4.316-1.848 4.563-1.909zM12 1.86a10.134 10.134 0 0 1 5.926 1.895c-.207.123-1.638.932-4.27 1.947a32.062 32.062 0 0 0-4.329-3.235A10.274 10.274 0 0 1 12 1.86zM7.34 3.092c1.23.905 2.7 2.065 4.14 3.242-1.688 2.92-3.155 6.06-4.04 8.57A10.17 10.17 0 0 1 1.86 12c0-3.79 2.09-7.094 5.48-8.908zm-4.35 12.82c.162-.393.363-.842.6-1.341.86-1.84 2.155-4.664 3.73-7.464 2.217 1.342 4.417 3.226 5.86 5.228-2.673 1.055-6.07 1.488-10.19 3.577zm11.373 6.175c-1.385.586-2.89.873-4.463.873-1.58 0-3.08-.287-4.46-.873 3.51-1.745 6.45-2.144 8.923-3.056.76 1.157 1.41 2.216 1.95 3.056h-.05-.95zm2.57-2.38c-.52-.8-1.15-1.82-1.88-2.934 2.19-.395 4.22-.058 4.67.027a10.155 10.155 0 0 1-2.79 2.907z" />
                    </svg>
                    <span>Dribbble</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Back to Top on Bottom as a new div element */}
          <div className="footer__minimal-actions">
            <button
              onClick={scrollToTop}
              className="footer__back-to-top"
              aria-label="Scroll to top of page"
              title="Back to top"
            >
              <ArrowUp size={16} />
              <span>Back to Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
