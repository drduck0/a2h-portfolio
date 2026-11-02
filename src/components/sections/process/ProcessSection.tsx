/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { Pill } from '../../common/Pill';
import { ProcessPanel } from './ProcessPanel';
import { ASSETS } from '../../../constants/assets';
import { PROCESS_STEPS } from '../../../constants/portfolioData';

export const ProcessSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const handleStepChange = (e: Event) => {
      const customEvent = e as CustomEvent<number>;
      if (typeof customEvent.detail === 'number') {
        setActiveStep(customEvent.detail);
      }
    };
    window.addEventListener('process-step-change', handleStepChange);
    return () => {
      window.removeEventListener('process-step-change', handleStepChange);
    };
  }, []);

  return (
    <section className="loop" id="process" data-section="loop">
      {/* Drifting cloud with frosted squares (desktop/laptop) */}
      <div className="loop-cloud" data-par="-50">
        <img className="drift-a" src={ASSETS.CLOUD_A} alt="" style={{ width: '100%' }} />
        <div className="glass" style={{ left: '6%', top: '30%', width: '15%', aspectRatio: '1' }} />
        <div className="glass" style={{ left: '23%', top: '58%', width: '13%', aspectRatio: '1' }} />
        <div className="glass" style={{ left: '38%', top: '24%', width: '13%', aspectRatio: '1' }} />
      </div>

      <div className="loop-head">
        <Pill reveal>My Design Process</Pill>
        <h2 className="h2 split">From Idea to Final Creation.</h2>
      </div>

      <div className="track" id="track">
        {PROCESS_STEPS.map((step, idx) => (
          <ProcessPanel
            key={step.num}
            step={step}
            isActive={activeStep === idx}
          />
        ))}
      </div>
    </section>
  );
};
