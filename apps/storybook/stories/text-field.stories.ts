import { createElement } from 'react'
import { h } from 'vue'

import { textField, type TextFieldOptions } from '@kewinmarchand/css/reference/markup.ts'

import { TextField as ReactTextField } from '@kewinmarchand/react'
import { TextField as VueTextField } from '@kewinmarchand/vue'

import { FIELD_ARG_TYPES, fieldRows } from './support/fields'
import { mountReact, mountVue } from './support/frameworks'
import { grid, OVERVIEW } from './support/grid'

import type { Meta, StoryObj } from '@storybook/html-vite'

type Args = TextFieldOptions & { onChange?: () => void }

const meta: Meta<Args> = {
  title: 'Formulaire/Champ texte',
  args: {
    id: 'email',
    label: 'E-mail',
    type: 'email',
    autocomplete: 'email',
    placeholder: 'nom@exemple.fr',
    hint: '',
    error: '',
    required: false,
    disabled: false,
  },
  argTypes: {
    ...FIELD_ARG_TYPES,
    type: { control: 'select', options: ['text', 'email', 'tel', 'url', 'password', 'search'] },
    autocomplete: { control: 'text' },
    placeholder: {
      control: 'text',
      description: 'Exemple de saisie, jamais à la place du libellé',
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
