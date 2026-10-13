import { badge, type BadgeOptions } from '@kewinmarchand/css/reference/markup.ts'
import { Badge as ReactBadge } from '@kewinmarchand/react'
import { Badge as VueBadge } from '@kewinmarchand/vue'
import { createElement } from 'react'
import { h } from 'vue'

import { mountReact, mountVue } from './support/frameworks'
import { grid, OVERVIEW } from './support/grid'

import type { Meta, StoryObj } from '@storybook/html-vite'

const VARIANTS = {
  neutral: 'Neutre',
  info: 'Information',
  success: 'Succès',
  warning: 'Avertissement',
  error: 'Erreur',
} as const

const meta: Meta<BadgeOptions> = {
  title: 'Affichage/Badge',
  args: { label: 'Nouveau', variant: 'info' },
  argTypes: {
    label: { control: 'text' },
    variant: { control: 'select', options: Object.keys(VARIANTS) },
  },
}
export default meta

type Story = StoryObj<BadgeOptions>

export const ToutesLesVariantes: Story = {
  name: 'Toutes les variantes',
  parameters: OVERVIEW,
  render: () =>
    grid(
      'Variantes',
      ['Rendu'],
      Object.entries(VARIANTS).map(([variant, label]) => ({
        label,
        cells: [badge({ label: 'En stock', variant: variant as 'info' })],
      })),
    ),
}

export const Html: Story = { name: 'HTML', render: (args) => badge(args) }
export const React: Story = {
  render: ({ label, variant }) =>
    mountReact(createElement(ReactBadge, { variant: variant ?? 'neutral', children: label })),
}
export const Vue: Story = {
  render: ({ label, variant }) =>
    mountVue({
      render: () => h(VueBadge, { variant: variant ?? 'neutral' }, { default: () => label }),
    }),
}
