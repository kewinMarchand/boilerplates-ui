# 0004 — Couche de composants Svelte

- **Statut** : Acceptée
- **Introduite par** : version `v0.11.0`
- **Décideurs** : Kewin Marchand (31/10/2026)
- **Amende** : ADR 0003, pour SvelteKit seulement

## Contexte

L'ADR 0003 retire les kits tiers et répartit les couches : Next prend les composants React, Nuxt les composants Vue, et SvelteKit, Symfony et le site HTML le balisage CSS et le comportement vanilla.

Pour SvelteKit, ce partage n'a pas tenu. Le boilerplate garde un kit local de treize composants Svelte (bouton, alerte, champ, tiroir…). Ils recopient les classes `bui-*` et appellent le comportement vanilla, mais aucun test ne les compare au balisage de référence. La spec commune (section 20) interdit pourtant tout composant local pour la bascule du thème, et le kit local suit la bibliothèque à la main : il est resté sur la version 0.5.0.

React et Vue, eux, ont leurs composants dans la bibliothèque, vérifiés par le test de parité et par axe dans Storybook.

## Décision

La bibliothèque gagne une couche Svelte, `packages/svelte` (`@kewinmarchand/boilerplates-ui/svelte`), au même niveau que React et Vue :

- composants Svelte 5 (runes, snippets), même liste et même API que Vue, aux conventions de Svelte près : contenu par `children` et snippets nommés (`action`, `footer`, `media`), événements par props de rappel (`onclick`, `onselect`, `onclose`), valeurs liées par `bind:value` ;
- chaque cas du test de parité porte un rendu Svelte (`svelte/server`), comparé à la même référence que React et Vue ;
- une histoire Svelte par composant dans Storybook, et les scénarios de comportement d'accessibilité joués aussi sur Svelte.

Le boilerplate SvelteKit remplacera son kit local par cette couche (lot B3). Symfony et le site HTML gardent le balisage et le comportement vanilla, comme le prévoit l'ADR 0003.

## Alternatives envisagées

- **Garder le kit local de SvelteKit et modifier la spec** : treize composants hors de tout test de parité, à remettre à jour à chaque version de la bibliothèque. C'est l'écart que l'ADR 0003 voulait supprimer. Rejeté.
- **Composants Svelte par-dessus le comportement vanilla** (le script vanilla branche les menus, modales et onglets) : moins de code, mais deux modèles d'état dans la même page (runes et attributs posés par le script), et un rendu serveur qui ne sait rien de l'état ouvert ou coché. Rejeté : React et Vue tiennent leur état eux-mêmes, Svelte fait pareil.
- **Couche Astro** (évoquée le 30/10) : un composant `.astro` ne s'importe pas dans un composant Svelte. Elle ne servirait qu'à un futur boilerplate Astro (lot A1). Hors sujet ici.

## Conséquences

- **Positives** :
  - une seule source de composants pour Next, Nuxt et SvelteKit, vérifiée par la même référence ;
  - le kit local de SvelteKit disparaît, et sa bascule du thème peut se construire avec le menu de la bibliothèque.
- **Négatives / coûts** :
  - une troisième implémentation de chaque composant à écrire et à tenir à jour ;
  - de nouvelles dépendances de développement (`svelte`, `@sveltejs/vite-plugin-svelte`, `svelte-check`, `eslint-plugin-svelte`, `prettier-plugin-svelte`) ;
  - le test de parité tourne en environnement `node` (Vitest n'y compile Svelte que pour le serveur), avec un DOM `jsdom` créé par le test.
- **Suivi** : rouvrir si un composant ne peut pas produire le même balisage en Svelte qu'en React et Vue ; l'écart se règlerait alors dans la référence, pour les trois couches.
