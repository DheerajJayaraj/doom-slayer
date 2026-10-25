import { useEffect, useState, useRef, useImperativeHandle, forwardRef } from 'react';

export interface PraetorVisorRef {
  triggerFlash: () => void;
}

export const PraetorVisor = forwardRef<PraetorVisorRef>((_, ref) => {
  const [argentPct, setArgentPct] = useState(72);
  const [healthPct, setHealthPct] = useState(100);
  const [sector, setSector] = useState<'DEIMOS' | 'EXULTIA' | 'SENTINEL'>('DEIMOS');
  const [grainY, setGrainY] = useState(0);
  const [isFlashing, setIsFlashing] = useState(false);

  const lastYRef = useRef(window.scrollY);
  const lastFlashRef = useRef(0);
  const shakeTimerRef = useRef<number | null>(null);

  const triggerFlash = () => {
    setIsFlashing(false);
    requestAnimationFrame(() => {
      setIsFlashing(true);
      document.body.classList.remove('doom-shake');
      void document.body.offsetWidth;
      document.body.classList.add('doom-shake');

      if (shakeTimerRef.current) clearTimeout(shakeTimerRef.current);
      shakeTimerRef.current = window.setTimeout(() => {
        document.body.classList.remove('doom-shake');
      }, 220);

      window.setTimeout(() => {
        setIsFlashing(false);
      }, 500);
    });
  };

  useImperativeHandle(ref, () => ({
    triggerFlash,
  }));

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const velocity = Math.abs(currentY - lastYRef.current);
      lastYRef.current = currentY;

      setGrainY(Number((currentY * -0.08).toFixed(1)));

      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const pct = Math.min(100, Math.round((currentY / maxScroll) * 100));

      setArgentPct(72 + Math.round(pct * 0.28));
      setHealthPct(Math.max(68, 100 - Math.floor(pct / 4)));
      setSector(pct < 34 ? 'DEIMOS' : pct < 68 ? 'EXULTIA' : 'SENTINEL');

      if (reduceMotion || velocity < 70 || performance.now() - lastFlashRef.current < 1800) {
        return;
      }

      lastFlashRef.current = performance.now();
      triggerFlash();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (shakeTimerRef.current) clearTimeout(shakeTimerRef.current);
      document.body.classList.remove('doom-shake');
    };
  }, []);

  return (
    <>
      {/* Red screen flash on high velocity scroll */}
      <div
        className={`doom-damage-flash ${isFlashing ? 'flash' : ''}`}
        aria-hidden="true"
      />

      {/* Dynamic scanline grain translating with scroll */}
      <div
        className="doom-scroll-grain"
        style={{ transform: `translateY(${grainY}px)` }}
        aria-hidden="true"
      />

      {/* Fixed Visor Frame with Brackets */}
      <div className="praetor-visor" aria-hidden="true">
        <span className="praetor-visor__readout">
          VISOR_LINK: ACTIVE
          <br />
          ARGENT: <b id="visor-argent">{argentPct}%</b>
        </span>
      </div>

      {/* Fixed Bottom-Left Slayer Status Telemetry */}
      <div className="praetor-telemetry" aria-hidden="true">
        SLAYER_STATUS: ACTIVE
        <br />
        HEALTH: <span id="visor-health">{healthPct}%</span> // SECTOR:{' '}
        <span id="visor-sector">{sector}</span>
      </div>
    </>
  );
});

PraetorVisor.displayName = 'PraetorVisor';
