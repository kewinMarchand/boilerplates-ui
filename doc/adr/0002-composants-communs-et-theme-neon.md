# ADR-0002. Composants communs et thème Neon attaché

- **Statut** : Acceptée
- **Date** : 2026-11-18
- **Contexte** : plan de consolidation `PLAN-CONSOLIDATION-NEON.md`, phase 1

## Contexte

Avant la consolidation, chaque projet Neon duplique son UI : tokens (`neon-tokens.css`), base (`neon-base.css`) et composants (`neon-components.css`) dans chaque dépôt, plus un code de composants réinventé par jeu/portail.

Décision prise dans le plan : **pas de composants « Neon »**. On utilise les **composants communs** issus de `boilerplates-ui` (alignés sur `packages/tokens`, `packages/css`, composants vanilla génériques) auxquels on **attache un thème** (`theme-neon` : tokens / variables CSS / overrides).

## Décision

1. **Composants communs** : `boilerplates-ui` (`packages/tokens`, `packages/css`, composants vanilla génériques : layout/shell, carte, lien, bouton, repo-link, panneau de score/options, etc.).
2. **Thème Neon** : paquet/couche `theme-neon` fournissant tokens et overrides (variables CSS : couleurs, fonds, accents, typo, rayons, ombres, focus, etc.) appliqués aux composants communs pour obtenir le rendu Neon. Le thème est **interchangeable/attachable**, il ne définit pas de composants métier.
3. **Migration** : mapper le CSS actuel (`neon-tokens.css`, `neon-base.css`, `neon-components.css`) vers (1) tokens/variables de thème, (2) composants communs existants ou génériques à ajouter dans `boilerplates-ui`.
4. **Règle** : toute nouvelle brique UI = composant générique dans le paquet commun ; toute identité visuelle Neon = thème/tokens.

## Alternatives envisagées

- **Un composant « Neon » dans chaque monorepo** : rejeté, cela recréerait une bibliothèque dupliquée et ferait du thème une brique métier.
- **Garder les fichiers CSS `neon-*` en l'état** : rejeté, la duplication est le problème central du plan.

## Conséquences

- Les monorepos consomment `packages/ui` (composants) + `packages/theme-neon` (thème) — plus un seul `neon/` par projet.
- Les tokens du thème se déclinent en variables CSS (`--neon-*` ou via le thème attaché).
- Les composants communs dupliqués (si besoin) sont remplacés par des composants génériques testés dans `boilerplates-ui`.

## Suivi

Détaillé dans le plan (Phase 1 — Socle commun) et dans les ADR-001 / ADR-006.

## Statut

Acceptée — 2026-11-18
