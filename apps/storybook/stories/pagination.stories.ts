import { createElement } from 'react'
import { h } from 'vue'

import { pagination } from '@kewinmarchand/css/reference/markup.ts'

import { Pagination as ReactPagination } from '@kewinmarchand/react'
import { Pagination as VuePagination } from '@kewinmarchand/vue'

import { mountReact, mountVue } from './support/frameworks'
import { grid, OVERVIEW } from './support/grid'

import type { Meta, StoryObj } from '@storybook/html-vite'

interface Args {
  page: number
  count: number
}

const href = (page: number) => `#page-${page}`

const meta: Meta<Args> = {
  title: 'Navigation/Pagination',
  args: { page: 6, count: 12 },
  argTypes: {
    page: { control: { type: 'number', min: 1 } },
    count: { control: { type: 'number', min: 1 } },
  },
}
export default meta

type Story = StoryObj<Args>

const clamp = ({ page, count }: Args) => ({
  page: Math.min(Math.max(page, 1), Math.max(count, 1)),
  count: Math.max(count, 1),
  href,
})

export const ToutesLesVariantes: Story = {
  name: 'Toutes les variantes',
  parameters: OVERVIEW,
  render: () =>
    grid(
      'Positions',
      ['Rendu'],
      [
        { label: 'Première page', cells: [pagination({ page: 1, count: 5, href })] },
        { label: 'Milieu, avec ellipses', cells: [pagination({ page: 6, count: 12, href })] },
        { label: 'Dernière page', cells: [pagination({ page: 12, count: 12, href })] },
        { label: 'Focus', state: 'focus', cells: [pagination({ page: 2, count: 3, href })] },
      ],
    ),
}

export const Html: Story = { name: 'HTML', render: (args) => pagination(clamp(args)) }
export const React: Story = {
  render: (args) => mountReact(createElement(ReactPagination, clamp(args))),
}
export const Vue: Story = {
  render: (args) => mountVue({ render: () => h(VuePagination, clamp(args)) }),
}
