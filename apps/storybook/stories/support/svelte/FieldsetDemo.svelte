<!-- Démonstration du groupe de champs : des cases à cocher sous une légende. -->
<script lang="ts">
  import { Checkbox, Fieldset } from '@kewinmarchand/svelte'

  import type { ComponentProps } from 'svelte'

  interface Props {
    fieldset: Omit<ComponentProps<typeof Fieldset>, 'children'>
    choices: { suffix: string; label: string }[]
  }

  let { fieldset, choices }: Props = $props()
</script>

<Fieldset {...fieldset}>
  {#each choices as { suffix, label } (suffix)}
    <Checkbox id="{fieldset.id}-{suffix}" {label} />
  {/each}
</Fieldset>
