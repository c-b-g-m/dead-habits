'use client';

import { ZombieState } from '@/types';

interface HabitHordeProps {
  state: ZombieState;
  size?: 'sm' | 'md' | 'lg';
}

// Replace with: AI-generated boss portrait — composite of all three zombie archetypes
// Concept: larger imposing figure in academic regalia, mortarboard, features of all three:
//   blank expression + overconfident posture + glowing AI text on robes
// Suggested prompt: "photorealistic zombie professor boss in dark academic library,
//   imposing figure in full academic regalia and mortarboard, combining blank stare +
//   overconfident smirk + glowing AI text on robes, muted green/gray skin, red aura,
//   dramatic moody lighting"
// Drop image as /public/zombies/habit-horde.jpg and update IMAGE_URL below.
const IMAGE_URL = '/zombies/habit-horde.jpg';

const STATE_STYLES: Record<ZombieState, React.CSSProperties> = {
  walking: {
    filter: 'brightness(0.85) saturate(0.6)',
    animation: 'zombieWalk 3s ease-in-out infinite',
  },
  running: {
    filter: 'brightness(1.2) saturate(0.4) hue-rotate(15deg)',
    animation: 'zombieLean 0.6s ease-in-out infinite',
  },
  frozen: {
    filter: 'brightness(0.5) saturate(0) contrast(1.2)',
    animation: 'none',
  },
};

function Placeholder() {
  return (
    <div className="w-full h-full bg-[#0A1A0E] flex flex-col items-center justify-center gap-3 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a0a] to-[#0A1A0E]" />
      {/* Boss silhouette — taller, more imposing */}
      <svg width="90" height="140" viewBox="0 0 90 140" fill="none" className="relative z-10 opacity-40">
        {/* Mortarboard */}
        <rect x="22" y="10" width="46" height="5" rx="1" fill="#D42B00" opacity="0.8" />
        <line x1="45" y1="10" x2="60" y2="20" stroke="#D42B00" strokeWidth="1.5" opacity="0.6" />
        <ellipse cx="45" cy="15" rx="5" ry="3" fill="#D42B00" opacity="0.7" />
        {/* Head */}
        <ellipse cx="45" cy="30" rx="18" ry="20" fill="#8A9E8A" />
        {/* Eyes */}
        <ellipse cx="37" cy="27" rx="5" ry="5.5" fill="#0A1A0E" />
        <ellipse cx="53" cy="27" rx="5" ry="5.5" fill="#0A1A0E" />
        <ellipse cx="37" cy="27" rx="2" ry="2.5" fill="#D42B00" opacity="0.8" />
        <ellipse cx="53" cy="27" rx="2" ry="2.5" fill="#D42B00" opacity="0.8" />
        {/* Robes */}
        <path d="M15 48 L45 44 L75 48 L80 120 L10 120 Z" fill="#8A9E8A" opacity="0.7" />
        <rect x="8" y="50" width="16" height="42" rx="4" fill="#8A9E8A" />
        <rect x="66" y="50" width="16" height="42" rx="4" fill="#8A9E8A" />
        {/* AI text on robes */}
        <text x="33" y="72" fontFamily="monospace" fontSize="7" fill="#c8f000" opacity="0.5">AI</text>
        <text x="47" y="85" fontFamily="monospace" fontSize="5" fill="#D42B00" opacity="0.4">98%</text>
        <text x="30" y="95" fontFamily="monospace" fontSize="5" fill="#c8f000" opacity="0.3">✓</text>
        {/* Papers */}
        <rect x="2" y="54" width="18" height="3" rx="1" fill="#e5e9db" opacity="0.4" transform="rotate(-8 2 54)" />
        <rect x="2" y="60" width="18" height="3" rx="1" fill="#e5e9db" opacity="0.4" transform="rotate(-5 2 60)" />
        <rect x="70" y="54" width="18" height="3" rx="1" fill="#e5e9db" opacity="0.4" transform="rotate(8 70 54)" />
        <rect x="70" y="60" width="18" height="3" rx="1" fill="#e5e9db" opacity="0.4" transform="rotate(5 70 60)" />
        {/* Legs */}
        <rect x="28" y="118" width="14" height="20" rx="3" fill="#8A9E8A" />
        <rect x="48" y="118" width="14" height="20" rx="3" fill="#8A9E8A" />
      </svg>
      <div className="relative z-10 text-center space-y-1 px-4">
        <p className="font-mono text-[9px] uppercase tracking-widest text-[#D42B00]/60">Boss Portrait Required</p>
        <p className="font-mono text-[8px] text-[#4A5E4A]">The Habit Horde</p>
      </div>
    </div>
  );
}

export function HabitHorde({ state, size = 'md' }: HabitHordeProps) {
  // Use placeholder until boss portrait image is available at /public/zombies/habit-horde.jpg
  return (
    <div className="w-full h-full relative overflow-hidden" style={STATE_STYLES[state]}>
      <Placeholder />
    </div>
  );
}
