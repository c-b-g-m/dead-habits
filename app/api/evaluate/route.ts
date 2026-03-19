import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { buildRubricPrompt, buildBossRubricPrompt } from '@/lib/rubric';
import { EvalRequest } from '@/types';

// Server-side only. Never expose ANTHROPIC_API_KEY to client.
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body: EvalRequest = await request.json();
    const { type, zombieId, encounterContext, output } = body;

    if (!encounterContext || !output) {
      return NextResponse.json(
        { error: 'Missing encounterContext or output' },
        { status: 400 }
      );
    }

    const isBoss = zombieId === 'habit_horde';
    const prompt = isBoss
      ? buildBossRubricPrompt(encounterContext, output)
      : buildRubricPrompt(encounterContext, output);

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 256,
      temperature: 0,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const responseText = message.content[0].type === 'text' ? message.content[0].text : '';

    // Strip markdown code fences if present
    const cleanedText = responseText
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/, '')
      .trim();

    let rubricResult;
    try {
      rubricResult = JSON.parse(cleanedText);
    } catch {
      return NextResponse.json(
        { error: 'Failed to parse rubric response', raw: responseText },
        { status: 500 }
      );
    }

    // Validate required fields
    const required = ['specificity', 'cognitive_demand', 'context_richness', 'discussion_potential', 'total', 'feedback'];
    for (const field of required) {
      if (rubricResult[field] === undefined) {
        return NextResponse.json(
          { error: `Missing field: ${field}`, raw: rubricResult },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(rubricResult);
  } catch (error) {
    console.error('Evaluation API error:', error);
    return NextResponse.json(
      { error: 'Evaluation failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
