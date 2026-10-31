<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'

  interface Props extends HTMLAttributes<HTMLHRElement> {
    orientation?: 'horizontal' | 'vertical'
  }

  let { orientation = 'horizontal', class: className, ...rest }: Props = $props()
</script>

{#if orientation === 'vertical'}
  <hr
    {...rest}
    class={['bui-separator', 'bui-separator--vertical', className]}
    aria-orientation="vertical"
  />
{:else}
  <hr {...rest} class={['bui-separator', className]} />
{/if}
