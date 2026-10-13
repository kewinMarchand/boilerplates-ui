import { alert } from '@kewinmarchand/css/reference/markup.ts'
import { Alert as ReactAlert } from '@kewinmarchand/react'
import { Alert as VueAlert } from '@kewinmarchand/vue'
import { createElement } from 'react'
import { h } from 'vue'

import { mountReact, mountVue } from './support/frameworks'

import type { Meta, StoryObj } from '@storybook/html-vite'

const meta: Meta = { title: 'Composants/Alerte' }
export default meta

type Story = StoryObj

const STATES = [
  {
    variant: 'info',
    title: 'Maintenance prévue',
    body: 'Le service sera interrompu dimanche de 2 h à 4 h.',
  },
  { variant: 'success', title: 'Message envoyé', body: 'Une réponse arrive sous 48 heures.' },
  {
    variant: 'warning',
    title: 'Session bientôt expirée',
    body: 'Enregistrer le brouillon pour ne rien perdre.',
  },
  {
    variant: 'error',
    title: 'Envoi impossible',
    body: 'Vérifier les champs signalés puis recommencer.',
  },
] as const

const html = (index: number) => {
  const { body, ...rest } = STATES[index]!
  return alert({ ...rest, body: `<p>${body}</p>` })
}

export const Info: Story = { render: () => html(0) }
export const Succes: Story = { name: 'Succès', render: () => html(1) }
export const Avertissement: Story = { render: () => html(2) }
export const Erreur: Story = { render: () => html(3) }
export const SansTitre: Story = {
  name: 'Sans titre',
  render: () => alert({ body: 'Les prix sont affichés toutes taxes comprises.' }),
}

export const React: Story = {
  render: () =>
    mountReact(
      createElement(
        'div',
        { className: 'sb-column' },
        STATES.map(({ body, ...props }) =>
          createElement(ReactAlert, {
            key: props.variant,
            ...props,
            children: createElement('p', null, body),
          }),
        ),
      ),
    ),
}

export const Vue: Story = {
  render: () =>
    mountVue({
      render: () =>
        h(
          'div',
          { class: 'sb-column' },
          STATES.map(({ body, ...props }) => h(VueAlert, props, { default: () => h('p', body) })),
        ),
    }),
}
