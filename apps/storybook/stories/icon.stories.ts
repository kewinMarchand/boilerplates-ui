import { icon } from '@kewinmarchand/css/reference/markup.ts'
import { ICON_NAMES } from '@kewinmarchand/react'

import type { Meta, StoryObj } from '@storybook/html-vite'

const meta: Meta = { title: 'Fondations/Icône', parameters: { controls: { disable: true } } }
export default meta

type Story = StoryObj

export const ToutesLesIcones: Story = {
  name: 'Toutes les icônes',
  render: () =>
    `<div class="sb-page"><header><h1>Icônes</h1><p>Sprite tiré de Lucide, liste dans <code>packages/css/icons/icons.json</code>, généré par <code>make icons</code>. Décoratives par défaut (<code>aria-hidden</code>), porteuses de sens avec un nom accessible.</p></header><ul class="sb-swatches">${ICON_NAMES.map(
      (name) =>
        `<li class="sb-swatch"><div class="sb-swatch__text" style="font-size: 32px">${icon(name)}</div><div class="sb-swatch__text"><code>${name}</code></div></li>`,
    ).join('')}</ul></div>`,
}
