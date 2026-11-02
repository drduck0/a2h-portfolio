/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Award, CheckCircle2 } from 'lucide-react';
import { Modal } from '../../common/Modal';
import { Pill } from '../../common/Pill';
import { Project } from '../../../types/portfolio';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onInquire: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onInquire,
}) => {
  if (!project) return null;

  return (
    <Modal isOpen={!!project} onClose={onClose}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <Pill>{project.category}</Pill>
        <span style={{ fontSize: '12px', color: '#5e6850', fontWeight: 600 }}>
          Project {project.num}
        </span>
      </div>

      <h2 style={{ fontSize: '28px', fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--ink)' }}>
        {project.title}
      </h2>

      <div
        style={{
          width: '100%',
          height: '180px',
          borderRadius: '18px',
          background: project.gradient,
          margin: '20px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: '20px',
          fontWeight: 600,
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2)',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <Award size={32} style={{ margin: '0 auto 8px' }} />
          <span>{project.title}</span>
        </div>
      </div>

      <p style={{ fontSize: '15px', lineHeight: 1.6, color: '#313926', marginBottom: '20px' }}>
        {project.description}
      </p>

      <h4
        style={{
          fontSize: '14px',
          fontWeight: 600,
          color: 'var(--olive)',
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
          marginBottom: '10px',
        }}
      >
        Key Contributions & Highlights:
      </h4>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
        {project.details.map((detail, idx) => (
          <li key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '14px', color: '#38422e' }}>
            <CheckCircle2 size={16} color="var(--olive)" style={{ marginTop: '2px', flexShrink: 0 }} />
            <span>{detail}</span>
          </li>
        ))}
      </ul>

      <h4
        style={{
          fontSize: '14px',
          fontWeight: 600,
          color: 'var(--olive)',
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
          marginBottom: '10px',
        }}
      >
        Tools & Methodologies:
      </h4>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '28px' }}>
        {project.tools.map((t, idx) => (
          <span key={idx} className="tool-chip" style={{ fontSize: '12px', padding: '5px 12px' }}>
            {t}
          </span>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
        <button onClick={onClose} className="btn-secondary" style={{ height: '36px' }}>
          Close
        </button>
        <button
          onClick={() => {
            onClose();
            onInquire();
          }}
          className="btn"
          style={{ height: '36px' }}
        >
          Inquire About Similar Work
        </button>
      </div>
    </Modal>
  );
};
