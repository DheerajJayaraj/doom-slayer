import React from 'react';
import { usePraetorAudio } from '../../context/AudioContext';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeSection, onNavigate }) => {
  const { isMuted, toggleMute, playHudTick, playHudChirp, playArgentLock } = usePraetorAudio();

  const handleCommToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const muted = toggleMute();
    if (!muted) {
      playHudChirp();
    }
  };

  const handleAudioToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const muted = toggleMute();
    if (!muted) {
      playArgentLock();
    }
  };

  const navItems = [
    { id: 'system-overview', label: '01 // SYSTEM OVERVIEW' },
    { id: 'armor-core-and-shields', label: '02 // ARMOR CORE & SHIELDS' },
    { id: 'battle-log-arsenal', label: '03 // BATTLE LOG / ARSENAL' },
    { id: 'contact-transmit', label: '04 // CONTACT / TRANSMIT' },
  ];

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    playHudChirp();
    onNavigate(id);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/95 backdrop-blur-md">
      <div className="w-full px-margin-sm md:px-margin lg:px-margin-lg">
        {/* Top Status Bar (Desktop) */}
        <div className="hidden lg:flex items-center justify-between py-space-xs">
          <div className="flex items-center gap-space-md font-label-sm text-label-sm">
            <div className="flex items-center gap-space-xs text-primary">
              <span className="material-symbols-outlined text-[13px]">shield</span>
              <span>INTEGRITY: 100%</span>
            </div>
            <div className="flex items-center gap-space-xs text-secondary-container animate-pulse">
              <span className="material-symbols-outlined text-[13px]">bolt</span>
              <span>PORTFOLIO SYNC: ACTIVE</span>
            </div>
            <div className="flex items-center gap-space-xs text-tertiary">
              <span className="material-symbols-outlined text-[13px]">radar</span>
              <span>PROJECTS: ONLINE</span>
            </div>
          </div>
          <div className="flex items-center gap-space-md font-label-sm text-label-sm text-outline">
            <span className="text-tertiary font-bold tracking-widest">
              // UAC_MIL_SPEC: DHEERAJ-PORTFOLIO
            </span>
            <span className="text-outline-variant">LOC: SENTINEL_PRIME</span>
            <button
              id="comm-toggle-btn"
              type="button"
              onClick={handleCommToggle}
              onMouseEnter={playHudTick}
              className="flex items-center gap-space-xs px-space-xs py-0.5 bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer border-none"
            >
              <span className="material-symbols-outlined text-[13px]">
                {isMuted ? 'volume_off' : 'volume_up'}
              </span>
              <span id="comm-toggle-label" className="font-label-sm text-label-sm">
                COMM: {isMuted ? 'MUTED' : 'ON'}
              </span>
            </button>
          </div>
        </div>

        {/* Main Header Navigation Bar */}
        <div className="h-20 flex items-center justify-between">
          <div className="flex items-center gap-space-md">
            <div className="flex items-center gap-space-sm">
              <div className="w-10 h-10 bg-secondary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-on-secondary-container text-[24px]">
                  gavel
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm uppercase text-on-surface leading-none tracking-wider">
                  DHEERAJ // PORTFOLIO
                </span>
                <span className="font-label-sm text-label-sm text-secondary-container uppercase tracking-widest">
                  DATA &amp; APP SHOWCASE
                </span>
              </div>
            </div>
            <div className="hidden 2xl:flex items-center px-space-sm py-space-xs bg-surface-container-low font-label-sm text-label-sm text-tertiary">
              <span className="mr-space-xs text-secondary-container font-bold">[STATUS]</span>
              AVAILABLE // KERALA / INDIA
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden xl:flex items-center gap-space-xs">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#portfolio-${item.id}`}
                  data-path={item.id}
                  aria-current={isActive ? 'page' : 'false'}
                  onClick={(e) => handleNavClick(e, item.id)}
                  onMouseEnter={playHudTick}
                  className={`px-space-md py-space-sm font-label-md uppercase tracking-wider transition-colors ${
                    isActive
                      ? 'bg-primary-container text-on-primary-container'
                      : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-space-md">
            {/* Cyberpunk Audio Controller Button */}
            <button
              id="audio-toggle-btn"
              type="button"
              title="Toggle Tactical Sci-Fi Audio Synthesis"
              onClick={handleAudioToggle}
              onMouseEnter={playHudTick}
              className="flex items-center gap-space-xs px-3 py-1.5 bg-surface-container-high hover:bg-surface-container-highest border border-outline-variant/50 hover:border-tertiary text-on-surface transition-all cursor-pointer font-label-sm text-label-sm shadow-[0_0_12px_rgba(0,219,233,0.15)] group"
            >
              <span className="relative flex h-2 w-2">
                {!isMuted && (
                  <span
                    id="audio-beacon-ping"
                    className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-container opacity-75"
                  />
                )}
                <span
                  id="audio-beacon-dot"
                  className={`relative inline-flex rounded-full h-2 w-2 ${
                    isMuted ? 'bg-outline' : 'bg-secondary-container'
                  }`}
                />
              </span>
              <span
                id="audio-icon"
                className={`material-symbols-outlined text-[16px] group-hover:scale-110 transition-transform ${
                  isMuted ? 'text-outline' : 'text-tertiary'
                }`}
              >
                {isMuted ? 'volume_off' : 'volume_up'}
              </span>
              <span
                id="audio-status-label"
                className="tracking-wider uppercase font-semibold text-on-surface"
              >
                AUDIO FEED:{' '}
                {isMuted ? (
                  <span className="text-outline">MUTED</span>
                ) : (
                  <span className="text-tertiary">ONLINE</span>
                )}
              </span>
            </button>

            <div className="hidden sm:flex items-center px-space-sm py-space-xs bg-surface-container-high font-label-sm text-label-sm text-secondary-container uppercase tracking-widest">
              <span className="material-symbols-outlined text-[15px] mr-space-xs">warning</span>
              CS STUDENT // 2028
            </div>

            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
