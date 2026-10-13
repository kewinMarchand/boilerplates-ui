import { textArea, type TextAreaOptions } from '@kewinmarchand/css/reference/markup.ts'
import { TextArea as ReactTextArea } from '@kewinmarchand/react'
import { TextArea as VueTextArea } from '@kewinmarchand/vue'
import { createElement } from 'react'
import { h } from 'vue'

import { FIELD_ARG_TYPES, fieldRows } from './support/fields'
import { mountReact, mountVue } from './support/frameworks'
import { grid, OVERVIEW } from './support/grid'

import type { Meta, StoryObj } from '@storybook/html-vite'

const meta: Meta<TextAreaOptions> = {
  title: 'Formulaire/Zone de texte',
  args: {
    id: 'message',
    label: 'Message',
    rows: 4,
    hint: '',
    error: '',
    required: false,
    disabled: false,
  },
  argTypes: { ...FIELD_ARG_TYPES, rows: { control: { type: 'number', min: 2, max: 12 } } },
}
export default meta

type Story = StoryObj<TextAreaOptions>

export const ToutesLesVariantes: Story = {
  name: 'Toutes les variantes',
  parameters: OVERVIEW,
  render: () =>
    grid(
      'États',
      ['Rendu'],
      fieldRows('message', (options) => textArea({ ...options, label: 'Message' })),
    ),
}

export const Html: Story = { name: 'HTML', render: (args) => textArea(args) }
export const React: Story = { render: (args) => mountReact(createElement(ReactTextArea, args)) }
export const Vue: Story = { render: (args) => mountVue({ render: () => h(VueTextArea, args) }) }
