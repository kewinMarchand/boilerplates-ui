import { type KeyboardEvent, useEffect, useRef, useState } from 'react'

/** Motif ARIA menu button : ouverture, flèches, Début, Fin, Échap et Tab, clic extérieur. */
export const useMenu = (count: number) => {
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const items = useRef<(HTMLButtonElement | null)[]>([])
  const pendingFocus = useRef<number | null>(null)

  useEffect(() => {
    if (open && pendingFocus.current !== null) items.current[pendingFocus.current]?.focus()
    pendingFocus.current = null
  }, [open])

  useEffect(() => {
    if (!open) return
    const handleClick = (event: MouseEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [open])

  const openAt = (index: number) => {
    pendingFocus.current = index
    setOpen(true)
  }

  const close = (restoreFocus = true) => {
    setOpen(false)
    if (restoreFocus) trigger.current?.focus()
  }

  const onTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return
    event.preventDefault()
    openAt(event.key === 'ArrowDown' ? 0 : count - 1)
  }

  const onItemKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const next = {
      ArrowDown: (index + 1) % count,
      ArrowUp: (index - 1 + count) % count,
      Home: 0,
      End: count - 1,
    }[event.key]
    if (next !== undefined) {
      event.preventDefault()
      items.current[next]?.focus()
    } else if (event.key === 'Escape') close()
    else if (event.key === 'Tab') close(false)
  }

  const toggle = () => (open ? close() : openAt(0))

  const registerItem = (index: number) => (element: HTMLButtonElement | null) => {
    items.current[index] = element
  }

  return { open, root, trigger, registerItem, toggle, close, onTriggerKeyDown, onItemKeyDown }
}
