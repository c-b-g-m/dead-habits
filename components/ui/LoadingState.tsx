'use client';

import { useEffect, useState } from 'react';
import { LOADING_STATES } from '@/content/gameData';

type LoadingContext = 'field_assessment' | 'zombie_kill' | 'boss';

interface LoadingStateProps {
  context: LoadingContext;
}

export function LoadingState({ context }: LoadingStateProps) {
  const [criteriaIdx, setCriteriaIdx] = useState(0);

  useEffect(() => {
    if (context !== 'zombie_kill') return;
    const criteria = LOADING_STATES.zombieKill.criteria;
    const interval = setInterval(() => {
      setCriteriaIdx(i => (i + 1) % criteria.length);
    }, 700);
    return () => clearInterval(interval);
  }, [context]);

  if (context === 'field_assessment') {
    return (
      <div className="flex flex-col items-center gap-6 py-12">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border border-[#c8f000]/20 rounded-full" />
          <div className="absolute inset-0 border-t border-[#c8f000] rounded-full animate-spin" />
        </div>
        <div className="text-center space-y-2">
          <p className="font-mono text-sm text-[#c8f000] tracking-widest">{LOADING_STATES.fieldAssessment.primary}</p>
          <p className="font-body text-sm text-[#8A9E8A] italic">{LOADING_STATES.fieldAssessment.secondary}</p>
        </div>
      </div>
    );
  }

  if (context === 'zombie_kill') {
    return (
      <div className="flex flex-col items-center gap-4 py-8">
        <div className="flex gap-1">
          {[0, 1, 2].map(i => (
            <div key={i} className="w-2 h-2 bg-[#c8f000] animate-pulse" style={{ animationDelay: `${i * 0.15}s` }} />
          ))}
        </div>
        <p className="font-mono text-sm text-[#c8f000] tracking-widest">{LOADING_STATES.zombieKill.primary}</p>
        <p className="font-mono text-xs text-[#8A9E8A] tracking-wider">
          Evaluating: {LOADING_STATES.zombieKill.criteria[criteriaIdx]}
        </p>
      </div>
    );
  }

  // Boss
  return (
    <div className="flex flex-col items-center gap-6 py-12">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 border-2 border-[#D42B00]/20 rounded-full" />
        <div className="absolute inset-0 border-t-2 border-[#D42B00] rounded-full animate-spin" />
        <div className="absolute inset-3 border border-[#c8f000]/30 rounded-full" />
        <div className="absolute inset-3 border-t border-[#c8f000] rounded-full animate-[spin_2s_linear_infinite_reverse]" />
      </div>
      <div className="text-center space-y-2">
        <p className="font-mono text-sm text-[#D42B00] tracking-widest uppercase">{LOADING_STATES.boss.primary}</p>
        <p className="font-body text-sm text-[#8A9E8A] italic">{LOADING_STATES.boss.secondary}</p>
      </div>
    </div>
  );
}
