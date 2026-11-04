/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import { PROCESS_STEPS } from '../../../constants/portfolioData';
import { ProcessCardVisual } from './ProcessCardVisual';

interface ProcessSectionProps {
  onInquire?: () => void;
}

function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function easeInOutCubic(x: number): number {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

function easeOutCubic(x: number): number {
  return 1 - Math.pow(1 - x, 3);
}

interface KeyframePoint {
  rel: number;
  cxRatio: number;
  cyRatio: number;
  scale: number;
  opacity: number;
}

const DESKTOP_SPLINE: KeyframePoint[] = [
  { rel: -1.18, cxRatio: 0.175, cyRatio: -0.04, scale: 0.14, opacity: 0 },
  { rel: -0.85, cxRatio: 0.205, cyRatio: 0.115, scale: 0.22, opacity: 1 },
  { rel: -0.5, cxRatio: 0.285, cyRatio: 0.265, scale: 0.46, opacity: 1 },
  { rel: 0.0, cxRatio: 0.455, cyRatio: 0.5, scale: 1.0, opacity: 1 },
  { rel: 0.5, cxRatio: 0.525, cyRatio: 0.615, scale: 0.84, opacity: 1 },
  { rel: 1.0, cxRatio: 0.755, cyRatio: 0.835, scale: 0.275, opacity: 1 },
  { rel: 1.3, cxRatio: 0.785, cyRatio: 0.93, scale: 0.19, opacity: 0.35 },
  { rel: 1.55, cxRatio: 0.81, cyRatio: 1.04, scale: 0.13, opacity: 0 },
];

const MOBILE_SPLINE: KeyframePoint[] = [
  { rel: -1.15, cxRatio: 0.16, cyRatio: 0.02, scale: 0.14, opacity: 0 },
  { rel: -0.85, cxRatio: 0.2, cyRatio: 0.1, scale: 0.22, opacity: 1 },
  { rel: -0.5, cxRatio: 0.32, cyRatio: 0.2, scale: 0.48, opacity: 1 },
  { rel: 0.0, cxRatio: 0.5, cyRatio: 0.36, scale: 1.0, opacity: 1 },
  { rel: 0.5, cxRatio: 0.58, cyRatio: 0.52, scale: 0.78, opacity: 1 },
  { rel: 1.0, cxRatio: 0.82, cyRatio: 0.89, scale: 0.24, opacity: 1 },
  { rel: 1.35, cxRatio: 0.86, cyRatio: 1.02, scale: 0.16, opacity: 0 },
];

function sampleSpline(rel: number, points: KeyframePoint[]) {
  if (rel <= points[0].rel) {
    return { ...points[0] };
  }
  const last = points[points.length - 1];
  if (rel >= last.rel) {
    return { ...last };
  }
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    if (rel >= p0.rel && rel <= p1.rel) {
      const span = Math.max(0.0001, p1.rel - p0.rel);
      const u = (rel - p0.rel) / span;
      return {
        rel,
        cxRatio: lerp(p0.cxRatio, p1.cxRatio, u),
        cyRatio: lerp(p0.cyRatio, p1.cyRatio, u),
        scale: lerp(p0.scale, p1.scale, u),
        opacity: lerp(p0.opacity, p1.opacity, u),
      };
    }
  }
  return { ...last };
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onInquire }) => {
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);
  const [inCarouselPhase, setInCarouselPhase] = useState<boolean>(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const introBlockRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardInnerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const fullOverlayRef = useRef<HTMLDivElement | null>(null);
  const textBlockRefs = useRef<(HTMLElement | null)[]>([]);

  const animStateRef = useRef({
    currentT: 0,
    targetT: 0,
    rafId: 0 as number,
    lastStepIdx: 0,
    lastCarouselFlag: false,
  });

  const totalSteps = PROCESS_STEPS.length; // 5 steps
  const totalTimelineUnits = totalSteps + 1; // 6.0 units (0..2 = intro+fullscreen+contract, 2..6 = 5 cards)

  const applyTransforms = useCallback(
    (t: number) => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const isMobile = vw <= 900;

      // 1. Background color transition (#ffffff during intro/fullscreen -> #eaedea during 5-step carousel)
      const bgMix = easeInOutCubic(clamp((t - 1.32) / 0.56, 0, 1));
      if (stickyRef.current) {
        const r = Math.round(lerp(255, 234, bgMix));
        const g = Math.round(lerp(255, 237, bgMix));
        const b = Math.round(lerp(255, 234, bgMix));
        stickyRef.current.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
      }

      // 2. Centered Intro Headline ("Not every idea / starts in focus.")
      if (introBlockRef.current) {
        const introMove = easeInOutCubic(clamp(t / 0.56, 0, 1));
        const introFade = 1 - easeOutCubic(clamp((t - 0.14) / 0.4, 0, 1));
        const yOffset = -introMove * (isMobile ? 95 : 135);
        const scaleVal = 1 - introMove * 0.04;
        introBlockRef.current.style.transform = `translate3d(-50%, calc(-50% + ${yOffset}px), 0) scale(${scaleVal})`;
        introBlockRef.current.style.opacity = `${introFade}`;
        introBlockRef.current.style.pointerEvents = introFade > 0.2 ? 'auto' : 'none';
      }

      // 3. Base dimensions for the 1:1 Center Stage Square Card
      const centerSide = isMobile
        ? Math.round(Math.min(vw * 0.84, vh * 0.39, 380))
        : Math.round(Math.min(vw * 0.4, vh * 0.75, 570));

      const spline = isMobile ? MOBILE_SPLINE : DESKTOP_SPLINE;
      const centerPoint = sampleSpline(0, spline);
      const centerX = vw * centerPoint.cxRatio;
      const centerY = vh * centerPoint.cyRatio;

      // Continuous step index s (0.0 to 4.0) once t >= 2.0
      const rawStep = clamp(t - 2.0, 0, Math.max(0, totalSteps - 1));
      const k = Math.min(totalSteps - 2, Math.max(0, Math.floor(rawStep)));
      const localP = rawStep - k;
      const uStep = clamp((localP - 0.07) / 0.86, 0, 1);
      const s = t < 2.0 ? 0 : k + easeInOutCubic(uStep);

      const roundedStep = Math.round(s);
      if (animStateRef.current.lastStepIdx !== roundedStep) {
        animStateRef.current.lastStepIdx = roundedStep;
        setActiveStepIdx(roundedStep);
      }

      const isCarouselNow = t >= 1.55;
      if (animStateRef.current.lastCarouselFlag !== isCarouselNow) {
        animStateRef.current.lastCarouselFlag = isCarouselNow;
        setInCarouselPhase(isCarouselNow);
      }

      // 4. Fullscreen Bottom-Left Overlay Headline inside Card 01 (Frame 00:03)
      if (fullOverlayRef.current) {
        const overlayIn = easeOutCubic(clamp((t - 0.78) / 0.28, 0, 1));
        const overlayOut = 1 - easeInOutCubic(clamp((t - 1.28) / 0.24, 0, 1));
        const alpha = overlayIn * overlayOut;
        const yPx = (1 - overlayIn) * 24 - (1 - overlayOut) * 14;
        fullOverlayRef.current.style.opacity = `${alpha}`;
        fullOverlayRef.current.style.transform = `translate3d(0, ${yPx}px, 0)`;
      }

      // 5. Position all 5 Process Cards
      for (let i = 0; i < totalSteps; i++) {
        const cardEl = cardRefs.current[i];
        const innerEl = cardInnerRefs.current[i];
        if (!cardEl) continue;

        // CRITICAL: Prevent any subsequent cards (i >= 1) from peeking prematurely
        // during the intro headline and Card 01 fullscreen expansion phases
        if (t < 1.48 && i > 0) {
          cardEl.style.opacity = '0';
          cardEl.style.visibility = 'hidden';
          cardEl.style.pointerEvents = 'none';
          continue;
        }

        if (i === 0 && t < 2.0) {
          // Card 01 special choreography: Rise (00:01) -> Fullscreen 16:9 (00:02-00:03) -> Contract to Center Square (00:04)
          const initW = isMobile ? Math.round(vw * 0.82) : Math.round(Math.min(vw * 0.45, 620));
          const initH = isMobile ? Math.round(vh * 0.36) : Math.round(Math.min(vh * 0.52, 430));
          const fullW = isMobile ? vw - 20 : vw - 36;
          const fullH = isMobile ? vh - 54 : vh - 54;

          let cx = vw * 0.5;
          let cy = vh * 0.52;
          let w = initW;
          let h = initH;
          let opacity = 1;
          let radius = 24;

          if (t < 0.48) {
            const uRise = easeOutCubic(clamp((t - 0.06) / 0.42, 0, 1));
            cx = vw * 0.5;
            cy = lerp(vh * 0.94, vh * 0.54, uRise);
            w = initW;
            h = initH;
            opacity = clamp((t - 0.05) / 0.18, 0, 1);
            radius = 22;
          } else if (t < 1.32) {
            const uExpand = easeInOutCubic(clamp((t - 0.48) / 0.56, 0, 1));
            cx = vw * 0.5;
            cy = lerp(vh * 0.54, vh * 0.515, uExpand);
            w = lerp(initW, fullW, uExpand);
            h = lerp(initH, fullH, uExpand);
            opacity = 1;
            radius = lerp(22, 26, uExpand);
          } else {
            const uContract = easeInOutCubic(clamp((t - 1.32) / 0.68, 0, 1));
            cx = lerp(vw * 0.5, centerX, uContract);
            cy = lerp(vh * 0.515, centerY, uContract);
            w = lerp(fullW, centerSide, uContract);
            h = lerp(fullH, centerSide, uContract);
            opacity = 1;
            radius = lerp(26, 24, uContract);
          }

          const leftPx = cx - w / 2;
          const topPx = cy - h / 2;

          cardEl.style.width = `${w}px`;
          cardEl.style.height = `${h}px`;
          cardEl.style.borderRadius = `${radius}px`;
          cardEl.style.transform = `translate3d(${leftPx}px, ${topPx}px, 0) scale3d(1, 1, 1)`;
          cardEl.style.opacity = `${opacity}`;
          cardEl.style.visibility = opacity < 0.01 ? 'hidden' : 'visible';
          cardEl.style.zIndex = '22';
          cardEl.style.pointerEvents = opacity > 0.5 ? 'auto' : 'none';

          if (innerEl) {
            innerEl.style.transform = 'scale(1)';
          }
        } else {
          // Standard 3-slot diagonal spline choreography (Bottom-Right -> Center -> Top-Left)
          let effectiveRel = i - s;
          let enterMultiplier = 1;

          if (t < 2.0) {
            // Before t = 2.0, Card 02 (i = 1) smoothly enters Bottom-Right thumbnail slot as Card 01 contracts
            const preProgress = clamp((t - 1.48) / 0.52, 0, 1);
            const preEnter = 1 - easeOutCubic(preProgress);
            effectiveRel = i + preEnter * 0.55;
            enterMultiplier = easeOutCubic(preProgress);
          }

          const sampled = sampleSpline(effectiveRel, spline);
          const cx = vw * sampled.cxRatio;
          const cy = vh * sampled.cyRatio;
          const scale = sampled.scale;
          const finalOpacity = sampled.opacity * enterMultiplier;

          const leftPx = cx - centerSide / 2;
          const topPx = cy - centerSide / 2;

          // Keep apparent corner radius proportional even when scaled down into a thumbnail
          const compensatedRadius = Math.round(clamp(24 / Math.max(0.22, scale), 24, 52));
          const zIdx = Math.round(30 - Math.abs(effectiveRel) * 10);

          cardEl.style.width = `${centerSide}px`;
          cardEl.style.height = `${centerSide}px`;
          cardEl.style.borderRadius = `${compensatedRadius}px`;
          cardEl.style.transform = `translate3d(${leftPx}px, ${topPx}px, 0) scale3d(${scale}, ${scale}, 1)`;
          cardEl.style.opacity = `${finalOpacity.toFixed(3)}`;
          cardEl.style.visibility = finalOpacity < 0.01 ? 'hidden' : 'visible';
          cardEl.style.zIndex = `${zIdx}`;
          cardEl.style.pointerEvents = finalOpacity > 0.35 && effectiveRel <= 1.2 ? 'auto' : 'none';

          if (innerEl) {
            innerEl.style.transform = 'scale(1)';
          }
        }
      }

      // 6. Right-Side Editorial Step Text Column (00:04 -> 00:07)
      const stageReveal = easeOutCubic(clamp((t - 1.52) / 0.45, 0, 1));
      for (let i = 0; i < totalSteps; i++) {
        const textEl = textBlockRefs.current[i];
        if (!textEl) continue;

        const rel = i - s;
        const dist = Math.abs(rel);
        const stepAlpha = stageReveal * clamp(1 - dist * 1.45, 0, 1);
        const yOffset = rel * (isMobile ? 32 : 56);

        textEl.style.opacity = `${stepAlpha}`;
        textEl.style.transform = `translate3d(0, ${yOffset}px, 0)`;
        textEl.style.pointerEvents = stepAlpha > 0.55 ? 'auto' : 'none';
      }
    },
    [totalSteps]
  );

  useEffect(() => {
    const state = animStateRef.current;

    const updateTargetFromScroll = () => {
      const sectionEl = sectionRef.current;
      if (!sectionEl) return;
      const rect = sectionEl.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrollable = Math.max(1, rect.height - vh);
      const rawProgress = clamp(-rect.top / scrollable, 0, 1);
      state.targetT = rawProgress * totalTimelineUnits;
    };

    const tick = () => {
      updateTargetFromScroll();
      const diff = state.targetT - state.currentT;
      if (Math.abs(diff) > 0.0004) {
        state.currentT += diff * 0.16;
      } else {
        state.currentT = state.targetT;
      }
      applyTransforms(state.currentT);
      state.rafId = window.requestAnimationFrame(tick);
    };

    updateTargetFromScroll();
    state.currentT = state.targetT;
    applyTransforms(state.currentT);
    state.rafId = window.requestAnimationFrame(tick);

    const handleResize = () => {
      updateTargetFromScroll();
      applyTransforms(state.currentT);
      if (window.ScrollTrigger) {
        window.ScrollTrigger.refresh();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.cancelAnimationFrame(state.rafId);
      window.removeEventListener('resize', handleResize);
    };
  }, [applyTransforms, totalTimelineUnits]);

  const scrollToStepIndex = (stepIdx: number) => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;
    const clampedIdx = clamp(stepIdx, 0, totalSteps - 1);
    const targetTimelineT = 2.0 + clampedIdx;
    const ratio = targetTimelineT / totalTimelineUnits;
    const rect = sectionEl.getBoundingClientRect();
    const sectionTopDoc = window.scrollY + rect.top;
    const scrollable = Math.max(1, sectionEl.offsetHeight - window.innerHeight);
    const targetY = sectionTopDoc + ratio * scrollable;

    window.scrollTo({
      top: targetY,
      behavior: 'smooth',
    });
  };

  return (
    <section
      ref={sectionRef}
      className="sf-proc-section"
      id="process"
      data-section="process"
      style={{
        height: `${(totalSteps + 2) * 112}vh`,
      }}
    >
      <span id="loop" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }} />

      <div ref={stickyRef} className="sf-proc-sticky">
        {/* Minimal Top Header Bar */}
        <div className="sf-proc-topbar">
          <div className="sf-proc-topbar__steps" role="tablist" aria-label="Jump to process phase">
            {PROCESS_STEPS.map((step, idx) => {
              const isCurrent = inCarouselPhase && activeStepIdx === idx;
              return (
                <button
                  key={step.stepNumber}
                  type="button"
                  role="tab"
                  aria-selected={isCurrent}
                  className={`sf-proc-step-btn ${isCurrent ? 'is-active' : ''}`}
                  onClick={() => scrollToStepIndex(idx)}
                >
                  <span>{step.stepNumber}</span>
                  <span className="sf-proc-step-btn__name">
                    {step.shortTitle || step.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 1. Centered Editorial Intro Headline (Frame 00:00) */}
        <div ref={introBlockRef} className="sf-proc-intro">
          <span className="sf-proc-intro__kicker">DESIGN METHODOLOGY · 05 STEPS</span>
          <h2 className="sf-proc-intro__headline">
            <span>Not every idea</span>
            <span>starts in focus.</span>
          </h2>
        </div>

        {/* 2. Spatial Diagonal Card Stream (5 Process Cards) */}
        <div className="sf-proc-cards-layer">
          {PROCESS_STEPS.map((step, idx) => (
            <div
              key={step.stepNumber}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              className="sf-proc-card"
              onClick={() => {
                if (idx !== activeStepIdx || !inCarouselPhase) {
                  scrollToStepIndex(idx);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`Step ${step.stepNumber}: ${step.shortTitle || step.title}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  scrollToStepIndex(idx);
                }
              }}
            >
              <div
                ref={(el) => {
                  cardInnerRefs.current[idx] = el;
                }}
                className="sf-proc-card__inner"
              >
                <ProcessCardVisual step={step} index={idx} />

                {/* Fullscreen Expansion Bottom-Left Headline inside Card 01 (Frame 00:03) */}
                {idx === 0 && (
                  <div ref={fullOverlayRef} className="sf-proc-card__full-overlay">
                    <span className="sf-proc-card__full-kicker">
                      FROM SPARK TO PRODUCTION · 01 — 05
                    </span>
                    <h3 className="sf-proc-card__full-title">
                      <span>A considered way</span>
                      <span>to shape ideas.</span>
                    </h3>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 3. Right-Hand Editorial Step Column (Frames 00:04 -> 00:07) */}
        <div className="sf-proc-editorial-col">
          {PROCESS_STEPS.map((step, idx) => {
            const lines = step.headlineLines || [
              step.shortTitle || step.title,
              step.subtitle || '',
            ];
            return (
              <article
                key={step.stepNumber}
                ref={(el) => {
                  textBlockRefs.current[idx] = el;
                }}
                className="sf-proc-editorial-item"
              >
                <div className="sf-proc-editorial__kicker">
                  <span>STEP {step.stepNumber}</span>
                  <span aria-hidden="true">·</span>
                  <span>{(step.subtitle || step.title).toUpperCase()}</span>
                </div>

                <h3 className="sf-proc-editorial__headline">
                  <span>{lines[0]}</span>
                  <span>{lines[1]}</span>
                </h3>

                <p className="sf-proc-editorial__desc">{step.description}</p>

                {step.deliverables && step.deliverables.length > 0 && (
                  <div className="sf-proc-editorial__tags">
                    {step.deliverables.map((item, dIdx) => (
                      <React.Fragment key={item}>
                        {dIdx > 0 && (
                          <span className="sf-proc-editorial__tag-sep" aria-hidden="true">
                            ·
                          </span>
                        )}
                        <span>{item.toUpperCase()}</span>
                      </React.Fragment>
                    ))}
                  </div>
                )}

                <div className="sf-proc-editorial__action-row">
                  {idx < totalSteps - 1 ? (
                    <button
                      type="button"
                      className="sf-proc-editorial__next-btn"
                      onClick={() => scrollToStepIndex(idx + 1)}
                    >
                      <span>
                        Next: 0{idx + 2} {PROCESS_STEPS[idx + 1].shortTitle}
                      </span>
                      <ChevronRight size={14} />
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="sf-proc-editorial__next-btn sf-proc-editorial__next-btn--cta"
                      onClick={() => onInquire?.()}
                    >
                      <span>{step.ctaLabel || 'Start a Project With Me'}</span>
                      <ArrowUpRight size={14} />
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
