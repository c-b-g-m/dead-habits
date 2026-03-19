// DEAD HABITS — Zombie Definitions
// Source: CONTENT.md + MASTER_BRIEF.md

import { ZombieDefinition } from '@/types';

export const ZOMBIES: ZombieDefinition[] = [
  {
    id: 'blank_slater',
    name: 'THE BLANK SLATER',
    zone: 1,
    voiceLines: ['"Explain this."', '"Just... explain it."'],
    manifestedHabit: 'Zero-Context Proximity.',
    manifestedHabitDesc: 'Expects the void to understand the unsaid. Assumes inherent common knowledge.',
    behavioralTrigger: 'Impatience Loop.',
    behavioralTriggerDesc: 'Efficiency prioritized over clarity. The "Just do it" fallacy.',
    encounterTask: `You're designing a new assignment for your course.

Open Claude in a new tab. Ask it to create a rubric for a student essay. Use whatever prompt feels natural — no preparation.

Paste exactly what it gives you below.`,
    encounterContext: 'Learner is asking Claude to create a student essay rubric for their course.',
    autopsyType: 'comparison',
    autopsyQuestions: [
      'Mark every criterion in your rubric that required knowledge of your specific course to generate.\n○ All of them  ○ Most of them  ○ One or two  ○ None',
      'Could your rubric be used in a different department without modification?\n○ Yes, easily  ○ With minor changes  ○ No — it\'s course-specific',
      "What does your rubric not capture that you actually care about when grading?",
    ],
    intelTitle: 'Context Is Half the Prompt',
    intelContent: `Claude doesn't know what you know.

It doesn't know your course level, your discipline's conventions, your students' specific strengths and weaknesses, or what you covered last week. When you leave those out, the model fills the gap with the most statistically average version of what you asked for.

Average is the Blank Slater's weapon. It produces output that looks professional and fits nothing specifically.

Every delegation prompt needs four context elements:

**Who your students are.** Level, discipline, prior knowledge, what they're struggling with.

**What the task is actually for.** Not just what it is — what it's supposed to accomplish.

**What good looks like.** One example, a stated standard, or a quality bar.

**What to avoid.** The most common failure mode for this specific task.

When all four are present, Claude stops generating for a generic professor and starts generating for you.`,
    killCondition: 'Rebuild your rubric prompt with all four context elements explicitly included. The rubric you produce must contain at least one criterion that would be impossible to generate without knowing your specific course.',
    killTask: 'Rewrite your rubric prompt with all four context elements: who your students are, what the task is for, what good looks like, and what to avoid.\n\nPaste the improved rubric below.',
    survivorLogPrompt: "What's one piece of context about your course that you've been leaving out of your AI prompts? Write it here — it belongs in every prompt from now on.",
    weaponUnlock: 'the_prompt',
    weaponUnlockLabel: 'THE PROMPT',
  },
  {
    id: 'one_and_done',
    name: 'THE ONE-AND-DONE',
    zone: 1,
    voiceLines: ['"Good enough."', '"Looks fine to me."'],
    manifestedHabit: 'Premature Certainty.',
    manifestedHabitDesc: 'Accepts the first output as final. No iteration, no refinement.',
    behavioralTrigger: 'Completion Bias.',
    behavioralTriggerDesc: 'The relief of done overrides the discipline of better.',
    encounterTask: `You already submitted your Field Assessment. That output is in your hands.

Look at your three discussion questions. Would you use them exactly as they are?

Submit your Field Assessment output below exactly as you received it. Don't change anything. We want to see what your first instinct produced.`,
    encounterContext: "Learner submitted their original unrevised Claude output from the Field Assessment — three discussion questions with no iteration.",
    autopsyType: 'iteration_sequence',
    autopsyQuestions: [
      'How many of your questions could have been generated for any discipline, with any topic substituted in?\n○ All three  ○ Two of them  ○ One of them  ○ None',
      'What cognitive level do your questions primarily require?\n○ Recall  ○ Understanding  ○ Analysis or higher',
      'How many follow-up prompts would it take to get questions as specific as Panel C?\n○ One  ○ Two  ○ Three or more  ○ I wouldn\'t know what to ask',
    ],
    intelTitle: 'Why Iteration Is Your First Weapon',
    intelContent: `The Anthropic AI Fluency Index analyzed nearly 10,000 real AI conversations. The single strongest predictor of AI fluency wasn't the quality of the first prompt.

It was whether the person came back.

Users who iterated showed double the fluency behaviors of those who didn't. They were 5.6 times more likely to question the model's reasoning. Four times more likely to catch missing context.

The One-and-Done dies when you treat the first output as a draft — not a deliverable.

The progression you just saw in the Autopsy isn't advanced technique. It's three prompts. The first is what most people submit and stop at. The second adds context. The third steers toward quality.`,
    killCondition: "Continue your Field Assessment conversation in the same Claude tab. Don't start a new chat. Tell Claude what was generic about its first response, then specify your actual course, topic, and what kind of thinking you want students to do. Submit the output from your second or third iteration below.",
    killTask: 'Return to your Claude conversation. Iterate at least twice — tell Claude what to fix, then tell it how to improve the improvement. Paste your final output.',
    survivorLogPrompt: "Name one task in your current semester where you've been accepting the first output. What will you ask Claude next time before you move on?",
    weaponUnlock: 'the_refiner',
    weaponUnlockLabel: 'THE REFINER',
  },
  {
    id: 'over_truster',
    name: 'THE OVER-TRUSTER',
    zone: 1,
    voiceLines: ['"The AI said it."', '"That means it\'s correct."'],
    manifestedHabit: 'Blind Verification Gap.',
    manifestedHabitDesc: 'Treats AI output as fact without cross-referencing sources.',
    behavioralTrigger: 'Authority Mimicry.',
    behavioralTriggerDesc: 'Polished formatting triggers the same trust as peer-reviewed sources.',
    encounterTask: `You're preparing for a lecture.

Open Claude in a new tab. Ask it to give you three key claims or findings about a topic in your discipline — the kind of information you might reference in class or include in course materials.

Paste exactly what it gives you below.

Then: Before you submit, take two minutes to verify each claim. Search for the specific facts Claude gave you. Mark what you find.`,
    encounterContext: 'Learner asked Claude for key claims or findings in their academic discipline for potential use in course materials.',
    autopsyType: 'claims_verification',
    autopsyQuestions: [
      'For each claim Claude made, mark what you found when you checked.',
      'Overall accuracy: ○ All verified  ○ Most verified  ○ Some verified  ○ None verified',
    ],
    intelTitle: 'Know Where the Model Struggles',
    intelContent: `Claude is not equally capable across all tasks.

It performs well on synthesis, drafting, restructuring, and generating options. It struggles with precision — specific statistics, current data, niche disciplinary findings, and anything requiring genuine expertise verification.

The Over-Truster hands off precision tasks and never checks the output. The model produces something that looks authoritative. The specific claim may be wrong.

The Anthropic AI Fluency Index found that users producing polished artifacts — documents, structured content, summaries — were measurably less likely to fact-check than users doing open-ended work. The more finished it looks, the more dangerous the Over-Truster becomes.

Three questions to ask before trusting any AI claim:

**Is this verifiable?** Can I find the specific fact in a source I control?

**Is this current?** Claude's knowledge has a cutoff. Anything recent is suspect.

**Is this specialized?** The more niche the domain, the more likely the model is interpolating rather than recalling.`,
    killCondition: "Rewrite your original prompt to include a verification instruction — ask Claude to indicate its confidence level for each claim and identify where you should cross-check before using it in your course.",
    killTask: "Rebuild your prompt with an explicit verification request. Ask Claude to flag uncertain claims, note where its knowledge may be limited, and suggest where you should verify before use. Paste the improved output and Claude's self-assessment below.",
    survivorLogPrompt: "What type of AI output do you use most often that you haven't been verifying? Name it specifically.",
  },
];

export const BOSS = {
  id: 'habit_horde' as const,
  name: 'THE HABIT HORDE',
  voiceLines: ['"Context optional."', '"First answer accepted."', '"Verification unnecessary."'],
  intro: 'ALL THREE. AT ONCE.',
  body: `You've killed them separately. Now they're coordinated.

The Habit Horde is what happens in a real workflow — when you're designing a week's worth of lesson materials, moving fast, and all three bad habits activate simultaneously.

One task. All three kill conditions apply.`,
  task: `You're preparing materials for next week. Open Claude and complete this task in a single conversation:

1. Ask Claude to generate a discussion question for your next class session.
2. Read the output. Iterate at least once.
3. Ask Claude to give you two key claims relevant to the topic.
4. Verify both claims.
5. Ask Claude to draft a one-paragraph learning objective for the session.
6. Check the objective — does it contain anything discipline-specific or course-specific that you provided?

Paste your full conversation below — including your follow-up prompts, not just the final outputs.`,
  encounterContext: 'Learner is completing a multi-step AI task in a single conversation: generating a discussion question (and iterating), gathering and verifying factual claims, and drafting a learning objective with discipline-specific context.',
  killConfirmation: 'THE HABIT HORDE — ELIMINATED',
  killMessage: "Stack 7: The Atrium is clear. You didn't just kill three habits. You replaced them with three behaviors that will change how you use AI in every class you teach from here.",
  killThreshold: 12,
  maxScore: 15,
};

export function getZombieById(id: string): ZombieDefinition | undefined {
  return ZOMBIES.find(z => z.id === id);
}
