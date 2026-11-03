/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Pill } from '../../common/Pill';
import { StatCard } from './StatCard';
import { SoftwareSkills } from './SoftwareSkills';
import { ASSETS } from '../../../constants/assets';
import { PERSONAL_INFO, STATS } from '../../../constants/portfolioData';

export const AboutSection: React.FC = () => {
  return (
    <section className="stats" id="stats">
      <span id="about" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }} />
      <div className="sq-field" data-count="22" />

      {/* Rising Cherry Tree */}
      <div className="tree-wrap">
        <img id="tree" className="tree" src={ASSETS.TREE} alt="Cherry blossom trees" />
      </div>

      <div className="stats-inner">
        <Pill reveal>About Me</Pill>

        <h2 className="h2 split">
          A Creative Designer Passionate About
          <br />
          Digital Experiences.
        </h2>

        <div className="about-narrative reveal">
          <p>
            Hi, I'm <strong>{PERSONAL_INFO.name}</strong>, a UI/UX and Graphic Designer passionate about
            creating meaningful visual experiences. I specialize in designing{' '}
            <strong>user-friendly interfaces</strong>, <strong>creative graphics</strong>,
            promotional materials, branding, and digital content.
          </p>
          <p style={{ marginTop: '12px' }}>
            I enjoy combining creativity with technology to transform ideas into impactful
            designs. I believe great design is not just about appearance; it's about{' '}
            <strong>communication</strong>, <strong>simplicity</strong>, and{' '}
            <strong>user experience</strong>.
          </p>
        </div>

        {/* 4 Ticket Cards */}
        <div className="cards">
          {STATS.map((stat, idx) => (
            <StatCard key={idx} stat={stat} />
          ))}
        </div>

        <div className="cards-shadow" />

        {/* Software Skills Banner with frosted strip */}
        <SoftwareSkills />
      </div>
    </section>
  );
};
