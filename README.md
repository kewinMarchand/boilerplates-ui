# boilerplates-ui

Bibliothèque de composants commune aux cinq boilerplates (Next et MUI, Nuxt et Vuetify, SvelteKit et Tailwind, Symfony et Twig, HTML et CSS vanilla). Une source de tokens, un balisage HTML et CSS de référence, le comportement en JavaScript natif, et des composants React et Vue qui produisent exactement ce balisage. Accessibilité WCAG 2.1 AA en mode standard et en mode renforcé, vérifiée par axe sur chaque histoire du Storybook.

| Paquet             | Contenu                                                                                                                                     |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/tokens`  | Source `src/tokens.ts`, fichiers générés dans `generated/` : `tokens.css`, `tokens.json`, `mui.json`, `vuetify.json`, `tailwind.css`        |
| `packages/css`     | Un fichier CSS par composant (`components/`), `index.css`, sprite d'icônes Lucide (`icons/`), balisage de référence (`reference/markup.ts`) |
| `packages/vanilla` | Comportement natif sans dépendance (modale et tiroir sur `<dialog>`, onglets, menu, info-bulle, toast, tri de tableau)                      |
| `packages/react`   | Composants React typés                                                                                                                      |
| `packages/vue`     | Composants Vue typés                                                                                                                        |
| `apps/storybook`   | Storybook de démonstration et documentation des tokens                                                                                      |

Composants disponibles : bouton, bouton icône, lien, bouton-lien, puce, champ texte, zone de texte, liste déroulante, case à cocher, bouton radio et groupe de boutons radio, interrupteur, groupe de champs, alerte, badge, carte, modale, tiroir, toast, onglets, accordéon, info-bulle, menu déroulant, fil d'Ariane, pagination, tableau, séparateur, indicateur de chargement, squelette, avatar, icône.

Le Storybook (vue d'ensemble de chaque composant, contrôles en direct, mode renforcé, thème sombre et couleurs globales dans la barre d'outils) est publié sur GitHub Pages à chaque push sur `main` : https://kewinmarchand.github.io/boilerplates-ui/.

Points de rupture : 640, 768, 1024 et 1280 px (ceux de Tailwind), repris par l'adaptateur MUI.

Mode sombre : sur demande, par un attribut sur l'élément racine. `<html data-color-scheme="auto">` suit le système, `data-color-scheme="dark"` force le sombre. Sans l'attribut, les tokens restent en clair, quel que soit le système. Le mode renforcé (`data-a11y-mode="enhanced"`) reste toujours en clair.

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
make test-a11y        # axe sur chaque histoire construite, en mode standard, renforcé et sombre
```

`make help` liste toutes les cibles. Le hook `pre-commit` lance `make lint-staged` et refuse le commit si Docker est arrêté.

## Ajouter un composant

1. **Tokens** : si une valeur manque, l'ajouter dans `packages/tokens/src/tokens.ts`, puis `make tokens`.
2. **Référence** : écrire la fonction de balisage dans `packages/css/reference/markup.ts`.
3. **CSS** : `packages/css/components/<composant>.css`, classes `bui-<composant>` en BEM, uniquement des variables `--bui-*`, dans `@layer components`. L'importer dans `packages/css/index.css`.
4. **Comportement** (si interactif) : `packages/vanilla/src/<composant>.js`, en s'appuyant d'abord sur `<dialog>`, `<details>` ou l'API Popover.
5. **React et Vue** : `packages/react/src/<Composant>.tsx` et `packages/vue/src/<Composant>.vue`, exportés par leur `index.ts`. Une icône nouvelle va dans `packages/css/icons/icons.json`, puis `make icons`.
6. **Parité** : ajouter les cas dans `tests/parity/parity.test.ts` (référence, React, Vue).
7. **Histoires** : `apps/storybook/stories/<composant>.stories.ts`, titre `Famille/Composant`, `args` et `argTypes` complets, une histoire « Toutes les variantes » en tête, puis HTML, React et Vue rendus depuis les `args`. `make storybook-build test-a11y` les passe à axe dans les deux modes sans autre déclaration.

## Consommer depuis un boilerplate

En attendant la publication npm, la dépendance est le dépôt git sur une étiquette de version. Yarn 1 n'installe pas un sous-dossier : on dépend de la racine, qui expose chaque couche.

```json
{
  "dependencies": {
    "@kewinmarchand/boilerplates-ui": "github:kewinMarchand/boilerplates-ui#v0.1.0"
  }
}
```

Créer une version : passer la même version dans les sept `package.json` (racine, `packages/*`, `apps/storybook`), y compris les dépendances internes de `apps/storybook/package.json`, qui sont en version exacte (sinon `make install` échoue en CI, faute de paquet sur le registre npm), compléter `CHANGELOG.md`, puis, CI verte, `git tag v0.1.0 && git push origin v0.1.0`. Monter de version dans un boilerplate : changer l'étiquette, puis `make install`.

| Import                                               | Contenu                                                                                                        |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `@kewinmarchand/boilerplates-ui/tokens/tokens.css`   | Variables `--bui-*`, mode renforcé compris                                                                     |
| `@kewinmarchand/boilerplates-ui/tokens/tailwind.css` | Thème Tailwind v4 (`@theme inline`) branché sur les variables                                                  |
| `@kewinmarchand/boilerplates-ui/tokens/mui.json`     | Options de `createTheme`                                                                                       |
| `@kewinmarchand/boilerplates-ui/tokens/vuetify.json` | Options de thème Vuetify, thèmes `light` et `enhanced`                                                         |
| `@kewinmarchand/boilerplates-ui/css`                 | CSS de tous les composants                                                                                     |
| `@kewinmarchand/boilerplates-ui/vanilla`             | `initModals()`, `initTabs()`, `initMenus()`, `initTooltips()`, `initToasts()` et `showToast()`, `initTables()` |
| `@kewinmarchand/boilerplates-ui/react`               | Composants React                                                                                               |
| `@kewinmarchand/boilerplates-ui/vue`                 | Composants Vue                                                                                                 |

Par stack :

- **Next et MUI** : `transpilePackages: ['@kewinmarchand/boilerplates-ui']` dans `next.config.ts`, importer `tokens.css` puis `css` dans le layout racine, `createTheme(deepmerge(muiOptions, options propres))` si l'on reprend l'adaptateur.
- **Nuxt et Vuetify** : `build: { transpile: ['@kewinmarchand/boilerplates-ui'] }`, les deux CSS dans `css`, les options de `vuetify.json` dans `createVuetify`. Le thème `enhanced` se sélectionne avec le mode renforcé.
- **SvelteKit et Tailwind** : `@import` de `tokens.css`, puis `tailwindcss`, puis `tokens/tailwind.css` et `css`. Les composants Svelte recopient le balisage de `packages/css/reference/markup.ts` et appellent les `initX()` de vanilla.
- **Symfony et Twig, HTML vanilla** : mêmes CSS, balisage recopié dans des partials, les `initX()` de vanilla au chargement.

Le composant icône pointe vers `/icons.svg` : fusionner `packages/css/icons/icons.json` dans la liste d'icônes du boilerplate (section 17 de la spec commune). Sous un sous-chemin, appeler `setIconSprite('/sous-chemin/icons.svg')` au démarrage, exporté par `react`, `vue` et `css/reference/markup.ts`.

## États forcés hors Storybook

Pour montrer un état dans une charte graphique, poser une classe sur l'élément interactif. Elles ne s'appliquent que si on les pose :

| Classe          | Effet                  |
| --------------- | ---------------------- |
| `bui-is-hover`  | Rendu de survol        |
| `bui-is-focus`  | Rendu de focus visible |
| `bui-is-active` | Rendu d'appui (bouton) |

```html
<button type="button" class="bui-button bui-is-hover">Envoyer</button>
```

## Points d'API à connaître

- **Bouton** : `variant` (`primary`, `secondary`, `outline`, `ghost`, `inverse` pour un fond sombre ou primaire, `nav` pour la navigation sur fond primaire avec `aria-current="page"` en gras souligné, `light` et `outline-light` sur une photo, mêmes couleurs en sombre), `size`, `icon` et `iconPosition` (`start` ou `end`), `href` pour rendre un `<a>` à l'apparence de bouton (désactivé, il perd son `href` et porte `aria-disabled`), `fullWidth` pour occuper toute la largeur du conteneur (`bui-button--full-width`). Le bouton icône accepte aussi `nav`.
- **Puce** : lien (`href`) ou bouton, `aria-current="page"` pour la puce courante (`current` dans la référence), `removable` pour un filtre actif (icône et « Retirer le filtre : » masqué). Une suite de puces va dans `<ul class="bui-chip-list" role="list">`.
- **Bouton-lien** : un `<button>` à l'apparence de lien, pour une action discrète (« Tout effacer »). `fullWidth` lui fait occuper toute la largeur du conteneur (`bui-link--full-width`).
- **Champ texte et zone de texte** : `placeholder` pour un exemple de saisie, en complément du libellé, jamais à sa place.
- **Alerte** : `action` (HTML dans la référence, `ReactNode` en React, slot `action` en Vue) pour un bouton « Réessayer ».
- **Icône** : `label` pour une icône porteuse de sens (`role="img"`), `size` (`sm`, `md`, `lg`, sinon 1em).
- **Carte** : `.bui-card__media` accepte une `<img>` ou une `<picture>`.
- **Vanilla** : déclarations TypeScript publiées dans `packages/vanilla/types`, générées depuis les JSDoc par `make vanilla-types` et vérifiées par `make qa`.

## Dépendances

Aucune dépendance d'exécution. React (19 ou plus) et Vue (3.5 ou plus) sont des dépendances pairs optionnelles. Poids livré à l'étiquette `v0.5.0`, minifié par esbuild puis compressé par `gzip -9` : CSS des composants 29,9 ko (4,4 ko en gzip), `tokens.css` 6,0 ko (1,4 ko en gzip), JS vanilla 6,2 ko (2,1 ko en gzip).

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

Photos du Storybook (`apps/storybook/public`), sous licence CC0, de StockSnap : `portrait.jpg` par Matt Moloney, `randonnee.jpg` et `randonnee.webp` par Aleksandra Boguslawska, recadrées.
