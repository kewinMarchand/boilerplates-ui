import { createElement } from 'react'
import { h } from 'vue'

import { link, type LinkOptions } from '@kewinmarchand/css/reference/markup.ts'

import { Link as ReactLink } from '@kewinmarchand/react'
import { Link as VueLink } from '@kewinmarchand/vue'

import { mountReact, mountVue } from './support/frameworks'
import { grid, OVERVIEW } from './support/grid'

import type { Meta, StoryObj } from '@storybook/html-vite'

const meta: Meta<LinkOptions> = {
  title: 'Actions/Lien',
  args: { href: '#contact', label: 'Nous contacter', external: false },
  argTypes: {
    href: { control: 'text' },
    label: { control: 'text' },
    external: { control: 'boolean', description: 'Nouvelle fenêtre, annoncée' },
  },
}
export default meta

type Story = StoryObj<LinkOptions>

const paragraph = (html: string) => `<p>Pour toute question, ${html}.</p>`

export const ToutesLesVariantes: Story = {
  name: 'Toutes les variantes',
  parameters: OVERVIEW,
  render: () =>
    grid(
      'Types et états',
      ['Normal', { label: 'Survol', state: 'hover' }, { label: 'Focus', state: 'focus' }],
      [
        { label: 'Interne', options: { href: '#contact', label: 'nous contacter' } },
        {
          label: 'Externe',
          options: { href: 'https://www.w3.org/WAI/', label: 'ressources du W3C', external: true },
        },
      ].map(({ label, options }) => ({
        label,
        cells: Array.from({ length: 3 }, () => link(options)),
      })),
    ),
}

export const Html: Story = { name: 'HTML', render: (args) => paragraph(link(args)) }

export const React: Story = {
  render: ({ label, ...props }) =>
    mountReact(
      createElement(
        'p',
        null,
        'Pour toute question, ',
        createElement(ReactLink, { ...props, children: label }),
        '.',
      ),
    ),
}

export const Vue: Story = {
  render: ({ label, ...props }) =>
    mountVue({
      render: () =>
        h('p', ['Pour toute question, ', h(VueLink, props, { default: () => label }), '.']),
    }),
}
