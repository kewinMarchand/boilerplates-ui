import { readFileSync } from 'node:fs'
import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

/**
 * Passe axe (WCAG 2.1 A et AA) sur chaque histoire du Storybook construit, en mode standard et renforcé.
 * La liste vient de l'index du build : une histoire ajoutée est testée sans rien écrire ici.
 */
const INDEX = 'apps/storybook/storybook-static/index.json'
const MODES = ['standard', 'enhanced'] as const

const index = JSON.parse(readFileSync(INDEX, 'utf8')) as {
  entries: Record<string, { id: string; type: string; title: string; name: string }>
}
const stories = Object.values(index.entries).filter((entry) => entry.type === 'story')

for (const mode of MODES) {
  test.describe(`mode ${mode}`, () => {
    for (const story of stories) {
      test(`${story.title} : ${story.name}`, async ({ page }) => {
        await page.goto(
          `/iframe.html?id=${encodeURIComponent(story.id)}&viewMode=story&globals=a11yMode:${mode}`,
        )
        await expect(page.locator('#storybook-root > *').first()).toBeAttached()
        if (mode === 'enhanced')
          await expect(page.locator('html')).toHaveAttribute('data-a11y-mode', 'enhanced')
        if (/ouverte/i.test(story.name)) await expect(page.locator('dialog[open]')).toBeVisible()

        // L'addon a11y lance aussi axe dans l'iframe : on relance tant que son passage n'est pas fini.
        let violations: string[] = []
        await expect(async () => {
          const results = await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
            .analyze()
          violations = results.violations.map(({ id, nodes }) => `${id} (${nodes.length})`)
        }).toPass()
        expect(violations).toEqual([])
      })
    }
  })
}
