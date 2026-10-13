import { icon, type IconOptions } from '@kewinmarchand/css/reference/markup.ts'
import { Icon as ReactIcon, ICON_NAMES, type IconName } from '@kewinmarchand/react'
import { Icon as VueIcon } from '@kewinmarchand/vue'
import { createElement } from 'react'
import { h } from 'vue'

import { mountReact, mountVue } from './support/frameworks'
import { defined, grid, OVERVIEW } from './support/grid'

import type { Meta, StoryObj } from '@storybook/html-vite'

type Args = IconOptions & { name: IconName }

const meta: Meta<Args> = {
  title: 'Fondations/Icône',
  args: { name: 'circle-check', label: 'Validé', size: 'lg' },
  argTypes: {
    name: { control: 'select', options: ICON_NAMES },
    label: {
      control: 'text',
      description: 'Nom accessible : role="img". Vide pour une icône décorative',
    },
    size: {
      control: 'select',
      options: ['texte', 'sm', 'md', 'lg'],
      mapping: { texte: undefined },
    },
  },
}
export default meta

type Story = StoryObj<Args>

const clean = ({ name, label, size }: Args): Args => ({
  name,
  ...(label ? { label } : {}),
  ...(size ? { size } : {}),
})

export const ToutesLesVariantes: Story = {
  name: 'Toutes les variantes',
  parameters: OVERVIEW,
  render: () =>
    grid(
      'Catalogue et tailles',
      ['Texte (1em)', 'sm', 'md', 'lg'],
      ICON_NAMES.map((name) => ({
        label: name,
        cells: [
          icon(name),
          icon(name, undefined, { size: 'sm' }),
          icon(name, undefined, { size: 'md' }),
          icon(name, undefined, { size: 'lg' }),
        ],
      })),
    ),
}

export const Html: Story = {
  name: 'HTML',
  render: (args) => icon(args.name, undefined, defined(clean(args))),
}
export const React: Story = { render: (args) => mountReact(createElement(ReactIcon, clean(args))) }
export const Vue: Story = { render: (args) => mountVue({ render: () => h(VueIcon, clean(args)) }) }
