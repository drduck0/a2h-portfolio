/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';

interface ContactSectionProps {
  copiedEmail?: boolean;
  onCopyEmail?: () => void;
  onOpenContact?: () => void;
  onOpenResume?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  // Smooth Intersection Observer for entering animation
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`sf-contact-section ${isVisible ? 'is-visible' : ''}`}
      id="contact"
      data-section="contact"
    >
      {/* Background Ambience */}
      <div className="sf-contact-ambient" aria-hidden="true" />

      <div className="sf-contact-container sf-contact-container--minimal">
        {/* Centered Pill Header */}
        <div className="sf-contact-topbar">
          <span className="a2h-about-pill">Let's Connect</span>
        </div>

        {/* Ambitious Idea Heading */}
        <h2 className="sf-contact-minimal-headline">
          <span>Have an ambitious idea in mind?</span>
          <span className="sf-contact-minimal-subline">
            Let's build something exceptional.
          </span>
        </h2>
      </div>
    </section>
  );
};
