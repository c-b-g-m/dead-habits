'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { AutopsyDiffView } from '@/components/ui/AutopsyDiffView';
import { ZombieDefinition } from '@/types';

interface AutopsyProps {
  zombie: ZombieDefinition;
  learnerOutput: string;
  onContinue: () => void;
}

export function Autopsy({ zombie, learnerOutput, onContinue }: AutopsyProps) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const shortAnswerIdx = zombie.autopsyQuestions.findIndex(q => !q.includes('○'));

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="space-y-10">
      {/* Autopsy header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[#c8f000]">biotech</span>
          <h3 className="font-display font-bold text-2xl text-[#c8f000] uppercase tracking-widest">Autopsy Report</h3>
        </div>
        <p className="font-body italic text-[#8A9E8A] text-lg">
          Compare your output against the benchmark. Name the gap — don't just observe it.
        </p>
      </div>

      {/* Diff view */}
      <AutopsyDiffView
        type={zombie.autopsyType}
        learnerOutput={learnerOutput}
        zombieId={zombie.id}
      />

      {/* Diagnostic questions */}
      <div className="space-y-6">
        <h4 className="font-mono text-[10px] uppercase tracking-widest text-[#8A9E8A]">Diagnostic Questions</h4>
        {zombie.autopsyQuestions.map((question, idx) => {
          const hasOptions = question.includes('○');
          const parts = question.split('\n');
          const questionText = parts[0];
          const optionLines = parts.slice(1).filter(l => l.includes('○'));
          const isShortAnswer = !hasOptions;

          return (
            <div key={idx} className="bg-[#0f1f13] p-6 border border-[#454933]/20 space-y-4">
              <p className="font-body text-lg text-[#d4e8d4] leading-relaxed">{questionText}</p>

              {hasOptions ? (
                <div className="flex flex-wrap gap-4">
                  {optionLines.flatMap(line =>
                    line.split('○').filter(Boolean).map(opt => opt.trim())
                  ).map((option, j) => (
                    <label key={j} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name={`q-${idx}`}
                        value={option}
                        onChange={e => setAnswers(prev => ({ ...prev, [idx]: e.target.value }))}
                        className="accent-[#c8f000]"
                        disabled={submitted}
                      />
                      <span className="font-mono text-xs text-[#8A9E8A] group-hover:text-[#d4e8d4] transition-colors">{option}</span>
                    </label>
                  ))}
                </div>
              ) : (
                <textarea
                  value={answers[idx] ?? ''}
                  onChange={e => setAnswers(prev => ({ ...prev, [idx]: e.target.value }))}
                  placeholder="Your answer..."
                  rows={3}
                  disabled={submitted}
                  className="w-full bg-transparent border-b border-[#454933] outline-none resize-none font-body text-base text-[#d4e8d4] placeholder:text-[#4A5E4A] pb-2 focus:border-[#c8f000] transition-colors"
                />
              )}
            </div>
          );
        })}
      </div>

      {!submitted ? (
        <Button variant="primary" onClick={handleSubmit}>
          CONTINUE TO INTEL
        </Button>
      ) : (
        <div className="space-y-4">
          <p className="font-body italic text-[#8A9E8A] text-lg leading-relaxed border-l-2 border-[#c8f000]/20 pl-4">
            You've named the gap. Now read the Intel — it explains why this habit forms and how to kill it.
          </p>
          <Button variant="primary" onClick={onContinue}>
            READ THE INTEL
          </Button>
        </div>
      )}
    </div>
  );
}
