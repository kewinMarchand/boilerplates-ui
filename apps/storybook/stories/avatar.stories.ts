import { createElement } from 'react'
import { h } from 'vue'

import { avatar, type AvatarOptions } from '@kewinmarchand/css/reference/markup.ts'

import { Avatar as ReactAvatar } from '@kewinmarchand/react'
import { Avatar as VueAvatar } from '@kewinmarchand/vue'

import { mountReact, mountVue } from './support/frameworks'
import { defined, grid, OVERVIEW } from './support/grid'

import type { Meta, StoryObj } from '@storybook/html-vite'

const SIZES = { sm: 'Petit', md: 'Moyen', lg: 'Grand' } as const

const meta: Meta<AvatarOptions> = {
  title: 'Affichage/Avatar',
  args: { name: 'Camille Martin', size: 'md', decorative: false },
  argTypes: {
    name: { control: 'text', description: 'Nom accessible et initiales' },
    src: { control: 'select', options: ['aucune', 'portrait.jpg'], mapping: { aucune: undefined } },
    size: { control: 'select', options: Object.keys(SIZES) },
    decorative: { control: 'boolean', description: 'Masqué aux aides techniques, à côté du nom' },
  },
}
export default meta

type Story = StoryObj<AvatarOptions>

export const ToutesLesVariantes: Story = {
  name: 'Toutes les variantes',
  parameters: OVERVIEW,
  render: () =>
    grid(
      'Contenus et tailles',
      Object.values(SIZES),
      [
        { label: 'Initiales', options: {} },
        { label: 'Image', options: { src: 'portrait.jpg' } },
        { label: 'Décoratif', options: { decorative: true } },
      ].map(({ label, options }) => ({
        label,
        cells: Object.keys(SIZES).map((size) =>
          avatar({ name: 'Camille Martin', size: size as 'md', ...options }),
        ),
      })),
    ),
}

export const Html: Story = { name: 'HTML', render: (args) => avatar(defined(args)) }
export const React: Story = {
  render: (args) => mountReact(createElement(ReactAvatar, defined(args))),
}
export const Vue: Story = {
  render: (args) => mountVue({ render: () => h(VueAvatar, defined(args)) }),
}
