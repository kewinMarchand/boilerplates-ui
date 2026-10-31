# Spécification commune des boilerplates

Architecture : voir `ARCHITECTURE-DDD.md` (décisions D1 à D12 acceptées). Vocabulaire : couche de routage, `views/`, `modules/<module>/{domain,application,infrastructure,ui}`, `shared/`.

S'applique à : boilerplate-next, boilerplate-nuxt, boilerplate-svelte, boilerplate-symfony, boilerplate-html (tous dans `~/Applications/`). Même contenu, mêmes routes, mêmes `data-testid` partout, pour que les suites e2e se ressemblent d'un dépôt à l'autre. Chaque stack l'implémente avec ses conventions natives. Aucune dépendance ajoutée sans justification dans le CLAUDE.md du dépôt.

Médias partagés, à copier dans les assets publics du dépôt sous `images/` (et supprimer tout ancien placeholder dégradé) :
`~/Applications/boilerplates-commun/shared-assets/` (photos de Kewin, EXIF et GPS retirés, et illustrations), chacune en `.avif` et `.webp`, ratio 16:9 : `hero-{640,1280,1920}` (jardin tropical), `slide-{1..5}-{640,1280}` (heliconia, anthurium, calliandra, strelitzia, nénuphar), `blog-{1..3}-{480,960}` (illustrations isométriques). Servir AVIF puis WebP (`<picture>` ou composant image du framework, `srcset`/`sizes`). Les composants image de Next et Nuxt peuvent partir de la plus grande variante. Supprimer les anciens `hero.webp` et `slide-N.webp` dégradés s'ils ont été copiés.

## 1. Layout

- Wrapper racine en `display: flex; flex-direction: column; min-height: 100vh`, `<main>` en `flex-grow: 1` : le footer reste collé en bas. Test e2e sur la 404 (bas du footer = bas du viewport, desktop et mobile).
- **Conteneur large** : largeur max du contenu **1440 px** (token unique des jetons de boilerplates-ui), gouttières 16 px mobile, 24 px tablette, 32 px desktop. Le header, le main et le footer partagent ce conteneur.
- **Le mode renforcé ne doit jamais casser le layout** : header qui passe à la ligne proprement (nav et toggle en `flex-wrap`, menu qui reste utilisable), aucun débordement horizontal. Test e2e obligatoire, dans les deux modes, à 375, 768 et 1280 px de large, sur chaque route : `document.documentElement.scrollWidth <= window.innerWidth`. Captures d'écran Playwright de l'accueil dans les deux modes et aux trois largeurs, à regarder réellement (Read sur le PNG) avant de déclarer fini.
- Header : skip link, nom du site, nav principale (`aria-current="page"`), bouton du mode accessibilité renforcée (section 4).
- Footer : `<nav aria-label="Liens légaux">` vers les 4 pages légales, puis nom du site.

## 2. Page d'accueil

Trois blocs, dans cet ordre, sous un seul `<h1>` :

1. **Hero pleine largeur** (`data-testid="home-hero"`), hors du conteneur (bord à bord, sous le header), hauteur `min(80vh, 720px)` desktop, `min-height` raisonnable mobile. Photo `hero-*` en fond couvrant (`object-fit: cover`) via une vraie `<img>`/composant image (pas de `background-image` CSS : l'image est le LCP), voile sombre dégradé pour garantir le contraste du texte (≥ 4.5:1 vérifié). Contenu aligné sur le conteneur 1440 : sur-titre court, `<h1>` (nom du site), accroche (description du site), deux CTA bien visibles (bouton plein vers `/taches`, bouton contour clair vers `/contact`, testids `home-tasks-link` et `home-contact-link`, ≥ 44 px). Image LCP : jamais lazy, priorité haute (`fetchpriority="high"` ou `priority`/`preload` du framework), `alt=""` (décorative), dimensions posées. En mode renforcé : voile opaque à 85 % pour un contraste AAA.
2. **Carrousel** (`<section aria-labelledby>` avec `<h2>` « À la une », `data-testid="home-carousel"`). Composant d'interface **sans métier** : en front il vit dans `shared/ui/carousel/` (reçoit ses slides en props). **Embla Carousel 8** (`embla-carousel` + l'adaptateur officiel de la stack : `embla-carousel-react`, `-vue`, `-svelte`, cœur vanilla pour Stimulus et le site HTML), importé uniquement dans ce wrapper. Glisser à la souris, swipe tactile, molette/trackpad. **Amélioration progressive** : sans JS, la piste reste en `overflow-x: auto` + `scroll-snap` (défilement natif), Embla prend la main au montage. 5 slides (photo + titre + texte court, données dans la vue `views/home/`), plusieurs slides visibles selon la largeur (1 mobile, 2 tablette, 3 desktop, via CSS). Boutons Précédent / Suivant (`data-testid="carousel-prev"` / `"carousel-next"`, `aria-controls` vers la piste, désactivés aux extrémités), points de pagination en `<button aria-label="Aller à la diapositive N" aria-current>` . Chaque slide en `role="group" aria-roledescription="diapositive" aria-label="N sur 5"`, conteneur `aria-roledescription="carrousel"`. **Pas d'autoplay.** Animation coupée (`duration` minimal) sous `prefers-reduced-motion: reduce` et en mode renforcé. Images lazy. Tests e2e : clic suivant fait avancer, précédent désactivé au début, **glisser à la souris** (`page.mouse` down/move/up) fait avancer, et un test sans JS (`javaScriptEnabled: false`) vérifie que la piste défile nativement.
3. **Grille de blog** (`<section>` `<h2>` « Derniers articles », `data-testid="home-blog"`). 3 cartes `<article data-testid="home-blog-card">` : illustration `blog-N` (lazy, `alt=""`), `<h3>`, extrait, `<time datetime>`. Pas de page détail (pas de lien mort). Grille CSS responsive (1 col mobile, 2 tablette, 3 desktop) ; `@container` sur la carte quand le design system le permet. Données : module `blog`, dépôt en mémoire dans `modules/blog/infrastructure/` pour l'instant, avec latence, **rendu serveur** (contenu SEO). Les 3 états s'appliquent (vide = message amical).

## 3. Pages légales

Vue `views/legal/` (pas un module : contenu statique sans métier, quatre pages). Routes et `<h1>` :

| Route | `<h1>` |
|---|---|
| `/mentions-legales` | Mentions légales |
| `/donnees-personnelles` | Données personnelles |
| `/accessibilite` | Déclaration d'accessibilité |
| `/plan-du-site` | Plan du site |

- Les informations éditeur viennent de la config du site (un seul fichier) : raison sociale, adresse, SIRET, directeur de publication, e-mail de contact, hébergeur (nom, adresse). Valeurs d'exemple explicitement fictives (« Exemple SAS », pas de lorem ipsum).
- Mentions légales : éditeur, directeur de publication, hébergeur, propriété intellectuelle.
- Données personnelles : responsable de traitement, finalité du formulaire de contact, base légale, durée de conservation, droits (accès, rectification, effacement, opposition), contact, réclamation CNIL. Mention : pas de cookie de mesure d'audience déposé.
- Accessibilité : modèle de déclaration RGAA 4.1.2. **État de conformité calculé depuis la config du site** (`accessibility: { auditDate: null, complianceRate: null, auditor: null }`) : aucun audit → « **non conforme** » avec la mention « aucun audit n'a encore été réalisé » (règle RGAA : non conforme si moins de 50 % ou sans audit en cours de validité) ; ≥ 50 % → partiellement conforme ; 100 % → totalement conforme. Test unitaire de ce calcul. Contenu : état, résultats (« tests automatisés axe-core uniquement, ils ne valent pas audit »), contenus non accessibles « à compléter après audit », environnement de test, retour d'information et contact, voies de recours (Défenseur des droits). Mention du mode accessibilité renforcée.
- Plan du site : liste de toutes les routes, générée depuis la config de navigation (une seule source, comme le sitemap).
- Les 4 pages entrent dans le sitemap, les ROUTES e2e, les URL Lighthouse et le test axe.

## 4. Mode accessibilité renforcée

- Bouton dans le header : `<button type="button" aria-pressed="true|false" data-testid="a11y-mode-toggle">` libellé « Accessibilité renforcée » (icône + texte visible, cible ≥ 44 px).
- État posé sur `<html data-a11y-mode="enhanced">`. Persisté en `localStorage` clé `a11y-mode` (valeur `enhanced`, absent sinon). Appliqué **avant le premier rendu** par un petit script inline dans `<head>` (pas de flash, compatible SSR). Lecture/écriture enveloppées dans try/catch.
- **Portée** : les espacements de texte (WCAG 1.4.12) et la marge après paragraphe s'appliquent **uniquement au texte de contenu dans `<main>`** (paragraphes, listes, définitions, cellules), jamais au header, à la nav, au menu de catégories, au fil d'Ariane, aux boutons, aux puces de filtres ni au footer. Interdits : sélecteurs globaux du type `body *`, `[data-a11y-mode] p` ou `* { line-height }`. Le chrome (header, nav, footer) ne reçoit que l'agrandissement de police, le contraste, le soulignement des liens et le focus épais, et doit garder **sa structure** (pas de marge ni de padding supplémentaires).
- Le nom du site dans le header n'est **pas** un `<p>` : c'est le texte du lien logo (section 8).
- **Test de non-régression** : à 1280 px, la hauteur du header en mode renforcé ne dépasse pas 1,4 × sa hauteur en mode normal (l'agrandissement de police est de 1,25), et le haut du `<h1>` de chaque page ne descend pas de plus de 1,4 × son décalage normal. Captures avant/après de l'accueil et de `/catalogue`, regardées réellement.
- Effets, uniquement en CSS sous `[data-a11y-mode="enhanced"]` (tokens surchargés, pas de logique dupliquée) :
  - taille de base 20 px (au lieu de 16) et échelle typographique proportionnelle ;
  - espacements WCAG 1.4.12 **sur le contenu de `<main>` seulement** : `line-height: 1.8`, `letter-spacing: 0.12em`, `word-spacing: 0.16em`, marge après paragraphe `2em` ;
  - contraste renforcé : texte `#000` sur `#fff`, couleur primaire assombrie (ratio ≥ 7:1, AAA) ;
  - liens toujours soulignés ;
  - focus visible épais (outline 4 px, offset 2 px) ;
  - animations et transitions coupées, `scroll-behavior: auto` ;
  - longueur de ligne max `70ch` sur le texte courant.
- Tests : unitaire du toggle (état et `aria-pressed`), e2e : activation pose l'attribut, persiste après rechargement, désactivation le retire (présence ET absence). Le test axe tourne sur chaque route **dans les deux modes**.

## 5. Qualité (rappel, déjà dans le modèle)

- Lighthouse CI (`@lhci/cli`) : perf ≥ 0.9, a11y = 1, SEO = 1, sur toutes les routes y compris légales. `numberOfRuns: 3` (médiane, les runners GitHub sont bruités), seuil bloquant en local et en CI. Images LCP en priorité haute, jamais lazy, `sizes` justes, catalogue compris.
- Test automatique d'accessibilité : Playwright + `@axe-core/playwright`, tags `wcag2a wcag2aa wcag21a wcag21aa`, sur chaque route, desktop et mobile, deux modes.
- `make qa`, `make test-e2e`, `make test-a11y`, `make metrics` réellement exécutés et verts.

## 6. API commune (phase suivante, ne pas brancher tout de suite)

Ressources ajoutées : `GET /api/categories` (arbre), `GET /api/products` (filtres, tri, pagination et compteurs de facettes, section 11).

Dépôt `~/Applications/boilerplate-api-platform` (API Platform 4 + PostgreSQL, port 8090). Ressources : `GET /api/tasks`, `GET /api/articles`, `POST /api/contact_messages` (422 avec messages français). En-tête `X-Scenario: error|empty` en dev/test. OpenAPI à `/api/docs.jsonopenapi`. Les fronts garderont leurs dépôts en mémoire tant que l'API n'est pas livrée : la couche `api/` des domaines est la seule à changer au branchement.

Seconde API au **contrat identique** : `~/Applications/boilerplate-hono` (Hono + zod + MongoDB, port 8091), même OpenAPI à `/api/docs.jsonopenapi`, vérifiée par `make contract`. Au branchement, chaque front choisit l'une ou l'autre par une seule variable d'URL d'API (8090 par défaut), sans autre changement de code.

**Branchement.**

- `API_URL` choisit l'API (8090 API Platform par défaut, 8091 Hono), sans autre changement de code.
- Types générés depuis l'OpenAPI par `make api-types`, consommés seulement par un client typé et une couche anti-corruption par module dans `infrastructure/http/` (ARCHITECTURE-DDD 4.3.4). Les composants ignorent le contrat. Les violations 422 du contact sont relayées vers les champs du formulaire.
- L'adaptateur en mémoire quitte le code de production.
- Tests : la CI e2e démarre une vraie API (`boilerplate-hono`, dépôt public, `make up`) et les états d'erreur et de liste vide passent par `X-Scenario`. En local, l'API de son choix est lancée à côté, le front la joint par `API_URL`.

## 7. Ports

| Dépôt | dev | e2e Playwright | Lighthouse |
|---|---|---|---|
| boilerplate-next | 3000 (publié par `DEV_PORT`, ex. `DEV_PORT=3160 make up` quand un autre projet occupe 3000) | 3100 | 3200 |
| boilerplate-nuxt | 3010 | 3110 | 3210 |
| boilerplate-svelte | 5173 | 3120 | 3220 |
| boilerplate-symfony | 8095 | 8095 | 3230 |
| boilerplate-html | 3130 | 3130 | 3250 |
| boilerplate-api-platform | 8090 | | |
| boilerplate-hono | 8091 | | |

Depuis la section 18, les tests et Lighthouse tournent dans le conteneur : leurs ports (3100 à 3250, faux GlitchTip 3231) sont internes au conteneur, sauf pour Symfony, vanilla et Hono dont le service `node` ou `contract` est sur le réseau de la machine. Seul le port de dev est publié. Un port de dev pris par un autre service se déplace par variable (`DEV_PORT` en Next et Nuxt, `HTTP_PORT` en Symfony).

Ports pris sur la machine de l'auteur par d'autres services, à ne pas réattribuer : 2283 (Immich), 3000 (autre projet), 3030 (Forgejo), 3090 (LibreChat), 3100 et 3101 (Paperclip), 4533 (Navidrome), 8000 (GlitchTip), 8010 (Kimai), 8020 (Dolibarr), 8025 (Mailpit), 8030 (Matomo), 8040 (Teable), 8065 (Mattermost), 8070 (code-server), 8080 (open-webui), 8081 (HortusFox), 8085 (Lighthouse CI), 8092 (ntfy), 8093 (IA locale), 8096 (Jellyfin), 8097 (Linkwarden), 8100 (Tolgee), 8105 (Documenso), 8110 (Formbricks), 8115 (Docmost), 8200 (Windmill), 8300 (Nextcloud), 8444 (ntfy Tailscale), 8888 (SearXNG), 9001 (Penpot), 34400 (xTeVe).

## 8. Logo, favicons et images de partage

Fichiers dans `shared-assets/brand/` : `logo-mark.svg` (pictogramme feuille, 64×64), `favicon.svg`, `favicon.ico` (16/32/48), `apple-touch-icon.png` (180), `icon-192.png`, `icon-512.png`, `og-image.jpg` (1200×630).

- **Logo dans le header** : lien vers `/` (`data-testid="layout-logo"`), pictogramme SVG `aria-hidden="true"` (inline ou `<img alt="">`) + nom du site en **texte HTML** (pas de texte vectorisé). Nom accessible du lien = nom du site. Sur l'accueil, le lien garde son `href` mais porte `aria-current="page"`. Le pictogramme est aussi repris en petit dans le footer.
- **Favicons et manifeste** : `<link rel="icon" href="/favicon.ico" sizes="48x48">`, `<link rel="icon" href="/favicon.svg" type="image/svg+xml">`, `<link rel="apple-touch-icon" href="/apple-touch-icon.png">`, `manifest.webmanifest` (name, short_name, icons 192 et 512, `theme_color`, `background_color`, `lang: "fr"`, `start_url: "/"`, `display: "standalone"`). Utiliser les conventions natives du framework (fichiers `app/icon.svg`/`favicon.ico`/`manifest.ts` en Next, `useHead`/`app.head` en Nuxt, `app.html` en SvelteKit, `base.html.twig`, `<head>` statique en vanilla).

## 9. Fil d'Ariane

- Sur **toutes les pages sauf l'accueil** (un fil à un seul élément n'apporte rien), ainsi que la 404 (« Accueil › Page introuvable »).
- Composant unique dans le socle (`shared/ui/layouts` ou équivalent), alimenté par une **source unique** : la config de navigation + le titre fourni par la vue (catégorie, sous-catégorie pour le catalogue). Jamais recalculé à la main page par page.
- Balisage : `<nav aria-label="Fil d'Ariane" data-testid="layout-breadcrumb">` > `<ol>` > `<li>`, séparateurs en CSS (`::before`, `aria-hidden` implicite) et non en texte, dernier élément non cliquable avec `aria-current="page"`. Placé au-dessus du `<h1>`, dans le conteneur.
- **JSON-LD `BreadcrumbList`** injecté dans le `<head>` (ou en fin de body) de chaque page concernée, URL absolues depuis l'URL du site. Positions cohérentes avec le fil visible.
- Tests : unitaire du calcul du fil, e2e (présence sur une page interne, absence sur l'accueil, `aria-current` sur le dernier), et validation du JSON-LD (parse + `@type` + nombre d'éléments).

## 10. SEO : métadonnées injectées sur chaque page

Une fonction ou un composable unique (`shared/seo`) construit les métas à partir de la config du site et des données de la page. Chaque route les **injecte côté serveur** (jamais en JS client seul) :

- `<html lang="fr">`, `<title>` unique (gabarit `%s · Nom du site`, 50 à 60 caractères visés), `<meta name="description">` unique (120 à 160 caractères), `<link rel="canonical">` absolu, `<meta name="robots">`.
- Open Graph : `og:type`, `og:site_name`, `og:title`, `og:description`, `og:url`, `og:image` (absolue, `og-image.jpg` par défaut, image du produit/catégorie sinon), `og:image:width/height/alt`, `og:locale=fr_FR`. Twitter : `summary_large_image`, title, description, image.
- `theme-color`, favicons et manifeste (section 8).
- JSON-LD : `Organization` + `WebSite` sur l'accueil (logo absolu), `BreadcrumbList` (section 9), `ItemList` sur les pages catalogue (section 11).
- Pages de catalogue filtrées : la canonique pointe vers la page de catégorie **sans filtres ni tri** (pagination conservée : `?page=2` est canonique d'elle-même). Les combinaisons de facettes portent `robots: noindex, follow`.
- `sitemap.xml` : toutes les pages statiques + chaque catégorie et sous-catégorie, générés depuis les mêmes sources. `robots.txt` pointe vers le sitemap.
- **Test e2e SEO** paramétré sur chaque route : title présent et unique, description présente et de longueur 50 à 160, canonical absolue, og:title/og:description/og:image présents, JSON-LD parsable. Lighthouse SEO = 1 sur toutes les routes, catalogue compris.

## 11. Catalogue : liste de produits à facettes

Démo e-commerce fictive : une jardinerie de plantes tropicales. Visuels `shared-assets/products/product-{1..12}-{400,800}.{avif,webp}` (carrés). Module `catalog` (types `Catalog.Product`, `Catalog.Category`, `Catalog.Facet`, `Catalog.Query`). Le filtrage, le tri, le comptage disjonctif et la pagination des résultats sont des **règles de l'API** : dans un front, ils vivent dans l'adaptateur `modules/catalog/infrastructure/in-memory/` qui simule l'API (fonctions pures testées unitairement), jamais dans `domain/`. Le domaine du front porte ce qu'il possède : l'état de recherche dans l'URL (`CatalogQuery`), l'arbre et les chemins de catégories (`CategoryPath`), les prix (`Price`). Architecture détaillée : `ARCHITECTURE-DDD.md`.

**Arbre de catégories** (slugs, 3 niveaux pour exercer le menu en cascade) :
- `plantes-interieur` Plantes d'intérieur > `feuillages` Feuillages (> `monstera`, `fougeres`), `plantes-a-fleurs` Plantes à fleurs (> `anthurium`, `strelitzia`)
- `plantes-exterieur` Plantes d'extérieur > `palmiers` Palmiers, `arbustes-a-fleurs` Arbustes à fleurs (> `heliconia`, `calliandra`)
- `plantes-aquatiques` Plantes aquatiques > `nenuphars` Nénuphars

**Produits** : 24 produits répartis dans les feuilles, champs `id, slug, name, categorySlug, price (centimes), exposure ('soleil'|'mi-ombre'|'ombre'), size ('S'|'M'|'L'), inStock, image (index 1..12)`. Noms et prix réalistes en français, quelques produits hors stock.

**Routes** :
- `/catalogue` : tous les produits. `/catalogue/[categorie]` et `/catalogue/[categorie]/[sous-categorie]` (jusqu'à 3 segments) : produits de la branche. Slug inconnu = vraie 404. `<h1>` = nom de la catégorie (« Catalogue » à la racine).
- Ajouter « Catalogue » à la navigation principale (via le menu de catégories, ci-dessous), au sitemap (chaque catégorie), aux ROUTES e2e/a11y (au moins `/catalogue` et `/catalogue/plantes-interieur/feuillages`), aux URL Lighthouse.

**État dans l'URL (query params, source unique de vérité, rendu serveur)** : `exposition` et `taille` (clé répétée, une par valeur), `prix_min`, `prix_max` (euros), `en_stock=1`, `tri` (`pertinence` défaut absent de l'URL, `prix-asc`, `prix-desc`, `nom`), `vue=liste` (grille par défaut, absent), `page` (≥ 2 seulement). La catégorie est dans le **chemin**, pas en query. Tout changement de filtre ou de tri **remet la page à 1** et **conserve les autres paramètres** (y compris la vue). Valeurs invalides ignorées (validées par un schéma zod en front JS, par le composant de requête en Symfony).

**Disposition** (pattern repris d'un projet existant) :
- ≥ 1024 px : colonne de filtres `<aside aria-labelledby>` à gauche (~280 px, gouttière 48 px), liste à droite. Au-dessus de la liste : fil d'Ariane, `<h1>`, sous-catégories enfants en puces de liens (si la catégorie en a), barre d'outils (nombre de résultats, tri, bascule grille/liste).
- < 1024 px : bouton « Filtrer » (icône + texte + nombre de filtres actifs, `aria-haspopup="dialog"`, `aria-expanded`) qui ouvre un **panneau latéral modal** (dialog natif ou primitive du design system : piège de focus, Échap, retour du focus au bouton, défilement de fond bloqué, titre visible « Filtres »). Bouton « Voir les N produits » en bas du panneau pour le fermer.
- **Facettes** : chaque groupe dans un `<fieldset>` + `<legend>` (repliable via `<details>`/`<summary>` ou accordéon accessible, ouvert par défaut) :
  - Catégorie : liens vers les sous-catégories de la branche courante **avec compteur** (navigation, pas case à cocher, car la catégorie est dans le chemin).
  - Exposition et Taille : cases à cocher multi-sélection, **compteur par valeur** calculé sur les résultats filtrés par les **autres** facettes (comptage disjonctif classique), valeur à 0 désactivée mais visible.
  - Prix : deux champs nombre (min, max, en euros, `inputmode="numeric"`, labels visibles) validés à la soumission ou au blur, pas à chaque frappe.
  - En stock : interrupteur (`role="switch"` ou case à cocher stylée, `aria-checked`).
- **Filtres actifs** au-dessus de la liste : puces supprimables (`<a>` ou `<button>` « Retirer le filtre : Mi-ombre », icône `aria-hidden`), et « Tout effacer » (garde la catégorie, retire les filtres et le tri). Absents quand rien n'est filtré (testé en présence ET absence).
- **Nombre de résultats** : « 12 produits » dans une région `role="status"` (`aria-live="polite"`) annoncée après chaque changement.
- **Tri** : `<select>` labellisé.
- **Bascule grille/liste** : deux liens dans `<nav aria-label="Affichage">`, l'actif en `aria-current="page"`. Grille `auto-fill` (min ~240 px, 1 colonne en dessous de 480 px) ; vue liste = même carte en ligne via `@container` (pas un second composant).
- **Carte produit** (`<article data-testid="catalog-product">`) : image (lazy sauf les 4 premières, `alt` = nom du produit, dimensions posées), `<h2>` nom (pas de page détail, donc **pas de lien** : carte non cliquable, jamais de `href="#"`), prix formaté `Intl.NumberFormat('fr-FR', {style: 'currency', currency: 'EUR'})`, exposition, taille, badge « Rupture de stock » (texte, pas couleur seule).
- **Pagination** numérotée, 12 produits par page : `<nav aria-label="Pagination">`, précédent/suivant (`rel="prev"`/`rel="next"`), fenêtre avec ellipses au-delà de 7 pages (1, courante−1, courante, courante+1, dernière), page courante en `aria-current="page"` non cliquable, bornes en texte désactivé, libellés « Page N » accessibles même si le visuel est réduit sur mobile, masquée s'il n'y a qu'une page. `<link rel="prev/next">` dans le head.
- **Fonctionne sans JS** : les facettes sont un `<form method="get">` avec un bouton « Appliquer les filtres » visible ; avec JS, chaque changement applique immédiatement (navigation client) et le bouton disparaît. La recherche, le tri et la pagination **conservent tous les autres filtres** (défaut constaté sur le projet de référence, à ne pas reproduire).
- **Focus après changement** : après une navigation de filtre, le focus reste sur le contrôle manipulé (ou revient au titre de la liste après « Tout effacer » et changement de page, avec `tabindex="-1"`). Le défilement remonte en haut de la liste au changement de page.
- **3 états** : chargement (squelettes de cartes, `role="status"`), erreur (message métier + « Réessayer »), vide (« Aucun produit ne correspond à ces filtres. » + bouton « Tout effacer »).
- **SEO** (section 10) : title et description propres à la catégorie, canonique sans filtres, `noindex, follow` dès qu'un filtre ou tri est actif, JSON-LD `ItemList` (positions, noms, URL de la catégorie avec ancre) + `BreadcrumbList`.
- **data-testid** : `catalog-filters`, `catalog-filters-open`, `catalog-filter-exposure-<valeur>`, `catalog-filter-size-<valeur>`, `catalog-filter-price-min`, `catalog-filter-price-max`, `catalog-filter-in-stock`, `catalog-active-filters`, `catalog-active-filter`, `catalog-clear-filters`, `catalog-sort`, `catalog-view-grid`, `catalog-view-list`, `catalog-results-count`, `catalog-product`, `catalog-pagination`, `catalog-empty`, `catalog-error`, `catalog-retry`.
- **Tests** : unitaires des fonctions pures (filtre, comptage disjonctif, tri, pagination et fenêtre d'ellipses, parse et sérialisation d'URL aller-retour), e2e desktop et mobile (filtre exposition → URL, compteur, puce ; suppression d'une puce ; tout effacer ; tri prix croissant vérifié sur les 2 premiers prix ; pagination page 2 et retour ; bascule liste persistée ; état vide ; panneau mobile : ouverture, Échap, retour du focus ; un scénario sans JS avec le formulaire GET), axe sur `/catalogue` filtré et non filtré dans les deux modes.

## 12. Menu de catégories

Dans le header, à côté de la navigation principale (pattern repris d'un projet existant, défauts corrigés).

- **Desktop (≥ 1024 px)** : un bouton « Catalogue » (`aria-expanded`, `aria-controls`, chevron `aria-hidden`) qui ouvre **au clic** un panneau déroulant **en colonnes en cascade** : 1re colonne = niveau 1 ; survol **ou focus** d'une catégorie qui a des enfants ajoute une colonne à droite (largeur ~240 px, profondeur suivant l'arbre, colonne fermée dès qu'on change de branche). En tête du panneau, lien « Tout le catalogue » vers `/catalogue`. Toute catégorie (parente ou feuille) est un **lien** vers sa page `/catalogue/...`. Les parents ouverts portent `aria-expanded="true"` (sur un bouton compagnon ou le lien selon l'implémentation, mais l'état doit être vrai et à jour). Liens dans des `<ul>`, **pas** de `role="menu"` (navigation de site, pattern « disclosure navigation » de l'APG).
- **Ancrage du panneau** : le panneau est **attaché à son bouton « Catalogue »**, jamais dans le flux du header ni sous le logo. Le bouton et le panneau sont dans le même élément de liste en `position: relative`, le panneau en `position: absolute; inset-block-start: 100%; inset-inline-start: 0` (ou ancrage CSS / popover du design system), au-dessus du contenu (`z-index` nommé), sans pousser la mise en page. S'il déborde à droite du viewport, il s'aligne sur le bord droit du bouton. Il n'ouvre **aucun espace** dans le header (hauteur du header identique panneau ouvert et fermé).
- **Test d'ancrage** (desktop, deux modes) : panneau ouvert, son bord haut est à moins de 12 px du bord bas du bouton, son bord gauche à moins de 12 px du bord gauche du bouton (ou son bord droit aligné sur celui du bouton s'il est recalé), la hauteur du header n'a pas changé, et le `<h1>` n'a pas bougé.
- **Clavier** : Tab/Maj+Tab parcourt les liens et ouvre les colonnes au focus, Échap ferme le panneau et rend le focus au bouton, clic extérieur ferme, flèches haut/bas entre les liens d'une colonne et droite/gauche entre colonnes (bonus si simple, sinon documenter).
- **Mobile (< 1024 px)** : bouton burger « Menu » (`aria-expanded`, `aria-controls`) qui ouvre un panneau latéral modal (piège de focus, Échap, retour du focus, défilement de fond bloqué) contenant la navigation principale et l'entrée « Catalogue » en **navigation par niveaux** (drill-down) : un niveau affiché à la fois, bouton « Retour » portant le nom du niveau parent, lien « Voir toute la catégorie » vers le niveau ouvert, parents = boutons qui descendent d'un niveau, feuilles = liens qui ferment le panneau. **Corrections par rapport à la référence** : le focus est déplacé sur le titre (ou le bouton Retour) du niveau affiché à chaque changement de niveau, et aucun `aria-expanded` figé. Retour au premier niveau à la fermeture.
- **Sans JS** : le bouton Catalogue est remplacé par (ou se comporte comme) un lien vers `/catalogue`, la page catalogue liste les catégories, rien n'est inaccessible.
- Mode renforcé : panneaux sans animation, aucun débordement (test anti-débordement section 1).
- **data-testid** : `layout-category-menu-toggle`, `layout-category-menu`, `layout-category-link`, `layout-mobile-menu-toggle`, `layout-mobile-menu`, `layout-mobile-menu-back`.
- **Tests** e2e : desktop ouverture au clic, survol/focus d'un parent qui affiche ses enfants, Échap rend le focus, clic sur une feuille qui navigue et met à jour le fil d'Ariane ; mobile drill-down aller-retour avec focus vérifié ; axe panneau ouvert.

## 13. Pages d'erreur personnalisées

Chaque dépôt a ses propres pages d'erreur, dans le layout du site (header, footer, fil d'Ariane, mode renforcé actif), avec le **vrai code HTTP** :

| Code | `<h1>` | Contenu |
|---|---|---|
| 404 | Page introuvable | Explication courte, lien vers l'accueil, lien vers le plan du site, lien vers le catalogue. |
| 500 | Une erreur est survenue | Message neutre (jamais de trace ni de message technique), bouton « Réessayer » (recharge), lien vers l'accueil. |
| 503 | Site en maintenance | Message de maintenance, `Retry-After` si la stack le permet. Page **statique autonome** (n'appelle ni API ni données), activable par une variable d'environnement `MAINTENANCE=1` quand la stack le permet simplement, sinon fichier statique servi par le serveur web (vanilla, Docker nginx/Caddy). |

- Conventions natives : `not-found.tsx`, `error.tsx` et `global-error.tsx` (Next), `error.vue` (Nuxt), `+error.svelte` et `src/error.html` (SvelteKit), `templates/bundles/TwigBundle/Exception/error{404,500}.html.twig` (Symfony), `404.html`, `50x.html` et la config nginx (vanilla).
- `<meta name="robots" content="noindex">`, title propre, pas dans le sitemap.
- Pour pouvoir tester la 500 : une route de déclenchement **disponible en dev et test uniquement** (`/_erreur-test` ou équivalent idiomatique : `/_error/500` en Symfony), introuvable (404) en production.
- Tests e2e : 404 sur une route inconnue **et** sur un slug de catégorie inconnu (code + h1 + lien accueil), 500 sur la route de test (code + h1, aucun texte technique : ni « Error », ni « stack », ni anglais), axe sur 404 et 500.

## 14. Charte graphique (développement uniquement)

Route `/charte-graphique`, **disponible uniquement en développement** : 404 en production (build de prod, `APP_ENV=prod`, image Docker), `noindex`, absente du sitemap, du plan du site, des URL Lighthouse et de la navigation publique (lien discret dans le footer en dev seulement). Domaine dédié (`styleguide`), aucune logique métier.

Contenu, chaque section avec son `<h2>`, rendu avec les **vrais composants et tokens** du projet (aucune valeur recopiée en dur) :
1. **Couleurs** : chaque token (primaire, secondaire, texte, fond, surfaces, états succès/erreur/info/avertissement), avec son nom de token, sa valeur, et le **ratio de contraste calculé** sur le fond (fonction pure testée) avec la mention AA / AAA / insuffisant.
2. **Typographie** : h1 à h6, corps, petit texte, avec taille en px et interlignage.
3. **Espacements et rayons** : l'échelle des tokens, en barres visuelles.
4. **Boutons** : variantes × états (défaut, survol, focus, actif, désactivé, chargement), en taille réelle ≥ 44 px.
5. **Formulaires** : champ texte, e-mail, nombre, textarea, select, case à cocher, interrupteur, radio, avec label, aide, erreur liée (`aria-describedby`), désactivé.
6. **Retours** : alertes (4 sévérités), squelette, état vide, message d'erreur avec relance.
7. **Navigation** : fil d'Ariane, pagination, puces de filtre, liens (dont lien externe).
8. **Médias et cartes** : carte de blog, carte produit (grille et liste), image avec ratio.
9. **Icônes** : toutes les icônes du wrapper `Icon`, avec leur nom.
10. **Logo** : pictogramme et logo complet, sur fond clair et sombre.
- Un bouton bascule le mode renforcé pour comparer (c'est le toggle du header). Les deux modes passent axe.
- Tests : e2e en dev ou test (200, sections présentes), **e2e de production qui vérifie le 404**, axe dans les deux modes.

## 15. Définition de « fini »

Avant le rapport final, pour chaque route de la spec (accueil, tâches, contact, catalogue racine et 2 niveaux de catégorie, 4 pages légales, charte en dev) : `curl` sur le serveur de production local du dépôt avec le code HTTP attendu, et une capture Playwright desktop et mobile **regardée** (Read sur le PNG). Une route qui n'existe pas encore n'est pas « en cours », elle est **rouge** dans le rapport.

## 16. Mesure d'audience (Matomo) et suivi des erreurs (GlitchTip)

Le dépôt ne suppose aucune instance précise : l'URL Matomo et le DSN GlitchTip viennent de l'environnement.

**Activation par variables d'environnement, neutre par défaut.** Sans valeur, rien n'est chargé ni envoyé : aucun script, aucune requête, aucune entrée de CSP. Les valeurs réelles vivent dans `.env.local` (non versionné), les fichiers d'exemple les laissent vides, la CI tourne sans traceur.

| Variable | Rôle |
|---|---|
| `MATOMO_URL`, `MATOMO_SITE_ID` | mesure d'audience, fronts seulement (préfixe public propre au framework : `NEXT_PUBLIC_`, `NUXT_PUBLIC_`, `PUBLIC_`) |
| `GLITCHTIP_DSN` | erreurs, fronts et API (DSN au format Sentry) |
| `GLITCHTIP_ENVIRONMENT` | `development`, `production`… (défaut : l'environnement du framework) |

**Matomo sans cookie, donc sans bandeau.** Configuration dispensée de consentement par la CNIL : `disableCookies`, IP anonymisée sur 2 octets (réglage du site Matomo), aucun suivi d'un site à l'autre, aucun identifiant utilisateur, aucune donnée transmise à un tiers. Une page vue par navigation, y compris les navigations côté client des frameworks (titre et URL à jour). Page « Données personnelles » : la mention « pas de cookie de mesure d'audience » reste vraie. Ajouter un paragraphe « Mesure d'audience » (Matomo auto-hébergé, sans cookie, statistiques anonymes, finalité, durée de conservation) affiché seulement quand Matomo est activé. Ce paragraphe n'affirme pas l'anonymisation de l'IP : c'est un réglage de l'instance, que le dépôt ne peut pas établir, à vérifier avant la mise en ligne.

**Opposition à la mesure.** Le paragraphe « Mesure d'audience » offre une case « Ne pas mesurer mes visites sur ce site » (recommandation de la fiche CNIL n° 17) et une zone `role="status"` qui annonce l'état. Le refus de Matomo passe par un cookie, impossible avec `disableCookies` : il est gardé dans le stockage local (clé `mesure-audience-refusee`, valeur `1`), lu avant de créer la file `_paq` et avant chaque page vue. Refus posé : aucune commande, aucun script, aucune requête. Stockage indisponible : pas de refus. Testé de bout en bout : refus, rechargement sans file `_paq`, retrait.

**GlitchTip par les SDK Sentry**, sans donnée personnelle : `sendDefaultPii: false`, pas de rejeu de session, pas de traces de performance par défaut (`tracesSampleRate: 0`), corps de requête jamais envoyés, champs de formulaire jamais joints.

| Dépôt | SDK |
|---|---|
| Next | `@sentry/nextjs` (client, serveur, edge) |
| Nuxt | `@sentry/nuxt` |
| SvelteKit | `@sentry/sveltekit` (hooks client et serveur) |
| Symfony | `sentry/sentry-symfony` (PHP) et `@sentry/browser` (navigateur) |
| vanilla | `@sentry/browser`, copié dans `site/vendor/` comme Embla (pas de build) |
| API Platform | `sentry/sentry-symfony` |
| Hono | `@sentry/node` |

Les erreurs attendues ne sont pas remontées : 404, 422 de validation, 503 de maintenance, scénarios `X-Scenario`. Seules les erreurs inattendues (5xx, exceptions non gérées, rejets de promesse) le sont.

**Garde-fou performance.** Le SDK navigateur se charge **après** l'affichage (import dynamique au `load` ou à l'inactivité), Matomo en asynchrone. `make metrics` ne doit reculer sur aucune page (comparaison avant et après, médiane de 3 passages, sur la même machine au calme). Toute dépendance ajoutée est justifiée dans CLAUDE.md avec son poids.

**CSP.** Quand une variable est renseignée, son origine s'ajoute à `script-src` (Matomo) et `connect-src` (Matomo, GlitchTip). Vanilla : hash de CSP mis à jour.

**Tests.** Unitaires : sans variable, aucun script injecté. e2e avec variables factices et requêtes interceptées : une page vue envoyée par navigation, aucun cookie posé, une erreur volontaire envoyée au DSN, rien d'envoyé pour une 404.

## 17. Icônes : sprite SVG tiré de Lucide

Règle générale dans le skill `standards-front` (section Icônes). Remplace les bibliothèques chargées à l'exécution (`lucide-react`, `@lucide/svelte`, `@mdi/js`, `symfony/ux-icons`) et le sprite dessiné à la main de vanilla.

- **Source unique : Lucide** (licence ISC), par `@iconify-json/lucide` en dépendance de développement. Nuxt passe de MDI à Lucide. Le mode renforcé utilise `person-standing`. Le logo feuille reste un SVG propre au projet, hors sprite s'il est déjà inline.
- **Versionné** : la liste des icônes utilisées (`icons.json`, noms Lucide), le script de génération (`make icons`), le sprite généré (servi en fichier statique : `static/`, `public/`, `site/` ou `public/` Symfony selon la stack) et le type union des noms (TypeScript), ou la liste des noms (PHP, vanilla).
- **Génération** : `svgstore` assemble un `<symbol id="nom">` par icône, `viewBox` conservé, `stroke` et `fill` en `currentColor`, attributs inutiles retirés. Sortie stable (ordre alphabétique) pour un diff lisible.
- **Contrôle** : `make qa` échoue si le sprite ou le type ne correspondent plus à `icons.json` (génération à blanc puis comparaison).
- **Composant unique** `Icon` (macro ou partial Twig en Symfony) : `<svg><use href="/icons.svg#nom"></use></svg>`. Décorative : `aria-hidden="true"`. Porteuse de sens : `role="img"` et nom accessible. Taille par la police (`1em`) ou une prop.
- **Sans changement visible** : mêmes icônes à l'écran, sauf Nuxt (dessin Lucide au lieu de MDI). Les tests e2e qui ciblent une icône passent par `data-testid`, pas par le SVG.
- **Effet attendu** : JS initial allégé des composants d'icônes. À mesurer quand les tests seront de nouveau exécutés.

## 18. Développement en conteneur, sans prérequis système

Seuls prérequis : Docker (avec Compose), `make` et git. Aucun Node, PHP, Composer, Yarn ni navigateur installé sur la machine. Comme la préproduction, tout tourne en conteneur.

- **Tout passe par `make`**, qui appelle `docker compose`. Aucune commande du README ne suppose un outil local : `make install`, `make up`, `make qa`, `make test-e2e`, `make test-a11y`, `make metrics`, `make icons`.
- **Service de dev** : code monté en volume, rechargement à chaud, port de la section 7 inchangé. Les dépendances (`node_modules`, `vendor`) vivent dans un volume nommé, jamais mélangées avec celles de la machine. Utilisateur du conteneur aligné sur l'UID et le GID de la machine, pour que les fichiers générés ne soient pas à root.
- **Tests navigateur** : image officielle Playwright, à la version exacte du paquet `@playwright/test` du dépôt. Lighthouse CI dans un conteneur avec Chromium. Les ports de test de la section 7 restent ceux-là.
- **Hooks Git** : le hook appelle `make` (lint-staged lancé dans le conteneur). Pas de Node requis pour commiter. Un hook qui ne trouve pas Docker le dit clairement plutôt que de passer en silence.
- **CI** : GitHub Actions appelle les mêmes cibles `make`, donc les mêmes conteneurs que le poste de dev.
- **Ordre** : après les icônes (section 17) et GlitchTip et Matomo (section 16) sur tous les dépôts, avant le branchement de l'API (section 6). Un dépôt à la fois, SvelteKit en modèle.

## 19. Bibliothèque de composants commune : boilerplates-ui

Dépôt public `kewinMarchand/boilerplates-ui`, monorepo, avec un Storybook de démonstration.

- **Périmètre : tous les composants de base d'une interface**, sans se demander ce que MUI, Vuetify ou Tailwind fournissent déjà. Au minimum : bouton, bouton icône, lien, champ texte, zone de texte, liste déroulante, case à cocher, bouton radio, interrupteur, groupe de champs avec légende et message d'erreur, carte, badge, alerte, toast, modale, tiroir, onglets, accordéon, info-bulle, menu déroulant, fil d'Ariane, pagination, tableau, indicateur de chargement, squelette, avatar, séparateur, icône (sprite Lucide de la section 17).
- **Couches**, une par paquet du monorepo :
  - `tokens` : couleurs, espacements, typographie, rayons, ombres, points de rupture, en variables CSS et en JSON, avec le preset Tailwind ;
  - `css` : chaque composant en HTML et CSS seuls, rendu serveur partout, utilisable tel quel par Twig, vanilla et Svelte ;
  - `vanilla` : le comportement des composants interactifs en JavaScript natif (éléments `<dialog>`, `<details>`, API Popover d'abord), sans dépendance ;
  - `react` et `vue` : des composants typés qui produisent exactement le balisage de `css` et branchent le comportement à la manière du framework.
- **Accessibilité WCAG 2.1 AA** pour chaque composant (clavier, focus, noms accessibles, contraste en mode standard et en mode renforcé de la section 4), vérifiée par axe dans Storybook.
- **Storybook** : une histoire par composant et par état (normal, survol, focus, désactivé, erreur, chargement), en mode standard et renforcé, documentation des tokens, publié en site statique (GitHub Pages).
- **Les chartes graphiques des 5 boilerplates sont conservées** (section 14).
- **Distribution** : paquets npm publics sous `@kewinmarchand/` (connexion npm de Kewin requise pour publier). En attendant, dépendance git par étiquette de version.
- **Intégration** : aucun kit de composants tiers (décision du 30/10/2026, MUI et Vuetify retirés) : chaque boilerplate prend ses composants dans boilerplates-ui, en React pour Next, en Vue pour Nuxt, en CSS et vanilla pour SvelteKit, Symfony et le site HTML ; Tailwind reste un outil de style dans SvelteKit, branché sur les jetons. Un boilerplate à la fois. Les dépôts modèles sont renommés `boilerplate-<techno>` le 31/10/2026 (ADR 0005 de boilerplates-ui) ; les projets déjà créés à partir d'eux gardent leur kit, une migration se décide projet par projet.
- **Composant manquant** : il entre d'abord dans la bibliothèque (CSS et balisage de référence, React, Vue, comportement vanilla si besoin, test de parité), puis dans le Storybook (variantes, états, modes standard, renforcé et sombre, axe), sort dans une version étiquetée, est intégré aux boilerplates, et enfin importé par le projet qui en a besoin. Jamais de composant écrit seulement dans un boilerplate ou un projet en attendant.
- Mêmes règles que les boilerplates : conteneur seul prérequis (section 18), `make`, CI, aucune mention de l'employeur.

## 20. Mode sombre

Le site suit le thème du système par défaut, et l'utilisateur peut le forcer en clair ou en sombre ; le mode renforcé (section 4) reste toujours en clair.

- **État** sur `<html data-color-scheme="…">`, trois valeurs : `auto` (suit `prefers-color-scheme`, valeur écrite dans le HTML servi), `light` (clair forcé), `dark` (sombre forcé). Les couleurs viennent des jetons de boilerplates-ui (section 19), qui ne posent le sombre que sous `[data-color-scheme="dark"]` et sous `[data-color-scheme="auto"]` avec `prefers-color-scheme: dark`, jamais avec `[data-a11y-mode="enhanced"]`. `<meta name="color-scheme" content="light dark">` dans `<head>`.
- **Persistance** en `localStorage`, clé `color-scheme`, valeur `light` ou `dark` ; absente pour « système ». Appliquée **avant le premier rendu** par le même script inline que le mode renforcé (section 4), lecture et écriture enveloppées dans try/catch : sans stockage, le site reste en `auto`.
- **Bascule dans le header**, à côté du bouton du mode renforcé : un bouton icône `data-testid="color-scheme-toggle"`, nom accessible « Thème : système », « Thème : clair » ou « Thème : sombre » selon l'état, qui ouvre un menu de trois choix (`role="menuitemradio"`, `aria-checked`, `data-testid="color-scheme-option-auto|light|dark"`), cible ≥ 44 px. Construite avec les composants bouton icône et menu déroulant de boilerplates-ui : aucun composant local (section 19). Icônes du sprite Lucide (section 17) : `monitor`, `sun`, `moon`.
- **Mode renforcé prioritaire** : quand `data-a11y-mode="enhanced"` est posé, la page est en clair quel que soit le choix, le choix reste mémorisé et revient quand le mode renforcé est coupé. La bascule reste utilisable et l'indique (« Thème : sombre, suspendu par l'accessibilité renforcée »).
- **Composants et jetons seulement** : les cinq boilerplates prennent leurs couleurs dans les variables CSS des jetons et leurs composants dans boilerplates-ui (section 19), qui suivent `data-color-scheme` et le mode renforcé d'eux-mêmes : aucun thème à générer ni à basculer à part.
- **Tests** :
  - unitaire de la bascule : état affiché, `aria-checked`, nom accessible ;
  - e2e, présence ET absence : chaque choix pose l'attribut et l'écrit en `localStorage` ; il persiste après rechargement ; « système » retire la clé et remet `auto` ; avec `prefers-color-scheme: dark` émulé, `auto` donne le sombre ; en mode renforcé, la page est en clair même avec `dark` ;
  - sans flash : l'attribut lu au premier `DOMContentLoaded` est déjà celui du stockage ;
  - axe sur chaque route en clair, en sombre et en mode renforcé ; Lighthouse en clair et en sombre.
