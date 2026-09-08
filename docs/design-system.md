# Design system

## Source de vérité

- Tokens : `frontend/src/styles/tokens.css` (palette, ombres, rayons, espacements, typographie).
- Mapping Tailwind : `frontend/src/index.css` (`@theme inline`) — les utilitaires générés lisent les variables au runtime.

## Palette

Définie dans le cahier des charges (§16.1) :

| Token                      | Valeur     | Usage                              |
| -------------------------- | ---------- | ----------------------------------- |
| `--color-primary`          | `#4F46E5`  | actions, liens, accents             |
| `--color-background`       | `#F8FAFC`  | fond général                        |
| `--color-surface`          | `#FFFFFF`  | cartes, modales                     |
| `--color-text-primary`     | `#0F172A`  | titres                              |
| `--color-text-secondary`   | `#64748B`  | texte secondaire                    |
| `--color-text-muted`       | `#94A3B8`  | placeholders                        |
| `--color-border`           | `#E2E8F0`  | bordures légères                    |
| `--shadow-sm/md/lg`        | —          | ombres discrètes                    |
| `--radius-sm/md/lg/full`   | 6/10/16/∞  | coins arrondis                      |
| `--color-success/error/...`| —          | états sémantiques (+ variants -light) |

## Composants `components/ui`

- `Button` — variants primary/secondary/outline/ghost/danger, tailles sm/md/lg, état loading.
- `Input`, `Textarea`, `Select` — états normal/erreur, label associé.
- `Badge` — variants neutral/success/warning/error/info/primary/secondary.
- `Card` — surface blanche, bordure légère, ombre discrète.
- `Spinner` — loader standard (jamais de « Loading... » brut).
- `Skeleton` — placeholders de chargement.

## Règles

1. Ne jamais créer un composant avec un style ad hoc différent.
2. Un besoin non couvert → étendre le design system, pas créer une exception.
3. Icônes : `lucide-react` uniquement.
4. Mobile-first : chaque écran doit fonctionner de 320px à 2560px.