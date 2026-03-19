'use client';

import { useEffect, useState } from 'react';
import { clsx } from 'clsx';

interface TerminalTextBlockProps {
  lines: string[];
  flicker?: boolean;
  delay?: number; // ms between lines
  className?: string;
  prefix?: string;
}

export function TerminalTextBlock({ lines, flicker = false, delay = 200, className, prefix = '>' }: TerminalTextBlockProps) {
  const [visibleCount, setVisibleCount] = useState(flicker ? 0 : lines.length);

  useEffect(() => {
    if (!flicker) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setVisibleCount(i);
      if (i >= lines.length) clearInterval(interval);
    }, delay);
    return () => clearInterval(interval);
  }, [lines, flicker, delay]);

  return (
    <div className={clsx('font-mono text-xs text-[#c8f000]', className)}>
      {lines.slice(0, visibleCount).map((line, idx) => (
        <div
          key={idx}
          className={clsx(
            'leading-6',
            flicker && idx === visibleCount - 1 && 'opacity-0 animate-[textFlicker_0.4s_ease-out_forwards]'
          )}
        >
          {prefix} {line}
        </div>
      ))}
      {flicker && visibleCount < lines.length && (
        <span className="animate-[blinkCursor_1s_infinite]">_</span>
      )}
    </div>
  );
}
