/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Send, CheckCircle2, Mail } from 'lucide-react';
import { Modal } from '../../common/Modal';
import { Pill } from '../../common/Pill';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCopyEmail: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  onCopyEmail,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'UI/UX Design (Mobile / Web App)',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      projectType: 'UI/UX Design (Mobile / Web App)',
      message: '',
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleResetAndClose}>
      <Pill>Let's Connect</Pill>
      <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--ink)', marginTop: '6px' }}>
        Send a Message to Amarnath
      </h2>
      <p style={{ fontSize: '13.5px', color: '#566048', marginBottom: '20px' }}>
        Have a project in mind, need design consultations, or want to explore collaboration?
      </p>

      {submitted ? (
        <div style={{ textAlign: 'center', padding: '36px 20px', background: '#f4f8ed', borderRadius: '18px' }}>
          <CheckCircle2 size={42} color="var(--olive)" style={{ margin: '0 auto 12px' }} />
          <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--ink)', marginBottom: '8px' }}>
            Thank you! Message Received.
          </h3>
          <p style={{ fontSize: '14px', color: '#404c2c', marginBottom: '18px' }}>
            I will review your message and reply back shortly to <strong>{formData.email}</strong>.
          </p>
          <button onClick={handleResetAndClose} className="btn">
            Done
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#354020', marginBottom: '5px' }}>
              Your Name
            </label>
            <input
              required
              placeholder="Jane Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="form-input"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#354020', marginBottom: '5px' }}>
              Email Address
            </label>
            <input
              required
              type="email"
              placeholder="jane@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="form-input"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#354020', marginBottom: '5px' }}>
              Project Type
            </label>
            <select
              className="form-input"
              value={formData.projectType}
              onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
            >
              <option>UI/UX Design (Mobile / Web App)</option>
              <option>Graphic Design & Branding</option>
              <option>Print & Editorial Collateral</option>
              <option>Motion & Video Editing</option>
              <option>Full Creative Consultation</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#354020', marginBottom: '5px' }}>
              Project Details
            </label>
            <textarea
              required
              rows={4}
              placeholder="Tell me about your goals, timelines, and ideas..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="form-textarea"
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
            <button
              type="button"
              onClick={onCopyEmail}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '12px',
                color: 'var(--olive)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <Mail size={13} /> Or copy email directly
            </button>

            <button type="submit" className="btn">
              <Send size={14} /> Send Inquiry
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};
