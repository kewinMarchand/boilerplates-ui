<script lang="ts">
  import Icon from './Icon.svelte'

  import type { HTMLAttributes } from 'svelte/elements'

  interface Props extends HTMLAttributes<HTMLSpanElement> {
    label?: string
    size?: 'md' | 'lg'
  }

  let { label = 'Chargement en cours', size = 'md', class: className, ...rest }: Props = $props()
</script>

<span
  {...rest}
  class={['bui-spinner', size !== 'md' && `bui-spinner--${size}`, className]}
  role="status"
>
  <Icon name="loader-circle" class="bui-spinner__icon" />
  <span class="bui-visually-hidden">{label}</span>
</span>
