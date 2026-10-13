import { useEffect, useRef, useState } from 'react'

/** Échap masque l'info-bulle survolée ou focalisée, la sortie du survol ou du focus la rétablit. */
export const useTooltip = () => {
  const ref = useRef<HTMLSpanElement>(null)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && ref.current?.matches(':hover, :focus-within'))
        setDismissed(true)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return { ref, dismissed, reset: () => setDismissed(false) }
}
