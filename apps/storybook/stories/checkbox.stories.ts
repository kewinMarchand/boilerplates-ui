import { checkbox, type CheckboxOptions } from '@kewinmarchand/css/reference/markup.ts'
import { Checkbox as ReactCheckbox } from '@kewinmarchand/react'
import { Checkbox as VueCheckbox } from '@kewinmarchand/vue'
import { createElement } from 'react'
import { h } from 'vue'

import { mountReact, mountVue } from './support/frameworks'

import type { Meta, StoryObj } from '@storybook/html-vite'

const meta: Meta = { title: 'Composants/Case à cocher' }
export default meta

type Story = StoryObj

const STATES: CheckboxOptions[] = [
  { id: 'lettre', label: 'Recevoir la lettre d’information' },
  {
    id: 'souvenir',
    label: 'Se souvenir de moi',
    checked: true,
    hint: 'Pendant 30 jours sur cet appareil',
  },
  {
    id: 'cgu',
    label: 'J’accepte les conditions générales',
    required: true,
    error: 'Cocher la case pour continuer',
  },
  { id: 'archive', label: 'Option indisponible', disabled: true },
]

export const Simple: Story = { render: () => checkbox(STATES[0]!) }
export const Cochee: Story = { name: 'Cochée avec aide', render: () => checkbox(STATES[1]!) }
export const Erreur: Story = { name: 'Requise en erreur', render: () => checkbox(STATES[2]!) }
export const Desactivee: Story = { name: 'Désactivée', render: () => checkbox(STATES[3]!) }
export const Focus: Story = {
  render: () => checkbox({ id: 'lettre-focus', label: 'Recevoir la lettre d’information' }),
  parameters: { pseudo: { focusVisible: true } },
}

export const React: Story = {
  render: () =>
    mountReact(
      createElement(
        'div',
        { className: 'sb-column' },
        STATES.map(({ checked, ...props }) =>
          createElement(ReactCheckbox, { key: props.id, ...props, defaultChecked: checked }),
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
          STATES.map(({ checked, ...props }) =>
            h(VueCheckbox, { ...props, modelValue: checked ?? false }),
          ),
        ),
    }),
}
