import {
  accordion,
  avatar,
  badge,
  card,
  separator,
  table,
} from '@kewinmarchand/css/reference/markup.ts'

import { familyOverview, OVERVIEW_PAGE } from './support/overview'

import type { Meta, StoryObj } from '@storybook/html-vite'

const meta: Meta = { title: 'Affichage/Vue d’ensemble', parameters: OVERVIEW_PAGE }
export default meta

export const VueDEnsemble: StoryObj = {
  name: 'Vue d’ensemble',
  render: () =>
    familyOverview(
      'Affichage',
      'La présentation du contenu : regrouper, étiqueter, séparer, tabuler.',
      [
        {
          title: 'Carte',
          story: 'affichage-carte--toutes-les-variantes',
          demo: `<div style="max-width: 300px">${card({ title: 'Randonnée', headingLevel: 3, body: '<p>Trois itinéraires balisés.</p>', media: '<img src="carte.svg" alt="" width="640" height="360" loading="lazy">' })}</div>`,
        },
        {
          title: 'Badge',
          story: 'affichage-badge--toutes-les-variantes',
          demo: (['neutral', 'info', 'success', 'warning', 'error'] as const)
            .map((variant) =>
              badge({ label: variant === 'neutral' ? 'Brouillon' : 'Statut', variant }),
            )
            .join(''),
        },
        {
          title: 'Avatar',
          story: 'affichage-avatar--toutes-les-variantes',
          demo:
            (['sm', 'md', 'lg'] as const)
              .map((size) => avatar({ name: 'Camille Martin', size }))
              .join('') + avatar({ name: 'Camille Martin', src: 'carte.svg' }),
        },
        {
          title: 'Séparateur',
          story: 'affichage-séparateur--toutes-les-variantes',
          demo: `<div style="width: 100%"><p>Section précédente</p>${separator()}<p>Section suivante</p></div><div class="sb-stack" style="align-items: stretch"><span>Accueil</span>${separator({ orientation: 'vertical' })}<span>Catalogue</span></div>`,
        },
        {
          title: 'Tableau',
          story: 'affichage-tableau--toutes-les-variantes',
          demo: table({
            id: 'ov-table',
            caption: 'Stock',
            columns: [
              { key: 'produit', label: 'Produit', sortable: true },
              { key: 'prix', label: 'Prix', sortable: true },
            ],
            rows: [
              { produit: 'Casque', prix: '45 €' },
              { produit: 'Antivol', prix: '29 €' },
            ],
            sort: { key: 'prix', direction: 'descending' },
          }),
        },
        {
          title: 'Accordéon',
          story: 'affichage-accordéon--toutes-les-variantes',
          demo: `<div style="width: 100%">${accordion({
            items: [
              {
                title: 'Délais de livraison',
                body: '<p>Deux à quatre jours ouvrés.</p>',
                open: true,
              },
              { title: 'Retours', body: '<p>Sous 30 jours.</p>' },
            ],
          })}</div>`,
        },
      ],
    ),
}
