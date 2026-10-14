import { breadcrumb, pagination, tabs } from '@kewinmarchand/css/reference/markup.ts'

import { familyOverview, OVERVIEW_PAGE } from './support/overview'

import type { Meta, StoryObj } from '@storybook/html-vite'

const meta: Meta = { title: 'Navigation/Vue d’ensemble', parameters: OVERVIEW_PAGE }
export default meta

export const VueDEnsemble: StoryObj = {
  name: 'Vue d’ensemble',
  render: () =>
    familyOverview('Navigation', 'Se repérer et passer d’une page ou d’un panneau à l’autre.', [
      {
        title: 'Fil d’Ariane',
        story: 'navigation-fil-d-ariane--toutes-les-variantes',
        demo: breadcrumb({
          items: [
            { label: 'Accueil', href: '#accueil' },
            { label: 'Catalogue', href: '#catalogue' },
            { label: 'Vélo de ville' },
          ],
        }),
      },
      {
        title: 'Pagination',
        story: 'navigation-pagination--toutes-les-variantes',
        demo: pagination({ page: 2, count: 3, href: (page) => `#page-${page}` }),
      },
      {
        title: 'Onglets',
        story: 'navigation-onglets--toutes-les-variantes',
        demo: `<div style="width: 100%">${tabs({
          id: 'ov-tabs',
          label: 'Fiche produit',
          tabs: [
            { id: 'a', label: 'Description', body: '<p>Vélo de ville en acier.</p>' },
            { id: 'b', label: 'Avis', body: '<p>4,6 sur 5.</p>' },
          ],
        })}</div>`,
      },
    ]),
}
