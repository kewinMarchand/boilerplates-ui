# CLAUDE.md : boilerplates-ui

Bibliothèque de composants personnelle, commune aux cinq boilerplates. Les conventions générales sont dans `~/.claude/CLAUDE.md` : ce fichier ne note que les choix propres au projet. La spec qui fait autorité est la section 19 de `~/Applications/boilerplates-commun/SPEC-COMMUNE.md` (mode renforcé en section 4, icônes en section 17, conteneur en section 18). Les choix structurants sont dans `doc/adr/0001-architecture-bibliotheque.md`.

- **Projet personnel** : aucune mention d'employeur. Auteur des commits : Kewin Marchand <kewin.marchand@gmail.com>.
- **Développement en conteneur** : seuls prérequis Docker avec Compose, `make` et git. Les cibles passent par `docker compose run --rm node` (variable `RUN`), image officielle Playwright à la version exacte de `@playwright/test` (épinglé sans `^`), volume nommé `node_modules`, UID et GID de la machine. Le hook `.githooks/pre-commit` appelle `make lint-staged`, `make install` le branche par `git config core.hooksPath` (pas de husky ni de script `prepare`, pour que l'installation par dépendance git ne tire pas l'outillage).
- **Paquets** : `tokens` (source `src/tokens.ts`, sorties versionnées dans `generated/`), `css` (un fichier par composant, `@layer components`, classes `bui-` en BEM, variables `--bui-*` seulement, balisage de référence dans `reference/markup.ts`), `vanilla` (JS natif avec JSDoc vérifié par `checkJs`), `react`, `vue`. Pas de build : les paquets sont livrés en sources.
- **Contrat de balisage** : React et Vue produisent exactement le HTML de `reference/markup.ts`. `tests/parity/parity.test.ts` le vérifie par rendu serveur. Changer un balisage, c'est changer les trois et ajouter le cas au test.
- **Pas d'import entre paquets** dans `react` et `vue` : la consommation git passe par la racine et ne crée pas les liens de workspace. Le type `IconName` est généré dans chacun par `make icons`.
- **Unité** : `px` partout. Points de rupture en dur dans les media queries (768 px = token `breakpoint-md`), une variable CSS ne fonctionne pas dans une media query.
- **Mode renforcé** : surcharges de tokens sous `[data-a11y-mode="enhanced"]` uniquement, aucune logique dupliquée. Animations coupées par `--bui-motion-duration: 0s` et par une règle explicite pour les animations à images clés.
- **Storybook** : un seul, `@storybook/html-vite`. Histoires HTML par état, une histoire React et une histoire Vue par composant (montées par `stories/support/frameworks.ts`). Bascule de mode dans la barre d'outils (`a11yMode`). Survol et focus forcés par `storybook-addon-pseudo-states`.
- **Sprite d'icônes** : `/icons.svg` par défaut, changé par `setIconSprite()` (exporté par `react`, `vue` et `css/reference/markup.ts`). Le Storybook passe un chemin relatif, `icons.svg`, pour fonctionner sous `/boilerplates-ui/` sur GitHub Pages (job `pages` de la CI, sur `main` seulement).
- **Champs** : zone de texte et liste déroulante réutilisent le bloc `bui-field` (composant interne `Field` en React et Vue). Le groupe de boutons radio compose `Fieldset` et `Radio`. L'interrupteur est une case à cocher native avec `role="switch"`.
- **Tests axe** : `tests/a11y/stories.a11y.ts` lit `storybook-static/index.json` et teste chaque histoire dans les deux modes. Il faut `make storybook-build` avant `make test-a11y`. L'addon a11y lance aussi axe dans l'iframe : le test relance son analyse par `expect.toPass()` tant que le passage de l'addon n'est pas fini.

## Règles de lint désactivées ou ajoutées

- `vue/require-default-prop` désactivée sur les `.vue` : les props optionnelles sont typées et `undefined` est la valeur voulue (attribut absent du balisage). Une valeur par défaut factice casserait la parité avec React.
- Les composants Vue gardent des noms courts à l'import (`Button`) comme en React, et déclarent un nom multi-mots par `defineOptions({ name: 'BuiButton' })` pour respecter `vue/multi-word-component-names` sans désactiver la règle.
- `no-console` est coupée dans `tools/` et `packages/tokens/scripts/` : ce sont des scripts en ligne de commande qui rendent compte de ce qu'ils écrivent.
