import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

import { generate } from '../src/generate.ts'

/**
 * Écrit les fichiers de `generated/` depuis les tokens. `--check` ne réécrit rien
 * et échoue si les fichiers versionnés sont périmés.
 */
const OUT_DIR = join(import.meta.dirname, '..', 'generated')
const outputs = Object.entries(generate()).map(
  ([name, content]) => [join(OUT_DIR, name), content] as const,
)

if (process.argv.includes('--check')) {
  const stale = outputs
    .filter(([path, content]) => !existsSync(path) || readFileSync(path, 'utf8') !== content)
    .map(([path]) => path)
  if (stale.length > 0) {
    console.error(`Tokens périmés (${stale.join(', ')}) : lancer make tokens.`)
    process.exit(1)
  }
  console.log(`Fichiers générés à jour (${outputs.length}).`)
} else {
  for (const [path, content] of outputs) writeFileSync(path, content)
  console.log(`${outputs.length} fichiers écrits dans packages/tokens/generated.`)
}
