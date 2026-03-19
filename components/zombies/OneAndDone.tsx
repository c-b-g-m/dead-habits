'use client';

import { ZombieState } from '@/types';

interface OneAndDoneProps {
  state: ZombieState;
  size?: 'sm' | 'md' | 'lg';
}

// Replace with: AI-generated portrait of a self-satisfied academic zombie
// Concept: clutching a single printout, broken glasses, dismissive expression
// Suggested prompt: "photorealistic zombie professor in dark academic library,
//   overconfident expression, holding a single printed paper, broken glasses pushed
//   up on forehead, formal suit, muted green/gray skin, moody dark background"
// Drop image as /public/zombies/one-and-done.jpg and update IMAGE_URL below.
const IMAGE_URL = '/zombies/one-and-done.jpg';

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
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f2010] to-[#0A1A0E]" />
      {/* Silhouette */}
      <svg width="80" height="120" viewBox="0 0 80 120" fill="none" className="relative z-10 opacity-40">
        <ellipse cx="40" cy="22" rx="16" ry="18" fill="#8A9E8A" />
        <rect x="20" y="38" width="40" height="50" rx="4" fill="#8A9E8A" />
        <rect x="8" y="40" width="14" height="35" rx="4" fill="#8A9E8A" />
        <rect x="58" y="40" width="14" height="35" rx="4" fill="#8A9E8A" />
        <rect x="25" y="86" width="12" height="30" rx="3" fill="#8A9E8A" />
        <rect x="43" y="86" width="12" height="30" rx="3" fill="#8A9E8A" />
        {/* Printout clutched in hand */}
        <rect x="62" y="55" width="14" height="18" rx="1" fill="#e5e9db" opacity="0.6" />
        <line x1="64" y1="59" x2="74" y2="59" stroke="#1d2e20" strokeWidth="1" opacity="0.4" />
        <line x1="64" y1="62" x2="74" y2="62" stroke="#1d2e20" strokeWidth="1" opacity="0.4" />
        <line x1="64" y1="65" x2="70" y2="65" stroke="#1d2e20" strokeWidth="1" opacity="0.4" />
      </svg>
      <div className="relative z-10 text-center space-y-1 px-4">
        <p className="font-mono text-[9px] uppercase tracking-widest text-[#4A5E4A]">Portrait Required</p>
        <p className="font-mono text-[8px] text-[#2A3D2C]">The One-and-Done</p>
      </div>
    </div>
  );
}

export function OneAndDone({ state, size = 'md' }: OneAndDoneProps) {
  // Use placeholder until portrait image is available at /public/zombies/one-and-done.jpg
  return (
    <div className="w-full h-full relative overflow-hidden" style={STATE_STYLES[state]}>
      <Placeholder />
    </div>
  );
}
