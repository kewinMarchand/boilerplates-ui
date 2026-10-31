<!-- Démonstration des briques : une rangée répartie au-dessus d'un empilement. -->
<script lang="ts">
  import { Cluster, Stack } from '@kewinmarchand/svelte'

  let { labels }: { labels: string[] } = $props()
</script>

<Stack gap="4">
  <Cluster justify="between">
    {#each labels as label (label)}<div style="padding: 8px; border: 1px dashed">
        {label}
      </div>{/each}
  </Cluster>
  {#each labels as label (label)}<div style="padding: 8px; border: 1px dashed">{label}</div>{/each}
</Stack>
