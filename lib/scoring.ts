// DEAD HABITS — Score → Zombie State Logic

import { ZombieState, RubricScore } from '@/types';

// Standard kill threshold: 10+/12
export const KILL_THRESHOLD = 10;
export const WALKING_THRESHOLD = 7;
// Boss kill threshold: 12+/15
export const BOSS_KILL_THRESHOLD = 12;

export function scoreToZombieState(total: number, isBoss = false): ZombieState {
  const killThreshold = isBoss ? BOSS_KILL_THRESHOLD : KILL_THRESHOLD;
  const walkThreshold = isBoss ? 9 : WALKING_THRESHOLD;

  if (total >= killThreshold) return 'frozen';
  if (total >= walkThreshold) return 'walking';
  return 'running';
}

export function getZombieStateMessage(state: ZombieState): string {
  switch (state) {
    case 'frozen':
      return 'KILL CONFIRMED';
    case 'walking':
      return "It's moving. Refine your approach.";
    case 'running':
      return "It's getting closer. Return to the Intel.";
  }
}

export function isKillConfirmed(total: number, isBoss = false): boolean {
  return total >= (isBoss ? BOSS_KILL_THRESHOLD : KILL_THRESHOLD);
}

export function shouldUnlockIntel(total: number): boolean {
  return total <= 6;
}

export function formatScore(score: RubricScore): string {
  return `${score.total}/${score.process_evidence !== undefined ? 15 : 12}`;
}

// Extend RubricScore to include optional boss field
declare module '@/types' {
  interface RubricScore {
    process_evidence?: number;
  }
}
