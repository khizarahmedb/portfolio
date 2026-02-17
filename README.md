# Khizar Ahmed Portfolio

This is my interactive portfolio, built as a retro Windows-style desktop experience on the web.  
It presents my profile, experience, skills, projects, and contact details through draggable app windows instead of a traditional single-page layout.

## Live Site

- [https://www.khizarahmed.com](https://www.khizarahmed.com)

## What This Project Includes

- Windows-style desktop shell with icon-based navigation
- Core portfolio sections:
  - About
  - Projects
  - Experience
  - Skills
  - Contact
- Project detail windows with structured descriptions, outcomes, stack, and links
- Resume/CV access from desktop shortcuts
- MSN-style live chat window with persistent message history
- Admin console access path via Run/CMD for moderation and monitoring

## Tech Stack

- React 18
- Vite 5
- Vercel Functions (`/api/*`)
- Vercel Postgres
- JWT-based session tokens for chat/admin APIs
- `bad-words` filtering + custom blocked terms for chat message sanitization

## Local Development

```bash
npm install
npm run dev -- --port 3006
```

## Production Build

```bash
npm run build
```

## Environment Variables

For full chat/admin functionality, configure these on Vercel (and locally if needed):

- `CHAT_TOKEN_SECRET`
- `ADMIN_TOKEN_SECRET`
- `ADMIN_PASSWORD_BCRYPT_HASH` (or `ADMIN_PASSWORD_SHA256`)
- `POSTGRES_URL` (provided by Vercel Postgres integration)

Optional frontend hint for admin unlock UX:

- `VITE_ADMIN_PASSWORD_SHA256`

## Notes

- Portfolio content is intentionally focused on my own projects and experience.
- Some private/internal project resources are listed for completeness and are shared on direct request.
