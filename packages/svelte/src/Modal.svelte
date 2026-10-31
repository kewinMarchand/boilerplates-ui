<script lang="ts">
  import { tick } from 'svelte'

  import Icon from './Icon.svelte'

  import type { Snippet } from 'svelte'
  import type { HTMLDialogAttributes } from 'svelte/elements'

  interface Props extends Omit<HTMLDialogAttributes, 'id' | 'title' | 'open'> {
    id: string
    title: string
    open: boolean
    closeLabel?: string | undefined
    /** Tiroir latéral : la modale s'ouvre contre le bord indiqué. */
    side?: 'start' | 'end' | undefined
    /** Le titre reçoit le focus à l'ouverture et à chaque changement (navigation à niveaux dans un tiroir). */
    focusTitle?: boolean
    onclose?: () => void
    footer?: Snippet
    children: Snippet
  }

  let {
    id,
    title,
    open,
    closeLabel,
    side,
    focusTitle = false,
    onclose,
    footer,
    children,
    ...rest
  }: Props = $props()

  let dialog = $state<HTMLDialogElement>()
  let titleElement = $state<HTMLHeadingElement>()
  let opener: Element | null = null

  // `showModal()` rend le reste de la page inerte et ferme sur Échap ; toute fermeture rend le focus au déclencheur.
  $effect(() => {
    if (!dialog) return
    if (open && !dialog.open) {
      opener = document.activeElement
      dialog.showModal()
    }
    if (!open && dialog.open) dialog.close()
  })

  $effect(() => {
    const element = dialog
    if (!element) return
    const handleClose = () => {
      if (opener instanceof HTMLElement) opener.focus()
      onclose?.()
    }
    element.addEventListener('close', handleClose)
    return () => element.removeEventListener('close', handleClose)
  })

  $effect(() => {
    // Relu à chaque changement de titre : la navigation à niveaux d'un tiroir déplace aussi le focus.
    void title
    if (!open || !focusTitle) return
    void tick().then(() => titleElement?.focus())
  })
</script>

<dialog
  {...rest}
  bind:this={dialog}
  {id}
  class={['bui-modal', side && 'bui-modal--drawer', side === 'start' && 'bui-modal--start']}
  aria-labelledby="{id}-title"
>
  <div class="bui-modal__header">
    <!-- tabindex vaut -1 ou rien : le titre se focalise par script, jamais au clavier. -->
    <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
    <h2
      bind:this={titleElement}
      id="{id}-title"
      class="bui-modal__title"
      tabindex={focusTitle ? -1 : undefined}
    >
      {title}
    </h2>
    <button
      type="button"
      class="bui-modal__close"
      aria-label={closeLabel ?? 'Fermer'}
      onclick={() => dialog?.close()}
    >
      <Icon name="x" />
    </button>
  </div>
  <div class="bui-modal__body">{@render children()}</div>
  {#if footer}<div class="bui-modal__footer">{@render footer()}</div>{/if}
</dialog>
