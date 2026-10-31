<script lang="ts">
  import type { Gap, LayoutTag } from './layout'
  import type { Snippet } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'

  /** Rangée qui passe à la ligne. */
  interface Props extends HTMLAttributes<HTMLElement> {
    as?: LayoutTag
    gap?: Gap | undefined
    justify?: 'between' | 'end' | undefined
    align?: 'start' | undefined
    children?: Snippet
  }

  let { as = 'div', gap, justify, align, class: className, children, ...rest }: Props = $props()
</script>

<svelte:element
  this={as}
  {...rest}
  class={[
    'bui-cluster',
    justify && `bui-cluster--${justify}`,
    align && `bui-cluster--${align}`,
    gap && `bui-gap-${gap}`,
    className,
  ]}>{@render children?.()}</svelte:element
>
