// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest'

import { initImageFallback } from '../src/imageFallback.js'

const mount = (html: string) => {
  document.body.innerHTML = html
  return document.querySelector('img') as HTMLImageElement
}

const state = (img: HTMLImageElement, complete: boolean, naturalWidth: number) => {
  Object.defineProperty(img, 'complete', { value: complete, configurable: true })
  Object.defineProperty(img, 'naturalWidth', { value: naturalWidth, configurable: true })
}

const PICTURE = '<picture class="bui-picture"><img src="photo.jpg" alt="Photo"></picture>'

let cleanup = () => {}
afterEach(() => cleanup())

describe('initImageFallback', () => {
  it('marque le .bui-picture quand son image échoue', () => {
    const img = mount(PICTURE)
    cleanup = initImageFallback()
    img.dispatchEvent(new Event('error'))
    expect(img.parentElement?.hasAttribute('data-image-error')).toBe(true)
  })

  it("ignore une image hors d'un .bui-picture", () => {
    const img = mount('<picture><img src="photo.jpg" alt="Photo"></picture>')
    cleanup = initImageFallback()
    img.dispatchEvent(new Event('error'))
    expect(img.parentElement?.hasAttribute('data-image-error')).toBe(false)
  })

  it("marque dès l'initialisation une image déjà en échec, pas une image chargée ou en attente", () => {
    document.body.innerHTML = PICTURE.repeat(3)
    const [failed, loaded, pending] = [...document.querySelectorAll('img')] as HTMLImageElement[]
    state(failed!, true, 0)
    state(loaded!, true, 640)
    state(pending!, false, 0)
    cleanup = initImageFallback()
    expect(failed!.parentElement?.hasAttribute('data-image-error')).toBe(true)
    expect(loaded!.parentElement?.hasAttribute('data-image-error')).toBe(false)
    expect(pending!.parentElement?.hasAttribute('data-image-error')).toBe(false)
  })

  it('retire la marque quand une source se charge', () => {
    const img = mount(PICTURE)
    cleanup = initImageFallback()
    img.dispatchEvent(new Event('error'))
    img.dispatchEvent(new Event('load'))
    expect(img.parentElement?.hasAttribute('data-image-error')).toBe(false)
  })

  it('se limite à la racine donnée', () => {
    document.body.innerHTML = `<div id="zone">${PICTURE}</div>${PICTURE}`
    const [inside, outside] = [...document.querySelectorAll('img')] as HTMLImageElement[]
    cleanup = initImageFallback(document.getElementById('zone')!)
    inside!.dispatchEvent(new Event('error'))
    outside!.dispatchEvent(new Event('error'))
    expect(inside!.parentElement?.hasAttribute('data-image-error')).toBe(true)
    expect(outside!.parentElement?.hasAttribute('data-image-error')).toBe(false)
  })

  it('ne marque plus rien une fois débranché', () => {
    const img = mount(PICTURE)
    initImageFallback()()
    img.dispatchEvent(new Event('error'))
    expect(img.parentElement?.hasAttribute('data-image-error')).toBe(false)
  })
})
