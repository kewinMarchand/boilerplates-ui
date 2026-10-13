import { textArea, type TextAreaOptions } from '@kewinmarchand/css/reference/markup.ts'
import { TextArea as ReactTextArea } from '@kewinmarchand/react'
import { TextArea as VueTextArea } from '@kewinmarchand/vue'
import { createElement } from 'react'
import { h } from 'vue'

import { mountReact, mountVue } from './support/frameworks'

import type { Meta, StoryObj } from '@storybook/html-vite'

const meta: Meta = { title: 'Composants/Zone de texte' }
export default meta

type Story = StoryObj

const STATES: TextAreaOptions[] = [
  { id: 'message', label: 'Message' },
  { id: 'precisions', label: 'Précisions', hint: '500 caractères au plus' },
  { id: 'motif', label: 'Motif', required: true, error: 'Décrire le motif en quelques mots' },
  { id: 'archive', label: 'Archive', disabled: true },
]

export const Simple: Story = { render: () => textArea(STATES[0]!) }
export const AvecAide: Story = { name: 'Avec aide', render: () => textArea(STATES[1]!) }
export const Erreur: Story = { name: 'Requise en erreur', render: () => textArea(STATES[2]!) }
export const Desactivee: Story = { name: 'Désactivée', render: () => textArea(STATES[3]!) }
export const Focus: Story = {
  render: () => textArea({ id: 'message-focus', label: 'Message' }),
  parameters: { pseudo: { focusVisible: true } },
}

export const React: Story = {
  render: () =>
    mountReact(
      createElement(
        'div',
        { className: 'sb-column' },
        STATES.map((props) => createElement(ReactTextArea, { key: props.id, ...props })),
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
          STATES.map((props) => h(VueTextArea, props)),
        ),
    }),
}
