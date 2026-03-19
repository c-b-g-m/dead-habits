'use client';

import { RubricScore } from '@/types';

interface ScoreBreakdownProps {
  score: RubricScore;
  isBoss?: boolean;
}

const CRITERIA = [
  { key: 'specificity', label: 'Specificity' },
  { key: 'cognitive_demand', label: 'Cognitive Demand' },
  { key: 'context_richness', label: 'Context Richness' },
  { key: 'discussion_potential', label: 'Discussion Potential' },
];

const BOSS_CRITERIA = [
  ...CRITERIA,
  { key: 'process_evidence', label: 'Process Evidence' },
];

function ScorePip({ value, max = 3 }: { value: number; max?: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, i) => (
        <div
          key={i}
          className={`w-4 h-4 border ${i < value ? 'bg-[#c8f000] border-[#c8f000]' : 'bg-transparent border-[#454933]'}`}
        />
      ))}
    </div>
  );
}

export function ScoreBreakdown({ score, isBoss = false }: ScoreBreakdownProps) {
  const criteria = isBoss ? BOSS_CRITERIA : CRITERIA;
  const maxScore = isBoss ? 15 : 12;

  return (
    <div className="space-y-4">
      {criteria.map(({ key, label }) => {
        const value = (score as unknown as Record<string, number>)[key] ?? 0;
        return (
          <div key={key} className="flex items-center justify-between gap-4">
            <span className="font-mono text-[10px] text-[#8A9E8A] uppercase tracking-wider flex-1">{label}</span>
            <div className="flex items-center gap-3">
              <ScorePip value={value} />
              <span className="font-mono text-xs text-[#c8f000] w-4 text-right">{value}</span>
            </div>
          </div>
        );
      })}
      <div className="border-t border-[#454933] pt-3 flex justify-between items-center">
        <span className="font-mono text-[10px] text-[#8A9E8A] uppercase tracking-wider">Total</span>
        <span className="font-mono text-lg font-medium text-[#c8f000]">{score.total}/{maxScore}</span>
      </div>
      {score.feedback && (
        <p className="font-body italic text-sm text-[#8A9E8A] leading-relaxed border-l-2 border-[#454933] pl-3">
          {score.feedback}
        </p>
      )}
    </div>
  );
}
