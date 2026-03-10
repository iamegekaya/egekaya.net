# egekaya.net

Source code for a bilingual personal website built with Next.js. The site presents profile content in English and Turkish, includes a photography gallery, and provides a contact form backed by a server-side API route.

## Overview

Current verified capabilities in this repository:

- Locale-prefixed routes for Turkish and English content
- About, photography, cybersecurity, contact, and legal pages
- A static image gallery served from `public/images/portfolio/`
- Shared metadata, navigation, and footer configuration
- A contact form that posts to `/api/contact`

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- `next-intl` for localization
- `framer-motion` for gallery and navigation animation
- `zod` and `nodemailer` for contact form handling

## Project Structure

```text
egekaya.net/
├── docs/                     # Project notes
├── public/                   # Static assets, profile image, portfolio photos
├── src/
│   ├── app/                  # App Router pages, layouts, and API routes
│   ├── components/           # Reusable UI components
│   ├── config/               # Shared site metadata and navigation config
│   ├── i18n/                 # Locale routing and message loading
│   ├── messages/             # English and Turkish content
│   └── proxy.ts              # Locale-aware request proxy/matcher
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

## Prerequisites

- Node.js
- npm

This repository does not define an `engines` field, so it does not pin an exact Node.js version. A current LTS release is the safest choice for local development.

## Installation

```bash
npm install
```

## Environment Variables

Create a local `.env.local` file for server-side email delivery.

| Variable | Purpose |
| --- | --- |
| `GMAIL_USER` | Gmail address used by the contact route as the sender and recipient mailbox |
| `GMAIL_APP_PASSWORD` | Gmail app password used by the contact route for mail authentication |

Example placeholders:

```bash
GMAIL_USER=your-address@example.com
GMAIL_APP_PASSWORD=your-app-password
```

If these variables are missing, the contact form UI can render, but the `/api/contact` request will not be able to send email successfully.

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
```

- `npm run dev` starts the local development server
- `npm run build` creates the production build
- `npm run start` serves the built application
- `npm run lint` runs ESLint
- `npm run typecheck` runs the TypeScript compiler without emitting files

There is currently no `test` script in `package.json`.

## Local Development

Start the development server:

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

The app uses locale-prefixed routing. Verified examples from `src/i18n/routing.ts` include:

- `/tr`
- `/en`
- `/tr/hakkimda`
- `/en/about`
- `/tr/iletisim`
- `/en/contact`

## Build and Start

For a local production check:

```bash
npm run build
npm run start
```

This repository exposes the standard Next.js build and start workflow. No platform-specific deployment configuration is documented here.

## Implementation Notes

- Localized content lives in `src/messages/en.json` and `src/messages/tr.json`.
- Locale handling is wired through `src/i18n/routing.ts`, `src/i18n/request.ts`, and `src/proxy.ts`.
- The contact flow is implemented in `src/components/ContactForm.tsx` and `src/app/api/contact/route.ts`.
- The contact route validates input and applies basic anti-abuse checks before sending mail.
- Public assets are stored in `public/`, including the profile image and photography gallery files.
