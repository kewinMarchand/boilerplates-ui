import { describe, expect, it } from 'vitest'

import { flatten, generate } from '../src/generate.ts'
import { enhanced, tokens } from '../src/tokens.ts'

const luminance = (hex: string) => {
  const channels = [1, 3, 5].map((start) => Number.parseInt(hex.slice(start, start + 2), 16) / 255)
  const [r = 0, g = 0, b = 0] = channels.map((c) =>
    c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4,
  )
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

const contrast = (a: string, b: string) => {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number]
  return (light + 0.05) / (dark + 0.05)
}

const PAIRS = [
  ['text', 'surface'],
  ['text-muted', 'surface'],
  ['primary', 'surface'],
  ['on-primary', 'primary'],
  ['on-primary', 'primary-dark'],
  ['primary', 'primary-surface-subtle'],
  ['primary-dark', 'primary-surface'],
  ['primary-dark', 'primary-surface-strong'],
  ['error', 'surface'],
  ['error', 'error-surface'],
  ['success', 'success-surface'],
  ['info', 'info-surface'],
  ['warning', 'warning-surface'],
] as const

describe('générateur de tokens', () => {
  const output = generate()

  it('déclare chaque token en variable CSS préfixée', () => {
    for (const [name, value] of flatten(tokens)) {
      expect(output['tokens.css']).toContain(`--bui-${name}: ${value};`)
    }
  })

  it('surcharge les tokens sous le mode renforcé', () => {
    const [, enhancedBlock = ''] = output['tokens.css']!.split('[data-a11y-mode="enhanced"] {')
    expect(enhancedBlock).toContain('--bui-font-size-body: 20px;')
    expect(enhancedBlock).toContain('--bui-color-text: #000000;')
    expect(enhancedBlock).toContain('--bui-focus-width: 4px;')
  })

  it('branche les adaptateurs sur les mêmes valeurs', () => {
    const mui = JSON.parse(output['mui.json']!)
    const vuetify = JSON.parse(output['vuetify.json']!)
    expect(mui.palette.primary.main).toBe(tokens.color.primary)
    expect(vuetify.theme.themes.enhanced.colors.primary).toBe(enhanced.color.primary)
    expect(output['tailwind.css']).toContain('--color-primary: var(--bui-color-primary);')
    expect(output['tailwind.css']).toContain('--container-content: var(--bui-container-content);')
  })

  it.each(PAIRS)('contraste AA de %s sur %s en mode standard', (fg, bg) => {
    expect(contrast(tokens.color[fg], tokens.color[bg])).toBeGreaterThanOrEqual(4.5)
  })

  it.each(PAIRS)('contraste AAA de %s sur %s en mode renforcé', (fg, bg) => {
    const color: Record<string, string> = { ...tokens.color, ...enhanced.color }
    expect(contrast(color[fg]!, color[bg]!)).toBeGreaterThanOrEqual(7)
  })
})
