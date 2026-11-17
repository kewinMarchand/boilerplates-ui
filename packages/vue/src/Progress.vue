<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'BuiProgress' })

const props = withDefaults(
  defineProps<{
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
  }>(),
  {
    max: 100,
    label: 'Progression',
    size: 'md',
    showValue: false,
  },
)

const safeMax = computed(() => (props.max > 0 ? props.max : 100))
const clamped = computed(() => Math.min(Math.max(props.value, 0), safeMax.value))
const pct = computed(() => Math.round((clamped.value / safeMax.value) * 100))
</script>

<template>
  <div :class="['bui-progress', size !== 'md' && `bui-progress--${size}`]">
    <div v-if="label || showValue" class="bui-progress__meta">
      <span v-if="label" class="bui-progress__label">{{ label }}</span>
      <span v-else />
      <span v-if="showValue" class="bui-progress__value">{{ pct }}%</span>
    </div>
    <div
      class="bui-progress__track"
      role="progressbar"
      :aria-label="label"
      :aria-valuemin="0"
      :aria-valuemax="safeMax"
      :aria-valuenow="clamped"
    >
      <div class="bui-progress__bar" :style="{ width: `${pct}%` }" />
    </div>
  </div>
</template>
