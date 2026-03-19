'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { PromptEditor } from '@/components/ui/PromptEditor';
import { LoadingState } from '@/components/ui/LoadingState';
import { ThreatMeter } from '@/components/ui/ThreatMeter';
import { ScoreBreakdown } from '@/components/ui/ScoreBreakdown';
import { ZombieDefinition, RubricScore, ZombieState } from '@/types';
import { scoreToZombieState, isKillConfirmed } from '@/lib/scoring';

interface KillProps {
  zombie: ZombieDefinition;
  attempts: number;
  onKillConfirmed: (output: string, score: RubricScore) => void;
  onRetry: (output: string, score: RubricScore, state: ZombieState) => void;
}

export function Kill({ zombie, attempts, onKillConfirmed, onRetry }: KillProps) {
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
  const killConfirmed = result ? isKillConfirmed(result.total) : false;

  return (
    <div className="space-y-8">
      {/* Kill task */}
      <div className="bg-[#192B1C] p-6 border border-[#c8f000]/20 space-y-3">
        <div className="flex items-center gap-2 mb-2">
          <span className="material-symbols-outlined text-[#D42B00]">bolt</span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#D42B00]">Kill Attempt {attempts + 1}</span>
        </div>
        <p className="font-body text-lg text-[#d4e8d4] leading-relaxed whitespace-pre-line">{zombie.killTask}</p>
      </div>

      {/* Framework checklist */}
      <div className="bg-[#0f1f13] p-6 border border-[#454933]/20 space-y-3">
        <p className="font-mono text-[10px] uppercase tracking-widest text-[#8A9E8A] mb-4">Kill condition checklist</p>
        <p className="font-body text-lg text-[#d4e8d4] leading-relaxed">{zombie.killCondition}</p>
      </div>

      {/* Neutralization Console */}
      <PromptEditor
        value={output}
        onChange={e => setOutput(e.target.value)}
        placeholder="Paste your improved output here..."
        sessionId={`${zombie.id.toUpperCase()}_KILL_${attempts + 1}`}
        minRows={10}
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
          <div className="bg-[#0f1f13] p-6 border border-[#454933]/20 space-y-4">
            <ThreatMeter score={result.total} maxScore={12} />
            <ScoreBreakdown score={result} />
          </div>

          <div className={`p-4 border-l-2 ${
            killConfirmed ? 'border-[#00E87A] bg-[#00E87A]/5' :
            zombieState === 'walking' ? 'border-[#FF8C00] bg-[#FF8C00]/5' :
            'border-[#D42B00] bg-[#D42B00]/5'
          }`}>
            <p className={`font-mono text-sm uppercase tracking-widest ${
              killConfirmed ? 'text-[#00E87A]' : zombieState === 'walking' ? 'text-[#FF8C00]' : 'text-[#D42B00]'
            }`}>
              {killConfirmed ? 'KILL CONFIRMED' :
               zombieState === 'walking' ? "It's moving. Refine your approach." :
               "It's getting closer. Return to the Intel."}
            </p>
          </div>

          {killConfirmed ? (
            <Button
              variant="primary"
              onClick={() => onKillConfirmed(output, result)}
              className="text-base px-12 py-5"
            >
              CONFIRM KILL
            </Button>
          ) : (
            <Button
              variant="secondary"
              onClick={() => {
                setResult(null);
                setOutput('');
                onRetry(output, result, zombieState);
              }}
            >
              TRY AGAIN
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
