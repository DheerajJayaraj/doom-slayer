import React from 'react';
import { usePraetorAudio } from '../../context/AudioContext';

interface HudTelemetryChipsProps {
  zoomFactor: number;
  rpm: number;
  deflection: number;
  shieldState: 'STANDBY' | 'BLADES ENGAGED' | 'OVERCHARGE';
  phaseLabel: 'TACTICAL RECON' | 'BLADE ROTOR ENGAGED' | 'ARGENT OVERCHARGE';
  runwayProgress: number;
  onNavigateStage: (stage: 1 | 2 | 3) => void;
}

export const HudTelemetryChips: React.FC<HudTelemetryChipsProps> = ({
  zoomFactor,
  rpm,
  deflection,
  shieldState,
  phaseLabel,
  runwayProgress,
  onNavigateStage,
}) => {
  const { playHudTick } = usePraetorAudio();
  const pctInt = Math.floor(runwayProgress * 100);
  const zoomPct = Math.min(100, Math.max(0, Math.floor(((zoomFactor - 1) / 2.1) * 100)));
  const rpmPct = Math.min(100, Math.max(0, Math.floor(runwayProgress * 100)));

  return (
    <>
      {/* Top-Left Target Status Lock */}
      <div className="absolute top-6 left-6 z-40 flex flex-col gap-space-xs bg-surface-container-lowest/90 backdrop-blur-md p-space-md border border-outline-variant/30 max-w-xs shadow-2xl">
        <div className="flex items-center justify-between font-label-sm text-label-sm">
          <span className="text-tertiary font-bold">[OPTICAL FOCUS]</span>
          <span
            className={
              runwayProgress > 0.7
                ? 'text-secondary-container font-bold animate-pulse'
                : runwayProgress >= 0.3
                ? 'text-tertiary font-bold'
                : 'text-primary font-bold'
            }
          >
            {phaseLabel}
          </span>
        </div>
        <div className="font-headline-sm text-headline-sm uppercase text-on-surface flex items-baseline justify-between">
          <span>{zoomFactor.toFixed(2)}X</span>
          <span className="font-label-sm text-label-sm text-outline">TORSO LOCK</span>
        </div>
        {/* Zoom Progress Bar */}
        <div className="w-full h-1.5 bg-surface-container-high overflow-hidden">
          <div
            className="h-full bg-tertiary transition-all duration-75"
            style={{ width: `${Math.max(10, zoomPct)}%` }}
          />
        </div>
        <div className="flex justify-between font-label-sm text-label-sm text-outline pt-1">
          <span>TGT: PRAETOR CORE</span>
          <span>COORD: 44.88 // 12.01</span>
        </div>
      </div>

      {/* Top-Right Dynamic Blade Rotor Diagnostics */}
      <div className="absolute top-6 right-6 z-40 flex flex-col gap-space-xs bg-surface-container-lowest/90 backdrop-blur-md p-space-md border border-outline-variant/30 min-w-[240px] shadow-2xl">
        <div className="flex items-center justify-between font-label-sm text-label-sm">
          <span className="text-secondary-container font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-xs">rotate_right</span>
            SHIELD ROTOR
          </span>
          <span
            className={
              shieldState === 'OVERCHARGE'
                ? 'text-secondary-container font-bold animate-pulse'
                : shieldState === 'BLADES ENGAGED'
                ? 'text-tertiary font-bold'
                : 'text-outline'
            }
          >
            {shieldState}
          </span>
        </div>
        <div className="font-headline-sm text-headline-sm uppercase text-on-surface flex items-baseline justify-between">
          <span>{rpm.toString().padStart(4, '0')} RPM</span>
          <span className="font-label-sm text-label-sm text-primary">KINETIC</span>
        </div>
        {/* RPM Bar Indicator */}
        <div className="w-full h-1.5 bg-surface-container-high overflow-hidden">
          <div
            className="h-full bg-secondary-container transition-all duration-75"
            style={{ width: `${rpmPct}%` }}
          />
        </div>
        <div className="flex justify-between font-label-sm text-label-sm text-outline pt-1">
          <span>BLADES: 6x TUNGSTEN</span>
          <span>DEFLECT: {deflection.toFixed(1)}%</span>
        </div>
      </div>

      {/* Bottom Horizontal Stage Progress Bar and Directives */}
      <div className="absolute bottom-6 left-6 right-6 z-40 flex flex-col sm:flex-row items-center justify-between gap-space-sm bg-surface-container-lowest/95 backdrop-blur-md p-space-sm border border-outline-variant/30">
        {/* Interactive Stage Badges */}
        <div className="flex items-center gap-space-xs flex-wrap">
          <button
            type="button"
            onClick={() => onNavigateStage(1)}
            onMouseEnter={playHudTick}
            className={`px-space-xs py-1 font-label-sm text-label-sm transition-colors border-none cursor-pointer ${
              runwayProgress < 0.3
                ? 'bg-primary text-on-primary font-bold'
                : 'bg-surface-container text-outline hover:text-on-surface'
            }`}
          >
            01 // RECON VIEW
          </button>
          <button
            type="button"
            onClick={() => onNavigateStage(2)}
            onMouseEnter={playHudTick}
            className={`px-space-xs py-1 font-label-sm text-label-sm transition-colors border-none cursor-pointer ${
              runwayProgress >= 0.3 && runwayProgress < 0.7
                ? 'bg-tertiary text-on-tertiary font-bold'
                : 'bg-surface-container text-outline hover:text-on-surface'
            }`}
          >
            02 // BLADE SHIELD ENGAGED
          </button>
          <button
            type="button"
            onClick={() => onNavigateStage(3)}
            onMouseEnter={playHudTick}
            className={`px-space-xs py-1 font-label-sm text-label-sm transition-colors border-none cursor-pointer ${
              runwayProgress >= 0.7
                ? 'bg-secondary-container text-on-secondary-container font-bold'
                : 'bg-surface-container text-outline hover:text-on-surface'
            }`}
          >
            03 // ARGENT OVERCLOCK
          </button>
        </div>

        <div className="flex items-center gap-space-md font-label-sm text-label-sm text-outline">
          <div className="flex items-center gap-2">
            <span>SCROLL PROGRESS:</span>
            <span className="text-tertiary font-bold font-label-md text-label-md">
              {pctInt}%
            </span>
          </div>
          <div className="hidden md:flex items-center gap-1 text-primary">
            <span className="material-symbols-outlined text-sm">tune</span>
            <span>VELOCITY DRIVEN DYNAMICS</span>
          </div>
        </div>
      </div>
    </>
  );
};
