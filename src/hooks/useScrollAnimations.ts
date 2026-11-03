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
      let heroScrollTrigger: any = null;
      let introTlRef: any = null;

      const ensureScrollReady = () => {
        if (introTlRef && introTlRef.progress() < 1) {
          introTlRef.progress(1);
        }
      };

      const scrollToAboutReveal = () => {
        ensureScrollReady();
        isProgrammaticNav = true;
        if (navTimeoutId) window.clearTimeout(navTimeoutId);
        navTimeoutId = window.setTimeout(() => {
          isProgrammaticNav = false;
        }, 1700);

        if (heroScrollTrigger) {
          const targetY =
            heroScrollTrigger.start +
            (heroScrollTrigger.end - heroScrollTrigger.start) * 0.92;
          lenisInstance?.scrollTo(targetY, {
            duration: 1.5,
            onComplete: () => {
              isProgrammaticNav = false;
            },
          });
        }
      };

      const scrollToSection = (targetId: string) => {
        if (!targetId || targetId === '#') return;
        if (targetId === '#about' || targetId === '#stats') {
          scrollToAboutReveal();
          return;
        }
        ensureScrollReady();
        isProgrammaticNav = true;
        if (navTimeoutId) window.clearTimeout(navTimeoutId);
        navTimeoutId = window.setTimeout(() => {
          isProgrammaticNav = false;
        }, 1700);
        lenisInstance?.scrollTo(targetId === '#hero' ? 0 : targetId, {
          duration: 1.5,
          onComplete: () => {
            isProgrammaticNav = false;
          },
        });
      };

      const handleCustomNavTo = (e: Event) => {
        const customEvent = e as CustomEvent<string>;
        if (customEvent.detail) {
          scrollToSection(customEvent.detail);
        }
      };

      const handleDelegatedAnchorClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement | null;
        const anchor = target?.closest<HTMLAnchorElement>('a[href^="#"]');
        if (!anchor) return;
        const targetId = anchor.getAttribute('href');
        if (targetId && targetId !== '#') {
          e.preventDefault();
          scrollToSection(targetId);
        }
      };

      window.addEventListener('a2h-scroll-to-about', scrollToAboutReveal);
      window.addEventListener('a2h-nav-to', handleCustomNavTo);
      document.addEventListener('click', handleDelegatedAnchorClick);

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

      let scrollSetupDone = false;
      const introTl = gsap.timeline({
        delay: 0.2,
        onComplete: () => {
          document.body.classList.remove('intro');
          gsap.set('#app', { clearProps: 'all' });
          const remainingBackdrop = document.querySelector('.backdrop');
          if (remainingBackdrop) remainingBackdrop.remove();
          lenisInstance?.start();
          if (!scrollSetupDone) {
            scrollSetupDone = true;
            setupScroll();
          }
        },
      });
      introTlRef = introTl;

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
        // Counters helper for About Us stats
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

        // Initial states for the About Us reveal layer inside the glass card
        const aboutBody = document.getElementById('heroAboutBody');
        const aboutPill = document.querySelector('.a2h-about-pill');
        const aboutWords = document.querySelectorAll('#heroAboutTitle .w');
        const aboutParas = document.querySelectorAll('.a2h-about-para');
        const aboutStats = document.querySelectorAll('.a2h-about-stat');

        if (aboutBody) gsap.set(aboutBody, { autoAlpha: 0, pointerEvents: 'none' });
        if (aboutPill) gsap.set(aboutPill, { opacity: 0, y: 16, filter: 'blur(6px)' });
        if (aboutWords.length) gsap.set(aboutWords, { opacity: 0, y: 22, filter: 'blur(8px)' });
        if (aboutParas.length) gsap.set(aboutParas, { opacity: 0, y: 18, filter: 'blur(6px)' });
        if (aboutStats.length) {
          gsap.set(aboutStats, { opacity: 0, y: 18, scale: 0.96, filter: 'blur(6px)' });
        }

        // Compute responsive initial and expanded dimensions for the glass card
        const getInitialCardMetrics = () => {
          const vw = window.innerWidth;
          const vh = window.innerHeight;
          const introEl = document.getElementById('heroIntroBody');
          const minIntroH = introEl ? introEl.scrollHeight + 70 : 256;
          if (vw <= 768) {
            return {
              width: Math.round(vw * 0.92),
              height: Math.round(Math.min(Math.max(minIntroH, 252), 276)),
            };
          }
          if (vw <= 900) {
            return {
              width: Math.round(vw * 0.9),
              height: Math.round(Math.max(minIntroH, Math.min(Math.max(vh * 0.38, 280), 345))),
            };
          }
          return {
            width: Math.round(Math.min(vw * 0.61, 920)),
            height: Math.round(Math.max(minIntroH, Math.min(Math.max(vh * 0.42, 310), 410))),
          };
        };

        const measureAboutNaturalHeight = (paddingExtra: number) => {
          const aboutInner = document.getElementById('heroAboutBody');
          if (!aboutInner) return 420;
          const prevHeight = aboutInner.style.height;
          const prevMinHeight = aboutInner.style.minHeight;
          aboutInner.style.height = 'auto';
          aboutInner.style.minHeight = '0';
          const sh = aboutInner.scrollHeight;
          aboutInner.style.height = prevHeight;
          aboutInner.style.minHeight = prevMinHeight;
          return sh + paddingExtra;
        };

        const getExpandedCardMetrics = () => {
          const vw = window.innerWidth;
          const vh = window.innerHeight;
          const centerEl = document.querySelector<HTMLElement>('.a2h-hero__center');
          const currentMarginTop = centerEl
            ? parseFloat(window.getComputedStyle(centerEl).marginTop) || vh * 0.08
            : vh * 0.08;

          if (vw <= 768) {
            const w = Math.round(vw * 0.92);
            const naturalH = measureAboutNaturalHeight(88);
            const h = Math.round(
              Math.min(vh - 28, Math.max(naturalH, 400))
            );
            const desiredTop = Math.max(14, (vh - h) / 2);
            return {
              width: w,
              height: h,
              yOffset: Math.round(desiredTop - currentMarginTop),
              riseYPercent: -4,
            };
          }

          // Expansive 16:9 aspect ratio on desktop & tablet utilizing generous viewport space
          const naturalH = measureAboutNaturalHeight(88);
          const maxW = Math.min(vw * 0.92, 1380);
          const maxH = Math.min(vh * 0.88, 776);
          let w = maxW;
          let h = w * (9 / 16);
          if (h > maxH) {
            h = maxH;
            w = h * (16 / 9);
          }
          if (h < naturalH) {
            h = Math.min(vh - 24, naturalH);
            w = Math.min(vw * 0.94, Math.max(w, h * (16 / 9)));
          }
          const desiredTop = Math.max(14, (vh - h) / 2);
          return {
            width: Math.round(w),
            height: Math.round(h),
            yOffset: Math.round(desiredTop - currentMarginTop),
            riseYPercent: -8,
          };
        };

        // Scroll-Triggered 3D Scene on #hero -> 16:9 Glass Card Expansion & About Us Reveal
        const heroTl = gsap.timeline({
          scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: '+=240%',
            pin: true,
            scrub: 0.65,
            invalidateOnRefresh: true,
            onUpdate: (self: any) => {
              window.dispatchEvent(
                new CustomEvent('a2h-hero-scroll', { detail: self.progress })
              );
            },
          },
        });

        heroScrollTrigger = heroTl.scrollTrigger;
        const counterProxy = { p: 0 };

        // Phase 1: Card rises to its height while meadow background dollies in
        heroTl
          .to(
            '.a2h-hero__bg',
            {
              scale: 1.08,
              yPercent: 2,
              duration: 2.5,
              ease: 'none',
            },
            0
          )
          .fromTo(
            '.a2h-glass-stack',
            {
              yPercent: 0,
              y: 0,
              scale: 1,
            },
            {
              yPercent: () => getExpandedCardMetrics().riseYPercent,
              y: 0,
              scale: 0.985,
              duration: 2.5,
              ease: 'power1.inOut',
            },
            0
          )
          // Phase 2: Hero words & bottom Connect dock fade out of view similarly
          .to(
            '.hero-pill-role',
            {
              opacity: 0,
              y: -16,
              filter: 'blur(8px)',
              duration: 1.5,
              ease: 'power2.in',
            },
            1.1
          )
          .to(
            '#heroTitle .w',
            {
              opacity: 0,
              y: -22,
              filter: 'blur(8px)',
              stagger: 0.04,
              duration: 1.5,
              ease: 'power2.in',
            },
            1.2
          )
          .to(
            '.hero-actions',
            {
              opacity: 0,
              y: -16,
              filter: 'blur(8px)',
              duration: 1.4,
              ease: 'power2.in',
            },
            1.4
          )
          .to(
            '.a2h-connect-dock',
            {
              opacity: 0,
              y: 24,
              filter: 'blur(8px)',
              duration: 1.7,
              ease: 'power2.in',
            },
            1.2
          )
          .to(
            '#heroIntroBody',
            {
              autoAlpha: 0,
              pointerEvents: 'none',
              duration: 0.2,
            },
            3.1
          )
          // Phase 3: After reaching the height, smoothly expand the glass card to 16:9
          .to(
            '.a2h-hero__bg',
            {
              scale: 1.16,
              yPercent: 4,
              duration: 6.5,
              ease: 'none',
            },
            2.5
          )
          .fromTo(
            '.a2h-hero__center',
            {
              width: () => getInitialCardMetrics().width,
            },
            {
              width: () => getExpandedCardMetrics().width,
              duration: 3.4,
              ease: 'power2.inOut',
              immediateRender: true,
            },
            2.7
          )
          .fromTo(
            '#heroGlassCard',
            {
              height: () => getInitialCardMetrics().height,
              minHeight: () => getInitialCardMetrics().height,
              background:
                'linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(250, 252, 248, 0.44) 55%, rgba(244, 247, 240, 0.56) 100%)',
            },
            {
              height: () => getExpandedCardMetrics().height,
              minHeight: () => getExpandedCardMetrics().height,
              background:
                'linear-gradient(180deg, rgba(255, 255, 255, 0.76) 0%, rgba(248, 251, 245, 0.64) 55%, rgba(242, 246, 238, 0.72) 100%)',
              duration: 3.4,
              ease: 'power2.inOut',
              immediateRender: true,
            },
            2.7
          )
          .to(
            '.a2h-glass-stack',
            {
              yPercent: 0,
              y: () => getExpandedCardMetrics().yOffset,
              scale: 1,
              duration: 3.4,
              ease: 'power2.inOut',
            },
            2.7
          )
          // Phase 4: Animate words & reveal About Us details inside the 16:9 card
          .to(
            '#heroAboutBody',
            {
              autoAlpha: 1,
              pointerEvents: 'auto',
              duration: 0.2,
            },
            5.2
          )
          .to(
            '.a2h-about-pill',
            {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 1.0,
              ease: 'power3.out',
            },
            5.3
          )
          .to(
            '#heroAboutTitle .w',
            {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              stagger: 0.045,
              duration: 1.4,
              ease: 'power3.out',
            },
            5.5
          )
          .to(
            '.a2h-about-para',
            {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              stagger: 0.16,
              duration: 1.3,
              ease: 'power3.out',
            },
            6.2
          )
          .to(
            '.a2h-about-stat',
            {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: 'blur(0px)',
              stagger: 0.08,
              duration: 1.2,
              ease: 'power3.out',
            },
            6.7
          )
          .to(
            counterProxy,
            {
              p: 1,
              duration: 2.0,
              ease: 'power2.out',
              onUpdate: () => setCounters(counterProxy.p),
            },
            6.7
          )
          // Hold buffer at the end of the 16:9 About Us reveal
          .to({}, { duration: 1.0 }, 8.8);

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
