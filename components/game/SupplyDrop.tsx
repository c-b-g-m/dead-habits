'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { SUPPLY_DROP_1 } from '@/content/gameData';

interface SupplyDropProps {
  onDismiss: () => void;
}

// Library cart SVG
function LibraryCart({ animate }: { animate: boolean }) {
  return (
    <motion.svg
      width="120"
      height="100"
      viewBox="0 0 120 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ x: -200, opacity: 0 }}
      animate={animate ? { x: 0, opacity: 1 } : { x: -200, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 18, duration: 0.6 }}
    >
      {/* Cart frame */}
      <rect x="10" y="20" width="100" height="55" rx="3" stroke="#454933" strokeWidth="2" fill="#0f1f13" />
      {/* Shelf divider */}
      <line x1="10" y1="47" x2="110" y2="47" stroke="#454933" strokeWidth="1.5" />
      {/* Handle */}
      <path d="M 100 20 L 100 10 L 115 10" stroke="#8A9E8A" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Books on top shelf */}
      <rect x="16" y="24" width="10" height="20" rx="1" fill="#D42B00" opacity="0.7" />
      <rect x="28" y="26" width="8" height="18" rx="1" fill="#c8f000" opacity="0.6" />
      <rect x="38" y="25" width="12" height="19" rx="1" fill="#00E87A" opacity="0.5" />
      <rect x="52" y="27" width="9" height="17" rx="1" fill="#8A9E8A" opacity="0.6" />
      <rect x="63" y="24" width="11" height="20" rx="1" fill="#c8f000" opacity="0.4" />
      <rect x="76" y="26" width="8" height="18" rx="1" fill="#D42B00" opacity="0.5" />
      {/* Books on bottom shelf */}
      <rect x="16" y="50" width="14" height="20" rx="1" fill="#454933" opacity="0.8" />
      <rect x="32" y="52" width="10" height="18" rx="1" fill="#8A9E8A" opacity="0.5" />
      <rect x="44" y="51" width="12" height="19" rx="1" fill="#c8f000" opacity="0.3" />
      <rect x="58" y="50" width="9" height="20" rx="1" fill="#00E87A" opacity="0.4" />
      {/* Wheels */}
      <circle cx="28" cy="78" r="6" stroke="#454933" strokeWidth="2" fill="#0f1f13" />
      <circle cx="28" cy="78" r="2" fill="#454933" />
      <circle cx="92" cy="78" r="6" stroke="#454933" strokeWidth="2" fill="#0f1f13" />
      <circle cx="92" cy="78" r="2" fill="#454933" />
      {/* Cart label */}
      <text x="60" y="96" textAnchor="middle" fontFamily="monospace" fontSize="7" fill="#4A5E4A" letterSpacing="2">SUPPLY DROP</text>
    </motion.svg>
  );
}

// Individual supply card
function SupplyCard({
  title,
  body,
  cta,
  repoUrl,
  delay,
}: {
  title: string;
  body: string;
  cta?: string;
  repoUrl?: string;
  delay: number;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ rotateY: 180, opacity: 0 }}
      animate={{ rotateY: 0, opacity: 1 }}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
      onAnimationComplete={() => setFlipped(true)}
      style={{ perspective: 1000 }}
      className="bg-[#0f1f13] border border-[#454933]/30 p-6 space-y-3 relative"
    >
      {/* Acid top bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#c8f000]/40" />

      <p className="font-mono text-[10px] uppercase tracking-widest text-[#c8f000]">{title}</p>
      <p className="font-body text-lg text-[#d4e8d4] leading-relaxed">{body}</p>

      {cta && repoUrl && (
        <a
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#0A1A0E] bg-[#c8f000] px-4 py-2 hover:brightness-110 transition-all mt-2"
          style={{ boxShadow: '0 0 12px rgba(200,240,0,0.3)' }}
        >
          {cta}
          <span className="material-symbols-outlined text-sm">open_in_new</span>
        </a>
      )}
    </motion.div>
  );
}

export function SupplyDrop({ onDismiss }: SupplyDropProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-[#0A1A0E]/95 flex items-center justify-center p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Scan line overlay */}
      <div className="absolute inset-0 scan-line-overlay pointer-events-none" />

      <div className="relative max-w-2xl w-full space-y-8">
        {/* Header */}
        <motion.div
          className="text-center space-y-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#8A9E8A]">Zone 1 Complete</span>
          <h2 className="font-display font-extrabold text-4xl text-[#c8f000] uppercase tracking-tight"
            style={{ textShadow: '0 0 30px rgba(200,240,0,0.4)' }}>
            {SUPPLY_DROP_1.header}
          </h2>
        </motion.div>

        {/* Cart animation */}
        <div className="flex justify-center">
          <LibraryCart animate={true} />
        </div>

        {/* Three cards — staggered flip reveal */}
        <div className="grid grid-cols-1 gap-4">
          {SUPPLY_DROP_1.cards.map((card, i) => (
            <SupplyCard
              key={card.title}
              title={card.title}
              body={card.body}
              cta={card.cta}
              repoUrl={card.repoUrl}
              delay={0.6 + i * 0.25}
            />
          ))}
        </div>

        {/* Dismiss */}
        <motion.div
          className="flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.4 }}
        >
          <Button variant="primary" onClick={onDismiss} className="text-base px-10 py-4">
            {SUPPLY_DROP_1.dismiss}
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
