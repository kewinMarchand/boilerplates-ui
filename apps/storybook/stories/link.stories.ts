import { link } from '@kewinmarchand/css/reference/markup.ts'
import { Link as ReactLink } from '@kewinmarchand/react'
import { Link as VueLink } from '@kewinmarchand/vue'
import { createElement } from 'react'
import { h } from 'vue'

import { mountReact, mountVue } from './support/frameworks'

import type { Meta, StoryObj } from '@storybook/html-vite'

const meta: Meta = { title: 'Composants/Lien' }
export default meta

type Story = StoryObj

const INTERNAL = { href: '#contact', label: 'Nous contacter' }
const EXTERNAL = { href: 'https://www.w3.org/WAI/', label: 'Ressources du W3C', external: true }

const paragraph = (html: string) => `<p>Pour toute question, ${html}.</p>`

export const Interne: Story = { render: () => paragraph(link(INTERNAL)) }
export const Externe: Story = { render: () => paragraph(link(EXTERNAL)) }
export const Survol: Story = {
  render: () => paragraph(link(INTERNAL)),
  parameters: { pseudo: { hover: true } },
}
export const Focus: Story = {
  render: () => paragraph(link(INTERNAL)),
  parameters: { pseudo: { focusVisible: true } },
}

export const React: Story = {
  render: () =>
    mountReact(
      createElement(
        'p',
        null,
        createElement(ReactLink, { href: INTERNAL.href, children: INTERNAL.label }),
        ' ou ',
        createElement(ReactLink, { href: EXTERNAL.href, external: true, children: EXTERNAL.label }),
      ),
    ),
}

export const Vue: Story = {
  render: () =>
    mountVue({
      render: () =>
        h('p', [
          h(VueLink, { href: INTERNAL.href }, { default: () => INTERNAL.label }),
          ' ou ',
          h(VueLink, { href: EXTERNAL.href, external: true }, { default: () => EXTERNAL.label }),
        ]),
    }),
}
