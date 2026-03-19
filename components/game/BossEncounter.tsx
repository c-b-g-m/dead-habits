'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { PromptEditor } from '@/components/ui/PromptEditor';
import { LoadingState } from '@/components/ui/LoadingState';
import { ThreatMeter } from '@/components/ui/ThreatMeter';
import { ScoreBreakdown } from '@/components/ui/ScoreBreakdown';
import { KillConfirmation } from '@/components/ui/KillConfirmation';
import { HabitHorde } from '@/components/zombies/HabitHorde';
import { Header } from '@/components/ui/Header';
import { GameState, RubricScore } from '@/types';
import { BOSS } from '@/content/zombies';
import { isKillConfirmed } from '@/lib/scoring';

interface BossEncounterProps {
  gameState: GameState;
  onKill: () => void;
  onNavigate: (screen: string) => void;
}

export function BossEncounter({ gameState, onKill, onNavigate }: BossEncounterProps) {
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RubricScore | null>(null);
  const [error, setError] = useState('');
  const [showKillConfirmation, setShowKillConfirmation] = useState(false);

  const handleSubmit = async () => {
    if (!output.trim()) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'zombie_kill',
          zombieId: 'habit_horde',
          encounterContext: BOSS.encounterContext,
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

  const killConfirmed = result ? (result.total >= BOSS.killThreshold) : false;

  return (
    <div className="min-h-screen bg-[#0A1A0E]">
      <Header
        screen="zone1_boss"
        weaponLevel={gameState.weaponLevel}
        survivorLogCount={gameState.survivorLog.length}
        onNavigate={onNavigate}
      />

      {showKillConfirmation && (
        <KillConfirmation
          zombieName={BOSS.name}
          onComplete={() => {
            setShowKillConfirmation(false);
            onKill();
          }}
        />
      )}

      <div className="pt-20 pb-20 px-8 max-w-5xl mx-auto">
        {/* Boss intro */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12 mb-12">
          <div className="flex flex-col items-center">
            <HabitHorde state={result ? (killConfirmed ? 'frozen' : 'running') : 'walking'} size="lg" />
          </div>
          <div className="space-y-6 pt-8">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#D42B00] block mb-2">ZONE 1 BOSS</span>
              <h1 className="font-display font-extrabold text-5xl text-[#D42B00] uppercase tracking-tight">{BOSS.name}</h1>
            </div>

            <div className="space-y-2">
              {BOSS.voiceLines.map((line, i) => (
                <p key={i} className="font-body italic text-[#8A9E8A] text-xl">{line}</p>
              ))}
            </div>

            <div className="bg-[#192B1C] p-6 border-l-2 border-[#D42B00]/40">
              <p className="font-display font-bold text-2xl text-[#F0EBE0] uppercase mb-4">{BOSS.intro}</p>
              <p className="font-body text-xl text-[#d4e8d4] leading-relaxed whitespace-pre-line">{BOSS.body}</p>
            </div>
          </div>
        </div>

        {/* Boss task */}
        <div className="bg-[#0f1f13] p-8 border-l-2 border-[#D42B00]/30 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-[#D42B00]">skull</span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#D42B00]">Boss Task</span>
          </div>
          <p className="font-body text-xl text-[#d4e8d4] leading-relaxed whitespace-pre-line">{BOSS.task}</p>
        </div>

        {/* Kill threshold note */}
        <p className="font-mono text-xs text-[#4A5E4A] mb-8">
          Kill threshold: {BOSS.killThreshold}/{BOSS.maxScore} — All three kill conditions apply.
        </p>

        {/* Console */}
        <PromptEditor
          value={output}
          onChange={e => setOutput(e.target.value)}
          placeholder="Paste your full conversation here — including your follow-up prompts, not just the final outputs."
          sessionId="HABIT_HORDE_BOSS"
          minRows={14}
        />

        {error && <p className="font-mono text-sm text-[#D42B00] mt-4">{error}</p>}

        <div className="mt-6">
          {loading ? (
            <LoadingState context="boss" />
          ) : !result ? (
            <div className="flex justify-end">
              <Button variant="primary" onClick={handleSubmit} disabled={!output.trim()} className="text-base px-12 py-5">
                Submit Case Analysis
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-[#0f1f13] p-6 border border-[#454933]/20 space-y-4">
                <ThreatMeter score={result.total} maxScore={BOSS.maxScore} />
                <ScoreBreakdown score={result} isBoss />
              </div>

              {killConfirmed ? (
                <>
                  <div className="bg-[#00E87A]/5 border border-[#00E87A]/20 p-6 space-y-3">
                    <p className="font-display font-bold text-2xl text-[#00E87A] uppercase">{BOSS.killConfirmation}</p>
                    <p className="font-body text-xl text-[#d4e8d4] italic leading-relaxed">{BOSS.killMessage}</p>
                  </div>
                  <Button variant="primary" onClick={() => setShowKillConfirmation(true)} className="text-base px-12 py-5">
                    CONFIRM KILL → SUPPLY DROP
                  </Button>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="bg-[#D42B00]/5 border-l-2 border-[#D42B00]/40 p-4">
                    <p className="font-mono text-sm text-[#D42B00] uppercase tracking-widest">
                      It's getting stronger. {result.feedback}
                    </p>
                  </div>
                  <Button variant="secondary" onClick={() => { setResult(null); setOutput(''); }}>
                    RETRY
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
