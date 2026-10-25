import React, { useEffect, useRef, useState, useCallback } from 'react';
import slayerImg from '../../assets/iron-tank-doom-3840x2160-20796.jpg';
import { usePraetorAudio } from '../../context/AudioContext';
import { BladeShieldSvg } from './BladeShieldSvg';
import { ArgentParticleVortex } from './ArgentParticleVortex';
import { HudTelemetryChips } from './HudTelemetryChips';

export const ScrollRunway: React.FC = () => {
  const runwayRef = useRef<HTMLElement | null>(null);
  const { modulateRotor, playArgentLock, playHudChirp, unlockAudio } = usePraetorAudio();

  const [progress, setProgress] = useState(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const lastScrollYRef = useRef(0);
  const lastScrollTimeRef = useRef(performance.now());
  const velocityDecayTimerRef = useRef<number | null>(null);

  const handleScroll = useCallback(() => {
    unlockAudio();
    const now = performance.now();
    const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
    const dt = Math.max(1, now - lastScrollTimeRef.current);
    const dy = Math.abs(currentScrollY - lastScrollYRef.current);

    const velocity = (dy / dt) * 15;
    setScrollVelocity(velocity);
    setScrollY(currentScrollY);
    lastScrollYRef.current = currentScrollY;
    lastScrollTimeRef.current = now;

    const runway = runwayRef.current;
    if (!runway) return;

    const rect = runway.getBoundingClientRect();
    const runwayHeight = runway.offsetHeight;
    const windowHeight = window.innerHeight;
    const totalScrollableDistance = runwayHeight - windowHeight;

    if (totalScrollableDistance > 0) {
      let p = -rect.top / totalScrollableDistance;
      p = Math.max(0, Math.min(1, p));
      setProgress(p);
      modulateRotor(p, velocity);
    }

    if (velocityDecayTimerRef.current) {
      clearTimeout(velocityDecayTimerRef.current);
    }

    velocityDecayTimerRef.current = window.setTimeout(() => {
      setScrollVelocity(0);
      if (runway) {
        const r = runway.getBoundingClientRect();
        const totalDist = runway.offsetHeight - window.innerHeight;
        let p = -r.top / totalDist;
        p = Math.max(0, Math.min(1, p));
        modulateRotor(p, 0);
      }
    }, 90);
  }, [modulateRotor, unlockAudio]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (velocityDecayTimerRef.current) {
        clearTimeout(velocityDecayTimerRef.current);
      }
    };
  }, [handleScroll]);

  const handleNavigateStage = (stage: 1 | 2 | 3) => {
    const runway = runwayRef.current;
    if (!runway) return;

    if (stage === 1) {
      playHudChirp();
      window.scrollTo({ top: runway.offsetTop, behavior: 'smooth' });
    } else if (stage === 2) {
      playHudChirp();
      window.scrollTo({
        top: runway.offsetTop + runway.offsetHeight * 0.45,
        behavior: 'smooth',
      });
    } else {
      playArgentLock();
      window.scrollTo({
        top: runway.offsetTop + runway.offsetHeight * 0.85,
        behavior: 'smooth',
      });
    }
  };

  // 1. Zoom computation
  const zoomFactor = 1.0 + progress * 2.1;
  const zoomTranslateY = -progress * 6;

  // 2. Shield & particle visibility and dynamics
  const isShieldEngaged = progress > 0.08;
  const shieldProgress = isShieldEngaged ? (progress - 0.08) / 0.92 : 0;
  const shieldScale = isShieldEngaged ? Math.min(1.4, 0.4 + shieldProgress * 1.0) : 0.2;
  const shieldOpacity = isShieldEngaged ? Math.min(1, shieldProgress * 2.5) : 0;

  const bladeRotation = scrollY * 1.35;
  const counterRingRotation = -scrollY * 0.75;

  const rpm = isShieldEngaged
    ? Math.floor(600 + progress * 2800 + Math.min(600, scrollVelocity * 40))
    : 0;

  const shieldState: 'STANDBY' | 'BLADES ENGAGED' | 'OVERCHARGE' = !isShieldEngaged
    ? 'STANDBY'
    : progress > 0.7
    ? 'OVERCHARGE'
    : 'BLADES ENGAGED';

  const deflection = isShieldEngaged ? Number((progress * 99.4).toFixed(1)) : 0;

  const phaseLabel: 'TACTICAL RECON' | 'BLADE ROTOR ENGAGED' | 'ARGENT OVERCHARGE' =
    progress < 0.3
      ? 'TACTICAL RECON'
      : progress < 0.7
      ? 'BLADE ROTOR ENGAGED'
      : 'ARGENT OVERCHARGE';

  return (
    <section
      ref={runwayRef}
      className="relative w-full h-[320vh] bg-surface-container-lowest"
      id="armor-scroll-runway"
    >
      {/* STICKY VIEWPORT: 100vh pinned screen where zoom + rotating blade shields occur */}
      <div className="sticky top-20 left-0 w-full h-[calc(100vh-5rem)] overflow-hidden flex items-center justify-center bg-surface-container-lowest">
        {/* Background tactical scanner grid overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#c3cc8c_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-surface-container-lowest via-transparent to-surface-container-lowest z-20" />

        {/* MAIN SLAYER IMAGE & ZOOM WRAPPER */}
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          {/* The Slayer Artwork: Zooms into chestplate */}
          <div
            id="slayer-frame"
            className="relative w-full h-full flex items-center justify-center transition-transform duration-75 will-change-transform z-10"
            style={{
              transformOrigin: '50% 32%',
              transform: `scale(${zoomFactor.toFixed(3)}) translate(0, ${zoomTranslateY.toFixed(1)}%)`,
            }}
          >
            <img
              id="slayer-img"
              src={slayerImg}
              alt="Doom Slayer in Praetor armor"
              className="w-full h-full object-cover object-center select-none pointer-events-none scale-105 translate-y-8"
            />
            {/* SCANLINES OVERLAY EFFECT */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-black/10 to-transparent bg-[length:100%_4px] opacity-40" />
          </div>

          {/* 3D ARGENT ENERGY PARTICLE VORTEX (z-18) */}
          <div
            id="particle-vortex-host"
            className="absolute pointer-events-none z-18 flex items-center justify-center w-[540px] h-[540px] transition-transform duration-75"
            style={{
              top: '32%',
              left: '50%',
              transform: `translate(-50%, -50%) scale(${shieldScale.toFixed(2)})`,
              opacity: shieldOpacity,
            }}
          >
            <ArgentParticleVortex
              scrollProgress={progress}
              scrollVelocity={scrollVelocity}
            />
          </div>

          {/* ROTATING ENERGY KINETIC BLADE SHIELD OVERLAY (z-30) */}
          <div
            id="blade-shield-assembly"
            className="absolute pointer-events-none z-30 transition-all duration-75 flex items-center justify-center w-[440px] h-[440px] drop-shadow-[0_0_18px_rgba(255,86,45,0.7)]"
            style={{
              top: '32%',
              left: '50%',
              transform: `translate(-50%, -50%) scale(${shieldScale.toFixed(2)})`,
              opacity: shieldOpacity,
            }}
          >
            <BladeShieldSvg
              bladeRotation={bladeRotation}
              counterRingRotation={counterRingRotation}
            />
          </div>
        </div>

        {/* TACTICAL HUD HEADS-UP DISPLAY CHIPS & TELEMETRY GAUGES */}
        <HudTelemetryChips
          zoomFactor={zoomFactor}
          rpm={rpm}
          deflection={deflection}
          shieldState={shieldState}
          phaseLabel={phaseLabel}
          runwayProgress={progress}
          onNavigateStage={handleNavigateStage}
        />
      </div>
    </section>
  );
};
