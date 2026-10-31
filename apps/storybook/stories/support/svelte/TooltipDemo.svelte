<!-- Démonstration de l'info-bulle sur un bouton icône. -->
<script lang="ts">
  import { IconButton, Tooltip } from '@kewinmarchand/svelte'

  let { id, text, label }: { id: string; text: string; label: string } = $props()
</script>

<Tooltip {id} {text}>
  {#snippet children(describedBy)}
    <IconButton {label} icon="trash" variant="outline" aria-describedby={describedBy} />
  {/snippet}
</Tooltip>
