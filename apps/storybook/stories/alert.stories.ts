import { alert, type AlertOptions } from '@kewinmarchand/css/reference/markup.ts'
import { Alert as ReactAlert } from '@kewinmarchand/react'
import { Alert as VueAlert } from '@kewinmarchand/vue'
import { createElement } from 'react'
import { h } from 'vue'

import { mountReact, mountVue } from './support/frameworks'
import { defined, grid, OVERVIEW } from './support/grid'

import type { Meta, StoryObj } from '@storybook/html-vite'

type Args = Omit<AlertOptions, 'body'> & { text: string }

const VARIANTS = {
  info: 'Information',
  success: 'Succès',
  warning: 'Avertissement',
  error: 'Erreur',
} as const

const meta: Meta<Args> = {
  title: 'Retours/Alerte',
  args: {
    variant: 'info',
    title: 'Maintenance prévue',
    text: 'Le service sera interrompu dimanche de 2 h à 4 h.',
  },
  argTypes: {
    variant: { control: 'select', options: Object.keys(VARIANTS) },
    title: { control: 'text' },
    text: { control: 'text' },
    role: {
      control: 'select',
      options: ['aucun', 'status', 'alert'],
      mapping: { aucun: undefined },
    },
  },
}
export default meta

type Story = StoryObj<Args>

export const ToutesLesVariantes: Story = {
  name: 'Toutes les variantes',
  parameters: OVERVIEW,
  render: () =>
    grid(
      'Gravités',
      ['Avec titre', 'Sans titre'],
      Object.entries(VARIANTS).map(([variant, label]) => {
        const v = variant as 'info'
        return {
          label,
          cells: [
            alert({ variant: v, title: label, body: '<p>Message explicite et actionnable.</p>' }),
            alert({ variant: v, body: 'Message explicite et actionnable.' }),
          ],
        }
      }),
    ),
}

export const Html: Story = {
  name: 'HTML',
  render: ({ text, ...args }) => alert({ ...defined(args), body: `<p>${text}</p>` }),
}

export const React: Story = {
  render: ({ text, ...args }) =>
    mountReact(
      createElement(ReactAlert, { ...defined(args), children: createElement('p', null, text) }),
    ),
}

export const Vue: Story = {
  render: ({ text, ...args }) =>
    mountVue({ render: () => h(VueAlert, defined(args), { default: () => h('p', text) }) }),
}
