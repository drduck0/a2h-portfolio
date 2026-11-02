/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ProjectCategory = 'all' | 'uiux' | 'graphic';

export interface Project {
  id: string;
  num: string;
  title: string;
  category: string;
  type: 'uiux' | 'graphic';
  description: string;
  details: string[];
  tools: string[];
  color: string;
  gradient: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  iconName: 'monitor' | 'palette' | 'video';
  tags: string[];
}

export interface SoftwareTool {
  name: string;
  color: string;
  icon: 'pen-tool' | 'palette' | 'sliders' | 'layers' | 'video' | 'sparkles';
}

export interface StatItem {
  label: string;
  target: number;
  decimals: number;
  suffix: string;
  initialText: string;
}

export interface ProcessStep {
  stepNumber: string;
  num: number;
  title: string;
  description: string;
  cloudAsset: string;
}

export interface ContactChannel {
  name: string;
  icon: 'mail' | 'linkedin' | 'behance' | 'instagram';
  href?: string;
  isAction?: boolean;
}
