import { button, card } from '@kewinmarchand/css/reference/markup.ts'
import { Button as ReactButton, Card as ReactCard } from '@kewinmarchand/react'
import { Button as VueButton, Card as VueCard } from '@kewinmarchand/vue'
import { createElement } from 'react'
import { h } from 'vue'

import { mountReact, mountVue } from './support/frameworks'

import type { Meta, StoryObj } from '@storybook/html-vite'

const meta: Meta = { title: 'Composants/Carte' }
export default meta

type Story = StoryObj

const TITLE = 'Randonnée dans les calanques'
const TEXT = 'Trois itinéraires balisés, de une à quatre heures de marche.'
const IMAGE = { src: '/carte.svg', alt: '', width: 640, height: 360 }

const grid = (html: string) => `<div class="sb-stack" style="max-width: 360px">${html}</div>`

export const Complete: Story = {
  name: 'Complète',
  render: () =>
    grid(
      card({
        title: TITLE,
        headingLevel: 2,
        media: `<img src="${IMAGE.src}" alt="" width="${IMAGE.width}" height="${IMAGE.height}" loading="lazy">`,
        body: `<p>${TEXT}</p>`,
        footer: button({ label: 'Réserver' }),
      }),
    ),
}
export const Minimale: Story = {
  render: () => grid(card({ title: TITLE, headingLevel: 2, body: `<p>${TEXT}</p>` })),
}

export const React: Story = {
  render: () =>
    mountReact(
      createElement(
        'div',
        { className: 'sb-stack', style: { maxWidth: 360 } },
        createElement(ReactCard, {
          title: TITLE,
          headingLevel: 2,
          media: createElement('img', { ...IMAGE, loading: 'lazy' }),
          footer: createElement(ReactButton, null, 'Réserver'),
          children: createElement('p', null, TEXT),
        }),
      ),
    ),
}

export const Vue: Story = {
  render: () =>
    mountVue({
      render: () =>
        h(
          'div',
          { class: 'sb-stack', style: { maxWidth: '360px' } },
          h(
            VueCard,
            { title: TITLE, headingLevel: 2 },
            {
              default: () => h('p', TEXT),
              media: () => h('img', { ...IMAGE, loading: 'lazy' }),
              footer: () => h(VueButton, null, { default: () => 'Réserver' }),
            },
          ),
        ),
    }),
}
