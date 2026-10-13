import { button, card } from '@kewinmarchand/css/reference/markup.ts'
import { Button as ReactButton, Card as ReactCard } from '@kewinmarchand/react'
import { Button as VueButton, Card as VueCard } from '@kewinmarchand/vue'
import { createElement } from 'react'
import { h } from 'vue'

import { mountReact, mountVue } from './support/frameworks'
import { grid, OVERVIEW } from './support/grid'

import type { Meta, StoryObj } from '@storybook/html-vite'

interface Args {
  title: string
  text: string
  headingLevel: 2 | 3 | 4 | 5 | 6
  media: boolean
  action: string
}

const IMAGE = { src: 'carte.svg', alt: '', width: 640, height: 360 }
const img = `<img src="${IMAGE.src}" alt="" width="${IMAGE.width}" height="${IMAGE.height}" loading="lazy">`

const meta: Meta<Args> = {
  title: 'Affichage/Carte',
  args: {
    title: 'Randonnée dans les calanques',
    text: 'Trois itinéraires balisés, de une à quatre heures de marche.',
    headingLevel: 2,
    media: true,
    action: 'Réserver',
  },
  argTypes: {
    title: { control: 'text' },
    text: { control: 'text' },
    headingLevel: { control: 'select', options: [2, 3, 4, 5, 6] },
    media: { control: 'boolean', description: 'Image en tête' },
    action: { control: 'text', description: 'Bouton du pied, vide pour aucun' },
  },
}
export default meta

type Story = StoryObj<Args>

const html = ({ title, text, headingLevel, media, action }: Args) =>
  card({
    title,
    headingLevel,
    body: `<p>${text}</p>`,
    ...(media ? { media: img } : {}),
    ...(action ? { footer: button({ label: action }) } : {}),
  })

const narrow = (content: string | HTMLElement) => {
  const root = document.createElement('div')
  root.style.maxWidth = '360px'
  if (typeof content === 'string') root.innerHTML = content
  else root.append(content)
  return root
}

export const ToutesLesVariantes: Story = {
  name: 'Toutes les variantes',
  parameters: OVERVIEW,
  render: (args) =>
    grid(
      'Compositions',
      ['Rendu'],
      [
        { label: 'Complète', cells: [`<div style="max-width: 320px">${html(args)}</div>`] },
        {
          label: 'Sans image',
          cells: [`<div style="max-width: 320px">${html({ ...args, media: false })}</div>`],
        },
        {
          label: 'Image en <picture>',
          cells: [
            `<div style="max-width: 320px">${card({ title: args.title, headingLevel: args.headingLevel, body: `<p>${args.text}</p>`, media: `<picture><source srcset="${IMAGE.src}" type="image/svg+xml">${img}</picture>` })}</div>`,
          ],
        },
        {
          label: 'Minimale',
          cells: [
            `<div style="max-width: 320px">${html({ ...args, media: false, action: '' })}</div>`,
          ],
        },
      ],
    ),
}

export const Html: Story = { name: 'HTML', render: (args) => narrow(html(args)) }

export const React: Story = {
  render: ({ title, text, headingLevel, media, action }) =>
    narrow(
      mountReact(
        createElement(ReactCard, {
          title,
          headingLevel,
          ...(media ? { media: createElement('img', { ...IMAGE, loading: 'lazy' }) } : {}),
          ...(action ? { footer: createElement(ReactButton, null, action) } : {}),
          children: createElement('p', null, text),
        }),
      ),
    ),
}

export const Vue: Story = {
  render: ({ title, text, headingLevel, media, action }) =>
    narrow(
      mountVue({
        render: () =>
          h(
            VueCard,
            { title, headingLevel },
            {
              default: () => h('p', text),
              ...(media ? { media: () => h('img', { ...IMAGE, loading: 'lazy' }) } : {}),
              ...(action ? { footer: () => h(VueButton, null, { default: () => action }) } : {}),
            },
          ),
      }),
    ),
}
