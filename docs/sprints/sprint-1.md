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

## ERGONOMIE DES FORMULAIRES (retours utilisateur)

- **Mot de passe** : toggle afficher/masquer (`Eye`/`EyeOff`), checklist de contraintes en direct
  (8 caractères, majuscule, minuscule, chiffre/symbole — verte si respectée, rouge sinon,
  disparaît quand tout est bon), bouton **« Suggérer un mot de passe fort »** qui propose un
  mot de passe (bannière avec « Utiliser ce mot de passe » / « Nouvelle suggestion »).
  Règles et générateur centralisés dans `src/features/auth/password.ts` (source unique
  schéma + UI), règles miroirs côté API (backend).
- **Téléphone (WhatsApp)** : indicatif **+237 pré-rempli** (non modifiable), espace entre
  l'indicatif et le numéro, **mise en forme automatique** à la saisie (`6 90 00 00 00`).
  Validation d'un **mobile camerounais réel** : 9 chiffres commençant par `6` suivi de 5–9 —
  rejette `6 11 11 11 11`, `7 00 00 00 00`, `6 22 22 99 99`. Même règle côté API.
- **Footer** : `src/components/layout/PublicFooter` (marque, navigation, à propos, copyright),
  intégré au layout public, mobile-first.

## Conformité au cahier des charges (prompt.md §29)

| Exigence §29 | Statut |
| ------------ | ------ |
| Modèle Mongoose `User` | ✅ (Sprint 1 backend) |
| Register | ✅ `/register` |
| Login | ✅ `/login` |
| Logout | ✅ header public |
| JWT + refresh token | ✅ backend (cookies HttpOnly, rotation) |
| Middleware auth | ✅ `requireAuth` / `requireRole` |
| Rôles | ✅ CUSTOMER / PROFESSIONAL / ADMIN |
| Composants du design system (Input/Button/Card) | ✅ aucun style ad hoc |
| Tests (inscription, email déjà pris, mauvais mdp, token invalide, route protégée) | ✅ 13 tests backend verts |
| Livrable : créer un compte + se connecter, UI conforme | ✅ vérifié par smoke test réel |

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