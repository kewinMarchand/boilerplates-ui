import { useEffect, useRef } from 'react'

/**
 * Pilote un `<dialog>` natif depuis `open` : `showModal()` rend le reste de la page inerte
 * et ferme sur Échap. Toute fermeture appelle `onClose` et rend le focus au déclencheur.
 */
export const useModal = (open: boolean, onClose: () => void) => {
  const ref = useRef<HTMLDialogElement>(null)
  const opener = useRef<Element | null>(null)
  const onCloseRef = useRef(onClose)

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) {
      opener.current = document.activeElement
      dialog.showModal()
    }
    if (!open && dialog.open) dialog.close()
  }, [open])

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    const handleClose = () => {
      if (opener.current instanceof HTMLElement) opener.current.focus()
      onCloseRef.current()
    }
    dialog.addEventListener('close', handleClose)
    return () => dialog.removeEventListener('close', handleClose)
  }, [])

  return ref
}
