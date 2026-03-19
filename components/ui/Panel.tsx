'use client';

import { ReactNode } from 'react';
import { clsx } from 'clsx';

// Panel variants use tonal layering (background color shifts only).
// No 1px solid borders for structure. Ghost Border only at 20% opacity for accessibility.

type PanelVariant = 'default' | 'elevated' | 'paper' | 'case-file' | 'glass' | 'lowest';

interface PanelProps {
  children: ReactNode;
  variant?: PanelVariant;
  className?: string;
  style?: React.CSSProperties;
}

export function Panel({ children, variant = 'default', className, style }: PanelProps) {
  return (
    <div
      className={clsx(
        'relative',
        {
          // Level 2: surface-container — default cards/modules
          'bg-[#132316]': variant === 'default',
          // Level 3: surface-container-highest — elevated/active states
          'bg-[#28392b]': variant === 'elevated',
          // Paper: aged document feel
          'bg-[#F5F0E8] text-[#2A1F0A]': variant === 'paper',
          // Case file: left accent bar treatment (zombie-red)
          'bg-[#192B1C]': variant === 'case-file',
          // Glassmorphism: surface-container-high 60% + backdrop-blur
          'bg-[#1d2e20]/60 backdrop-blur-[12px]': variant === 'glass',
          // Level 0: deepest surface
          'bg-[#031106]': variant === 'lowest',
        },
        className
      )}
      style={style}
    >
      {variant === 'case-file' && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--zombie-red)]" />
      )}
      {children}
    </div>
  );
}
