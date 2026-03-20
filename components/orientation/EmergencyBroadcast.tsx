'use client';

import { ScanLine } from '@/components/ui/ScanLine';
import { Button } from '@/components/ui/Button';
import { ORIENTATION } from '@/content/orientation';

interface EmergencyBroadcastProps {
  onNext: () => void;
}

export function EmergencyBroadcast({ onNext }: EmergencyBroadcastProps) {
  const { o1 } = ORIENTATION;

  return (
    <div className="relative min-h-screen bg-[#0A1A0E] overflow-x-hidden">
      <ScanLine />

      {/* Background lamp orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,200,100,0.04) 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(200,240,0,0.04) 0%, transparent 70%)' }} />
      </div>

      {/* Fixed Header */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-[#0A1A0E]/90 backdrop-blur-md border-b border-[#2A3D2C]">
        <div className="flex items-center gap-8">
          <span className="text-2xl font-display font-extrabold tracking-tighter text-[#c8f000] terminal-glow">DEAD HABITS</span>
          <nav className="hidden md:flex gap-6 items-center">
            <span className="text-[#c8f000] border-b-2 border-[#c8f000] pb-1 font-display font-bold uppercase tracking-widest text-sm">EMERGENCY</span>
            <span className="text-[#8A9E8A] font-display font-bold uppercase tracking-widest text-sm">Sectors</span>
            <span className="text-[#8A9E8A] font-display font-bold uppercase tracking-widest text-sm">Protocols</span>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 px-3 py-1 bg-[#111D14] border border-[#2A3D2C]">
            <span className="font-mono text-[10px] uppercase text-[#8A9E8A]">Status:</span>
            <span className="font-mono text-xs text-[#D42B00] font-bold">OUTBREAK</span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#D42B00] animate-pulse" />
          </div>
        </div>
      </header>

      <div className="flex min-h-screen pt-16">
        {/* Sidebar — hidden on mobile */}
        <aside className="hidden lg:flex fixed left-0 top-0 h-full flex-col py-8 z-40 bg-[#111D14] w-[280px] border-r border-[#2A3D2C]">
          <div className="px-6 mb-12 mt-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#192B1C] flex items-center justify-center border border-[#c8f000]/20">
                <span className="material-symbols-outlined text-[#c8f000]">local_library</span>
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-[#F0EBE0] leading-tight uppercase">Library Map</h3>
                <p className="font-mono text-[10px] uppercase text-[#8A9E8A] tracking-tighter">Hargrove Library</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 px-3 space-y-1">
            {[
              { icon: 'map', label: 'Zones', active: true },
              { icon: 'history_edu', label: 'Survivor Log', active: false },
              { icon: 'menu_book', label: 'Archives', active: false },
              { icon: 'auto_stories', label: 'Field Manual', active: false },
            ].map(({ icon, label, active }) => (
              <div key={label}
                className={`flex items-center gap-3 px-4 py-3 transition-all ${active ? 'bg-[#c8f000]/10 text-[#c8f000] border-r-2 border-[#c8f000]' : 'text-[#8A9E8A]'}`}>
                <span className="material-symbols-outlined text-lg">{icon}</span>
                <span className="font-display font-bold text-sm uppercase tracking-widest">{label}</span>
              </div>
            ))}
          </nav>

          <div className="px-6 py-4">
            <button className="w-full py-3 bg-[#c8f000] text-[#2a3400] font-display font-bold uppercase tracking-widest text-xs hover:brightness-110 active:scale-95 transition-all">
              Enter Terminal
            </button>
          </div>

          <footer className="px-3 pb-8 space-y-1">
            <div className="flex items-center gap-3 px-4 py-2 text-[#4A5E4A]">
              <span className="material-symbols-outlined text-lg">settings</span>
              <span className="font-mono text-[10px] uppercase tracking-tight">Settings</span>
            </div>
          </footer>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-[280px] relative overflow-hidden">
          <div className="relative z-10 p-4 sm:p-8 lg:p-16 max-w-[900px]">

            {/* Hero Section */}
            <div className="mb-12 lg:mb-24 mt-4 lg:mt-12">
              {/* Live label */}
              <div className="inline-flex items-center gap-3 mb-6 bg-[#0A1A0E]/80 backdrop-blur-sm px-3 py-1.5 border border-[#c8f000]/20">
                <div className="w-2 h-2 rounded-full bg-[#c8f000] animate-pulse" />
                <span className="font-mono text-[10px] tracking-widest text-[#c8f000] uppercase">{o1.liveLabel}</span>
              </div>

              {/* Main headline */}
              <h1 className="font-display font-extrabold uppercase leading-[0.9] text-[#c8f000] mb-8 terminal-glow tracking-tighter"
                style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}>
                EMERGENCY<br />BROADCAST
              </h1>

              {/* Subheading */}
              <p className="text-3xl font-body italic text-[#F0EBE0] leading-relaxed max-w-2xl mb-12">
                {o1.subheading}
              </p>

              {/* CTAs */}
              <div className="flex items-center gap-8 flex-wrap">
                <Button variant="primary" onClick={onNext} className="text-base px-10 py-5">
                  {o1.ctaPrimary}
                </Button>
                <button className="flex items-center gap-2 text-[#c8f000] font-mono text-sm uppercase tracking-widest hover:underline underline-offset-8">
                  <span className="material-symbols-outlined">play_circle</span>
                  {o1.ctaSecondary}
                </button>
              </div>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-12 gap-6 pb-24">
              {/* Active Threats card */}
              <div className="col-span-12 md:col-span-7 bg-[#111D14] border border-[#2A3D2C] p-8 relative overflow-hidden">
                <div className="absolute -top-1/4 -right-1/4 w-96 h-96 rounded-full pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(255,200,100,0.04) 0%, transparent 70%)' }} />
                <h4 className="font-display font-bold text-sm uppercase text-[#c8f000] mb-4 tracking-widest relative z-10">
                  {o1.activeThreats.title}
                </h4>
                <h2 className="text-3xl font-body font-semibold italic text-[#F0EBE0] mb-6 relative z-10">
                  {o1.activeThreats.subtitle}
                </h2>
                <p className="text-[#8A9E8A] font-body text-lg leading-relaxed mb-8 relative z-10">
                  {o1.activeThreats.body}
                </p>
                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between py-2">
                    <span className="font-mono text-xs text-[#4A5E4A] uppercase">Failure Rate</span>
                    <span className="font-mono text-xs text-[#c8f000]">{o1.activeThreats.failureRate}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="font-mono text-xs text-[#4A5E4A] uppercase">Location</span>
                    <span className="font-mono text-xs text-[#F0EBE0]">{o1.activeThreats.location}</span>
                  </div>
                </div>
              </div>

              {/* Visual feed */}
              <div className="col-span-12 md:col-span-5 bg-[#0A1A0E] border border-[#2A3D2C] relative overflow-hidden min-h-[280px]">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A0E] via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <span className="material-symbols-outlined" style={{ fontSize: '120px', color: '#c8f000' }}>school</span>
                </div>
                <div className="absolute bottom-0 left-0 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-[#D42B00] animate-pulse" />
                    <span className="font-mono text-[10px] uppercase tracking-tighter text-[#D42B00]">Cam_01_Library_North</span>
                  </div>
                  <h3 className="font-display font-bold text-xl uppercase text-[#c8f000]">Observation Deck</h3>
                </div>
              </div>

              {/* Stat 1 */}
              <div className="col-span-12 md:col-span-4 bg-[#111D14] p-8 border border-[#2A3D2C] relative overflow-hidden">
                <span className="material-symbols-outlined text-[#c8f000] mb-4 block">monitoring</span>
                <div className="text-5xl font-display font-extrabold text-[#c8f000] mb-2">{o1.stats.compromisedHabits}</div>
                <div className="font-mono text-xs uppercase text-[#8A9E8A] tracking-widest">Compromised Habits</div>
              </div>

              {/* Stat 2 */}
              <div className="col-span-12 md:col-span-4 bg-[#111D14] p-8 border border-[#2A3D2C] relative overflow-hidden">
                <span className="material-symbols-outlined text-[#c8f000] mb-4 block">psychology</span>
                <div className="text-5xl font-display font-extrabold text-[#c8f000] mb-2">{o1.stats.activeProfessors}</div>
                <div className="font-mono text-xs uppercase text-[#8A9E8A] tracking-widest">Active Professors</div>
              </div>

              {/* Request Access CTA */}
              <div className="col-span-12 md:col-span-4 bg-[#c8f000] p-8 relative cursor-pointer hover:brightness-110 transition-all">
                <span className="material-symbols-outlined text-[#2a3400] mb-4 block">emergency_share</span>
                <div className="text-2xl font-display font-bold text-[#2a3400] leading-tight uppercase">{o1.stats.requestAccess}</div>
                <p className="text-[#2a3400]/60 text-[10px] mt-4 font-mono font-bold tracking-widest">SECURE CONNECTION REQUIRED</p>
              </div>
            </div>

            {/* Letter and Reference */}
            <div className="pt-16 flex flex-col md:flex-row gap-16">
              {/* Dr. Hayes letter — parchment */}
              <div className="flex-1 bg-[#F5F0E8] p-6 lg:p-12 relative overflow-hidden shadow-2xl">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
                  <span className="material-symbols-outlined text-[#2A1F0A]" style={{ fontSize: '300px' }}>school</span>
                </div>
                <h3 className="text-3xl font-body italic mb-8 border-b border-[#2A1F0A]/10 pb-4 text-[#2A1F0A] relative z-10">
                  {o1.letter.title}
                </h3>
                <div className="relative z-10">
                  <p className="font-body text-xl leading-relaxed text-[#2A1F0A] mb-6">
                    {o1.letter.body}
                  </p>
                </div>
                <div className="flex justify-end mt-12 text-right relative z-10">
                  <div>
                    <div className="font-body italic text-lg text-[#2A1F0A]">{o1.letter.signature}</div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-[#2A1F0A]/60">{o1.letter.role}</div>
                  </div>
                </div>
              </div>

              {/* Reference Manual */}
              <div className="w-full md:w-64 shrink-0">
                <div className="p-6 bg-[#192B1C] border-l-2 border-[#c8f000] space-y-4 relative overflow-hidden h-full">
                  <h4 className="font-display font-bold text-sm uppercase text-[#c8f000] tracking-widest">Reference Manual</h4>
                  <p className="text-sm italic text-[#8A9E8A] font-body leading-relaxed">
                    {o1.referenceManual.quote}
                  </p>
                  <div className="text-[10px] font-mono text-[#4A5E4A] uppercase tracking-widest mt-auto">
                    {o1.referenceManual.ref}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
