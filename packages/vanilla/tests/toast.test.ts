// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'

import { showToast } from '../src/toast.js'

const toaster = () => {
  document.body.innerHTML = '<div class="bui-toaster" data-bui-toaster></div>'
  return document.querySelector<HTMLElement>('[data-bui-toaster]')!
}

const hidden = (toast: HTMLElement) => toast.querySelector('.bui-visually-hidden')?.textContent
const close = (toast: HTMLElement) =>
  toast.querySelector('.bui-toast__close')?.getAttribute('aria-label')

describe('showToast, libellés', () => {
  it('garde les libellés français par défaut', () => {
    const toast = showToast(toaster(), { message: 'Enregistré', variant: 'success' })

    expect(hidden(toast)).toBe('Succès : ')
    expect(close(toast)).toBe('Fermer la notification')
  })

  it.each([
    ['info', 'Information : '],
    ['warning', 'Attention : '],
    ['error', 'Erreur : '],
  ] as const)('préfixe par défaut de la variante %s', (variant, expected) => {
    expect(hidden(showToast(toaster(), { message: 'x', variant }))).toBe(expected)
  })

  it('pose les libellés fournis', () => {
    const toast = showToast(toaster(), {
      message: 'Saved',
      variant: 'success',
      prefix: 'Success:',
      closeLabel: 'Close notification',
    })

    expect(hidden(toast)).toBe('Success: ')
    expect(close(toast)).toBe('Close notification')
    expect(toast.querySelector('.bui-toast__message')?.textContent).toBe('Success: Saved')
  })
})
