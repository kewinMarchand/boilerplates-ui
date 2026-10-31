<script lang="ts">
  import Icon from './Icon.svelte'

  import type { IconName } from './iconNames'
  import type { HTMLButtonAttributes } from 'svelte/elements'

  interface Props extends HTMLButtonAttributes {
    /** Nom accessible, obligatoire : le bouton n'a pas de texte visible. */
    label: string
    icon: IconName
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'nav'
    size?: 'sm' | 'md'
  }

  let { label, icon, variant = 'primary', size = 'md', class: className, ...rest }: Props = $props()
</script>

<button
  type="button"
  {...rest}
  class={[
    'bui-button',
    variant !== 'primary' && `bui-button--${variant}`,
    size !== 'md' && `bui-button--${size}`,
    'bui-button--icon',
    className,
  ]}
  aria-label={label}
>
  <Icon name={icon} />
</button>
