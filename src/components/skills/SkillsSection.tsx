import React from 'react';

export const SkillsSection: React.FC = () => {
  const skills = [
    { name: 'Python / Machine Learning', pct: 92, barColor: 'bg-secondary-container', textColor: 'text-secondary-container' },
    { name: 'Data Visualisation', pct: 90, barColor: 'bg-tertiary', textColor: 'text-tertiary' },
    { name: 'Flutter / Dart Applications', pct: 88, barColor: 'bg-primary', textColor: 'text-primary' },
    { name: 'React / JavaScript Web', pct: 86, barColor: 'bg-secondary', textColor: 'text-secondary' },
  ];

  return (
    <section className="w-full px-margin-sm md:px-margin lg:px-margin-lg py-space-xl bg-surface">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
        {/* Left Column: Heavy Diagnostic Matrix */}
        <div className="lg:col-span-6 flex flex-col gap-space-md">
          <div className="flex items-center gap-space-xs font-label-sm text-label-sm text-primary">
            <span className="material-symbols-outlined text-sm">query_stats</span>
            <span>SKILLS &amp; CAPABILITIES</span>
          </div>
          <h2 className="font-headline-xl text-headline-xl uppercase text-on-surface m-0 leading-tight">
            TECHNICAL <span className="text-secondary-container">SKILLS</span>
          </h2>
          <p className="font-body-md text-body-md text-outline m-0">
            A practical toolkit spanning data science, visualisation, mobile development, web
            applications, backend systems, and collaboration.
          </p>

          {/* Benchmark Sliders/Meters */}
          <div className="flex flex-col gap-space-sm pt-space-sm">
            {skills.map((skill) => (
              <div key={skill.name} className="flex flex-col gap-1">
                <div className="flex justify-between font-label-sm text-label-sm">
                  <span className="text-on-surface uppercase">{skill.name}</span>
                  <span className={`${skill.textColor} font-bold`}>{skill.pct}%</span>
                </div>
                <div className="w-full h-2 bg-surface-container-highest">
                  <div
                    className={`h-full ${skill.barColor}`}
                    style={{ width: `${skill.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Combat Terminal Schematic Card */}
        <div className="lg:col-span-6 bg-surface-container p-space-lg relative border-l-4 border-secondary-container shadow-2xl">
          <div className="flex items-center justify-between font-label-sm text-label-sm text-outline border-b border-surface-variant/40 pb-space-sm mb-space-md">
            <span className="text-tertiary font-bold">// PORTFOLIO_DIAG: ONLINE</span>
            <span>BUILD_LOG: ACTIVE</span>
          </div>
          <div className="grid grid-cols-2 gap-space-md mb-space-md font-label-sm text-label-sm">
            <div className="bg-surface-container-lowest p-space-sm flex flex-col gap-1">
              <span className="text-outline">EDUCATION</span>
              <span className="font-headline-sm text-headline-sm text-primary">
                BTECH COMPUTER SCIENCE
              </span>
              <span className="text-outline text-[9px]">
                APJ ABDUL KALAM TECHNOLOGICAL UNIVERSITY
              </span>
            </div>
            <div className="bg-surface-container-lowest p-space-sm flex flex-col gap-1">
              <span className="text-outline">GRADUATION YEAR</span>
              <span className="font-headline-sm text-headline-sm text-secondary-container">
                2028
              </span>
              <span className="text-outline text-[9px]">CURRENT PROGRAM</span>
            </div>
            <div className="bg-surface-container-lowest p-space-sm flex flex-col gap-1">
              <span className="text-outline">EXPERIENCE</span>
              <span className="font-headline-sm text-headline-sm text-tertiary">
                INFOSYS // 2 MONTHS
              </span>
              <span className="text-outline text-[9px]">DATA VISUALIZATION INTERN</span>
            </div>
            <div className="bg-surface-container-lowest p-space-sm flex flex-col gap-1">
              <span className="text-outline">MEDTWIN HACKATHON</span>
              <span className="font-headline-sm text-headline-sm text-on-surface">24 HOURS</span>
              <span className="text-outline text-[9px]">HEALTHCARE APP DEVELOPER</span>
            </div>
          </div>
          <div className="p-space-sm bg-surface-container-lowest font-label-sm text-label-sm text-outline border-l-2 border-primary">
            <p className="m-0 text-on-surface-variant font-label-md text-label-md uppercase">
              &gt; "I turn data into stories and ideas into useful digital experiences."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
