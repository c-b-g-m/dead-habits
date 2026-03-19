// DEAD HABITS — Game Data (Weapons, Zones, Locked Messages)
// Source: MASTER_BRIEF.md + CONTENT.md

import { WeaponInfo, ZoneDefinition, WeaponLevel } from '@/types';

export const WEAPONS: Record<WeaponLevel, WeaponInfo> = {
  bare_hands: {
    id: 'bare_hands',
    label: 'BARE HANDS',
    clearance: 'ENTRY LEVEL',
    description: 'Starting state. No skills yet.',
  },
  the_prompt: {
    id: 'the_prompt',
    label: 'THE PROMPT',
    clearance: 'LEVEL 1',
    description: 'Context is half the prompt. You know the four elements.',
  },
  the_refiner: {
    id: 'the_refiner',
    label: 'THE REFINER',
    clearance: 'LEVEL 2',
    description: 'Iteration is your weapon. The first output is never the last.',
  },
  the_framer: {
    id: 'the_framer',
    label: 'THE FRAMER',
    clearance: 'LEVEL 3',
    description: 'Zone 2 unlock. (Future)',
  },
  the_skeptic: {
    id: 'the_skeptic',
    label: 'THE SKEPTIC',
    clearance: 'LEVEL 4',
    description: 'Zone 3 unlock. (Future)',
  },
  the_architect: {
    id: 'the_architect',
    label: 'THE ARCHITECT',
    clearance: 'LEVEL 5',
    description: 'Zone 3 completion. (Future)',
  },
};

export const ZONES: ZoneDefinition[] = [
  {
    id: 'zone1',
    name: 'Stack 7: The Atrium',
    skill: 'Delegation',
    locCoords: 'LOC: STACK_07_B // GRID_45.92',
    status: 'active',
    clearanceLevel: 'CLEARANCE: ENTRY',
    zombieNames: ['The Blank Slater', 'The One-and-Done', 'The Over-Truster'],
  },
  {
    id: 'zone2',
    name: 'The Archives Annex',
    skill: 'Description',
    locCoords: 'LOC: ANNEX_01 // COORD: 48.11',
    status: 'locked',
    clearanceLevel: 'CLEARANCE: LEVEL 2',
    zombieNames: ['The Rambling Lecturer'],
    lockedMessage: 'The Rambling Lecturer has been detected in The Archives Annex. Clear Stack 7: The Atrium to access.',
  },
  {
    id: 'zone3',
    name: 'Periodical Pit',
    skill: 'Discernment',
    locCoords: 'LOC: PIT_03 // COORD: 52.44',
    status: 'locked',
    clearanceLevel: 'CLEARANCE: LEVEL 3',
    zombieNames: ['The Citation Phantom'],
    lockedMessage: 'The Citation Phantom is confirmed in Periodical Pit. Clear The Archives Annex to access.',
  },
  {
    id: 'zone4',
    name: 'Void Corridor',
    skill: 'Diligence',
    locCoords: 'LOC: VOID_04 // COORD: 58.09',
    status: 'locked',
    clearanceLevel: 'CLEARANCE: FULL ACCESS',
    zombieNames: ['The Workflow Wraith'],
    lockedMessage: 'The Workflow Wraith holds Void Corridor. Clear Periodical Pit to access.',
  },
];

export const ZONE1_INTRO = {
  header: 'ZONE 1: STACK 7: THE ATRIUM',
  body: "Delegation is the first skill of AI fluency. It's the decision of when to hand a task to AI, what to hand it, and how to structure the handoff.\n\nThree zombies control Stack 7: The Atrium. They've been here since the first time someone typed a prompt without thinking about what they actually needed.\n\nYou already met one of them in your Field Assessment.",
  weaponDisplay: 'CURRENT WEAPON: BARE HANDS',
};

export const SUPPLY_DROP_1 = {
  header: 'SUPPLY DROP ACQUIRED',
  cards: [
    {
      title: 'PROMPT LIBRARY STARTER KIT',
      body: 'Your kill outputs from Zone 1 are the beginning of a personal prompt library. Here\'s the structure to keep building it.',
    },
    {
      title: 'GITHUB REPO TEMPLATE',
      body: 'A pre-built repository with folders for each zone, a Survivor Log, and all four supply drops (2-4 locked until earned). Fork it in one click.',
      cta: 'FORK THE REPO',
      repoUrl: 'https://github.com/dead-habits/dead-habits-prompt-library',
    },
    {
      title: 'THE ARCHIVES ANNEX AWAITS',
      body: 'Zone 2: Description is now visible. The Rambling Lecturer has been spotted.',
    },
  ],
  dismiss: 'THE ARCHIVES ANNEX AWAITS →',
};

export const RETURN_STATE = {
  header: 'WELCOME BACK TO HARGROVE LIBRARY',
  sub: 'The outbreak is still active.',
  continueCta: 'CONTINUE MISSION',
  restartCta: 'START OVER',
  restartConfirm: 'This will erase your progress. Are you sure?',
};

export const MICRO_COPY = {
  killConfirmed: 'KILL CONFIRMED',
  walking: "It's moving. Refine your approach.",
  running: "It's getting closer. Return to the Intel.",
  improved: 'The prompt improved.',
  weaponUnlock: 'New weapon acquired. You are no longer fighting with your bare hands.',
  supplyDrop: 'Supply Drop acquired. Build your cache.',
};

export const HEADER_NAV = ['ZONES', 'SURVIVOR LOG', 'ARCHIVES'];

export const LOADING_STATES = {
  fieldAssessment: {
    primary: 'ANALYZING THREAT LEVEL...',
    secondary: 'Identifying active habits in your sector.',
  },
  zombieKill: {
    primary: 'TESTING THE HIT...',
    criteria: ['Specificity...', 'Cognitive Demand...', 'Context Richness...', 'Discussion Potential...'],
  },
  boss: {
    primary: "THIS ONE'S STRONG. RUNNING FULL THREAT ASSESSMENT.",
    secondary: 'All three habit vectors active...',
  },
};
