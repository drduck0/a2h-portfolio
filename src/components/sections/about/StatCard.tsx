/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StatItem } from '../../../types/portfolio';

interface StatCardProps {
  stat: StatItem;
}

export const StatCard: React.FC<StatCardProps> = ({ stat }) => {
  return (
    <div
      className="card"
      data-to={stat.target}
      data-dec={stat.decimals}
      data-suf={stat.suffix}
    >
      <span className="label">{stat.label}</span>
      <b>{stat.initialText}</b>
    </div>
  );
};
