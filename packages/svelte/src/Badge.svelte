<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'

  interface Props extends HTMLAttributes<HTMLSpanElement> {
    variant?: 'neutral' | 'secondary' | 'info' | 'success' | 'warning' | 'error'
    children: Snippet
  }

  let { variant = 'neutral', class: className, children, ...rest }: Props = $props()
</script>

<span {...rest} class={['bui-badge', variant !== 'neutral' && `bui-badge--${variant}`, className]}
  >{@render children()}</span
>
