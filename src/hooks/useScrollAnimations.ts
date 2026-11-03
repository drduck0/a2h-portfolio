/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from 'react';

export function useScrollAnimations() {
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    document.body.classList.add('intro');

    let lenisInstance: any = null;
    let tickerCallback: any = null;

    function init() {
      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;
      const Lenis = window.Lenis;

      if (!gsap || !ScrollTrigger || !Lenis) {
        setTimeout(init, 50);
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isMobile = window.innerWidth <= 760;

      // 1. Text splitter for all .split elements
      function splitElement(el: Element) {
        function processNode(node: Node) {
          if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent || '';
            if (!text.trim()) return;
            const fragment = document.createDocumentFragment();
            const tokens = text.split(/(\s+)/);
            for (const token of tokens) {
              if (!token) continue;
              if (/^\s+$/.test(token)) {
                fragment.appendChild(document.createTextNode(token));
              } else {
                const span = document.createElement('span');
                span.className = 'w';
                span.textContent = token;
                fragment.appendChild(span);
              }
            }
            node.parentNode?.replaceChild(fragment, node);
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            const childEl = node as Element;
            if (childEl.tagName.toLowerCase() === 'br') return;
            Array.from(childEl.childNodes).forEach(processNode);
          }
        }
        Array.from(el.childNodes).forEach(processNode);
      }

      document.querySelectorAll('.split').forEach((el) => splitElement(el));

      // 2. Generate sq-field squares
      document.querySelectorAll<HTMLElement>('.sq-field').forEach((field) => {
        const count = parseInt(field.getAttribute('data-count') || '0', 10);
        field.innerHTML = '';
        for (let i = 0; i < count; i++) {
          const col = Math.floor(Math.random() * 30);
          const row = Math.floor(Math.random() * 6);
          const sq = document.createElement('div');
          sq.className = 'grid-sq';
          sq.style.width = '46px';
          sq.style.height = '46px';
          sq.style.left = `${col * 48 - 10}px`;
          sq.style.top = `${row * 48 + 6}px`;
          sq.style.opacity = '0';
          field.appendChild(sq);

          gsap.to(sq, {
            opacity: 1,
            yoyo: true,
            repeat: -1,
            duration: 1.2,
            delay: Math.random() * 4,
            repeatDelay: Math.random() * 3,
            ease: 'sine.inOut',
          });
        }
      });

      // 3. Hero frosted glass squares
      const heroGlass = document.getElementById('heroGlass');
      if (heroGlass) {
        heroGlass.innerHTML = '';
        const coords = [
          [3, 64],
          [3, 71],
          [6.5, 71],
          [10, 71],
          [3, 78],
          [-1, 70],
          [45.5, 76],
          [49, 80],
          [49, 76],
          [52.5, 76],
          [86, 58],
          [86, 67],
          [82, 76],
          [89.5, 76],
          [86, 84],
        ];

        coords.forEach(([x, y], idx) => {
          const isCenter = x > 40 && x < 60;
          const sq = document.createElement('div');
          sq.className = 'glass';
          sq.style.left = `${x}%`;
          sq.style.top = `${y}%`;
          sq.style.width = isCenter ? 'clamp(28px, 3.4vw, 44px)' : 'clamp(36px, 5.4vw, 74px)';
          sq.style.aspectRatio = '1';
          if (isMobile && idx % 2 === 1) {
            sq.style.display = 'none';
          }
          heroGlass.appendChild(sq);

          if (!reduce) {
            gsap.to(sq, {
              opacity: 0.15,
              duration: 0.9,
              yoyo: true,
              repeat: -1,
              ease: 'sine.inOut',
              delay: Math.random() * 3,
              repeatDelay: 1 + Math.random() * 3,
            });
          }
        });
      }

      // 4. Lenis smooth scroll
      lenisInstance = new Lenis({
        duration: 1.25,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      lenisInstance.on('scroll', ScrollTrigger.update);
      tickerCallback = (time: number) => {
        lenisInstance.raf(time * 1000);
      };
      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);

      let isProgrammaticNav = false;
      let navTimeoutId: number | null = null;

      document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
          const targetId = anchor.getAttribute('href');
          if (targetId && targetId !== '#') {
            e.preventDefault();
            isProgrammaticNav = true;
            if (navTimeoutId) window.clearTimeout(navTimeoutId);
            navTimeoutId = window.setTimeout(() => {
              isProgrammaticNav = false;
            }, 1700);
            lenisInstance?.scrollTo(targetId, {
              duration: 1.6,
              onComplete: () => {
                isProgrammaticNav = false;
              },
            });
          }
        });
      });

      // 5. INTRO Sequence
      lenisInstance.stop();
      const heroWords = document.querySelectorAll('#heroTitle .w');
      const nav = document.querySelector('.nav');
      const glassStack = document.querySelector('.a2h-glass-stack');
      const heroPill = document.querySelector('.hero-pill-role');
      const heroActions = document.querySelector('.hero-actions');
      const rightHud = document.querySelector('.a2h-hero__right-hud');
      const connectDock = document.querySelector('.a2h-connect-dock');
      const backdrop = document.querySelector('.backdrop');

      gsap.set(heroWords, { opacity: 0, y: 20, filter: 'blur(8px)' });
      if (nav) gsap.set(nav, { opacity: 0, y: -16 });
      if (glassStack) gsap.set(glassStack, { opacity: 0, y: 24, scale: 0.97 });
      if (heroPill) gsap.set(heroPill, { opacity: 0, y: 12 });
      if (heroActions) gsap.set(heroActions, { opacity: 0, y: 14 });
      if (rightHud) gsap.set(rightHud, { opacity: 0, x: 18 });
      if (connectDock) gsap.set(connectDock, { opacity: 0, y: 20 });
      if (backdrop) gsap.set(backdrop, { opacity: 1 });

      const introTl = gsap.timeline({
        delay: 0.2,
        onComplete: () => {
          document.body.classList.remove('intro');
          gsap.set('#app', { clearProps: 'all' });
          const remainingBackdrop = document.querySelector('.backdrop');
          if (remainingBackdrop) remainingBackdrop.remove();
          lenisInstance?.start();
          setupScroll();
        },
      });

      introTl
        .fromTo(
          '#app',
          { scale: 0.9, borderRadius: 28 },
          { scale: 1, borderRadius: 0, duration: 1.35, ease: 'expo.inOut' }
        );

      if (backdrop) {
        introTl.to(
          backdrop,
          {
            opacity: 0,
            duration: 0.55,
            ease: 'power2.out',
            onComplete: () => {
              (backdrop as HTMLElement).remove();
            },
          },
          '-=0.5'
        );
      }

      introTl
        .to(
          glassStack,
          { opacity: 1, y: 0, scale: 1, duration: 0.95, ease: 'power3.out' },
          '-=0.65'
        )
        .to(heroPill, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.7')
        .to(
          heroWords,
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, stagger: 0.06, ease: 'power3.out' },
          '-=0.55'
        )
        .to(heroActions, { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }, '-=0.55')
        .to(
          rightHud,
          { opacity: 1, x: 0, duration: 0.75, ease: 'power3.out' },
          '-=0.6'
        )
        .to(
          connectDock,
          { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' },
          '-=0.65'
        )
        .to(
          nav,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
          },
          '-=0.5'
        );

      // 6. setupScroll
      function setupScroll() {
        // Scroll-Triggered 3D Scene on #hero (pinned forward camera dolly + 3D A2H transform)
        const heroTl = gsap.timeline({
          scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: '+=140%',
            pin: true,
            scrub: 0.6,
            onUpdate: (self: any) => {
              window.dispatchEvent(
                new CustomEvent('a2h-hero-scroll', { detail: self.progress })
              );
            },
          },
        });

        heroTl
          .to(
            '.a2h-hero__bg',
            {
              scale: 1.14,
              yPercent: 4,
              ease: 'none',
            },
            0
          )
          .to(
            '.a2h-glass-stack',
            {
              yPercent: -14,
              scale: 0.97,
              ease: 'none',
            },
            0
          );

        // Reveal elements
        document.querySelectorAll('.reveal').forEach((el) => {
          gsap.from(el, {
            opacity: 0,
            y: 16,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
            },
          });
        });

        // Word reveal for .split in sections
        [
          '#stats .split',
          '#loop .split',
          '#cta .split',
          '#expertise .split',
          '#projects .split',
        ].forEach((sel) => {
          document.querySelectorAll(sel).forEach((heading) => {
            const words = heading.querySelectorAll('.w');
            if (words.length > 0) {
              gsap.from(words, {
                opacity: 0,
                y: 22,
                filter: 'blur(8px)',
                duration: 0.9,
                stagger: 0.05,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: heading,
                  start: 'top 80%',
                },
              });
            }
          });
        });

        // Counters function
        const cardElements = document.querySelectorAll<HTMLElement>('.card');
        function setCounters(p: number) {
          cardElements.forEach((card) => {
            const to = parseFloat(card.getAttribute('data-to') || '0');
            const dec = parseInt(card.getAttribute('data-dec') || '0', 10);
            const suf = card.getAttribute('data-suf') || '';
            const b = card.querySelector('b');
            if (b) {
              b.textContent = (to * p).toFixed(dec) + suf;
            }
          });
        }

        // MatchMedia triggers
        const mm = gsap.matchMedia();

        // Desktop stats & loop
        mm.add('(min-width: 901px)', () => {
          gsap.from('.card', {
            y: 40,
            opacity: 0,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.cards',
              start: 'top 75%',
            },
          });

          const statsTl = gsap.timeline({
            scrollTrigger: {
              trigger: '#stats',
              start: 'top top',
              end: '+=110%',
              pin: true,
              scrub: 1,
            },
          });

          const proxy = { p: 0 };
          statsTl.to(
            proxy,
            {
              p: 1,
              ease: 'none',
              onUpdate: () => setCounters(proxy.p),
            },
            0
          );

          statsTl.fromTo(
            '#tree',
            { yPercent: 75 },
            { yPercent: 6, ease: 'none' },
            0
          );
        });

        // Mobile / Tablet stats
        mm.add('(max-width: 900px)', () => {
          gsap.from('.card', {
            y: 30,
            opacity: 0,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.cards',
              start: 'top 85%',
            },
          });

          const proxy = { p: 0 };
          gsap.to(proxy, {
            p: 1,
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.cards',
              start: 'top 80%',
            },
            onUpdate: () => setCounters(proxy.p),
          });

          gsap.fromTo(
            '#tree',
            { yPercent: 40 },
            {
              yPercent: 0,
              ease: 'none',
              scrollTrigger: {
                trigger: '#stats',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          );
        });

        // Helper to activate a process panel purely via scroll (never skipping intermediate steps)
        const processPanels = Array.from(document.querySelectorAll<HTMLElement>('#process .panel'));
        const totalProcessSteps = processPanels.length;
        let currentProcessIdx = 0;
        let targetProcessIdx = 0;
        let stepQueueTimer: number | null = null;

        function applyProcessStep(idx: number) {
          const clamped = Math.max(0, Math.min(totalProcessSteps - 1, idx));
          currentProcessIdx = clamped;
          targetProcessIdx = clamped;
          if (stepQueueTimer !== null) {
            window.clearTimeout(stepQueueTimer);
            stepQueueTimer = null;
          }
          processPanels.forEach((panel, i) => {
            panel.classList.toggle('is-active', i === clamped);
          });
          window.dispatchEvent(new CustomEvent('process-step-change', { detail: clamped }));
        }

        function queueProcessStep(idx: number) {
          targetProcessIdx = Math.max(0, Math.min(totalProcessSteps - 1, idx));
          if (targetProcessIdx === currentProcessIdx) return;
          if (stepQueueTimer !== null) return;

          const advanceOne = () => {
            if (currentProcessIdx === targetProcessIdx) {
              stepQueueTimer = null;
              return;
            }
            const next = currentProcessIdx + Math.sign(targetProcessIdx - currentProcessIdx);
            currentProcessIdx = next;
            processPanels.forEach((panel, i) => {
              panel.classList.toggle('is-active', i === next);
            });
            window.dispatchEvent(new CustomEvent('process-step-change', { detail: next }));

            if (currentProcessIdx !== targetProcessIdx) {
              stepQueueTimer = window.setTimeout(advanceOne, 320);
            } else {
              stepQueueTimer = null;
            }
          };

          advanceOne();
        }

        // Loop accordion (desktop/laptop >= 901px): pinned one-step-at-a-time scroll progression
        mm.add('(min-width: 901px)', () => {
          gsap.fromTo(
            '#process .panel-in',
            { y: 80, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              stagger: 0.08,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: '#process',
                start: 'top 75%',
              },
            }
          );

          let stepLockUntil = 0;
          let isStepAnimating = false;

          const processSt = ScrollTrigger.create({
            trigger: '#process',
            start: 'top top',
            end: () => `+=${window.innerHeight * 3.6}`,
            pin: true,
            scrub: 0.6,
            onEnter: () => {
              if (!isProgrammaticNav) {
                stepLockUntil = performance.now() + 520;
                applyProcessStep(0);
                lenisInstance?.scrollTo(processSt.start, { immediate: true });
              }
            },
            onEnterBack: () => {
              if (!isProgrammaticNav) {
                stepLockUntil = performance.now() + 520;
                applyProcessStep(totalProcessSteps - 1);
                lenisInstance?.scrollTo(processSt.end, { immediate: true });
              }
            },
            onUpdate: (self: any) => {
              if (!totalProcessSteps || isStepAnimating) return;
              const idx = Math.min(
                totalProcessSteps - 1,
                Math.max(0, Math.round(self.progress * (totalProcessSteps - 1)))
              );
              queueProcessStep(idx);
            },
          });

          const getStepScrollY = (stepIdx: number) => {
            if (totalProcessSteps <= 1) return processSt.start;
            const ratio = stepIdx / (totalProcessSteps - 1);
            return processSt.start + ratio * (processSt.end - processSt.start);
          };

          const handleProcessWheel = (e: WheelEvent) => {
            if (isProgrammaticNav || !processSt.isActive) return;

            const now = performance.now();
            // Absorb fast wheel/trackpad momentum while a step transition is locked
            if (now < stepLockUntil || isStepAnimating) {
              e.preventDefault();
              e.stopPropagation();
              return;
            }

            if (Math.abs(e.deltaY) < 6) return;

            const dir = e.deltaY > 0 ? 1 : -1;
            const nextStep = currentProcessIdx + dir;

            // If there is another step in the scroll direction, advance strictly 1 step
            if (nextStep >= 0 && nextStep < totalProcessSteps) {
              e.preventDefault();
              e.stopPropagation();
              isStepAnimating = true;
              stepLockUntil = now + 580;
              applyProcessStep(nextStep);

              const targetY = getStepScrollY(nextStep);
              lenisInstance?.scrollTo(targetY, {
                duration: 0.52,
                lock: true,
                onComplete: () => {
                  isStepAnimating = false;
                },
              });
              window.setTimeout(() => {
                isStepAnimating = false;
              }, 560);
            }
          };

          window.addEventListener('wheel', handleProcessWheel, { passive: false });

          gsap.to('.loop-cloud', {
            x: 70,
            ease: 'none',
            scrollTrigger: {
              trigger: '#process',
              start: 'top bottom',
              end: () => `+=${window.innerHeight * 4.6}`,
              scrub: true,
            },
          });

          return () => {
            window.removeEventListener('wheel', handleProcessWheel);
          };
        });

        // Loop tablet & mobile (<= 900px): scroll-driven reveal & active state
        mm.add('(max-width: 900px)', () => {
          processPanels.forEach((panel, idx) => {
            gsap.from(panel, {
              y: 30,
              opacity: 0,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: panel,
                start: 'top 88%',
                onEnter: () => queueProcessStep(idx),
                onEnterBack: () => queueProcessStep(idx),
              },
            });
          });
        });

        // Contact Cards Stagger Animation
        const contactCards = document.querySelectorAll('.contact-card');
        if (contactCards.length > 0) {
          gsap.from(contactCards, {
            y: 24,
            opacity: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            clearProps: 'transform',
            scrollTrigger: {
              trigger: '#contact',
              start: 'top 88%',
            },
          });
        }

        // Footer logo timeline
        const fDots = document.querySelectorAll('#footer .fdot');
        if (fDots.length > 0) {
          const footerTl = gsap.timeline({
            scrollTrigger: {
              trigger: '#footer',
              start: 'top 92%',
            },
          });

          footerTl
            .to(fDots, {
              y: -8,
              duration: 0.25,
              stagger: 0.08,
              yoyo: true,
              repeat: 3,
              ease: 'sine.inOut',
            })
            .to(fDots, {
              attr: { cx: 27, cy: 50 },
              y: 0,
              duration: 0.45,
              ease: 'power3.inOut',
            })
            .to([fDots[1], fDots[2]], {
              opacity: 0,
              duration: 0.1,
            })
            .to(
              '#fMark',
              {
                strokeDashoffset: 0,
                duration: 0.6,
                ease: 'power3.out',
              },
              '-=0.05'
            )
            .to(
              fDots[0],
              {
                attr: { r: 5.5 },
                ease: 'back.out(3)',
                duration: 0.6,
              },
              '<'
            )
            .to(
              '#fRing',
              {
                strokeDashoffset: 0,
                duration: 0.9,
                ease: 'power2.inOut',
              },
              '-=0.3'
            );
        }

        ScrollTrigger.refresh();
        window.addEventListener('load', () => ScrollTrigger.refresh());
      }
    }

    init();

    return () => {
      if (tickerCallback && window.gsap) {
        window.gsap.ticker.remove(tickerCallback);
      }
      if (lenisInstance) {
        lenisInstance.destroy();
      }
    };
  }, []);
}
