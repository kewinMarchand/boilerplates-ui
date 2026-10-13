import generated from '@kewinmarchand/tokens/tokens.json'

import { contrast } from './support/theme'

import type { Meta, StoryObj } from '@storybook/html-vite'

const meta: Meta = { title: 'Fondations/Tokens', parameters: { controls: { disable: true } } }
export default meta

type Story = StoryObj

const { tokens, enhanced } = generated as unknown as {
  tokens: {
    color: Record<string, string>
    font: { size: Record<string, string>; weight: Record<string, string> }
    space: Record<string, string>
    radius: Record<string, string>
    shadow: Record<string, string>
    breakpoint: Record<string, string>
  }
  enhanced: { color: Record<string, string>; font: { size: Record<string, string> } }
}

const isHex = (value: string) => /^#[0-9a-f]{6}$/i.test(value)

const swatch = (name: string, value: string) => {
  const ratio = isHex(value)
    ? `${contrast(value, '#ffffff').toFixed(1)}:1 sur blanc`
    : 'transparence'
  const strong = enhanced.color[name]
  return `<li class="sb-swatch"><div class="sb-swatch__color" style="background: var(--bui-color-${name})"></div><div class="sb-swatch__text"><strong>${name}</strong><code>${value}</code><span>${ratio}</span>${
    strong ? `<span>Renforcé : <code>${strong}</code></span>` : ''
  }</div></li>`
}

const scale = (items: [string, string][], render: (name: string, value: string) => string) =>
  `<ul class="sb-scale">${items.map(([name, value]) => `<li><code>${name} · ${value}</code>${render(name, value)}</li>`).join('')}</ul>`

export const Tokens: Story = {
  render: () => `<div class="sb-page">
    <header><h1>Tokens</h1><p>Source unique : <code>packages/tokens/src/tokens.ts</code>, générée en variables CSS <code>--bui-*</code>, JSON, thème MUI, thème Vuetify et thème Tailwind. Le mode renforcé ne surcharge que quelques valeurs, indiquées ici.</p></header>
    <section><h2>Couleurs</h2><ul class="sb-swatches">${Object.entries(tokens.color)
      .map(([name, value]) => swatch(name, value))
      .join('')}</ul></section>
    <section><h2>Échelle typographique</h2>${scale(Object.entries(tokens.font.size), (name) => `<span style="font-size: var(--bui-font-size-${name}); line-height: 1.2">Vélo de ville en acier${enhanced.font.size[name] ? ` <small>(renforcé ${enhanced.font.size[name]})</small>` : ''}</span>`)}</section>
    <section><h2>Graisses</h2>${scale(Object.entries(tokens.font.weight), (name) => `<span style="font-weight: var(--bui-font-weight-${name})">Vélo de ville en acier</span>`)}</section>
    <section><h2>Espacements</h2>${scale(Object.entries(tokens.space), (name) => `<span class="sb-bar" style="width: var(--bui-space-${name})"></span>`)}</section>
    <section><h2>Rayons et ombre</h2><div class="sb-stack">${Object.keys(tokens.radius)
      .map(
        (name) =>
          `<div style="width: 96px; height: 64px; border: 2px solid var(--bui-color-primary); border-radius: var(--bui-radius-${name})"></div>`,
      )
      .join('')}${Object.keys(tokens.shadow)
      .map(
        (name) =>
          `<div style="width: 96px; height: 64px; border-radius: var(--bui-radius-md); box-shadow: var(--bui-shadow-${name})"></div>`,
      )
      .join('')}</div></section>
    <section><h2>Points de rupture</h2>${scale(Object.entries(tokens.breakpoint), (_, value) => `<span class="sb-bar" style="width: min(100%, calc(${value} / 4))"></span>`)}</section>
  </div>`,
}
