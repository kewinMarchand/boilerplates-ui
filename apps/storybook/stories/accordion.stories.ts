import { accordion } from '@kewinmarchand/css/reference/markup.ts'
import { Accordion as ReactAccordion } from '@kewinmarchand/react'
import { Accordion as VueAccordion } from '@kewinmarchand/vue'
import { createElement } from 'react'
import { h } from 'vue'

import { mountReact, mountVue } from './support/frameworks'

import type { Meta, StoryObj } from '@storybook/html-vite'

const meta: Meta = { title: 'Composants/Accordéon' }
export default meta

type Story = StoryObj

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

const html = (open: boolean, name?: string) =>
  accordion({
    ...(name ? { name } : {}),
    items: ITEMS.map(({ title, text }, index) => ({
      title,
      body: `<p>${text}</p>`,
      open: open && index === 0,
    })),
  })

export const Ferme: Story = { name: 'Fermé', render: () => html(false) }
export const Ouvert: Story = { name: 'Premier panneau ouvert', render: () => html(true) }
export const Exclusif: Story = {
  name: 'Exclusif (un seul ouvert)',
  render: () => html(true, 'faq'),
}
export const Focus: Story = {
  render: () => html(false),
  parameters: { pseudo: { focusVisible: true } },
}

export const React: Story = {
  render: () =>
    mountReact(
      createElement(ReactAccordion, {
        name: 'faq-react',
        items: ITEMS.map(({ id, title, text }, index) => ({
          id,
          title,
          content: createElement('p', null, text),
          open: index === 0,
        })),
      }),
    ),
}

export const Vue: Story = {
  render: () =>
    mountVue({
      render: () =>
        h(
          VueAccordion,
          {
            name: 'faq-vue',
            items: ITEMS.map(({ id, title }, index) => ({ id, title, open: index === 0 })),
          },
          Object.fromEntries(ITEMS.map(({ id, text }) => [id, () => h('p', text)])),
        ),
    }),
}
