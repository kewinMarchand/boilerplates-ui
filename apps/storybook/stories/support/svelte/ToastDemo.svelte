<!-- Démonstration de la file de toasts : deux déclencheurs et le conteneur. -->
<script lang="ts">
  import { Button, Toaster, type ToastVariant, useToaster } from '@kewinmarchand/svelte'

  interface Props {
    message: string
    variant?: ToastVariant | undefined
    error: { message: string; variant: ToastVariant }
    onClose?: ((id: string) => void) | undefined
  }

  let { message, variant, error, onClose }: Props = $props()

  const toaster = useToaster()
</script>

<div>
  <div class="sb-stack">
    <Button onclick={() => toaster.show({ message, ...(variant ? { variant } : {}) })}
      >Enregistrer</Button
    >
    <Button variant="outline" onclick={() => toaster.show(error)}>Provoquer une erreur</Button>
  </div>
  <Toaster
    toasts={toaster.toasts}
    onclose={(id) => {
      onClose?.(id)
      toaster.close(id)
    }}
  />
</div>
