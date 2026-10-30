# 0003 — Plus de kit de composants tiers

- **Statut** : Acceptée
- **Introduite par** : version `v0.7.0`
- **Décideurs** : Kewin Marchand (30/10/2026)

## Contexte

Jusqu'à la version 0.6, deux boilerplates gardaient un kit de composants tiers à côté de la bibliothèque : MUI pour Next, Vuetify pour Nuxt. La bibliothèque générait pour eux des adaptateurs (`mui.json`, `vuetify.json`) qui recopiaient les jetons dans leurs thèmes, en clair seulement.

Le mode sombre de la spec commune (section 20, décision du 29/10/2026 : le thème du système par défaut, une bascule système, clair ou sombre dans le header) change la donne. Les composants de la bibliothèque passent déjà en sombre par leurs variables (ADR 0002) ; les deux kits, eux, auraient demandé chacun un schéma sombre généré et un branchement propre sur `data-color-scheme`, avec le mode renforcé à garder en clair. C'était le « Suivi » de l'ADR 0002.

En parallèle, Vuetify ne convient pas à l'usage qu'en fait Nuxt, et la bascule du thème a besoin d'un menu à choix cochés que la bibliothèque n'a pas encore : un composant de plus à maintenir en double si les kits restent.

## Décision

On n'utilise plus aucun kit de composants tiers dans les boilerplates : chacun prend ses composants dans cette bibliothèque (section 19 de la spec commune).

- Next utilise les composants React, Nuxt les composants Vue, SvelteKit, Symfony et le site HTML le balisage CSS et le comportement vanilla. Tailwind reste un outil de style de SvelteKit, branché sur les jetons par le preset.
- Les adaptateurs `mui.json` et `vuetify.json` sont retirés du générateur de jetons. Le preset Tailwind reste.
- Le menu déroulant gagne deux options, dans toutes les couches : `checked` (choix exclusifs, `role="menuitemradio"` et `aria-checked`, une coche devant l'option cochée ; le comportement vanilla coche lui-même le choix) et `triggerIcon` (déclencheur en bouton icône, le libellé devient son nom accessible). Les icônes Lucide `monitor` et `moon` entrent dans le sprite, à côté de `sun`.
- Les dépôts modèles gardent leur nom (`next-mui-query-boilerplate`, `nuxt-vuetify-query-boilerplate`), cité par les outils qui créent les projets.
- Les projets déjà créés à partir des modèles gardent leur kit et leur version figée de la bibliothèque. Une migration se décide projet par projet.

## Alternatives envisagées

- **Générer un schéma sombre pour MUI et pour Vuetify** (le suivi de l'ADR 0002) : deux thèmes de plus à tenir alignés sur les jetons, deux branchements de la bascule, et toujours deux sources de composants à côté de la bibliothèque. Rejeté.
- **Remplacer Vuetify par shadcn-vue** : ses composants sont copiés dans le projet, ce que la spec interdit (un composant manquant entre d'abord dans la bibliothèque) ; il ajoute Tailwind à Nuxt et une seconde famille de composants. Rejeté.
- **Remplacer Vuetify par Nuxt UI** : bien intégré à Nuxt et sombre d'origine, mais c'est encore un kit tiers à thémer depuis les jetons, avec Tailwind en plus. Rejeté.
- **Garder les adaptateurs pour les projets existants** : inutile, ces projets dépendent d'une version figée de la bibliothèque, qui les contient toujours.
- **Bascule du thème en groupe de boutons radio dans une fenêtre surgissante** : plus lourd qu'un menu, et un bouton qui ouvre un menu de choix est le motif attendu dans un header. Rejeté.

## Conséquences

- **Positives** :
  - une seule source de composants pour les cinq boilerplates, testée par la parité et par axe ;
  - le mode sombre et le mode renforcé viennent des jetons partout, sans thème à générer ni à basculer à part ;
  - Next peut garder ses composants côté serveur : les composants de la bibliothèque n'imposent pas de rendu client comme MUI et Emotion.
- **Négatives / coûts** :
  - les deux boilerplates sont à réécrire : 54 fichiers importent MUI dans Next, 23 utilisent Vuetify dans Nuxt ;
  - les briques de mise en page que MUI fournissait (`Box`, `Stack`, `Container`, `Typography`) deviennent du balisage et des classes, ou de nouveaux composants de la bibliothèque ;
  - les projets existants et leurs modèles divergent : remonter un correctif d'un projet vers son modèle demande une traduction ;
  - les noms `next-mui-…` et `nuxt-vuetify-…` ne décrivent plus le contenu ;
  - un projet existant qui fait monter la bibliothèque à 0.7 ou plus perd les adaptateurs de son kit.
- **Suivi** : rouvrir si un composant très complexe (grille de données, calendrier, éditeur riche) coûte trop cher à écrire dans la bibliothèque ; il entrerait alors comme dépendance ponctuelle, pas comme kit.
