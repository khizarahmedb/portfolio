# Windows 95 Portfolio (Khizar Ahmed)

This branch (`codex/windows95`) now runs a Windows95-style portfolio experience based on the upstream `wins95Portfolio` implementation, customized for Khizar Ahmed.

## What was achieved in this conversation

- Rebased this branch to the upstream Win95-style codebase structure (Vite + React) to keep behavior and UI close to the original interaction model.
- Kept the experience deploy-safe for static hosting by replacing live network dependencies with static/local behavior where needed.
- Updated personal identity/contact details to Khizar Ahmed across the experience.
- Converted project-facing content to Khizar-only work.

## UI/content changes made

- Desktop keeps all extra icons, while emphasizing five primary section icons:
  - `About`
  - `Projects`
  - `Experience`
  - `Skills`
  - `Contact`
- Projects folder now shows only Khizar projects:
  - MUNIK XVI Website
  - Invader Shop
  - Decentralized Insurance (FYP)
  - Insurance Backend API
  - QA + AppSec Thesis
- About window was expanded with deeper profile detail:
  - objective + impact snapshot
  - role history + education summary
  - core stack + specialization areas
  - direct links (LinkedIn, GitHub, CV, thesis)
- Contact window now includes always-visible quick links to LinkedIn/GitHub/CV/thesis in addition to the contact form flow.

## Static/deploy adjustments

- Removed dependence on live websocket/news/weather/wallpaper external APIs for baseline behavior.
- Resume and thesis assets are served locally from `public/reports/`.
- App runs at root path for local/dev preview.

## Run

```bash
npm install
npm run dev -- --port 3006
```

## Build

```bash
npm run build
```
