import React, { useState } from 'react';
import { usePraetorAudio } from '../../context/AudioContext';

export const ContactSection: React.FC = () => {
  const { playTransmitSequence, playHudTick, playHudChirp } = usePraetorAudio();

  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'transmitting' | 'transmitted'>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!senderName.trim()) {
      setError('VALIDATION_ERROR: SENDER NAME REQUIRED');
      playHudChirp();
      return;
    }

    if (!senderEmail.trim() || !senderEmail.includes('@')) {
      setError('VALIDATION_ERROR: VALID TRANSMISSION EMAIL REQUIRED');
      playHudChirp();
      return;
    }

    if (!message.trim()) {
      setError('VALIDATION_ERROR: PAYLOAD MESSAGE CANNOT BE EMPTY');
      playHudChirp();
      return;
    }

    setError(null);
    setStatus('transmitting');
    playTransmitSequence();

    setTimeout(() => {
      setStatus('transmitted');
      // Reset form fields after successful transmission
      setSenderName('');
      setSenderEmail('');
      setMessage('');
    }, 1200);
  };

  const handleInputMouseEnter = () => {
    playHudTick();
  };

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    try {
      if (e.target.matches(':focus-visible')) {
        playHudTick();
      }
    } catch {
      playHudTick();
    }
  };

  return (
    <section
      id="portfolio-contact-transmit"
      className="w-full px-margin-sm md:px-margin lg:px-margin-lg py-space-xl bg-surface-container-lowest relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto flex flex-col gap-space-lg relative z-10">
        {/* Console Header */}
        <div className="flex flex-col gap-space-xs text-center items-center">
          <div className="px-space-sm py-1 bg-secondary-container/20 text-secondary-container font-label-sm text-label-sm tracking-widest uppercase">
            CONTACT // COLLABORATE
          </div>
          <h2 className="font-headline-xl text-headline-xl uppercase text-on-surface m-0">
            TRANSMIT SECURE PACKET
          </h2>
          <p className="font-body-md text-body-md text-outline max-w-lg m-0">
            Interested in data science, visualisation, Flutter, web development, or a new
            collaboration? Send a message to Dheeraj.
          </p>
        </div>

        {/* Tactical Form Terminal */}
        <form
          onSubmit={handleSubmit}
          className="bg-surface-container-low p-space-lg md:p-space-xl border-t-2 border-primary flex flex-col gap-space-md shadow-2xl"
        >
          {error && (
            <div className="p-space-sm bg-error-container text-on-error-container font-label-sm text-label-sm flex items-center gap-space-xs border-l-4 border-error">
              <span className="material-symbols-outlined text-sm">warning</span>
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            {/* Input 1 */}
            <div className="flex flex-col gap-space-xs">
              <label
                className="font-label-sm text-label-sm text-tertiary uppercase"
                htmlFor="sender-name"
              >
                [SENDER NAME]
              </label>
              <input
                id="sender-name"
                name="senderName"
                autoComplete="name"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                onMouseEnter={handleInputMouseEnter}
                onFocus={handleInputFocus}
                className="w-full bg-surface-container-lowest px-space-md py-space-sm font-label-md text-label-md text-on-surface placeholder:text-outline border-none focus:outline-none focus:ring-2 focus:ring-tertiary"
                placeholder="ENTER YOUR FULL NAME"
                type="text"
                disabled={status === 'transmitting'}
              />
            </div>

            {/* Input 2 */}
            <div className="flex flex-col gap-space-xs">
              <label
                className="font-label-sm text-label-sm text-primary uppercase"
                htmlFor="sender-email"
              >
                [SENDER EMAIL]
              </label>
              <input
                id="sender-email"
                name="senderEmail"
                autoComplete="email"
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                onMouseEnter={handleInputMouseEnter}
                onFocus={handleInputFocus}
                className="w-full bg-surface-container-lowest px-space-md py-space-sm font-label-md text-label-md text-on-surface placeholder:text-outline border-none focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="ENTER YOUR EMAIL ADDRESS"
                type="email"
                disabled={status === 'transmitting'}
              />
            </div>
          </div>

          {/* Input 4: Payload */}
          <div className="flex flex-col gap-space-xs">
            <label
              className="font-label-sm text-label-sm text-outline uppercase"
              htmlFor="message-payload"
            >
              [MISSION BRIEF / SPECIFICATIONS PAYLOAD]
            </label>
            <textarea
              id="message-payload"
              name="messagePayload"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onMouseEnter={handleInputMouseEnter}
              onFocus={handleInputFocus}
              className="w-full bg-surface-container-lowest p-space-md font-label-md text-label-md text-on-surface placeholder:text-outline border-none focus:outline-none focus:ring-2 focus:ring-secondary-container resize-none"
              placeholder="[ENTER YOUR MESSAGE, PROJECT DETAILS, OR COLLABORATION IDEA...]"
              rows={4}
              disabled={status === 'transmitting'}
            />
          </div>

          {/* Submit Button */}
          <button
            id="btn-transmit"
            type="submit"
            disabled={status === 'transmitting'}
            onMouseEnter={playHudTick}
            className={`w-full py-space-md font-headline-md text-headline-md uppercase tracking-wider transition-all duration-150 cursor-pointer border-none flex items-center justify-center gap-space-sm shadow-[4px_4px_0px_#4b5320] ${
              status === 'transmitted'
                ? 'bg-primary text-on-primary'
                : 'bg-secondary-container text-on-secondary-container hover:bg-tertiary hover:text-on-tertiary'
            }`}
          >
            {status === 'transmitting' ? (
              <>
                <span className="material-symbols-outlined animate-spin">sync</span>
                <span>BROADCASTING TO ORBITAL BEACON...</span>
              </>
            ) : status === 'transmitted' ? (
              <>
                <span className="material-symbols-outlined">check_circle</span>
                <span>PACKET TRANSMITTED // ACK_RECEIVED</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined">send</span>
                <span>SEND MESSAGE // EXECUTE</span>
              </>
            )}
          </button>

          <div className="flex items-center justify-between font-label-sm text-label-sm text-outline pt-space-xs">
            <span>ENCRYPTION: 4096-BIT QUANTUM SHADOW</span>
            <span>DESTINATION: ORBITAL FORTRESS</span>
          </div>
        </form>
      </div>
    </section>
  );
};
