import { checkbox, fieldset, type FieldsetOptions } from '@kewinmarchand/css/reference/markup.ts'
import { Checkbox as ReactCheckbox, Fieldset as ReactFieldset } from '@kewinmarchand/react'
import { Checkbox as VueCheckbox, Fieldset as VueFieldset } from '@kewinmarchand/vue'
import { createElement } from 'react'
import { h } from 'vue'

import { mountReact, mountVue } from './support/frameworks'

import type { Meta, StoryObj } from '@storybook/html-vite'

const meta: Meta = { title: 'Composants/Groupe de champs' }
export default meta

type Story = StoryObj

const CHOICES = [
  { suffix: 'sms', label: 'Par SMS' },
  { suffix: 'mail', label: 'Par e-mail' },
]

const body = (id: string) =>
  CHOICES.map(({ suffix, label }) => checkbox({ id: `${id}-${suffix}`, label })).join('')

const STATES: Omit<FieldsetOptions, 'body'>[] = [
  { id: 'contact', legend: 'Être contacté' },
  { id: 'contact-aide', legend: 'Être contacté', hint: 'Une ou plusieurs options' },
  {
    id: 'contact-erreur',
    legend: 'Être contacté',
    required: true,
    error: 'Choisir au moins un moyen de contact',
  },
]

export const Simple: Story = { render: () => fieldset({ ...STATES[0]!, body: body('contact') }) }
export const AvecAide: Story = {
  name: 'Avec aide',
  render: () => fieldset({ ...STATES[1]!, body: body('contact-aide') }),
}
export const Erreur: Story = {
  name: 'Requis en erreur',
  render: () => fieldset({ ...STATES[2]!, body: body('contact-erreur') }),
}

export const React: Story = {
  render: () =>
    mountReact(
      createElement(
        'div',
        { className: 'sb-column' },
        STATES.map((props) =>
          createElement(ReactFieldset, {
            key: props.id,
            ...props,
            children: CHOICES.map(({ suffix, label }) =>
              createElement(ReactCheckbox, { key: suffix, id: `${props.id}-${suffix}`, label }),
            ),
          }),
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
          STATES.map((props) =>
            h(VueFieldset, props, {
              default: () =>
                CHOICES.map(({ suffix, label }) =>
                  h(VueCheckbox, { id: `${props.id}-${suffix}`, label }),
                ),
            }),
          ),
        ),
    }),
}
