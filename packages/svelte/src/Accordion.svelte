<script lang="ts">
  import Icon from './Icon.svelte'

  import type { Snippet } from 'svelte'

  interface Props {
    /** Nom commun des `<details>` : un seul panneau ouvert à la fois. */
    name?: string | undefined
    items: { id: string; title: string; content: Snippet; open?: boolean | undefined }[]
  }

  let { name, items }: Props = $props()
</script>

<div class="bui-accordion">
  {#each items as item (item.id)}
    <details class="bui-accordion__item" {name} open={item.open}>
      <summary class="bui-accordion__summary">
        {item.title}<Icon name="chevron-down" class="bui-accordion__icon" />
      </summary>
      <div class="bui-accordion__content">{@render item.content()}</div>
    </details>
  {/each}
</div>
