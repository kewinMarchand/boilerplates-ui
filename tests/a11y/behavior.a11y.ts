import { expect, type Page, test } from '@playwright/test'

/**
 * Comportement clavier que axe ne vérifie pas : focus, Échap, retour du focus, flèches.
 * Chaque scénario tourne sur l'histoire HTML et vanilla, puis sur React et Vue.
 */
const story = (page: Page, id: string) =>
  page.goto(`/iframe.html?id=${encodeURIComponent(id)}&viewMode=story`)

const IMPLEMENTATIONS = ['html', 'react', 'vue'] as const

const DIALOGS = {
  modale: {
    html: 'superpositions-modale--ouverte',
    react: 'superpositions-modale--react-ouverte',
    vue: 'superpositions-modale--vue-ouverte',
    trigger: 'Supprimer le brouillon',
  },
  tiroir: {
    html: 'superpositions-tiroir--ouvert',
    react: 'superpositions-tiroir--react-ouvert',
    vue: 'superpositions-tiroir--vue-ouvert',
    trigger: 'Ouvrir les filtres',
  },
}

const TWINS = (title: string) => ({
  html: `${title}--html`,
  react: `${title}--react`,
  vue: `${title}--vue`,
})

for (const implementation of IMPLEMENTATIONS) {
  test.describe(implementation, () => {
    for (const [name, ids] of Object.entries(DIALOGS)) {
      test(`${name} : focus dedans, Échap ferme, focus rendu au déclencheur`, async ({ page }) => {
        await story(page, ids[implementation])
        const dialog = page.locator('dialog[open]')
        await expect(dialog).toBeVisible()
        await page.keyboard.press('Escape')
        await expect(dialog).toHaveCount(0)
        // Ouverture par un vrai clic : le déclencheur prend le focus, comme pour un utilisateur.
        const trigger = page.getByRole('button', { name: ids.trigger })
        await trigger.click()
        await expect(dialog.locator(':focus')).toHaveCount(1)
        await page.keyboard.press('Escape')
        await expect(dialog).toHaveCount(0)
        await expect(trigger).toBeFocused()
      })
    }

    test('onglets : flèches, Début et Fin', async ({ page }) => {
      await story(page, TWINS('navigation-onglets')[implementation])
      const tabs = page.getByRole('tab')
      await tabs.first().click()
      await page.keyboard.press('ArrowRight')
      await expect(tabs.nth(1)).toBeFocused()
      await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true')
      await expect(page.getByRole('tabpanel')).toHaveText('Poids 14 kg, cadre taille M.')
      await page.keyboard.press('End')
      await expect(tabs.last()).toBeFocused()
      await page.keyboard.press('Home')
      await expect(tabs.first()).toHaveAttribute('aria-selected', 'true')
      await page.keyboard.press('ArrowLeft')
      await expect(tabs.last()).toBeFocused()
    })

    test('menu déroulant : ouverture au clavier, flèches, Échap rend le focus', async ({
      page,
    }) => {
      await story(page, TWINS('superpositions-menu-déroulant')[implementation])
      const trigger = page.getByRole('button', { name: 'Actions' })
      await trigger.focus()
      await page.keyboard.press('Enter')
      await expect(trigger).toHaveAttribute('aria-expanded', 'true')
      const items = page.getByRole('menuitem')
      await expect(items.first()).toBeFocused()
      await page.keyboard.press('ArrowDown')
      await expect(items.nth(1)).toBeFocused()
      await page.keyboard.press('ArrowUp')
      await page.keyboard.press('ArrowUp')
      await expect(items.last()).toBeFocused()
      await page.keyboard.press('Escape')
      await expect(page.getByRole('menu')).toBeHidden()
      await expect(trigger).toHaveAttribute('aria-expanded', 'false')
      await expect(trigger).toBeFocused()
    })

    test('info-bulle : visible au focus, Échap la masque sans perdre le focus', async ({
      page,
    }) => {
      await story(page, TWINS('superpositions-info-bulle')[implementation])
      const trigger = page.getByRole('button', { name: 'Supprimer' })
      const bubble = page.getByRole('tooltip')
      await expect(bubble).toBeHidden()
      await trigger.focus()
      await expect(bubble).toBeVisible()
      await expect(trigger).toHaveAccessibleDescription('Supprime l’article du panier')
      await page.keyboard.press('Escape')
      await expect(bubble).toBeHidden()
      await expect(trigger).toBeFocused()
    })

    test('toast : status ou alert selon la gravité, fermeture', async ({ page }) => {
      const id =
        implementation === 'html' ? 'retours-toast--html' : TWINS('retours-toast')[implementation]
      await story(page, id)
      await page.getByRole('button', { name: 'Enregistrer' }).click()
      await expect(page.getByRole('status')).toContainText('Profil enregistré.')
      await page.getByRole('button', { name: 'Provoquer une erreur' }).click()
      await expect(page.getByRole('alert')).toContainText('Erreur : Envoi impossible')
      await page.getByRole('button', { name: 'Fermer la notification' }).first().click()
      await expect(page.getByRole('status')).toHaveCount(0)
      await expect(page.getByRole('alert')).toHaveCount(1)
    })

    test('tableau : le tri pose aria-sort sur la seule colonne triée', async ({ page }) => {
      await story(page, TWINS('affichage-tableau')[implementation])
      const price = page.getByRole('columnheader', { name: /Prix/ })
      await page.getByRole('button', { name: /Prix/ }).click()
      await expect(price).toHaveAttribute('aria-sort', 'ascending')
      await expect(page.getByRole('rowheader').first()).toHaveText('Antivol')
      await page.getByRole('button', { name: /Prix/ }).click()
      await expect(price).toHaveAttribute('aria-sort', 'descending')
      await page.getByRole('button', { name: /Produit/ }).click()
      await expect(price).not.toHaveAttribute('aria-sort')
    })
  })
}

test('bouton en chargement : nom accessible avec son espace', async ({ page }) => {
  for (const id of ['actions-bouton--html', 'actions-bouton--react', 'actions-bouton--vue']) {
    await page.goto(`/iframe.html?id=${id}&viewMode=story&args=loading:!true`)
    await expect(page.getByRole('button', { name: 'Envoyer (chargement en cours)' })).toBeVisible()
  }
})
