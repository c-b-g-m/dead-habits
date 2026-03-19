'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { ORIENTATION } from '@/content/orientation';

interface OutbreakMapProps {
  onNext: () => void;
}

export function OutbreakMap({ onNext }: OutbreakMapProps) {
  const { o3 } = ORIENTATION;
  const [visibleStats, setVisibleStats] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleStats(prev => {
        if (prev >= o3.stats.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 400);
    return () => clearInterval(interval);
  }, [o3.stats.length]);

  return (
    <div className="min-h-screen bg-[#0A1A0E] relative">
      <div className="max-w-4xl mx-auto px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-16"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#c8f000]/60 block mb-4">
            Anthropic AI Fluency Index // January 2026
          </span>
          <h1 className="font-display font-extrabold text-5xl text-[#F0EBE0] uppercase tracking-tighter mb-4">
            {o3.headline}
          </h1>
          <div className="h-px bg-gradient-to-r from-[#c8f000]/30 via-[#c8f000]/10 to-transparent mt-4" />
        </motion.div>

        {/* Stats grid — staggered reveal */}
        <div className="space-y-8 mb-16">
          {o3.stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={visibleStats > idx ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="flex items-start gap-8 bg-[#111D14] p-8 border-l-2 border-[#c8f000]/20"
            >
              {/* Stat number */}
              <div className="flex-shrink-0 w-32">
                <span className="font-mono text-4xl font-bold text-[#c8f000] terminal-glow leading-none">
                  {stat.stat}
                </span>
              </div>
              {/* Labels */}
              <div className="flex-1 space-y-2">
                <p className="font-mono text-sm uppercase tracking-wider text-[#F0EBE0]">{stat.label}</p>
                <p className="font-body italic text-[#8A9E8A] text-lg leading-relaxed">{stat.zombie}</p>
              </div>
              {/* Indicator */}
              {visibleStats > idx && (
                <div className="flex-shrink-0 w-2 h-2 bg-[#D42B00] rounded-full animate-pulse mt-2" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Source */}
        <p className="font-mono text-xs text-[#4A5E4A] mb-12">{o3.source}</p>

        <Button variant="primary" onClick={onNext}>{o3.cta}</Button>
      </div>
    </div>
  );
}
