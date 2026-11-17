# ADR-0005. Qualité, cohérence : gabarits README, QA/a11y, vignettes/assets

- **Statut** : Acceptée
- **Date** : 2026-11-18
- **Contexte** : plan de consolidation `PLAN-CONSOLIDATION-NEON.md`, phase 4

## Contexte

Les monorepos doivent être livrés avec des READMEs homogènes, une QA/a11y, des vignettes/assets harmonisés, et des ADRs complétés.

## Décision

1. **Gabarits README** : un gabarit commun pour les monorepos et les applications.
2. **QA/a11y** : le shell 100vh / cadre identique doit passer les vérifications (pas d'overflow, centrage, options latéraux).
3. **Vignettes/assets** : préviews harmonisées (`preview.svg`, vignettes de portail).

## Alternatives envisagées

- **Vignettes par jeu non harmonisées** : rejetée, elles sont référencées dans l'inventaire.

## Conséquences

- Chaque jeu migré dans `neon-games` doit conserver une vignette exploitable et un README.
- La QA du shell est un prérequis de validation (Phase 4).

## Suivi

À compléter avec les ADR-004 / ADR-005 côté monorepos.

## Statut

Acceptée — 2026-11-18
