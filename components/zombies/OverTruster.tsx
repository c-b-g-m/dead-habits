'use client';

import { ZombieState } from '@/types';

interface OverTrusterProps {
  state: ZombieState;
  size?: 'sm' | 'md' | 'lg';
}

// Replace with: AI-generated portrait of an uncritical AI-deferring zombie
// Concept: wide glowing eyes, stacked papers, AI text reflected in pupils
// Suggested prompt: "photorealistic zombie professor in dark academic library,
//   wide unblinking eyes with green AI text reflected in pupils, arms full of
//   unchecked documents, formal robes, muted green/gray skin, moody dark background"
// Drop image as /public/zombies/over-truster.jpg and update IMAGE_URL below.
const IMAGE_URL = '/zombies/over-truster.jpg';

const STATE_STYLES: Record<ZombieState, React.CSSProperties> = {
  walking: {
    filter: 'brightness(0.85) saturate(0.7)',
    animation: 'zombieWalk 3s ease-in-out infinite',
  },
  running: {
    filter: 'brightness(1.1) saturate(0.5) hue-rotate(10deg)',
    animation: 'zombieLean 0.8s ease-in-out infinite',
  },
  frozen: {
    filter: 'brightness(0.6) saturate(0) contrast(1.1)',
    animation: 'none',
  },
};

function Placeholder() {
  return (
    <div className="w-full h-full bg-[#0A1A0E] flex flex-col items-center justify-center gap-3 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f1a12] to-[#0A1A0E]" />
      {/* Silhouette */}
      <svg width="80" height="120" viewBox="0 0 80 120" fill="none" className="relative z-10 opacity-40">
        <ellipse cx="40" cy="22" rx="16" ry="18" fill="#8A9E8A" />
        {/* Wide eyes */}
        <ellipse cx="33" cy="19" rx="5" ry="6" fill="#0A1A0E" />
        <ellipse cx="47" cy="19" rx="5" ry="6" fill="#0A1A0E" />
        <ellipse cx="33" cy="19" rx="2.5" ry="3" fill="#c8f000" opacity="0.7" />
        <ellipse cx="47" cy="19" rx="2.5" ry="3" fill="#c8f000" opacity="0.7" />
        <rect x="20" y="38" width="40" height="50" rx="4" fill="#8A9E8A" />
        {/* Stacked papers in arms */}
        <rect x="2" y="44" width="20" height="3" rx="1" fill="#e5e9db" opacity="0.5" transform="rotate(-5 2 44)" />
        <rect x="2" y="50" width="20" height="3" rx="1" fill="#e5e9db" opacity="0.5" transform="rotate(-3 2 50)" />
        <rect x="2" y="56" width="20" height="3" rx="1" fill="#e5e9db" opacity="0.4" transform="rotate(-7 2 56)" />
        <rect x="58" y="44" width="20" height="3" rx="1" fill="#e5e9db" opacity="0.5" transform="rotate(5 58 44)" />
        <rect x="58" y="50" width="20" height="3" rx="1" fill="#e5e9db" opacity="0.5" transform="rotate(3 58 50)" />
        <rect x="25" y="86" width="12" height="30" rx="3" fill="#8A9E8A" />
        <rect x="43" y="86" width="12" height="30" rx="3" fill="#8A9E8A" />
        {/* AI text glow */}
        <text x="34" y="38" fontFamily="monospace" fontSize="6" fill="#c8f000" opacity="0.6">AI</text>
      </svg>
      <div className="relative z-10 text-center space-y-1 px-4">
        <p className="font-mono text-[9px] uppercase tracking-widest text-[#4A5E4A]">Portrait Required</p>
        <p className="font-mono text-[8px] text-[#2A3D2C]">The Over-Truster</p>
      </div>
    </div>
  );
}

export function OverTruster({ state, size = 'md' }: OverTrusterProps) {
  // Use placeholder until portrait image is available at /public/zombies/over-truster.jpg
  return (
    <div className="w-full h-full relative overflow-hidden" style={STATE_STYLES[state]}>
      <Placeholder />
    </div>
  );
}
