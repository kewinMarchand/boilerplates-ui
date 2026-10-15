# 0002 — Mode sombre sur demande du site

- **Statut** : Acceptée
- **Date** : 2026-10-15
- **Décideurs** : Kewin Marchand

## Contexte

Sans ce jeu, les tokens portent un thème clair et les surcharges du mode renforcé, rien de plus. Le boilerplate vanilla a un mode sombre (`color-scheme: light dark` et `light-dark()`), forcé en clair en mode renforcé ; les autres boilerplates n'en ont pas. Pour intégrer la bibliothèque dans vanilla sans lui retirer son mode sombre, le mode sombre vit dans la bibliothèque (choix de Kewin, 15/10/2026), et tous les fronts peuvent en profiter.

Contraintes : les composants ne lisent que des variables `--bui-*`, les quatre autres boilerplates s'affichent en clair (fonds de MUI, de Vuetify et du site), et le mode renforcé (section 4 de la spec commune) reste en clair, à contraste renforcé.

## Décision

On ajoute un jeu de couleurs sombres aux tokens, appliqué seulement quand le site le demande.

- `tokens.ts` exporte `dark` : une valeur pour chaque couleur, reprise du mode sombre de vanilla et convertie en hexadécimal comme le reste.
- `tokens.css` pose ces valeurs sous `[data-color-scheme="dark"]` (sombre forcé), et sous `[data-color-scheme="auto"]` dans `@media (prefers-color-scheme: dark)` (le système décide), avec `color-scheme: dark`. Les deux sélecteurs excluent `[data-a11y-mode="enhanced"]` : le mode renforcé reste en clair.
- `tokens.json` expose `dark` pour les adaptateurs qui en auraient besoin. Les thèmes MUI et Vuetify générés restent en clair : aucun des deux boilerplates ne propose de mode sombre.
- Les contrastes AA des paires texte et fond des composants sont vérifiés par les tests du générateur, comme en clair et en renforcé ; axe passe chaque histoire du Storybook en sombre (outil « Thème » de la barre).

## Alternatives envisagées

- **Sombre automatique pour tous** (`@media (prefers-color-scheme: dark) { :root { … } }`) : un utilisateur en système sombre verrait les composants sombres sur les fonds clairs de MUI, de Vuetify ou du site. Rejeté.
- **`light-dark()` dans chaque token** : impose `color-scheme: light dark` à tout site qui charge les tokens, avec le même effet que ci-dessus, et ne sait pas exclure le mode renforcé sans sélecteur supplémentaire.
- **Garder le sombre dans vanilla seulement**, ses couleurs claires en alias des tokens et ses couleurs sombres écrites à la main : plus rapide, mais deux sources de couleurs et rien pour les autres fronts.

## Conséquences

- **Positives** :
  - un site active le sombre par un seul attribut sur son élément racine ; sans lui, rien ne change ;
  - les composants passent en sombre sans une ligne de CSS de plus : ils ne lisent que des variables ;
  - les contrastes sombres sont testés au même titre que les autres.
- **Négatives / coûts** :
  - chaque nouvelle couleur demande trois valeurs (clair, renforcé, sombre), et les déclarations sombres sont écrites deux fois dans `tokens.css` (sombre forcé et automatique) ;
  - la variante `inverse` du bouton suit `on-primary`, qui devient foncé en sombre : sur une photo assombrie, le site garde un texte clair lui-même ;
  - les couleurs personnalisées de la barre du Storybook dérivent leurs surfaces vers le blanc, pensées pour le clair.
- **Suivi** : rouvrir si un front à kit natif (MUI, Vuetify) demande le sombre : il faudra alors générer un schéma sombre pour son thème.
