# Architecture — Frontend

## Structure

```
src/
├── components/
│   ├── ui/          # design system (Button, Input, Badge, Card, Spinner, Skeleton...)
│   └── shared/
├── layouts/
│   ├── PublicLayout/
│   ├── DashboardLayout/
│   └── AdminLayout/
├── pages/
├── features/        # découpe par domaine (auth, businesses, search...)
├── store/           # Redux Toolkit : store, slices, hooks typés
├── hooks/
├── services/        # appels API (TanStack Query)
├── lib/             # client API
├── utils/
├── types/
├── constants/
├── routes/          # config React Router
├── styles/          # tokens.css + index.css (Tailwind)
└── main.tsx
```

## Gestion de l'état

- **Redux Toolkit** (`store/`) : état global applicatif (auth, UI, préférences, notifications). Slice par domaine dans `features/<domaine>/slice.ts`.
- **TanStack Query** : cache côté serveur (efficace pour 250+ utilisateurs : déduplication, cache, refetch contrôlé).
- **Zod** : schémas de validation partagés formulaire (`features/<domaine>/schema.ts`) utilisés avec `react-hook-form` (`zodResolver`).

## Routage

`routes/index.tsx` — `createBrowserRouter` avec layouts imbriqués :

```
PublicLayout   → / , /search, /business/:slug, /category/:slug
DashboardLayout→ /dashboard/*
AdminLayout    → /admin/*
```

## Design system

Toute page réutilise `components/ui/`. Règle absolue : aucune exception de style locale. Voir `docs/design-system.md`.

## Build & dev

- Dev : Vite + proxy `/api → http://localhost:5000`.
- Prod : `npm run build` (typecheck + build), livrable statique servé derrière un CDN.