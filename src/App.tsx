import React, { useEffect, useRef, useState, useCallback } from 'react';
import { usePraetorAudio } from './context/AudioContext';
import { BootScreen } from './components/fx/BootScreen';
import { EmbersCanvas } from './components/fx/EmbersCanvas';
import { PraetorVisor, PraetorVisorRef } from './components/fx/PraetorVisor';
import { Header } from './components/layout/Header';
import { HeroSection } from './components/hero/HeroSection';
import { ScrollRunway } from './components/runway/ScrollRunway';
import { ProjectsSection } from './components/projects/ProjectsSection';
import { SkillsSection } from './components/skills/SkillsSection';
import { ContactSection } from './components/contact/ContactSection';
import { Footer } from './components/layout/Footer';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('system-overview');
  const visorRef = useRef<PraetorVisorRef | null>(null);
  const { playArgentLock } = usePraetorAudio();

  const handleNavigate = useCallback(
    (sectionId: string) => {
      let targetElement: HTMLElement | null = null;
      if (sectionId === 'system-overview') {
        targetElement = document.getElementById('portfolio-system-overview');
      } else if (sectionId === 'armor-core-and-shields') {
        targetElement = document.getElementById('armor-scroll-runway');
      } else if (sectionId === 'battle-log-arsenal') {
        targetElement = document.getElementById('portfolio-battle-log-arsenal');
      } else if (sectionId === 'contact-transmit') {
        targetElement = document.getElementById('portfolio-contact-transmit');
      }

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', `#${targetElement.id}`);
        setActiveSection(sectionId);
      }
    },
    []
  );

  const handleOverrideProtocols = useCallback(() => {
    playArgentLock();
    visorRef.current?.triggerFlash();
  }, [playArgentLock]);

  const scrollToContact = useCallback(() => {
    handleNavigate('contact-transmit');
  }, [handleNavigate]);

  // Section observer for Nav Spy & Impact Reveal
  useEffect(() => {
    const targets: Record<string, HTMLElement | null> = {
      'system-overview': document.getElementById('portfolio-system-overview'),
      'armor-core-and-shields': document.getElementById('armor-scroll-runway'),
      'battle-log-arsenal': document.getElementById('portfolio-battle-log-arsenal'),
      'contact-transmit': document.getElementById('portfolio-contact-transmit'),
    };

    const spyObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;

        for (const [id, el] of Object.entries(targets)) {
          if (el === visible.target) {
            setActiveSection(id);
            break;
          }
        }
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: [0.1, 0.4] }
    );

    Object.values(targets).forEach((el) => {
      if (el) spyObserver.observe(el);
    });

    // Impact reveal observer on sections and cards
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('is-live', entry.isIntersecting);
        });
      },
      { threshold: 0.12 }
    );

    const revealElements = document.querySelectorAll<HTMLElement>('main section, main article');
    revealElements.forEach((el, index) => {
      el.classList.add('impact-reveal');
      el.style.transitionDelay = `${Math.min(index * 35, 180)}ms`;
      revealObserver.observe(el);
    });

    return () => {
      spyObserver.disconnect();
      revealObserver.disconnect();
    };
  }, []);

  return (
    <>
      {/* Tactical atmospheric FX */}
      <BootScreen />
      <EmbersCanvas />
      <PraetorVisor ref={visorRef} />

      {/* Header bar */}
      <Header activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Main Content Area */}
      <main className="w-full pt-20 bg-background relative min-h-screen">
        <div className="flex flex-col w-full text-on-surface">
          <HeroSection />
          <ScrollRunway />
          <ProjectsSection />
          <SkillsSection />
          <ContactSection />
        </div>
      </main>

      {/* Footer */}
      <Footer
        onScrollToContact={scrollToContact}
        onOverrideProtocols={handleOverrideProtocols}
      />
    </>
  );
};
