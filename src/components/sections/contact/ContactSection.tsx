/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  FileText,
  Copy,
  Check,
  ArrowUpRight,
} from 'lucide-react';
import { Pill } from '../../common/Pill';
import { PetalsOverlay } from './PetalsOverlay';
import { PERSONAL_INFO } from '../../../constants/portfolioData';

interface ContactSectionProps {
  copiedEmail: boolean;
  onCopyEmail: () => void;
  onOpenContact: () => void;
  onOpenResume: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  copiedEmail,
  onCopyEmail,
  onOpenContact,
  onOpenResume,
}) => {
  const [copiedInternal, setCopiedInternal] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onCopyEmail) {
      onCopyEmail();
    } else {
      navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopiedInternal(true);
      setTimeout(() => setCopiedInternal(false), 2000);
    }
  };

  const isEmailCopied = copiedEmail || copiedInternal;

  return (
    <section className="contact-section" id="contact" data-section="contact">
      {/* Gentle ambient cherry petals */}
      <PetalsOverlay />

      <div className="contact-container">
        {/* Section Header */}
        <div className="contact-header">
          <Pill>Let's Connect</Pill>
          <h2 className="contact-title">
            Have a Creative Project in Mind? Let's Talk.
          </h2>
          <p className="contact-subtitle">
            I transform ideas into visually engaging designs and user-friendly digital experiences
            through creativity, design thinking, and modern technology.
          </p>
        </div>

        {/* Centered Get in Touch Card */}
        <div className="contact-single-wrapper">
          <div className="contact-card contact-card--direct">
            <div className="contact-card-header">
              <div className="contact-card-title-wrap">
                <span className="contact-card-badge">Direct Communication</span>
                <h3 className="contact-card-title">Get In Touch</h3>
              </div>
              <div className="contact-status-indicator">
                <span className="contact-status-dot" />
                <span>Replies in &lt; 24h</span>
              </div>
            </div>

            <p className="contact-card-desc">
              Have an exciting project, freelance opportunity, or design leadership role? Feel free to reach out directly anytime.
            </p>

            <ul className="contact-methods-grid">
              {/* Email item */}
              <li className="contact-method-item">
                <div className="contact-method-icon" aria-hidden="true">
                  <Mail size={18} />
                </div>
                <div className="contact-method-info">
                  <span className="contact-method-label">Email Address</span>
                  <div className="contact-method-action-row">
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="contact-method-link"
                    >
                      {PERSONAL_INFO.email}
                    </a>
                    <button
                      onClick={handleCopy}
                      className="contact-copy-pill"
                      title={isEmailCopied ? 'Copied!' : 'Copy email to clipboard'}
                      aria-label="Copy email address"
                    >
                      {isEmailCopied ? (
                        <>
                          <Check size={12} className="text-emerald-600" />
                          <span className="text-emerald-700 font-semibold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={12} />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </li>

              {/* Phone item */}
              <li className="contact-method-item">
                <div className="contact-method-icon" aria-hidden="true">
                  <Phone size={18} />
                </div>
                <div className="contact-method-info">
                  <span className="contact-method-label">Direct Phone / WhatsApp</span>
                  <a
                    href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`}
                    className="contact-method-link"
                  >
                    {PERSONAL_INFO.phone}
                  </a>
                </div>
              </li>

              {/* Location item */}
              <li className="contact-method-item">
                <div className="contact-method-icon" aria-hidden="true">
                  <MapPin size={18} />
                </div>
                <div className="contact-method-info">
                  <span className="contact-method-label">Location</span>
                  <span className="contact-method-text">
                    {PERSONAL_INFO.location}
                    <span className="contact-location-pill">Remote Worldwide</span>
                  </span>
                </div>
              </li>

              {/* Working Hours item */}
              <li className="contact-method-item">
                <div className="contact-method-icon" aria-hidden="true">
                  <Clock size={18} />
                </div>
                <div className="contact-method-info">
                  <span className="contact-method-label">Working Hours</span>
                  <span className="contact-method-text">
                    Monday – Saturday · 09:00 – 19:00 IST
                  </span>
                </div>
              </li>
            </ul>

            {/* Action CTA Buttons */}
            <div className="contact-actions-row">
              <button
                onClick={onOpenContact}
                className="contact-cta-primary"
              >
                <Send size={15} />
                <span>Send Direct Message</span>
                <ArrowUpRight size={15} className="contact-arrow" />
              </button>

              <button
                onClick={onOpenResume}
                className="contact-cta-secondary"
              >
                <FileText size={15} />
                <span>View Full Resume</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
