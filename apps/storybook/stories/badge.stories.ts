import { badge, type BadgeOptions } from '@kewinmarchand/css/reference/markup.ts'
import { Badge as ReactBadge } from '@kewinmarchand/react'
import { Badge as VueBadge } from '@kewinmarchand/vue'
import { createElement } from 'react'
import { h } from 'vue'

import { mountReact, mountVue } from './support/frameworks'

import type { Meta, StoryObj } from '@storybook/html-vite'

const meta: Meta = { title: 'Composants/Badge' }
export default meta

type Story = StoryObj

const STATES: BadgeOptions[] = [
  { label: 'Brouillon' },
  { label: 'Nouveau', variant: 'info' },
  { label: 'En stock', variant: 'success' },
  { label: 'Stock faible', variant: 'warning' },
  { label: 'Épuisé', variant: 'error' },
]

export const Variantes: Story = {
  render: () => `<div class="sb-stack">${STATES.map(badge).join('')}</div>`,
}

export const React: Story = {
  render: () =>
    mountReact(
      createElement(
        'div',
        { className: 'sb-stack' },
        STATES.map(({ label, variant }) =>
          createElement(ReactBadge, { key: label, variant: variant ?? 'neutral', children: label }),
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
          { class: 'sb-stack' },
          STATES.map(({ label, variant }) =>
            h(VueBadge, { variant: variant ?? 'neutral' }, { default: () => label }),
          ),
        ),
    }),
}
