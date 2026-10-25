import React from 'react';
import { usePraetorAudio } from '../../context/AudioContext';

interface FooterProps {
  onScrollToContact: () => void;
  onOverrideProtocols: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToContact, onOverrideProtocols }) => {
  const { playHudTick, playHudChirp } = usePraetorAudio();

  const handleDownloadTelemetryCsv = (e: React.MouseEvent) => {
    e.preventDefault();
    playHudChirp();
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      encodeURIComponent(
        'CATEGORY,METRIC,VALUE,DETAIL\n' +
          'PROFILE,NAME,Dheeraj Jayaraj,Data Scientist & Developer\n' +
          'EDUCATION,DEGREE,BTech Computer Science,APJ Abdul Kalam Technological University\n' +
          'GRADUATION,YEAR,2028,Current Program\n' +
          'EXPERIENCE,INTERNSHIP,Infosys,Data Visualization Intern (2 Months)\n' +
          'HACKATHON,MEDTWIN,Healthcare App,24-Hour Hackathon Developer\n' +
          'SKILL,Python & ML,92%,TensorFlow / Scikit-Learn\n' +
          'SKILL,Data Visualization,90%,Matplotlib / Seaborn / Power BI\n' +
          'SKILL,Flutter & Dart,88%,Cross-Platform Mobile & Web\n' +
          'SKILL,React & JS Web,86%,Modern Frontend Architecture\n' +
          'CONTACT,EMAIL,dheerajjayaraj47@gmail.com,Primary Contact\n' +
          'CONTACT,PHONE,+91 8606807560,Direct Voice/Signal\n' +
          'CODE,GITHUB,https://github.com/DheerajJayaraj,Clearance Level 4\n'
      );
    const link = document.createElement('a');
    link.setAttribute('href', csvContent);
    link.setAttribute('download', 'DHEERAJ_JAYARAJ_TELEMETRY.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <footer className="w-full bg-surface-container-lowest text-on-surface-variant font-label-md text-label-md">
      <div className="w-full px-margin-sm md:px-margin lg:px-margin-lg py-space-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-lg mb-space-lg">
          {/* Column 1 */}
          <div className="flex flex-col gap-space-sm">
            <div className="flex items-center gap-space-xs">
              <span className="font-headline-sm text-headline-sm uppercase text-on-surface">
                DHEERAJ JAYARAJ
              </span>
              <span className="px-space-xs py-0.5 bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">
                DIV-06
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-outline">
              Computer Science student focused on data science, visualisation, Flutter, and web
              development.
            </p>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-space-xs">
            <span className="text-primary font-bold uppercase tracking-wider font-label-sm text-label-sm">
              TELEMETRY LOGS
            </span>
            <a
              className="text-outline hover:text-on-surface transition-colors font-label-sm text-label-sm lowercase"
              href="mailto:dheerajjayaraj47@gmail.com"
              onMouseEnter={playHudTick}
            >
              email: dheerajjayaraj47@gmail.com
            </a>
            <span className="text-outline font-label-sm text-label-sm">PHONE: +91 8606807560</span>
            <a
              className="text-outline hover:text-on-surface transition-colors font-label-sm text-label-sm lowercase"
              href="https://www.linkedin.com/in/dheeraj-jayaraj47"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={playHudTick}
            >
              www.linkedin.com/in/dheeraj-jayaraj47
            </a>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-space-xs">
            <span className="text-tertiary font-bold uppercase tracking-wider font-label-sm text-label-sm">
              CLEARANCE PROTOCOLS
            </span>
            <a
              className="text-outline hover:text-on-surface transition-colors font-label-sm text-label-sm lowercase"
              href="https://github.com/DheerajJayaraj"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={playHudTick}
            >
              github.com/dheerajjayaraj
            </a>
            <span className="text-outline font-label-sm text-label-sm">UNIVERSITY: APJ AKTU</span>
            <span className="text-outline font-label-sm text-label-sm">
              DEGREE: BTECH COMPUTER SCIENCE
            </span>
          </div>

          {/* Column 4 */}
          <div className="flex flex-col gap-space-xs">
            <span className="text-secondary font-bold uppercase tracking-wider font-label-sm text-label-sm">
              TACTICAL COMMS
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                playHudChirp();
                onScrollToContact();
              }}
              onMouseEnter={playHudTick}
              className="text-left text-outline hover:text-on-surface transition-colors font-label-sm text-label-sm bg-transparent border-none p-0 cursor-pointer"
            >
              [TRANSMIT SECURE PACKET]
            </button>
            <button
              type="button"
              onClick={handleDownloadTelemetryCsv}
              onMouseEnter={playHudTick}
              className="text-left text-outline hover:text-on-surface transition-colors font-label-sm text-label-sm bg-transparent border-none p-0 cursor-pointer"
            >
              [DOWNLOAD TELEMETRY CSV]
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onOverrideProtocols();
              }}
              onMouseEnter={playHudTick}
              className="text-left text-outline hover:text-on-surface transition-colors font-label-sm text-label-sm bg-transparent border-none p-0 cursor-pointer"
            >
              [OVERRIDE PROTOCOLS]
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-space-md pt-space-md">
          <div className="flex items-center gap-space-md text-outline font-label-sm text-label-sm">
            <span>(C) DHEERAJ JAYARAJ / PORTFOLIO SYSTEM. ALL RIGHTS RESERVED.</span>
            <span className="hidden sm:inline">//</span>
            <span className="hidden sm:inline text-secondary-container">CODE: BUILD &amp; LEARN</span>
          </div>
          <div className="flex items-center gap-space-md font-label-sm text-label-sm text-outline">
            <span className="text-primary">PORTFOLIO SYSTEM ACTIVE</span>
            <span>LATENCY: 0.04ms</span>
            <span>FOCUS: DATA + APPS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
