<script lang="ts">
  import Icon from './Icon.svelte'

  import type { ButtonSize, ButtonVariant } from './button'
  import type { IconName } from './iconNames'
  import type { Snippet } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'

  // Attributs communs à <a> et <button> : le composant rend l'un ou l'autre selon `href`.
  interface Props extends HTMLAttributes<HTMLElement> {
    /**
     * `inverse` : sur fond sombre ou primaire. `nav` : lien ou bouton de navigation sur fond primaire (header).
     * `light` et `outline-light` : sur une photo (héros), mêmes couleurs en mode sombre.
     */
    variant?: ButtonVariant
    size?: ButtonSize
    type?: 'button' | 'submit' | 'reset'
    /** Garde le bouton focalisable (aria-disabled) et ignore les clics pendant le chargement. */
    loading?: boolean
    icon?: IconName | undefined
    iconPosition?: 'start' | 'end'
    /** Rend un lien `<a>` à l'apparence de bouton. Désactivé, il perd son `href`. */
    href?: string | undefined
    disabled?: boolean
    /** Occupe toute la largeur de son conteneur. */
    fullWidth?: boolean
    children?: Snippet
  }

  let {
    variant = 'primary',
    size = 'md',
    type = 'button',
    loading = false,
    icon,
    iconPosition = 'start',
    href,
    disabled = false,
    fullWidth = false,
    class: className,
    onclick,
    children,
    ...rest
  }: Props = $props()

  const classes = $derived([
    'bui-button',
    variant !== 'primary' && `bui-button--${variant}`,
    size !== 'md' && `bui-button--${size}`,
    fullWidth && 'bui-button--full-width',
    className,
  ])

  const blockClick = (event: MouseEvent) => event.preventDefault()
</script>

{#if href !== undefined}
  <a
    {...rest}
    class={classes}
    href={disabled ? undefined : href}
    aria-disabled={disabled ? 'true' : undefined}
    {onclick}
  >
    {#if icon && iconPosition === 'start'}<Icon name={icon} />{/if}
    {@render children?.()}
    {#if icon && iconPosition === 'end'}<Icon name={icon} />{/if}
  </a>
{:else}
  <button
    {...rest}
    {type}
    class={classes}
    {disabled}
    aria-disabled={loading ? 'true' : undefined}
    onclick={loading ? blockClick : onclick}
  >
    {#if loading}
      <Icon name="loader-circle" class="bui-button__spinner" />
    {:else if icon && iconPosition === 'start'}
      <Icon name={icon} />
    {/if}
    {@render children?.()}
    {#if !loading && icon && iconPosition === 'end'}<Icon name={icon} />{/if}
    {#if loading}<span class="bui-visually-hidden"> (chargement en cours)</span>{/if}
  </button>
{/if}
