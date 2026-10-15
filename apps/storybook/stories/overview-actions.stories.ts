import { button, chip, iconButton, link, linkButton } from '@kewinmarchand/css/reference/markup.ts'

import { PHOTO_BACKGROUND } from './support/grid'
import { familyOverview, OVERVIEW_PAGE } from './support/overview'

import type { Meta, StoryObj } from '@storybook/html-vite'

const meta: Meta = { title: 'Actions/Vue d’ensemble', parameters: OVERVIEW_PAGE }
export default meta

export const VueDEnsemble: StoryObj = {
  name: 'Vue d’ensemble',
  render: () =>
    familyOverview('Actions', 'Ce qui déclenche une action ou mène ailleurs.', [
      {
        title: 'Bouton',
        story: 'actions-bouton--toutes-les-variantes',
        demo:
          (['primary', 'secondary', 'outline', 'ghost'] as const)
            .map((variant) => button({ label: 'Envoyer', variant }))
            .join('') +
          `<span class="sb-cell sb-cell--dark">${button({ label: 'Inverse', variant: 'inverse' })}${button({ label: 'Navigation', variant: 'nav', href: '#catalogue' })}</span>` +
          `<span class="sb-cell sb-cell--photo" style="${PHOTO_BACKGROUND}">${button({ label: 'Clair', variant: 'light' })}${button({ label: 'Contour clair', variant: 'outline-light' })}</span>`,
      },
      {
        title: 'Bouton icône',
        story: 'actions-bouton-icône--toutes-les-variantes',
        demo: (['primary', 'outline', 'ghost'] as const)
          .map((variant) => iconButton({ label: 'Ajouter', icon: 'plus', variant }))
          .join(''),
      },
      {
        title: 'Lien',
        story: 'actions-lien--toutes-les-variantes',
        demo: `<p>${link({ href: '#contact', label: 'Nous contacter' })} ou ${link({ href: 'https://www.w3.org/WAI/', label: 'ressources du W3C', external: true })}</p>`,
      },
      {
        title: 'Bouton-lien',
        story: 'actions-bouton-lien--toutes-les-variantes',
        demo: linkButton({ label: 'Tout effacer' }),
      },
      {
        title: 'Puce',
        story: 'actions-puce--toutes-les-variantes',
        demo: `<ul class="bui-chip-list" role="list" aria-label="Filtres actifs">${[
          chip({ label: 'Feuillages', href: '#feuillages' }),
          chip({ label: 'Fougères', href: '#fougeres', current: true }),
          chip({ label: 'Mi-ombre', href: '#catalogue', removable: true }),
        ]
          .map((item) => `<li>${item}</li>`)
          .join('')}</ul>`,
      },
    ]),
}
