/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  href?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  href,
  icon,
  children,
  className = '',
  ...rest
}) => {
  const baseClass = variant === 'primary' ? 'btn' : 'btn-secondary';
  const combinedClass = `${baseClass} ${className}`.trim();

  if (href) {
    return (
      <a href={href} className={combinedClass}>
        {children}
        {icon}
      </a>
    );
  }

  return (
    <button className={combinedClass} {...rest}>
      {icon}
      {children}
    </button>
  );
};
