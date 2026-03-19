'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ORIENTATION } from '@/content/orientation';

interface EntranceHallProps {
  onComplete: () => void;
}

export function EntranceHall({ onComplete }: EntranceHallProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-[#0A1A0E] flex flex-col items-center justify-center z-50 cursor-pointer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onComplete}
    >
      {/* Library door silhouette */}
      <motion.div
        className="relative mb-16"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 1 }}
      >
        <svg width="200" height="280" viewBox="0 0 200 280" fill="none">
          {/* Door frame */}
          <rect x="30" y="20" width="140" height="240" rx="2" fill="#111D14" stroke="#2A3D2C" strokeWidth="2" />
          {/* Door arch */}
          <path d="M35 80 Q100 20 165 80" fill="#0A1A0E" />
          <path d="M35 80 Q100 20 165 80 L165 258 L35 258 Z" fill="#132316" stroke="#2A3D2C" strokeWidth="1" />
          {/* Door panels */}
          <rect x="45" y="95" width="45" height="70" rx="1" fill="#0f1f13" stroke="#454933" strokeWidth="0.5" />
          <rect x="110" y="95" width="45" height="70" rx="1" fill="#0f1f13" stroke="#454933" strokeWidth="0.5" />
          <rect x="45" y="180" width="45" height="60" rx="1" fill="#0f1f13" stroke="#454933" strokeWidth="0.5" />
          <rect x="110" y="180" width="45" height="60" rx="1" fill="#0f1f13" stroke="#454933" strokeWidth="0.5" />
          {/* Door handles */}
          <circle cx="90" cy="168" r="4" fill="#8A9E8A" />
          <circle cx="110" cy="168" r="4" fill="#8A9E8A" />
          {/* Light seeping through */}
          <motion.ellipse
            cx="100" cy="260"
            rx="60" ry="8"
            fill="#c8f000"
            opacity={0}
            animate={{ opacity: [0, 0.08, 0.12, 0.06] }}
            transition={{ duration: 2, delay: 0.5 }}
          />
          {/* Warm glow from inside */}
          <motion.rect
            x="35" y="80" width="130" height="178"
            fill="#c8f000"
            opacity={0}
            animate={{ opacity: [0, 0.03, 0.06, 0.03] }}
            transition={{ duration: 2, delay: 0.8 }}
          />
        </svg>
        {/* Light leak from edges */}
        <motion.div
          className="absolute inset-0 rounded"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0.1] }}
          transition={{ duration: 1.5, delay: 0.5 }}
          style={{ boxShadow: '0 0 40px rgba(200,240,0,0.1) inset' }}
        />
      </motion.div>

      {/* Text reveal */}
      <div className="text-center space-y-4">
        {ORIENTATION.entranceHall.lines.map((line, idx) => (
          <motion.p
            key={idx}
            className="font-display font-bold text-3xl text-[#F0EBE0] uppercase tracking-widest"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + idx * 0.6, duration: 0.5 }}
          >
            {line}
          </motion.p>
        ))}
        <motion.p
          className="font-mono text-xs text-[#4A5E4A] mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.4 }}
        >
          Click to continue
        </motion.p>
      </div>
    </motion.div>
  );
}
