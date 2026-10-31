<!-- Monte un composant de la couche Svelte dans une histoire, avec un contenu par défaut en HTML brut. -->
<script lang="ts">
  import type { Component } from 'svelte'

  interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- n'importe quel composant de la bibliothèque
    component: Component<any>
    props?: object
    html?: string | undefined
  }

  let { component: Rendered, props = {}, html }: Props = $props()
</script>

{#if html === undefined}
  <Rendered {...props} />
{:else}
  <!-- eslint-disable-next-line svelte/no-at-html-tags -- HTML figé écrit dans l'histoire, jamais d'entrée extérieure -->
  <Rendered {...props}>{@html html}</Rendered>
{/if}
