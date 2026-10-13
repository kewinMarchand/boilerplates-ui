import { switchControl, type SwitchOptions } from '@kewinmarchand/css/reference/markup.ts'
import { Switch as ReactSwitch } from '@kewinmarchand/react'
import { Switch as VueSwitch } from '@kewinmarchand/vue'
import { createElement } from 'react'
import { h } from 'vue'

import { mountReact, mountVue } from './support/frameworks'

import type { Meta, StoryObj } from '@storybook/html-vite'

const meta: Meta = { title: 'Composants/Interrupteur' }
export default meta

type Story = StoryObj

const STATES: SwitchOptions[] = [
  { id: 'notifications', label: 'Notifications par e-mail' },
  { id: 'sombre', label: 'Thème sombre', checked: true },
  { id: 'avion', label: 'Mode hors ligne', disabled: true },
]

export const Inactif: Story = { render: () => switchControl(STATES[0]!) }
export const Actif: Story = { render: () => switchControl(STATES[1]!) }
export const Desactive: Story = { name: 'Désactivé', render: () => switchControl(STATES[2]!) }
export const Focus: Story = {
  render: () => switchControl({ id: 'focus', label: 'Notifications par e-mail' }),
  parameters: { pseudo: { focusVisible: true } },
}

export const React: Story = {
  render: () =>
    mountReact(
      createElement(
        'div',
        { className: 'sb-column' },
        STATES.map(({ checked, ...props }) =>
          createElement(ReactSwitch, { key: props.id, ...props, defaultChecked: checked }),
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
            h(VueSwitch, { ...props, modelValue: checked ?? false }),
          ),
        ),
    }),
}
