import { radio, radioGroup, type RadioGroupOptions } from '@kewinmarchand/css/reference/markup.ts'
import { RadioGroup as ReactRadioGroup } from '@kewinmarchand/react'
import { RadioGroup as VueRadioGroup } from '@kewinmarchand/vue'
import { createElement } from 'react'
import { h } from 'vue'

import { mountReact, mountVue } from './support/frameworks'

import type { Meta, StoryObj } from '@storybook/html-vite'

const meta: Meta = { title: 'Composants/Bouton radio' }
export default meta

type Story = StoryObj

const OPTIONS = [
  { value: 'domicile', label: 'À domicile' },
  { value: 'relais', label: 'En point relais' },
  { value: 'magasin', label: 'Retrait en magasin' },
]

const STATES: RadioGroupOptions[] = [
  {
    id: 'livraison',
    name: 'livraison',
    legend: 'Mode de livraison',
    options: OPTIONS,
    value: 'relais',
  },
  {
    id: 'creneau',
    name: 'creneau',
    legend: 'Créneau',
    options: OPTIONS,
    hint: 'Les créneaux du soir sont limités',
    required: true,
    error: 'Choisir un mode de livraison',
  },
  { id: 'archive', name: 'archive', legend: 'Indisponible', options: OPTIONS, disabled: true },
]

export const Seul: Story = {
  render: () => radio({ id: 'seul', name: 'seul', value: 'oui', label: 'Oui' }),
}
export const Groupe: Story = { render: () => radioGroup(STATES[0]!) }
export const Erreur: Story = {
  name: 'Groupe requis en erreur',
  render: () => radioGroup(STATES[1]!),
}
export const Desactive: Story = { name: 'Groupe désactivé', render: () => radioGroup(STATES[2]!) }
export const Focus: Story = {
  render: () => radioGroup({ ...STATES[0]!, id: 'focus', name: 'focus' }),
  parameters: { pseudo: { focusVisible: true } },
}

export const React: Story = {
  render: () =>
    mountReact(
      createElement(
        'div',
        { className: 'sb-column' },
        STATES.map(({ value, ...props }) =>
          createElement(ReactRadioGroup, { key: props.id, ...props, defaultValue: value }),
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
          STATES.map(({ value, ...props }) =>
            h(VueRadioGroup, { ...props, modelValue: value ?? '' }),
          ),
        ),
    }),
}
