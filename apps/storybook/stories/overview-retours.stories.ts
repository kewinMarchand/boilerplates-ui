import { alert, skeleton, spinner, toaster } from '@kewinmarchand/css/reference/markup.ts'

import { familyOverview, OVERVIEW_PAGE } from './support/overview'

import type { Meta, StoryObj } from '@storybook/html-vite'

const meta: Meta = { title: 'Retours/Vue d’ensemble', parameters: OVERVIEW_PAGE }
export default meta

export const VueDEnsemble: StoryObj = {
  name: 'Vue d’ensemble',
  render: () =>
    familyOverview('Retours', 'Informer de l’état d’une action ou d’un chargement.', [
      {
        title: 'Alerte',
        story: 'retours-alerte--toutes-les-variantes',
        demo: `<div class="sb-column" style="width: 100%">${(['info', 'success', 'warning', 'error'] as const).map((variant) => alert({ variant, body: 'Message explicite.' })).join('')}</div>`,
      },
      {
        title: 'Toast',
        story: 'retours-toast--toutes-les-variantes',
        demo: `<div class="sb-cell" style="width: 100%">${toaster([{ id: 'ov-toast', message: 'Profil enregistré.', variant: 'success' }])}</div>`,
      },
      {
        title: 'Indicateur de chargement',
        story: 'retours-indicateur-de-chargement--toutes-les-variantes',
        demo: spinner() + spinner({ size: 'lg', label: 'Chargement des produits' }),
      },
      {
        title: 'Squelette',
        story: 'retours-squelette--toutes-les-variantes',
        demo: `<div aria-busy="true" style="display: grid; gap: 8px; width: 100%">${skeleton({ variant: 'circle' })}${skeleton({ variant: 'text' })}${skeleton({ variant: 'text', width: '60%' })}</div>`,
      },
    ]),
}
