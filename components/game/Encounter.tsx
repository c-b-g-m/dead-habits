'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { PromptEditor } from '@/components/ui/PromptEditor';
import { LoadingState } from '@/components/ui/LoadingState';
import { ThreatMeter } from '@/components/ui/ThreatMeter';
import { ScoreBreakdown } from '@/components/ui/ScoreBreakdown';
import { ZombieDefinition, RubricScore, ZombieState } from '@/types';
import { scoreToZombieState, isKillConfirmed } from '@/lib/scoring';

interface EncounterProps {
  zombie: ZombieDefinition;
  attempts: number;
  onContinue: (output: string, score: RubricScore, zombieState: ZombieState) => void;
  fieldAssessmentOutput?: string; // For One-and-Done — prefill
}

export function Encounter({ zombie, attempts, onContinue, fieldAssessmentOutput }: EncounterProps) {
  const [output, setOutput] = useState(fieldAssessmentOutput ?? '');
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
          type: 'zombie_kill',
          zombieId: zombie.id,
          encounterContext: zombie.encounterContext,
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

  const zombieState = result ? scoreToZombieState(result.total) : 'walking';

  return (
    <div className="space-y-8">
      {/* Scholar Directive */}
      <div className="bg-white/40 p-6 border border-black/5" style={{ background: 'rgba(255,255,255,0.4)' }}>
        <h4 className="font-display text-xl font-bold uppercase tracking-widest text-[#1d2e20] flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>task_alt</span>
          Scholar Directive
        </h4>
        <p className="font-body text-lg leading-relaxed text-[#1d2e20] whitespace-pre-line">{zombie.encounterTask}</p>
      </div>

      {/* Neutralization Console */}
      <div className="space-y-6 pt-2">
        <PromptEditor
          value={output}
          onChange={e => setOutput(e.target.value)}
          placeholder={`Draft your prompt for the ${zombie.name} encounter...`}
          sessionId={`${zombie.id.toUpperCase()}_ACTIVE`}
          minRows={8}
        />

        {error && <p className="font-mono text-sm text-[#D42B00]">{error}</p>}

        {loading ? (
          <LoadingState context="zombie_kill" />
        ) : !result ? (
          <div className="flex justify-end">
            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={!output.trim()}
              className="text-base px-12 py-5 flex items-center gap-4"
            >
              Submit Case Analysis
              <span className="material-symbols-outlined text-sm">arrow_right_alt</span>
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Score */}
            <div className="bg-[#0f1f13] p-6 border border-[#454933]/20 space-y-4">
              <ThreatMeter score={result.total} maxScore={12} />
              <ScoreBreakdown score={result} />
            </div>

            {/* State feedback */}
            <div className={`p-4 border-l-2 ${
              zombieState === 'frozen' ? 'border-[#00E87A] bg-[#00E87A]/5' :
              zombieState === 'walking' ? 'border-[#FF8C00] bg-[#FF8C00]/5' :
              'border-[#D42B00] bg-[#D42B00]/5'
            }`}>
              <p className="font-mono text-sm uppercase tracking-widest ${zombieState === 'frozen' ? 'text-[#00E87A]' : zombieState === 'walking' ? 'text-[#FF8C00]' : 'text-[#D42B00]'}">
                {zombieState === 'frozen' ? 'KILL CONFIRMED' :
                 zombieState === 'walking' ? "It's moving. Refine your approach." :
                 "It's getting closer. Return to the Intel."}
              </p>
            </div>

            <div className="flex justify-end">
              <Button
                variant="primary"
                onClick={() => onContinue(output, result, zombieState)}
              >
                {isKillConfirmed(result.total) ? 'VIEW AUTOPSY' : 'CONTINUE TO AUTOPSY'}
              </Button>
            </div>
          </div>
        )}
      </div>

      {attempts > 0 && (
        <p className="font-mono text-[10px] text-[#4A5E4A]">Attempt {attempts + 1}</p>
      )}
    </div>
  );
}
