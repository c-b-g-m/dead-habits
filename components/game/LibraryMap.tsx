'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GameState } from '@/types';
import { ZONES } from '@/content/gameData';
import { ZoneDoorCard } from './ZoneDoorCard';
import { Header } from '@/components/ui/Header';
import { BlankSlater } from '@/components/zombies/BlankSlater';

interface LibraryMapProps {
  state: GameState;
  onNavigate: (screen: string) => void;
}

export function LibraryMap({ state, onNavigate }: LibraryMapProps) {
  const [lockedMessage, setLockedMessage] = useState('');

  const zone1Kills = [
    state.zones.zone1.zombies.blank_slater.status === 'killed',
    state.zones.zone1.zombies.one_and_done.status === 'killed',
    state.zones.zone1.zombies.over_truster.status === 'killed',
  ].filter(Boolean).length;

  function handleZoneClick(zoneId: string) {
    if (zoneId === 'zone1') {
      onNavigate('zone1');
      return;
    }
    const zone = ZONES.find(z => z.id === zoneId);
    if (zone?.lockedMessage) {
      setLockedMessage(zone.lockedMessage);
      setTimeout(() => setLockedMessage(''), 4000);
    }
  }

  const currentZombieInZone1 = state.zones.zone1.bossStatus === 'active' ? 'THE HABIT HORDE'
    : state.zones.zone1.zombies.over_truster.status === 'active' ? 'THE OVER-TRUSTER'
    : state.zones.zone1.zombies.one_and_done.status === 'active' ? 'THE ONE-AND-DONE'
    : 'THE BLANK SLATER';

  return (
    <div className="min-h-screen bg-[#0A1A0E]">
      <Header
        screen="library_map"
        weaponLevel={state.weaponLevel}
        survivorLogCount={state.survivorLog.length}
        onNavigate={onNavigate}
      />

      {/* Scan line */}
      <div className="scan-line-overlay" />

      <div className="flex min-h-screen pt-16">
        {/* Sidebar */}
        <nav className="fixed left-0 top-0 h-full flex flex-col z-40 bg-[#111D14] w-[280px] border-r border-[#2A3D2C] pt-20">
          <div className="px-8 mb-12">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#192B1C] border border-[#c8f000]/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-[#c8f000]">menu_book</span>
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-[#F0EBE0] leading-tight uppercase tracking-tight">Library Map</h3>
                <p className="font-mono text-[10px] uppercase tracking-tighter text-[#8A9E8A]">Hargrove Library</p>
              </div>
            </div>
          </div>

          <div className="flex-grow flex flex-col gap-1 px-4">
            {[
              { icon: 'map', label: 'Zones', active: true, target: 'library_map' },
              { icon: 'history_edu', label: 'Survivor Log', active: false, target: 'survivor_log' },
              { icon: 'menu_book', label: 'Archives', active: false, target: 'archives' },
              { icon: 'auto_stories', label: 'Field Manual', active: false, target: 'field_manual' },
            ].map(({ icon, label, active, target }) => (
              <button
                key={label}
                onClick={() => onNavigate(target)}
                className={`flex items-center gap-4 px-6 py-4 font-display uppercase text-sm tracking-widest transition-all ${
                  active ? 'bg-[#c8f000]/5 text-[#c8f000] border-r-2 border-[#c8f000]' : 'text-[#8A9E8A] hover:bg-[#192B1C] hover:text-[#c8f000]'
                }`}
              >
                <span className="material-symbols-outlined">{icon}</span>
                <span>{label}</span>
              </button>
            ))}
          </div>

          <div className="p-6 mt-auto">
            <button className="w-full py-4 mb-8 bg-[#c8f000] text-[#2a3400] font-display font-bold uppercase tracking-[0.2em] text-xs hover:brightness-110 transition-all"
              style={{ boxShadow: '0 0 15px rgba(200, 240, 0, 0.2)' }}>
              Enter Terminal
            </button>
          </div>
        </nav>

        {/* Main Canvas */}
        <main className="ml-[280px] pt-16 min-h-screen flex">
          {/* Center Content */}
          <section className="flex-grow p-12 relative overflow-hidden bg-[#0A1A0E]">
            {/* Background */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-[#0A1A0E] via-transparent to-[#0A1A0E]" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0A1A0E] via-transparent to-[#0A1A0E]" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto">
              {/* Header */}
              <div className="mb-16 flex justify-between items-end border-b border-[#2A3D2C] pb-8">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-[#c8f000]/60" style={{ fontSize: '14px' }}>auto_stories</span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-[#c8f000]/60">Cartographic Archives</span>
                  </div>
                  <h1 className="font-display text-5xl font-bold tracking-tighter text-[#F0EBE0] uppercase terminal-glow">
                    Library Mapping
                  </h1>
                  <div className="h-px bg-gradient-to-r from-[#c8f000]/40 via-[#c8f000]/10 to-transparent mt-2" />
                  <p className="font-body italic text-[#8A9E8A] text-xl mt-6">
                    "The silent layout of Hargrove Library, reconstructed from fragmented memory."
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="px-5 py-2 border border-[#4A6B4C] bg-[#111D14]/80 backdrop-blur-sm flex items-center gap-3">
                    <span className="w-2 h-2 bg-[#c8f000] animate-pulse" style={{ boxShadow: '0 0 8px #c8f000' }} />
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#c8f000]">Live Sync</span>
                  </div>
                </div>
              </div>

              {/* Zone Grid */}
              <div className="grid grid-cols-12 grid-rows-6 gap-4" style={{ height: '580px' }}>
                {/* Zone 1 — Large active zone */}
                <div className="col-span-6 row-span-4">
                  <ZoneDoorCard
                    zone={ZONES[0]}
                    isActive={true}
                    isUnlocked={true}
                    zombiesKilled={zone1Kills}
                    totalZombies={3}
                    onClick={() => handleZoneClick('zone1')}
                  />
                </div>

                {/* Zone 2 */}
                <div className="col-span-6 row-span-3">
                  <ZoneDoorCard
                    zone={ZONES[1]}
                    isActive={false}
                    isUnlocked={state.zones.zone2.unlocked}
                    onClick={() => handleZoneClick('zone2')}
                  />
                </div>

                {/* Zone 3 */}
                <div className="col-span-3 row-span-3">
                  <ZoneDoorCard
                    zone={ZONES[2]}
                    isActive={false}
                    isUnlocked={state.zones.zone3.unlocked}
                    onClick={() => handleZoneClick('zone3')}
                  />
                </div>

                {/* Zone 4 */}
                <div className="col-span-3 row-span-2">
                  <ZoneDoorCard
                    zone={ZONES[3]}
                    isActive={false}
                    isUnlocked={state.zones.zone4.unlocked}
                    onClick={() => handleZoneClick('zone4')}
                  />
                </div>

                {/* Data stream row */}
                <div className="col-span-6 row-span-1 border border-[#2A3D2C]/50 flex items-center justify-between px-8 bg-[#0A1A0E]/80 backdrop-blur-md">
                  <div className="flex gap-1.5">
                    {[30, 50, 20, 80, 40, 60, 25].map((h, i) => (
                      <div key={i} className="w-1 bg-[#c8f000]" style={{ height: `${h}%`, opacity: h / 100 }} />
                    ))}
                  </div>
                  <span className="font-mono text-[10px] text-[#c8f000] tracking-[0.3em] uppercase animate-pulse">
                    Scanning Scholarly Bio-Signatures...
                  </span>
                  <span className="font-mono text-[10px] text-[#4A5E4A]">REC_STACK_7B</span>
                </div>
              </div>
            </div>

            {/* Locked zone message */}
            <AnimatePresence>
              {lockedMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#192B1C] border border-[#c8f000]/20 px-6 py-4 z-50 max-w-md"
                >
                  <p className="font-mono text-xs text-[#c8f000] text-center">{lockedMessage}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* Right Panel: Field Manual */}
          <aside className="w-[380px] bg-[#111D14] border-l border-[#2A3D2C] p-10 flex flex-col gap-10 relative flex-shrink-0">
            <div className="absolute top-0 right-0 w-full h-64 pointer-events-none opacity-20"
              style={{ background: 'radial-gradient(circle at top right, #c8f000, transparent 70%)' }} />

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-10 border-b border-[#2A3D2C] pb-6">
                <span className="material-symbols-outlined text-[#c8f000]">auto_stories</span>
                <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-[#F0EBE0]">Field Manual</h2>
              </div>

              <div className="space-y-10">
                {/* Primary Objective */}
                <section>
                  <label className="font-mono text-[10px] uppercase text-[#8AAA00] tracking-[0.25em] block mb-4">Primary Objective</label>
                  <div className="bg-[#192B1C] p-6 border-l-2 border-[#c8f000]">
                    <h4 className="font-body text-xl font-bold text-[#F0EBE0] leading-tight mb-3">
                      Expel {currentZombieInZone1} from Stack 7: The Atrium
                    </h4>
                    <p className="font-body text-[#8A9E8A] text-lg leading-relaxed">
                      A high-level entity in academic regalia has manifested. Use the Neutralization Console to disrupt its habit chain before it stabilizes.
                    </p>
                  </div>
                </section>

                {/* Entity Intel */}
                <section>
                  <label className="font-mono text-[10px] uppercase text-[#8A9E8A] tracking-[0.25em] block mb-4">Entity Intelligence</label>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-14 h-14 flex-shrink-0 bg-[#0A1A0E] border border-[#4A6B4C] overflow-hidden flex items-center justify-center">
                        <BlankSlater state="frozen" size="sm" />
                      </div>
                      <div>
                        <h5 className="font-display font-bold text-[#F0EBE0] text-base uppercase tracking-wider">{currentZombieInZone1}</h5>
                        <p className="font-body text-[#8A9E8A] italic text-sm">Class IV Scholarly Parasite</p>
                      </div>
                    </div>

                    <div className="p-5 bg-[#0A1A0E] border border-[#2A3D2C] font-body italic text-[#8A9E8A] text-base leading-relaxed">
                      "The silence between prompt and response is where the Slater thrives. It is the architect of its own frustration."
                      <span className="block mt-3 text-right font-mono text-[10px] text-[#4A5E4A] tracking-widest uppercase">— Archive Fragment 201</span>
                    </div>
                  </div>
                </section>

                {/* Threat meters */}
                <section>
                  <div className="bg-[#0A1A0E] p-6 border border-[#2A3D2C] space-y-5">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-[10px] text-[#8A9E8A] uppercase tracking-widest">Threat Level</span>
                        <span className="font-display text-sm font-bold text-[#D42B00]">CRITICAL</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#111D14]">
                        <div className="w-3/4 h-full bg-[#D42B00]" style={{ boxShadow: '0 0 10px rgba(212,43,0,0.3)' }} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-[10px] text-[#8A9E8A] uppercase tracking-widest">Kills</span>
                        <span className="font-display text-sm font-bold text-[#c8f000]">{zone1Kills}/3</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#111D14]">
                        <div className="h-full bg-[#c8f000]" style={{ width: `${(zone1Kills / 3) * 100}%`, boxShadow: '0 0 10px rgba(200,240,0,0.3)' }} />
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
}
