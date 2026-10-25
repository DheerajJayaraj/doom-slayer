import React from 'react';
import { usePraetorAudio } from '../../context/AudioContext';

export interface ProjectCardProps {
  id: string;
  badge: string;
  badgeClass: string;
  projectId: string;
  glowColor: string;
  hoverBorder: string;
  title: string;
  titleHoverClass: string;
  description: string;
  tags: Array<{ text: string; colorClass: string }>;
  metricLabel: string;
  metricValue: string;
  statusLabel: string;
  actionText: string;
  actionColorClass: string;
  svgContent: React.ReactNode;
  url?: string;
  onAction?: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  badge,
  badgeClass,
  projectId,
  glowColor,
  hoverBorder,
  title,
  titleHoverClass,
  description,
  tags,
  statusLabel,
  actionText,
  actionColorClass,
  svgContent,
  url,
  onAction,
}) => {
  const { playHudTick, playHudChirp } = usePraetorAudio();

  const handleClick = () => {
    playHudChirp();
    if (onAction) {
      onAction();
    } else if (url) {
      window.open(url, '_blank', 'noreferrer');
    }
  };

  return (
    <article
      tabIndex={0}
      onMouseEnter={playHudTick}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      className={`bg-surface-container p-space-lg flex flex-col justify-between group transition-all relative overflow-hidden cursor-pointer ${hoverBorder}`}
    >
      <div
        className={`absolute top-0 right-0 w-24 h-24 ${glowColor} -mr-8 -mt-8 rounded-full pointer-events-none group-hover:scale-150 transition-transform`}
      />

      <div className="flex flex-col gap-space-md">
        <div className="flex items-center justify-between font-label-sm text-label-sm">
          <span className={`px-space-xs py-0.5 font-bold ${badgeClass}`}>{badge}</span>
          <span className="text-tertiary">PROJ_ID: {projectId}</span>
        </div>

        {/* Visual SVG Graphic */}
        <div className="w-full h-28 bg-surface-container-lowest flex items-center justify-center p-space-sm relative overflow-hidden">
          {svgContent}
        </div>

        <div>
          <h3
            className={`font-headline-md text-headline-md text-on-surface uppercase transition-colors m-0 ${titleHoverClass}`}
          >
            {title}
          </h3>
          <p className="font-body-sm text-body-sm text-outline mt-space-xs">{description}</p>
        </div>

        {/* Tech Badges */}
        <div className="flex flex-wrap gap-space-xs font-label-sm text-label-sm">
          {tags.map((tag) => (
            <span
              key={tag.text}
              className={`px-space-xs py-0.5 bg-surface-container-high ${tag.colorClass}`}
            >
              {tag.text}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-space-lg pt-space-sm border-t border-surface-variant/30 flex items-center justify-between">
        <span className="font-label-sm text-label-sm text-outline">{statusLabel}</span>
        <button
          type="button"
          className={`flex items-center gap-1 font-label-md text-label-md uppercase transition-colors cursor-pointer bg-transparent border-none p-0 ${actionColorClass}`}
        >
          <span>{actionText}</span>
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>
    </article>
  );
};
