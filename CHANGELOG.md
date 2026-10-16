# Journal des versions

Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/). Versions en [SemVer](https://semver.org/lang/fr/).

## Non publié

### Ajouté

- Bouton et bouton-lien : option `fullWidth` (référence, React et Vue), qui occupe toute la largeur du conteneur. Classes `bui-button--full-width` et `bui-link--full-width`.
- Champ texte et zone de texte : option `placeholder` dans la référence (`TextFieldOptions`, `TextAreaOptions`), rendue à l'identique en React et Vue (test de parité).

### Storybook

- Toutes les props publiques des composants pilotables dans le panneau Controls, avec la liste exacte des valeurs acceptées. Les identifiants passent par les `args`, et la modale expose `side`.
- Actions sur les évènements : `onClick`, `onChange`, `onSelect`, `onSort`, `onClose`.
- Props triées par ordre alphabétique dans le panneau Controls.
- Bouton : ligne `inverse` dans « Toutes les variantes ».

## 0.5.0

### Ajouté

- Puce (`chip()`, `Chip` en React et Vue) : lien ou bouton, puce de la page courante (`aria-current="page"`), filtre retirable (`removable`). Liste de puces par la classe `bui-chip-list`.
- Bouton-lien (`linkButton()`, `LinkButton` en React et Vue) : un `<button>` à l'apparence de lien.
- Variante `nav` du bouton et du bouton icône : navigation sur fond primaire, page courante en gras souligné.
- Variantes `light` et `outline-light` du bouton, pour une photo. Tokens `on-image`, `on-image-text`, `on-image-hover` et `on-image-overlay`, sans valeur sombre : une photo ne change pas avec le thème.
- Option `current` du bouton en lien dans la référence (`aria-current="page"`).

## 0.4.1

### Corrigé

- Modale centrée par son propre `margin: auto` : un reset de site (`* { margin: 0 }`) annule celui du navigateur et la colle en haut à gauche. Le tiroir garde sa marge.

## 0.4.0

### Ajouté

- Mode sombre sur demande du site (ADR 0002) : `data-color-scheme="dark"` ou `"auto"` sur l'élément racine. Une valeur sombre pour chaque couleur (`dark` dans `tokens.ts` et `tokens.json`), jamais appliquée en mode renforcé ni sans l'attribut. Contrastes AA vérifiés par les tests.
- Storybook : outil « Thème » (clair, sombre) dans la barre ; axe passe chaque histoire en sombre aussi.

## 0.3.0

### Ajouté

- Couleur secondaire complète : tokens `secondary-dark`, `on-secondary`, `secondary-surface-subtle`, `secondary-surface`, `secondary-surface-strong`, valeurs du mode renforcé, contrastes vérifiés par les tests (4.5:1 et 7:1). Thème MUI : `secondary.dark` et `secondary.contrastText`.
- Variante `secondary` du bouton icône, du badge et de l'avatar.
- Composant texte (`text()`, `Text` en React et Vue) : `h1` à `h4`, `title`, `lead`, `body`, `body-sm`, `caption`, `overline`, élément rendu changeable par `as`. Tokens de taille `h3`, `h4`, `lead`, `caption` ; thème MUI `h3`, `h4`, `h5`, `subtitle1`, `caption`.
- Transitions : fondu et léger zoom de la modale, translation et fondu du tiroir, apparition du menu, de l'info-bulle et du toast, dépliage de l'accordéon (navigateurs qui exposent `::details-content`). Tokens `motion-duration-slow` et `motion-easing`, coupés en mode renforcé et sous `prefers-reduced-motion`.
- Ombres `shadow-sm` et `shadow-lg`.

### Modifié

- Bouton secondaire : plein, sur la couleur secondaire (il était sur une teinte claire de la primaire).
- Menu déroulant : l'option active au clavier est surlignée et marquée d'une barre, au lieu d'un anneau.
- Badge sans contour : le fond teinté suffit.
- Pagination : numéros soulignés au survol seulement ; sous 640 px, « Précédent » et « Suivant » sont masqués à la vue (flèche seule, nom accessible inchangé), pour tenir sur une ligne.
- Toast et menu : ombre `lg` au lieu de `xl`.
- Alerte et toast : bande de gauche droite (rayons logiques), action alignée au centre quand l'alerte n'a pas de titre.
- Champ en erreur : bordure épaissie par une ombre intérieure, sans décaler la mise en page.
- Onglets : le trait de l'onglet actif recouvre le filet de la liste.
- **Marges retirées** des paragraphes et listes du corps de la carte et du corps de l'alerte (`:where()`, spécificité nulle) : un site qui comptait dessus doit les redonner.
- Squelette : deux lignes de texte successives sont espacées.

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
