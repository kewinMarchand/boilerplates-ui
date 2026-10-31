<script lang="ts" module>
  import type { IconName } from './iconNames'

  export type AlertVariant = 'info' | 'success' | 'warning' | 'error'

  const VARIANTS: Record<AlertVariant, { icon: IconName; prefix: string }> = {
    info: { icon: 'info', prefix: 'Information :' },
    success: { icon: 'circle-check', prefix: 'Succès :' },
    warning: { icon: 'triangle-alert', prefix: 'Attention :' },
    error: { icon: 'circle-alert', prefix: 'Erreur :' },
  }
</script>

<script lang="ts">
  import Icon from './Icon.svelte'

  import type { Snippet } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'

  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'role'> {
    variant?: AlertVariant
    title?: string | undefined
    /** `alert` ou `status` seulement pour une alerte injectée après le chargement de la page. */
    role?: 'alert' | 'status' | undefined
    /** Action proposée, par exemple un bouton « Réessayer ». */
    action?: Snippet | undefined
    children: Snippet
  }

  let {
    variant = 'info',
    title,
    role,
    action,
    class: className,
    children,
    ...rest
  }: Props = $props()
</script>

<div {...rest} class={['bui-alert', `bui-alert--${variant}`, className]} {role}>
  <Icon name={VARIANTS[variant].icon} class="bui-alert__icon" />
  <div class="bui-alert__content">
    <span class="bui-visually-hidden">{VARIANTS[variant].prefix}</span>
    {#if title}<p class="bui-alert__title">{title}</p>{/if}
    <div class="bui-alert__body">{@render children()}</div>
  </div>
  {#if action}<div class="bui-alert__action">{@render action()}</div>{/if}
</div>
