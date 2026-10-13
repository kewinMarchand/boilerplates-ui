import { readFileSync } from 'node:fs'
import { expect, test } from '@playwright/test'

/** Chaque vue d'ensemble de famille renvoie vers des pages détaillées qui existent. */
const index = JSON.parse(readFileSync('apps/storybook/storybook-static/index.json', 'utf8')) as {
  entries: Record<string, { id: string; type: string }>
}
const overviews = Object.values(index.entries).filter((entry) =>
  entry.id.endsWith('--vue-d-ensemble'),
)

test('sept familles ont leur vue d’ensemble', () => {
  expect(overviews).toHaveLength(7)
})

for (const { id } of overviews) {
  test(`${id} : liens vers des pages détaillées existantes`, async ({ page }) => {
    await page.goto(`/iframe.html?id=${id}&viewMode=story`)
    const hrefs = await page
      .locator('a[target="_top"]')
      .evaluateAll((links) =>
        links.map((link) => decodeURIComponent(link.getAttribute('href') ?? '')),
      )
    expect(hrefs.length).toBeGreaterThan(0)
    for (const href of hrefs) {
      const story = href.replace('./?path=/story/', '')
      expect(index.entries[story], href).toBeDefined()
    }
  })
}
