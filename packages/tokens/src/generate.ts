import {
  A11Y_MODE_SELECTOR,
  AUTO_DARK_SELECTOR,
  dark,
  DARK_SELECTOR,
  enhanced,
  PREFIX,
  tokens,
} from './tokens.ts'

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
    `    ${cssVar('motion-duration-slow')}: 0s;`,
    '  }',
    '}',
    '',
    `${A11Y_MODE_SELECTOR} {`,
    declarations(enhanced),
    '}',
    '',
    `${DARK_SELECTOR} {`,
    '  color-scheme: dark;',
    declarations(dark),
    '}',
    '',
    '@media (prefers-color-scheme: dark) {',
    `  ${AUTO_DARK_SELECTOR} {`,
    '    color-scheme: dark;',
    declarations(dark).replace(/^/gm, '  '),
    '  }',
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

const json = (value: unknown) => `${JSON.stringify(value, null, 2)}\n`

export const generate = (): Record<string, string> => ({
  'tokens.css': toCss(),
  'tokens.json': json({ tokens, enhanced, dark }),
  'tailwind.css': toTailwind(),
})
