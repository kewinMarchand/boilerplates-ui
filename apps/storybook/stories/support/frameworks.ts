import { flushSync } from 'react-dom'
import { createRoot, type Root } from 'react-dom/client'
import { type Component as SvelteComponent, createRawSnippet, mount, unmount } from 'svelte'
import { type App, type Component, createApp } from 'vue'

import Slot from './Slot.svelte'

import type { ReactNode } from 'react'

/**
 * Monte un rendu React, Vue ou Svelte dans le Storybook HTML. Un seul montage vit à la fois :
 * le précédent est démonté au changement d'histoire, écouteurs compris.
 */
let reactRoot: Root | undefined
let vueApp: App | undefined
let svelteApp: Record<string, unknown> | undefined

const unmountPrevious = () => {
  reactRoot?.unmount()
  vueApp?.unmount()
  if (svelteApp) void unmount(svelteApp)
  reactRoot = undefined
  vueApp = undefined
  svelteApp = undefined
}

export const mountReact = (node: ReactNode) => {
  unmountPrevious()
  const element = document.createElement('div')
  reactRoot = createRoot(element)
  const root = reactRoot
  flushSync(() => root.render(node))
  return element
}

export const mountVue = (component: Component) => {
  unmountPrevious()
  const element = document.createElement('div')
  vueApp = createApp(component)
  vueApp.mount(element)
  return element
}

/** `html` remplit le contenu par défaut du composant (texte ou balisage fixe de l'histoire). */
export const mountSvelte = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- n'importe quel composant de la bibliothèque
  component: SvelteComponent<any>,
  props: object = {},
  html?: string,
) => {
  unmountPrevious()
  const element = document.createElement('div')
  svelteApp = mount(Slot, { target: element, props: { component, props, html } })
  return element
}

/** Snippet Svelte au balisage fixe (un seul élément racine), pour le contenu d'un panneau ou d'un onglet. */
export const snippet = (markup: string) => createRawSnippet(() => ({ render: () => markup }))
