import { switchControl, type SwitchOptions } from '@kewinmarchand/css/reference/markup.ts'
import { Switch as ReactSwitch } from '@kewinmarchand/react'
import { Switch as VueSwitch } from '@kewinmarchand/vue'
import { createElement } from 'react'
import { h } from 'vue'

import { mountReact, mountVue } from './support/frameworks'
import { grid, OVERVIEW, uid } from './support/grid'

import type { Meta, StoryObj } from '@storybook/html-vite'

const meta: Meta<SwitchOptions> = {
  title: 'Formulaire/Interrupteur',
  args: { id: 'notifications', label: 'Notifications par e-mail', checked: false, disabled: false },
  argTypes: {
    id: { control: 'text' },
    label: { control: 'text' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
}
export default meta

type Story = StoryObj<SwitchOptions>

const item = (options: Partial<SwitchOptions>) =>
  switchControl({ id: uid('notif'), label: 'Notifications', ...options })

export const ToutesLesVariantes: Story = {
  name: 'Toutes les variantes',
  parameters: OVERVIEW,
  render: () =>
    grid(
      'États',
      ['Inactif', 'Actif'],
      [
        { label: 'Normal', cells: [item({}), item({ checked: true })] },
        { label: 'Focus', state: 'focus', cells: [item({}), item({ checked: true })] },
        {
          label: 'Désactivé',
          cells: [item({ disabled: true }), item({ checked: true, disabled: true })],
        },
      ],
    ),
}

export const Html: Story = { name: 'HTML', render: (args) => switchControl(args) }

export const React: Story = {
  render: ({ checked, ...props }) =>
    mountReact(
      createElement(ReactSwitch, {
        ...props,
        defaultChecked: Boolean(checked),
        key: String(checked),
      }),
    ),
}

export const Vue: Story = {
  render: ({ checked, ...props }) =>
    mountVue({ render: () => h(VueSwitch, { ...props, modelValue: Boolean(checked) }) }),
}
