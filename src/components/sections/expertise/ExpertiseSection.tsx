/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Pill } from '../../common/Pill';
import { ExpertiseCard } from './ExpertiseCard';
import { SKILL_CATEGORIES } from '../../../constants/portfolioData';

export const ExpertiseSection: React.FC = () => {
  return (
    <section className="expertise" id="expertise">
      <div className="expertise-container">
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <Pill reveal>My Expertise</Pill>
          <h2 className="h2 split">
            Skills & Creative Tools
            <br />
            <em>Creating Designs That Make an Impact.</em>
          </h2>
        </div>

        <div className="expertise-grid">
          {SKILL_CATEGORIES.map((skill, idx) => (
            <ExpertiseCard key={idx} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
};
