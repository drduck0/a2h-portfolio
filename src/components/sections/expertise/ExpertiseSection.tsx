/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useCallback } from 'react';

const EXPERTISE_ITEMS = [
  'UI/UX DESIGN',
  'GRAPHIC DESIGN',
  'DESIGN SYSTEMS',
  'BRANDING & IDENTITY',
  'PROTOTYPING & MOTION',
  'RESPONSIVE WEB DESIGN',
  'MOBILE APP DESIGN',
  'VISUAL STORYTELLING',
  'INTERACTION DESIGN',
  'MARKETING CREATIVES',
  'VIDEO & EDITORIAL',
];

const PROUD_WORDS_LINE1 = ['WORK', "I'M", 'SUPER'];
const PROUD_WORDS_LINE2 = ['PROUD', 'OF.'];

function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

function easeOutCubic(x: number): number {
  return 1 - Math.pow(1 - x, 3);
}

interface ExpertiseSectionProps {
  onOpenContact?: () => void;
}

export const ExpertiseSection: React.FC<ExpertiseSectionProps> = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const showroomStageRef = useRef<HTMLDivElement | null>(null);
  const wheelListRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const focalPipRef = useRef<HTMLDivElement | null>(null);

  const workProudTitleRef = useRef<HTMLDivElement | null>(null);
  const proudKickerRef = useRef<HTMLSpanElement | null>(null);
  const proudWordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const animStateRef = useRef({
    targetProgress: 0,
    currentProgress: 0,
    rafId: 0 as number,
  });

  const totalItems = EXPERTISE_ITEMS.length;

  const applyTransforms = useCallback(
    (p: number) => {
      const isMobile = window.innerWidth <= 850;

      // -------------------------------------------------------------
      // PHASE 1: Rolling Expertise Showcase (progress 0.0 -> 0.65)
      // -------------------------------------------------------------
      const phase1Alpha = clamp(1 - (p - 0.60) / 0.10, 0, 1);
      const phase1Y = (1 - phase1Alpha) * -50;

      if (showroomStageRef.current) {
        showroomStageRef.current.style.opacity = `${phase1Alpha.toFixed(3)}`;
        showroomStageRef.current.style.transform = `translate3d(0, ${phase1Y.toFixed(2)}px, 0)`;
        showroomStageRef.current.style.pointerEvents = phase1Alpha > 0.4 ? 'auto' : 'none';
        showroomStageRef.current.style.visibility = phase1Alpha < 0.01 ? 'hidden' : 'visible';
      }

      // Continuous Wheel Rolling Motion (0.0 to totalItems - 1)
      const wheelProgress = clamp(p / 0.58, 0, 1);
      const continuousIndex = wheelProgress * (totalItems - 1);

      // Line height in pixels per item
      const itemH = isMobile ? 54 : 84;
      const wheelOffset = -continuousIndex * itemH;

      if (wheelListRef.current) {
        wheelListRef.current.style.transform = `translate3d(0, ${wheelOffset.toFixed(2)}px, 0)`;
      }

      // Depth-of-Field Blur, Opacity, and Scale for each item in the wheel
      for (let i = 0; i < totalItems; i++) {
        const itemEl = itemRefs.current[i];
        if (!itemEl) continue;

        const dist = Math.abs(continuousIndex - i);

        let blur = 0;
        let opacity = 1;
        let scale = 1;
        let color = '#0b0d0b';

        if (dist <= 0.45) {
          blur = 0;
          opacity = 1;
          scale = 1.02;
          color = '#0b0d0b';
        } else {
          const extra = dist - 0.45;
          blur = Math.min(6.5, extra * 3.2);
          opacity = Math.max(0.18, 1 - extra * 0.46);
          scale = Math.max(0.88, 1.02 - extra * 0.05);
          color = '#8e948e';
        }

        itemEl.style.filter = blur > 0.1 ? `blur(${blur.toFixed(2)}px)` : 'none';
        itemEl.style.opacity = `${opacity.toFixed(3)}`;
        itemEl.style.transform = `scale3d(${scale.toFixed(3)}, ${scale.toFixed(3)}, 1)`;
        itemEl.style.color = color;
      }

      // Subtle vertical breathing for focal indicator pip
      if (focalPipRef.current) {
        const floatOffset = Math.sin(continuousIndex * Math.PI) * 4;
        focalPipRef.current.style.transform = `translate3d(0, ${floatOffset.toFixed(2)}px, 0)`;
      }

      // -------------------------------------------------------------
      // PHASE 2: "WORK I'M SUPER PROUD OF." Kinetic Staggered Reveal (p = 0.65 -> 1.0)
      // -------------------------------------------------------------
      const phase2Progress = clamp((p - 0.64) / 0.26, 0, 1);

      if (workProudTitleRef.current) {
        const containerAlpha = clamp(phase2Progress / 0.28, 0, 1);
        workProudTitleRef.current.style.opacity = `${containerAlpha.toFixed(3)}`;
        workProudTitleRef.current.style.visibility = containerAlpha < 0.01 ? 'hidden' : 'visible';
        workProudTitleRef.current.style.pointerEvents = containerAlpha > 0.4 ? 'auto' : 'none';
      }

      if (proudKickerRef.current) {
        const kickerU = easeOutCubic(clamp(phase2Progress / 0.42, 0, 1));
        proudKickerRef.current.style.opacity = `${kickerU.toFixed(3)}`;
        proudKickerRef.current.style.transform = `translate3d(0, ${(1 - kickerU) * 14}px, 0)`;
      }

      // Stagger each word sliding up through its overflow mask
      proudWordRefs.current.forEach((wordEl, idx) => {
        if (!wordEl) return;
        const startP = idx * 0.09;
        const wordU = easeOutCubic(clamp((phase2Progress - startP) / 0.48, 0, 1));
        const yPercent = (1 - wordU) * 110;
        const rot = (1 - wordU) * 3.5;
        wordEl.style.transform = `translate3d(0, ${yPercent.toFixed(2)}%, 0) rotate(${rot.toFixed(1)}deg)`;
        wordEl.style.opacity = `${clamp(wordU / 0.22, 0, 1).toFixed(3)}`;
      });
    },
    [totalItems]
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
      state.targetProgress = rawProgress;
    };

    const tick = () => {
      updateTargetFromScroll();
      const diff = state.targetProgress - state.currentProgress;
      if (Math.abs(diff) > 0.0004) {
        state.currentProgress += diff * 0.16;
      } else {
        state.currentProgress = state.targetProgress;
      }
      applyTransforms(state.currentProgress);
      state.rafId = window.requestAnimationFrame(tick);
    };

    updateTargetFromScroll();
    state.currentProgress = state.targetProgress;
    applyTransforms(state.currentProgress);
    state.rafId = window.requestAnimationFrame(tick);

    const handleResize = () => {
      updateTargetFromScroll();
      applyTransforms(state.currentProgress);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.cancelAnimationFrame(state.rafId);
      window.removeEventListener('resize', handleResize);
    };
  }, [applyTransforms]);

  return (
    <section
      ref={sectionRef}
      className="a2h-exp-scroll-track"
      id="expertise"
      data-section="service"
    >
      <span id="service" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }} />
      <span id="services" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }} />

      <div ref={stickyRef} className="a2h-exp-sticky">
        {/* PHASE 1: Sticky 2-Column Showroom */}
        <div ref={showroomStageRef} className="a2h-exp-showroom">
          {/* Left Column: Clean & Uncluttered Headline and Subtext */}
          <div className="a2h-exp-left">
            <span className="a2h-exp-kicker">MY EXPERTISE</span>
            <h2 className="a2h-exp-headline">
              <span>Skills &amp;</span>
              <span>Creative</span>
              <span>Capabilities.</span>
            </h2>
            <p className="a2h-exp-subtext">
              A multidisciplinary focus across UI/UX architecture, visual systems, and motion design.
            </p>
          </div>

          {/* Right Column: Cylindrical Rolling Stack with Depth of Field Blur */}
          <div className="a2h-exp-right">
            <div className="a2h-exp-wheel-stage">
              {/* Subtle focal indicator pip aligned with the center active line */}
              <div ref={focalPipRef} className="a2h-exp-focal-pip" aria-hidden="true" />

              <div ref={wheelListRef} className="a2h-exp-wheel-list">
                {EXPERTISE_ITEMS.map((item, idx) => (
                  <div
                    key={item}
                    ref={(el) => {
                      itemRefs.current[idx] = el;
                    }}
                    className="a2h-exp-wheel-item"
                  >
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* PHASE 2: Centered Impact Headline "WORK I'M SUPER PROUD OF." with Kinetic Typography */}
        <div ref={workProudTitleRef} className="a2h-exp-work-proud">
          <span ref={proudKickerRef} className="a2h-exp-proud-kicker">
            SELECTED PORTFOLIO
          </span>
          <h2 className="a2h-exp-work-proud__headline">
            <span className="a2h-proud-line">
              {PROUD_WORDS_LINE1.map((w, idx) => (
                <span key={w} className="a2h-proud-word-mask">
                  <span
                    ref={(el) => {
                      proudWordRefs.current[idx] = el;
                    }}
                    className="a2h-proud-word"
                  >
                    {w}
                  </span>
                </span>
              ))}
            </span>
            <span className="a2h-proud-line">
              {PROUD_WORDS_LINE2.map((w, idx) => (
                <span key={w} className="a2h-proud-word-mask">
                  <span
                    ref={(el) => {
                      proudWordRefs.current[3 + idx] = el;
                    }}
                    className="a2h-proud-word"
                  >
                    {w}
                  </span>
                </span>
              ))}
            </span>
          </h2>
        </div>
      </div>
    </section>
  );
};
