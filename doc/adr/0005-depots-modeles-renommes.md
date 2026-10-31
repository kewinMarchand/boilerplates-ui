# 0005 — Dépôts modèles renommés `boilerplate-<techno>`

- **Statut** : Acceptée. Remplace le point « les dépôts modèles gardent leur nom » de l'[ADR 0003](0003-plus-de-kit-de-composants-tiers.md)
- **Décideurs** : Kewin Marchand (31/10/2026)

## Contexte

L'ADR 0003 a retiré MUI de Next et Vuetify de Nuxt. Elle a gardé le nom des dépôts modèles parce que les outils qui créent les projets le citent, et elle a noté le coût : « les noms `next-mui-…` et `nuxt-vuetify-…` ne décrivent plus le contenu ». Depuis, SvelteKit a abandonné son kit local pour la couche Svelte (ADR 0004). Les cinq noms décrivent maintenant une pile qui n'existe plus : `next-mui-query-boilerplate`, `nuxt-vuetify-query-boilerplate`, `sveltekit-tailwind-query-boilerplate`, `symfony-twig-stimulus-boilerplate`, `html-css-vanilla-boilerplate`.

Le nom des dépôts est cité à plusieurs endroits : les outils de l'agence qui créent les dépôts clients (`client`, `donnees-fictives`), les miroirs du Forgejo local dont ces dépôts sont des forks, l'inventaire de l'installation, la spec commune, les README et les noms d'images Docker.

## Décision

Les cinq dépôts modèles s'appellent désormais `boilerplate-<techno>`, d'après leur framework seulement :

| Ancien nom                             | Nouveau nom           |
| -------------------------------------- | --------------------- |
| `next-mui-query-boilerplate`           | `boilerplate-next`    |
| `nuxt-vuetify-query-boilerplate`       | `boilerplate-nuxt`    |
| `sveltekit-tailwind-query-boilerplate` | `boilerplate-svelte`  |
| `symfony-twig-stimulus-boilerplate`    | `boilerplate-symfony` |
| `html-css-vanilla-boilerplate`         | `boilerplate-html`    |

`boilerplates-ui` et `boilerplates-commun` gardent leur nom : ils servent les cinq modèles.

Le renommage s'applique partout en même temps : dépôts GitHub, dossiers de `~/Applications`, miroirs `agence/*` du Forgejo local, outils de l'agence, inventaire de l'installation, spec commune, et contenu des dépôts (nom du paquet, README, ligne de démarrage du serveur, images Docker).

## Alternatives envisagées

- **Garder les anciens noms** (ADR 0003) : chaque lecteur est trompé sur la pile, et l'écart grandit à chaque retrait de dépendance. Rejeté.
- **Mettre à jour le nom avec la pile actuelle** (`next-query-boilerplate`…) : le nom resterait faux à chaque changement de dépendance. Rejeté.
- **Mettre le suffixe `-boilerplate` à la fin** (`next-boilerplate`) : les modèles seraient dispersés dans la liste alphabétique des dépôts, au lieu d'être regroupés avec `boilerplates-ui` et `boilerplates-commun`. Rejeté.

## Conséquences

- **Positives** :
  - le nom dit le framework, et rien qui puisse devenir faux ;
  - les sept dépôts du chantier se suivent dans les listes.
- **Négatives / coûts** :
  - GitHub redirige les anciennes adresses, mais seulement tant qu'aucun dépôt ne reprend un ancien nom sur le compte ;
  - les miroirs Forgejo tirent encore leur source des anciennes adresses GitHub, grâce à cette redirection ; l'adresse ne se change que depuis les réglages du miroir ;
  - Docker Compose nomme les volumes et les images d'après le dossier ou le projet : les volumes `node_modules` et les images sont recréés au premier lancement, et les anciens sont à supprimer à la main ;
  - les projets déjà créés à partir des modèles gardent leur nom et leur remote `boilerplate` ou `upstream`, qui passe par la redirection.
- **Suivi** : rouvrir si un modèle change de framework, ou si un deuxième modèle sur le même framework apparaît (il faudrait alors un qualificatif).
