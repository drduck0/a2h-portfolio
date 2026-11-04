/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ASSETS } from '../../../constants/assets';
import { Project } from '../../../types/portfolio';

interface ProjectMediaVisualProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export const ProjectMediaVisual: React.FC<ProjectMediaVisualProps> = ({
  project,
  onSelect,
}) => {
  const renderBackdrop = (variant: string) => (
    <div className={`sf-meadow-backdrop sf-meadow-backdrop--${variant}`} aria-hidden="true">
      <img
        src={ASSETS.HERO_POSTER}
        alt=""
        className="sf-meadow-backdrop__img"
        referrerPolicy="no-referrer"
      />
      <div className="sf-meadow-backdrop__sky-veil" />
      <img
        src={variant === 'marvel' || variant === 'hospital' ? ASSETS.CLOUD_A : ASSETS.CLOUD_B}
        alt=""
        className="sf-meadow-backdrop__cloud"
        referrerPolicy="no-referrer"
      />
      <div className="sf-meadow-backdrop__gloss-sheen" />
    </div>
  );

  const renderArtwork = () => {
    switch (project.id) {
      case 'gamers-garage':
        return (
          <div className="sf-media-scene sf-media-scene--gamers">
            {renderBackdrop('gamers')}

            <div className="sf-mockup-stage">
              <div className="sf-phone sf-phone--primary">
                <div className="sf-phone__notch" />
                <div className="sf-phone__header">
                  <span className="sf-phone__tag">Live Tournament · S04</span>
                  <span className="sf-phone__score">24 Squads</span>
                </div>
                <div className="sf-phone__hero-card">
                  <span className="sf-phone__kicker">Finals Bracket</span>
                  <h4>Apex Arena Championship</h4>
                  <div className="sf-phone__match-bar">
                    <span>Team Vortex</span>
                    <strong>14 : 11</strong>
                    <span>Nova Core</span>
                  </div>
                </div>
                <div className="sf-phone__stats-row">
                  <div className="sf-phone__stat-box">
                    <span>Win Rate</span>
                    <strong>84.2%</strong>
                  </div>
                  <div className="sf-phone__stat-box">
                    <span>Ping</span>
                    <strong>12 ms</strong>
                  </div>
                  <div className="sf-phone__stat-box">
                    <span>Rank</span>
                    <strong>#01</strong>
                  </div>
                </div>
                <div className="sf-phone__list">
                  <div className="sf-phone__list-item">
                    <span>01 · Matchmaking Lobby</span>
                    <span>Ready</span>
                  </div>
                  <div className="sf-phone__list-item">
                    <span>02 · Voice Party Hub</span>
                    <span>Active</span>
                  </div>
                </div>
              </div>

              <div className="sf-phone sf-phone--secondary">
                <div className="sf-phone__notch" />
                <div className="sf-phone__header">
                  <span className="sf-phone__tag">Player Profile</span>
                  <span className="sf-phone__score">Pro Tier</span>
                </div>
                <div className="sf-phone__radar">
                  <svg viewBox="0 0 120 120" className="sf-radar-svg" aria-hidden="true">
                    <polygon
                      points="60,12 104,38 92,94 28,94 16,38"
                      fill="none"
                      stroke="rgba(11,13,11,0.18)"
                      strokeWidth="1"
                    />
                    <polygon
                      points="60,28 88,46 80,82 40,82 32,46"
                      fill="none"
                      stroke="rgba(11,13,11,0.12)"
                      strokeWidth="1"
                    />
                    <polygon
                      points="60,18 96,42 84,88 38,78 24,42"
                      fill="rgba(77,106,16,0.18)"
                      stroke="#2a3410"
                      strokeWidth="1.8"
                    />
                  </svg>
                </div>
                <div className="sf-phone__footer-bar">
                  <span>Squad Roster</span>
                  <strong>4 / 4 Online</strong>
                </div>
              </div>
            </div>
          </div>
        );

      case 'marvel-website':
        return (
          <div className="sf-media-scene sf-media-scene--marvel">
            {renderBackdrop('marvel')}

            <div className="sf-mockup-stage">
              <div className="sf-browser">
                <div className="sf-browser__bar">
                  <div className="sf-browser__dots">
                    <span />
                    <span />
                    <span />
                  </div>
                  <span className="sf-browser__url">marvel.editorial.experience</span>
                  <span className="sf-browser__vp">1440 px</span>
                </div>

                <div className="sf-browser__body">
                  <div className="sf-browser__hero">
                    <div className="sf-browser__copy">
                      <span className="sf-browser__eyebrow">Interactive Anthology · Vol. IV</span>
                      <h4>Multiverse Visual Chronicle</h4>
                      <p>
                        Responsive editorial grid with frame-accurate scroll transitions and
                        character dossiers.
                      </p>
                      <div className="sf-browser__metrics">
                        <span>60 FPS Motion</span>
                        <span>·</span>
                        <span>12-Col Grid</span>
                      </div>
                    </div>

                    <div className="sf-browser__panels">
                      <div className="sf-comic-panel sf-comic-panel--tall">
                        <span>01</span>
                        <strong>Origin Arc</strong>
                      </div>
                      <div className="sf-comic-panel">
                        <span>02</span>
                        <strong>Timeline</strong>
                      </div>
                      <div className="sf-comic-panel">
                        <span>03</span>
                        <strong>Archive</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'entrepreneur-community':
        return (
          <div className="sf-media-scene sf-media-scene--founder">
            {renderBackdrop('founder')}

            <div className="sf-mockup-stage sf-mockup-stage--trio">
              <div className="sf-ui-card sf-ui-card--light">
                <div className="sf-ui-card__top">
                  <span>Founder Network</span>
                  <span>Verified</span>
                </div>
                <h4>Seed &amp; Series A Collective</h4>
                <p>Curated peer feedback, pitch deck reviews, and 1-on-1 advisor hours.</p>
                <div className="sf-ui-card__avatars">
                  <span>AR</span>
                  <span>MK</span>
                  <span>SV</span>
                  <strong>+420 Founders</strong>
                </div>
              </div>

              <div className="sf-ui-card sf-ui-card--frosted">
                <div className="sf-ui-card__top">
                  <span>Mentor Session</span>
                  <span>16:00 IST</span>
                </div>
                <h4>Product Architecture Critique</h4>
                <div className="sf-ui-card__metrics">
                  <div>
                    <span>Deck Clarity</span>
                    <strong>96%</strong>
                  </div>
                  <div>
                    <span>Cohort</span>
                    <strong>W26</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'vishnu-hospital':
        return (
          <div className="sf-media-scene sf-media-scene--hospital">
            {renderBackdrop('hospital')}

            <div className="sf-mockup-stage">
              <div className="sf-print-spread">
                <div className="sf-poster-card sf-poster-card--main">
                  <div className="sf-poster-card__head">
                    <span>Vishnu Multispeciality Hospital</span>
                    <span>Oncology</span>
                  </div>
                  <div className="sf-poster-card__emblem">
                    <svg viewBox="0 0 80 80" width="46" height="46" aria-hidden="true">
                      <circle
                        cx="40"
                        cy="40"
                        r="32"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M40 20v40M20 40h40"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <h4>Early Detection Saves Lives.</h4>
                  <p>
                    Comprehensive community screening campaigns, patient education booklets, and
                    multilingual care guides.
                  </p>
                </div>

                <div className="sf-poster-card sf-poster-card--side">
                  <span className="sf-poster-card__label">Patient Care System</span>
                  <h5>Empathetic typography &amp; high-contrast wayfinding</h5>
                  <div className="sf-poster-card__swatches">
                    <span className="sf-swatch sf-swatch--1" />
                    <span className="sf-swatch sf-swatch--2" />
                    <span className="sf-swatch sf-swatch--3" />
                  </div>
                  <span className="sf-poster-card__meta">Print · Outdoor · Social</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'bairava-motors':
        return (
          <div className="sf-media-scene sf-media-scene--motors">
            {renderBackdrop('motors')}

            <div className="sf-mockup-stage">
              <div className="sf-billboard">
                <div className="sf-billboard__header">
                  <span>Bairava Motors · Campaign</span>
                  <span>Series 05 / Print</span>
                </div>
                <div className="sf-billboard__main">
                  <div className="sf-billboard__title-col">
                    <span className="sf-billboard__kicker">Engineered Motion</span>
                    <h4>Precision Built For Every Road.</h4>
                    <p>Showroom launch identity, seasonal print flyers, and high-impact hoardings.</p>
                  </div>
                  <div className="sf-billboard__graphic">
                    <svg viewBox="0 0 220 110" className="sf-speed-svg" aria-hidden="true">
                      <path
                        d="M16 84 C55 28, 135 28, 204 84"
                        fill="none"
                        stroke="rgba(11,13,11,0.18)"
                        strokeWidth="2"
                      />
                      <path
                        d="M32 84 C68 42, 132 42, 188 84"
                        fill="none"
                        stroke="#1c2410"
                        strokeWidth="2.5"
                      />
                      <circle cx="62" cy="84" r="14" fill="none" stroke="#0b0d0b" strokeWidth="2.2" />
                      <circle cx="158" cy="84" r="14" fill="none" stroke="#0b0d0b" strokeWidth="2.2" />
                      <line x1="10" y1="98" x2="210" y2="98" stroke="rgba(11,13,11,0.22)" strokeWidth="1" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'oel-logistics':
      default:
        return (
          <div className="sf-media-scene sf-media-scene--logistics">
            {renderBackdrop('logistics')}

            <div className="sf-mockup-stage">
              <div className="sf-booklet">
                <div className="sf-booklet__page sf-booklet__page--left">
                  <span className="sf-booklet__folio">01 · Corporate</span>
                  <h4>OEL Global Supply Chain</h4>
                  <p>
                    24-page editorial monograph covering sea freight, air cargo corridors, and
                    customs clearance protocols.
                  </p>
                  <div className="sf-booklet__specs">
                    <span>Sea</span>
                    <span>·</span>
                    <span>Air Cargo</span>
                    <span>·</span>
                    <span>Customs</span>
                  </div>
                </div>

                <div className="sf-booklet__page sf-booklet__page--right">
                  <span className="sf-booklet__folio">02 · Global Routes</span>
                  <svg viewBox="0 0 180 110" className="sf-route-svg" aria-hidden="true">
                    <path
                      d="M14 82 Q 62 18, 112 52 T 166 26"
                      fill="none"
                      stroke="#141714"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />
                    <path
                      d="M14 82 Q 74 68, 166 26"
                      fill="none"
                      stroke="#2a3828"
                      strokeWidth="1.6"
                    />
                    <circle cx="14" cy="82" r="4.5" fill="#141714" />
                    <circle cx="92" cy="48" r="4" fill="#2a3828" />
                    <circle cx="166" cy="26" r="5" fill="#141714" />
                  </svg>
                  <div className="sf-booklet__metrics">
                    <div>
                      <span>Ports</span>
                      <strong>48+</strong>
                    </div>
                    <div>
                      <span>Pages</span>
                      <strong>24 pp</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      className="sf-media-slide__inner"
      onClick={() => onSelect(project)}
      role="button"
      tabIndex={0}
      aria-label={`Open case study for ${project.title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(project);
        }
      }}
    >
      {renderArtwork()}

      {/* Glossy Frosted Case Study Pill */}
      <div className="sf-media-slide__corner-badge">
        <span className="sf-media-slide__action">
          <span>Case Study</span>
          <ArrowUpRight size={13} />
        </span>
      </div>
    </div>
  );
};
