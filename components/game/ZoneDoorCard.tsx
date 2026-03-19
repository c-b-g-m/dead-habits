'use client';

import { motion } from 'framer-motion';
import { ZoneDefinition } from '@/types';
import { clsx } from 'clsx';

interface ZoneDoorCardProps {
  zone: ZoneDefinition;
  isActive: boolean;
  isUnlocked: boolean;
  zombiesKilled?: number;
  totalZombies?: number;
  onClick: () => void;
}

export function ZoneDoorCard({ zone, isActive, isUnlocked, zombiesKilled = 0, totalZombies = 3, onClick }: ZoneDoorCardProps) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        'relative overflow-hidden p-8 transition-all duration-300 cursor-pointer',
        isActive
          ? 'bg-[#192B1C]/40 border border-[#c8f000]/30 hover:border-[#c8f000]'
          : 'bg-[#111D14]/60 border border-[#2A3D2C] hover:border-[#4A6B4C]',
        !isUnlocked && 'opacity-60 grayscale hover:grayscale-0 hover:opacity-70'
      )}
    >
      {/* Acid orb */}
      {isActive && (
        <div className="absolute -top-10 -left-10 w-[300px] h-[300px] pointer-events-none z-0"
          style={{ background: 'radial-gradient(circle, rgba(200,240,0,0.07) 0%, transparent 70%)' }} />
      )}

      <div className="relative z-10 flex flex-col h-full">
        {/* Top row */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="font-mono text-[10px] text-[#8AAA00] mb-1 block tracking-tighter">{zone.locCoords}</span>
            <h2 className={clsx(
              'font-display font-bold tracking-wide uppercase',
              isActive ? 'text-[#c8f000] text-2xl' : 'text-[#F0EBE0] text-xl'
            )}>
              {zone.name}
            </h2>
          </div>
          <span className="material-symbols-outlined text-[#c8f000]/60">
            {isActive ? 'my_location' : isUnlocked ? 'lock_open' : 'lock_outline'}
          </span>
        </div>

        {/* Skill */}
        <p className="font-mono text-[10px] text-[#8A9E8A] uppercase tracking-widest mb-3">{zone.skill}</p>

        {/* Status badge */}
        <div className="mt-auto space-y-3">
          {isActive ? (
            <>
              <div className="inline-block px-3 py-1 bg-[#c8f000]/10 border border-[#c8f000]/20 font-mono text-[10px] text-[#c8f000] uppercase tracking-widest font-bold mb-3">
                Status: ACTIVE ENCOUNTER
              </div>

              {/* Progress */}
              {totalZombies > 0 && (
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalZombies }).map((_, i) => (
                    <div key={i} className={`w-6 h-1.5 ${i < zombiesKilled ? 'bg-[#00E87A]' : 'bg-[#2A3D2C]'}`} />
                  ))}
                  <span className="font-mono text-[9px] text-[#8A9E8A]">{zombiesKilled}/{totalZombies} eliminated</span>
                </div>
              )}

              {/* Scanning animation */}
              <motion.div
                className="relative h-px bg-[#c8f000]/20 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  className="absolute h-full bg-[#c8f000]"
                  style={{ width: '30%' }}
                  animate={{ x: ['-100%', '400%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                />
              </motion.div>
            </>
          ) : isUnlocked ? (
            <div className="inline-block px-3 py-1 bg-[#00E87A]/10 border border-[#00E87A]/20 font-mono text-[10px] text-[#00E87A] uppercase tracking-widest font-bold">
              Status: CLEARED
            </div>
          ) : (
            <p className="font-body italic text-[#4A5E4A] text-lg">Awaiting clearance sequence...</p>
          )}

          {/* Zombie names (locked zones) */}
          {!isUnlocked && zone.zombieNames && (
            <p className="font-mono text-[9px] text-[#4A5E4A] uppercase tracking-widest">
              {zone.zombieNames.join(' // ')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
