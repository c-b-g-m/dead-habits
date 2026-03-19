'use client';

import { ZombieState } from '@/types';

interface BlankSlaterProps {
  state: ZombieState;
  size?: 'sm' | 'md' | 'lg';
}

// Portrait image from Stitch reference: case_file_blank_slater_v5/code.html
const IMAGE_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDc2LShayWdxgVJTCgkyk4mbztDW_ZIN_izyobjKAR0P6peQWdsFiZV3T4rd5iTgYsVsievWd-2QJ7lY-_qeFPBEHRPzVnkP92_-5_6BaiTZDB1gwtRXuJGtKlzqQQ4reAV9ouDj0ND6PxUr5uHd7sDfIWOg7D0idN83K2bluEsFTWsZib6QIYmi6jNocEd4OX0tVSwFm9HwoEVSCp1SIAYw6BpIkR5YX9r9EGx5HiugobFJEDeSmVZENpaP89G-Yr8jJFuxdYeDq-Y';

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

export function BlankSlater({ state, size = 'md' }: BlankSlaterProps) {
  return (
    <img
      src={IMAGE_URL}
      alt="The Blank Slater — scholarly zombie"
      className="w-full h-full object-cover object-top transition-all duration-1000"
      style={STATE_STYLES[state]}
    />
  );
}
