'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { ZombieDefinition, ZombieId, SurvivorLogEntry } from '@/types';

interface SurvivorLogPromptProps {
  zombie: ZombieDefinition;
  weaponEarned?: string;
  onComplete: (entry: SurvivorLogEntry) => void;
}

export function SurvivorLogPrompt({ zombie, weaponEarned, onComplete }: SurvivorLogPromptProps) {
  const [reflection, setReflection] = useState('');

  const handleSave = () => {
    const entry: SurvivorLogEntry = {
      zombieId: zombie.id as ZombieId,
      zombieName: zombie.name,
      reflection: reflection.trim() || '(No reflection recorded)',
      timestamp: Date.now(),
      weaponEarned,
    };
    onComplete(entry);
  };

  return (
    <div className="space-y-8">
      {/* Survivor Log header */}
      <div className="flex items-center gap-3">
        <span className="material-symbols-outlined text-[#00E87A]">history_edu</span>
        <h3 className="font-display font-bold text-2xl text-[#00E87A] uppercase tracking-widest">Survivor Log Entry</h3>
      </div>

      {/* Weapon earned */}
      {weaponEarned && (
        <div className="bg-[#00E87A]/5 border border-[#00E87A]/20 p-5 flex items-center gap-4">
          <span className="material-symbols-outlined text-[#00E87A]">upgrade</span>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-[#8A9E8A]">New weapon acquired</p>
            <p className="font-display font-bold text-[#00E87A] uppercase tracking-widest text-lg">{weaponEarned}</p>
            <p className="font-body italic text-[#8A9E8A] text-sm">You are no longer fighting with your bare hands.</p>
          </div>
        </div>
      )}

      {/* Kill name strikethrough */}
      <div className="border-t border-b border-[#454933]/30 py-4">
        <p className="font-display font-bold text-xl text-[#F0EBE0]/40 line-through uppercase tracking-wide">
          {zombie.name}
        </p>
        <p className="font-mono text-xs text-[#00E87A] mt-1">ELIMINATED</p>
      </div>

      {/* Reflection prompt */}
      <div className="space-y-4">
        <p className="font-body text-xl text-[#F0EBE0] leading-relaxed italic">
          {zombie.survivorLogPrompt}
        </p>

        <div className="space-y-2">
          <textarea
            value={reflection}
            onChange={e => setReflection(e.target.value)}
            placeholder="Write your reflection here..."
            rows={5}
            className="w-full bg-transparent border-b border-[#454933] outline-none resize-none font-body text-lg text-[#d4e8d4] placeholder:text-[#4A5E4A] pb-2 focus:border-[#c8f000] transition-colors"
          />
          <p className="font-mono text-[10px] text-[#4A5E4A]">Saved to your Survivor Log</p>
        </div>
      </div>

      <Button variant="primary" onClick={handleSave}>
        SAVE ENTRY
      </Button>
    </div>
  );
}
