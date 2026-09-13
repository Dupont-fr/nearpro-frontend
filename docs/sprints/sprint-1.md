# Sprint 1 — Authentification (frontend)

## Objectif

Proposer les pages `/login` et `/register` conformes au design system, branchées sur l'API d'authentification, avec validation Zod et état global Redux.

## Fonctionnalités réalisées

- **Feature Redux `auth`** (`src/features/auth/slice.ts`) : `user`, `status` (`idle | authenticated | guest`), actions `setUser` / `clearUser`, branchée au store.
- **Bootstrap de session** (`useBootstrapAuth` dans `App.tsx`) : au premier rendu, `GET /api/auth/me` restaure la session depuis les cookies HttpOnly puis hydrate Redux.
- **Services** (`src/features/auth/services.ts`) : `fetchMe`, `registerUser`, `loginUser`, `logoutUser` via le client API (`credentials: 'include'`).
- **Schémas Zod** (`src/features/auth/schema.ts`) : formulaires validés avec `zodResolver` + react-hook-form (mêmes règles que l'API).
- **`/login`** : email + mot de passe, erreurs serveur affichées, toast de succès, redirection `/`.
- **`/register`** : rôle (CUSTOMER/PROFESSIONAL), prénom, nom, email, téléphone (WhatsApp), mot de passe.
- **Header public** : « Connexion » / « S'inscrire » pour les visiteurs, prénom + « Déconnexion » pour les connectés.

## Adapter l'API client

- `src/lib/api.ts` : ajout de `apiRequest` / `apiPost` (méthodes, JSON, `credentials: 'include'`).
- `src/types/index.ts` : types `UserRole` et `AuthUser`.

## Mobile-first (directive : inspiration WhatsApp + applications similaires)

- Champs et boutons pleine largeur, cibles tactiles ≥ 44 px (`size lg` h-12).
- Cartes aux coins très arrondis (`rounded-2xl`), ombre douce — langage visuel « messagerie ».
- Header sticky avec `backdrop-blur` ; utilitaires `pt-safe` / `pb-safe` (zones sûres iOS/Android).
- Wordmark centré, marges généreuses, tout reste lisible de 320 px (mobile) à 2560 px.

## Comptes-rendus

- [`sprint-0.md`](sprint-0.md)
- Sprint 2 : recherche / découverte (voir `docs/roadmap.md`).