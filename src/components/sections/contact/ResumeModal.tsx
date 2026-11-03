/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Download } from 'lucide-react';
import { Modal } from '../../common/Modal';
import { Pill } from '../../common/Pill';
import { PERSONAL_INFO } from '../../../constants/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const handleDownload = () => {
    // Generate/trigger resume download feedback
    window.print();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <Pill>Curriculum Vitae</Pill>
          <h2 style={{ fontSize: '26px', fontWeight: 700, color: 'var(--ink)', marginTop: '6px' }}>
            {PERSONAL_INFO.name.toUpperCase()}
          </h2>
          <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--olive)' }}>
            {PERSONAL_INFO.role.toUpperCase()}
          </p>
        </div>

        <button
          onClick={handleDownload}
          className="btn"
          style={{ height: '36px', fontSize: '12.5px' }}
        >
          <Download size={14} /> Print / Save PDF
        </button>
      </div>

      <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ background: '#f4f5f4', padding: '16px 20px', borderRadius: '16px' }}>
          <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--ink)', textTransform: 'uppercase', marginBottom: '6px' }}>
            Professional Profile
          </h4>
          <p style={{ fontSize: '13.5px', lineHeight: 1.55, color: '#242824' }}>
            {PERSONAL_INFO.aboutP1} {PERSONAL_INFO.aboutP2}
          </p>
        </div>

        <div>
          <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--ink)', textTransform: 'uppercase', marginBottom: '10px' }}>
            Core Competencies
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', fontSize: '13px', color: '#2a2e2a' }}>
            <div>• User Interface & Experience Design</div>
            <div>• Wireframing & Prototyping</div>
            <div>• Responsive Web & Mobile Design</div>
            <div>• Branding & Visual Identity</div>
            <div>• Editorial & Print Media</div>
            <div>• Motion Graphics & Video Editing</div>
          </div>
        </div>

        <div>
          <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--olive)', textTransform: 'uppercase', marginBottom: '10px' }}>
            Software Proficiency
          </h4>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {['Figma', 'Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign', 'Adobe After Effects', 'Adobe Premiere Pro'].map((tool, idx) => (
              <span key={idx} className="tool-chip" style={{ fontSize: '12px' }}>
                {tool}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--olive)', textTransform: 'uppercase', marginBottom: '10px' }}>
            Featured Project Deliveries
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
            <div style={{ borderLeft: '2px solid var(--olive)', paddingLeft: '12px' }}>
              <strong>Gamers Garage</strong> – Gaming mobile application UX & UI
            </div>
            <div style={{ borderLeft: '2px solid var(--olive)', paddingLeft: '12px' }}>
              <strong>Marvel Responsive Website</strong> – Immersive web design & layout
            </div>
            <div style={{ borderLeft: '2px solid var(--olive)', paddingLeft: '12px' }}>
              <strong>Vishnu Multispeciality Hospital</strong> – Healthcare marketing collateral & awareness
            </div>
            <div style={{ borderLeft: '2px solid var(--olive)', paddingLeft: '12px' }}>
              <strong>OEL Logistics</strong> – 24-page corporate editorial booklet & iconography
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
