<script setup lang="ts">
import type { LayoutTag } from './layout'

defineOptions({ name: 'BuiContainer' })

/** Conteneur large de la page : 1440 px au plus, gouttières selon la largeur. */
const { as = 'div' } = defineProps<{ as?: LayoutTag }>()
</script>

<template>
  <component :is="as" class="bui-container"><slot /></component>
</template>
