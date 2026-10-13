import { select, type SelectOptions } from '@kewinmarchand/css/reference/markup.ts'
import { Select as ReactSelect } from '@kewinmarchand/react'
import { Select as VueSelect } from '@kewinmarchand/vue'
import { createElement } from 'react'
import { h } from 'vue'

import { mountReact, mountVue } from './support/frameworks'

import type { Meta, StoryObj } from '@storybook/html-vite'

const meta: Meta = { title: 'Composants/Liste déroulante' }
export default meta

type Story = StoryObj

const OPTIONS = [
  { value: 'fr', label: 'France' },
  { value: 'be', label: 'Belgique' },
  { value: 'ch', label: 'Suisse' },
]

const STATES: SelectOptions[] = [
  { id: 'pays', label: 'Pays', options: OPTIONS, placeholder: 'Choisir un pays' },
  { id: 'pays-aide', label: 'Pays de livraison', options: OPTIONS, hint: 'Livraison en Europe' },
  {
    id: 'pays-erreur',
    label: 'Pays de facturation',
    options: OPTIONS,
    placeholder: 'Choisir un pays',
    required: true,
    error: 'Choisir un pays de facturation',
  },
  { id: 'pays-off', label: 'Pays d’origine', options: OPTIONS, disabled: true },
]

export const Simple: Story = { render: () => select(STATES[0]!) }
export const AvecAide: Story = { name: 'Avec aide', render: () => select(STATES[1]!) }
export const Erreur: Story = { name: 'Requise en erreur', render: () => select(STATES[2]!) }
export const Desactivee: Story = { name: 'Désactivée', render: () => select(STATES[3]!) }
export const Focus: Story = {
  render: () => select({ ...STATES[0]!, id: 'pays-focus' }),
  parameters: { pseudo: { focusVisible: true } },
}

export const React: Story = {
  render: () =>
    mountReact(
      createElement(
        'div',
        { className: 'sb-column' },
        STATES.map((props) => createElement(ReactSelect, { key: props.id, ...props })),
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
          STATES.map((props) => h(VueSelect, props)),
        ),
    }),
}
