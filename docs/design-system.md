# Design system

## Direction visuelle

Inspirée de **Angi.com** (palette corail, formes rondes et amicales, page d'accueil orientée
« trouver un pro ») et de l'ergonomie **WhatsApp** (plein écran, cibles tactiles ≥ 44 px,
coins très arrondis, zones sûres iOS/Android). Décision utilisateur — recouvre la palette
générique du cahier des charges.

## Source de vérité

- Tokens : `frontend/src/styles/tokens.css` (palette, ombres, rayons, espacements, typographie).
- Mapping Tailwind : `frontend/src/index.css` (`@theme inline`) — les utilitaires générés lisent les variables au runtime.

## Palette (inspiration Angi)

| Token                      | Valeur     | Usage                              |
| -------------------------- | ---------- | ----------------------------------- |
| `--color-primary`          | `#FF6153`  | actions, liens, accents (corail Angi) |
| `--color-primary-hover`    | `#E64D3D`  | survol actions                      |
| `--color-primary-active`   | `#A03027`  | état actif (brique)                 |
| `--color-primary-light`    | `#FFECE9`  | fonds clairs (héro, icônes)         |
| `--color-secondary`        | `#128C7E`  | contexte « contact WhatsApp »       |
| `--color-secondary-hover`  | `#0E7266`  | survol accent teal                  |
| `--color-secondary-light`  | `#E6F5F3`  | fonds teal clairs                   |
| `--color-background`       | `#FAF9F7`  | fond général (blanc cassé chaud)    |
| `--color-surface`          | `#FFFFFF`  | cartes, modales                     |
| `--color-text-primary`     | `#1F1B16`  | titres (noir chaud)                 |
| `--color-text-secondary`   | `#63615C`  | texte secondaire                    |
| `--color-text-muted`       | `#9B9790`  | placeholders                        |
| `--color-border`           | `#E8E4DE`  | bordures légères                    |
| `--shadow-sm/md/lg`        | —          | ombres douces et chaleureuses       |
| `--radius-sm/md/lg/full`   | 8/12/20/∞  | coins arrondis (formes amicales)    |
| `--color-success/error/...`| —          | états sémantiques (+ variants -light) |

## Composants `components/ui`

- `Button` — variants primary/secondary/outline/ghost/danger, tailles sm/md/lg, état loading.
- `Input`, `Textarea`, `Select` — états normal/erreur, label associé.
- `Badge` — variants neutral/success/warning/error/info/primary/secondary.
- `Card` — surface blanche, bordure légère, ombre discrète, `rounded-lg` (20 px).
- `Spinner` — loader standard (jamais de « Loading... » brut).
- `Skeleton` — placeholders de chargement.

## Règles

1. Ne jamais créer un composant avec un style ad hoc différent.
2. Un besoin non couvert → étendre le design system, pas créer une exception.
3. Icônes : `lucide-react` uniquement.
4. Mobile-first : chaque écran doit fonctionner de 320px à 2560px.
5. Boutons et liens d'action : corail (`primary`) ; usage teal réservé au contexte
   téléphone/WhatsApp pour garder la distinction sémantique.
6. Langage visuel « messagerie » : plein écran, cibles ≥ 44 px, coins très arrondis,
   en-têtes sticky, zones sûres (`pt-safe` / `pb-safe`).