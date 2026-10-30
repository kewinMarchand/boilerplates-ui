<script setup lang="ts">
import type { Gap, LayoutTag } from './layout'

defineOptions({ name: 'BuiStack' })

/** Empilement vertical. */
const { as = 'div', gap } = defineProps<{ as?: LayoutTag; gap?: Gap }>()
</script>

<template>
  <component :is="as" :class="['bui-stack', gap && `bui-gap-${gap}`]"><slot /></component>
</template>
