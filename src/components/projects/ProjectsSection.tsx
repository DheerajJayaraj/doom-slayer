import React from 'react';
import { ProjectCard } from './ProjectCard';

export const ProjectsSection: React.FC = () => {
  return (
    <section
      id="portfolio-battle-log-arsenal"
      className="w-full px-margin-sm md:px-margin lg:px-margin-lg py-space-xl bg-surface-container-low border-t border-surface-variant/30"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-space-xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md border-b border-surface-variant/40 pb-space-md">
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-space-xs font-label-sm text-label-sm text-secondary-container">
              <span className="material-symbols-outlined text-sm">token</span>
              <span>PROJECTS &amp; EXPERIENCE LEDGER</span>
            </div>
            <h2 className="font-headline-xl text-headline-xl uppercase text-on-surface m-0">
              SELECTED WORK &amp; CAREER LOG
            </h2>
          </div>
          <p className="font-body-md text-body-md text-outline max-w-md m-0">
            Data visualisation, applications, and web experiences built with curiosity, clarity, and
            practical engineering.
          </p>
        </div>

        {/* Bento Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
          {/* CARD 1: Netflix Visualisation */}
          <ProjectCard
            id="netflix-vis"
            badge="DHEERAJ // 2028"
            badgeClass="bg-primary-container text-on-primary-container"
            projectId="NETFLIX-VIS"
            glowColor="bg-secondary-container/10"
            hoverBorder="hover:shadow-[4px_4px_0px_#ff562d]"
            title="NETFLIX CONTENT VISUALISATION"
            titleHoverClass="group-hover:text-secondary-container"
            description="A Python data visualisation project analysing Netflix content strategy and surfacing trends through clear visual storytelling."
            tags={[
              { text: 'PYTHON', colorClass: 'text-primary' },
              { text: 'MATPLOTLIB', colorClass: 'text-tertiary' },
              { text: 'SEABORN', colorClass: 'text-outline' },
            ]}
            metricLabel=""
            metricValue=""
            statusLabel="SYS: DEPLOYED"
            actionText="VIEW VISUALISATION"
            actionColorClass="text-secondary-container hover:text-tertiary"
            url="https://github.com/DheerajJayaraj"
            svgContent={
              <>
                <svg
                  className="w-full h-full text-secondary-container opacity-80"
                  fill="none"
                  viewBox="0 0 200 60"
                >
                  <path
                    d="M0 45 L30 40 L60 50 L80 15 L100 20 L130 5 L160 30 L180 12 L200 35"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle cx="80" cy="15" fill="#00dbe9" r="3" />
                  <circle cx="130" cy="5" fill="#ff562d" r="4" />
                  <circle cx="180" cy="12" fill="#00dbe9" r="3" />
                </svg>
                <span className="absolute bottom-1 right-2 font-label-sm text-label-sm text-outline">
                  DATA STORY: COMPLETE
                </span>
              </>
            }
          />

          {/* CARD 2: Netflix Dashboard */}
          <ProjectCard
            id="netflix-dashboard"
            badge="KINETIC-SCALE"
            badgeClass="bg-secondary-container text-on-secondary-container"
            projectId="NETFLIX-DASHBOARD"
            glowColor="bg-tertiary/10"
            hoverBorder="hover:shadow-[4px_4px_0px_#00dbe9]"
            title="NETFLIX DASHBOARD"
            titleHoverClass="group-hover:text-tertiary"
            description="A dashboard for exploring trends in Netflix content strategy with interactive views and accessible reporting."
            tags={[
              { text: 'POWER BI', colorClass: 'text-primary' },
              { text: 'STREAMLIT', colorClass: 'text-secondary-container' },
              { text: 'DATA DASHBOARD', colorClass: 'text-tertiary' },
            ]}
            metricLabel=""
            metricValue=""
            statusLabel="INSIGHT COVERAGE: HIGH"
            actionText="OPEN DASHBOARD"
            actionColorClass="text-tertiary hover:text-primary"
            url="https://github.com/DheerajJayaraj"
            svgContent={
              <>
                <svg
                  className="w-full h-full text-tertiary opacity-80"
                  fill="none"
                  viewBox="0 0 200 60"
                >
                  <line stroke="currentColor" strokeDasharray="2 2" x1="20" x2="60" y1="30" y2="15" />
                  <line stroke="currentColor" strokeDasharray="2 2" x1="20" x2="60" y1="30" y2="45" />
                  <line stroke="#ff562d" x1="60" x2="110" y1="15" y2="30" />
                  <line stroke="#ff562d" x1="60" x2="110" y1="45" y2="30" />
                  <line stroke="currentColor" x1="110" x2="150" y1="30" y2="15" />
                  <line stroke="currentColor" x1="110" x2="150" y1="30" y2="45" />
                  <line stroke="currentColor" x1="150" x2="185" y1="15" y2="30" />
                  <line stroke="currentColor" x1="150" x2="185" y1="45" y2="30" />
                  <circle cx="20" cy="30" fill="#c3cc8c" r="5" />
                  <circle cx="110" cy="30" fill="#ff562d" r="7" />
                  <circle cx="185" cy="30" fill="#00dbe9" r="5" />
                </svg>
                <span className="absolute bottom-1 right-2 font-label-sm text-label-sm text-secondary-container">
                  THROUGHPUT: 4.2M OPS/S
                </span>
              </>
            }
          />

          {/* CARD 3: Meathook Traversal / Portfolio Website */}
          <ProjectCard
            id="portfolio-web"
            badge="PHYSICS PROTOCOL"
            badgeClass="bg-surface-container-high text-outline"
            projectId="PORTFOLIO-WEB"
            glowColor="bg-primary/10"
            hoverBorder="hover:shadow-[4px_4px_0px_#c3cc8c]"
            title="PORTFOLIO WEBSITE"
            titleHoverClass="group-hover:text-primary"
            description="This portfolio website, built to showcase Flutter web development, UI skills, smooth scrolling, and cross-platform presentation."
            tags={[
              { text: 'FLUTTER WEB', colorClass: 'text-primary' },
              { text: 'DART', colorClass: 'text-tertiary' },
              { text: 'RESPONSIVE UI', colorClass: 'text-outline' },
            ]}
            metricLabel=""
            metricValue=""
            statusLabel="STATUS: ONGOING"
            actionText="VIEW PORTFOLIO"
            actionColorClass="text-primary hover:text-secondary-container"
            onAction={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            svgContent={
              <>
                <svg
                  className="w-full h-full text-primary opacity-80"
                  fill="none"
                  viewBox="0 0 200 60"
                >
                  <path
                    d="M10 50 Q 80 5, 120 30 T 190 10"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray="3 3"
                    strokeWidth="2"
                  />
                  <circle cx="10" cy="50" fill="#ff562d" r="4" />
                  <circle cx="120" cy="30" fill="#00dbe9" r="3" />
                  <circle cx="190" cy="10" fill="#c3cc8c" r="5" />
                </svg>
                <span className="absolute bottom-1 right-2 font-label-sm text-label-sm text-primary">
                  TRAJECTORY: 60Hz VERLET
                </span>
              </>
            }
          />
        </div>
      </div>
    </section>
  );
};
