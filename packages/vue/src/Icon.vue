<script setup lang="ts">
import { ICON_SPRITE } from './iconSprite'

defineOptions({ name: 'BuiIcon' })

import type { IconName } from './iconNames'

defineProps<{
  name: IconName
  /** Nom accessible d'une icône porteuse de sens. Sans lui, l'icône est décorative. */
  label?: string
}>()
</script>

<template>
  <svg
    class="bui-icon"
    :role="label ? 'img' : undefined"
    :aria-label="label"
    :aria-hidden="label ? undefined : 'true'"
  >
    <use :href="`${ICON_SPRITE}#${name}`" />
  </svg>
</template>
