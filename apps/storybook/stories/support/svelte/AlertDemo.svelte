<!-- Démonstration de l'alerte, avec un bouton d'action facultatif. -->
<script lang="ts">
  import { Alert, Button } from '@kewinmarchand/svelte'

  import type { ComponentProps } from 'svelte'

  interface Props {
    alert: Omit<ComponentProps<typeof Alert>, 'children' | 'action'>
    text: string
    actionLabel?: string | undefined
  }

  let { alert, text, actionLabel }: Props = $props()
</script>

{#if actionLabel}
  <Alert {...alert}>
    <p>{text}</p>
    {#snippet action()}<Button variant="outline" size="sm">{actionLabel}</Button>{/snippet}
  </Alert>
{:else}
  <Alert {...alert}><p>{text}</p></Alert>
{/if}
