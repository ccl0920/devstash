# DevStash

## Context Files

Read the following to get the full context of  the project:

- @context/project-overview.md
- @context/coding-standards
- @context/ai-interaction.md
- @context/current-feature.md

## Project Overview

DevStash is a Next.js web application built with React 19 and TypeScript. It is a minimal starter project bootstrapped with `create-next-app`, cleaned down to a simple foundation. The project uses:

- **Next.js 16** (App Router)
- **React 19** with React Compiler enabled
- **TypeScript** for type safety
- **Tailwind CSS v4** for styling
- **ESLint** for linting

## Project Structure

```
devstash/
├── src/
│   └── app/
│       ├── globals.css    # Global styles (currently empty)
│       ├── layout.tsx     # Root layout with Geist fonts
│       └── page.tsx       # Home page (displays "Devstash" h1)
├── public/                # Static assets
├── next.config.ts         # Next.js configuration
├── tsconfig.json          # TypeScript configuration
├── eslint.config.mjs      # ESLint configuration
└── package.json           # Dependencies and scripts
```

## Building and Running

### Development

```bash
npm run dev
```

Starts the development server at [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

## Development Conventions

- **Strict TypeScript**: The `tsconfig.json` enables strict mode for type safety.
- **Path Aliases**: Use `@/` to import from `src/` (e.g., `import x from "@/components/x"`).
- **React Compiler**: Enabled in `next.config.ts` for automatic memoization.
- **Tailwind CSS v4**: Uses the new `@import "tailwindcss"` syntax and inline theme configuration.
- **ESLint**: Configured with Next.js recommended rules and TypeScript support.

## Key Configuration

- **Geist Fonts**: The root layout loads Geist Sans and Geist Mono from Google Fonts.
- **App Router**: Uses the Next.js App Router (`src/app` directory structure).
- **Empty globals.css**: Default styles have been removed for a clean slate.
