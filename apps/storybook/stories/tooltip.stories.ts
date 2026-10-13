import { createElement } from 'react'
import { h } from 'vue'

import { icon, tooltip } from '@kewinmarchand/css/reference/markup.ts'

import { IconButton as ReactIconButton, Tooltip as ReactTooltip } from '@kewinmarchand/react'
import { IconButton as VueIconButton, Tooltip as VueTooltip } from '@kewinmarchand/vue'

import { mountReact, mountVue } from './support/frameworks'
import { grid, OVERVIEW } from './support/grid'

import type { Meta, StoryObj } from '@storybook/html-vite'

interface Args {
  text: string
  label: string
}

const meta: Meta<Args> = {
  title: 'Superpositions/Info-bulle',
  args: { text: 'Supprime l’article du panier', label: 'Supprimer' },
  argTypes: {
    text: { control: 'text', description: 'Description, liée par aria-describedby' },
    label: { control: 'text', description: 'Nom accessible du déclencheur' },
  },
}
export default meta

type Story = StoryObj<Args>

const html = (id: string, { text, label }: Args) =>
  tooltip({
    id,
    text,
    trigger: `<button type="button" class="bui-button bui-button--outline bui-button--icon" aria-label="${label}" aria-describedby="${id}">${icon('trash')}</button>`,
  })

const padded = (content: string | HTMLElement) => {
  const root = document.createElement('div')
  root.style.paddingTop = '56px'
  if (typeof content === 'string') root.innerHTML = content
  else root.append(content)
  return root
}

export const ToutesLesVariantes: Story = {
  name: 'Toutes les variantes',
  parameters: OVERVIEW,
  render: (args) =>
    padded(
      grid(
        'États',
        ['Rendu'],
        [
          { label: 'Masquée', cells: [html('tip-vue-masquee', args)] },
          {
            label: 'Visible (focus ou survol)',
            state: 'focus-within',
            cells: [`<div style="padding-top: 40px">${html('tip-vue-visible', args)}</div>`],
          },
        ],
      ),
    ),
}

export const Html: Story = {
  name: 'HTML et vanilla',
  render: (args) => padded(html('tip-html', args)),
}

export const React: Story = {
  render: ({ text, label }) =>
    padded(
      mountReact(
        createElement(ReactTooltip, {
          id: 'tip-react',
          text,
          children: (describedBy: string) =>
            createElement(ReactIconButton, {
              label,
              icon: 'trash',
              variant: 'outline',
              'aria-describedby': describedBy,
            }),
        }),
      ),
    ),
}

export const Vue: Story = {
  render: ({ text, label }) =>
    padded(
      mountVue({
        render: () =>
          h(
            VueTooltip,
            { id: 'tip-vue', text },
            {
              default: ({ describedBy }: { describedBy: string }) =>
                h(VueIconButton, {
                  label,
                  icon: 'trash',
                  variant: 'outline',
                  'aria-describedby': describedBy,
                }),
            },
          ),
      }),
    ),
}
