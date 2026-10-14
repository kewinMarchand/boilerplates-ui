import { createElement } from 'react'
import { h } from 'vue'

import { text, TEXT_ELEMENTS, type TextOptions } from '@kewinmarchand/css/reference/markup.ts'
import generated from '@kewinmarchand/tokens/tokens.json'

import { Text as ReactText } from '@kewinmarchand/react'
import { Text as VueText } from '@kewinmarchand/vue'

import { mountReact, mountVue } from './support/frameworks'
import { grid, OVERVIEW } from './support/grid'

import type { Meta, StoryObj } from '@storybook/html-vite'

const VARIANTS = {
  h1: 'Titre 1',
  h2: 'Titre 2',
  h3: 'Titre 3',
  h4: 'Titre 4',
  title: 'Titre de bloc',
  lead: 'Introduction',
  body: 'Texte',
  'body-sm': 'Petit texte',
  caption: 'Légende',
  overline: 'Surtitre',
} as const

const { tokens, enhanced } = generated as unknown as {
  tokens: { font: { size: Record<string, string> } }
  enhanced: { font: { size: Record<string, string> } }
}

const meta: Meta<TextOptions> = {
  title: 'Fondations/Typographie',
  args: { text: 'Vélo de ville en acier', variant: 'body' },
  argTypes: {
    text: { control: 'text' },
    variant: { control: 'select', options: Object.keys(VARIANTS) },
    as: {
      control: 'select',
      options: ['défaut', 'h1', 'h2', 'h3', 'h4', 'p', 'span'],
      mapping: { défaut: undefined },
      description: 'Élément rendu, quand le niveau de titre de la page diffère du style voulu',
    },
  },
}
export default meta

type Story = StoryObj<TextOptions>

// Rendu en <p> : une page de démonstration ne doit pas aligner plusieurs titres de niveau 1
export const ToutesLesVariantes: Story = {
  name: 'Toutes les variantes',
  parameters: OVERVIEW,
  render: () =>
    grid(
      'Variantes',
      ['Rendu', 'Élément par défaut', 'Taille (renforcé)'],
      Object.entries(VARIANTS).map(([variant, label]) => ({
        label,
        cells: [
          text({ text: 'Vélo de ville en acier', variant: variant as 'body', as: 'p' }),
          `<code>&lt;${TEXT_ELEMENTS[variant as 'body']}&gt;</code>`,
          `${tokens.font.size[variant]} (${enhanced.font.size[variant]})`,
        ],
      })),
    ),
}

export const Html: Story = { name: 'HTML', render: (args) => text(args) }
export const React: Story = {
  render: ({ text: content, variant, as }) =>
    mountReact(
      createElement(ReactText, {
        variant: variant ?? 'body',
        ...(as && { as }),
        children: content,
      }),
    ),
}
export const Vue: Story = {
  render: ({ text: content, variant, as }) =>
    mountVue({
      render: () =>
        h(VueText, { variant: variant ?? 'body', ...(as && { as }) }, { default: () => content }),
    }),
}
