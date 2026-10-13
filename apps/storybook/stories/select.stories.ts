import { select, type SelectOptions } from '@kewinmarchand/css/reference/markup.ts'
import { Select as ReactSelect } from '@kewinmarchand/react'
import { Select as VueSelect } from '@kewinmarchand/vue'
import { createElement } from 'react'
import { h } from 'vue'

import { FIELD_ARG_TYPES, fieldRows } from './support/fields'
import { mountReact, mountVue } from './support/frameworks'
import { grid, OVERVIEW } from './support/grid'

import type { Meta, StoryObj } from '@storybook/html-vite'

const OPTIONS = [
  { value: 'fr', label: 'France' },
  { value: 'be', label: 'Belgique' },
  { value: 'ch', label: 'Suisse' },
]

const meta: Meta<SelectOptions> = {
  title: 'Formulaire/Liste déroulante',
  args: {
    id: 'pays',
    label: 'Pays',
    options: OPTIONS,
    placeholder: 'Choisir un pays',
    hint: '',
    error: '',
    required: false,
    disabled: false,
  },
  argTypes: {
    ...FIELD_ARG_TYPES,
    placeholder: { control: 'text' },
    options: { control: 'object' },
  },
}
export default meta

type Story = StoryObj<SelectOptions>

export const ToutesLesVariantes: Story = {
  name: 'Toutes les variantes',
  parameters: OVERVIEW,
  render: () =>
    grid(
      'États',
      ['Rendu'],
      fieldRows('pays', (options) =>
        select({ ...options, label: 'Pays', options: OPTIONS, placeholder: 'Choisir un pays' }),
      ),
    ),
}

export const Html: Story = { name: 'HTML', render: (args) => select(args) }
export const React: Story = { render: (args) => mountReact(createElement(ReactSelect, args)) }
export const Vue: Story = { render: (args) => mountVue({ render: () => h(VueSelect, args) }) }
