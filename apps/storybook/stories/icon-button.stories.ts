import { iconButton, type IconButtonOptions } from '@kewinmarchand/css/reference/markup.ts'
import { ICON_NAMES, IconButton as ReactIconButton, type IconName } from '@kewinmarchand/react'
import { IconButton as VueIconButton } from '@kewinmarchand/vue'
import { createElement } from 'react'
import { h } from 'vue'

import { mountReact, mountVue } from './support/frameworks'
import { defined, grid, OVERVIEW } from './support/grid'

import type { Meta, StoryObj } from '@storybook/html-vite'

type Args = IconButtonOptions & { icon: IconName }

const VARIANTS = { primary: 'Primaire', outline: 'Contour', ghost: 'Fantôme' } as const

const meta: Meta<Args> = {
  title: 'Actions/Bouton icône',
  args: { label: 'Ajouter', icon: 'plus', variant: 'primary', size: 'md', disabled: false },
  argTypes: {
    label: { control: 'text', description: 'Nom accessible (aria-label)' },
    icon: { control: 'select', options: ICON_NAMES },
    variant: { control: 'select', options: Object.keys(VARIANTS) },
    size: { control: 'select', options: ['sm', 'md'] },
    disabled: { control: 'boolean' },
  },
}
export default meta

type Story = StoryObj<Args>

export const ToutesLesVariantes: Story = {
  name: 'Toutes les variantes',
  parameters: OVERVIEW,
  render: () =>
    grid(
      'Variantes, états et tailles',
      [
        'Normal',
        { label: 'Survol', state: 'hover' },
        { label: 'Focus', state: 'focus' },
        'Désactivé',
        'Petit',
      ],
      Object.entries(VARIANTS).map(([variant, label]) => {
        const base = { label: 'Supprimer', icon: 'trash', variant: variant as 'primary' }
        return {
          label,
          cells: [
            iconButton(base),
            iconButton(base),
            iconButton(base),
            iconButton({ ...base, disabled: true }),
            iconButton({ ...base, size: 'sm' }),
          ],
        }
      }),
    ),
}

export const Html: Story = { name: 'HTML', render: (args) => iconButton(defined(args)) }
export const React: Story = {
  render: (args) => mountReact(createElement(ReactIconButton, defined(args))),
}
export const Vue: Story = {
  render: (args) => mountVue({ render: () => h(VueIconButton, defined(args)) }),
}
