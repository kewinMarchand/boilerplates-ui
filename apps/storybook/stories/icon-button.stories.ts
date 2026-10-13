import { iconButton, type IconButtonOptions } from '@kewinmarchand/css/reference/markup.ts'
import { IconButton as ReactIconButton, type IconName } from '@kewinmarchand/react'
import { IconButton as VueIconButton } from '@kewinmarchand/vue'
import { createElement } from 'react'
import { h } from 'vue'

import { mountReact, mountVue } from './support/frameworks'

import type { Meta, StoryObj } from '@storybook/html-vite'

const meta: Meta = { title: 'Composants/Bouton icône' }
export default meta

type Story = StoryObj

const STATES: (IconButtonOptions & { icon: IconName })[] = [
  { label: 'Ajouter', icon: 'plus' },
  { label: 'Modifier', icon: 'pencil', variant: 'outline' },
  { label: 'Supprimer', icon: 'trash', variant: 'ghost' },
  { label: 'Fermer', icon: 'x', size: 'sm' },
  { label: 'Modifier', icon: 'pencil', disabled: true },
]

const stack = (html: string) => `<div class="sb-stack">${html}</div>`

export const Variantes: Story = { render: () => stack(STATES.slice(0, 3).map(iconButton).join('')) }
export const Petit: Story = { render: () => iconButton(STATES[3]!) }
export const Desactive: Story = { name: 'Désactivé', render: () => iconButton(STATES[4]!) }
export const Survol: Story = {
  render: () => stack(STATES.slice(0, 3).map(iconButton).join('')),
  parameters: { pseudo: { hover: true } },
}
export const Focus: Story = {
  render: () => stack(STATES.slice(0, 3).map(iconButton).join('')),
  parameters: { pseudo: { focusVisible: true } },
}

export const React: Story = {
  render: () =>
    mountReact(
      createElement(
        'div',
        { className: 'sb-stack' },
        STATES.map((props, index) => createElement(ReactIconButton, { key: index, ...props })),
      ),
    ),
}

export const Vue: Story = {
  render: () =>
    mountVue({
      render: () =>
        h(
          'div',
          { class: 'sb-stack' },
          STATES.map((props) => h(VueIconButton, props)),
        ),
    }),
}
