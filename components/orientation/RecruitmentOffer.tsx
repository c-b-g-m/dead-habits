'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { ORIENTATION } from '@/content/orientation';

interface RecruitmentOfferProps {
  onNext: () => void;
}

function FacultyBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
      className="relative"
      style={{ perspective: '800px' }}
    >
      <div className="bg-[#192B1C] border border-[#c8f000]/40 p-8 relative overflow-hidden shadow-[0_0_40px_rgba(200,240,0,0.1)]">
        {/* Badge glow */}
        <div className="absolute inset-0 desk-lamp-blur pointer-events-none" />

        {/* Header */}
        <div className="border-b border-[#c8f000]/20 pb-4 mb-6">
          <p className="font-mono text-[10px] uppercase tracking-widest text-[#8A9E8A]">Hargrove Library</p>
          <p className="font-display font-bold text-[#c8f000] uppercase tracking-widest text-sm">Active Duty</p>
        </div>

        {/* Photo placeholder */}
        <div className="w-20 h-20 bg-[#132316] border border-[#454933]/30 mb-6 flex items-center justify-center">
          <span className="material-symbols-outlined text-[#4A5E4A]" style={{ fontSize: '40px' }}>person</span>
        </div>

        {/* Fields */}
        <div className="space-y-3">
          <div>
            <p className="font-mono text-[9px] text-[#4A5E4A] uppercase tracking-widest">Clearance</p>
            <p className="font-display font-bold text-[#c8f000] uppercase tracking-wider">ENTRY LEVEL</p>
          </div>
          <div>
            <p className="font-mono text-[9px] text-[#4A5E4A] uppercase tracking-widest">Weapon</p>
            <p className="font-display font-bold text-[#F0EBE0] uppercase tracking-wider">BARE HANDS</p>
          </div>
          <div>
            <p className="font-mono text-[9px] text-[#4A5E4A] uppercase tracking-widest">Status</p>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00E87A] animate-pulse" />
              <p className="font-mono text-xs text-[#00E87A]">ENROLLED</p>
            </div>
          </div>
        </div>

        {/* Barcode */}
        <div className="mt-6 border-t border-[#454933]/20 pt-4">
          <div className="flex gap-0.5">
            {Array.from({ length: 32 }).map((_, i) => (
              <div key={i} className="bg-[#c8f000]/50"
                style={{ width: '2px', height: `${12 + (i % 4) * 4}px` }} />
            ))}
          </div>
          <p className="font-mono text-[8px] text-[#4A5E4A] mt-1 tracking-widest">HGV-ENTRY-001</p>
        </div>
      </div>
    </motion.div>
  );
}

export function RecruitmentOffer({ onNext }: RecruitmentOfferProps) {
  const { o4 } = ORIENTATION;

  return (
    <div className="min-h-screen bg-[#0A1A0E] relative">
      <div className="max-w-6xl mx-auto px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16 items-start">

          {/* Left — Mission briefing */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div>
              <h1 className="font-display font-extrabold text-6xl text-[#F0EBE0] uppercase tracking-tighter leading-[0.95] mb-6">
                {o4.headline}
              </h1>
              <div className="h-px bg-gradient-to-r from-[#c8f000]/30 to-transparent" />
            </div>

            <div className="space-y-5">
              {o4.body.map((para, idx) => (
                <p key={idx} className="font-body text-xl text-[#F0EBE0] leading-relaxed">
                  {para}
                </p>
              ))}
            </div>

            <p className="font-body italic text-[#8A9E8A] text-lg leading-relaxed border-l-2 border-[#c8f000]/20 pl-4">
              {o4.secondary}
            </p>

            {/* Mechanic Legend */}
            <div className="space-y-4">
              {o4.mechanics.map(({ icon, label, desc }) => (
                <div key={label} className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-[#c8f000] flex-shrink-0 mt-0.5">{icon}</span>
                  <div>
                    <span className="font-display font-bold text-sm text-[#c8f000] uppercase tracking-wider">{label}</span>
                    <span className="font-body text-[#8A9E8A] text-lg"> — {desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="primary" onClick={onNext} className="text-base px-10 py-5">
              {o4.cta}
            </Button>
          </motion.div>

          {/* Right — Faculty ID Badge */}
          <div className="lg:sticky lg:top-20">
            <FacultyBadge />
          </div>
        </div>
      </div>
    </div>
  );
}
