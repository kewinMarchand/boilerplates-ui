<script lang="ts">
  import type { Gap, LayoutTag } from './layout'
  import type { Snippet } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'

  /** Grille de colonnes aussi nombreuses que la largeur le permet ; `min` : `sm` 160 px, 220 px par défaut, `lg` 280 px. */
  interface Props extends HTMLAttributes<HTMLElement> {
    as?: LayoutTag
    gap?: Gap | undefined
    min?: 'sm' | 'lg' | undefined
    children?: Snippet
  }

  let { as = 'div', gap, min, class: className, children, ...rest }: Props = $props()
</script>

<svelte:element
  this={as}
  {...rest}
  class={['bui-grid', min && `bui-grid--${min}`, gap && `bui-gap-${gap}`, className]}
  >{@render children?.()}</svelte:element
>
