<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    id: string
    text: string
    /** Le déclencheur focalisable, qui reçoit l'identifiant de la bulle pour son `aria-describedby`. */
    children: Snippet<[string]>
  }

  let { id, text, children }: Props = $props()

  let root = $state<HTMLSpanElement>()
  let dismissed = $state(false)

  // Échap masque la bulle tant que le pointeur ou le focus reste sur le déclencheur (WCAG 1.4.13).
  $effect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && root?.matches(':hover, :focus-within')) dismissed = true
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  })
</script>

<!-- Enveloppe sans rôle, comme la référence : les écouteurs ne font que réafficher la bulle, l'interaction est sur le déclencheur. -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<span
  bind:this={root}
  class="bui-tooltip"
  data-dismissed={dismissed ? '' : undefined}
  onmouseleave={() => (dismissed = false)}
  onfocusout={() => (dismissed = false)}
>
  {@render children(id)}
  <span {id} class="bui-tooltip__bubble" role="tooltip">{text}</span>
</span>
