import { createElement } from 'react'
import { h } from 'vue'

import { progress, type ProgressOptions } from '@kewinmarchand/css/reference/markup.ts'

import { Progress as ReactProgress } from '@kewinmarchand/react'
import { Progress as SvelteProgress } from '@kewinmarchand/svelte'
import { Progress as VueProgress } from '@kewinmarchand/vue'

import { mountReact, mountSvelte, mountVue } from './support/frameworks'
import { grid, OVERVIEW } from './support/grid'

import type { Meta, StoryObj } from '@storybook/html-vite'

const meta: Meta<ProgressOptions> = {
  title: 'Retours/Barre de progression',
  args: { value: 40, max: 100, label: 'Progression', size: 'md', showValue: true },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    max: { control: { type: 'number', min: 1 } },
    label: { control: 'text' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    showValue: { control: 'boolean' },
  },
}
export default meta

type Story = StoryObj<ProgressOptions>

export const ToutesLesVariantes: Story = {
  name: 'Toutes les variantes',
  parameters: OVERVIEW,
  render: () =>
    grid(
      'Tailles',
      ['Rendu'],
      [
        { label: 'Petit', cells: [progress({ value: 25, size: 'sm', label: 'Étape 1', showValue: true })] },
        { label: 'Moyen', cells: [progress({ value: 60, label: 'Étape 2', showValue: true })] },
        { label: 'Grand', cells: [progress({ value: 80, size: 'lg', label: 'Étape 3', showValue: true })] },
      ],
    ),
}

export const Html: Story = { name: 'HTML', render: (args) => progress(args) }
export const React: Story = { render: (args) => mountReact(createElement(ReactProgress, args)) }
export const Vue: Story = { render: (args) => mountVue({ render: () => h(VueProgress, args) }) }
export const Svelte: Story = { render: (args) => mountSvelte(SvelteProgress, args) }
