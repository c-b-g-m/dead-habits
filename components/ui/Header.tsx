'use client';

import { useState } from 'react';
import { WeaponLevel } from '@/types';
import { WeaponBadge } from './WeaponBadge';

interface HeaderProps {
  screen: string;
  weaponLevel: WeaponLevel;
  survivorLogCount: number;
  onNavigate?: (screen: string) => void;
  weaponUpgrading?: boolean;
}

export function Header({ screen, weaponLevel, survivorLogCount, onNavigate, weaponUpgrading }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'ZONES', target: 'library_map' },
    { label: 'SURVIVOR LOG', target: 'survivor_log' },
    { label: 'ARCHIVES', target: 'archives' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-[#0A1A0E]/90 backdrop-blur-md border-b border-[#2A3D2C]">
        {/* Left: Wordmark */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate?.('library_map')}
            className="text-2xl font-display font-extrabold tracking-tighter text-[#c8f000] terminal-glow hover:opacity-90 transition-opacity cursor-pointer"
          >
            DEAD HABITS
          </button>
          <div className="hidden md:block h-4 w-px bg-[#2A3D2C]" />
          <span className="hidden md:block font-mono text-[10px] uppercase tracking-[0.2em] text-[#8A9E8A]">
            Hargrove Library
          </span>
        </div>

        {/* Center: Nav (desktop) */}
        <nav className="hidden lg:flex items-center gap-8 font-display uppercase tracking-widest text-xs" aria-label="Main navigation">
          {navItems.map(({ label, target }) => (
            <button
              key={target}
              onClick={() => onNavigate?.(target)}
              className={`transition-colors duration-300 ${
                screen === target
                  ? 'text-[#c8f000] border-b border-[#c8f000] pb-0.5'
                  : 'text-[#8A9E8A] hover:text-[#c8f000]'
              }`}
            >
              {label}
              {label === 'SURVIVOR LOG' && survivorLogCount > 0 && (
                <span className="ml-1 font-mono text-[9px] text-[#c8f000]/60">({survivorLogCount})</span>
              )}
            </button>
          ))}
        </nav>

        {/* Right: Status + Weapon Badge + Hamburger */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-[#132316] border border-[#454933]/20">
            <span className="font-mono text-[10px] uppercase text-[#8A9E8A]">Threat:</span>
            <span className="font-mono text-[10px] uppercase text-[#c8f000] font-bold tracking-widest">ACTIVE</span>
            <div className="w-1.5 h-1.5 bg-[#D42B00] rounded-full animate-pulse" />
          </div>
          <WeaponBadge weaponLevel={weaponLevel} upgrading={weaponUpgrading} compact />
          {/* Hamburger — mobile only */}
          <button
            className="lg:hidden p-1 text-[#F0EBE0] hover:text-[#c8f000] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </header>

      {/* Mobile nav dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed top-16 left-0 w-full z-40 bg-[#0A1A0E]/95 backdrop-blur-md border-b border-[#2A3D2C]">
          {navItems.map(({ label, target }) => (
            <button
              key={target}
              onClick={() => { onNavigate?.(target); setMobileMenuOpen(false); }}
              className={`flex items-center w-full px-6 py-4 font-display uppercase tracking-widest text-sm border-b border-[#2A3D2C]/50 transition-colors ${
                screen === target ? 'text-[#c8f000] bg-[#c8f000]/5' : 'text-[#8A9E8A] hover:text-[#c8f000] hover:bg-[#192B1C]'
              }`}
            >
              {label}
              {label === 'SURVIVOR LOG' && survivorLogCount > 0 && (
                <span className="ml-2 font-mono text-[9px] text-[#c8f000]/60">({survivorLogCount})</span>
              )}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
