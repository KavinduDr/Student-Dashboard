# Assignment System — Frontend

A Next.js frontend for an assignment and quiz management system used by students and instructors. It provides pages for assignment activation, submission, quiz monitoring, student dashboards, and administrative settings.

## Features

- Student and instructor views (dashboard, assignments, submissions).
- Quiz monitoring and context-driven UI state via React contexts.
- Modular UI components and accessible primitives in [app/components/ui](app/components/ui).
- Client-side routing using the Next.js App Router (files under `app/`).

## Tech stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS (see `tailwind.config.ts`)

## Repository structure (high level)

- `app/` — main application routes and UI. Key files:
	- [app/page.tsx](app/page.tsx) — public landing / initial page
	- [app/layout.tsx](app/layout.tsx) — app layout and global providers
	- [app/assignment/page.tsx](app/assignment/page.tsx) — assignment list
	- [app/components/InitialPage/InitialPage.tsx](app/components/InitialPage/InitialPage.tsx) — landing component
- `context/` — React Context providers for app state (see [context/UserContext.tsx](context/UserContext.tsx)).
- `public/` — static assets and icons
- `app/components/ui/` — shared UI primitives (buttons, inputs, dialogs, etc.)

## Prerequisites

- Node.js 18+ (or the version your team standardises on)
- npm, yarn, or pnpm

## Setup (from scratch)

1. Clone the repository:

```bash
git clone <repo-url>
cd assignment_sys_frontend
```

2. Install dependencies:

```bash
npm install
# or
# pnpm install
# or
# yarn install
```

3. Run the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Build & production

Build the app:

```bash
npm run build
```

Start the production server (after build):

```bash
npm run start
```

## Environment variables

This project may read environment variables (for API base URL, auth, etc.). Add variables to `.env.local` at the repository root. Example:

```env
NEXT_PUBLIC_API_URL=https://api.example.com
```

If your backend uses authentication or other secrets, add them here and do not commit `.env.local`.

## Where to look first

- UI entry: [app/page.tsx](app/page.tsx)
- App layout and providers: [app/layout.tsx](app/layout.tsx)
- Context/state: [context/QuizContext.tsx](context/QuizContext.tsx), [context/EssayContext.tsx](context/EssayContext.tsx), [context/UserContext.tsx](context/UserContext.tsx)
- Reusable UI components: [app/components/ui](app/components/ui)

## Contributing

- Create feature branches from `main` or `develop` (follow repo conventions).
- Run the dev server and ensure pages render and behavior matches expectations.
- Open a pull request with a clear description and any testing instructions.

## Troubleshooting

- If the app shows a blank page, check the browser console and server terminal for runtime errors.
- Ensure environment variables are set when connecting to a backend.

## License

Specify your license here (e.g. MIT) or add a `LICENSE` file to the repository.

---

If you want, I can also:

- Add a sample `.env.local.example` file with common variables.
- Add quick run scripts to `package.json` or a short development guide.
