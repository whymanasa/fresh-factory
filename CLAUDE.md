# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

No test runner is configured yet.

## Architecture

This is a Next.js 16 app using the **App Router** (`src/app/`). All routes are server components by default; add `"use client"` at the top of a file to opt into client-side rendering.

**Key conventions:**
- Path alias `@/*` maps to `src/*`
- Styling via Tailwind CSS v4 — use `@import "tailwindcss"` in CSS files, not the old `@tailwind` directives
- Fonts loaded via `next/font/google` in the root layout; CSS variables `--font-geist-sans` and `--font-geist-mono` are available globally

**Stack:** Next.js 16.2, React 19, TypeScript 5 (strict), Tailwind CSS 4, ESLint 9 (flat config)
