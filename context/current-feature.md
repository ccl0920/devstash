# Current Feature

<!-- Feature name and short description -->

## Status

<!-- Not Started | In Progress | Completed -->

## Goals

<!-- Goals and requirements -->

## Notes

<!-- Any extra notes -->

## History

<!-- Keep this updated. Earliest to latest -->

### 2026-03-24 - Dashboard Phase 2 Completed
- Fixed hydration mismatch by using static dates in mock data and spreading array before sorting
- Fixed mobile menu button overlap with TopBar by adding left padding on mobile
- Implemented collapsible sidebar with PanelLeft icons
- Implemented Items/Types navigation section with dynamic links
- Implemented Favorite collections section with Star icons
- Implemented Recent collections section with Clock icons
- Implemented user avatar area at bottom of sidebar
- Mobile-responsive: drawer slides in from left on mobile view
- Build passes with no errors

### 2026-03-24 - Dashboard Phase 1 Completed
- Implemented full dashboard layout with sidebar, top bar, and main content area
- Installed ShadCN UI components (button, input, card, badge, dropdown-menu, avatar, separator, scroll-area)
- Set up dark mode as default theme
- Build passes with no errors
- Dev server running for testing at /dashboard

### 2026-03-24 - Dashboard Phase 1 Started
- Created mock data file at `src/lib/mock-data.ts` for UI development
- Pushed to main branch

### 2026-03-20 - Initial Next.js Setup
- Bootstrapped project with `create-next-app`
- Configured Next.js 16 with App Router
- Set up React 19 with React Compiler enabled
- Added TypeScript strict mode
- Configured Tailwind CSS v4
- Set up ESLint with Next.js recommended rules
- Cleaned down default template (removed SVGs, simplified CSS/page)
- Committed as "chore: initial setup"
