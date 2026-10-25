import React from 'react';
import portraitImg from '../../assets/dheeraj-jayaraj.jpg';

export const HeroSection: React.FC = () => {
  return (
    <section
      id="portfolio-system-overview"
      className="w-full px-margin-sm md:px-margin lg:px-margin-lg py-space-xl relative overflow-hidden bg-surface-container-lowest"
    >
      {/* Ambient Argent Glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-secondary-container/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto flex flex-col gap-space-lg relative z-10">
        {/* Top HUD Ledger */}
        <div className="flex flex-wrap items-center justify-between gap-space-sm font-label-sm text-label-sm text-outline border-b border-surface-variant/40 pb-space-sm">
          <div className="flex items-center gap-space-sm">
            <span className="px-space-xs py-0.5 bg-secondary-container text-on-secondary-container font-bold">
              SYSTEM ACTIVE
            </span>
            <span className="text-tertiary font-bold tracking-widest">
              // PORTFOLIO: DHEERAJ-JAYARAJ
            </span>
            <span className="hidden sm:inline text-outline-variant">BUILD_V4.0.8_RELEASE</span>
          </div>
          <div className="flex items-center gap-space-md">
            <span className="text-primary flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping inline-block" />
              PROFILE: READY
            </span>
            <span className="text-outline">DISCIPLINE: DATA / APPLICATIONS</span>
          </div>
        </div>

        {/* Hero Typography Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-end">
          <div className="lg:col-span-8 flex flex-col gap-space-xs">
            <span className="font-label-md text-label-md uppercase tracking-[0.25em] text-secondary-container">
              // DATA SCIENTIST &amp; WEB / FLUTTER DEVELOPER
            </span>
            <div className="flex items-center gap-space-md">
              <div className="relative shrink-0 w-24 h-28 sm:w-28 sm:h-36 border-2 border-primary bg-surface-container overflow-hidden shadow-[4px_4px_0px_#ff562d]">
                <img
                  className="w-full h-full object-cover object-top grayscale-[.2] contrast-125"
                  src={portraitImg}
                  alt="Portrait of Dheeraj Jayaraj"
                />
                <span className="absolute bottom-0 left-0 right-0 px-1 py-0.5 bg-surface-container-lowest/90 text-tertiary font-label-sm text-label-sm text-center">
                  ID // DJ-2028
                </span>
              </div>
              <h1 className="font-display-hero text-display-hero uppercase tracking-tight text-on-surface leading-none m-0">
                DHEERAJ <span className="text-secondary-container">JAYARAJ</span>
              </h1>
            </div>
            <p className="font-body-lg text-body-lg text-outline max-w-2xl mt-space-xs">
              I build beautiful cross-platform apps with Flutter, explore data science, and turn
              complex datasets into clear, useful visual stories.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-space-sm bg-surface-container-low p-space-md shadow-xl">
            <div className="flex items-center justify-between font-label-sm text-label-sm text-tertiary">
              <span>[DIRECTIVE: TELEMETRY VIEW]</span>
              <span className="text-secondary-container font-bold">RUNWAY READY</span>
            </div>
            <p className="font-body-sm text-body-sm text-outline m-0">
              Explore Dheeraj's projects, skills, education, and experience in data science,
              visualisation, Flutter, and web development.
            </p>
            <div className="flex items-center gap-space-xs text-primary font-label-sm text-label-sm pt-space-xs">
              <span className="material-symbols-outlined text-sm animate-bounce">
                arrow_downward
              </span>
              <span>SCROLL DOWNWARD TO EXPLORE PORTFOLIO</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
