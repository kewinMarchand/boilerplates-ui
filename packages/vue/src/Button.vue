<script setup lang="ts">
import Icon from './Icon.vue'

defineOptions({ name: 'BuiButton' })

import type { IconName } from './iconNames'

export type ButtonVariant = 'primary' | 'outline' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

const {
  variant = 'primary',
  size = 'md',
  type = 'button',
  loading = false,
} = defineProps<{
  variant?: ButtonVariant
  size?: ButtonSize
  type?: 'button' | 'submit' | 'reset'
  /** Garde le bouton focalisable (aria-disabled) et ignore les clics pendant le chargement. */
  loading?: boolean
  icon?: IconName
}>()

const emit = defineEmits<{ click: [event: MouseEvent] }>()

const handleClick = (event: MouseEvent) => {
  if (loading) {
    event.preventDefault()
    return
  }
  emit('click', event)
}
</script>

<template>
  <button
    :type="type"
    :class="[
      'bui-button',
      variant !== 'primary' && `bui-button--${variant}`,
      size !== 'md' && `bui-button--${size}`,
    ]"
    :aria-disabled="loading ? 'true' : undefined"
    @click="handleClick"
  >
    <Icon v-if="loading" name="loader-circle" class="bui-button__spinner" />
    <Icon v-else-if="icon" :name="icon" />
    <slot />
    <span v-if="loading" class="bui-visually-hidden"> (chargement en cours)</span>
  </button>
</template>
