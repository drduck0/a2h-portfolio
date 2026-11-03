/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Monitor, Palette, Video } from 'lucide-react';
import { SkillCategory } from '../../../types/portfolio';

const ICON_MAP = {
  monitor: Monitor,
  palette: Palette,
  video: Video,
};

interface ExpertiseCardProps {
  skill: SkillCategory;
}

export const ExpertiseCard: React.FC<ExpertiseCardProps> = ({ skill }) => {
  const IconComp = ICON_MAP[skill.iconName];

  return (
    <div className="expertise-card reveal">
      <div className="expertise-card-icon">
        <IconComp size={24} />
      </div>

      <div>
        <h3>{skill.title}</h3>
        <p style={{ fontSize: '13.5px', color: '#4e534e', marginTop: '4px' }}>
          {skill.description}
        </p>
      </div>

      <ul className="expertise-tags">
        {skill.tags.map((tag, idx) => (
          <li key={idx} className="expertise-tag">
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
};
