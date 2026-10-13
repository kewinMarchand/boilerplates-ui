import { createElement } from 'react'
import { h } from 'vue'

import { accordion } from '@kewinmarchand/css/reference/markup.ts'

import { Accordion as ReactAccordion } from '@kewinmarchand/react'
import { Accordion as VueAccordion } from '@kewinmarchand/vue'

import { mountReact, mountVue } from './support/frameworks'
import { grid, OVERVIEW } from './support/grid'

import type { Meta, StoryObj } from '@storybook/html-vite'

interface Args {
  exclusive: boolean
  firstOpen: boolean
}

const ITEMS = [
  {
    id: 'livraison',
    title: 'Quels sont les délais de livraison ?',
    text: 'Deux à quatre jours ouvrés.',
  },
  {
    id: 'retour',
    title: 'Comment retourner un article ?',
    text: 'Depuis votre compte, sous 30 jours.',
  },
  { id: 'paiement', title: 'Quels moyens de paiement ?', text: 'Carte bancaire et virement.' },
]

const meta: Meta<Args> = {
  title: 'Affichage/Accordéon',
  args: { exclusive: false, firstOpen: true },
  argTypes: {
    exclusive: { control: 'boolean', description: 'Attribut name commun : un seul panneau ouvert' },
    firstOpen: { control: 'boolean', description: 'Premier panneau ouvert au chargement' },
  },
}
export default meta

type Story = StoryObj<Args>

const html = ({ exclusive, firstOpen }: Args, name: string) =>
  accordion({
    ...(exclusive ? { name } : {}),
    items: ITEMS.map(({ title, text }, index) => ({
      title,
      body: `<p>${text}</p>`,
      open: firstOpen && index === 0,
    })),
  })

export const ToutesLesVariantes: Story = {
  name: 'Toutes les variantes',
  parameters: OVERVIEW,
  render: () =>
    grid(
      'États',
      ['Rendu'],
      [
        { label: 'Fermé', cells: [html({ exclusive: false, firstOpen: false }, 'a')] },
        { label: 'Premier ouvert', cells: [html({ exclusive: false, firstOpen: true }, 'b')] },
        {
          label: 'Exclusif',
          cells: [html({ exclusive: true, firstOpen: true }, 'faq-vue-ensemble')],
        },
        {
          label: 'Focus',
          state: 'focus',
          cells: [html({ exclusive: false, firstOpen: false }, 'c')],
        },
      ],
    ),
}

export const Html: Story = { name: 'HTML', render: (args) => html(args, 'faq') }

export const React: Story = {
  render: ({ exclusive, firstOpen }) =>
    mountReact(
      createElement(ReactAccordion, {
        ...(exclusive ? { name: 'faq-react' } : {}),
        items: ITEMS.map(({ id, title, text }, index) => ({
          id,
          title,
          content: createElement('p', null, text),
          open: firstOpen && index === 0,
        })),
      }),
    ),
}

export const Vue: Story = {
  render: ({ exclusive, firstOpen }) =>
    mountVue({
      render: () =>
        h(
          VueAccordion,
          {
            ...(exclusive ? { name: 'faq-vue' } : {}),
            items: ITEMS.map(({ id, title }, index) => ({
              id,
              title,
              open: firstOpen && index === 0,
            })),
          },
          Object.fromEntries(ITEMS.map(({ id, text }) => [id, () => h('p', text)])),
        ),
    }),
}
