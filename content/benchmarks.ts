// DEAD HABITS — Pre-written Benchmark Outputs
// Source: CONTENT.md

export const BENCHMARKS = {
  blank_slater: {
    prompt: `"I'm teaching a 300-level Environmental Humanities course. Students are writing a 1,500-word argument essay connecting one contemporary environmental policy issue to at least two texts from our course reader. They're strong writers but tend to summarize rather than argue. Create a rubric with four criteria that specifically targets argumentative thinking, not just writing quality. Each criterion should be impossible to satisfy with a summary. Score out of 20 total."`,
    output: `RUBRIC — Environmental Humanities Essay (20pts)

1. ARGUMENTATIVE CLAIM (6pts)
Advances a specific, contestable claim about the policy issue (6) / Makes an observation without taking a position (3) / Describes the topic without argument (1)

2. TEXTUAL INTEGRATION (5pts)
Uses course texts as evidence for the argument, not decoration (5) / Mentions texts without connecting to the claim (3) / Does not draw on course texts (1)

3. COUNTERARGUMENT ENGAGEMENT (5pts)
Directly addresses and responds to the strongest opposing view (5) / Acknowledges opposition without engaging (3) / Ignores counterarguments (1)

4. DISCIPLINE-SPECIFIC ANALYSIS (4pts)
Applies Environmental Humanities frameworks explicitly (4) / Uses general analytical language (2) / No disciplinary framing (1)`,
    highlightedDifferences: [
      'Role (professor designing for a specific course)',
      'Student level and characteristics (300-level, strong writers who summarize)',
      'Specific assignment parameters (1,500 words, policy + 2 texts)',
      'What good looks like stated explicitly (impossible to satisfy with a summary)',
      'What to avoid stated explicitly (not just writing quality)',
    ],
  },

  one_and_done: {
    panels: [
      {
        header: 'YOUR FIRST PROMPT',
        label: 'A',
        description: 'Your original Field Assessment output — whatever Claude gave you first.',
      },
      {
        header: 'ITERATION 1 — ADDING CONSTRAINTS',
        label: 'B',
        prompt: `"These questions are too general. I'm teaching a 200-level Introduction to Sociology course, and we just finished Goffman's dramaturgical theory. Rewrite them so students have to apply dramaturgical analysis to a specific contemporary context."`,
        output: `[Three more specific Goffman-focused questions applying dramaturgical theory to contemporary social contexts]`,
      },
      {
        header: 'ITERATION 2 — STEERING THE RESULT',
        label: 'C',
        prompt: `"Revise these again. I want questions that generate genuine disagreement — not questions with one right answer. Avoid politics. Push students toward contemporary contexts they wouldn't immediately think of."`,
        output: `1. When you post on social media, which parts of Goffman's front stage and back stage are you consciously managing — and which happen automatically? Where does the performance break down?

2. A job interview and a first date both involve impression management. What's structurally different about the performance in each — and what happens when the audience compares notes?

3. Goffman wrote before smartphones. Which of his concepts still hold, which need updating, and what new concept would he need to explain the selfie?`,
      },
    ],
    highlightedProgressions: [
      'Specificity of topic increases A→B→C',
      'Audience context added in B',
      'Constraint added (no politics) in C',
      'Cognitive demand increases (genuine disagreement, not recall)',
    ],
  },

  over_truster: {
    verificationOptions: [
      'Verified — source found and matches',
      'Partially correct — details off',
      'Cannot be verified',
      'Does not appear to exist as stated',
    ],
    revealText: {
      failed: "That's not an error. That's the Over-Truster at work. Claude produces claims that look authoritative. The framing is confident. The specificity feels real. The underlying fact may not exist, may be outdated, or may be from a context that doesn't match yours. The more finished the output looks, the less likely a professor is to check it — the Anthropic Index found this in nearly 10,000 conversations.",
      passed: "Your claims checked out this time. They won't always. The Over-Truster doesn't attack every output — it attacks the ones you don't check. The habit of verification has to be built before you need it.",
    },
  },
};
