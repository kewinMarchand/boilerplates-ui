<script lang="ts" module>
  const SIZES = { sm: 36, md: 44, lg: 64 } as const
</script>

<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'

  interface Props extends HTMLAttributes<HTMLSpanElement> {
    name: string
    src?: string | undefined
    size?: keyof typeof SIZES
    variant?: 'primary' | 'secondary'
    /** Avatar voisin du nom affiché : masqué aux technologies d'assistance. */
    decorative?: boolean
  }

  let {
    name,
    src,
    size = 'md',
    variant = 'primary',
    decorative = false,
    class: className,
    ...rest
  }: Props = $props()

  const classes = $derived([
    'bui-avatar',
    size !== 'md' && `bui-avatar--${size}`,
    variant !== 'primary' && `bui-avatar--${variant}`,
    className,
  ])

  const initials = $derived(
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word.charAt(0).toUpperCase())
      .join(''),
  )
</script>

{#if src}
  <span {...rest} class={classes}>
    <img
      class="bui-avatar__image"
      {src}
      alt={decorative ? '' : name}
      width={SIZES[size]}
      height={SIZES[size]}
      loading="lazy"
    />
  </span>
{:else}
  <span
    {...rest}
    class={classes}
    role={decorative ? undefined : 'img'}
    aria-label={decorative ? undefined : name}
    aria-hidden={decorative ? 'true' : undefined}>{initials}</span
  >
{/if}
