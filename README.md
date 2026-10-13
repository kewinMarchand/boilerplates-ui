# boilerplates-ui

Bibliothèque de composants commune aux cinq boilerplates (Next et MUI, Nuxt et Vuetify, SvelteKit et Tailwind, Symfony et Twig, HTML et CSS vanilla). Une source de tokens, un balisage HTML et CSS de référence, le comportement en JavaScript natif, et des composants React et Vue qui produisent exactement ce balisage. Accessibilité WCAG 2.1 AA en mode standard et en mode renforcé, vérifiée par axe sur chaque histoire du Storybook.

| Paquet             | Contenu                                                                                                                                     |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/tokens`  | Source `src/tokens.ts`, fichiers générés dans `generated/` : `tokens.css`, `tokens.json`, `mui.json`, `vuetify.json`, `tailwind.css`        |
| `packages/css`     | Un fichier CSS par composant (`components/`), `index.css`, sprite d'icônes Lucide (`icons/`), balisage de référence (`reference/markup.ts`) |
| `packages/vanilla` | Comportement natif sans dépendance (modale sur `<dialog>`)                                                                                  |
| `packages/react`   | Composants React typés                                                                                                                      |
| `packages/vue`     | Composants Vue typés                                                                                                                        |
| `apps/storybook`   | Storybook de démonstration et documentation des tokens                                                                                      |

Composants du lot 1 : bouton, champ texte, case à cocher, alerte, carte, modale, et l'icône dont ils ont besoin.

## Prérequis

- Docker avec Compose
- `make`
- git

Rien d'autre : chaque commande `make` lance `docker compose run` sur le service `node` (image officielle Playwright, à la version exacte de `@playwright/test`). Les dépendances vivent dans le volume nommé `node_modules`, et le conteneur tourne avec l'UID et le GID de la machine.

## Démarrer

```sh
make install          # image de dev, dépendances, hook git
make up               # Storybook sur http://localhost:6006 (STORYBOOK_PORT pour un autre port)
make qa               # lint, format, types, générés à jour, tests unitaires
make storybook-build  # Storybook statique dans apps/storybook/storybook-static
make test-a11y        # axe sur chaque histoire construite, en mode standard et renforcé
```

`make help` liste toutes les cibles. Le hook `pre-commit` lance `make lint-staged` et refuse le commit si Docker est arrêté.

## Ajouter un composant

1. **Tokens** : si une valeur manque, l'ajouter dans `packages/tokens/src/tokens.ts`, puis `make tokens`.
2. **Référence** : écrire la fonction de balisage dans `packages/css/reference/markup.ts`.
3. **CSS** : `packages/css/components/<composant>.css`, classes `bui-<composant>` en BEM, uniquement des variables `--bui-*`, dans `@layer components`. L'importer dans `packages/css/index.css`.
4. **Comportement** (si interactif) : `packages/vanilla/src/<composant>.js`, en s'appuyant d'abord sur `<dialog>`, `<details>` ou l'API Popover.
5. **React et Vue** : `packages/react/src/<Composant>.tsx` et `packages/vue/src/<Composant>.vue`, exportés par leur `index.ts`. Une icône nouvelle va dans `packages/css/icons/icons.json`, puis `make icons`.
6. **Parité** : ajouter les cas dans `tests/parity/parity.test.ts` (référence, React, Vue).
7. **Histoires** : `apps/storybook/stories/<composant>.stories.ts`, une histoire HTML par état, une histoire React, une histoire Vue. `make storybook-build test-a11y` les passe à axe dans les deux modes sans autre déclaration.

## Consommer depuis un boilerplate

En attendant la publication npm, la dépendance est le dépôt git sur une étiquette de version. Yarn 1 n'installe pas un sous-dossier : on dépend de la racine, qui expose chaque couche.

```json
{
  "dependencies": {
    "@kewinmarchand/boilerplates-ui": "github:kewinMarchand/boilerplates-ui#v0.1.0"
  }
}
```

Créer une version : `git tag v0.1.0 && git push origin v0.1.0`. Monter de version dans un boilerplate : changer l'étiquette, puis `make install`.

| Import                                               | Contenu                                                       |
| ---------------------------------------------------- | ------------------------------------------------------------- |
| `@kewinmarchand/boilerplates-ui/tokens/tokens.css`   | Variables `--bui-*`, mode renforcé compris                    |
| `@kewinmarchand/boilerplates-ui/tokens/tailwind.css` | Thème Tailwind v4 (`@theme inline`) branché sur les variables |
| `@kewinmarchand/boilerplates-ui/tokens/mui.json`     | Options de `createTheme`                                      |
| `@kewinmarchand/boilerplates-ui/tokens/vuetify.json` | Options de thème Vuetify, thèmes `light` et `enhanced`        |
| `@kewinmarchand/boilerplates-ui/css`                 | CSS de tous les composants                                    |
| `@kewinmarchand/boilerplates-ui/vanilla`             | `initModals()`, `openModal()`                                 |
| `@kewinmarchand/boilerplates-ui/react`               | Composants React                                              |
| `@kewinmarchand/boilerplates-ui/vue`                 | Composants Vue                                                |

Par stack :

- **Next et MUI** : `transpilePackages: ['@kewinmarchand/boilerplates-ui']` dans `next.config.ts`, importer `tokens.css` puis `css` dans le layout racine, `createTheme(deepmerge(muiOptions, options propres))` si l'on reprend l'adaptateur.
- **Nuxt et Vuetify** : `build: { transpile: ['@kewinmarchand/boilerplates-ui'] }`, les deux CSS dans `css`, les options de `vuetify.json` dans `createVuetify`. Le thème `enhanced` se sélectionne avec le mode renforcé.
- **SvelteKit et Tailwind** : `@import` de `tokens.css`, puis `tailwindcss`, puis `tokens/tailwind.css` et `css`. Les composants Svelte recopient le balisage de `packages/css/reference/markup.ts` et appellent `initModals()`.
- **Symfony et Twig, HTML vanilla** : mêmes CSS, balisage recopié dans des partials, `initModals()` au chargement.

Le composant icône pointe vers `/icons.svg` : fusionner `packages/css/icons/icons.json` dans la liste d'icônes du boilerplate (section 17 de la spec commune).

## Dépendances

Aucune dépendance d'exécution. React (19 ou plus) et Vue (3.5 ou plus) sont des dépendances pairs optionnelles. Poids livré : CSS des composants 9,5 ko (1,7 ko en gzip), `tokens.css` 2,8 ko (0,9 ko en gzip), JS vanilla 1,3 ko (0,6 ko en gzip).

Outillage de développement (taille installée) :

| Dépendance                                     | Taille                | Raison                                                                |
| ---------------------------------------------- | --------------------- | --------------------------------------------------------------------- |
| `storybook`, `@storybook/html-vite`            | 22 Mo                 | Storybook de démonstration, renderer HTML pour la référence           |
| `@storybook/addon-a11y`                        | 3,6 Mo                | Panneau axe dans le Storybook                                         |
| `storybook-addon-pseudo-states`                | 76 ko                 | Histoires survol et focus sans attribut de test dans le CSS livré     |
| `@fontsource-variable/inter`                   | 2 Mo                  | Police des boilerplates, chargée par le Storybook seulement           |
| `@axe-core/playwright`, `@playwright/test`     | 68 ko et image Docker | Tests axe des histoires                                               |
| `vitest`, `jsdom`                              | 3 Mo et 9,4 Mo        | Test du générateur de tokens et test de parité (normalisation du DOM) |
| `vite`, `@vitejs/plugin-vue`                   | 2,5 Mo et 104 ko      | Compilation des SFC pour les tests et le Storybook, pair de Vitest    |
| `vue-tsc`                                      | 40 ko                 | Vérification des types TypeScript, Vue et JS vanilla en une passe     |
| `@iconify-json/lucide`, `svgstore`             | 640 ko et 140 ko      | Génération du sprite (section 17)                                     |
| `eslint` et plugins, `prettier`, `lint-staged` |                       | Qualité, mêmes outils que les boilerplates                            |

## Licence

MIT, voir `LICENSE`.
