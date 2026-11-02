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
  aboutP1: `Hi, I'm Amarnath, a UI/UX and Graphic Designer passionate about creating meaningful visual experiences. I specialize in designing user-friendly interfaces, creative graphics, promotional materials, branding, and digital content.`,
  aboutP2: `I enjoy combining creativity with technology to transform ideas into impactful designs. I believe great design is not just about appearance; it's about communication, simplicity, and user experience.`,
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
  { name: 'Figma', color: '#4d6a10', icon: 'pen-tool' },
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
    category: 'UI/UX Design – Mobile Application',
    type: 'uiux',
    description:
      'Designed a gaming-focused mobile application with an engaging interface and user-friendly navigation.',
    details: [
      'Engineered tournament matchmaking views and esports community dashboards.',
      'Crafted a high-contrast dark theme with neon cherry accents optimized for mobile gamers.',
      'Streamlined user flows for registering, tracking live matches, and sharing gameplay highlights.',
    ],
    tools: ['Figma', 'Prototyping', 'Design Systems', 'Mobile UX'],
    color: '#4d6a10',
    gradient: 'linear-gradient(135deg, #1b2608 0%, #3f580c 100%)',
  },
  {
    id: 'marvel-website',
    num: '02',
    title: 'Marvel Responsive Website',
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
    color: '#8f2323',
    gradient: 'linear-gradient(135deg, #441010 0%, #852222 100%)',
  },
  {
    id: 'entrepreneur-community',
    num: '03',
    title: 'Entrepreneur Community',
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
    color: '#2a5a3a',
    gradient: 'linear-gradient(135deg, #0e2917 0%, #2f6942 100%)',
  },
  {
    id: 'vishnu-hospital',
    num: '04',
    title: 'Vishnu Multispeciality Hospital & Cancer Institute',
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
    color: '#1a5477',
    gradient: 'linear-gradient(135deg, #0a3045 0%, #1e638b 100%)',
  },
  {
    id: 'bairava-motors',
    num: '05',
    title: 'Bairava Motors',
    category: 'Graphic Design & Advertising',
    type: 'graphic',
    description:
      'Designed promotional posters and marketing materials to communicate products and services effectively.',
    details: [
      'Dynamic automotive promotional flyers and seasonal showroom launch banners.',
      'High-impact commercial billboard layouts with bold visual hierarchy.',
      'Social media promotional kits and digital advertisement reels.',
    ],
    tools: ['Adobe Photoshop', 'Illustrator', 'Visual Identity', 'Advertising'],
    color: '#6e4313',
    gradient: 'linear-gradient(135deg, #372007 0%, #7c4c15 100%)',
  },
  {
    id: 'oel-logistics',
    num: '06',
    title: 'OEL Logistics',
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
    color: '#183c55',
    gradient: 'linear-gradient(135deg, #0d2230 0%, #1c4b6c 100%)',
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    stepNumber: '01',
    num: 1,
    title: 'Discover',
    description: 'Understanding the project, objectives, and requirements to establish clear creative targets.',
    cloudAsset: ASSETS.CLOUD_B,
  },
  {
    stepNumber: '02',
    num: 2,
    title: 'Research',
    description: 'Exploring ideas, references, user patterns, and creative possibilities across industries.',
    cloudAsset: ASSETS.CLOUD_A,
  },
  {
    stepNumber: '03',
    num: 3,
    title: 'Design',
    description: 'Transforming concepts into meaningful visual designs, prototypes, and structured layouts.',
    cloudAsset: ASSETS.CLOUD_B,
  },
  {
    stepNumber: '04',
    num: 4,
    title: 'Refine',
    description: 'Improving layouts, colors, typography, micro-interactions, and overall user experience.',
    cloudAsset: ASSETS.CLOUD_A,
  },
  {
    stepNumber: '05',
    num: 5,
    title: 'Deliver',
    description: 'Presenting polished, production-ready final designs with developer assets and design guidelines.',
    cloudAsset: ASSETS.CLOUD_B,
  },
];
