'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { ThreatMeter } from '@/components/ui/ThreatMeter';
import { ScoreBreakdown } from '@/components/ui/ScoreBreakdown';
import { LoadingState } from '@/components/ui/LoadingState';
import { ORIENTATION } from '@/content/orientation';
import { RubricScore } from '@/types';

interface FieldAssessmentProps {
  onComplete: (output: string, score: number, feedback: string, primaryZombie: string) => void;
}

export function FieldAssessment({ onComplete }: FieldAssessmentProps) {
  const { o5 } = ORIENTATION;
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RubricScore | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!output.trim()) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'field_assessment',
          encounterContext: 'Learner is asking Claude to write three discussion questions for a topic they are teaching this semester.',
          output: output.trim(),
        }),
      });
      if (!res.ok) throw new Error('Evaluation failed');
      const data: RubricScore = await res.json();
      setResult(data);
    } catch {
      setError('Evaluation failed. Check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1A0E] relative">
      <div className="max-w-3xl mx-auto px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#c8f000]/60 block mb-4">
            Orientation // Step 5 of 5
          </span>
          <h1 className="font-display font-extrabold text-5xl text-[#F0EBE0] uppercase tracking-tighter">{o5.headline}</h1>
          <div className="h-px bg-gradient-to-r from-[#c8f000]/30 to-transparent mt-4" />
        </motion.div>

        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key="input"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              {/* Instructions */}
              <div className="space-y-4">
                {o5.instructions.map((para, idx) => (
                  <p key={idx} className="font-body text-xl text-[#F0EBE0] leading-relaxed">{para}</p>
                ))}
              </div>

              {/* Terminal input */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-xl uppercase tracking-widest text-[#c8f000] flex items-center gap-3">
                    <span className="material-symbols-outlined">terminal</span>
                    ASSESSMENT INPUT
                  </h3>
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 bg-[#c8f000] rounded-full animate-pulse" />
                    <div className="w-2 h-2 bg-[#c8f000]/30 rounded-full" />
                    <div className="w-2 h-2 bg-[#c8f000]/10 rounded-full" />
                  </div>
                </div>

                <div className="bg-[#0f1f13] border border-[#454933]/20 rounded-sm shadow-2xl">
                  <div className="bg-[#132316] p-5 rounded-sm">
                    <div className="flex items-center justify-between mb-3 border-b border-[#454933]/10 pb-2">
                      <span className="font-mono text-[10px] text-[#c8f000]/60">SESSION_ID: FIELD_ASSESSMENT_01</span>
                      <span className="font-mono text-[10px] text-[#c8f000]">SYS_READY</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-mono text-sm text-[#c8f000] mt-1 select-none">&gt;</span>
                      <textarea
                        value={output}
                        onChange={e => setOutput(e.target.value)}
                        placeholder={o5.inputPlaceholder}
                        rows={10}
                        className="w-full bg-transparent border-none outline-none resize-none font-mono text-sm text-[#d4e8d4] placeholder:text-[#4A5E4A] focus:ring-0"
                      />
                    </div>
                  </div>
                </div>

                <p className="font-mono text-xs text-[#4A5E4A] italic">{o5.note}</p>
              </div>

              {error && (
                <p className="font-mono text-sm text-[#D42B00]">{error}</p>
              )}

              {loading ? (
                <LoadingState context="field_assessment" />
              ) : (
                <Button
                  variant="primary"
                  onClick={handleSubmit}
                  disabled={!output.trim()}
                  className="text-base px-10 py-5"
                >
                  {o5.cta}
                </Button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {/* Score display */}
              <div className="bg-[#111D14] border border-[#2A3D2C] p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#8A9E8A]">Assessment Complete</span>
                  <span className="font-mono text-3xl text-[#c8f000] font-bold terminal-glow">
                    {result.total}/12
                  </span>
                </div>

                <ThreatMeter score={result.total} maxScore={12} />
                <ScoreBreakdown score={result} />
              </div>

              {/* Primary zombie identified */}
              {result.primary_zombie && (
                <div className="bg-[#0f1f13] p-6 border-l-2 border-[#D42B00]/40">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-[#8A9E8A] mb-2">Primary habit detected</p>
                  <p className="font-display font-bold text-xl text-[#D42B00] uppercase tracking-wide">
                    {result.primary_zombie.replace(/_/g, ' ')}
                  </p>
                  <p className="font-body italic text-[#8A9E8A] text-lg mt-2 leading-relaxed">{result.feedback}</p>
                </div>
              )}

              <p className="font-body italic text-[#8A9E8A] text-lg leading-relaxed border-l-2 border-[#454933]/30 pl-4">
                {o5.resultsNote}
              </p>

              <Button
                variant="primary"
                onClick={() => onComplete(output, result.total, result.feedback, result.primary_zombie)}
                className="text-base px-10 py-5"
              >
                {o5.ctaFinal}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
