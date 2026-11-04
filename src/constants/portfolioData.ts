/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ASSETS } from './assets';
import {
  Project,
  SkillCategory,
  SoftwareTool,
  StatItem,
  ProcessStep,
} from '../types/portfolio';

export const PERSONAL_INFO = {
  name: 'Amarnath',
  role: 'UI/UX Designer | Graphic Designer | Creative Designer',
  title: 'Turning Creative Ideas Into Meaningful Digital Experiences.',
  bio: 'I transform ideas into visually engaging designs and user-friendly digital experiences through creativity, design thinking, and modern technology.',
  aboutHeadline: 'A Creative Designer Passionate About Digital Experiences.',
  aboutP1: `Hi, I'm Amarnath, a UI/UX and Graphic Designer. I blend creativity with technology to build intuitive interfaces, compelling brand identities, and impactful digital content. For me, great design isn't just about how it looks—it's about clear communication, simplicity, and a seamless user experience.`,
  aboutP2: '',
  email: 'anandsivanandam03@gmail.com',
  phone: '+91 93608 07505',
  location: 'Chennai, Tamil Nadu, India',
  linkedin: 'https://linkedin.com',
  behance: 'https://behance.net',
  dribbble: 'https://dribbble.com',
  instagram: 'https://instagram.com',
  tagline: 'Designing Ideas. Creating Experiences.',
  copyright: '© 2026 Amarnath. All rights reserved.',
};

export const STATS: StatItem[] = [
  {
    label: 'Projects Completed',
    target: 50,
    decimals: 0,
    suffix: '+',
    initialText: '0+',
  },
  {
    label: 'Design Satisfaction',
    target: 99.4,
    decimals: 1,
    suffix: '%',
    initialText: '0%',
  },
  {
    label: 'Creative Concepts',
    target: 120,
    decimals: 0,
    suffix: '+',
    initialText: '0+',
  },
  {
    label: 'Output Quality',
    target: 100,
    decimals: 0,
    suffix: '%',
    initialText: '0%',
  },
];

export const SOFTWARE_TOOLS: SoftwareTool[] = [
  { name: 'Figma', color: '#0b0d0b', icon: 'pen-tool' },
  { name: 'Adobe Photoshop', color: '#31a8ff', icon: 'palette' },
  { name: 'Adobe Illustrator', color: '#ff9a00', icon: 'sliders' },
  { name: 'Adobe InDesign', color: '#ff3366', icon: 'layers' },
  { name: 'Adobe After Effects', color: '#9999ff', icon: 'video' },
  { name: 'Adobe Premiere Pro', color: '#ea77ff', icon: 'sparkles' },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'UI/UX Design',
    description: 'Intuitive, accessible, and delight-driven interfaces crafted for human experiences.',
    iconName: 'monitor',
    tags: [
      'User Interface Design',
      'User Experience Design',
      'Wireframing',
      'Prototyping',
      'Responsive Web Design',
      'Mobile App Design',
    ],
  },
  {
    title: 'Graphic Design',
    description: 'Compelling branding, visual storytelling, and print collateral that demands attention.',
    iconName: 'palette',
    tags: [
      'Social Media Creatives',
      'Poster & Banner Design',
      'Branding & Visual Identity',
      'Brochure & Booklet Design',
      'Product Listing Images',
      'Marketing Materials',
    ],
  },
  {
    title: 'Motion & Video',
    description: 'Dynamic video edits, fluid animations, and AI-assisted creative workflows.',
    iconName: 'video',
    tags: [
      'Motion Graphics',
      'Video Editing',
      'AI Video Creation',
      'Visual Storytelling',
      'Social Media Design',
      'Print & Editorial Design',
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'gamers-garage',
    num: '01',
    title: 'Gamers Garage',
    headlineLines: ['A study in', 'competitive play', 'and fluid motion.'],
    category: 'UI/UX Design – Mobile Application',
    type: 'uiux',
    description:
      'Designed a gaming-focused mobile application with an engaging interface, tournament brackets, and user-friendly navigation.',
    details: [
      'Engineered tournament matchmaking views and esports community dashboards.',
      'Crafted a high-contrast dark theme with crisp accents optimized for mobile gamers.',
      'Streamlined user flows for registering, tracking live matches, and sharing gameplay highlights.',
    ],
    tools: ['Figma', 'Prototyping', 'Design Systems', 'Mobile UX'],
    color: '#141714',
    gradient: 'linear-gradient(135deg, #0d100d 0%, #242924 100%)',
  },
  {
    id: 'marvel-website',
    num: '02',
    title: 'Marvel Responsive Website',
    headlineLines: ['Stories framed', 'in cinematic scale', 'and proportion.'],
    category: 'Web Design – UI/UX',
    type: 'uiux',
    description:
      'Created a responsive website design inspired by the Marvel universe, focusing on visual storytelling and modern layouts.',
    details: [
      'Interactive comic-panel transitions and hero character spotlight reels.',
      'Multi-device responsive design engineered for seamless tablet and desktop immersion.',
      'Custom typography pairings combining editorial bold headings with sleek readability.',
    ],
    tools: ['Figma', 'Adobe Photoshop', 'Wireframing', 'Responsive Design'],
    color: '#1c221c',
    gradient: 'linear-gradient(135deg, #121612 0%, #2b332b 100%)',
  },
  {
    id: 'entrepreneur-community',
    num: '03',
    title: 'Entrepreneur Community',
    headlineLines: ['Spaces built', 'for founder focus', 'and connection.'],
    category: 'UI/UX Design – Mobile Application',
    type: 'uiux',
    description:
      'Designed a mobile application concept that brings entrepreneurs together through a clean and intuitive user experience.',
    details: [
      'Structured founder discovery feeds, pitch deck feedback hubs, and 1-on-1 mentor scheduling.',
      'Designed frictionless onboarding and verified startup badge verification.',
      'Focused on minimal visual noise to highlight high-value discussion and networking.',
    ],
    tools: ['Figma', 'User Research', 'Wireframing', 'UI Design'],
    color: '#1f2d21',
    gradient: 'linear-gradient(135deg, #111a13 0%, #293d2c 100%)',
  },
  {
    id: 'vishnu-hospital',
    num: '04',
    title: 'Vishnu Multispeciality Hospital & Cancer Institute',
    headlineLines: ['Visual clarity', 'shaped around care', 'and human trust.'],
    category: 'Graphic Design & Healthcare Marketing',
    type: 'graphic',
    description:
      'Created healthcare promotional creatives, cancer awareness campaigns, educational designs, and social media content.',
    details: [
      'Developed empathetic and informative oncology health awareness visual series.',
      'Crafted patient guide brochures, doctor profile banners, and event posters.',
      'Ensured high accessibility and trust-inspiring color psychology across print and digital media.',
    ],
    tools: ['Adobe Illustrator', 'Photoshop', 'InDesign', 'Health Marketing'],
    color: '#1b2824',
    gradient: 'linear-gradient(135deg, #101916 0%, #263833 100%)',
  },
  {
    id: 'bairava-motors',
    num: '05',
    title: 'Bairava Motors',
    headlineLines: ['Bold form,', 'kinetic energy,', 'and print craft.'],
    category: 'Graphic Design & Advertising',
    type: 'graphic',
    description:
      'Designed promotional posters and marketing materials to communicate automotive products and services effectively.',
    details: [
      'Dynamic automotive promotional flyers and seasonal showroom launch banners.',
      'High-impact commercial billboard layouts with bold visual hierarchy.',
      'Social media promotional kits and digital advertisement reels.',
    ],
    tools: ['Adobe Photoshop', 'Illustrator', 'Visual Identity', 'Advertising'],
    color: '#22241d',
    gradient: 'linear-gradient(135deg, #151712 0%, #313529 100%)',
  },
  {
    id: 'oel-logistics',
    num: '06',
    title: 'OEL Logistics',
    headlineLines: ['Global routes', 'mapped with quiet', 'editorial order.'],
    category: 'Corporate Design & Print Media',
    type: 'graphic',
    description:
      'Designed a corporate booklet featuring logistics services, including sea freight, air freight, customs clearance, and transportation.',
    details: [
      '24-page editorial corporate brochure with tailored custom map graphics and vessel icons.',
      'Bespoke infographics detailing customs clearance stages and global supply chain routes.',
      'Strict brand adherence with premium print specifications and matte spot-UV styling.',
    ],
    tools: ['Adobe InDesign', 'Illustrator', 'Editorial Print', 'Infographics'],
    color: '#172121',
    gradient: 'linear-gradient(135deg, #0f1616 0%, #233232 100%)',
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    stepNumber: '01',
    num: 1,
    title: 'Discover — Ideas & Inspiration',
    shortTitle: 'Discover',
    subtitle: 'Ideas & Inspiration',
    description:
      'Immersion into the raw vision—uncovering core objectives, emotional triggers, creative sparks, and directional possibilities before form takes shape.',
    clarityLabel: '20% Clarity · Diffused Spark',
    clarityPercent: 20,
    blurAmount: 14,
    deliverables: ['Creative Vision Brief', 'Moodboard & Visual Direction', 'Project Scope & Goals'],
    activities: [
      'Stakeholder vision alignment & brand immersion',
      'Cross-industry aesthetic & conceptual exploration',
      'Defining core value propositions and success metrics',
    ],
    tools: ['FigJam', 'Milanote', 'Notion'],
    ctaLabel: 'Continue to Research',
    cloudAsset: ASSETS.CLOUD_B,
  },
  {
    stepNumber: '02',
    num: 2,
    title: 'Research',
    shortTitle: 'Research',
    subtitle: 'User & Market Intelligence',
    description:
      'Synthesizing user behaviors, competitive landscapes, and information architecture to turn abstract inspiration into grounded strategic clarity.',
    clarityLabel: '40% Clarity · Emerging Contours',
    clarityPercent: 40,
    blurAmount: 9,
    deliverables: ['User Personas & Journey Maps', 'Competitive Audit Matrix', 'Information Architecture'],
    activities: [
      'Target audience pain-point & behavioral analysis',
      'Benchmarking category leaders and interaction patterns',
      'Structuring user flows, sitemaps, and content hierarchy',
    ],
    tools: ['Figma', 'Maze', 'Miro'],
    ctaLabel: 'Continue to Design',
    cloudAsset: ASSETS.CLOUD_A,
  },
  {
    stepNumber: '03',
    num: 3,
    title: 'Design',
    shortTitle: 'Design',
    subtitle: 'Visual Systems & Prototyping',
    description:
      'Translating strategy into expressive visual architecture—crafting wireframes, scalable design tokens, high-contrast typography, and interactive layouts.',
    clarityLabel: '65% Clarity · Structured Form',
    clarityPercent: 65,
    blurAmount: 5,
    deliverables: ['Interactive Figma Prototypes', 'Scalable UI Design System', 'Bespoke Visual Assets'],
    activities: [
      'Low-to-high fidelity wireframing and layout composition',
      'Color psychology, typographic hierarchy & component tokens',
      'Interactive prototyping for core desktop and mobile journeys',
    ],
    tools: ['Figma', 'Adobe Illustrator', 'Photoshop'],
    ctaLabel: 'Continue to Refine',
    cloudAsset: ASSETS.CLOUD_B,
  },
  {
    stepNumber: '04',
    num: 4,
    title: 'Refine',
    shortTitle: 'Refine',
    subtitle: 'Micro-Interactions & Validation',
    description:
      'Sharpening every pixel and transition—iterating through usability feedback, motion choreography, optical alignment, and accessibility standards.',
    clarityLabel: '85% Clarity · High-Precision Polish',
    clarityPercent: 85,
    blurAmount: 2,
    deliverables: ['Motion & Interaction Specs', 'WCAG Accessibility Audit', 'Usability Iteration Log'],
    activities: [
      'Micro-interaction timing, easing curves & hover physics',
      'Contrast, keyboard navigation & responsive breakpoint testing',
      'Iterative design critiques and edge-case state resolution',
    ],
    tools: ['Figma', 'After Effects', 'Contrast'],
    ctaLabel: 'Continue to Deliver',
    cloudAsset: ASSETS.CLOUD_A,
  },
  {
    stepNumber: '05',
    num: 5,
    title: 'Deliver',
    shortTitle: 'Deliver',
    subtitle: 'Production Handoff & Launch',
    description:
      'Bringing the complete vision into razor-sharp reality—shipping production-ready design systems, annotated developer specs, and launch-ready assets.',
    clarityLabel: '100% Clarity · Crystal Horizon',
    clarityPercent: 100,
    blurAmount: 0,
    deliverables: ['Production Design Handoff', 'Annotated Component Library', 'Launch & Brand Guidelines'],
    activities: [
      'Comprehensive developer handoff with CSS/token documentation',
      'Exporting optimized SVG, print, and multi-resolution media kits',
      'Post-launch visual QA and ongoing design evolution support',
    ],
    tools: ['Figma Dev Mode', 'InDesign', 'Design Tokens'],
    ctaLabel: 'Start a Project With Me',
    cloudAsset: ASSETS.CLOUD_B,
  },
];
