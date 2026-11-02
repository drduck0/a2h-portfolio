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

      document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
          const targetId = anchor.getAttribute('href');
          if (targetId && targetId !== '#') {
            e.preventDefault();
            lenisInstance?.scrollTo(targetId, { duration: 1.6 });
          }
        });
      });

      // 5. INTRO Sequence
      lenisInstance.stop();
      const heroWords = document.querySelectorAll('#heroTitle .w');
      const nav = document.querySelector('.nav');
      const heroPill = document.querySelector('.hero-pill-role');
      const heroBio = document.querySelector('.hero-bio');
      const heroActions = document.querySelector('.hero-actions');

      gsap.set(heroWords, { opacity: 0, y: 24, filter: 'blur(10px)' });
      gsap.set(nav, { opacity: 0, y: -16 });
      if (heroPill) gsap.set(heroPill, { opacity: 0, y: 14 });
      if (heroBio) gsap.set(heroBio, { opacity: 0, y: 16 });
      if (heroActions) gsap.set(heroActions, { opacity: 0, y: 18 });

      const introTl = gsap.timeline({
        delay: 0.25,
        onComplete: () => {
          document.body.classList.remove('intro');
          gsap.set('#app', { clearProps: 'all' });
          const backdrop = document.querySelector('.backdrop');
          if (backdrop) backdrop.remove();
          lenisInstance?.start();
          setupScroll();
        },
      });

      introTl
        .fromTo(
          '#app',
          { scale: 0.9, borderRadius: 28 },
          { scale: 1, borderRadius: 0, duration: 1.4, ease: 'expo.inOut' }
        )
        .to(
          nav,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
          },
          '-=0.5'
        )
        .to(heroPill, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.6')
        .to(
          heroWords,
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, stagger: 0.06, ease: 'power3.out' },
          '-=0.5'
        )
        .to(heroBio, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
        .to(heroActions, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
        .from('.cloud-l', { x: -120, opacity: 0, duration: 1.6, ease: 'power3.out' }, 0.4)
        .from('.cloud-r', { x: 120, opacity: 0, duration: 1.6, ease: 'power3.out' }, 0.4)
        .from(
          '#heroGlass .glass',
          {
            opacity: 0,
            scale: 0.6,
            duration: 0.6,
            stagger: { each: 0.05, from: 'random' },
            ease: 'back.out(2)',
          },
          '-=1'
        );

      // 6. setupScroll
      function setupScroll() {
        // Hero parallax
        gsap.to('.hero-content', {
          yPercent: -45,
          ease: 'none',
          scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });

        document.querySelectorAll<HTMLElement>('.hero [data-par]').forEach((el) => {
          const par = parseFloat(el.getAttribute('data-par') || '0');
          gsap.to(el, {
            y: par * 2,
            ease: 'none',
            scrollTrigger: {
              trigger: '#hero',
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          });
        });

        gsap.to('.hero-media', {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });

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

        // Helper to activate a process panel purely via scroll
        const processPanels = Array.from(document.querySelectorAll<HTMLElement>('#process .panel'));
        let currentProcessIdx = 0;
        function setProcessStep(idx: number) {
          if (idx === currentProcessIdx) return;
          currentProcessIdx = idx;
          processPanels.forEach((panel, i) => {
            panel.classList.toggle('is-active', i === idx);
          });
          window.dispatchEvent(new CustomEvent('process-step-change', { detail: idx }));
        }

        // Loop accordion (desktop/laptop >= 901px): pinned scroll-driven progression
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

          ScrollTrigger.create({
            trigger: '#process',
            start: 'top top',
            end: () => `+=${window.innerHeight * 2.4}`,
            pin: true,
            scrub: true,
            onUpdate: (self: any) => {
              if (!processPanels.length) return;
              const idx = Math.min(
                processPanels.length - 1,
                Math.floor(self.progress * processPanels.length)
              );
              setProcessStep(idx);
            },
          });

          gsap.to('.loop-cloud', {
            x: 70,
            ease: 'none',
            scrollTrigger: {
              trigger: '#process',
              start: 'top bottom',
              end: () => `+=${window.innerHeight * 3.4}`,
              scrub: true,
            },
          });
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
                onEnter: () => setProcessStep(idx),
                onEnterBack: () => setProcessStep(idx),
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
