<script setup lang="ts">
defineOptions({ name: 'BuiBadge' })

const { variant = 'neutral' } = defineProps<{
  variant?: 'neutral' | 'secondary' | 'info' | 'success' | 'warning' | 'error'
}>()
</script>

<template>
  <span :class="['bui-badge', variant !== 'neutral' && `bui-badge--${variant}`]"><slot /></span>
</template>
