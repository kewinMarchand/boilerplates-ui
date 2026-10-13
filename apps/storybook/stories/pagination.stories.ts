import { pagination } from '@kewinmarchand/css/reference/markup.ts'
import { Pagination as ReactPagination } from '@kewinmarchand/react'
import { Pagination as VuePagination } from '@kewinmarchand/vue'
import { createElement } from 'react'
import { h } from 'vue'

import { mountReact, mountVue } from './support/frameworks'

import type { Meta, StoryObj } from '@storybook/html-vite'

const meta: Meta = { title: 'Composants/Pagination' }
export default meta

type Story = StoryObj

const href = (page: number) => `#page-${page}`

export const Debut: Story = {
  name: 'Première page',
  render: () => pagination({ page: 1, count: 5, href }),
}
export const Milieu: Story = {
  name: 'Page du milieu, avec ellipses',
  render: () => pagination({ page: 6, count: 12, href }),
}
export const Fin: Story = {
  name: 'Dernière page',
  render: () => pagination({ page: 12, count: 12, href }),
}
export const React: Story = {
  render: () => mountReact(createElement(ReactPagination, { page: 6, count: 12, href })),
}
export const Vue: Story = {
  render: () => mountVue({ render: () => h(VuePagination, { page: 6, count: 12, href }) }),
}
