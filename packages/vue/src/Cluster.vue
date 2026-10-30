<script setup lang="ts">
import type { Gap, LayoutTag } from './layout'

defineOptions({ name: 'BuiCluster' })

/** Rangée qui passe à la ligne. */
const {
  as = 'div',
  gap,
  justify,
  align,
} = defineProps<{ as?: LayoutTag; gap?: Gap; justify?: 'between' | 'end'; align?: 'start' }>()
</script>

<template>
  <component
    :is="as"
    :class="[
      'bui-cluster',
      justify && `bui-cluster--${justify}`,
      align && `bui-cluster--${align}`,
      gap && `bui-gap-${gap}`,
    ]"
    ><slot
  /></component>
</template>
