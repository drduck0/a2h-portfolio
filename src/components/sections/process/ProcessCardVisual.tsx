/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ProcessStep } from '../../../types/portfolio';

interface ProcessCardVisualProps {
  step: ProcessStep;
  index: number;
}

export const ProcessCardVisual: React.FC<ProcessCardVisualProps> = ({ step, index }) => {
  const renderScene = () => {
    switch (index) {
      case 0:
        // Step 01: Discover — Sunlit Studio Moodboard & Creative Direction Atelier
        return (
          <div className="sf-proc-scene sf-proc-scene--discover">
            <div className="sf-proc-scene__sunlight" />
            <div className="sf-proc-scene__window-blinds" />
            <div className="sf-proc-scene__frame" />

            <div className="sf-proc-stage">
              <div className="sf-proc-atelier">
                <div className="sf-proc-panel sf-proc-panel--ivory">
                  <div className="sf-proc-panel__head">
                    <span>01 · VISION BRIEF</span>
                    <span>DIRECTIONAL STUDY</span>
                  </div>

                  <div className="sf-proc-swatches">
                    <div className="sf-proc-swatch sf-proc-swatch--ink">
                      <span>INK</span>
                      <small>#0B0D0B</small>
                    </div>
                    <div className="sf-proc-swatch sf-proc-swatch--olive">
                      <span>OLIVE</span>
                      <small>#141714</small>
                    </div>
                    <div className="sf-proc-swatch sf-proc-swatch--sage">
                      <span>SAGE</span>
                      <small>#D4EBBE</small>
                    </div>
                    <div className="sf-proc-swatch sf-proc-swatch--stone">
                      <span>STONE</span>
                      <small>#EAEDEA</small>
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
                    <span>FIGJAM</span>
                    <span>·</span>
                    <span>MILANOTE</span>
                    <span>·</span>
                    <span>CONCEPT MATRIX</span>
                  </div>
                </div>

                <div className="sf-proc-panel sf-proc-panel--dark-float">
                  <div className="sf-proc-panel__head">
                    <span>TYPE &amp; PROPORTION</span>
                    <span>GOLDEN RATIO</span>
                  </div>
                  <div className="sf-proc-type-specimen">
                    <span className="sf-proc-type-aa">Aa</span>
                    <div className="sf-proc-type-meta">
                      <strong>Editorial &amp; Geometric</strong>
                      <span> Scale 1.250 · Tight Tracking</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 1:
        // Step 02: Research — User Journey Mapping & Information Architecture
        return (
          <div className="sf-proc-scene sf-proc-scene--research">
            <div className="sf-proc-scene__sunlight" />
            <div className="sf-proc-scene__window-blinds" />
            <div className="sf-proc-scene__frame" />

            <div className="sf-proc-stage">
              <div className="sf-proc-blueprint">
                <div className="sf-proc-panel sf-proc-panel--dark">
                  <div className="sf-proc-panel__head">
                    <span>02 · ARCHITECTURE MAP</span>
                    <span>USER FLOWS</span>
                  </div>

                  <div className="sf-proc-flow-canvas">
                    <svg
                      viewBox="0 0 320 130"
                      className="sf-proc-flow-svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M44 65 C 96 65, 96 28, 156 28 C 216 28, 216 65, 276 65"
                        fill="none"
                        stroke="rgba(212, 235, 190, 0.75)"
                        strokeWidth="2"
                      />
                      <path
                        d="M44 65 C 96 65, 96 102, 156 102 C 216 102, 216 65, 276 65"
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.24)"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                      />
                      <circle cx="44" cy="65" r="8" fill="#d4ebbe" />
                      <circle cx="156" cy="28" r="7" fill="#ffffff" />
                      <circle cx="156" cy="102" r="6" fill="rgba(255,255,255,0.45)" />
                      <circle cx="276" cy="65" r="8" fill="#d4ebbe" />
                    </svg>

                    <div className="sf-proc-flow-labels">
                      <span>ENTRY INTENT</span>
                      <span>DISCOVERY PATH</span>
                      <span>CORE CONVERSION</span>
                    </div>
                  </div>

                  <div className="sf-proc-metrics-strip">
                    <div>
                      <span>PERSONAS</span>
                      <strong>04 Archetypes</strong>
                    </div>
                    <div>
                      <span>AUDIT</span>
                      <strong>12 Competitors</strong>
                    </div>
                    <div>
                      <span>FRICTION</span>
                      <strong>-64% Dropoff</strong>
                    </div>
                  </div>
                </div>

                <div className="sf-proc-panel sf-proc-panel--ivory-compact">
                  <div className="sf-proc-panel__head">
                    <span>SYNTHESIS</span>
                    <span>MAZE · MIRO</span>
                  </div>
                  <h5>Behavioral Insights &amp; Sitemap Hierarchy</h5>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        // Step 03: Design — Visual Systems, Grids & Interactive Prototyping
        return (
          <div className="sf-proc-scene sf-proc-scene--design">
            <div className="sf-proc-scene__sunlight" />
            <div className="sf-proc-scene__window-blinds" />
            <div className="sf-proc-scene__frame" />

            <div className="sf-proc-stage">
              <div className="sf-proc-canvas-window">
                <div className="sf-proc-canvas-window__bar">
                  <div className="sf-proc-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                  <span className="sf-proc-canvas-window__title">
                    design-system.tokens · 12-Col Grid
                  </span>
                  <span className="sf-proc-canvas-window__tag">FIGMA</span>
                </div>

                <div className="sf-proc-canvas-window__body">
                  <div className="sf-proc-wire-grid">
                    <div className="sf-proc-wire-card sf-proc-wire-card--hero">
                      <span className="sf-proc-wire-kicker">COMPONENT LIBRARY · V3.0</span>
                      <h4>Modular Interface Architecture</h4>
                      <p>
                        Auto-layout primitives, semantic color tokens, and responsive breakpoints.
                      </p>
                      <div className="sf-proc-wire-pills">
                        <span>8PT SPATIAL MATH</span>
                        <span>·</span>
                        <span>RADIUS 22PX</span>
                      </div>
                    </div>

                    <div className="sf-proc-wire-col">
                      <div className="sf-proc-wire-box">
                        <span>SURFACE CONTRAST</span>
                        <strong>AAA · 14.8:1</strong>
                      </div>
                      <div className="sf-proc-wire-box sf-proc-wire-box--accent">
                        <span>PROTOTYPE STATES</span>
                        <strong>36 Interactive Flows</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        // Step 04: Refine — Micro-Interactions, Easing Physics & Validation
        return (
          <div className="sf-proc-scene sf-proc-scene--refine">
            <div className="sf-proc-scene__sunlight" />
            <div className="sf-proc-scene__window-blinds" />
            <div className="sf-proc-scene__frame" />

            <div className="sf-proc-stage">
              <div className="sf-proc-motion-lab">
                <div className="sf-proc-panel sf-proc-panel--dark">
                  <div className="sf-proc-panel__head">
                    <span>04 · MOTION CHOREOGRAPHY</span>
                    <span>CUBIC-BEZIER(0.16, 1, 0.3, 1)</span>
                  </div>

                  <div className="sf-proc-curve-box">
                    <svg
                      viewBox="0 0 280 120"
                      className="sf-proc-curve-svg"
                      aria-hidden="true"
                    >
                      <line
                        x1="28"
                        y1="100"
                        x2="252"
                        y2="20"
                        stroke="rgba(255,255,255,0.12)"
                        strokeWidth="1"
                        strokeDasharray="3 3"
                      />
                      <line
                        x1="28"
                        y1="100"
                        x2="74"
                        y2="20"
                        stroke="rgba(212,235,190,0.45)"
                        strokeWidth="1.2"
                      />
                      <line
                        x1="252"
                        y1="20"
                        x2="118"
                        y2="20"
                        stroke="rgba(212,235,190,0.45)"
                        strokeWidth="1.2"
                      />
                      <path
                        d="M 28 100 C 74 20, 118 20, 252 20"
                        fill="none"
                        stroke="#d4ebbe"
                        strokeWidth="2.5"
                      />
                      <circle cx="74" cy="20" r="4.5" fill="#d4ebbe" />
                      <circle cx="118" cy="20" r="4.5" fill="#ffffff" />
                      <circle cx="28" cy="100" r="5" fill="#ffffff" />
                      <circle cx="252" cy="20" r="5" fill="#d4ebbe" />
                    </svg>
                  </div>

                  <div className="sf-proc-metrics-strip">
                    <div>
                      <span>FRAME BUDGET</span>
                      <strong>16.6 ms (60fps)</strong>
                    </div>
                    <div>
                      <span>SETTLING</span>
                      <strong>180 ms Ease</strong>
                    </div>
                    <div>
                      <span>WCAG AUDIT</span>
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
        // Step 05: Deliver — Production Handoff & Crystal Horizon Launch
        return (
          <div className="sf-proc-scene sf-proc-scene--deliver">
            <div className="sf-proc-scene__sunlight" />
            <div className="sf-proc-scene__window-blinds" />
            <div className="sf-proc-scene__frame" />

            <div className="sf-proc-stage">
              <div className="sf-proc-handoff">
                <div className="sf-proc-panel sf-proc-panel--ivory">
                  <div className="sf-proc-panel__head">
                    <span>05 · PRODUCTION RELEASE</span>
                    <span>READY FOR LAUNCH</span>
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
                      <strong>VERIFIED</strong>
                    </div>
                    <div className="sf-proc-check-row">
                      <span>02 · Multi-Resolution Asset Kit</span>
                      <strong>EXPORTED</strong>
                    </div>
                    <div className="sf-proc-check-row">
                      <span>03 · Visual QA &amp; Launch Sign-Off</span>
                      <strong>100% CLARITY</strong>
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
        <span>{(step.shortTitle || step.title).toUpperCase()}</span>
      </div>
    </div>
  );
};
