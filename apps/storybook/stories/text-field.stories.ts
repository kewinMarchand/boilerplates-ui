import { textField, type TextFieldOptions } from '@kewinmarchand/css/reference/markup.ts'
import { TextField as ReactTextField } from '@kewinmarchand/react'
import { TextField as VueTextField } from '@kewinmarchand/vue'
import { createElement } from 'react'
import { h } from 'vue'

import { FIELD_ARG_TYPES, fieldRows } from './support/fields'
import { mountReact, mountVue } from './support/frameworks'
import { grid, OVERVIEW } from './support/grid'

import type { Meta, StoryObj } from '@storybook/html-vite'

const meta: Meta<TextFieldOptions> = {
  title: 'Formulaire/Champ texte',
  args: {
    id: 'email',
    label: 'E-mail',
    type: 'email',
    autocomplete: 'email',
    hint: '',
    error: '',
    required: false,
    disabled: false,
  },
  argTypes: {
    ...FIELD_ARG_TYPES,
    type: { control: 'select', options: ['text', 'email', 'tel', 'url', 'password', 'search'] },
    autocomplete: { control: 'text' },
  },
}
export default meta

type Story = StoryObj<TextFieldOptions>

export const ToutesLesVariantes: Story = {
  name: 'Toutes les variantes',
  parameters: OVERVIEW,
  render: () =>
    grid(
      'États',
      ['Rendu'],
      fieldRows('nom', (options) => textField({ ...options, label: 'Nom' })),
    ),
}

export const Html: Story = { name: 'HTML', render: (args) => textField(args) }

export const React: Story = {
  render: ({ autocomplete, ...props }) =>
    mountReact(
      createElement(ReactTextField, {
        ...props,
        ...(autocomplete ? { autoComplete: autocomplete } : {}),
      }),
    ),
}

export const Vue: Story = { render: (args) => mountVue({ render: () => h(VueTextField, args) }) }
