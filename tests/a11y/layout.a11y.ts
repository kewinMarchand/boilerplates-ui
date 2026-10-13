import { expect, type Locator, type Page, test } from '@playwright/test'

/**
 * Ordre à l'écran des champs : libellé, aide, contrôle, erreur. Comparé sur les positions
 * verticales, et sur l'ordre des identifiants de `aria-describedby` (aide puis erreur).
 */
const ARGS = 'hint:Aide+du+champ;error:Erreur+du+champ;required:!true'

const VARIANTS = ['html', 'react', 'vue'].flatMap((implementation) =>
  ['standard', 'enhanced'].map((mode) => ({ implementation, mode })),
)

const open = (page: Page, id: string, { implementation, mode }: (typeof VARIANTS)[number]) =>
  page.goto(
    `/iframe.html?id=${encodeURIComponent(id.replace('--html', `--${implementation}`))}&viewMode=story&args=${ARGS}&globals=a11yMode:${mode}`,
  )

const box = async (locator: Locator) => {
  const value = await locator.boundingBox()
  if (!value) throw new Error('Élément non affiché')
  return value
}

const describedByOrder = async (control: Locator) =>
  expect(control).toHaveAttribute('aria-describedby', /-hint .*-error$/)

for (const variant of VARIANTS) {
  const suffix = `(${variant.implementation}, ${variant.mode})`

  for (const [name, id] of [
    ['champ texte', 'formulaire-champ-texte--html'],
    ['zone de texte', 'formulaire-zone-de-texte--html'],
    ['liste déroulante', 'formulaire-liste-déroulante--html'],
  ] as const) {
    test(`${name} : libellé, aide, contrôle, erreur ${suffix}`, async ({ page }) => {
      await open(page, id, variant)
      const label = await box(page.locator('.bui-field__label'))
      const hint = await box(page.locator('.bui-field__hint'))
      const control = page.locator('.bui-field__input')
      const input = await box(control)
      const error = await box(page.locator('.bui-field__error'))
      expect(label.y).toBeLessThan(hint.y)
      expect(hint.y).toBeLessThan(input.y)
      expect(input.y).toBeLessThan(error.y)
      await describedByOrder(control)
    })
  }

  test(`case à cocher : contrôle et libellé sur une ligne, aide sous le libellé, puis erreur ${suffix}`, async ({
    page,
  }) => {
    await open(page, 'formulaire-case-à-cocher--html', variant)
    const control = page.locator('.bui-checkbox__input')
    const input = await box(control)
    const label = await box(page.locator('.bui-checkbox__label'))
    const hint = await box(page.locator('.bui-checkbox__hint'))
    const error = await box(page.locator('.bui-checkbox__error'))
    expect(Math.abs(input.y + input.height / 2 - (label.y + label.height / 2))).toBeLessThan(4)
    expect(input.x).toBeLessThan(label.x)
    expect(hint.y).toBeGreaterThanOrEqual(label.y + label.height - 1)
    expect(Math.abs(hint.x - label.x)).toBeLessThan(2)
    expect(error.y).toBeGreaterThan(hint.y)
    await describedByOrder(control)
  })

  test(`groupe de boutons radio : légende, aide, contrôles, erreur ${suffix}`, async ({ page }) => {
    await open(page, 'formulaire-bouton-radio--html', variant)
    const legend = await box(page.locator('.bui-fieldset__legend'))
    const hint = await box(page.locator('.bui-fieldset__hint'))
    const content = await box(page.locator('.bui-fieldset__content'))
    const error = await box(page.locator('.bui-fieldset__error'))
    expect(legend.y).toBeLessThan(hint.y)
    expect(hint.y).toBeLessThan(content.y)
    expect(content.y).toBeLessThan(error.y)
    await describedByOrder(page.locator('.bui-fieldset'))
  })
}
