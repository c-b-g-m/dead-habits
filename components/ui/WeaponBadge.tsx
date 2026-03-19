'use client';

import { WeaponLevel } from '@/types';
import { WEAPONS } from '@/content/gameData';

interface WeaponBadgeProps {
  weaponLevel: WeaponLevel;
  upgrading?: boolean;
  compact?: boolean;
}

export function WeaponBadge({ weaponLevel, upgrading = false, compact = false }: WeaponBadgeProps) {
  const weapon = WEAPONS[weaponLevel];

  if (compact) {
    return (
      <div
        className={`inline-flex items-center gap-2 px-3 py-1 border border-[#8AAA00] bg-[#192B1C] ${upgrading ? 'animate-[badgePulse_600ms_ease-out]' : ''}`}
      >
        <span className="font-mono text-[9px] text-[#8A9E8A] uppercase tracking-wider">Weapon</span>
        <span className="font-display font-bold text-xs text-[#c8f000] uppercase">{weapon.label}</span>
      </div>
    );
  }

  return (
    <div
      className={`inline-flex flex-col px-3 py-2 border border-[#8AAA00] bg-[#192B1C] min-w-[160px] ${upgrading ? 'animate-[badgePulse_600ms_ease-out]' : ''}`}
      aria-label={`Current weapon: ${weapon.label}, Clearance: ${weapon.clearance}`}
    >
      <span className="font-mono text-[9px] text-[#8A9E8A] uppercase tracking-widest">Clearance</span>
      <span className="font-display font-bold text-xs text-[#c8f000] uppercase">{weapon.clearance}</span>
      <span className="font-mono text-[10px] text-[#F0EBE0] uppercase mt-0.5">{weapon.label}</span>
    </div>
  );
}
