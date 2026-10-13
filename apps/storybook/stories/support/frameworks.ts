import { flushSync } from 'react-dom'
import { createRoot, type Root } from 'react-dom/client'
import { type App, type Component, createApp } from 'vue'

import type { ReactNode } from 'react'

/**
 * Monte un rendu React ou Vue dans le Storybook HTML. Un seul montage vit à la fois :
 * le précédent est démonté au changement d'histoire, écouteurs compris.
 */
let reactRoot: Root | undefined
let vueApp: App | undefined

const unmountPrevious = () => {
  reactRoot?.unmount()
  vueApp?.unmount()
  reactRoot = undefined
  vueApp = undefined
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
