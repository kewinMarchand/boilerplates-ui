import { type KeyboardEvent, useRef, useState } from 'react'

/** Onglet actif, flèches gauche et droite, Début et Fin, focus suivant la sélection. */
export const useTabs = (ids: string[], initial: string | undefined) => {
  const [selected, setSelected] = useState(initial ?? ids[0])
  const refs = useRef(new Map<string, HTMLButtonElement>())

  const select = (id: string | undefined) => {
    if (!id) return
    setSelected(id)
    refs.current.get(id)?.focus()
  }

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, id: string) => {
    const index = ids.indexOf(id)
    const next = {
      ArrowLeft: ids[(index - 1 + ids.length) % ids.length],
      ArrowRight: ids[(index + 1) % ids.length],
      Home: ids[0],
      End: ids[ids.length - 1],
    }[event.key]
    if (!next) return
    event.preventDefault()
    select(next)
  }

  const register = (id: string) => (element: HTMLButtonElement | null) => {
    if (element) refs.current.set(id, element)
    else refs.current.delete(id)
  }

  return { selected, select, onKeyDown, register }
}
