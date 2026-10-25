export interface AudioContextType {
  isMuted: boolean;
  toggleMute: () => boolean;
  playHudTick: () => void;
  playHudChirp: () => void;
  playArgentLock: () => void;
  playTransmitSequence: () => void;
  modulateRotor: (progress: number, velocity: number) => void;
  unlockAudio: () => void;
}

export interface TelemetryState {
  scrollY: number;
  scrollVelocity: number;
  runwayProgress: number;
  zoomFactor: number;
  rpm: number;
  deflection: number;
  shieldState: 'STANDBY' | 'BLADES ENGAGED' | 'OVERCHARGE';
  phaseLabel: 'TACTICAL RECON' | 'BLADE ROTOR ENGAGED' | 'ARGENT OVERCHARGE';
  activeStage: 1 | 2 | 3;
}

export interface ProjectItem {
  id: string;
  badge: string;
  badgeType: 'primary' | 'secondary' | 'neutral';
  title: string;
  description: string;
  tech: string[];
  systemMetric: string;
  linkText: string;
  linkUrl?: string;
  graphicType: 'sparkline' | 'cluster' | 'trajectory';
}
