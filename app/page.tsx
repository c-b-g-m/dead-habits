'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useGameState } from '@/hooks/useGameState';
import { ZombieId, WeaponLevel, SurvivorLogEntry } from '@/types';

// Orientation screens
import { EmergencyBroadcast } from '@/components/orientation/EmergencyBroadcast';
import { CaseFile } from '@/components/orientation/CaseFile';
import { OutbreakMap } from '@/components/orientation/OutbreakMap';
import { RecruitmentOffer } from '@/components/orientation/RecruitmentOffer';
import { FieldAssessment } from '@/components/orientation/FieldAssessment';
import { EntranceHall } from '@/components/orientation/EntranceHall';

// Game screens
import { LibraryMap } from '@/components/game/LibraryMap';
import { ZombieModule } from '@/components/game/ZombieModule';
import { BossEncounter } from '@/components/game/BossEncounter';
import { SupplyDrop } from '@/components/game/SupplyDrop';

import { RETURN_STATE } from '@/content/gameData';

const FADE = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.35 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

// Simple loading screen
function LoadingScreen() {
  return (
    <div className="min-h-screen bg-[#0A1A0E] flex items-center justify-center">
      <div className="space-y-3 text-center">
        <div className="w-6 h-6 border-2 border-[#c8f000]/40 border-t-[#c8f000] rounded-full animate-spin mx-auto" />
        <p className="font-mono text-[10px] uppercase tracking-widest text-[#4A5E4A]">Loading...</p>
      </div>
    </div>
  );
}

// Return state / welcome back screen
function WelcomeBack({ onContinue, onRestart }: { onContinue: () => void; onRestart: () => void }) {
  const [confirmRestart, setConfirmRestart] = useState(false);

  return (
    <div className="min-h-screen bg-[#0A1A0E] flex items-center justify-center px-8">
      <div className="scan-line-overlay" />
      <motion.div
        className="max-w-lg w-full space-y-8 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="space-y-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#4A5E4A] block">Hargrove Library</span>
          <h1 className="font-display font-extrabold text-5xl text-[#c8f000] uppercase tracking-tight"
            style={{ textShadow: '0 0 30px rgba(200,240,0,0.3)' }}>
            {RETURN_STATE.header}
          </h1>
          <p className="font-body italic text-[#8A9E8A] text-xl">{RETURN_STATE.sub}</p>
        </div>

        {/* Status indicator */}
        <div className="bg-[#0f1f13] border-l-2 border-[#c8f000]/40 p-4 flex items-center gap-3">
          <span className="w-2 h-2 bg-[#c8f000] rounded-full animate-pulse" style={{ boxShadow: '0 0 8px #c8f000' }} />
          <span className="font-mono text-xs uppercase tracking-widest text-[#c8f000]">Progress Restored</span>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <button
            onClick={onContinue}
            className="w-full bg-[#c8f000] text-[#2a3400] py-5 font-display font-bold uppercase tracking-widest text-base hover:brightness-110 transition-all"
            style={{ boxShadow: '0 0 20px rgba(200,240,0,0.2)' }}
          >
            {RETURN_STATE.continueCta}
          </button>

          {!confirmRestart ? (
            <button
              onClick={() => setConfirmRestart(true)}
              className="w-full border border-[#454933]/40 text-[#8A9E8A] py-4 font-mono text-xs uppercase tracking-widest hover:border-[#D42B00]/40 hover:text-[#D42B00] transition-all"
            >
              {RETURN_STATE.restartCta}
            </button>
          ) : (
            <div className="border border-[#D42B00]/40 p-4 space-y-4">
              <p className="font-mono text-xs text-[#D42B00] text-center">{RETURN_STATE.restartConfirm}</p>
              <div className="flex gap-3">
                <button
                  onClick={onRestart}
                  className="flex-1 bg-[#D42B00]/10 border border-[#D42B00]/40 text-[#D42B00] py-3 font-mono text-xs uppercase tracking-widest hover:bg-[#D42B00]/20 transition-all"
                >
                  Yes, Erase
                </button>
                <button
                  onClick={() => setConfirmRestart(false)}
                  className="flex-1 border border-[#454933]/40 text-[#8A9E8A] py-3 font-mono text-xs uppercase tracking-widest hover:border-[#c8f000]/40 hover:text-[#c8f000] transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

// Survivor Log viewer screen
function SurvivorLogScreen({ entries, onBack }: { entries: SurvivorLogEntry[]; onBack: () => void }) {
  return (
    <div className="min-h-screen bg-[#0A1A0E] px-8 py-20 max-w-3xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#4A5E4A] hover:text-[#c8f000] transition-colors mb-10"
      >
        <span className="material-symbols-outlined text-sm">arrow_back</span>
        Back
      </button>

      <div className="flex items-center gap-3 mb-10">
        <span className="material-symbols-outlined text-[#00E87A]">history_edu</span>
        <h1 className="font-display font-bold text-3xl text-[#F0EBE0] uppercase tracking-widest">Survivor Log</h1>
      </div>

      {entries.length === 0 ? (
        <div className="bg-[#0f1f13] p-8 border-l-2 border-[#454933]/40">
          <p className="font-body italic text-[#4A5E4A] text-lg">No entries yet. Eliminate your first zombie to begin.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {entries.map((entry, i) => (
            <div key={entry.timestamp} className="bg-[#0f1f13] p-6 border-l-2 border-[#00E87A]/30 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-display font-bold text-[#F0EBE0]/40 line-through uppercase tracking-wide text-lg">{entry.zombieName}</p>
                  <p className="font-mono text-xs text-[#00E87A] mt-0.5">ELIMINATED</p>
                </div>
                {entry.weaponEarned && (
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#c8f000] bg-[#c8f000]/10 px-2 py-1">{entry.weaponEarned}</span>
                )}
              </div>
              {entry.reflection && entry.reflection !== '(No reflection recorded)' && (
                <p className="font-body text-lg text-[#d4e8d4] italic leading-relaxed">{entry.reflection}</p>
              )}
              <p className="font-mono text-[10px] text-[#4A5E4A]">
                {new Date(entry.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Coming soon placeholder
function ComingSoon({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <div className="min-h-screen bg-[#0A1A0E] flex flex-col items-center justify-center px-8 gap-8">
      <div className="text-center space-y-3">
        <span className="font-mono text-[10px] uppercase tracking-widest text-[#4A5E4A] block">Hargrove Library</span>
        <h1 className="font-display font-bold text-4xl text-[#F0EBE0] uppercase tracking-tight">{title}</h1>
        <p className="font-body italic text-[#4A5E4A] text-xl">This section is restricted. Clear Zone 1 to unlock.</p>
      </div>
      <button
        onClick={onBack}
        className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#4A5E4A] hover:text-[#c8f000] transition-colors"
      >
        <span className="material-symbols-outlined text-sm">arrow_back</span>
        Return to Library Map
      </button>
    </div>
  );
}

export default function Home() {
  const {
    state,
    hasSavedState,
    isLoaded,
    setScreen,
    completeOrientation,
    saveFieldAssessment,
    recordKill,
    addSurvivorLogEntry,
    claimSupplyDrop,
    resetState,
  } = useGameState();

  // Track whether the user has acknowledged the return state
  const [returnAcknowledged, setReturnAcknowledged] = useState(false);

  // Wait for localStorage to load
  if (!isLoaded) {
    return <LoadingScreen />;
  }

  // Show welcome back screen if there's saved state and they haven't acknowledged it
  if (hasSavedState && !returnAcknowledged) {
    return (
      <WelcomeBack
        onContinue={() => setReturnAcknowledged(true)}
        onRestart={() => {
          resetState();
          setReturnAcknowledged(true);
        }}
      />
    );
  }

  function handleNavigate(screen: string) {
    if (screen === 'zone1') {
      // Resolve active zombie
      const { zone1 } = state.zones;
      if (zone1.bossStatus === 'killed') {
        if (!zone1.supplyDrop1Claimed) {
          setScreen('zone1_supply_drop');
        } else {
          setScreen('library_map');
        }
      } else if (zone1.bossStatus === 'active') {
        setScreen('zone1_boss');
      } else if (zone1.zombies.over_truster.status === 'active') {
        setScreen('zone1_over_truster');
      } else if (zone1.zombies.one_and_done.status === 'active') {
        setScreen('zone1_one_and_done');
      } else {
        setScreen('zone1_blank_slater');
      }
      return;
    }
    setScreen(screen);
  }

  function handleZombieKill(
    zombieId: ZombieId,
    killOutput: string,
    weapon?: WeaponLevel,
    survivorEntry?: SurvivorLogEntry
  ) {
    recordKill(zombieId, killOutput, weapon);
    if (survivorEntry) {
      addSurvivorLogEntry(survivorEntry);
    }
    // Navigate back to library map after kill
    setScreen('library_map');
  }

  function handleBossKill() {
    recordKill('habit_horde', '');
    setScreen('zone1_supply_drop');
  }

  function handleSupplyDropDismiss() {
    claimSupplyDrop();
    setScreen('library_map');
  }

  const screen = state.currentScreen;

  return (
    <AnimatePresence mode="wait">
      {/* === ORIENTATION === */}
      {screen === 'orientation_1' && (
        <motion.div key="o1" {...FADE}>
          <EmergencyBroadcast onNext={() => setScreen('orientation_2')} />
        </motion.div>
      )}

      {screen === 'orientation_2' && (
        <motion.div key="o2" {...FADE}>
          <CaseFile onNext={() => setScreen('orientation_3')} />
        </motion.div>
      )}

      {screen === 'orientation_3' && (
        <motion.div key="o3" {...FADE}>
          <OutbreakMap onNext={() => setScreen('orientation_4')} />
        </motion.div>
      )}

      {screen === 'orientation_4' && (
        <motion.div key="o4" {...FADE}>
          <RecruitmentOffer onNext={() => setScreen('orientation_5')} />
        </motion.div>
      )}

      {screen === 'orientation_5' && (
        <motion.div key="o5" {...FADE}>
          <FieldAssessment
            onComplete={(output, score, feedback, primaryZombie) => {
              saveFieldAssessment(output, score, feedback, primaryZombie);
              setScreen('entrance_hall');
            }}
          />
        </motion.div>
      )}

      {screen === 'entrance_hall' && (
        <motion.div key="entrance" {...FADE}>
          <EntranceHall onComplete={completeOrientation} />
        </motion.div>
      )}

      {/* === GAME === */}
      {screen === 'library_map' && (
        <motion.div key="library_map" {...FADE}>
          <LibraryMap state={state} onNavigate={handleNavigate} />
        </motion.div>
      )}

      {screen === 'zone1_blank_slater' && (
        <motion.div key="zone1_blank_slater" {...FADE}>
          <ZombieModule
            zombieId="blank_slater"
            gameState={state}
            onKill={handleZombieKill}
            onNavigate={handleNavigate}
          />
        </motion.div>
      )}

      {screen === 'zone1_one_and_done' && (
        <motion.div key="zone1_one_and_done" {...FADE}>
          <ZombieModule
            zombieId="one_and_done"
            gameState={state}
            onKill={handleZombieKill}
            onNavigate={handleNavigate}
            fieldAssessmentOutput={state.fieldAssessment.output}
          />
        </motion.div>
      )}

      {screen === 'zone1_over_truster' && (
        <motion.div key="zone1_over_truster" {...FADE}>
          <ZombieModule
            zombieId="over_truster"
            gameState={state}
            onKill={handleZombieKill}
            onNavigate={handleNavigate}
          />
        </motion.div>
      )}

      {screen === 'zone1_boss' && (
        <motion.div key="zone1_boss" {...FADE}>
          <BossEncounter
            gameState={state}
            onKill={handleBossKill}
            onNavigate={handleNavigate}
          />
        </motion.div>
      )}

      {screen === 'zone1_supply_drop' && (
        <motion.div key="zone1_supply_drop" {...FADE}>
          <SupplyDrop onDismiss={handleSupplyDropDismiss} />
        </motion.div>
      )}

      {/* === SECONDARY SCREENS === */}
      {screen === 'survivor_log' && (
        <motion.div key="survivor_log" {...FADE}>
          <SurvivorLogScreen
            entries={state.survivorLog}
            onBack={() => setScreen('library_map')}
          />
        </motion.div>
      )}

      {screen === 'archives' && (
        <motion.div key="archives" {...FADE}>
          <ComingSoon title="The Archives" onBack={() => setScreen('library_map')} />
        </motion.div>
      )}

      {screen === 'field_manual' && (
        <motion.div key="field_manual" {...FADE}>
          <ComingSoon title="Field Manual" onBack={() => setScreen('library_map')} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
