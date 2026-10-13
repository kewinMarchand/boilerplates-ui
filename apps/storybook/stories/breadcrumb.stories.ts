import { createElement } from 'react'
import { h } from 'vue'

import { breadcrumb } from '@kewinmarchand/css/reference/markup.ts'

import { Breadcrumb as ReactBreadcrumb } from '@kewinmarchand/react'
import { Breadcrumb as VueBreadcrumb } from '@kewinmarchand/vue'

import { mountReact, mountVue } from './support/frameworks'
import { grid, OVERVIEW } from './support/grid'

import type { Meta, StoryObj } from '@storybook/html-vite'

interface Args {
  depth: number
  current: string
}

const PARENTS = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'Catalogue', href: '#catalogue' },
  { label: 'Vélos', href: '#velos' },
]

const items = ({ depth, current }: Args) => [...PARENTS.slice(0, depth), { label: current }]

const meta: Meta<Args> = {
  title: 'Navigation/Fil d’Ariane',
  args: { depth: 3, current: 'Vélo de ville' },
  argTypes: {
    depth: {
      control: { type: 'range', min: 1, max: 3 },
      description: 'Niveaux avant la page courante',
    },
    current: { control: 'text', description: 'Page courante (aria-current)' },
  },
}
export default meta

type Story = StoryObj<Args>

export const ToutesLesVariantes: Story = {
  name: 'Toutes les variantes',
  parameters: OVERVIEW,
  render: () =>
    grid(
      'Profondeurs et états',
      ['Rendu'],
      [
        {
          label: 'Un niveau',
          cells: [breadcrumb({ items: items({ depth: 1, current: 'Catalogue' }) })],
        },
        {
          label: 'Trois niveaux',
          cells: [breadcrumb({ items: items({ depth: 3, current: 'Vélo de ville' }) })],
        },
        {
          label: 'Focus',
          state: 'focus',
          cells: [breadcrumb({ items: items({ depth: 2, current: 'Vélos' }) })],
        },
      ],
    ),
}

export const Html: Story = { name: 'HTML', render: (args) => breadcrumb({ items: items(args) }) }
export const React: Story = {
  render: (args) => mountReact(createElement(ReactBreadcrumb, { items: items(args) })),
}
export const Vue: Story = {
  render: (args) => mountVue({ render: () => h(VueBreadcrumb, { items: items(args) }) }),
}
