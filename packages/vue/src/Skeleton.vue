<script setup lang="ts">
defineOptions({ name: 'BuiSkeleton' })

const { variant = 'block' } = defineProps<{
  variant?: 'block' | 'text' | 'circle'
  width?: string
  height?: string
}>()
</script>

<template>
  <span
    :class="['bui-skeleton', variant !== 'block' && `bui-skeleton--${variant}`]"
    aria-hidden="true"
    v-bind="width || height ? { style: { width, height } } : {}"
  ></span>
</template>
