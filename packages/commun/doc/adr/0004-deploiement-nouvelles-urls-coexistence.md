# ADR-0004. Déploiement, nouvelles URLs et coexistence puis suppression des doublons

- **Statut** : Acceptée
- **Date** : 2026-11-18
- **Contexte** : plan de consolidation `PLAN-CONSOLIDATION-NEON.md`, phase 4

## Contexte

Les monorepos `neon-games` et `neon-tensors` doivent être publiés (GitHub Pages, nouvelles URLs), sans redirections depuis les anciennes URLs. Les anciens dépôts et services Render sont conservés en **coexistence** ; la suppression des doublons est la dernière étape.

## Décision

1. **Nouvelles URLs** : GitHub Pages des monorepos, ex. `https://kewinmarchand.github.io/neon-games/` et `https://kewinmarchand.github.io/neon-tensors/`.
2. **Pas de redirections** : les anciennes URLs/repos restent telles quelles pendant la transition.
3. **Coexistence** : garder les anciens dépôts et services Render existants en place (duplication).
4. **Suppression des doublons** : dernière étape, après validation globale et confirmation explicite de l'utilisateur.

## Alternatives envisagées

- **Redirections HTTP** : rejetées (décision non négociable du plan).
- **Suppression immédiate** : rejetée (doit suivre une validation).

## Conséquences

- Les services Render devenus inutiles peuvent être supprimés après la suppression des doublons correspondants.
- Tout déploiement se fait sur les nouvelles URLs uniquement.

## Suivi

Coordonné avec l'ADR-001 (consolidation) et l'ADR-003 (structure).

### Convention d'URLs retenue

- Portail jeux : `/neon-games/`, jeux : `/neon-games/games/<slug>/` (figé en ADR-006).
- Portail Tensor : `/neon-tensors/`, apps : `/neon-tensors/apps/<app>/` (figé en ADR-006).

## Statut

Acceptée — 2026-11-18
