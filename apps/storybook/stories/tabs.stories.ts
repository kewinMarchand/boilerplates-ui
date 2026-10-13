import { tabs, type TabsOptions } from '@kewinmarchand/css/reference/markup.ts'
import { Tabs as ReactTabs } from '@kewinmarchand/react'
import { Tabs as VueTabs } from '@kewinmarchand/vue'
import { createElement } from 'react'
import { h } from 'vue'

import { mountReact, mountVue } from './support/frameworks'

import type { Meta, StoryObj } from '@storybook/html-vite'

const meta: Meta = { title: 'Composants/Onglets' }
export default meta

type Story = StoryObj

const TABS = [
  { id: 'description', label: 'Description', text: 'Vélo de ville en acier, huit vitesses.' },
  { id: 'caracteristiques', label: 'Caractéristiques', text: 'Poids 14 kg, cadre taille M.' },
  { id: 'avis', label: 'Avis', text: 'Note moyenne 4,6 sur 5.' },
]

const options = (id: string, selected?: string): TabsOptions => ({
  id,
  label: 'Fiche produit',
  tabs: TABS.map(({ id: tabId, label, text }) => ({ id: tabId, label, body: `<p>${text}</p>` })),
  ...(selected ? { selected } : {}),
})

export const Html: Story = { name: 'HTML et vanilla', render: () => tabs(options('fiche')) }
export const Selection: Story = {
  name: 'Deuxième onglet sélectionné',
  render: () => tabs(options('fiche-2', 'caracteristiques')),
}
export const Focus: Story = {
  render: () => tabs(options('fiche-focus')),
  parameters: { pseudo: { focusVisible: true } },
}

export const React: Story = {
  render: () =>
    mountReact(
      createElement(ReactTabs, {
        id: 'fiche-react',
        label: 'Fiche produit',
        tabs: TABS.map(({ id, label, text }) => ({
          id,
          label,
          content: createElement('p', null, text),
        })),
      }),
    ),
}

export const Vue: Story = {
  render: () =>
    mountVue({
      render: () =>
        h(
          VueTabs,
          {
            id: 'fiche-vue',
            label: 'Fiche produit',
            tabs: TABS.map(({ id, label }) => ({ id, label })),
          },
          Object.fromEntries(TABS.map(({ id, text }) => [id, () => h('p', text)])),
        ),
    }),
}
