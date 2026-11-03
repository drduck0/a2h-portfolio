/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Smartphone, Palette, ArrowRight } from 'lucide-react';
import { Project } from '../../../types/portfolio';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  return (
    <div
      className="project-card reveal"
      onClick={() => onSelect(project)}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${project.title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onSelect(project);
        }
      }}
    >
      <div className="project-banner" style={{ background: project.gradient }}>
        <span className="project-badge-num">{project.num}</span>
        <div className="project-banner-content">
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              margin: '0 auto 12px',
            }}
          >
            {project.type === 'uiux' ? <Smartphone size={26} /> : <Palette size={26} />}
          </div>
          <h4 style={{ color: '#fff', fontSize: '18px', fontWeight: 600 }}>{project.title}</h4>
        </div>
      </div>

      <div className="project-body">
        <span className="project-cat">{project.category}</span>
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.description}</p>

        <div className="project-footer">
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {project.tools.slice(0, 2).map((t, idx) => (
              <span
                key={idx}
                style={{
                  fontSize: '11px',
                  background: '#f0f2f0',
                  color: '#1e221e',
                  border: '1px solid rgba(11, 13, 11, 0.08)',
                  padding: '3px 9px',
                  borderRadius: '999px',
                }}
              >
                {t}
              </span>
            ))}
          </div>

          <span className="project-cta-link">
            Explore Case Study <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </div>
  );
};
