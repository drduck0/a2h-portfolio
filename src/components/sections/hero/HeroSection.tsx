/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, Download } from 'lucide-react';
import { ASSETS } from '../../../constants/assets';
import { PERSONAL_INFO } from '../../../constants/portfolioData';

interface HeroSectionProps {
  onOpenResume: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenResume }) => {
  return (
    <section className="hero" id="hero">
      {/* Drifting Clouds */}
      <div className="cloud cloud-l" data-par="-60">
        <img className="drift-a" src={ASSETS.CLOUD_A} alt="" style={{ width: '100%' }} />
      </div>

      <div className="cloud cloud-r" data-par="-90">
        <img className="drift-b" src={ASSETS.CLOUD_B} alt="" style={{ width: '100%' }} />
      </div>

      {/* Hero Content */}
      <div className="hero-content">
        <h1 id="heroTitle" className="split">
          Turning Creative Ideas Into
          <br />
          <em>Meaningful Digital Experiences.</em>
        </h1>

        <p className="hero-bio">{PERSONAL_INFO.bio}</p>

        <div className="hero-actions">
          <a className="btn" href="#projects">
            Explore My Work
            <ArrowRight size={15} />
          </a>
          <button onClick={onOpenResume} className="btn-secondary">
            <Download size={15} />
            Download Resume
          </button>
        </div>
      </div>

      {/* Hero video media */}
      <div className="hero-media">
        <video
          id="heroVideo"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={ASSETS.HERO_POSTER}
          src={ASSETS.HERO_VIDEO}
        />
      </div>

      {/* Frosted glass squares overlay */}
      <div className="hero-glass" id="heroGlass" />
    </section>
  );
};
