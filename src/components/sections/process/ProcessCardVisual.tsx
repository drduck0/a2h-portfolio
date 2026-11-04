/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ASSETS } from '../../../constants/assets';
import { ProcessStep } from '../../../types/portfolio';

interface ProcessCardVisualProps {
  step: ProcessStep;
  index: number;
}

export const ProcessCardVisual: React.FC<ProcessCardVisualProps> = ({ step, index }) => {
  const renderMeadowBackdrop = (stepIdx: number) => (
    <div className={`sf-proc-backdrop sf-proc-backdrop--s${stepIdx + 1}`} aria-hidden="true">
      <img
        src={ASSETS.HERO_POSTER}
        alt=""
        className="sf-proc-backdrop__img"
        referrerPolicy="no-referrer"
      />
      <div className="sf-proc-backdrop__sky-tint" />
      <img
        src={stepIdx % 2 === 0 ? ASSETS.CLOUD_B : ASSETS.CLOUD_A}
        alt=""
        className="sf-proc-backdrop__cloud"
        referrerPolicy="no-referrer"
      />
      {stepIdx === 4 && (
        <img
          src={ASSETS.TREE}
          alt=""
          className="sf-proc-backdrop__tree"
          referrerPolicy="no-referrer"
        />
      )}
      <div className="sf-proc-backdrop__gloss" />
    </div>
  );

  const renderScene = () => {
    switch (index) {
      case 0:
        // Step 01: Discover — Glossy Frosted Moodboard & Vision Atelier over Sunlit Meadow
        return (
          <div className="sf-proc-scene sf-proc-scene--discover">
            {renderMeadowBackdrop(0)}

            <div className="sf-proc-stage">
              <div className="sf-proc-atelier">
                <div className="sf-proc-glass-lip" aria-hidden="true" />
                <div className="sf-proc-panel sf-proc-panel--glossy">
                  <div className="sf-proc-panel__head">
                    <span>01 · Creative Vision Brief</span>
                    <span>Directional Study</span>
                  </div>

                  <div className="sf-proc-swatches">
                    <div className="sf-proc-swatch sf-proc-swatch--sky">
                      <span>Sky</span>
                      <small>#87B8E6</small>
                    </div>
                    <div className="sf-proc-swatch sf-proc-swatch--meadow">
                      <span>Meadow</span>
                      <small>#5C800E</small>
                    </div>
                    <div className="sf-proc-swatch sf-proc-swatch--sage">
                      <span>Sage</span>
                      <small>#D4EBBE</small>
                    </div>
                    <div className="sf-proc-swatch sf-proc-swatch--glass">
                      <span>Glass</span>
                      <small>#F4F7F0</small>
                    </div>
                  </div>

                  <div className="sf-proc-panel__body">
                    <h4>Moodboard &amp; Aesthetic Foundations</h4>
                    <p>
                      Aligning brand intent, emotional resonance, and spatial proportion before
                      interface geometry begins.
                    </p>
                  </div>

                  <div className="sf-proc-panel__foot">
                    <span>FigJam</span>
                    <span>·</span>
                    <span>Milanote</span>
                    <span>·</span>
                    <span>Concept Matrix</span>
                  </div>
                </div>

                <div className="sf-proc-panel sf-proc-panel--glossy-float">
                  <div className="sf-proc-panel__head">
                    <span>Typography &amp; Scale</span>
                    <span>20% → 100% Clarity</span>
                  </div>
                  <div className="sf-proc-type-specimen">
                    <span className="sf-proc-type-aa">Aa</span>
                    <div className="sf-proc-type-meta">
                      <strong>Clean Geometric &amp; Humanist</strong>
                      <span>Balanced Hierarchy · High Contrast</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 1:
        // Step 02: Research — Glossy User Journey Mapping & Information Architecture
        return (
          <div className="sf-proc-scene sf-proc-scene--research">
            {renderMeadowBackdrop(1)}

            <div className="sf-proc-stage">
              <div className="sf-proc-blueprint">
                <div className="sf-proc-glass-lip" aria-hidden="true" />
                <div className="sf-proc-panel sf-proc-panel--glossy">
                  <div className="sf-proc-panel__head">
                    <span>02 · Architecture Map</span>
                    <span>User Flows</span>
                  </div>

                  <div className="sf-proc-flow-canvas">
                    <svg
                      viewBox="0 0 320 120"
                      className="sf-proc-flow-svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M44 60 C 96 60, 96 24, 156 24 C 216 24, 216 60, 276 60"
                        fill="none"
                        stroke="#2a3410"
                        strokeWidth="2.2"
                      />
                      <path
                        d="M44 60 C 96 60, 96 96, 156 96 C 216 96, 216 60, 276 60"
                        fill="none"
                        stroke="rgba(11, 13, 11, 0.25)"
                        strokeWidth="1.6"
                        strokeDasharray="4 4"
                      />
                      <circle cx="44" cy="60" r="7.5" fill="#0b0d0b" />
                      <circle cx="156" cy="24" r="6.5" fill="#4d6a10" />
                      <circle cx="156" cy="96" r="5.5" fill="rgba(11,13,11,0.4)" />
                      <circle cx="276" cy="60" r="7.5" fill="#0b0d0b" />
                    </svg>

                    <div className="sf-proc-flow-labels">
                      <span>Entry Intent</span>
                      <span>Discovery Path</span>
                      <span>Core Action</span>
                    </div>
                  </div>

                  <div className="sf-proc-metrics-strip">
                    <div>
                      <span>Personas</span>
                      <strong>04 Archetypes</strong>
                    </div>
                    <div>
                      <span>Audit</span>
                      <strong>12 Benchmarks</strong>
                    </div>
                    <div>
                      <span>Clarity</span>
                      <strong>+64% Flow</strong>
                    </div>
                  </div>
                </div>

                <div className="sf-proc-panel sf-proc-panel--glossy-float">
                  <div className="sf-proc-panel__head">
                    <span>Synthesis</span>
                    <span>Maze · Miro</span>
                  </div>
                  <h5>Behavioral Insights &amp; Sitemap Hierarchy</h5>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        // Step 03: Design — Glossy Visual Systems, Grids & Interactive Prototyping
        return (
          <div className="sf-proc-scene sf-proc-scene--design">
            {renderMeadowBackdrop(2)}

            <div className="sf-proc-stage">
              <div className="sf-proc-atelier">
                <div className="sf-proc-glass-lip" aria-hidden="true" />
                <div className="sf-proc-canvas-window">
                  <div className="sf-proc-canvas-window__bar">
                    <div className="sf-proc-dots">
                      <span />
                      <span />
                      <span />
                    </div>
                    <span className="sf-proc-canvas-window__title">
                      Design System · 12-Column Grid
                    </span>
                    <span className="sf-proc-canvas-window__tag">Figma</span>
                  </div>

                  <div className="sf-proc-canvas-window__body">
                    <div className="sf-proc-wire-grid">
                      <div className="sf-proc-wire-card--hero">
                        <span className="sf-proc-wire-kicker">Component Library · v3.0</span>
                        <h4>Modular Interface Architecture</h4>
                        <p>
                          Auto-layout primitives, semantic glass tokens, and responsive breakpoints.
                        </p>
                        <div className="sf-proc-wire-pills">
                          <span>8pt Spatial Math</span>
                          <span>·</span>
                          <span>Radius 22px</span>
                        </div>
                      </div>

                      <div className="sf-proc-wire-col">
                        <div className="sf-proc-wire-box">
                          <span>Surface Contrast</span>
                          <strong>AAA · 14.8:1</strong>
                        </div>
                        <div className="sf-proc-wire-box sf-proc-wire-box--accent">
                          <span>Prototype Flows</span>
                          <strong>36 Interactive</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        // Step 04: Refine — Glossy Micro-Interactions, Easing Physics & Validation
        return (
          <div className="sf-proc-scene sf-proc-scene--refine">
            {renderMeadowBackdrop(3)}

            <div className="sf-proc-stage">
              <div className="sf-proc-motion-lab">
                <div className="sf-proc-glass-lip" aria-hidden="true" />
                <div className="sf-proc-panel sf-proc-panel--glossy">
                  <div className="sf-proc-panel__head">
                    <span>04 · Motion Choreography</span>
                    <span>Smooth Settling Curve</span>
                  </div>

                  <div className="sf-proc-curve-box">
                    <svg
                      viewBox="0 0 280 112"
                      className="sf-proc-curve-svg"
                      aria-hidden="true"
                    >
                      <line
                        x1="28"
                        y1="94"
                        x2="252"
                        y2="18"
                        stroke="rgba(11,13,11,0.14)"
                        strokeWidth="1"
                        strokeDasharray="3 3"
                      />
                      <line
                        x1="28"
                        y1="94"
                        x2="74"
                        y2="18"
                        stroke="rgba(77,106,16,0.45)"
                        strokeWidth="1.4"
                      />
                      <line
                        x1="252"
                        y1="18"
                        x2="118"
                        y2="18"
                        stroke="rgba(77,106,16,0.45)"
                        strokeWidth="1.4"
                      />
                      <path
                        d="M 28 94 C 74 18, 118 18, 252 18"
                        fill="none"
                        stroke="#0b0d0b"
                        strokeWidth="2.6"
                      />
                      <circle cx="74" cy="18" r="4.5" fill="#4d6a10" />
                      <circle cx="118" cy="18" r="4.5" fill="#4d6a10" />
                      <circle cx="28" cy="94" r="5" fill="#0b0d0b" />
                      <circle cx="252" cy="18" r="5" fill="#0b0d0b" />
                    </svg>
                  </div>

                  <div className="sf-proc-metrics-strip">
                    <div>
                      <span>Frame Budget</span>
                      <strong>16.6 ms (60fps)</strong>
                    </div>
                    <div>
                      <span>Settling</span>
                      <strong>180 ms Ease</strong>
                    </div>
                    <div>
                      <span>WCAG Audit</span>
                      <strong>100% Passed</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
      default:
        // Step 05: Deliver — Glossy Production Handoff & Crystal Meadow Horizon Launch
        return (
          <div className="sf-proc-scene sf-proc-scene--deliver">
            {renderMeadowBackdrop(4)}

            <div className="sf-proc-stage">
              <div className="sf-proc-handoff">
                <div className="sf-proc-glass-lip" aria-hidden="true" />
                <div className="sf-proc-panel sf-proc-panel--glossy">
                  <div className="sf-proc-panel__head">
                    <span>05 · Production Release</span>
                    <span>100% Clarity</span>
                  </div>

                  <div className="sf-proc-panel__body">
                    <h4>Complete Design System &amp; Spec Handoff</h4>
                    <p>
                      Annotated component architecture, CSS token variables, and print-ready brand
                      collateral verified across every viewport.
                    </p>
                  </div>

                  <div className="sf-proc-checklist">
                    <div className="sf-proc-check-row">
                      <span>01 · Design Tokens &amp; Dev Specs</span>
                      <strong>Verified</strong>
                    </div>
                    <div className="sf-proc-check-row">
                      <span>02 · Multi-Resolution Asset Kit</span>
                      <strong>Exported</strong>
                    </div>
                    <div className="sf-proc-check-row">
                      <span>03 · Visual QA &amp; Launch Sign-Off</span>
                      <strong>Ready</strong>
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
    <div className="sf-proc-card__visual" aria-label={step.title}>
      {renderScene()}
      <div className="sf-proc-card__corner-num" aria-hidden="true">
        <span>{step.stepNumber}</span>
        <span>·</span>
        <span>{step.shortTitle || step.title}</span>
      </div>
    </div>
  );
};
