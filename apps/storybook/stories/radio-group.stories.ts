import { radioGroup, type RadioGroupOptions } from '@kewinmarchand/css/reference/markup.ts'
import { RadioGroup as ReactRadioGroup } from '@kewinmarchand/react'
import { RadioGroup as VueRadioGroup } from '@kewinmarchand/vue'
import { createElement } from 'react'
import { h } from 'vue'

import { FIELD_ARG_TYPES } from './support/fields'
import { mountReact, mountVue } from './support/frameworks'
import { grid, OVERVIEW, uid } from './support/grid'

import type { Meta, StoryObj } from '@storybook/html-vite'

const OPTIONS = [
  { value: 'domicile', label: 'À domicile' },
  { value: 'relais', label: 'En point relais' },
  { value: 'magasin', label: 'Retrait en magasin' },
]

const meta: Meta<RadioGroupOptions> = {
  title: 'Formulaire/Bouton radio',
  args: {
    id: 'livraison',
    name: 'livraison',
    legend: 'Mode de livraison',
    options: OPTIONS,
    value: 'relais',
    hint: '',
    error: '',
    required: false,
    disabled: false,
  },
  argTypes: {
    id: FIELD_ARG_TYPES.id,
    hint: FIELD_ARG_TYPES.hint,
    error: FIELD_ARG_TYPES.error,
    required: FIELD_ARG_TYPES.required,
    disabled: FIELD_ARG_TYPES.disabled,
    legend: { control: 'text' },
    name: { control: 'text' },
    value: { control: 'select', options: OPTIONS.map((option) => option.value) },
    options: { control: 'object' },
  },
}
export default meta

type Story = StoryObj<RadioGroupOptions>

const group = (options: Partial<RadioGroupOptions>) => {
  const id = uid('livraison')
  return radioGroup({
    id,
    name: id,
    legend: 'Mode de livraison',
    options: OPTIONS,
    value: 'relais',
    ...options,
  })
}

export const ToutesLesVariantes: Story = {
  name: 'Toutes les variantes',
  parameters: OVERVIEW,
  render: () =>
    grid(
      'États du groupe',
      ['Rendu'],
      [
        { label: 'Normal', cells: [group({})] },
        { label: 'Focus', state: 'focus', cells: [group({})] },
        { label: 'Avec aide', cells: [group({ hint: 'Livraison offerte en point relais' })] },
        {
          label: 'Erreur',
          cells: [group({ value: '', required: true, error: 'Choisir un mode de livraison' })],
        },
        { label: 'Désactivé', cells: [group({ disabled: true })] },
      ],
    ),
}

export const Html: Story = { name: 'HTML', render: (args) => radioGroup(args) }

export const React: Story = {
  render: ({ value, ...props }) =>
    mountReact(createElement(ReactRadioGroup, { ...props, defaultValue: value, key: value ?? '' })),
}

export const Vue: Story = {
  render: ({ value, ...props }) =>
    mountVue({ render: () => h(VueRadioGroup, { ...props, modelValue: value ?? '' }) }),
}
