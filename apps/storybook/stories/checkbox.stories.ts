import { createElement } from 'react'
import { h } from 'vue'

import { checkbox, type CheckboxOptions } from '@kewinmarchand/css/reference/markup.ts'

import { Checkbox as ReactCheckbox } from '@kewinmarchand/react'
import { Checkbox as VueCheckbox } from '@kewinmarchand/vue'

import { FIELD_ARG_TYPES, fieldRows } from './support/fields'
import { mountReact, mountVue } from './support/frameworks'
import { grid, OVERVIEW, uid } from './support/grid'

import type { Meta, StoryObj } from '@storybook/html-vite'

type Args = CheckboxOptions & { onChange?: () => void }

const meta: Meta<Args> = {
  title: 'Formulaire/Case à cocher',
  args: {
    id: 'lettre',
    label: 'Recevoir la lettre d’information',
    checked: false,
    hint: '',
    error: '',
    required: false,
    disabled: false,
  },
  argTypes: { ...FIELD_ARG_TYPES, checked: { control: 'boolean' } },
}
export default meta

type Story = StoryObj<Args>

export const ToutesLesVariantes: Story = {
  name: 'Toutes les variantes',
  parameters: OVERVIEW,
  render: () =>
    grid(
      'États',
      ['Décochée', 'Cochée'],
      [
        ...fieldRows('cgu', (options) =>
          checkbox({ ...options, label: 'J’accepte les conditions' }),
        ).map((row) => ({
          ...row,
          cells: [
            row.cells[0]!,
            checkbox({
              id: uid('cgu-cochee'),
              label: 'J’accepte les conditions',
              checked: true,
              disabled: row.label === 'Désactivé',
            }),
          ],
        })),
      ],
    ),
}

export const Html: Story = { name: 'HTML', render: (args) => checkbox(args) }

export const React: Story = {
  render: ({ checked, ...props }) =>
    mountReact(
      createElement(ReactCheckbox, {
        ...props,
        defaultChecked: Boolean(checked),
        key: String(checked),
      }),
    ),
}

export const Vue: Story = {
  render: ({ checked, ...props }) =>
    mountVue({ render: () => h(VueCheckbox, { ...props, modelValue: Boolean(checked) }) }),
}
