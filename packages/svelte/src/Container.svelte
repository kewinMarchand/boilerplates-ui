<script lang="ts">
  import type { LayoutTag } from './layout'
  import type { Snippet } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'

  /** Conteneur large de la page : 1440 px au plus, gouttières selon la largeur. */
  interface Props extends HTMLAttributes<HTMLElement> {
    as?: LayoutTag
    children?: Snippet
  }

  let { as = 'div', class: className, children, ...rest }: Props = $props()
</script>

<svelte:element this={as} {...rest} class={['bui-container', className]}
  >{@render children?.()}</svelte:element
>
