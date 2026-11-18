# ADR-0003. Structure des monorepos `neon-games` et `neon-tensors`

- **Statut** : Acceptée
- **Date** : 2026-11-18
- **Contexte** : plan de consolidation `PLAN-CONSOLIDATION-NEON.md`, phase 2 et 3

## Contexte

Deux monorepos doivent héberger des familles de projets aux besoins différents mais partageant un socle (composants communs, thème Neon, utilitaires).

## Décision

1. **`neon-games`** : base `boilerplate-html`, workspaces/packages `apps/`, `packages/` (`ui`, `theme-neon`, `shared`), `docs/adr/`, `assets/`, `README.md`.
2. **`neon-tensors`** : même socle, `apps/portal/`, `apps/fear-greed/`, `apps/baseball/`, `services/<app>/` selon ADR-005.
3. Conventions partagées : ADRs dans `docs/adr/` référençant les ADR communs de `boilerplates-commun`.

## Alternatives envisagées

- **Un monorepo par application** : rejeté, la consolidation est justement de réduire le nombre de dépôts.
- **Une seule structure pour les deux monorepos sans différence** : rejetée, les jeux et les apps Tensor n'ont pas le même socle (canvas/HTML vs front + backend Render).

## Conséquences

- Les deux monorepos partagent le même socle technique et le même thème.
- Les conventions (ports, QA, ADRs) doivent être consignées pour ne pas diverger.

## Suivi

ADR-004 (jeux) et ADR-005 (Tensor) côté monorepos.

## Statut

Acceptée — 2026-11-18
