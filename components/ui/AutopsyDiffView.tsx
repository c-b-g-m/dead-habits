'use client';

import { AutopsyType } from '@/types';
import { BENCHMARKS } from '@/content/benchmarks';

interface AutopsyDiffViewProps {
  type: AutopsyType;
  learnerOutput: string;
  zombieId: string;
}

export function AutopsyDiffView({ type, learnerOutput, zombieId }: AutopsyDiffViewProps) {
  if (type === 'comparison') {
    const bench = BENCHMARKS.blank_slater;
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Learner output */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#D42B00]">YOUR OUTPUT</span>
            <div className="h-px flex-1 bg-[#D42B00]/20" />
          </div>
          <div className="bg-[#0f1f13] p-5 border-l-2 border-[#D42B00]/40 min-h-[200px]">
            <p className="font-mono text-sm text-[#8A9E8A] whitespace-pre-wrap leading-relaxed">
              {learnerOutput || 'No output submitted.'}
            </p>
          </div>
        </div>

        {/* Right: Benchmark */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#c8f000]">BENCHMARK OUTPUT</span>
            <div className="h-px flex-1 bg-[#c8f000]/20" />
          </div>
          <div className="bg-[#0f1f13] p-5 border-l-2 border-[#c8f000]/40 min-h-[200px]">
            <p className="font-mono text-[10px] text-[#8A9E8A] italic mb-3">Prompt used:</p>
            <p className="font-body text-sm text-[#d4e8d4] italic mb-4 leading-relaxed">{bench.prompt}</p>
            <p className="font-mono text-[10px] text-[#8A9E8A] italic mb-2">Output:</p>
            <p className="font-mono text-sm text-[#d4e8d4] whitespace-pre-wrap leading-relaxed">{bench.output}</p>
          </div>
        </div>

        {/* Highlighted differences */}
        <div className="lg:col-span-2 bg-[#192B1C] p-5">
          <p className="font-mono text-[9px] uppercase tracking-widest text-[#8A9E8A] mb-4">What the benchmark contains that yours may not:</p>
          <div className="space-y-2">
            {bench.highlightedDifferences.map((diff, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-[#c8f000] mt-2 flex-shrink-0" />
                <p className="font-body text-sm text-[#d4e8d4]">{diff}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === 'iteration_sequence') {
    const bench = BENCHMARKS.one_and_done;
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Panel A */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 bg-[#D42B00]/20 border border-[#D42B00]/40 font-mono text-xs text-[#D42B00] flex items-center justify-center">A</span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#D42B00]">YOUR FIRST PROMPT</span>
            </div>
            <div className="bg-[#0f1f13] p-4 border-l-2 border-[#D42B00]/40 min-h-[180px]">
              <p className="font-mono text-sm text-[#8A9E8A] whitespace-pre-wrap leading-relaxed">
                {learnerOutput || 'Your Field Assessment output'}
              </p>
            </div>
          </div>

          {/* Panel B */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 bg-[#FF8C00]/20 border border-[#FF8C00]/40 font-mono text-xs text-[#FF8C00] flex items-center justify-center">B</span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#FF8C00]">ITERATION 1 — ADDING CONSTRAINTS</span>
            </div>
            <div className="bg-[#0f1f13] p-4 border-l-2 border-[#FF8C00]/40 min-h-[180px]">
              <p className="font-body text-xs italic text-[#8A9E8A] mb-2">{bench.panels[1].prompt}</p>
              <p className="font-mono text-xs text-[#d4e8d4] whitespace-pre-wrap leading-relaxed">{bench.panels[1].output}</p>
            </div>
          </div>

          {/* Panel C */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 bg-[#c8f000]/20 border border-[#c8f000]/40 font-mono text-xs text-[#c8f000] flex items-center justify-center">C</span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#c8f000]">ITERATION 2 — STEERING THE RESULT</span>
            </div>
            <div className="bg-[#0f1f13] p-4 border-l-2 border-[#c8f000]/40 min-h-[180px]">
              <p className="font-body text-xs italic text-[#8A9E8A] mb-2">{bench.panels[2].prompt}</p>
              <p className="font-mono text-xs text-[#d4e8d4] whitespace-pre-wrap leading-relaxed">{bench.panels[2].output}</p>
            </div>
          </div>
        </div>

        {/* Progressions */}
        <div className="bg-[#192B1C] p-5">
          <p className="font-mono text-[9px] uppercase tracking-widest text-[#8A9E8A] mb-4">What changed A→B→C:</p>
          <div className="space-y-2">
            {bench.highlightedProgressions.map((p, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-[#c8f000] mt-2 flex-shrink-0" />
                <p className="font-body text-sm text-[#d4e8d4]">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Claims verification
  return (
    <ClaimsVerificationView learnerOutput={learnerOutput} />
  );
}

function ClaimsVerificationView({ learnerOutput }: { learnerOutput: string }) {
  // Parse claims from learner output (simple line-based splitting)
  const claims = learnerOutput
    .split('\n')
    .filter(l => l.trim().length > 20)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="bg-[#192B1C] p-5">
        <h4 className="font-mono text-[10px] uppercase tracking-widest text-[#c8f000] mb-2">CLAIMS VERIFICATION REPORT</h4>
        <p className="font-body text-sm text-[#8A9E8A] italic">
          For each claim Claude made, mark what you found when you checked:
        </p>
      </div>
      <div className="space-y-4">
        {(claims.length > 0 ? claims : ['Paste your Claude output to see claims here.']).map((claim, i) => (
          <div key={i} className="bg-[#0f1f13] p-5 border-l-2 border-[#454933]/40">
            <p className="font-mono text-[9px] uppercase tracking-widest text-[#8A9E8A] mb-2">Claim {i + 1}</p>
            <p className="font-body text-sm text-[#d4e8d4] mb-4 leading-relaxed">{claim}</p>
            <div className="grid grid-cols-2 gap-2">
              {BENCHMARKS.over_truster.verificationOptions.map((opt, j) => (
                <label key={j} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name={`claim-${i}`}
                    value={opt}
                    className="accent-[#c8f000]"
                  />
                  <span className="font-mono text-[10px] text-[#8A9E8A] group-hover:text-[#d4e8d4] transition-colors">{opt}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
