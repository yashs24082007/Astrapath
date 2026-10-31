# AstraPath. — 3D AI Student Career & Decision Consultant (Class 11 & 12)

This repository contains both:
1. **`standalone/astra_career_consultant.html`**: A zero-dependency, ready-to-deploy 3D animated web application with Three.js WebGL neural topology, interactive `tsParticles` repulse network, 3-layer purple route transition curtains, multi-parameter Indian Higher Secondary decision intake, Loan/Drop-Year ROI simulator, and live `gemini-2.5-flash` integration.
2. **Next.js 14 + Framer Motion + Python CLI Modules**:
   - `utils/variants.ts`: Exact directional `fadeIn` cubic-bezier `[0.25, 0.25, 0.25, 0.75]` helper.
   - `components/Transition.tsx`: 3-layer curtain sweep (`#2e2257`, `#3b2d71`, `#4b3792`).
   - `components/ParticlesContainer.tsx`: Exact `particlesOptions` configuration (`#e68e2e` nodes, `#f5d393` links, hover repulse).
   - `app/api/analyze/route.ts`: Server-side Next.js API route protecting your `GEMINI_API_KEY`.
   - `python_cli/decision_consultant_bot.py`: Upgraded Python CLI script with structured student parameters.

## Quick Deployment
- **Option A (Instant Static Hosting on Netlify / Vercel / GitHub Pages)**: Upload `standalone/astra_career_consultant.html` (renamed to `index.html`).
- **Option B (Next.js Server-Side Deployment)**:
  1. Copy `.env.example` to `.env.local` and set `GEMINI_API_KEY`.
  2. Run `npm install && npm run dev`.
