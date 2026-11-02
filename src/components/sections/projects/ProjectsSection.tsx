/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Pill } from '../../common/Pill';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { PROJECTS } from '../../../constants/portfolioData';
import { Project, ProjectCategory } from '../../../types/portfolio';

interface ProjectsSectionProps {
  onInquire: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onInquire }) => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<ProjectCategory>('all');

  const filteredProjects =
    filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.type === filter);

  return (
    <section className="projects" id="projects">
      <div className="projects-container">
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <Pill reveal>Featured Projects</Pill>
          <h2 className="h2 split">
            Selected Works That Showcase
            <br />
            <em>My Creativity.</em>
          </h2>
        </div>

        {/* Filter buttons */}
        <div className="projects-filter">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Projects ({PROJECTS.length})
          </button>
          <button
            className={`filter-btn ${filter === 'uiux' ? 'active' : ''}`}
            onClick={() => setFilter('uiux')}
          >
            UI/UX & Web (3)
          </button>
          <button
            className={`filter-btn ${filter === 'graphic' ? 'active' : ''}`}
            onClick={() => setFilter('graphic')}
          >
            Graphic & Print (3)
          </button>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.map((proj) => (
            <ProjectCard
              key={proj.id}
              project={proj}
              onSelect={(p) => setActiveProject(p)}
            />
          ))}
        </div>
      </div>

      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        onInquire={onInquire}
      />
    </section>
  );
};
