/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface PillProps {
  children: React.ReactNode;
  reveal?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

export const Pill: React.FC<PillProps> = ({
  children,
  reveal = false,
  className = '',
  icon,
}) => {
  const classes = `pill ${reveal ? 'reveal' : ''} ${className}`.trim();

  return (
    <span className={classes}>
      {icon && <span style={{ marginRight: '6px', display: 'inline-flex' }}>{icon}</span>}
      {children}
    </span>
  );
};
