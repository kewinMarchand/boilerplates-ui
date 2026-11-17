# ADR-0001. Consolidation des projets Neon en monorepos

- **Statut** : Acceptée
- **Date** : 2026-11-18
- **Contexte** : plan de consolidation `PLAN-CONSOLIDATION-NEON.md`

## Contexte

Le périmètre Neon (jeux d'arcade, portail, applications Tensor) est aujourd'hui déployé comme un **ensemble de dépôts GitHub unitaires**, chacun avec sa propre copie du thème :

- portails : `neon-arcade` (jeux), `neon-tensor` (Tensor) ;
- jeux : `neon-invaders`, `neon-breaker`, `neon-columns`, `neon-drift`, `neon-runner`, `neon-defender`, `neon-mines`, `neon-serpent`, `neon-orbiter` ;
- applications Tensor : `neon-fear-greed-tensor`, `neon-baseball-tensor`.

Chaque dépôt porte sa propre copie de `neon/` (`neon-tokens.css`, `neon-base.css`, `neon-components.css`) et de ses propres styles/previews, alors qu'un **thème unique** (`boilerplate-neon`) vient d'être extrait. Les jeux vivent chacun dans leur propre cadre (viewport, layout, options), sans gabarit commun.

Le plan de consolidation vise à regrouper les projets **Neon** en deux monorepos, avec des nouvelles URLs, sans redirections, et une stratégie de duplication puis de suppression des doublons.

## Décision

1. **Deux monorepos** :
   - `neon-games` : portail (`apps/portal/`) + 9 jeux (`apps/games/<slug>/`), base `boilerplate-html`.
   - `neon-tensors` : portail (`apps/portal/`) + applications (`apps/fear-greed/`, `apps/baseball/`), backends Render conservés.
2. **Nouvelles URLs** : GitHub Pages des monorepos, nouvelles adresses (ex. `https://kewinmarchand.github.io/neon-games/`), sans redirection depuis les anciennes URLs.
3. **Duplication puis suppression** : migrer/copier les sources dans les monorepos, valider, puis **supprimer les dépôts doublons** à la toute fin (seule étape nécessitant une confirmation utilisateur explicite).

## Alternatives envisagées

- **Un seul monorepo pour tout** : rejeté, le périmètre jeux / apps Tensor évolue différemment et mérite deux contexts séparés.
- **Suppression immédiate des dépôts sources** : rejetée, la validation avant suppression est obligatoire.
- **Garder une seule structure par type de projet sans monorepo** : rejetée, la duplication interminable des thèmes/styles est le problème à résoudre.

## Conséquences

- Les anciennes URLs/repos restent **actuels** pendant la transition (coexistence, pas de redirections).
- Chaque jeu migré doit respecter le **shell 100vh / cadre identique / zone de jeu centrée / panneaux latéraux** défini dans le plan.
- Les composants UI réutilisables partent vers les **composants communs** (`boilerplates-ui`) avec le **thème Neon** attaché (`boilerplate-neon` / `theme-neon`) — pas de composants « Neon » dédiés.
- La suppression finale des doublons est conditionnée à la confirmation explicite de l'utilisateur (Phase 4, étape 4).

## Suivi

À référencer dans les ADR-002 (composants + thème), ADR-003 (structure des monorepos), ADR-006 (déploiement / suppression).

### Tableau de correspondance thème / composants

| Fichier CSS source Neon | Nature | Cible |
|---|---|---|
| `neon-tokens.css` | tokens (couleurs, fonds, accents, typo, rayons, ombres, focus) | variables du thème `theme-neon` (tokens) |
| `neon-base.css` | styles de base / reset visuel | tokens + composant générique de layout |
| `neon-components.css` | composants visuels Neon | composants communs `boilerplates-ui` + overrides du thème |

## Statut

Acceptée — 2026-11-18 — commit `PLAN-CONSOLIDATION-NEON.md` (plan de référence)
