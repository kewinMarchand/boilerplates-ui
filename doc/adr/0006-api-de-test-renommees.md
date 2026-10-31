# 0006 — API de test renommées `boilerplate-<techno>`

- **Statut** : Acceptée. Étend l'[ADR 0005](0005-depots-modeles-renommes.md) aux deux API
- **Décideurs** : Kewin Marchand (31/10/2026)

## Contexte

L'ADR 0005 a renommé les cinq fronts, pas les deux API qu'ils lisent : `api-platform-test-api` et `hono-mongo-test-api`. Ces API servent aussi de modèles de départ côté back (`gh repo create --template`), et la seconde porte encore sa base de données dans son nom. La CI des fronts clone l'API Hono par son nom.

## Décision

Les deux API suivent le même schéma que les fronts :

| Ancien nom              | Nouveau nom                |
| ----------------------- | -------------------------- |
| `api-platform-test-api` | `boilerplate-api-platform` |
| `hono-mongo-test-api`   | `boilerplate-hono`         |

Renommées sur GitHub, dans `~/Applications`, sur le Forgejo local (miroirs `agence/*`), dans leur contenu (nom du paquet, projet Compose, images Docker), dans la CI et les README des fronts, et dans la spec commune.

## Alternatives envisagées

- **`boilerplate-hono-mongo`** : remet la pile dans le nom, ce que l'ADR 0005 a écarté. Rejeté.
- **Garder « test-api »** : les deux dépôts servent aussi de modèles back, pas seulement de bouchons pour les tests. Rejeté.

## Conséquences

- Le projet Compose de l'API Platform change de nom : son réseau devient `boilerplate-api-platform_default`, et sa base de développement repart d'un volume neuf.
- Mêmes coûts que l'ADR 0005 : redirection GitHub tant qu'aucun dépôt ne reprend un ancien nom, adresse source des miroirs Forgejo encore sur les anciennes adresses.
