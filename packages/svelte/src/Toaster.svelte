<script lang="ts" module>
  import type { IconName } from './iconNames'
  import type { ToastVariant } from './useToaster.svelte'

  const VARIANTS: Record<
    ToastVariant,
    { icon: IconName; prefix: string; role: 'status' | 'alert' }
  > = {
    info: { icon: 'info', prefix: 'Information :', role: 'status' },
    success: { icon: 'circle-check', prefix: 'Succès :', role: 'status' },
    warning: { icon: 'triangle-alert', prefix: 'Attention :', role: 'alert' },
    error: { icon: 'circle-alert', prefix: 'Erreur :', role: 'alert' },
  }
</script>

<script lang="ts">
  import Icon from './Icon.svelte'

  import type { ToastData } from './useToaster.svelte'

  interface Props {
    toasts: ToastData[]
    onclose?: (id: string) => void
  }

  let { toasts, onclose }: Props = $props()
</script>

<!-- Pas de disparition automatique (WCAG 2.2.1) : chaque toast se ferme par son bouton. -->
<div class="bui-toaster">
  {#each toasts as { id, message, variant = 'info' } (id)}
    <div {id} class={['bui-toast', `bui-toast--${variant}`]} role={VARIANTS[variant].role}>
      <Icon name={VARIANTS[variant].icon} class="bui-toast__icon" />
      <p class="bui-toast__message">
        <span class="bui-visually-hidden">{`${VARIANTS[variant].prefix} `}</span>{message}
      </p>
      <button
        type="button"
        class="bui-toast__close"
        aria-label="Fermer la notification"
        onclick={() => onclose?.(id)}
      >
        <Icon name="x" />
      </button>
    </div>
  {/each}
</div>
