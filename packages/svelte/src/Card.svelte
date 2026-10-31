<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    title: string
    headingLevel?: 2 | 3 | 4 | 5 | 6
    media?: Snippet | undefined
    footer?: Snippet | undefined
    children: Snippet
  }

  let { title, headingLevel = 3, media, footer, children }: Props = $props()
</script>

<div class="bui-card">
  {#if media}<div class="bui-card__media">{@render media()}</div>{/if}
  <div class="bui-card__body">
    <svelte:element this={`h${headingLevel}`} class="bui-card__title">{title}</svelte:element>
    {@render children()}
  </div>
  {#if footer}<div class="bui-card__footer">{@render footer()}</div>{/if}
</div>
