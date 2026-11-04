/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../../../types/portfolio';

interface ProjectMediaVisualProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export const ProjectMediaVisual: React.FC<ProjectMediaVisualProps> = ({
  project,
  onSelect,
}) => {
  const renderArtwork = () => {
    switch (project.id) {
      case 'gamers-garage':
        return (
          <div className="sf-media-scene sf-media-scene--gamers">
            <div className="sf-media-scene__sky" />
            <div className="sf-media-scene__beams" />
            <div className="sf-media-scene__grid" />

            <div className="sf-mockup-stage">
              <div className="sf-phone sf-phone--primary">
                <div className="sf-phone__notch" />
                <div className="sf-phone__header">
                  <span className="sf-phone__tag">LIVE TOURNAMENT · S04</span>
                  <span className="sf-phone__score">24 SQUADS</span>
                </div>
                <div className="sf-phone__hero-card">
                  <span className="sf-phone__kicker">FINALS BRACKET</span>
                  <h4>Apex Arena Championship</h4>
                  <div className="sf-phone__match-bar">
                    <span>TEAM VORTEX</span>
                    <strong>14 : 11</strong>
                    <span>NOVA CORE</span>
                  </div>
                </div>
                <div className="sf-phone__stats-row">
                  <div className="sf-phone__stat-box">
                    <span>WIN RATE</span>
                    <strong>84.2%</strong>
                  </div>
                  <div className="sf-phone__stat-box">
                    <span>PING</span>
                    <strong>12 ms</strong>
                  </div>
                  <div className="sf-phone__stat-box">
                    <span>RANK</span>
                    <strong>#01</strong>
                  </div>
                </div>
                <div className="sf-phone__list">
                  <div className="sf-phone__list-item">
                    <span>01 · Matchmaking Lobby</span>
                    <span>READY</span>
                  </div>
                  <div className="sf-phone__list-item">
                    <span>02 · Voice Telemetry</span>
                    <span>ACTIVE</span>
                  </div>
                </div>
              </div>

              <div className="sf-phone sf-phone--secondary">
                <div className="sf-phone__notch" />
                <div className="sf-phone__header">
                  <span className="sf-phone__tag">PLAYER PROFILE</span>
                  <span className="sf-phone__score">PRO TIER</span>
                </div>
                <div className="sf-phone__radar">
                  <svg viewBox="0 0 120 120" className="sf-radar-svg" aria-hidden="true">
                    <polygon
                      points="60,12 104,38 92,94 28,94 16,38"
                      fill="none"
                      stroke="rgba(242,244,242,0.22)"
                      strokeWidth="1"
                    />
                    <polygon
                      points="60,28 88,46 80,82 40,82 32,46"
                      fill="none"
                      stroke="rgba(242,244,242,0.16)"
                      strokeWidth="1"
                    />
                    <polygon
                      points="60,18 96,42 84,88 38,78 24,42"
                      fill="rgba(212,235,190,0.22)"
                      stroke="#d4ebbe"
                      strokeWidth="1.6"
                    />
                  </svg>
                </div>
                <div className="sf-phone__footer-bar">
                  <span>SQUAD ROSTER</span>
                  <strong>4 / 4 ONLINE</strong>
                </div>
              </div>
            </div>
          </div>
        );

      case 'marvel-website':
        return (
          <div className="sf-media-scene sf-media-scene--marvel">
            <div className="sf-media-scene__sky" />
            <div className="sf-media-scene__beams" />
            <div className="sf-media-scene__grid" />

            <div className="sf-mockup-stage">
              <div className="sf-browser">
                <div className="sf-browser__bar">
                  <div className="sf-browser__dots">
                    <span />
                    <span />
                    <span />
                  </div>
                  <span className="sf-browser__url">marvel.editorial.experience</span>
                  <span className="sf-browser__vp">1440 PX</span>
                </div>

                <div className="sf-browser__body">
                  <div className="sf-browser__hero">
                    <div className="sf-browser__copy">
                      <span className="sf-browser__eyebrow">INTERACTIVE ANTHOLOGY · VOL. IV</span>
                      <h4>Multiverse Visual Chronicle</h4>
                      <p>
                        Responsive editorial grid with frame-accurate scroll transitions and
                        character dossiers.
                      </p>
                      <div className="sf-browser__metrics">
                        <span>60 FPS MOTION</span>
                        <span>·</span>
                        <span>12-COL SWISS GRID</span>
                      </div>
                    </div>

                    <div className="sf-browser__panels">
                      <div className="sf-comic-panel sf-comic-panel--tall">
                        <span>01</span>
                        <strong>ORIGIN ARC</strong>
                      </div>
                      <div className="sf-comic-panel">
                        <span>02</span>
                        <strong>TIMELINE</strong>
                      </div>
                      <div className="sf-comic-panel">
                        <span>03</span>
                        <strong>ARCHIVE</strong>
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
            <div className="sf-media-scene__sky" />
            <div className="sf-media-scene__beams" />
            <div className="sf-media-scene__grid" />

            <div className="sf-mockup-stage sf-mockup-stage--trio">
              <div className="sf-ui-card sf-ui-card--light">
                <div className="sf-ui-card__top">
                  <span>FOUNDER NETWORK</span>
                  <span>VERIFIED</span>
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

              <div className="sf-ui-card sf-ui-card--dark">
                <div className="sf-ui-card__top">
                  <span>MENTOR SESSION</span>
                  <span>16:00 IST</span>
                </div>
                <h4>Product Architecture Critique</h4>
                <div className="sf-ui-card__metrics">
                  <div>
                    <span>DECK CLARITY</span>
                    <strong>96%</strong>
                  </div>
                  <div>
                    <span>COHORT</span>
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
            <div className="sf-media-scene__sky" />
            <div className="sf-media-scene__beams" />
            <div className="sf-media-scene__grid" />

            <div className="sf-mockup-stage">
              <div className="sf-print-spread">
                <div className="sf-poster-card sf-poster-card--main">
                  <div className="sf-poster-card__head">
                    <span>VISHNU MULTISPECIALITY HOSPITAL</span>
                    <span>ONCOLOGY</span>
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
                  <span className="sf-poster-card__label">PATIENT CARE SYSTEM</span>
                  <h5>Empathetic typography &amp; high-contrast wayfinding</h5>
                  <div className="sf-poster-card__swatches">
                    <span className="sf-swatch sf-swatch--1" />
                    <span className="sf-swatch sf-swatch--2" />
                    <span className="sf-swatch sf-swatch--3" />
                  </div>
                  <span className="sf-poster-card__meta">PRINT · OUTDOOR · SOCIAL</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'bairava-motors':
        return (
          <div className="sf-media-scene sf-media-scene--motors">
            <div className="sf-media-scene__sky" />
            <div className="sf-media-scene__beams" />
            <div className="sf-media-scene__grid" />

            <div className="sf-mockup-stage">
              <div className="sf-billboard">
                <div className="sf-billboard__header">
                  <span>BAIRAVA MOTORS · CAMPAIGN</span>
                  <span>SERIES 05 / PRINT</span>
                </div>
                <div className="sf-billboard__main">
                  <div className="sf-billboard__title-col">
                    <span className="sf-billboard__kicker">ENGINEERED MOTION</span>
                    <h4>Precision Built For Every Road.</h4>
                    <p>Showroom launch identity, seasonal print flyers, and high-impact hoardings.</p>
                  </div>
                  <div className="sf-billboard__graphic">
                    <svg viewBox="0 0 220 110" className="sf-speed-svg" aria-hidden="true">
                      <path
                        d="M16 84 C55 28, 135 28, 204 84"
                        fill="none"
                        stroke="rgba(255,255,255,0.22)"
                        strokeWidth="2"
                      />
                      <path
                        d="M32 84 C68 42, 132 42, 188 84"
                        fill="none"
                        stroke="#e6ece4"
                        strokeWidth="2.5"
                      />
                      <circle cx="62" cy="84" r="14" fill="none" stroke="#ffffff" strokeWidth="2.2" />
                      <circle cx="158" cy="84" r="14" fill="none" stroke="#ffffff" strokeWidth="2.2" />
                      <line x1="10" y1="98" x2="210" y2="98" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
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
            <div className="sf-media-scene__sky" />
            <div className="sf-media-scene__beams" />
            <div className="sf-media-scene__grid" />

            <div className="sf-mockup-stage">
              <div className="sf-booklet">
                <div className="sf-booklet__page sf-booklet__page--left">
                  <span className="sf-booklet__folio">01 · CORPORATE</span>
                  <h4>OEL Global Supply Chain</h4>
                  <p>
                    24-page editorial monograph covering sea freight, air cargo corridors, and
                    customs clearance protocols.
                  </p>
                  <div className="sf-booklet__specs">
                    <span>SEA</span>
                    <span>·</span>
                    <span>AIR CARGO</span>
                    <span>·</span>
                    <span>CUSTOMS</span>
                  </div>
                </div>

                <div className="sf-booklet__page sf-booklet__page--right">
                  <span className="sf-booklet__folio">02 · TELEMETRY</span>
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
                      <span>PORTS</span>
                      <strong>48+</strong>
                    </div>
                    <div>
                      <span>PAGES</span>
                      <strong>24 PP</strong>
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

      {/* Unobtrusive bottom-right Case Study pill (never overlaps top mockup headers) */}
      <div className="sf-media-slide__corner-badge">
        <span className="sf-media-slide__action">
          <span>Case Study</span>
          <ArrowUpRight size={13} />
        </span>
      </div>
    </div>
  );
};
