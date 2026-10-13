import { textField, type TextFieldOptions } from '@kewinmarchand/css/reference/markup.ts'
import { TextField as ReactTextField } from '@kewinmarchand/react'
import { TextField as VueTextField } from '@kewinmarchand/vue'
import { createElement } from 'react'
import { h } from 'vue'

import { mountReact, mountVue } from './support/frameworks'

import type { Meta, StoryObj } from '@storybook/html-vite'

const meta: Meta = { title: 'Composants/Champ texte' }
export default meta

type Story = StoryObj

const STATES: TextFieldOptions[] = [
  { id: 'nom', label: 'Nom', autocomplete: 'family-name' },
  {
    id: 'email',
    label: 'E-mail',
    type: 'email',
    autocomplete: 'email',
    hint: 'Format : nom@domaine.fr',
  },
  { id: 'telephone', label: 'Téléphone', type: 'tel', autocomplete: 'tel', required: true },
  {
    id: 'site',
    label: 'Site web',
    type: 'url',
    hint: 'Adresse complète, avec https://',
    error: 'Saisir une adresse qui commence par https://',
  },
  { id: 'ville', label: 'Ville', disabled: true },
]

export const Simple: Story = {
  render: () => textField({ id: 'nom', label: 'Nom', autocomplete: 'family-name' }),
}
export const AvecAide: Story = {
  name: 'Avec aide',
  render: () =>
    textField({
      id: 'email',
      label: 'E-mail',
      type: 'email',
      autocomplete: 'email',
      hint: 'Format : nom@domaine.fr',
    }),
}
export const Requis: Story = {
  render: () =>
    textField({
      id: 'telephone',
      label: 'Téléphone',
      type: 'tel',
      autocomplete: 'tel',
      required: true,
    }),
}
export const Erreur: Story = { render: () => textField(STATES[3]!) }
export const Desactive: Story = {
  name: 'Désactivé',
  render: () => textField({ id: 'ville', label: 'Ville', disabled: true }),
}
export const Focus: Story = {
  render: () => textField({ id: 'nom-focus', label: 'Nom' }),
  parameters: { pseudo: { focusVisible: true } },
}

export const React: Story = {
  render: () =>
    mountReact(
      createElement(
        'div',
        { className: 'sb-column' },
        STATES.map(({ autocomplete, ...props }) =>
          createElement(ReactTextField, { key: props.id, ...props, autoComplete: autocomplete }),
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
          STATES.map((props) => h(VueTextField, props)),
        ),
    }),
}
