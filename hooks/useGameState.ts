'use client';

import { useState, useEffect, useCallback } from 'react';
import { GameState, WeaponLevel, ZombieId, SurvivorLogEntry, ZombieProgress } from '@/types';

const STORAGE_KEY = 'deadhabits_state';

const DEFAULT_ZOMBIE_PROGRESS: ZombieProgress = {
  status: 'locked',
  attempts: 0,
  killOutput: '',
};

export const DEFAULT_STATE: GameState = {
  currentScreen: 'orientation_1',
  orientationComplete: false,
  fieldAssessment: {
    output: '',
    score: 0,
    feedback: '',
    primaryZombie: '',
  },
  zones: {
    zone1: {
      unlocked: true,
      zombies: {
        blank_slater: { status: 'active', attempts: 0, killOutput: '' },
        one_and_done: { ...DEFAULT_ZOMBIE_PROGRESS },
        over_truster: { ...DEFAULT_ZOMBIE_PROGRESS },
      },
      bossStatus: 'locked',
      supplyDrop1Claimed: false,
    },
    zone2: { unlocked: false },
    zone3: { unlocked: false },
    zone4: { unlocked: false },
  },
  weaponLevel: 'bare_hands',
  survivorLog: [],
  kills: [],
};

function loadState(): GameState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as GameState;
  } catch {
    return null;
  }
}

function saveState(state: GameState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage full or unavailable
  }
}

export function useGameState() {
  const [state, setState] = useState<GameState>(DEFAULT_STATE);
  const [hasSavedState, setHasSavedState] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = loadState();
    if (saved) {
      setState(saved);
      setHasSavedState(true);
    }
    setIsLoaded(true);
  }, []);

  const updateState = useCallback((updates: Partial<GameState> | ((prev: GameState) => Partial<GameState>)) => {
    setState(prev => {
      const patch = typeof updates === 'function' ? updates(prev) : updates;
      const next = { ...prev, ...patch };
      saveState(next);
      return next;
    });
  }, []);

  const setScreen = useCallback((screen: string) => {
    updateState({ currentScreen: screen });
  }, [updateState]);

  const completeOrientation = useCallback(() => {
    updateState({ orientationComplete: true, currentScreen: 'library_map' });
  }, [updateState]);

  const saveFieldAssessment = useCallback((output: string, score: number, feedback: string, primaryZombie: string) => {
    updateState({
      fieldAssessment: { output, score, feedback, primaryZombie },
    });
  }, [updateState]);

  const recordKill = useCallback((zombieId: ZombieId, killOutput: string, weaponLevel?: WeaponLevel) => {
    setState(prev => {
      const next = { ...prev };

      // Update zombie status in zone1
      if (zombieId === 'blank_slater' || zombieId === 'one_and_done' || zombieId === 'over_truster') {
        next.zones = {
          ...prev.zones,
          zone1: {
            ...prev.zones.zone1,
            zombies: {
              ...prev.zones.zone1.zombies,
              [zombieId]: {
                ...prev.zones.zone1.zombies[zombieId],
                status: 'killed' as const,
                killOutput,
              },
            },
          },
        };

        // Unlock next zombie
        if (zombieId === 'blank_slater') {
          next.zones.zone1.zombies.one_and_done = { status: 'active', attempts: 0, killOutput: '' };
        } else if (zombieId === 'one_and_done') {
          next.zones.zone1.zombies.over_truster = { status: 'active', attempts: 0, killOutput: '' };
        } else if (zombieId === 'over_truster') {
          next.zones.zone1.bossStatus = 'active';
        }
      } else if (zombieId === 'habit_horde') {
        next.zones = {
          ...prev.zones,
          zone1: { ...prev.zones.zone1, bossStatus: 'killed' },
          zone2: { unlocked: true },
        };
      }

      if (weaponLevel) {
        next.weaponLevel = weaponLevel;
      }

      if (!prev.kills.includes(zombieId)) {
        next.kills = [...prev.kills, zombieId];
      }

      saveState(next);
      return next;
    });
  }, []);

  const addSurvivorLogEntry = useCallback((entry: SurvivorLogEntry) => {
    setState(prev => {
      const next = { ...prev, survivorLog: [...prev.survivorLog, entry] };
      saveState(next);
      return next;
    });
  }, []);

  const incrementAttempt = useCallback((zombieId: ZombieId) => {
    setState(prev => {
      if (zombieId === 'habit_horde') {
        return prev;
      }
      if (zombieId in prev.zones.zone1.zombies) {
        const next = {
          ...prev,
          zones: {
            ...prev.zones,
            zone1: {
              ...prev.zones.zone1,
              zombies: {
                ...prev.zones.zone1.zombies,
                [zombieId]: {
                  ...prev.zones.zone1.zombies[zombieId as keyof typeof prev.zones.zone1.zombies],
                  attempts: prev.zones.zone1.zombies[zombieId as keyof typeof prev.zones.zone1.zombies].attempts + 1,
                },
              },
            },
          },
        };
        saveState(next);
        return next;
      }
      return prev;
    });
  }, []);

  const resetState = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
    setState(DEFAULT_STATE);
    setHasSavedState(false);
  }, []);

  const claimSupplyDrop = useCallback(() => {
    setState(prev => {
      const next = {
        ...prev,
        zones: {
          ...prev.zones,
          zone1: { ...prev.zones.zone1, supplyDrop1Claimed: true },
        },
      };
      saveState(next);
      return next;
    });
  }, []);

  return {
    state,
    hasSavedState,
    isLoaded,
    updateState,
    setScreen,
    completeOrientation,
    saveFieldAssessment,
    recordKill,
    addSurvivorLogEntry,
    incrementAttempt,
    resetState,
    claimSupplyDrop,
  };
}
