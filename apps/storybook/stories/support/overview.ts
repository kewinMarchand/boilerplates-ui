/**
 * Vue d'ensemble d'une famille : chaque composant avec un titre, ses variantes principales
 * et un lien vers sa page détaillée (relatif, il suit le Storybook sous un sous-chemin).
 */
export interface OverviewItem {
  title: string
  /** Identifiant Storybook de la page détaillée, par exemple `actions-bouton--toutes-les-variantes`. */
  story: string
  demo: string
}

export const familyOverview = (family: string, intro: string, items: OverviewItem[]) =>
  `<div class="sb-page"><header><h1>${family}</h1><p>${intro}</p></header><div class="sb-overview">${items
    .map(
      ({ title, story, demo }) =>
        `<section class="sb-overview__item" aria-labelledby="ov-${story}"><h2 id="ov-${story}">${title}</h2><div class="sb-overview__demo">${demo}</div><p><a class="bui-link" href="./?path=/story/${story}" target="_top">Détail : ${title}</a></p></section>`,
    )
    .join('')}</div></div>`

export const OVERVIEW_PAGE = { controls: { disable: true } }
