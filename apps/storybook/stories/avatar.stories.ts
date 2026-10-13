import { avatar, type AvatarOptions } from '@kewinmarchand/css/reference/markup.ts'
import { Avatar as ReactAvatar } from '@kewinmarchand/react'
import { Avatar as VueAvatar } from '@kewinmarchand/vue'
import { createElement } from 'react'
import { h } from 'vue'

import { mountReact, mountVue } from './support/frameworks'

import type { Meta, StoryObj } from '@storybook/html-vite'

const meta: Meta = { title: 'Composants/Avatar' }
export default meta

type Story = StoryObj

const STATES: AvatarOptions[] = [
  { name: 'Camille Martin', size: 'sm' },
  { name: 'Camille Martin' },
  { name: 'Camille Martin', size: 'lg' },
  { name: 'Camille Martin', src: 'carte.svg' },
]

export const Initiales: Story = {
  render: () => `<div class="sb-stack">${STATES.slice(0, 3).map(avatar).join('')}</div>`,
}
export const Image: Story = { render: () => avatar(STATES[3]!) }
export const Decoratif: Story = {
  name: 'Décoratif, à côté du nom',
  render: () =>
    `<p class="sb-stack" style="align-items: center">${avatar({ name: 'Camille Martin', decorative: true })}<span>Camille Martin</span></p>`,
}

export const React: Story = {
  render: () =>
    mountReact(
      createElement(
        'div',
        { className: 'sb-stack' },
        STATES.map((props, index) => createElement(ReactAvatar, { key: index, ...props })),
      ),
    ),
}

export const Vue: Story = {
  render: () =>
    mountVue({
      render: () =>
        h(
          'div',
          { class: 'sb-stack' },
          STATES.map((props) => h(VueAvatar, props)),
        ),
    }),
}
