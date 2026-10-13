import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import lucide from '@iconify-json/lucide/icons.json' with { type: 'json' }
import svgstore from 'svgstore'

/**
 * Assemble le sprite et le type des noms d'icônes (React et Vue) à partir de `icons.json`
 * (noms Lucide). `--check` ne réécrit rien et échoue si les fichiers versionnés sont périmés.
 */
const LIST = 'packages/css/icons/icons.json'
const SPRITE = 'packages/css/icons/icons.svg'
const NAMES = ['packages/react/src/iconNames.ts', 'packages/vue/src/iconNames.ts']

const icons: Record<string, { body: string; width?: number; height?: number }> = lucide.icons
const names = [...new Set(JSON.parse(readFileSync(LIST, 'utf8')) as string[])].sort()

const sprite = svgstore({ svgAttrs: { xmlns: 'http://www.w3.org/2000/svg' } })
for (const name of names) {
  const icon = icons[name]
  if (!icon) throw new Error(`Icône inconnue de Lucide : ${name}`)
  const width = icon.width ?? lucide.width
  const height = icon.height ?? lucide.height
  sprite.add(
    name,
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">${icon.body}</svg>`,
  )
}

const namesModule = [
  '// Généré par `make icons` depuis packages/css/icons/icons.json, ne pas modifier à la main.',
  'export const ICON_NAMES = [',
  ...names.map((name) => `  '${name}',`),
  '] as const',
  '',
  'export type IconName = (typeof ICON_NAMES)[number]',
  '',
].join('\n')

const outputs: Record<string, string> = {
  [SPRITE]: `${sprite.toString({ inline: true }).replace(/(<symbol |<\/svg>)/g, '\n$1')}\n`,
  ...Object.fromEntries(NAMES.map((path) => [path, namesModule])),
}

if (process.argv.includes('--check')) {
  const stale = Object.entries(outputs)
    .filter(([path, content]) => !existsSync(path) || readFileSync(path, 'utf8') !== content)
    .map(([path]) => path)
  if (stale.length > 0) {
    console.error(`Icônes périmées (${stale.join(', ')}) : lancer make icons.`)
    process.exit(1)
  }
  console.log(`Sprite et types à jour (${names.length} icônes).`)
} else {
  for (const [path, content] of Object.entries(outputs)) writeFileSync(path, content)
  console.log(`${names.length} icônes écrites dans ${SPRITE} et ${NAMES.join(', ')}.`)
}
