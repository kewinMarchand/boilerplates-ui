<!-- Démonstration de la modale ou du tiroir : un déclencheur, le dialog et deux boutons de pied. -->
<script lang="ts">
  import { Button, Drawer, Modal } from '@kewinmarchand/svelte'

  // Même forme que DialogArgs de dialogs.ts, qui importe les composants Vue (illisibles pour svelte-check).
  interface DialogArgs {
    id: string
    trigger: string
    title: string
    text: string
    confirm: string
    closeLabel: string
    side?: 'start' | 'end' | undefined
    focusTitle?: boolean
    onClose?: () => void
  }

  let { args, isDrawer }: { args: DialogArgs; isDrawer: boolean } = $props()

  let open = $state(false)
  const close = () => (open = false)
  const Dialog = $derived(isDrawer ? Drawer : Modal)
</script>

<Button onclick={() => (open = true)}>{args.trigger}</Button>
<Dialog
  id={args.id}
  title={args.title}
  closeLabel={args.closeLabel}
  side={args.side}
  focusTitle={args.focusTitle ?? false}
  {open}
  onclose={() => {
    args.onClose?.()
    close()
  }}
>
  <p>{args.text}</p>
  {#snippet footer()}
    <Button variant="outline" onclick={close}>Annuler</Button>
    <Button onclick={close}>{args.confirm}</Button>
  {/snippet}
</Dialog>
