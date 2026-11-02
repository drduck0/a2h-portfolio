/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';

export const PetalsOverlay: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    el.innerHTML = '';
    for (let i = 0; i < 18; i++) {
      const p = document.createElement('span');
      p.className = 'petal';
      p.style.left = `${Math.random() * 100}%`;
      p.style.setProperty('--dx', `${Math.floor(Math.random() * 160 - 80)}px`);
      p.style.animationDuration = `${(9 + Math.random() * 9).toFixed(1)}s`;
      p.style.animationDelay = `${(-Math.random() * 15).toFixed(1)}s`;
      p.style.transform = `scale(${(0.6 + Math.random() * 0.8).toFixed(2)})`;
      el.appendChild(p);
    }
  }, []);

  return <div ref={containerRef} className="petals" id="petals" aria-hidden="true" />;
};
