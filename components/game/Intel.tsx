'use client';

import { Button } from '@/components/ui/Button';
import { ZombieDefinition } from '@/types';

interface IntelProps {
  zombie: ZombieDefinition;
  onContinue: () => void;
}

// Simple markdown-like bold renderer
function renderIntelContent(content: string) {
  const lines = content.split('\n');
  return lines.map((line, idx) => {
    if (line.startsWith('**') && line.endsWith('**')) {
      return (
        <p key={idx} className="font-body font-semibold text-[#F0EBE0] text-xl leading-relaxed mt-4 first:mt-0">
          {line.slice(2, -2)}
        </p>
      );
    }
    if (line === '') return <div key={idx} className="h-3" />;
    // Inline bold
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    return (
      <p key={idx} className="font-body text-xl text-[#d4e8d4] leading-[1.7]">
        {parts.map((part, i) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i} className="font-semibold text-[#F0EBE0]">{part.slice(2, -2)}</strong>;
          }
          return part;
        })}
      </p>
    );
  });
}

export function Intel({ zombie, onContinue }: IntelProps) {
  return (
    <div className="space-y-8">
      {/* Intel header */}
      <div className="flex items-center gap-3">
        <span className="material-symbols-outlined text-[#c8f000]">article</span>
        <h3 className="font-display font-bold text-2xl text-[#c8f000] uppercase tracking-widest">Field Intel</h3>
      </div>

      {/* Intel content card */}
      <div className="bg-[#0f1f13] p-8 border-l-2 border-[#c8f000]/30 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full desk-lamp-blur pointer-events-none opacity-50" />
        <div className="relative z-10 space-y-2">
          <h4 className="font-display font-bold text-2xl text-[#F0EBE0] uppercase tracking-wide mb-6">
            {zombie.intelTitle}
          </h4>
          {renderIntelContent(zombie.intelContent)}
        </div>
      </div>

      {/* Kill condition */}
      <div className="bg-[#192B1C] p-6 border border-[#c8f000]/20 space-y-2">
        <div className="flex items-center gap-2 mb-3">
          <span className="material-symbols-outlined text-[#c8f000]" style={{ fontSize: '16px' }}>target</span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#c8f000]">Kill Condition</span>
        </div>
        <p className="font-body text-lg text-[#d4e8d4] leading-relaxed">{zombie.killCondition}</p>
      </div>

      <Button variant="primary" onClick={onContinue}>
        ATTEMPT THE KILL
      </Button>
    </div>
  );
}
