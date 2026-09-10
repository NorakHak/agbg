# agbg

Landing page for a web studio that builds and redesigns sites for audit and accounting firms in Russia.

## Stack

- **Frontend** (`apps/web`) — static HTML/CSS/vanilla JS, no build step. IBM Plex fonts.
- **Backend** (`apps/api`) — [Fastify](https://fastify.dev/) on Node.js, serves `apps/web` as static files and exposes a small JSON API.
- **Repo layout** — npm workspaces monorepo (`apps/*`).

## How it works

The Fastify server (`apps/api/src/server.js`) does two things:

1. Serves everything in `apps/web` as static files via `@fastify/static`, so the whole site is available from a single origin/port.
2. Exposes `POST /api/contact` — validates the submitted contact form (name, contact, optional company/message) against a JSON schema, then forwards it as a message to a Telegram chat via the Telegram Bot API.

The contact form in `apps/web/js/main.js` validates input client-side (name length, Russian phone number or e-mail, field length limits) before sending it to the API.

## Getting started

```bash
npm install
cp apps/api/.env.example apps/api/.env
```

Fill in `apps/api/.env`:

```
PORT=3000
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
```

Run the dev server:

```bash
npm run dev
```

The site is served at `http://localhost:3000`.

## Project structure

```
apps/
  web/    static frontend (index.html, css/, js/, assets/)
  api/    Fastify backend (src/server.js, src/routes/contact.js)
```
