<script lang="ts">
  import type { Gap, LayoutTag } from './layout'
  import type { Snippet } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'

  /** Empilement vertical. */
  interface Props extends HTMLAttributes<HTMLElement> {
    as?: LayoutTag
    gap?: Gap | undefined
    children?: Snippet
  }

  let { as = 'div', gap, class: className, children, ...rest }: Props = $props()
</script>

<svelte:element this={as} {...rest} class={['bui-stack', gap && `bui-gap-${gap}`, className]}
  >{@render children?.()}</svelte:element
>
