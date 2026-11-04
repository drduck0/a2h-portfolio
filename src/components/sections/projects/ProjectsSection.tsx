/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { ProjectModal } from './ProjectModal';
import { ProjectMediaVisual } from './ProjectMediaVisual';
import { PROJECTS } from '../../../constants/portfolioData';
import { Project, ProjectCategory } from '../../../types/portfolio';

interface ProjectsSectionProps {
  onInquire: () => void;
}

function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

function easeInOutCubic(x: number): number {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

function easeOutCubic(x: number): number {
  return 1 - Math.pow(1 - x, 3);
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onInquire }) => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<ProjectCategory>('all');
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const filteredProjects =
    filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.type === filter);

  const sectionRef = useRef<HTMLElement | null>(null);
  const mediaCardRef = useRef<HTMLDivElement | null>(null);
  const mediaSlideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mediaInnerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textCardRefs = useRef<(HTMLElement | null)[]>([]);
  const lineRefs = useRef<(HTMLSpanElement | null)[][]>([]);
  const footerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const kickerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const animStateRef = useRef({
    currentStep: 0,
    targetStep: 0,
    rafId: 0 as number,
    lastReportedIndex: 0,
  });

  const applyTransforms = useCallback(
    (stepValue: number) => {
      const count = filteredProjects.length;
      if (count === 0) return;

      const isMobile = window.innerWidth <= 768;
      const clampedStep = clamp(stepValue, 0, Math.max(0, count - 1));
      const k = count > 1 ? Math.min(count - 2, Math.max(0, Math.floor(clampedStep))) : 0;
      const rawP = count > 1 ? clampedStep - k : 0;

      // Hold window at start and end of each project step so each card settles cleanly
      const u = count > 1 ? clamp((rawP - 0.06) / 0.88, 0, 1) : 0;
      const easedTransition = easeInOutCubic(u);
      const continuousEasedIndex = k + easedTransition;

      // Report rounded active step index for top bar indicator
      const roundedIdx = Math.round(continuousEasedIndex);
      if (animStateRef.current.lastReportedIndex !== roundedIdx) {
        animStateRef.current.lastReportedIndex = roundedIdx;
        setActiveStepIndex(roundedIdx);
      }

      // 1. Position the Sliding Media Card:
      // Even k (0 -> 1, 2 -> 3, 4 -> 5): Media starts on Right/Bottom (slot = 1) and slides to Left/Top (slot = 0)
      // Odd k (1 -> 2, 3 -> 4): Media starts on Left/Top (slot = 0) and slides to Right/Bottom (slot = 1)
      const slotPos = k % 2 === 0 ? 1 - easedTransition : easedTransition;
      const mediaEl = mediaCardRef.current;
      if (mediaEl) {
        if (isMobile) {
          mediaEl.style.transform = `translate3d(0, calc(${slotPos * 100}% + ${slotPos * 10}px), 0)`;
        } else {
          mediaEl.style.transform = `translate3d(calc(${slotPos * 100}% + ${slotPos * 14}px), 0, 0)`;
        }
      }

      // 2. Position Vertical Image Slides inside the Sliding Media Card:
      // Slide k+1 enters from the top (-100% -> 0%) while Slide k exits downward (0% -> +100%)
      for (let i = 0; i < count; i++) {
        const slideEl = mediaSlideRefs.current[i];
        const innerEl = mediaInnerRefs.current[i];
        if (!slideEl) continue;

        const relOffset = (continuousEasedIndex - i) * 100;
        slideEl.style.transform = `translate3d(0, ${relOffset}%, 0)`;

        if (innerEl) {
          const parallaxY = isMobile ? 0 : clamp((i - continuousEasedIndex) * 10, -14, 14);
          const scaleVal = isMobile ? 1 : 1.04;
          innerEl.style.transform = `translate3d(0, ${parallaxY}%, 0) scale(${scaleVal})`;
        }
      }

      // 3. Position Text Cards & Line-by-Line Masked Headlines:
      for (let i = 0; i < count; i++) {
        const cardEl = textCardRefs.current[i];
        const footerEl = footerRefs.current[i];
        const kickerEl = kickerRefs.current[i];
        const lines = lineRefs.current[i] || [];
        if (!cardEl) continue;

        // On mobile, Top-slot cards (even i) enter/hide above the stage (-108%),
        // while Bottom-slot cards (odd i) enter/hide below the stage (+108%) so they never cross into the opposite half!
        const offscreenDir = isMobile && i % 2 === 0 ? -1 : 1;

        if (i === k) {
          // Outgoing / settled card: stays stationary in its slot while the Media Card slides over it
          const isCovered = u >= 0.995;
          cardEl.style.transform = 'translate3d(0, 0%, 0)';
          cardEl.style.opacity = isCovered ? '0' : '1';
          cardEl.style.pointerEvents = u < 0.5 ? 'auto' : 'none';

          lines.forEach((lineSpan) => {
            if (lineSpan) lineSpan.style.transform = 'translate3d(0, 0%, 0)';
          });
          if (kickerEl) {
            kickerEl.style.opacity = '1';
            kickerEl.style.transform = 'translate3d(0, 0px, 0)';
          }
          if (footerEl) {
            footerEl.style.opacity = '1';
            footerEl.style.transform = 'translate3d(0, 0px, 0)';
          }
        } else if (i === k + 1 && count > 1) {
          // Incoming card in the opposite slot: rises into place as Media Card vacates its slot
          const riseU = clamp((u - 0.05) / 0.76, 0, 1);
          const riseEased = easeOutCubic(riseU);
          const yPercent = (1 - riseEased) * 108 * offscreenDir;

          cardEl.style.transform = `translate3d(0, ${yPercent}%, 0)`;
          cardEl.style.opacity = u > 0.01 ? '1' : '0';
          cardEl.style.pointerEvents = u >= 0.5 ? 'auto' : 'none';

          // Staggered upward line-mask reveal
          lines.forEach((lineSpan, lineIdx) => {
            if (!lineSpan) return;
            const lineStart = 0.34 + lineIdx * 0.11;
            const lineU = clamp((u - lineStart) / 0.44, 0, 1);
            const lineEased = easeOutCubic(lineU);
            const lineY = (1 - lineEased) * 112;
            lineSpan.style.transform = `translate3d(0, ${lineY}%, 0)`;
          });

          if (kickerEl) {
            const kickerU = clamp((u - 0.3) / 0.4, 0, 1);
            const kickerEased = easeOutCubic(kickerU);
            kickerEl.style.opacity = `${kickerEased}`;
            kickerEl.style.transform = `translate3d(0, ${(1 - kickerEased) * 12}px, 0)`;
          }

          if (footerEl) {
            const footerU = clamp((u - 0.5) / 0.44, 0, 1);
            const footerEased = easeOutCubic(footerU);
            footerEl.style.opacity = `${footerEased}`;
            footerEl.style.transform = `translate3d(0, ${(1 - footerEased) * 16}px, 0)`;
          }
        } else {
          // Inactive cards stay completely outside the stage bounds
          cardEl.style.transform = `translate3d(0, ${108 * offscreenDir}%, 0)`;
          cardEl.style.opacity = '0';
          cardEl.style.pointerEvents = 'none';
        }
      }
    },
    [filteredProjects.length]
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
      state.targetStep = rawProgress * Math.max(0, filteredProjects.length - 1);
    };

    const tick = () => {
      updateTargetFromScroll();
      const diff = state.targetStep - state.currentStep;
      if (Math.abs(diff) > 0.0004) {
        state.currentStep += diff * 0.16;
      } else {
        state.currentStep = state.targetStep;
      }
      applyTransforms(state.currentStep);
      state.rafId = window.requestAnimationFrame(tick);
    };

    updateTargetFromScroll();
    state.currentStep = state.targetStep;
    applyTransforms(state.currentStep);
    state.rafId = window.requestAnimationFrame(tick);

    const handleResize = () => {
      updateTargetFromScroll();
      applyTransforms(state.currentStep);
      if (window.ScrollTrigger) {
        window.ScrollTrigger.refresh();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.cancelAnimationFrame(state.rafId);
      window.removeEventListener('resize', handleResize);
    };
  }, [applyTransforms, filteredProjects.length]);

  const scrollToProjectIndex = (index: number) => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;
    const clampedIdx = clamp(index, 0, Math.max(0, filteredProjects.length - 1));
    const rect = sectionEl.getBoundingClientRect();
    const sectionTopDoc = window.scrollY + rect.top;
    const scrollable = Math.max(1, sectionEl.offsetHeight - window.innerHeight);
    const ratio =
      filteredProjects.length > 1 ? clampedIdx / (filteredProjects.length - 1) : 0;
    const targetY = sectionTopDoc + ratio * scrollable;

    window.scrollTo({
      top: targetY,
      behavior: 'smooth',
    });
  };

  const handleFilterChange = (nextFilter: ProjectCategory) => {
    if (nextFilter === filter) return;
    setFilter(nextFilter);
    setActiveStepIndex(0);
    animStateRef.current.currentStep = 0;
    animStateRef.current.targetStep = 0;

    const sectionEl = sectionRef.current;
    if (sectionEl) {
      const rect = sectionEl.getBoundingClientRect();
      const sectionTopDoc = window.scrollY + rect.top;
      window.scrollTo({ top: sectionTopDoc, behavior: 'auto' });
    }
    window.setTimeout(() => {
      if (window.ScrollTrigger) {
        window.ScrollTrigger.refresh();
      }
    }, 60);
  };

  const totalCountStr = String(filteredProjects.length).padStart(2, '0');

  return (
    <section
      ref={sectionRef}
      className="sf-work-section"
      id="projects"
      data-section="work"
      style={{
        height: `${Math.max(2, filteredProjects.length) * 112}vh`,
      }}
    >
      <span id="work" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }} />

      <div className="sf-work-sticky">
        {/* Minimal Top Header Bar */}
        <div className="sf-work-topbar">
          <div className="sf-work-topbar__brand">
            <span className="sf-work-topbar__title">Selected Works</span>
            <span className="sf-work-topbar__sep" aria-hidden="true">
              ·
            </span>
            <span className="sf-work-topbar__count">
              {String(activeStepIndex + 1).padStart(2, '0')} — {totalCountStr}
            </span>
          </div>

          <div className="sf-work-topbar__controls" role="tablist" aria-label="Filter works">
            <button
              type="button"
              role="tab"
              aria-selected={filter === 'all'}
              className={`sf-filter-tab ${filter === 'all' ? 'is-active' : ''}`}
              onClick={() => handleFilterChange('all')}
            >
              All ({PROJECTS.length})
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={filter === 'uiux'}
              className={`sf-filter-tab ${filter === 'uiux' ? 'is-active' : ''}`}
              onClick={() => handleFilterChange('uiux')}
            >
              UI/UX &amp; Web (3)
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={filter === 'graphic'}
              className={`sf-filter-tab ${filter === 'graphic' ? 'is-active' : ''}`}
              onClick={() => handleFilterChange('graphic')}
            >
              Graphic &amp; Print (3)
            </button>
          </div>
        </div>

        {/* 2-Column (Desktop) / 2-Row (Mobile) Split Stage */}
        <div className="sf-work-stage">
          {filteredProjects.map((project, idx) => {
            const isEven = idx % 2 === 0;
            const stepStr = String(idx + 1).padStart(2, '0');

            return (
              <article
                key={project.id}
                ref={(el) => {
                  textCardRefs.current[idx] = el;
                }}
                className={`sf-text-card ${
                  isEven
                    ? 'sf-text-card--left sf-text-card--dark'
                    : 'sf-text-card--right sf-text-card--light'
                }`}
              >
                <div className="sf-text-card__top">
                  <div
                    ref={(el) => {
                      kickerRefs.current[idx] = el;
                    }}
                    className="sf-text-card__kicker"
                  >
                    <span>{project.num}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.category}</span>
                    <span aria-hidden="true" className="sf-text-card__kicker-sep">
                      ·
                    </span>
                    <span className="sf-text-card__project-name">{project.title}</span>
                  </div>

                  <h2 className="sf-text-card__headline" aria-label={project.headlineLines.join(' ')}>
                    {project.headlineLines.map((lineText, lineIdx) => (
                      <span key={lineIdx} className="sf-line-mask">
                        <span
                          ref={(el) => {
                            if (!lineRefs.current[idx]) {
                              lineRefs.current[idx] = [];
                            }
                            lineRefs.current[idx][lineIdx] = el;
                          }}
                          className="sf-line-inner"
                        >
                          {lineText}
                        </span>
                      </span>
                    ))}
                  </h2>
                </div>

                {/* Bottom Row: Step Indicator & Navigation + Description & Case Study CTA */}
                <div
                  ref={(el) => {
                    footerRefs.current[idx] = el;
                  }}
                  className="sf-text-card__bottom"
                >
                  <p className="sf-text-card__desc">{project.description}</p>

                  <div className="sf-text-card__footer-bar">
                    <div className="sf-step-indicator-group">
                      <div
                        className="sf-step-rings"
                        aria-label={`Project ${stepStr} of ${totalCountStr}`}
                      >
                        <span className="sf-step-ring sf-step-ring--current">{stepStr}</span>
                        <span className="sf-step-ring sf-step-ring--total">{totalCountStr}</span>
                      </div>

                      <div className="sf-step-arrows">
                        <button
                          type="button"
                          className="sf-step-arrow"
                          onClick={() => scrollToProjectIndex(idx - 1)}
                          disabled={idx === 0}
                          aria-label="Previous project"
                        >
                          <ChevronLeft size={14} />
                        </button>
                        <button
                          type="button"
                          className="sf-step-arrow"
                          onClick={() => scrollToProjectIndex(idx + 1)}
                          disabled={idx === filteredProjects.length - 1}
                          aria-label="Next project"
                        >
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>

                    <div className="sf-text-card__meta-right">
                      <span className="sf-text-card__tools">
                        {project.tools.slice(0, 3).join(' · ')}
                      </span>

                      <button
                        type="button"
                        className="sf-text-card__cta"
                        onClick={() => setActiveProject(project)}
                      >
                        <span>Explore Case Study</span>
                        <ArrowUpRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}

          {/* Sliding Media Card */}
          <div ref={mediaCardRef} className="sf-media-card">
            <div className="sf-media-card__viewport">
              {filteredProjects.map((project, idx) => (
                <div
                  key={project.id}
                  ref={(el) => {
                    mediaSlideRefs.current[idx] = el;
                  }}
                  className="sf-media-slide"
                >
                  <div
                    ref={(el) => {
                      mediaInnerRefs.current[idx] = el;
                    }}
                    className="sf-media-slide__parallax"
                  >
                    <ProjectMediaVisual
                      project={project}
                      onSelect={(p) => setActiveProject(p)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        onInquire={onInquire}
      />
    </section>
  );
};
