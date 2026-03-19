'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZombieDefinition, RubricScore, ZombieState, SurvivorLogEntry, WeaponLevel, ZombieId } from '@/types';
import { KillConfirmation } from '@/components/ui/KillConfirmation';
import { EncounterLayout } from './EncounterLayout';
import { Encounter } from './Encounter';
import { Autopsy } from './Autopsy';
import { Intel } from './Intel';
import { Kill } from './Kill';
import { SurvivorLogPrompt } from './SurvivorLogPrompt';
import { Header } from '@/components/ui/Header';
import { GameState } from '@/types';
import { ZOMBIES } from '@/content/zombies';

type Beat = 'encounter' | 'autopsy' | 'intel' | 'kill' | 'survivor_log';

interface ZombieModuleProps {
  zombieId: ZombieId;
  gameState: GameState;
  onKill: (zombieId: ZombieId, killOutput: string, weapon?: WeaponLevel, survivorEntry?: SurvivorLogEntry) => void;
  onNavigate: (screen: string) => void;
  fieldAssessmentOutput?: string;
}

export function ZombieModule({ zombieId, gameState, onKill, onNavigate, fieldAssessmentOutput }: ZombieModuleProps) {
  const [beat, setBeat] = useState<Beat>('encounter');
  const [zombieState, setZombieState] = useState<ZombieState>('walking');
  const [encounterOutput, setEncounterOutput] = useState('');
  const [killOutput, setKillOutput] = useState('');
  const [showKillConfirmation, setShowKillConfirmation] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const zombie = ZOMBIES.find(z => z.id === zombieId)!;
  const dossierIndex = ZOMBIES.indexOf(zombie) + 1;
  const zoneProgress = gameState.zones.zone1.zombies;
  const currentAttempts = zombieId in zoneProgress
    ? zoneProgress[zombieId as keyof typeof zoneProgress].attempts
    : 0;

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  function handleEncounterContinue(output: string, score: RubricScore, state: ZombieState) {
    setEncounterOutput(output);
    setZombieState(state);
    setBeat('autopsy');
  }

  function handleKillConfirmed(output: string, _score: RubricScore) {
    setKillOutput(output);
    setShowKillConfirmation(true);
  }

  function handleKillAnimationDone() {
    setShowKillConfirmation(false);
    setBeat('survivor_log');
  }

  function handleRetry(_output: string, _score: RubricScore, state: ZombieState) {
    setAttempts(a => a + 1);
    setZombieState(state);
    // Stay on kill beat
  }

  function handleSurvivorComplete(entry: SurvivorLogEntry) {
    onKill(
      zombieId,
      killOutput,
      zombie.weaponUnlock,
      entry
    );
  }

  return (
    <div className="min-h-screen bg-[#0A1A0E]">
      <Header
        screen={`zone1_${zombieId}`}
        weaponLevel={gameState.weaponLevel}
        survivorLogCount={gameState.survivorLog.length}
        onNavigate={onNavigate}
      />

      {/* Sidebar */}
      <nav className="fixed left-0 top-0 h-full w-64 bg-[#0f1f13]/95 backdrop-blur-md flex flex-col py-8 z-40 shadow-2xl mt-16 border-r border-[#454933]/10">
        <div className="px-6 mb-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-[#28392b] flex items-center justify-center border border-[#454933]/20">
            <span className="material-symbols-outlined text-[#c8f000]">local_library</span>
          </div>
          <div>
            <p className="font-mono text-sm text-[#d4e8d4]">Library Map</p>
            <p className="font-mono text-[10px] uppercase tracking-tight text-[#4A5E4A]">Sector 07-B</p>
          </div>
        </div>

        <nav className="flex-grow space-y-1">
          {[
            { icon: 'explore', label: 'Zones', target: 'library_map', active: true },
            { icon: 'edit_note', label: 'Survivor Log', target: 'survivor_log', active: false },
            { icon: 'book_5', label: 'Archives', target: 'archives', active: false },
            { icon: 'menu_book', label: 'Field Manual', target: 'field_manual', active: false },
          ].map(({ icon, label, target, active }) => (
            <button
              key={label}
              onClick={() => onNavigate(target)}
              className={`w-full flex items-center gap-4 px-6 py-3 group transition-all duration-200 text-left ${
                active ? 'bg-[#c8f000]/10 text-[#c8f000] border-r-2 border-[#c8f000]' : 'text-[#4A5E4A] hover:bg-[#132316] hover:text-[#c8f000]'
              }`}
            >
              <span className="material-symbols-outlined text-sm">{icon}</span>
              <span className="font-mono text-xs uppercase tracking-tight">{label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto px-6 space-y-4 pb-6">
          {/* Beat progress */}
          <div className="space-y-2">
            <p className="font-mono text-[9px] uppercase tracking-widest text-[#4A5E4A]">Encounter Progress</p>
            <div className="flex gap-1.5">
              {(['encounter', 'autopsy', 'intel', 'kill', 'survivor_log'] as Beat[]).map((b) => (
                <div key={b}
                  className={`h-1 flex-1 ${
                    b === beat ? 'bg-[#c8f000]' :
                    ['encounter', 'autopsy', 'intel', 'kill', 'survivor_log'].indexOf(b) <
                    ['encounter', 'autopsy', 'intel', 'kill', 'survivor_log'].indexOf(beat)
                    ? 'bg-[#00E87A]' : 'bg-[#2A3D2C]'
                  }`}
                />
              ))}
            </div>
          </div>

          <button className="w-full bg-[#c8f000] text-[#2a3400] py-2 font-mono text-[10px] uppercase tracking-widest font-bold hover:brightness-110 active:scale-95 transition-all"
            style={{ boxShadow: '0 0 20px rgba(200,240,0,0.2)' }}>
            Enter Terminal
          </button>
        </div>
      </nav>

      {/* Kill Confirmation */}
      {showKillConfirmation && (
        <KillConfirmation
          zombieName={zombie.name}
          weaponUnlocked={zombie.weaponUnlockLabel}
          onComplete={handleKillAnimationDone}
        />
      )}

      {/* Encounter Layout with beat content */}
      <EncounterLayout
        zombieId={zombieId}
        zombieName={zombie.name}
        zombieState={zombieState}
        dossierNumber={dossierIndex}
        manifestedHabit={zombie.manifestedHabit}
        manifestedHabitDesc={zombie.manifestedHabitDesc}
        behavioralTrigger={zombie.behavioralTrigger}
        behavioralTriggerDesc={zombie.behavioralTriggerDesc}
        voiceLines={zombie.voiceLines}
      >
        <AnimatePresence mode="wait">
          <motion.div key={beat} variants={pageVariants} initial="initial" animate="animate" exit="exit">
            {beat === 'encounter' && (
              <Encounter
                zombie={zombie}
                attempts={currentAttempts}
                onContinue={handleEncounterContinue}
                fieldAssessmentOutput={zombieId === 'one_and_done' ? fieldAssessmentOutput : undefined}
              />
            )}
            {beat === 'autopsy' && (
              <Autopsy
                zombie={zombie}
                learnerOutput={encounterOutput}
                onContinue={() => setBeat('intel')}
              />
            )}
            {beat === 'intel' && (
              <Intel
                zombie={zombie}
                onContinue={() => setBeat('kill')}
              />
            )}
            {beat === 'kill' && (
              <Kill
                zombie={zombie}
                attempts={attempts}
                onKillConfirmed={handleKillConfirmed}
                onRetry={handleRetry}
              />
            )}
            {beat === 'survivor_log' && (
              <SurvivorLogPrompt
                zombie={zombie}
                weaponEarned={zombie.weaponUnlockLabel}
                onComplete={handleSurvivorComplete}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </EncounterLayout>
    </div>
  );
}
