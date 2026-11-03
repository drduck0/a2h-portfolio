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
            Hi, I&apos;m <strong>{PERSONAL_INFO.name}</strong>, a UI/UX and Graphic Designer. I
            blend creativity with technology to build <strong>intuitive interfaces</strong>,{' '}
            <strong>compelling brand identities</strong>, and{' '}
            <strong>impactful digital content</strong>. For me, great design isn&apos;t just about
            how it looks—it&apos;s about <strong>clear communication</strong>,{' '}
            <strong>simplicity</strong>, and a <strong>seamless user experience</strong>.
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
