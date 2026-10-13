import { checkbox, fieldset, type FieldsetOptions } from '@kewinmarchand/css/reference/markup.ts'
import { Checkbox as ReactCheckbox, Fieldset as ReactFieldset } from '@kewinmarchand/react'
import { Checkbox as VueCheckbox, Fieldset as VueFieldset } from '@kewinmarchand/vue'
import { createElement } from 'react'
import { h } from 'vue'

import { mountReact, mountVue } from './support/frameworks'
import { grid, OVERVIEW, uid } from './support/grid'

import type { Meta, StoryObj } from '@storybook/html-vite'

type Args = Omit<FieldsetOptions, 'body'>

const CHOICES = [
  { suffix: 'sms', label: 'Par SMS' },
  { suffix: 'mail', label: 'Par e-mail' },
]

const body = (id: string) =>
  CHOICES.map(({ suffix, label }) => checkbox({ id: `${id}-${suffix}`, label })).join('')

const meta: Meta<Args> = {
  title: 'Formulaire/Groupe de champs',
  args: { id: 'contact', legend: 'Être contacté', hint: '', error: '', required: false },
  argTypes: {
    id: { control: 'text' },
    legend: { control: 'text' },
    hint: { control: 'text' },
    error: { control: 'text' },
    required: { control: 'boolean' },
  },
}
export default meta

type Story = StoryObj<Args>

const html = (options: Partial<Args>) => {
  const id = uid('contact')
  return fieldset({ id, legend: 'Être contacté', ...options, body: body(id) })
}

export const ToutesLesVariantes: Story = {
  name: 'Toutes les variantes',
  parameters: OVERVIEW,
  render: () =>
    grid(
      'États',
      ['Rendu'],
      [
        { label: 'Normal', cells: [html({})] },
        { label: 'Avec aide', cells: [html({ hint: 'Une ou plusieurs options' })] },
        {
          label: 'Requis en erreur',
          cells: [html({ required: true, error: 'Choisir au moins un moyen de contact' })],
        },
      ],
    ),
}

export const Html: Story = {
  name: 'HTML',
  render: (args) => fieldset({ ...args, body: body(args.id) }),
}

export const React: Story = {
  render: (args) =>
    mountReact(
      createElement(ReactFieldset, {
        ...args,
        children: CHOICES.map(({ suffix, label }) =>
          createElement(ReactCheckbox, { key: suffix, id: `${args.id}-${suffix}`, label }),
        ),
      }),
    ),
}

export const Vue: Story = {
  render: (args) =>
    mountVue({
      render: () =>
        h(VueFieldset, args, {
          default: () =>
            CHOICES.map(({ suffix, label }) =>
              h(VueCheckbox, { id: `${args.id}-${suffix}`, label }),
            ),
        }),
    }),
}
