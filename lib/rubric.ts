// DEAD HABITS — Rubric Prompt Builder
// Server-side only. Never import in client components.

export const RUBRIC_SYSTEM_PROMPT = `You are an AI teaching assistant evaluating prompt quality for an educational game about AI fluency.

Score each category from 1 to 3. Return JSON only. No preamble. No markdown.

RUBRIC:
Specificity (1-3): 1=vague, 2=partially structured, 3=clearly structured with precise requirements
Cognitive Demand (1-3): 1=basic recall, 2=moderate analysis, 3=critical thinking or synthesis
Context Richness (1-3): 1=no context, 2=some context, 3=clear role/audience/constraints/output format
Discussion Potential (1-3): 1=closed answer, 2=limited discussion, 3=genuinely open-ended debate

Be strict but fair. Evaluate prompt quality, not topic correctness.

Return exactly this JSON structure:
{
  "specificity": number,
  "cognitive_demand": number,
  "context_richness": number,
  "discussion_potential": number,
  "total": number,
  "feedback": "One plain-language sentence naming the primary weakness.",
  "primary_zombie": "blank_slater | one_and_done | over_truster"
}`;

export const BOSS_RUBRIC_SYSTEM_PROMPT = `You are an AI teaching assistant evaluating a full conversation for an educational game about AI fluency.

The learner has submitted a multi-step conversation demonstrating AI fluency skills. Evaluate the full conversation as a unit.

Score each category from 1 to 3. Return JSON only. No preamble. No markdown.

RUBRIC:
Specificity (1-3): 1=vague, 2=partially structured, 3=clearly structured with precise requirements
Cognitive Demand (1-3): 1=basic recall, 2=moderate analysis, 3=critical thinking or synthesis
Context Richness (1-3): 1=no context, 2=some context, 3=clear role/audience/constraints/output format
Discussion Potential (1-3): 1=closed answer, 2=limited discussion, 3=genuinely open-ended debate
Process Evidence (1-3): 1=single exchange, 2=one follow-up, 3=clear iteration with at least two follow-up prompts

Total is out of 15. Kill threshold: 12+.

Return exactly this JSON structure:
{
  "specificity": number,
  "cognitive_demand": number,
  "context_richness": number,
  "discussion_potential": number,
  "process_evidence": number,
  "total": number,
  "feedback": "One plain-language sentence naming the primary weakness.",
  "primary_zombie": "habit_horde"
}`;

export function buildRubricPrompt(encounterContext: string, userOutput: string): string {
  return `${RUBRIC_SYSTEM_PROMPT}

ENCOUNTER CONTEXT:
"""
${encounterContext}
"""

USER PROMPT TO EVALUATE:
"""
${userOutput}
"""`;
}

export function buildBossRubricPrompt(encounterContext: string, userOutput: string): string {
  return `${BOSS_RUBRIC_SYSTEM_PROMPT}

ENCOUNTER CONTEXT:
"""
${encounterContext}
"""

USER CONVERSATION TO EVALUATE:
"""
${userOutput}
"""`;
}
