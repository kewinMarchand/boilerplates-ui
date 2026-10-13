/**
 * Couleurs globales choisies dans la barre d'outils : réécrit les variables `--bui-*` sur la racine
 * de l'aperçu, avec les teintes dérivées. En mode renforcé, la primaire est assombrie jusqu'à 7:1.
 */
type Rgb = [number, number, number]

const toRgb = (hex: string): Rgb => {
  const value = hex.replace('#', '')
  return [0, 2, 4].map((start) => Number.parseInt(value.slice(start, start + 2), 16)) as Rgb
}

const toHex = (rgb: Rgb) =>
  `#${rgb.map((c) => Math.round(c).toString(16).padStart(2, '0')).join('')}`

const mix = (hex: string, target: Rgb, amount: number) => {
  const rgb = toRgb(hex)
  return toHex(rgb.map((c, index) => c + (target[index]! - c) * amount) as Rgb)
}

const WHITE: Rgb = [255, 255, 255]
const BLACK: Rgb = [0, 0, 0]

const luminance = (hex: string) => {
  const [r, g, b] = toRgb(hex).map((c) => {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  }) as Rgb
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export const contrast = (a: string, b: string) => {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number]
  return (light + 0.05) / (dark + 0.05)
}

const darkenUntil = (hex: string, ratio: number) => {
  let color = hex
  for (let step = 0; step < 20 && contrast(color, '#ffffff') < ratio; step++)
    color = mix(color, BLACK, 0.1)
  return color
}

export interface ThemeColors {
  primary?: string
  secondary?: string
  error?: string
}

const VARIABLES = [
  'primary',
  'primary-dark',
  'primary-surface-subtle',
  'primary-surface',
  'primary-surface-strong',
  'secondary',
  'error',
  'error-surface',
] as const

const isColor = (value: unknown): value is string =>
  typeof value === 'string' && /^#[0-9a-f]{6}$/i.test(value)

/** Applique les couleurs et renvoie les avertissements de contraste (texte blanc et fond blanc). */
export const applyTheme = (colors: ThemeColors, enhanced: boolean) => {
  const style = document.documentElement.style
  for (const name of VARIABLES) style.removeProperty(`--bui-color-${name}`)
  const warnings: string[] = []

  if (isColor(colors.primary)) {
    const primary = enhanced ? darkenUntil(colors.primary, 7) : colors.primary
    style.setProperty('--bui-color-primary', primary)
    style.setProperty('--bui-color-primary-dark', mix(primary, BLACK, 0.3))
    style.setProperty('--bui-color-primary-surface-subtle', mix(primary, WHITE, 0.94))
    style.setProperty('--bui-color-primary-surface', mix(primary, WHITE, 0.85))
    style.setProperty('--bui-color-primary-surface-strong', mix(primary, WHITE, 0.72))
    const ratio = contrast(primary, '#ffffff')
    if (ratio < 4.5)
      warnings.push(`primaire ${primary} : contraste ${ratio.toFixed(2)}:1 avec le blanc`)
  }
  if (isColor(colors.secondary)) style.setProperty('--bui-color-secondary', colors.secondary)
  if (isColor(colors.error)) {
    const error = enhanced ? darkenUntil(colors.error, 7) : colors.error
    style.setProperty('--bui-color-error', error)
    style.setProperty('--bui-color-error-surface', mix(error, WHITE, 0.94))
    const ratio = contrast(error, mix(error, WHITE, 0.94))
    if (ratio < 4.5) warnings.push(`erreur ${error} : contraste ${ratio.toFixed(2)}:1 sur son fond`)
  }
  return warnings
}
