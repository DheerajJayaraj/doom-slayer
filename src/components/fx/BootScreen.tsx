import React, { useEffect, useState } from 'react';

export const BootScreen: React.FC = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timer = setTimeout(
      () => {
        setIsReady(true);
      },
      prefersReducedMotion ? 0 : 650
    );

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`doom-boot ${isReady ? 'is-ready' : ''}`}
      aria-label="Loading Praetor tactical interface"
    >
      <div className="doom-boot__copy">
        <span className="doom-boot__title">RIP // TEAR</span>
        INITIALIZING PRAETOR TELEMETRY...
      </div>
    </div>
  );
};
