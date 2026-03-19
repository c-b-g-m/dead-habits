'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface KillConfirmationProps {
  zombieName: string;
  weaponUnlocked?: string;
  onComplete: () => void;
}

type Phase = 'flash' | 'freeze' | 'cracks' | 'fragment' | 'text' | 'badge' | 'done';

export function KillConfirmation({ zombieName, weaponUnlocked, onComplete }: KillConfirmationProps) {
  const [phase, setPhase] = useState<Phase>('flash');

  useEffect(() => {
    const sequence: Array<{ next: Phase; delay: number }> = [
      { next: 'freeze', delay: 100 },
      { next: 'cracks', delay: 400 },
      { next: 'fragment', delay: 800 },
      { next: 'text', delay: 1100 },
      { next: 'badge', delay: 1500 },
      { next: 'done', delay: 2800 },
    ];

    const timers = sequence.map(({ next, delay }) =>
      setTimeout(() => setPhase(next), delay)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (phase === 'done') {
      const t = setTimeout(onComplete, 300);
      return () => clearTimeout(t);
    }
  }, [phase, onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          style={{ background: 'rgba(7, 23, 11, 0.96)' }}
        >
          {/* Phase 1: Screen edge flash */}
          {phase === 'flash' && (
            <motion.div
              className="absolute inset-0 border-4 border-[#c8f000]"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.15, times: [0, 0.3, 1] }}
            />
          )}

          {/* Crack SVG overlay */}
          {(phase === 'cracks' || phase === 'fragment' || phase === 'text' || phase === 'badge') && (
            <motion.svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === 'fragment' ? 0 : 0.6 }}
              transition={{ duration: 0.3 }}
            >
              {[
                'M400 300 L380 220 L420 260 L450 180',
                'M400 300 L320 350 L360 300 L300 400',
                'M400 300 L480 320 L440 380 L500 420',
                'M400 300 L350 400 L380 450',
              ].map((d, i) => (
                <motion.path
                  key={i}
                  d={d}
                  stroke="#c8f000"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.8 }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                />
              ))}
            </motion.svg>
          )}

          {/* Fragmenting zombie representation */}
          {phase === 'fragment' && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-4 h-4 bg-[#c8f000]/60"
                  style={{
                    left: '50%',
                    top: '50%',
                  }}
                  animate={{
                    x: [0, (i % 3 - 1) * 120 + Math.random() * 40],
                    y: [0, -200 - i * 30],
                    opacity: [1, 0],
                    scale: [1, 0.3],
                  }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              ))}
            </div>
          )}

          {/* KILL CONFIRMED text */}
          {(phase === 'text' || phase === 'badge') && (
            <div className="text-center space-y-6 relative z-10">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [0.8, 1.05, 1], opacity: 1 }}
                transition={{ duration: 0.4, times: [0, 0.6, 1] }}
              >
                <p className="font-display font-extrabold text-[5rem] leading-none text-[#c8f000] terminal-glow uppercase tracking-tight">
                  KILL CONFIRMED
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <p className="font-mono text-lg text-[#F0EBE0] line-through opacity-60">{zombieName}</p>
              </motion.div>

              {weaponUnlocked && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                  className="inline-flex flex-col items-center gap-1 px-6 py-3 border border-[#c8f000]/40 bg-[#192B1C]"
                >
                  <span className="font-mono text-[9px] text-[#8A9E8A] uppercase tracking-widest">New weapon acquired</span>
                  <span className="font-display font-bold text-[#c8f000] uppercase tracking-widest">{weaponUnlocked}</span>
                  <span className="font-mono text-[10px] text-[#F0EBE0] italic">You are no longer fighting with your bare hands.</span>
                </motion.div>
              )}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
