# Sprint 2 — Catégories (frontend)

## Objectif (prompt.md §30)

Afficher les catégories publiques sur la page d'accueil, chargées depuis l'API.

## Feature `categories`

- `src/features/categories/services.ts` — `fetchCategories()` via le client API
  (`/api/categories`, arbre imbriqué).
- `src/features/categories/hooks.ts` — `useCategories()` avec **React Query**
  (cache 30 s, 1 retry). React Query est câblé une seule fois dans `main.tsx`.

## HomePage

La grille « Catégories populaires » n'est plus statique :

- **Chargement** : 6 cartes squelette (`Skeleton`, design system) pendant le fetch.
- **Données** : cartes cliquables avec icône déduite du slug
  (`automobile` → Car, `beaute` → Scissors, `maison`/`bricolage` → Wrench…,
  repli `Tag` pour les slugs inconnus) et le nombre de sous-catégories en libellé.
- **Erreur** : carte d'erreur avec bouton « Réessayer » (`refetch`).

Les icônes restent côté frontend (les slugs servent de clé de mapping) — aucune
icône n'est stockée en base.

## Règles mobile-first

Vérifiées sur la grille (2 → 3 → 6 colonnes), cartes ≥ 44 px, skeleton sans saut
de mise en page.

- Comptes-rendus précédents : [`sprint-1.md`](sprint-1.md)
- Sprint suivant : `Sprint 3 — Création d'activité` (voir `docs/roadmap.md`).