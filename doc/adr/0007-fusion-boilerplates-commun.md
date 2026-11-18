# ADR 0007 — Fusion de `boilerplates-commun` dans `boilerplates-ui`

- Statut : Acceptée
- Date : 2026-11-18

## Contexte

`boilerplates-ui` est déjà un monorepo Yarn (`packages/*`, `apps/*`) consommé par
les boilerplates via une dépendance git pointant sur la racine du dépôt.
`boilerplates-commun` portait la spécification commune, l'architecture DDD, les
ADR historiques et les médias partagés. Deux dépôts séparés obligeaient à
maintenir des chemins locaux (`~/Applications/boilerplates-commun/...`) dans la
documentation et à synchroniser deux historiques.

## Décision

Importer `boilerplates-commun` dans `boilerplates-ui` sous `packages/commun/`
avec `git subtree add` (l'historique est conservé), et l'enregistrer comme
workspace via un `package.json` privé. Les références de chemins dans le README,
`CLAUDE.md` et la spec elle-même passent en chemin relatif au dépôt.

Le dépôt garde son nom et sa racine : `exports`, `files`, la dépendance git
`github:kewinMarchand/boilerplates-ui#<tag>` et le Storybook publié sur Pages
restent inchangés. L'ancien dépôt `boilerplates-commun` n'est pas supprimé dans
cette décision (des liens externes peuvent encore y pointer).

## Conséquences

- Un seul dépôt à cloner et une seule CI pour la bibliothèque et la spec.
- `make install` couvre aussi le workspace `commun`.
- Les ADR de `packages/commun/doc/adr/` restent ceux de l'ancien dépôt ; les
  nouvelles décisions continuent dans `doc/adr/` à la racine.
- Les consommateurs n'ont aucune migration à faire.
