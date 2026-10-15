<script setup lang="ts">
import Icon from './Icon.vue'

import type { IconName } from './iconNames'

defineOptions({ name: 'BuiIconButton' })

const { variant = 'primary', size = 'md' } = defineProps<{
  /** Nom accessible, obligatoire : le bouton n'a pas de texte visible. */
  label: string
  icon: IconName
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'nav'
  size?: 'sm' | 'md'
}>()
</script>

<template>
  <button
    type="button"
    :class="[
      'bui-button',
      variant !== 'primary' && `bui-button--${variant}`,
      size !== 'md' && `bui-button--${size}`,
      'bui-button--icon',
    ]"
    :aria-label="label"
  >
    <Icon :name="icon" />
  </button>
</template>
