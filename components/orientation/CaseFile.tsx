'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { ScanLine } from '@/components/ui/ScanLine';
import { ORIENTATION } from '@/content/orientation';

interface CaseFileProps {
  onNext: () => void;
}

export function CaseFile({ onNext }: CaseFileProps) {
  const { o2 } = ORIENTATION;

  return (
    <div className="min-h-screen bg-[#0A1A0E] relative">
      <ScanLine />

      <div className="max-w-4xl mx-auto px-8 py-20">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <h1 className="font-display font-extrabold text-5xl text-[#c8f000] terminal-glow tracking-tighter mb-1">{o2.logo}</h1>
          <p className="font-body italic text-[#8A9E8A] text-lg">{o2.tagline}</p>
        </motion.div>

        {/* Dossier card — paper texture */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative bg-[#e5e9db] p-12 shadow-2xl"
          style={{ color: '#1d2e20' }}
        >
          {/* Classified stamp */}
          <div className="classified-stamp">{o2.classifiedStamp}</div>

          {/* Dossier header */}
          <div className="mb-8 space-y-1">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#1d2e20]/40" style={{ fontSize: '14px' }}>folder_shared</span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#1d2e20]/60 font-bold">{o2.dossierHeader}</span>
            </div>
            <h2 className="font-body text-4xl font-semibold text-[#1d2e20] tracking-tight">CASE FILE — Hargrove University, Spring Semester</h2>
          </div>

          {/* Timeline with sticky notes */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_200px] gap-8">
            <div className="space-y-8">
              {o2.timeline.map((entry, idx) => (
                <div key={idx} className="border-l-2 border-[#1d2e20]/20 pl-6 relative">
                  <div className="absolute -left-[5px] top-1 w-2 h-2 bg-[#1d2e20]/40 rounded-full" />
                  <p className="font-mono text-[10px] uppercase tracking-widest text-[#1d2e20]/50 mb-1">DATE: {entry.date}</p>
                  {entry.decision && (
                    <p className="font-body text-base text-[#1d2e20] mb-1"><span className="font-semibold">DECISION:</span> {entry.decision}</p>
                  )}
                  {entry.prompt && (
                    <p className="font-mono text-sm text-[#1d2e20]/70 mb-1 bg-[#1d2e20]/5 px-2 py-1 inline-block">PROMPT USED: {entry.prompt}</p>
                  )}
                  {entry.outcome && (
                    <p className="font-body text-base text-[#1d2e20]/80 italic"><span className="font-semibold not-italic">OUTCOME:</span> {entry.outcome}</p>
                  )}
                  {entry.consequence && (
                    <p className="font-body text-base text-[#D42B00]/80"><span className="font-semibold">CONSEQUENCE:</span> {entry.consequence}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Sticky notes — right margin */}
            <div className="space-y-4">
              {o2.stickyNotes.map((note, idx) => (
                <div
                  key={idx}
                  className="bg-[#fff9c4] p-4 shadow-md"
                  style={{ transform: `rotate(${idx % 2 === 0 ? '-2' : '1.5'}deg)` }}
                >
                  <p className="font-body text-sm text-[#2A1F0A] italic leading-relaxed">{note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Final line */}
          <div className="mt-12 pt-8 border-t border-[#1d2e20]/20">
            <p className="font-display font-bold text-xl text-[#c8f000] leading-snug" style={{ textShadow: 'none' }}>
              {o2.finalLine}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.3 }}
          className="mt-12 flex justify-start"
        >
          <Button variant="primary" onClick={onNext}>{o2.cta}</Button>
        </motion.div>
      </div>
    </div>
  );
}
