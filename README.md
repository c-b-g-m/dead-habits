# DEAD HABITS

A gamified self-study course teaching AI fluency to undergraduate professors. Players move through a fictional academic library (Hargrove Library) across four zones, confronting "zombie" archetypes that represent common AI usage anti-patterns.

**Live:** https://dead-habits.vercel.app

## Tech

- Next.js 15.5.14 (App Router, Turbopack)
- React 19
- Tailwind CSS v4
- Framer Motion 12
- Anthropic SDK (server-side scoring)

## Local Dev

```bash
npm install
cp .env.local.example .env.local  # add your ANTHROPIC_API_KEY
npm run dev
```

Open http://localhost:3000.

## Build & Deploy

```bash
npm run build
npm run start
```

Deployed via Vercel. `ANTHROPIC_API_KEY` lives in Vercel environment variables.

## Project Spec

The full build specification, design system, and content authority live one folder up at `../01_SPECIFICATIONS/` and `../02_DESIGN/`. Read those before changing game logic, copy, or visual treatment.
