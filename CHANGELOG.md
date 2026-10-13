# Journal des versions

Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/). Versions en [SemVer](https://semver.org/lang/fr/).

## 0.2.0

### Ajouté

- Déclarations TypeScript du paquet `vanilla` (`packages/vanilla/types`), générées depuis les JSDoc et vérifiées par `make qa`.
- Bouton : variante `inverse` pour fond sombre ou primaire, avec focus visible, option `iconPosition` (`start` ou `end`) et option `href` qui rend un `<a>`.
- Alerte : emplacement `action`.
- Icône : taille `sm`, `md`, `lg` et nom accessible dans la référence.
- Thème Tailwind : largeurs de conteneur (`--container-*`).
- Carte : média en `<picture>`.
- Classes d'états forcés `bui-is-hover`, `bui-is-focus`, `bui-is-active` pour les chartes graphiques.
- Test d'ordre à l'écran des champs (libellé, aide, contrôle, erreur) en HTML, React et Vue, dans les deux modes.

### Corrigé

- `box-sizing: border-box` sur les blocs `bui-*` : champs et boutons en lien gardaient 44 px de contenu plus leur marge intérieure sans reset du site.
- Espace avant « (obligatoire) » sur la case à cocher.

### Storybook

- Plan de travail blanc (surface des tokens) sur le fond gris de l'aperçu, en mode standard et renforcé.
- Une vue d'ensemble par famille, en tête de la famille, avec un lien vers chaque page détaillée (vérifié par un test).

### Modifié

- Séparateur : trait en `--bui-color-border` (4,8:1 sur blanc) au lieu de `border-subtle` (1,2:1), pour passer le critère WCAG 1.4.11.

- Champ `files` : ajoute `packages/css/reference` (cité par le README) et les types vanilla.

## 0.1.0

Première version : tokens et adaptateurs (MUI, Vuetify, Tailwind), 37 composants en HTML et CSS, JS natif, React et Vue, Storybook avec tests axe et tests de comportement clavier.
