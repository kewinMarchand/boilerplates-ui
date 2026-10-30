<script setup lang="ts">
import type { Gap, LayoutTag } from './layout'

defineOptions({ name: 'BuiGrid' })

/** Grille de colonnes aussi nombreuses que la largeur le permet ; `min` : `sm` 160 px, 220 px par défaut, `lg` 280 px. */
const { as = 'div', gap, min } = defineProps<{ as?: LayoutTag; gap?: Gap; min?: 'sm' | 'lg' }>()
</script>

<template>
  <component :is="as" :class="['bui-grid', min && `bui-grid--${min}`, gap && `bui-gap-${gap}`]"
    ><slot
  /></component>
</template>
