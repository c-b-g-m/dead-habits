// DEAD HABITS — Orientation Screen Content
// Source: CONTENT.md

export const ORIENTATION = {
  o1: {
    scanLineText: [
      '> HARGROVE LIBRARY — SECTOR 7',
      '> HABIT OUTBREAK DETECTED',
      '> THREAT LEVEL: CRITICAL',
      '> COORDINATES: 41.3081° N, 72.9282° W',
    ],
    headline: 'EMERGENCY\nBROADCAST',
    liveLabel: 'LIVE TRANSMISSION // SECTOR 07-B',
    subheading: '"AI habit failures are spreading. Professors, your expertise is needed."',
    ctaPrimary: 'BEGIN RECRUITMENT',
    ctaSecondary: 'VIEW TRANSMISSION LOG',
    activeThreats: {
      title: 'Active Threats',
      subtitle: 'Neural Decay in Sector 07',
      body: 'A pattern of AI misuse has been detected across multiple disciplines. Small prompt failures are spreading into larger academic problems.',
      failureRate: '84.2%',
      location: 'Hargrove Library',
    },
    stats: {
      compromisedHabits: '12,402',
      activeProfessors: '08',
      requestAccess: 'Request Access To Log',
    },
    letter: {
      title: 'A Message from Dr. Hayes',
      body: "We have long relied on the precision of AI to assist our work. But precision without judgment is a trap. The patterns that emerged this semester revealed something uncomfortable: we delegated without context, accepted without scrutiny, and never considered what our output would touch downstream. I've seen this spread. Your expertise is needed. Enter the Terminal.",
      signature: 'Dr. Hayes',
      role: 'Associate Professor, Hargrove University',
    },
    referenceManual: {
      quote: '"The habit is the shadow of the soul. When the shadow detaches, the soul is lost."',
      ref: 'REF: TEXT_4 // PAGE 112',
    },
  },

  o2: {
    logo: 'DEAD HABITS',
    tagline: "A Zombie Slayer's Guide to AI Fluency",
    dossierHeader: 'DEPT. OF DEAD HABITS // CASE FILE 001',
    classifiedStamp: 'CLASSIFIED',
    stickyNotes: [
      'Vague prompt — no audience specified',
      'First output accepted. No review.',
      'Output entered student workflow unverified.',
    ],
    timeline: [
      {
        date: 'March 3',
        decision: 'Delegated feedback generation to Claude.',
        prompt: '"Write feedback for undergraduate sociology essays."',
        outcome: 'Five professional-looking templates returned. Adapted slightly. Sent to students.',
      },
      {
        date: 'March 24',
        decision: 'Accepted student reflection paper without review.',
        outcome: "Opening paragraph mirrors Dr. Hayes' AI-generated feedback almost exactly. Student used Claude to respond to Claude-generated feedback.",
      },
      {
        date: 'April 1',
        consequence: 'Flagged during curriculum review by a colleague.',
      },
    ],
    finalLine: "Dr. Hayes didn't cheat. She delegated without context, accepted without scrutiny, and never considered what her output would touch downstream.\n\nThe zombies in her building weren't loud. They looked like productivity.\n\nThis is how outbreaks start.",
    cta: 'SHOW ME THE DATA',
  },

  o3: {
    headline: 'THE OUTBREAK IS ALREADY HERE',
    stats: [
      {
        stat: '85.7%',
        label: 'OF CONVERSATIONS ACCEPT THE FIRST AI RESPONSE',
        zombie: 'The One-and-Done is the most common zombie on record.',
      },
      {
        stat: '14.3%',
        label: 'NEVER ITERATE OR REFINE',
        zombie: 'Nearly 1 in 6 professors hands the first output to students.',
      },
      {
        stat: '−5.2pp',
        label: 'LESS LIKELY TO CATCH MISSING CONTEXT WHEN OUTPUT LOOKS POLISHED',
        zombie: 'The Polish Believer thrives when work looks finished.',
      },
      {
        stat: '−3.7pp',
        label: 'LESS LIKELY TO FACT-CHECK AI-GENERATED DOCUMENTS',
        zombie: 'The Over-Truster grows stronger when content looks authoritative.',
      },
      {
        stat: 'Only 30%',
        label: 'SET COLLABORATION TERMS BEFORE STARTING',
        zombie: '70% of professors let the Blank Slater run the first exchange.',
      },
    ],
    source: 'Source: Anthropic AI Fluency Index, January 2026. 9,830 conversations analyzed.',
    cta: 'WHAT DO I DO ABOUT IT',
  },

  o4: {
    headline: "YOU'VE BEEN IDENTIFIED.",
    body: [
      'Your expertise is exactly what makes you vulnerable.',
      'Professors who use AI without fluency don\'t make obvious mistakes. They make sophisticated ones. They delegate without context. They accept without scrutiny. They trust polished outputs at precisely the moment they should question them.',
      'But expertise is also what makes you the most valuable person in this building.',
      'You know what good looks like. You can catch what the model gets wrong. You can steer it toward what actually matters in your discipline.',
      'You just need the right weapons.',
    ],
    secondary: 'DEAD HABITS is a four-zone mission through Hargrove Library. Each zone targets a different category of undead habit. You will encounter them, identify them, and kill them.',
    mechanics: [
      { icon: 'psychology', label: 'ZOMBIES', desc: 'Low-fluency habits living in your practice. Name them to kill them.' },
      { icon: 'sword', label: 'WEAPONS', desc: 'Chat skills that improve as you make kills. You start with bare hands.' },
      { icon: 'inventory_2', label: 'SUPPLY DROPS', desc: 'Tools unlocked after boss kills. Your prompt library lives here.' },
      { icon: 'history_edu', label: 'SURVIVOR LOG', desc: 'Your reflection record. One entry per kill. Yours to keep.' },
    ],
    badge: {
      institution: 'HARGROVE LIBRARY — ACTIVE DUTY',
      clearance: 'CLEARANCE: ENTRY LEVEL',
      weapon: 'WEAPON: BARE HANDS',
    },
    cta: 'ACCEPT FIELD ASSIGNMENT',
  },

  o5: {
    headline: 'FIELD ASSESSMENT',
    instructions: [
      'Before we can arm you, we need to know what you\'re working with.',
      'Open Claude in a new tab. Ask it to write three discussion questions for a topic you\'re teaching this semester. Use whatever prompt feels natural — no guidance, no preparation.',
      'Paste exactly what it gives you below.',
    ],
    inputPlaceholder: "Paste Claude's response here...",
    note: "Don't have Claude? Open claude.ai — it's free.",
    cta: 'EVALUATE PROMPT',
    loading: 'ANALYZING THREAT LEVEL...',
    loadingSubtext: 'Identifying active habits in your sector.',
    resultsNote: "Your output has been logged. You'll return to it in Zone 1. This is your starting point — not a grade.",
    ctaFinal: 'ENTER HARGROVE LIBRARY',
  },

  entranceHall: {
    lines: [
      'Welcome to Hargrove Library.',
      'Your first encounter awaits.',
    ],
  },
};
