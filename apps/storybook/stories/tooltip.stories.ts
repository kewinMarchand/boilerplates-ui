import { icon, tooltip } from '@kewinmarchand/css/reference/markup.ts'
import { IconButton as ReactIconButton, Tooltip as ReactTooltip } from '@kewinmarchand/react'
import { IconButton as VueIconButton, Tooltip as VueTooltip } from '@kewinmarchand/vue'
import { createElement } from 'react'
import { h } from 'vue'

import { mountReact, mountVue } from './support/frameworks'

import type { Meta, StoryObj } from '@storybook/html-vite'

const meta: Meta = { title: 'Composants/Info-bulle' }
export default meta

type Story = StoryObj

const TEXT = 'Supprime l’article du panier'
const PADDED = (html: string) => `<div style="padding-top: 48px">${html}</div>`

const html = (id: string) =>
  PADDED(
    tooltip({
      id,
      text: TEXT,
      trigger: `<button type="button" class="bui-button bui-button--outline bui-button--icon" aria-label="Supprimer" aria-describedby="${id}">${icon('trash')}</button>`,
    }),
  )

export const Html: Story = { name: 'HTML et vanilla', render: () => html('tip-html') }
export const Visible: Story = {
  name: 'Visible au focus',
  render: () => html('tip-visible'),
  parameters: { pseudo: { focusWithin: true } },
}

export const React: Story = {
  render: () =>
    mountReact(
      createElement(
        'div',
        { style: { paddingTop: 48 } },
        createElement(ReactTooltip, {
          id: 'tip-react',
          text: TEXT,
          children: (describedBy: string) =>
            createElement(ReactIconButton, {
              label: 'Supprimer',
              icon: 'trash',
              variant: 'outline',
              'aria-describedby': describedBy,
            }),
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
          { style: { paddingTop: '48px' } },
          h(
            VueTooltip,
            { id: 'tip-vue', text: TEXT },
            {
              default: ({ describedBy }: { describedBy: string }) =>
                h(VueIconButton, {
                  label: 'Supprimer',
                  icon: 'trash',
                  variant: 'outline',
                  'aria-describedby': describedBy,
                }),
            },
          ),
        ),
    }),
}
