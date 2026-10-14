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

// Couleur de fond : contraste du couple réellement utilisé, plutôt que contre le blanc
const PARTNERS: Record<string, string> = {
  'on-primary': 'primary',
  'on-secondary': 'secondary',
  'primary-surface-subtle': 'primary',
  'primary-surface': 'primary-dark',
  'primary-surface-strong': 'primary-dark',
  'secondary-surface-subtle': 'secondary',
  'secondary-surface': 'secondary-dark',
  'secondary-surface-strong': 'secondary-dark',
  surface: 'text',
  'surface-muted': 'text',
  'error-surface': 'error',
  'success-surface': 'success',
  'info-surface': 'info',
  'warning-surface': 'warning',
}

const GROUPS = {
  Marque: /^(primary|secondary|on-primary$|on-secondary$)/,
  'Texte et surfaces': /^(text|surface|border|backdrop|hover-overlay|on-primary-overlay)/,
  États: /^(error|success|info|warning)/,
} as const

const swatch = (name: string, value: string) => {
  const partner = PARTNERS[name]
  const ratio = !isHex(value)
    ? 'transparence'
    : partner
      ? `${contrast(value, tokens.color[partner]!).toFixed(1)}:1 avec ${partner}`
      : `${contrast(value, '#ffffff').toFixed(1)}:1 sur blanc`
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
    <section><h2>Couleurs</h2>${Object.entries(GROUPS)
      .map(
        ([group, pattern]) =>
          `<h3>${group}</h3><ul class="sb-swatches">${Object.entries(tokens.color)
            .filter(([name]) => pattern.test(name))
            .map(([name, value]) => swatch(name, value))
            .join('')}</ul>`,
      )
      .join('')}</section>
    <section><h2>Échelle typographique</h2>${scale(Object.entries(tokens.font.size), (name) => `<span style="font-size: var(--bui-font-size-${name}); line-height: 1.2">Vélo de ville en acier${enhanced.font.size[name] ? ` <small>(renforcé ${enhanced.font.size[name]})</small>` : ''}</span>`)}</section>
    <section><h2>Graisses</h2>${scale(Object.entries(tokens.font.weight), (name) => `<span style="font-weight: var(--bui-font-weight-${name})">Vélo de ville en acier</span>`)}</section>
    <section><h2>Espacements</h2>${scale(Object.entries(tokens.space), (name) => `<span class="sb-bar" style="width: var(--bui-space-${name})"></span>`)}</section>
    <section><h2>Rayons</h2><div class="sb-stack">${Object.entries(tokens.radius)
      .map(
        ([name, value]) =>
          `<figure class="sb-sample"><div class="sb-sample__box" style="border: 2px solid var(--bui-color-primary); border-radius: var(--bui-radius-${name})"></div><figcaption><code>radius-${name}</code> · ${value}</figcaption></figure>`,
      )
      .join('')}</div></section>
    <section><h2>Ombres</h2><div class="sb-stack">${Object.keys(tokens.shadow)
      .map(
        (name) =>
          `<figure class="sb-sample"><div class="sb-sample__box" style="box-shadow: var(--bui-shadow-${name})"></div><figcaption><code>shadow-${name}</code></figcaption></figure>`,
      )
      .join('')}</div></section>
    <section><h2>Points de rupture</h2>${scale(Object.entries(tokens.breakpoint), (_, value) => `<span class="sb-bar" style="width: min(100%, calc(${value} / 4))"></span>`)}</section>
  </div>`,
}
