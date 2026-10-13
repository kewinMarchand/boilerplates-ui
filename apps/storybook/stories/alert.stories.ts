import { createElement } from 'react'
import { h } from 'vue'

import { alert, type AlertOptions } from '@kewinmarchand/css/reference/markup.ts'

import { Alert as ReactAlert, Button as ReactButton } from '@kewinmarchand/react'
import { Alert as VueAlert, Button as VueButton } from '@kewinmarchand/vue'

import { mountReact, mountVue } from './support/frameworks'
import { defined, grid, OVERVIEW } from './support/grid'

import type { Meta, StoryObj } from '@storybook/html-vite'

type Args = Omit<AlertOptions, 'body' | 'action'> & { text: string; actionLabel: string }

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
    actionLabel: '',
  },
  argTypes: {
    variant: { control: 'select', options: Object.keys(VARIANTS) },
    title: { control: 'text' },
    text: { control: 'text' },
    actionLabel: { control: 'text', description: 'Bouton d’action, vide pour aucun' },
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
      ['Avec titre', 'Sans titre', 'Avec action'],
      Object.entries(VARIANTS).map(([variant, label]) => {
        const v = variant as 'info'
        return {
          label,
          cells: [
            alert({ variant: v, title: label, body: '<p>Message explicite et actionnable.</p>' }),
            alert({ variant: v, body: 'Message explicite et actionnable.' }),
            alert({ variant: v, body: 'Envoi impossible.', action: ACTION('Réessayer') }),
          ],
        }
      }),
    ),
}

const ACTION = (label: string) =>
  `<button type="button" class="bui-button bui-button--outline bui-button--sm">${label}</button>`

export const Html: Story = {
  name: 'HTML',
  render: ({ text, actionLabel, ...args }) =>
    alert({
      ...defined(args),
      body: `<p>${text}</p>`,
      ...(actionLabel ? { action: ACTION(actionLabel) } : {}),
    }),
}

export const React: Story = {
  render: ({ text, actionLabel, ...args }) =>
    mountReact(
      createElement(ReactAlert, {
        ...defined(args),
        ...(actionLabel
          ? { action: createElement(ReactButton, { variant: 'outline', size: 'sm' }, actionLabel) }
          : {}),
        children: createElement('p', null, text),
      }),
    ),
}

export const Vue: Story = {
  render: ({ text, actionLabel, ...args }) =>
    mountVue({
      render: () =>
        h(VueAlert, defined(args), {
          default: () => h('p', text),
          ...(actionLabel
            ? {
                action: () =>
                  h(VueButton, { variant: 'outline', size: 'sm' }, { default: () => actionLabel }),
              }
            : {}),
        }),
    }),
}
