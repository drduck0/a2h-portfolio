/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  PenTool,
  Palette,
  Sliders,
  Layers,
  Video,
  Sparkles,
} from 'lucide-react';
import { SOFTWARE_TOOLS } from '../../../constants/portfolioData';

const ICONS_MAP = {
  'pen-tool': PenTool,
  palette: Palette,
  sliders: Sliders,
  layers: Layers,
  video: Video,
  sparkles: Sparkles,
};

export const SoftwareSkills: React.FC = () => {
  return (
    <div className="logos-wrap">
      {/* Frosted strip */}
      <div className="band" id="band" />

      <div className="logos">
        {SOFTWARE_TOOLS.map((tool) => {
          const IconComp = ICONS_MAP[tool.icon];
          return (
            <span key={tool.name} className="tool-chip">
              <IconComp size={14} color={tool.color} />
              {tool.name}
            </span>
          );
        })}
      </div>
    </div>
  );
};
