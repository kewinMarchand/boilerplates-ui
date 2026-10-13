# 0001. Architecture de la bibliothèque

Date : 13/10/2026

## Contexte

Cinq boilerplates personnels (Next et MUI, Nuxt et Vuetify, SvelteKit et Tailwind, Symfony et Twig, HTML et CSS vanilla) dupliquent les mêmes composants de base, chacun avec son kit. La section 19 de la spec commune demande une bibliothèque unique, découpée en couches (tokens, CSS, vanilla, React, Vue), accessible WCAG 2.1 AA en mode standard et en mode renforcé, démontrée dans un Storybook.

Forces en présence :

- les cinq dépôts utilisent Yarn 1, qui ne sait pas installer un sous-dossier d'un dépôt git ;
- la publication npm sous `@kewinmarchand/` attend une connexion de Kewin, la consommation passe d'abord par une dépendance git sur une étiquette de version ;
- seuls Docker, `make` et git sont installés sur la machine (section 18) ;
- les chartes existantes sont conservées : les tokens reprennent les valeurs actuelles, ils n'en inventent pas.

## Décision

1. **Monorepo à workspaces Yarn 1** : `packages/tokens`, `packages/css`, `packages/vanilla`, `packages/react`, `packages/vue`, `apps/storybook`. Chaque paquet a son `package.json` sous `@kewinmarchand/`, prêt pour npm.
2. **Consommation git par la racine** : la racine expose une carte `exports` (`@kewinmarchand/boilerplates-ui/react`, `/vue`, `/css`, `/vanilla`, `/tokens/*`). Une seule dépendance `github:kewinMarchand/boilerplates-ui#v0.1.0` suffit avec Yarn 1. La racine n'a ni `dependencies` ni script `prepare`, pour que l'installation git ne télécharge pas l'outillage. React et Vue sont des dépendances pairs optionnelles.
3. **Pas d'étape de build** : les paquets sont livrés en sources. CSS et JS natif tels quels, React et Vue en TypeScript et SFC, transpilés par le consommateur (`transpilePackages` en Next, `build.transpile` en Nuxt). Le hook git n'utilise pas husky, `make install` pose `core.hooksPath`.
4. **Tokens en TypeScript, fichiers générés versionnés** : `packages/tokens/src/tokens.ts` est la source. `make tokens` écrit `generated/` (variables CSS standard et `[data-a11y-mode="enhanced"]`, JSON, options `createTheme` MUI, thème Vuetify avec un thème `enhanced`, thème Tailwind v4 en `@theme inline`). `make tokens-check` échoue si `generated/` est périmé, comme le sprite d'icônes. Les adaptateurs sont en JSON ou en CSS : aucun n'importe MUI, Vuetify ni Tailwind.
5. **Le balisage de référence est du code** : `packages/css/reference/markup.ts` produit le HTML de chaque composant et état. Il nourrit les histoires HTML et le test de parité, qui compare le rendu serveur React et Vue à cette référence après normalisation (attributs et classes triés, commentaires de fragments retirés).
6. **Un seul Storybook HTML (`@storybook/html-vite`)** : les histoires HTML et vanilla sont la référence, React et Vue sont montés dans une histoire par framework avec `createRoot` et `createApp`. Le mode renforcé est une variable globale de la barre d'outils qui pose `data-a11y-mode` sur `<html>`. Les états survol et focus passent par `storybook-addon-pseudo-states`. Les tests axe parcourent l'index du build et passent chaque histoire dans les deux modes avec Playwright.
7. **Comportement natif d'abord** : la modale s'appuie sur `<dialog>` et `showModal()`, qui rendent le reste de la page inerte et ferment sur Échap. Le code ajoute seulement l'ouverture, la fermeture et le retour du focus au déclencheur.
8. **CSS en `@layer components`, classes BEM préfixées `bui-`**, variables `--bui-*` seulement. La couche s'insère dans l'ordre des couches de Tailwind v4 et reste en dessous du CSS non étagé des applications.

## Alternatives envisagées

- **Un paquet par dépendance git** : impossible en Yarn 1 sans publier. Possible en pnpm (`&path:`) ou Yarn Berry (`workspace=`), mais les cinq dépôts sont en Yarn 1.
- **Build `dist/` versionné ou branche de publication** : un build à maintenir et des fichiers compilés dans l'historique, alors que les deux consommateurs React et Vue transpilent déjà leurs dépendances.
- **Storybooks composés (HTML, React, Vue)** : trois configurations, trois builds et des références croisées à servir. Le test de parité garantit déjà que React et Vue produisent le balisage de référence, un seul Storybook suffit à montrer le comportement de chacun.
- **Un Storybook React qui rend le HTML par `dangerouslySetInnerHTML`** : même bricolage dans l'autre sens, en faisant de React le centre alors que la référence est le HTML.
- **Style Dictionary pour les tokens** : une dépendance et une configuration pour cinq sorties qu'une centaine de lignes de TypeScript produisent.
- **Attributs `data-force` dans le CSS pour forcer survol et focus** (choix du boilerplate SvelteKit) : ils polluent le CSS livré. L'addon réécrit les pseudo-classes dans le Storybook seulement.
- **Piège du focus écrit à la main** : redondant avec `showModal()`.

## Conséquences

- Les consommateurs Next et Nuxt doivent déclarer la transpilation du paquet. SvelteKit, Symfony et vanilla consomment le CSS, les tokens et le JS natif sans transpilation.
- Les composants React et Vue ne peuvent pas s'importer entre paquets (la consommation git ne crée pas les liens de workspace) : le type des noms d'icônes est généré dans chacun.
- Le composant icône utilise `/icons.svg` à la racine du site : le consommateur fusionne `packages/css/icons/icons.json` dans sa propre liste.
- Les points de rupture des tokens reprennent ceux de Tailwind (SvelteKit). Le thème MUI actuel en utilise d'autres (600, 1024, 1200, 1440) : l'adaptateur MUI les remplace si le boilerplate le reprend tel quel.
- Toute modification du balisage se fait en trois endroits (référence, React, Vue), et le test de parité refuse un écart.
- La racine est `private` (exigence des workspaces Yarn) : la publication npm se fera paquet par paquet.

## Suivi

À rouvrir si un boilerplate passe à pnpm ou Yarn Berry, si les paquets sont publiés sur npm (build `dist/` à envisager alors), ou si Storybook sait un jour mêler plusieurs frameworks dans une même instance.

## Statut

Proposée
