import { onBeforeUnmount, onMounted, type Ref, watch } from 'vue'

/**
 * Pilote un `<dialog>` natif depuis `open` : `showModal()` rend le reste de la page inerte
 * et ferme sur Échap. Toute fermeture appelle `onClose` et rend le focus au déclencheur.
 */
export const useModal = (
  dialog: Readonly<Ref<HTMLDialogElement | null>>,
  open: () => boolean,
  onClose: () => void,
) => {
  let opener: Element | null = null

  const sync = (isOpen: boolean) => {
    const element = dialog.value
    if (!element) return
    if (isOpen && !element.open) {
      opener = document.activeElement
      element.showModal()
    }
    if (!isOpen && element.open) element.close()
  }

  const handleClose = () => {
    if (opener instanceof HTMLElement) opener.focus()
    onClose()
  }

  onMounted(() => {
    dialog.value?.addEventListener('close', handleClose)
    sync(open())
  })
  onBeforeUnmount(() => dialog.value?.removeEventListener('close', handleClose))
  watch(open, sync)
}
