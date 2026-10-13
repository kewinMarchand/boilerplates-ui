<script setup lang="ts">
import Icon from './Icon.vue'

defineOptions({ name: 'BuiAlert' })

import type { IconName } from './iconNames'

export type AlertVariant = 'info' | 'success' | 'warning' | 'error'

const VARIANTS: Record<AlertVariant, { icon: IconName; prefix: string }> = {
  info: { icon: 'info', prefix: 'Information :' },
  success: { icon: 'circle-check', prefix: 'Succès :' },
  warning: { icon: 'triangle-alert', prefix: 'Attention :' },
  error: { icon: 'circle-alert', prefix: 'Erreur :' },
}

const { variant = 'info' } = defineProps<{
  variant?: AlertVariant
  title?: string
  /** `alert` ou `status` seulement pour une alerte injectée après le chargement de la page. */
  role?: 'alert' | 'status'
}>()

defineSlots<{ default(): unknown; action?(): unknown }>()
</script>

<template>
  <div :class="['bui-alert', `bui-alert--${variant}`]" :role="role">
    <Icon :name="VARIANTS[variant].icon" class="bui-alert__icon" />
    <div class="bui-alert__content">
      <span class="bui-visually-hidden">{{ VARIANTS[variant].prefix }}</span>
      <p v-if="title" class="bui-alert__title">{{ title }}</p>
      <div class="bui-alert__body"><slot /></div>
    </div>
    <div v-if="$slots.action" class="bui-alert__action"><slot name="action" /></div>
  </div>
</template>
