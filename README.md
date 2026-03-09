# egekaya.net

## Overview

This repository contains the source code for **egekaya.net**, a personal website built with **Next.js** using the **App Router**.

Based on the current codebase, the site includes:

- A localized homepage
- About, photography, cybersecurity, and contact pages
- Privacy Policy, Cookie Policy, and Terms of Use pages
- A photography gallery powered by static image assets
- A contact form backed by a server-side API route

The application is structured under `src/` and uses locale-prefixed routes managed by `next-intl`.

## Features

- Built with the Next.js App Router
- TypeScript-based codebase
- English and Turkish localization with locale-specific pathnames
- Shared site configuration for navigation and footer links
- Static photography gallery using `next/image`
- Contact form with request validation and email delivery via a Next.js route handler
- Global metadata configuration for title, description, Open Graph, Twitter card, and favicon

## Tech Stack

- **Framework:** Next.js `16`
- **UI:** React `19`
- **Language:** TypeScript `5`
- **Styling:** Tailwind CSS `4`, `@tailwindcss/typography`
- **Internationalization:** `next-intl`
- **Animation:** `framer-motion`
- **Icons:** `lucide-react`
- **Validation:** `zod`
- **Email:** `nodemailer`

## Project Structure

```text
egekaya.net/
├── public/
│   ├── images/portfolio/
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── pp.jpg
│   ├── vercel.svg
│   └── window.svg
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── contact/
│   │   │       └── route.ts
│   │   ├── [locale]/
│   │   │   ├── about/page.tsx
│   │   │   ├── contact/page.tsx
│   │   │   ├── cookie-policy/page.tsx
│   │   │   ├── cybersecurity/page.tsx
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── photography/page.tsx
│   │   │   ├── privacy-policy/page.tsx
│   │   │   └── terms-of-use/page.tsx
│   │   ├── favicon.ico
│   │   └── globals.css
│   ├── components/
│   ├── config/
│   │   └── site.ts
│   ├── i18n/
│   │   ├── request.ts
│   │   └── routing.ts
│   ├── messages/
│   │   ├── en.json
│   │   └── tr.json
│   └── middleware.ts
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js
- npm

`Verify before publishing:` the repository does not define an `engines` field in `package.json`, so the minimum supported Node.js version is not explicitly pinned.

### Installation

```bash
npm install
```

### Environment Variables

The contact API route in `src/app/api/contact/route.ts` reads the following server-side environment variables.

Create a local `.env.local` file with:

```bash
GMAIL_USER=your-address@gmail.com
GMAIL_APP_PASSWORD=your-app-password
```

`TODO:` add a committed `.env.example` or `.env.local.example` file before publishing publicly.

If you do not want to enable email sending locally, verify the contact form behavior before testing the `/api/contact` route.

### Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

Script details:

- `npm run dev` starts the development server
- `npm run build` creates the production build
- `npm run start` runs the production server
- `npm run lint` runs ESLint

## Development

Start the local development server:

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

The project uses locale-prefixed routing. Based on `src/i18n/routing.ts`, examples include:

- `/en`
- `/tr`
- `/en/about`
- `/tr/hakkimda`
- `/en/contact`
- `/tr/iletisim`

## Production Build

Build and serve the application locally:

```bash
npm run build
npm run start
```

This repository includes the standard Next.js production flow, but it does not document a specific hosting platform.

## Deployment Notes

- A standard Next.js `build` and `start` workflow is present.
- The contact form depends on server-side environment variables being available in the deployment environment.
- `Verify before publishing:` the repository does not document a deployment target, infrastructure, or hosting provider.
- `Verify before publishing:` the contact API route uses `nodemailer`, so confirm that your target runtime supports the required Node.js server environment.

## Internationalization / Content Structure

Internationalization is implemented with `next-intl`.

Relevant files:

- `src/i18n/routing.ts` defines the locales and localized pathnames
- `src/i18n/request.ts` loads locale message files
- `src/middleware.ts` enables locale-aware routing
- `src/messages/en.json` stores English content
- `src/messages/tr.json` stores Turkish content

Current verified locale setup:

- Locales: `en`, `tr`
- Default locale: `tr`
- Locale prefix mode: `always`

## Contact Form / API Notes

The contact flow is split between UI components and an API route:

- UI page: `src/app/[locale]/contact/page.tsx`
- Form component: `src/components/ContactForm.tsx`
- API route: `src/app/api/contact/route.ts`

Verified implementation details:

- The form submits `name`, `email`, and `message`
- The API route validates input with `zod`
- Email delivery is handled through `nodemailer`
- The transport is configured with the Gmail service and environment variables

`Verify before publishing:` no rate limiting, CAPTCHA, or other abuse-prevention layer is visible in the repository.

## Assets / Public Files

Public assets are stored under `public/`.

Notable assets found in the repository:

- `public/pp.jpg` for the profile image
- `public/images/portfolio/*.JPG` for the photography gallery
- `public/*.svg` icon and placeholder assets
- `src/app/favicon.ico` for the site favicon

`Verify before publishing:` the portfolio gallery currently uses large JPEG source files. Consider optimizing image size and format if performance is a priority.

## SEO / Metadata Notes

Global metadata is defined in `src/app/[locale]/layout.tsx`.

Verified metadata fields include:

- Title template
- Default title
- Description
- Open Graph fields
- Twitter card fields
- Favicon

`Verify before publishing:` the metadata currently references `/og-image.jpg`, but that file was not found in the repository.

`Verify before publishing:` Open Graph locale handling appears to be statically configured in code rather than derived per locale.

## Known Issues / Notes

- No automated test suite is present in the repository.
- No CI configuration was found in the repository.
- The current repository includes `next-sitemap` in `package.json`, but no sitemap configuration file was found. Verify whether sitemap generation is intended.
- A root-level `pp.jpg` file also exists in addition to `public/pp.jpg`. Verify whether both copies are necessary.
- The locale middleware matcher currently targets `/` and locale-prefixed paths. Verify locale-less deep-link behavior before publishing if redirects for paths like `/about` are expected.
- Policy page content is stored in translation JSON files. Review legal content carefully before public release.

## License

No license file is currently included in the repository.

`TODO:` add a `LICENSE` file before publishing the repository publicly.
