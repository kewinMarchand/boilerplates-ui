import { skeleton } from '@kewinmarchand/css/reference/markup.ts'
import { Skeleton as ReactSkeleton } from '@kewinmarchand/react'
import { Skeleton as VueSkeleton } from '@kewinmarchand/vue'
import { createElement } from 'react'
import { h } from 'vue'

import { mountReact, mountVue } from './support/frameworks'

import type { Meta, StoryObj } from '@storybook/html-vite'

const meta: Meta = { title: 'Composants/Squelette' }
export default meta

type Story = StoryObj

const wrap = (html: string) => `<div class="sb-column" aria-busy="true">${html}</div>`

export const Bloc: Story = { render: () => wrap(skeleton()) }
export const Texte: Story = {
  render: () =>
    wrap(`${skeleton({ variant: 'text' })}${skeleton({ variant: 'text', width: '60%' })}`),
}
export const Cercle: Story = { render: () => wrap(skeleton({ variant: 'circle' })) }

export const React: Story = {
  render: () =>
    mountReact(
      createElement('div', { className: 'sb-column', 'aria-busy': true }, [
        createElement(ReactSkeleton, { key: 'c', variant: 'circle' }),
        createElement(ReactSkeleton, { key: 't', variant: 'text', width: '60%' }),
        createElement(ReactSkeleton, { key: 'b' }),
      ]),
    ),
}

export const Vue: Story = {
  render: () =>
    mountVue({
      render: () =>
        h('div', { class: 'sb-column', 'aria-busy': 'true' }, [
          h(VueSkeleton, { variant: 'circle' }),
          h(VueSkeleton, { variant: 'text', width: '60%' }),
          h(VueSkeleton),
        ]),
    }),
}
