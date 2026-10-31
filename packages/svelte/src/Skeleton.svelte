<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'

  interface Props extends HTMLAttributes<HTMLSpanElement> {
    variant?: 'block' | 'text' | 'circle'
    width?: string | undefined
    height?: string | undefined
  }

  let { variant = 'block', width, height, class: className, ...rest }: Props = $props()
</script>

<span
  {...rest}
  class={['bui-skeleton', variant !== 'block' && `bui-skeleton--${variant}`, className]}
  aria-hidden="true"
  style:width
  style:height
></span>
