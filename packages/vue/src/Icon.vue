<script setup lang="ts">
import { iconHref } from './iconSprite'

import type { IconName } from './iconNames'

defineOptions({ name: 'BuiIcon' })

defineProps<{
  name: IconName
  /** Nom accessible d'une icône porteuse de sens. Sans lui, l'icône est décorative. */
  label?: string
  /** Taille fixe, sinon la taille du texte (1em). */
  size?: 'sm' | 'md' | 'lg'
}>()
</script>

<template>
  <svg
    :class="['bui-icon', size && `bui-icon--${size}`]"
    :role="label ? 'img' : undefined"
    :aria-label="label"
    :aria-hidden="label ? undefined : 'true'"
  >
    <use :href="iconHref(name)" />
  </svg>
</template>
