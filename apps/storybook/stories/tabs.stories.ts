import { createElement } from 'react'
import { h } from 'vue'

import { tabs } from '@kewinmarchand/css/reference/markup.ts'

import { Tabs as ReactTabs } from '@kewinmarchand/react'
import { Tabs as VueTabs } from '@kewinmarchand/vue'

import { mountReact, mountVue } from './support/frameworks'
import { grid, OVERVIEW } from './support/grid'

import type { Meta, StoryObj } from '@storybook/html-vite'

interface Args {
  id: string
  label: string
  selected: 'description' | 'caracteristiques' | 'avis'
}

const TABS = [
  { id: 'description', label: 'Description', text: 'Vélo de ville en acier, huit vitesses.' },
  { id: 'caracteristiques', label: 'Caractéristiques', text: 'Poids 14 kg, cadre taille M.' },
  { id: 'avis', label: 'Avis', text: 'Note moyenne 4,6 sur 5.' },
]

const html = (id: string, { label, selected }: Omit<Args, 'id'>) =>
  tabs({
    id,
    label,
    selected,
    tabs: TABS.map(({ id: tabId, label: tabLabel, text }) => ({
      id: tabId,
      label: tabLabel,
      body: `<p>${text}</p>`,
    })),
  })

const meta: Meta<Args> = {
  title: 'Navigation/Onglets',
  args: { id: 'fiche', label: 'Fiche produit', selected: 'description' },
  argTypes: {
    id: { control: 'text', description: 'Préfixe des identifiants des onglets et des panneaux' },
    label: { control: 'text', description: 'Nom accessible de la liste' },
    selected: {
      control: 'select',
      options: TABS.map((tab) => tab.id),
      description: 'Onglet sélectionné au départ (defaultTab en React et Vue)',
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
      'États',
      ['Rendu'],
      [
        {
          label: 'Premier onglet',
          cells: [html('vue-a', { label: 'Fiche A', selected: 'description' })],
        },
        {
          label: 'Deuxième onglet',
          cells: [html('vue-b', { label: 'Fiche B', selected: 'caracteristiques' })],
        },
        {
          label: 'Focus',
          state: 'focus',
          cells: [html('vue-c', { label: 'Fiche C', selected: 'description' })],
        },
      ],
    ),
}

export const Html: Story = { name: 'HTML et vanilla', render: (args) => html(args.id, args) }

export const React: Story = {
  render: ({ id, label, selected }) =>
    mountReact(
      createElement(ReactTabs, {
        key: selected,
        id,
        label,
        defaultTab: selected,
        tabs: TABS.map(({ id, label: tabLabel, text }) => ({
          id,
          label: tabLabel,
          content: createElement('p', null, text),
        })),
      }),
    ),
}

export const Vue: Story = {
  render: ({ id, label, selected }) =>
    mountVue({
      render: () =>
        h(
          VueTabs,
          {
            id,
            label,
            defaultTab: selected,
            tabs: TABS.map(({ id, label: tabLabel }) => ({ id, label: tabLabel })),
          },
          Object.fromEntries(TABS.map(({ id, text }) => [id, () => h('p', text)])),
        ),
    }),
}
