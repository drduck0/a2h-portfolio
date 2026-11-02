/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ProcessStep } from '../../../types/portfolio';

interface ProcessPanelProps {
  step: ProcessStep;
  isActive: boolean;
  onActivate: () => void;
}

export const ProcessPanel: React.FC<ProcessPanelProps> = ({
  step,
  isActive,
  onActivate,
}) => {
  return (
    <div
      className={`panel ${isActive ? 'is-active' : ''}`}
      tabIndex={0}
      role="button"
      aria-label={`Step ${step.num}: ${step.title}`}
      onClick={onActivate}
      onMouseEnter={onActivate}
      onTouchStart={onActivate}
      onFocus={onActivate}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onActivate();
        }
      }}
    >
      <div className="panel-in">
        <div className="num">{step.num}</div>
        <div className="step">
          <img className="mini-cloud" src={step.cloudAsset} alt="" />
          <h3>{`${step.stepNumber}. ${step.title}`}</h3>
          <p>{step.description}</p>
        </div>
      </div>
    </div>
  );
};
