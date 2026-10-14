import { A11Y_MODE_SELECTOR, enhanced, PREFIX, tokens } from './tokens.ts'

type TokenTree = { readonly [key: string]: string | TokenTree }

const GENERATED_NOTICE =
  'Généré par `make tokens` depuis packages/tokens/src/tokens.ts, ne pas modifier à la main.'

export const flatten = (tree: TokenTree, path: string[] = []): [string, string][] =>
  Object.entries(tree).flatMap(([key, value]) =>
    typeof value === 'string'
      ? [[[...path, key].join('-'), value]]
      : flatten(value, [...path, key]),
  )

const cssVar = (name: string) => `--${PREFIX}-${name}`

const declarations = (tree: TokenTree) =>
  flatten(tree)
    .map(([name, value]) => `  ${cssVar(name)}: ${value};`)
    .join('\n')

const toCss = () =>
  [
    `/* ${GENERATED_NOTICE} */`,
    ':root {',
    declarations(tokens),
    '}',
    '',
    '@media (prefers-reduced-motion: reduce) {',
    '  :root {',
    `    ${cssVar('motion-duration')}: 0s;`,
    '  }',
    '}',
    '',
    `${A11Y_MODE_SELECTOR} {`,
    declarations(enhanced),
    '}',
    '',
  ].join('\n')

const toTailwind = () => {
  const { color, container, font, radius, shadow, size } = tokens
  const lines = [
    ...Object.keys(color).map((name) => `  --color-${name}: var(${cssVar(`color-${name}`)});`),
    `  --font-sans: var(${cssVar('font-family')});`,
    ...Object.keys(font.size).map(
      (name) => `  --text-${name}: var(${cssVar(`font-size-${name}`)});`,
    ),
    ...Object.keys(radius).map((name) => `  --radius-${name}: var(${cssVar(`radius-${name}`)});`),
    ...Object.keys(shadow).map((name) => `  --shadow-${name}: var(${cssVar(`shadow-${name}`)});`),
    ...Object.keys(size).map((name) => `  --spacing-${name}: var(${cssVar(`size-${name}`)});`),
    ...Object.keys(container).map(
      (name) => `  --container-${name}: var(${cssVar(`container-${name}`)});`,
    ),
    ...flatten(tokens.breakpoint).map(([name, value]) => `  --breakpoint-${name}: ${value};`),
  ]
  return [
    `/* ${GENERATED_NOTICE} */`,
    '/* À importer après tokens.css et `tailwindcss` : les utilitaires lisent les variables, le mode renforcé suit. */',
    '@theme inline {',
    ...lines,
    '}',
    '',
  ].join('\n')
}

const px = (value: string) => Number.parseInt(value, 10)

const toMui = () => {
  const { color, font, radius, breakpoint } = tokens
  const fontSize = (name: keyof typeof font.size) =>
    `var(${cssVar(`font-size-${name}`)}, ${font.size[name]})`
  return {
    breakpoints: {
      values: {
        xs: 0,
        sm: px(breakpoint.sm),
        md: px(breakpoint.md),
        lg: px(breakpoint.lg),
        xl: px(breakpoint.xl),
      },
    },
    palette: {
      primary: {
        main: color.primary,
        dark: color['primary-dark'],
        contrastText: color['on-primary'],
      },
      secondary: {
        main: color.secondary,
        dark: color['secondary-dark'],
        contrastText: color['on-secondary'],
      },
      error: { main: color.error },
      warning: { main: color.warning },
      info: { main: color.info },
      success: { main: color.success },
      text: { primary: color.text, secondary: color['text-muted'] },
      background: { default: color.surface, paper: color.surface },
      divider: color['border-subtle'],
    },
    typography: {
      fontFamily: font.family,
      fontSize: px(font.size.body),
      htmlFontSize: 16,
      h1: {
        fontSize: fontSize('h1'),
        fontWeight: Number(font.weight.bold),
        lineHeight: Number(font['line-height'].tight),
      },
      h2: { fontSize: fontSize('h2'), fontWeight: Number(font.weight.semibold) },
      h3: { fontSize: fontSize('h3'), fontWeight: Number(font.weight.semibold) },
      h4: { fontSize: fontSize('h4'), fontWeight: Number(font.weight.semibold) },
      h5: { fontSize: fontSize('title'), fontWeight: Number(font.weight.semibold) },
      subtitle1: { fontSize: fontSize('lead') },
      caption: { fontSize: fontSize('caption') },
      body1: { fontSize: fontSize('body') },
      body2: { fontSize: fontSize('body-sm') },
      overline: { fontSize: fontSize('overline') },
    },
    shape: { borderRadius: px(radius.md) },
  }
}

const vuetifyColors = (color: Record<string, string>) => ({
  primary: color.primary,
  secondary: color.secondary,
  error: color.error,
  info: color.info,
  success: color.success,
  warning: color.warning,
  background: color.surface,
  surface: color.surface,
  'on-background': color.text,
  'on-surface': color.text,
})

const toVuetify = () => ({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: { dark: false, colors: vuetifyColors(tokens.color) },
      enhanced: { dark: false, colors: vuetifyColors({ ...tokens.color, ...enhanced.color }) },
    },
  },
})

const json = (value: unknown) => `${JSON.stringify(value, null, 2)}\n`

export const generate = (): Record<string, string> => ({
  'tokens.css': toCss(),
  'tokens.json': json({ tokens, enhanced }),
  'tailwind.css': toTailwind(),
  'mui.json': json(toMui()),
  'vuetify.json': json(toVuetify()),
})
