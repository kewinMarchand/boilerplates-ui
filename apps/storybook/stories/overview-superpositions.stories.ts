import { drawer, icon, menu, modal, tooltip } from '@kewinmarchand/css/reference/markup.ts'

import { OVERVIEW } from './support/grid'
import { familyOverview } from './support/overview'

import type { Meta, StoryObj } from '@storybook/html-vite'

const meta: Meta = { title: 'Superpositions/Vue d’ensemble', parameters: OVERVIEW }
export default meta

export const VueDEnsemble: StoryObj = {
  name: 'Vue d’ensemble',
  render: () =>
    familyOverview(
      'Superpositions',
      'Ce qui s’affiche au-dessus de la page : modale, tiroir, info-bulle, menu.',
      [
        {
          title: 'Modale',
          story: 'superpositions-modale--toutes-les-variantes',
          demo: `<button type="button" class="bui-button" data-bui-modal-open="ov-modale">Ouvrir la modale</button>${modal({ id: 'ov-modale', title: 'Modale', body: '<p>Contenu de la modale.</p>' })}`,
        },
        {
          title: 'Tiroir',
          story: 'superpositions-tiroir--toutes-les-variantes',
          demo: `<button type="button" class="bui-button bui-button--outline" data-bui-modal-open="ov-tiroir">Ouvrir le tiroir</button>${drawer({ id: 'ov-tiroir', title: 'Tiroir', body: '<p>Contenu du tiroir.</p>' })}`,
        },
        {
          title: 'Info-bulle',
          story: 'superpositions-info-bulle--toutes-les-variantes',
          demo: `<div style="padding-top: 48px" data-sb-state="focus-within">${tooltip({ id: 'ov-tip', text: 'Supprime l’article', trigger: `<button type="button" class="bui-button bui-button--outline bui-button--icon" aria-label="Supprimer" aria-describedby="ov-tip">${icon('trash')}</button>` })}</div>`,
        },
        {
          title: 'Menu déroulant',
          story: 'superpositions-menu-déroulant--toutes-les-variantes',
          demo: `<div style="min-height: 190px">${menu({
            id: 'ov-menu',
            label: 'Actions',
            items: [
              { id: 'modifier', label: 'Modifier' },
              { id: 'dupliquer', label: 'Dupliquer' },
              { id: 'archiver', label: 'Archiver' },
            ],
            open: true,
          })}</div>`,
        },
      ],
    ),
}
