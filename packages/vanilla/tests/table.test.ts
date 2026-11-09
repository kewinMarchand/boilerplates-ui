// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest'

import { initTables, sortTable } from '../src/table.js'

/** « ä » se range avec « a » en français et en anglais, après « z » en suédois. */
const mount = () => {
  document.body.innerHTML = `<div class="bui-table"><table><thead><tr>
    <th scope="col"><button type="button" data-bui-sort>Nom<svg><use href="/icons.svg#arrow-up-down"></use></svg></button></th>
  </tr></thead><tbody><tr><td>zèbre</td></tr><tr><td>äpple</td></tr></tbody></table></div>`
  return document.querySelector<HTMLButtonElement>('[data-bui-sort]')!
}

const order = () => [...document.querySelectorAll('tbody td')].map((cell) => cell.textContent)

let cleanup = () => {}
afterEach(() => {
  cleanup()
  cleanup = () => {}
  document.documentElement.removeAttribute('lang')
})

describe('tri des tableaux, langue', () => {
  it('trie en français sans langue de page', () => {
    sortTable(mount())
    expect(order()).toEqual(['äpple', 'zèbre'])
  })

  it('suit la langue de la page', () => {
    document.documentElement.lang = 'sv'
    sortTable(mount())
    expect(order()).toEqual(['zèbre', 'äpple'])
  })

  it('suit la langue fournie, avant celle de la page', () => {
    document.documentElement.lang = 'en'
    sortTable(mount(), { locale: 'sv' })
    expect(order()).toEqual(['zèbre', 'äpple'])
  })

  it('transmet la langue fournie au branchement par délégation', () => {
    const button = mount()
    cleanup = initTables(document, { locale: 'sv' })
    button.click()
    expect(order()).toEqual(['zèbre', 'äpple'])
  })
})
