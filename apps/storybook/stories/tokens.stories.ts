import generated from '@kewinmarchand/tokens/tokens.json'

import type { Meta, StoryObj } from '@storybook/html-vite'

const meta: Meta = { title: 'Fondations/Tokens' }
export default meta

type Story = StoryObj

type Tree = { [key: string]: string | Tree }

const flatten = (tree: Tree, path: string[] = []): [string, string][] =>
  Object.entries(tree).flatMap(([key, value]) =>
    typeof value === 'string'
      ? [[[...path, key].join('-'), value]]
      : flatten(value, [...path, key]),
  )

const enhanced = new Map(flatten(generated.enhanced as Tree))

const preview = (name: string) => {
  const variable = `var(--bui-${name})`
  if (name.startsWith('color-'))
    return `<span style="display:inline-block;width:40px;height:24px;border:1px solid var(--bui-color-border);border-radius:4px;background:${variable}"></span>`
  if (name.startsWith('font-size-')) return `<span style="font-size:${variable}">Aa</span>`
  if (name.startsWith('space-') || name.startsWith('size-'))
    return `<span style="display:inline-block;height:12px;width:${variable};background:var(--bui-color-primary)"></span>`
  if (name.startsWith('radius-'))
    return `<span style="display:inline-block;width:40px;height:40px;border:2px solid var(--bui-color-primary);border-radius:${variable}"></span>`
  if (name.startsWith('shadow-'))
    return `<span style="display:inline-block;width:64px;height:40px;box-shadow:${variable}"></span>`
  return ''
}

const section = (group: string, tree: Tree) => {
  const rows = flatten(tree, [group])
    .map(
      ([name, value]) =>
        `<tr><th scope="row"><code>--bui-${name}</code></th><td>${preview(name)}</td><td><code>${value}</code></td><td>${enhanced.has(name) ? `<code>${enhanced.get(name)}</code>` : ''}</td></tr>`,
    )
    .join('')
  return `<table class="sb-tokens"><caption>${group}</caption><thead><tr><th scope="col">Variable</th><th scope="col">Aperçu</th><th scope="col">Standard</th><th scope="col">Renforcé</th></tr></thead><tbody>${rows}</tbody></table>`
}

export const Tokens: Story = {
  render: () =>
    `<h1>Tokens</h1><p>Source unique : <code>packages/tokens/src/tokens.ts</code>. La colonne Renforcé liste les surcharges sous <code>[data-a11y-mode="enhanced"]</code>.</p>${Object.entries(
      generated.tokens as Tree,
    )
      .map(([group, tree]) => (typeof tree === 'string' ? '' : section(group, tree)))
      .join('')}`,
}
