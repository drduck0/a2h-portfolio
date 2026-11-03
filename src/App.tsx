/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { useScrollAnimations } from './hooks/useScrollAnimations';
import { useClipboard } from './hooks/useClipboard';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/hero/HeroSection';
import { AboutSection } from './components/sections/about/AboutSection';
import { ExpertiseSection } from './components/sections/expertise/ExpertiseSection';
import { ProjectsSection } from './components/sections/projects/ProjectsSection';
import { ProcessSection } from './components/sections/process/ProcessSection';
import { ContactSection } from './components/sections/contact/ContactSection';
import { ResumeModal } from './components/sections/contact/ResumeModal';
import { ContactModal } from './components/sections/contact/ContactModal';
import { PERSONAL_INFO } from './constants/portfolioData';

export default function App() {
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const { copied: copiedEmail, copy: copyEmail } = useClipboard();

  // Initialize GSAP, ScrollTrigger, Lenis smooth scroll and animations
  useScrollAnimations();

  return (
    <>
      {/* Main Portfolio Shell */}
      <div id="app">
        {/* Floating pill navigation (appears when scrolled past hero) */}
        <Navbar
          onOpenResume={() => setShowResumeModal(true)}
          onOpenContact={() => setShowContactModal(true)}
        />

        <main>
          {/* Mainframe-Inspired Hero Section */}
          <HeroSection
            onOpenResume={() => setShowResumeModal(true)}
            onOpenContact={() => setShowContactModal(true)}
          />

          {/* About Me & Stats with Cherry Tree & Software Tools */}
          <AboutSection />

          {/* Core Capabilities & Expertise */}
          <ExpertiseSection />

          {/* Featured Works Showcase with Filters & Case Study Modals */}
          <ProjectsSection onInquire={() => setShowContactModal(true)} />

          {/* Design Process 5-Step Vertical Journey */}
          <ProcessSection onInquire={() => setShowContactModal(true)} />

          {/* Let's Connect CTA & Petals */}
          <ContactSection
            copiedEmail={copiedEmail}
            onCopyEmail={() => copyEmail(PERSONAL_INFO.email)}
            onOpenContact={() => setShowContactModal(true)}
            onOpenResume={() => setShowResumeModal(true)}
          />
        </main>

        {/* Full-Height Meadow Footer incorporating Contact & A2H Wordmark */}
        <Footer
          onOpenResume={() => setShowResumeModal(true)}
          onOpenContact={() => setShowContactModal(true)}
          onCopyEmail={() => copyEmail(PERSONAL_INFO.email)}
          copiedEmail={copiedEmail}
        />
      </div>

      {/* Interactive Curriculum Vitae Modal */}
      <ResumeModal
        isOpen={showResumeModal}
        onClose={() => setShowResumeModal(false)}
      />

      {/* Interactive Contact / Message Modal */}
      <ContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        onCopyEmail={() => copyEmail(PERSONAL_INFO.email)}
      />
    </>
  );
}
