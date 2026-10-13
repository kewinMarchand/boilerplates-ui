<script setup lang="ts">
import Icon from './Icon.vue'

defineOptions({ name: 'BuiSpinner' })

const { label = 'Chargement en cours', size = 'md' } = defineProps<{
  label?: string
  size?: 'md' | 'lg'
}>()
</script>

<template>
  <span :class="['bui-spinner', size !== 'md' && `bui-spinner--${size}`]" role="status">
    <Icon name="loader-circle" class="bui-spinner__icon" />
    <span class="bui-visually-hidden">{{ label }}</span>
  </span>
</template>
