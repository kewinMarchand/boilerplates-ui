import { cluster, icon, text } from '@kewinmarchand/css/reference/markup.ts'

import { familyOverview, OVERVIEW_PAGE } from './support/overview'

import type { Meta, StoryObj } from '@storybook/html-vite'

const meta: Meta = { title: 'Fondations/Vue d’ensemble', parameters: OVERVIEW_PAGE }
export default meta

const SWATCHES = [
  'primary',
  'primary-dark',
  'secondary',
  'text',
  'text-muted',
  'border',
  'error',
  'success',
  'warning',
  'info',
]

export const VueDEnsemble: StoryObj = {
  name: 'Vue d’ensemble',
  render: () =>
    familyOverview(
      'Fondations',
      'Les valeurs partagées par tous les composants : tokens, typographie, icônes et mise en page.',
      [
        {
          title: 'Tokens',
          story: 'fondations-tokens--tokens',
          demo: SWATCHES.map(
            (name) =>
              `<figure class="sb-sample"><span class="sb-swatch-mini" style="background: var(--bui-color-${name})"></span><figcaption>${name}</figcaption></figure>`,
          ).join(''),
        },
        {
          title: 'Typographie',
          story: 'fondations-typographie--toutes-les-variantes',
          demo: `<div class="sb-column">${(['h2', 'lead', 'body', 'caption', 'overline'] as const)
            .map((variant) => text({ text: 'Vélo de ville en acier', variant, as: 'p' }))
            .join('')}</div>`,
        },
        {
          title: 'Icône',
          story: 'fondations-icône--toutes-les-variantes',
          demo: ['info', 'circle-check', 'triangle-alert', 'circle-alert', 'mail', 'plus', 'x']
            .map((name) => icon(name, undefined, { size: 'lg' }))
            .join(''),
        },
        {
          title: 'Mise en page',
          story: 'fondations-mise-en-page--toutes-les-variantes',
          demo: cluster({
            content: ['Bloc 1', 'Bloc 2', 'Bloc 3']
              .map(
                (label) =>
                  `<span style="padding: var(--bui-space-2); border: 1px dashed var(--bui-color-border)">${label}</span>`,
              )
              .join(''),
          }),
        },
      ],
    ),
}
