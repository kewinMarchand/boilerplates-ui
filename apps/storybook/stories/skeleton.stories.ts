import { createElement } from 'react'
import { h } from 'vue'

import { skeleton, type SkeletonOptions } from '@kewinmarchand/css/reference/markup.ts'

import { Skeleton as ReactSkeleton } from '@kewinmarchand/react'
import { Skeleton as VueSkeleton } from '@kewinmarchand/vue'

import { mountReact, mountVue } from './support/frameworks'
import { grid, OVERVIEW } from './support/grid'

import type { Meta, StoryObj } from '@storybook/html-vite'

const meta: Meta<SkeletonOptions> = {
  title: 'Retours/Squelette',
  args: { variant: 'text', width: '60%' },
  argTypes: {
    variant: { control: 'select', options: ['block', 'text', 'circle'] },
    width: { control: 'text', description: 'Largeur CSS, vide pour 100 %' },
    height: { control: 'text' },
  },
}
export default meta

type Story = StoryObj<SkeletonOptions>

const busy = (content: string | HTMLElement) => {
  const root = document.createElement('div')
  root.setAttribute('aria-busy', 'true')
  root.style.maxWidth = '480px'
  if (typeof content === 'string') root.innerHTML = content
  else root.append(content)
  return root
}

export const ToutesLesVariantes: Story = {
  name: 'Toutes les variantes',
  parameters: OVERVIEW,
  render: () =>
    busy(
      grid(
        'Formes',
        ['Rendu'],
        [
          { label: 'Bloc', cells: [`<div style="width: 240px">${skeleton()}</div>`] },
          {
            label: 'Texte',
            cells: [
              `<div style="width: 240px">${skeleton({ variant: 'text' })}${skeleton({ variant: 'text', width: '60%' })}</div>`,
            ],
          },
          { label: 'Cercle', cells: [skeleton({ variant: 'circle' })] },
        ],
      ),
    ),
}

const clean = ({ variant, width, height }: SkeletonOptions): SkeletonOptions => ({
  ...(variant ? { variant } : {}),
  ...(width ? { width } : {}),
  ...(height ? { height } : {}),
})

export const Html: Story = { name: 'HTML', render: (args) => busy(skeleton(clean(args))) }
export const React: Story = {
  render: (args) => busy(mountReact(createElement(ReactSkeleton, clean(args)))),
}
export const Vue: Story = {
  render: (args) => busy(mountVue({ render: () => h(VueSkeleton, clean(args)) })),
}
