import { createElement } from 'react'
import { h } from 'vue'

import { linkButton, type LinkButtonOptions } from '@kewinmarchand/css/reference/markup.ts'

import { LinkButton as ReactLinkButton } from '@kewinmarchand/react'
import { LinkButton as VueLinkButton } from '@kewinmarchand/vue'

import { mountReact, mountVue } from './support/frameworks'
import { grid, OVERVIEW } from './support/grid'

import type { Meta, StoryObj } from '@storybook/html-vite'

const meta: Meta<LinkButtonOptions> = {
  title: 'Actions/Bouton-lien',
  args: { label: 'Tout effacer', type: 'button' },
  argTypes: {
    label: { control: 'text', description: 'Texte du bouton' },
    type: { control: 'select', options: ['button', 'submit', 'reset'] },
  },
}
export default meta

type Story = StoryObj<LinkButtonOptions>

export const ToutesLesVariantes: Story = {
  name: 'Toutes les variantes',
  parameters: OVERVIEW,
  render: () =>
    grid(
      'États',
      ['Normal', { label: 'Survol', state: 'hover' }, { label: 'Focus', state: 'focus' }],
      [
        {
          label: 'Bouton-lien',
          cells: Array.from({ length: 3 }, () => linkButton({ label: 'Tout effacer' })),
        },
      ],
    ),
}

export const Html: Story = { name: 'HTML', render: (args) => linkButton(args) }

export const React: Story = {
  render: ({ label, type }) =>
    mountReact(createElement(ReactLinkButton, { type: type ?? 'button' }, label)),
}

export const Vue: Story = {
  render: ({ label, type }) =>
    mountVue({
      render: () => h(VueLinkButton, { type: type ?? 'button' }, { default: () => label }),
    }),
}
