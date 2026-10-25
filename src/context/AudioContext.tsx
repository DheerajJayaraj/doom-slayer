import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import { AudioContextType } from '../types/portfolio';

const AudioContextInstance = createContext<AudioContextType | null>(null);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);
  const isMutedRef = useRef(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const initializedRef = useRef(false);

  // Synthesizer nodes
  const rotorOsc1Ref = useRef<OscillatorNode | null>(null);
  const rotorOsc2Ref = useRef<OscillatorNode | null>(null);
  const rotorNoiseSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const noiseFilterRef = useRef<BiquadFilterNode | null>(null);
  const rotorFilterRef = useRef<BiquadFilterNode | null>(null);
  const rotorGainRef = useRef<GainNode | null>(null);
  const rotorOverclockGainRef = useRef<GainNode | null>(null);
  const rotorOverclockOscRef = useRef<OscillatorNode | null>(null);
  const noiseBufferRef = useRef<AudioBuffer | null>(null);
  const scrollWindingAudioRef = useRef<HTMLAudioElement | null>(null);

  const initAudio = useCallback(() => {
    if (initializedRef.current) {
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume().catch(() => {});
      }
      return;
    }

    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;

      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      const master = ctx.createGain();
      master.gain.setValueAtTime(isMutedRef.current ? 0 : 0.8, ctx.currentTime);
      master.connect(ctx.destination);
      masterGainRef.current = master;

      // 1. Noise buffer
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * 0.5;
      }
      noiseBufferRef.current = noiseBuffer;

      // 2. Rotor synthesizer
      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      osc1.type = 'square';
      osc1.frequency.setValueAtTime(28, now);
      rotorOsc1Ref.current = osc1;

      const osc2 = ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(56, now);
      rotorOsc2Ref.current = osc2;

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;
      rotorNoiseSourceRef.current = noiseSource;

      const nFilter = ctx.createBiquadFilter();
      nFilter.type = 'bandpass';
      nFilter.frequency.setValueAtTime(760, now);
      nFilter.Q.setValueAtTime(5.5, now);
      noiseFilterRef.current = nFilter;

      const nGain = ctx.createGain();
      nGain.gain.setValueAtTime(0.18, now);
      noiseSource.connect(nFilter);
      nFilter.connect(nGain);

      const ocOsc = ctx.createOscillator();
      ocOsc.type = 'triangle';
      ocOsc.frequency.setValueAtTime(180, now);
      rotorOverclockOscRef.current = ocOsc;

      const ocGain = ctx.createGain();
      ocGain.gain.setValueAtTime(0.0, now);
      ocOsc.connect(ocGain);
      rotorOverclockGainRef.current = ocGain;

      const rFilter = ctx.createBiquadFilter();
      rFilter.type = 'lowpass';
      rFilter.frequency.setValueAtTime(680, now);
      rFilter.Q.setValueAtTime(2.8, now);
      rotorFilterRef.current = rFilter;

      osc1.connect(rFilter);
      osc2.connect(rFilter);
      nGain.connect(rFilter);
      ocGain.connect(rFilter);

      const rGain = ctx.createGain();
      rGain.gain.setValueAtTime(0.0001, now);
      rotorGainRef.current = rGain;

      rFilter.connect(rGain);
      rGain.connect(master);

      osc1.start(now);
      osc2.start(now);
      noiseSource.start(now);
      ocOsc.start(now);

      // 3. Scroll winding audio element
      const audioUrl = `${import.meta.env.BASE_URL}assets/time-accelerate.mp3`.replace('//', '/');
      const audio = new Audio(audioUrl);
      audio.loop = true;
      audio.preload = 'auto';
      audio.volume = 0;
      scrollWindingAudioRef.current = audio;

      initializedRef.current = true;
    } catch (e) {
      console.warn('Praetor WebAudio initialization deferred:', e);
    }
  }, []);

  const setMute = useCallback((mute: boolean) => {
    isMutedRef.current = mute;
    setIsMuted(mute);
    const ctx = audioCtxRef.current;
    const master = masterGainRef.current;
    if (ctx && master) {
      const now = ctx.currentTime;
      master.gain.cancelScheduledValues(now);
      master.gain.linearRampToValueAtTime(mute ? 0 : 0.8, now + 0.05);
    }
    const winding = scrollWindingAudioRef.current;
    if (winding) {
      winding.volume = mute ? 0 : winding.volume;
      if (mute) winding.pause();
    }
  }, []);

  const toggleMute = useCallback(() => {
    initAudio();
    const newMute = !isMutedRef.current;
    setMute(newMute);
    return newMute;
  }, [initAudio, setMute]);

  const modulateRotor = useCallback((progress: number, scrollVelocity: number) => {
    if (!initializedRef.current || !audioCtxRef.current || isMutedRef.current) return;
    const ctx = audioCtxRef.current;
    const now = ctx.currentTime;

    const osc1 = rotorOsc1Ref.current;
    const osc2 = rotorOsc2Ref.current;
    const rFilter = rotorFilterRef.current;
    const nFilter = noiseFilterRef.current;
    const ocOsc = rotorOverclockOscRef.current;
    const ocGain = rotorOverclockGainRef.current;
    const rGain = rotorGainRef.current;
    const winding = scrollWindingAudioRef.current;

    if (progress > 0.05) {
      const speedFactor = Math.min(3.5, 0.4 + progress * 2.2 + scrollVelocity * 0.06);
      const baseFreq = 30 * speedFactor;
      const filterCutoff = Math.min(2400, 520 + progress * 900 + scrollVelocity * 18);
      const targetVol = Math.min(0.52, 0.08 + progress * 0.30 + (scrollVelocity > 2 ? 0.1 : 0));

      if (osc1) osc1.frequency.setTargetAtTime(baseFreq, now, 0.05);
      if (osc2) osc2.frequency.setTargetAtTime(baseFreq * 2, now, 0.05);
      if (rFilter) rFilter.frequency.setTargetAtTime(filterCutoff, now, 0.06);
      if (nFilter) nFilter.frequency.setTargetAtTime(620 + progress * 900 + scrollVelocity * 12, now, 0.05);

      if (progress > 0.70) {
        const ocIntensity = (progress - 0.70) / 0.30;
        if (ocOsc) ocOsc.frequency.setTargetAtTime(220 + ocIntensity * 260, now, 0.08);
        if (ocGain) ocGain.gain.setTargetAtTime(0.12 * ocIntensity, now, 0.08);
      } else {
        if (ocGain) ocGain.gain.setTargetAtTime(0.0001, now, 0.1);
      }

      if (rGain) rGain.gain.setTargetAtTime(0.0001, now, 0.08);

      if (winding) {
        winding.playbackRate = Math.min(1.65, 0.82 + progress * 0.42 + scrollVelocity * 0.012);
        winding.volume = Math.min(0.62, targetVol);
        if (winding.paused) {
          winding.play().catch(() => {});
        }
      }
    } else {
      if (rGain) rGain.gain.setTargetAtTime(0.0001, now, 0.15);
      if (ocGain) ocGain.gain.setTargetAtTime(0.0001, now, 0.1);
      if (winding) {
        winding.volume = 0;
        winding.pause();
      }
    }
  }, []);

  const playHudTick = useCallback(() => {
    if (!initializedRef.current || !audioCtxRef.current || isMutedRef.current) return;
    const ctx = audioCtxRef.current;
    const master = masterGainRef.current;
    if (!master) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1400, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.035);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

    osc.connect(gain);
    gain.connect(master);

    osc.start(now);
    osc.stop(now + 0.04);
  }, []);

  const playHudChirp = useCallback(() => {
    if (!initializedRef.current || !audioCtxRef.current || isMutedRef.current) return;
    const ctx = audioCtxRef.current;
    const master = masterGainRef.current;
    if (!master) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(920, now);
    osc.frequency.linearRampToValueAtTime(1680, now + 0.025);
    osc.frequency.exponentialRampToValueAtTime(320, now + 0.07);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

    osc.connect(gain);
    gain.connect(master);

    osc.start(now);
    osc.stop(now + 0.075);
  }, []);

  const playArgentLock = useCallback(() => {
    if (!initializedRef.current || !audioCtxRef.current || isMutedRef.current) return;
    const ctx = audioCtxRef.current;
    const master = masterGainRef.current;
    if (!master) return;
    const now = ctx.currentTime;

    // Sub bass heavy impact
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(160, now);
    subOsc.frequency.exponentialRampToValueAtTime(38, now + 0.28);

    subGain.gain.setValueAtTime(0.4, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

    subOsc.connect(subGain);
    subGain.connect(master);
    subOsc.start(now);
    subOsc.stop(now + 0.29);

    // Hi-tech sci-fi ping overlay
    const highOsc = ctx.createOscillator();
    const highGain = ctx.createGain();
    highOsc.type = 'sawtooth';
    highOsc.frequency.setValueAtTime(2200, now);
    highOsc.frequency.exponentialRampToValueAtTime(540, now + 0.12);

    highGain.gain.setValueAtTime(0.12, now);
    highGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    highOsc.connect(highGain);
    highGain.connect(master);
    highOsc.start(now);
    highOsc.stop(now + 0.13);
  }, []);

  const playTransmitSequence = useCallback(() => {
    if (!initializedRef.current || !audioCtxRef.current || isMutedRef.current) return;
    const ctx = audioCtxRef.current;
    const master = masterGainRef.current;
    if (!master) return;
    const now = ctx.currentTime;

    // Ascending power charge sweep
    const sweepOsc = ctx.createOscillator();
    const sweepGain = ctx.createGain();
    sweepOsc.type = 'sawtooth';
    sweepOsc.frequency.setValueAtTime(110, now);
    sweepOsc.frequency.exponentialRampToValueAtTime(1850, now + 0.65);

    sweepGain.gain.setValueAtTime(0.02, now);
    sweepGain.gain.linearRampToValueAtTime(0.25, now + 0.55);
    sweepGain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

    sweepOsc.connect(sweepGain);
    sweepGain.connect(master);
    sweepOsc.start(now);
    sweepOsc.stop(now + 0.71);

    // Confirmation double chirp after sweep
    setTimeout(() => {
      if (!audioCtxRef.current || !masterGainRef.current || isMutedRef.current) return;
      const cCtx = audioCtxRef.current;
      const cMaster = masterGainRef.current;
      const t = cCtx.currentTime;
      [0, 0.12].forEach((offset, idx) => {
        const cOsc = cCtx.createOscillator();
        const cGain = cCtx.createGain();
        cOsc.type = 'sine';
        cOsc.frequency.setValueAtTime(idx === 0 ? 1200 : 1760, t + offset);
        cGain.gain.setValueAtTime(0.2, t + offset);
        cGain.gain.exponentialRampToValueAtTime(0.001, t + offset + 0.08);

        cOsc.connect(cGain);
        cGain.connect(cMaster);
        cOsc.start(t + offset);
        cOsc.stop(t + offset + 0.09);
      });
    }, 650);
  }, []);

  // Unlock audio on initial user gestures
  useEffect(() => {
    const handleGesture = () => {
      initAudio();
      window.removeEventListener('click', handleGesture);
      window.removeEventListener('keydown', handleGesture);
      window.removeEventListener('touchstart', handleGesture);
    };

    window.addEventListener('click', handleGesture, { passive: true });
    window.addEventListener('keydown', handleGesture, { passive: true });
    window.addEventListener('touchstart', handleGesture, { passive: true });

    return () => {
      window.removeEventListener('click', handleGesture);
      window.removeEventListener('keydown', handleGesture);
      window.removeEventListener('touchstart', handleGesture);
    };
  }, [initAudio]);

  return (
    <AudioContextInstance.Provider
      value={{
        isMuted,
        toggleMute,
        playHudTick,
        playHudChirp,
        playArgentLock,
        playTransmitSequence,
        modulateRotor,
        unlockAudio: initAudio,
      }}
    >
      {children}
    </AudioContextInstance.Provider>
  );
};

export const usePraetorAudio = (): AudioContextType => {
  const context = useContext(AudioContextInstance);
  if (!context) {
    throw new Error('usePraetorAudio must be used within an AudioProvider');
  }
  return context;
};
