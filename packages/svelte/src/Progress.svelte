<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'

  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'role'> {
    /** Valeur courante (entre 0 et max). */
    value: number
    /** Valeur maximale. */
    max?: number
    /** Libellé accessible de la barre de progression. */
    label?: string
    /** Taille de la barre. */
    size?: 'sm' | 'md' | 'lg'
    /** Affiche la valeur en pourcentage à droite. */
    showValue?: boolean
  }

  let {
    value,
    max = 100,
    label = 'Progression',
    size = 'md',
    showValue = false,
    class: className,
    ...rest
  }: Props = $props()

  let safeMax = $derived(max > 0 ? max : 100)
  let clamped = $derived(Math.min(Math.max(value, 0), safeMax))
  let pct = $derived(Math.round((clamped / safeMax) * 100))
</script>

<div {...rest} class={['bui-progress', size !== 'md' && `bui-progress--${size}`, className]}>
  {#if label || showValue}
    <div class="bui-progress__meta">
      {#if label}<span class="bui-progress__label">{label}</span>{:else}<span></span>{/if}
      {#if showValue}<span class="bui-progress__value">{pct}%</span>{/if}
    </div>
  {/if}
  <div
    class="bui-progress__track"
    role="progressbar"
    aria-label={label}
    aria-valuemin={0}
    aria-valuemax={safeMax}
    aria-valuenow={clamped}
  >
    <div class="bui-progress__bar" style:width={`${pct}%`}></div>
  </div>
</div>
