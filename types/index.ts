// DEAD HABITS — TypeScript Types

export type ZombieState = 'frozen' | 'walking' | 'running';
export type ZombieStatus = 'locked' | 'active' | 'killed';
export type WeaponLevel = 'bare_hands' | 'the_prompt' | 'the_refiner' | 'the_framer' | 'the_skeptic' | 'the_architect';
export type ZombieId = 'blank_slater' | 'one_and_done' | 'over_truster' | 'habit_horde';
export type EncounterBeat = 'encounter' | 'autopsy' | 'intel' | 'kill' | 'survivor_log';
export type AutopsyType = 'comparison' | 'claims_verification' | 'iteration_sequence';
export type EvalType = 'field_assessment' | 'zombie_kill';

export interface RubricScore {
  specificity: number;
  cognitive_demand: number;
  context_richness: number;
  discussion_potential: number;
  total: number;
  feedback: string;
  primary_zombie: string;
}

export interface FieldAssessmentState {
  output: string;
  score: number;
  feedback: string;
  primaryZombie: string;
}

export interface ZombieProgress {
  status: ZombieStatus;
  attempts: number;
  killOutput: string;
  lastScore?: number;
  lastFeedback?: string;
}

export interface Zone1State {
  unlocked: boolean;
  zombies: {
    blank_slater: ZombieProgress;
    one_and_done: ZombieProgress;
    over_truster: ZombieProgress;
  };
  bossStatus: ZombieStatus;
  supplyDrop1Claimed: boolean;
}

export interface ZoneLockedState {
  unlocked: boolean;
}

export interface SurvivorLogEntry {
  zombieId: ZombieId;
  zombieName: string;
  reflection: string;
  timestamp: number;
  weaponEarned?: string;
}

export interface GameState {
  currentScreen: string;
  orientationComplete: boolean;
  fieldAssessment: FieldAssessmentState;
  zones: {
    zone1: Zone1State;
    zone2: ZoneLockedState;
    zone3: ZoneLockedState;
    zone4: ZoneLockedState;
  };
  weaponLevel: WeaponLevel;
  survivorLog: SurvivorLogEntry[];
  kills: ZombieId[];
}

export interface EvalRequest {
  type: EvalType;
  zombieId?: ZombieId;
  encounterContext: string;
  output: string;
}

export interface WeaponInfo {
  id: WeaponLevel;
  label: string;
  clearance: string;
  description: string;
}

export interface ZoneDefinition {
  id: string;
  name: string;
  skill: string;
  locCoords: string;
  status: 'active' | 'locked';
  clearanceLevel: string;
  zombieNames: string[];
  lockedMessage?: string;
}

export interface ZombieDefinition {
  id: ZombieId;
  name: string;
  zone: number;
  voiceLines: string[];
  encounterTask: string;
  encounterContext: string;
  autopsyType: AutopsyType;
  autopsyQuestions: string[];
  intelTitle: string;
  intelContent: string;
  killCondition: string;
  killTask: string;
  survivorLogPrompt: string;
  weaponUnlock?: WeaponLevel;
  weaponUnlockLabel?: string;
  manifestedHabit: string;
  manifestedHabitDesc: string;
  behavioralTrigger: string;
  behavioralTriggerDesc: string;
}
