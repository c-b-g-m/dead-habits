'use client';

import { ReactNode } from 'react';
import { ZombieId } from '@/types';
import { BlankSlater } from '@/components/zombies/BlankSlater';
import { OneAndDone } from '@/components/zombies/OneAndDone';
import { OverTruster } from '@/components/zombies/OverTruster';
import { HabitHorde } from '@/components/zombies/HabitHorde';
import { ZombieState } from '@/types';

interface EncounterLayoutProps {
  zombieId: ZombieId;
  zombieName: string;
  zombieState: ZombieState;
  dossierNumber: number;
  manifestedHabit: string;
  manifestedHabitDesc: string;
  behavioralTrigger: string;
  behavioralTriggerDesc: string;
  voiceLines: string[];
  archiveQuote?: string;
  children: ReactNode;
}

function ZombiePortrait({ zombieId, zombieName, zombieState, voiceLines }: { zombieId: ZombieId; zombieName: string; zombieState: ZombieState; voiceLines: string[] }) {
  const ZombieComponent = {
    blank_slater: BlankSlater,
    one_and_done: OneAndDone,
    over_truster: OverTruster,
    habit_horde: HabitHorde,
  }[zombieId];

  const refId = {
    blank_slater: '0x8823_BLANK',
    one_and_done: '0x8824_DONE',
    over_truster: '0x8825_TRUST',
    habit_horde: '0x8826_HORDE',
  }[zombieId];

  return (
    <div className="lg:col-span-5 lg:sticky lg:top-24">
      {/* Polaroid portrait card */}
      <div className="relative">
        {/* Paper underlay */}
        <div className="absolute inset-0 bg-white/5 rotate-2 translate-x-2 translate-y-2 rounded-sm -z-10" />

        <div className="relative bg-stone-100 p-2 shadow-2xl" style={{ boxShadow: '0 0 0 4px #fff, 0 4px 12px rgba(0,0,0,0.3)' }}>
          {/* Photo area */}
          <div className="aspect-square bg-[#0A1A0E] mb-4 relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-10" />
            <div className="absolute -right-10 top-1/4 w-32 h-32 rounded-full blur-3xl pointer-events-none"
              style={{ background: 'rgba(200,240,0,0.1)' }} />
            <ZombieComponent state={zombieState} size="lg" />
          </div>

          {/* Caption */}
          <div className="px-2 pb-4">
            <div className="flex justify-between items-end border-b border-black/10 pb-2">
              <div>
                <h3 className="font-display text-xl font-bold tracking-tight text-[#1d2e20] uppercase leading-none">
                  Entity: {zombieName.replace('THE ', '')}
                </h3>
                <p className="font-mono text-[9px] text-[#1d2e20]/40 uppercase tracking-widest mt-1">Ref. {refId}</p>
              </div>
              <span className="material-symbols-outlined text-[#1d2e20]/20" style={{ fontSize: '32px' }}>fingerprint</span>
            </div>
          </div>
          {/* Paper clip */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-12 h-6 bg-stone-300 rounded-full opacity-50 border border-stone-400 -z-10" />
        </div>
      </div>

      {/* Voice lines */}
      <div className="mt-8">
        <div className="p-5 bg-[#0f1f13]/80 border border-[#454933]/10 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#c8f000] opacity-5" />
          <div className="space-y-2">
            {voiceLines.map((line, i) => (
              <p key={i} className="font-body italic text-[#d4e8d4] text-lg leading-relaxed">{line}</p>
            ))}
          </div>
          <span className="absolute bottom-2 right-2 font-mono text-[8px] opacity-20 uppercase">Observer Log 442</span>
        </div>
      </div>
    </div>
  );
}

export function EncounterLayout({
  zombieId,
  zombieName,
  zombieState,
  dossierNumber,
  manifestedHabit,
  manifestedHabitDesc,
  behavioralTrigger,
  behavioralTriggerDesc,
  voiceLines,
  children,
}: EncounterLayoutProps) {
  return (
    <main className="lg:ml-64 pt-20 min-h-screen px-4 lg:px-10 pb-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start relative">

        {/* Left: Zombie Portrait */}
        <ZombiePortrait zombieId={zombieId} zombieName={zombieName} zombieState={zombieState} voiceLines={voiceLines} />

        {/* Right: Dossier Content */}
        <div className="lg:col-span-7 space-y-8 lg:space-y-10">
          {/* Dossier paper */}
          <section
            className="relative overflow-hidden transition-transform hover:rotate-0 duration-700"
            style={{
              background: '#e5e9db',
              color: '#1d2e20',
              padding: 'clamp(1.5rem, 5vw, 3rem)',
              transform: 'rotate(-0.5deg)',
              transformOrigin: 'top right',
            }}
          >
            {/* Corner fold */}
            <div className="absolute top-0 right-0 w-16 h-16 border-l border-b border-black/5"
              style={{ background: 'rgba(200,240,0,0.08)' }} />

            {/* Dossier header */}
            <div className="mb-6 lg:mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-[#1d2e20]/40" style={{ fontSize: '12px' }}>folder_shared</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#1d2e20]/60 font-bold">
                    Dept. of Dead Habits // Dossier {String(dossierNumber).padStart(2, '0')}
                  </span>
                </div>
                <h2 className="font-body text-3xl lg:text-5xl font-semibold text-[#1d2e20] tracking-tight">
                  Subject: {zombieName}
                </h2>
              </div>
              <div className="text-right self-start">
                <span className="font-mono text-[10px] border-2 border-red-900/30 px-3 py-1 uppercase text-red-900/60 font-bold inline-block"
                  style={{ transform: 'rotate(12deg)', display: 'inline-block' }}>
                  Urgent Assessment
                </span>
              </div>
            </div>

            {/* Manifested Habit + Behavioral Trigger */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-[#1d2e20]/10 pt-8">
              <div className="p-4 hover:bg-black/5 transition-colors rounded-sm">
                <h4 className="font-mono text-[10px] uppercase text-[#1d2e20]/50 mb-3 flex items-center gap-1">
                  <span className="material-symbols-outlined" style={{ fontSize: '12px' }}>psychology</span>
                  Manifested Habit
                </h4>
                <p className="font-body text-xl font-bold text-[#1d2e20]">{manifestedHabit}</p>
                <p className="font-body italic text-[#1d2e20]/80 mt-2 text-base leading-relaxed">{manifestedHabitDesc}</p>
              </div>
              <div className="p-4 hover:bg-black/5 transition-colors rounded-sm">
                <h4 className="font-mono text-[10px] uppercase text-[#1d2e20]/50 mb-3 flex items-center gap-1">
                  <span className="material-symbols-outlined" style={{ fontSize: '12px' }}>timer_off</span>
                  Behavioral Trigger
                </h4>
                <p className="font-body text-xl font-bold text-[#1d2e20]">{behavioralTrigger}</p>
                <p className="font-body italic text-[#1d2e20]/80 mt-2 text-base leading-relaxed">{behavioralTriggerDesc}</p>
              </div>
            </div>

            {/* Classified circular stamp */}
            <div className="absolute bottom-12 right-12 w-28 h-28 border-4 border-red-900/20 rounded-full hidden sm:flex items-center justify-center pointer-events-none"
              style={{ transform: 'rotate(-12deg)' }}>
              <div className="text-center">
                <span className="font-mono text-[10px] text-red-900/30 font-bold uppercase block">Classified</span>
                <span className="font-mono text-[8px] text-red-900/30 uppercase block mt-1 tracking-widest">Sector 07-B</span>
              </div>
            </div>
          </section>

          {/* Dynamic content (encounter task, autopsy, intel, kill) */}
          {children}
        </div>
      </div>
    </main>
  );
}
