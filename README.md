# NearPro Frontend

Interface de la plateforme **NearPro** — découverte de professionnels locaux (Cameroun).

## Stack

- React 19 + TypeScript
- Vite (build + dev server)
- Tailwind CSS v4 (design tokens)
- React Router (routage)
- **Redux Toolkit + react-redux** (état global)
- TanStack Query (données serveur)
- React Hook Form + **Zod** (validation des formulaires)
- lucide-react (icônes)

## Architecture

```
src/
├── components/ui/    # design system (Button, Input, Badge, Card...)
├── layouts/          # PublicLayout, DashboardLayout, AdminLayout
├── pages/
├── features/         # découpe par domaine (auth, businesses, search...)
├── store/            # store Redux + slices
├── hooks/
├── services/         # appels API (TanStack Query)
├── lib/              # client API
├── routes/           # config React Router
├── styles/           # tokens.css + index.css (Tailwind)
└── types/
```

## État

- **Redux** : état global applicatif (auth, préférences UI, session, notifications).
- **TanStack Query** : cache des données serveur (health, businesses, search).
- **Zod** : schémas de validation partagés entre les formulaires (react-hook-form `zodResolver`) et les types.

## Routes (Sprint 1)

- `/` — page d'accueil
- `/login` — connexion
- `/register` — création de compte (CUSTOMER / PROFESSIONAL)

## Mobile-first

Reprise du langage visuel d'**Angi.com** (palette corail, formes rondes, landing orientée
« trouver le bon pro ») et des applications de messagerie type WhatsApp : plein écran,
cibles tactiles ≥ 44 px, coins très arrondis, en-têtes sticky, zones sûres
(`pt-safe`/`pb-safe`). Le responsive est vérifié de 320 px à 2560 px.

## Démarrage

```bash
npm install
npm run dev
```

L'app est servie sur `http://localhost:5173`. Le proxy Vite redirige `/api` vers le backend (`http://localhost:5000`).

## Scripts

- `npm run dev` — serveur de dev
- `npm run build` — typecheck + build de production
- `npm run lint` — ESLint
- `npm run format` — Prettier

## Documentation

- [`docs/architecture.md`](docs/architecture.md)
- [`docs/design-system.md`](docs/design-system.md)
- [`docs/roadmap.md`](docs/roadmap.md)
- [`docs/sprints/`](docs/sprints) — comptes-rendus de sprints