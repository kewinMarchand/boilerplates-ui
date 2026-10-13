<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'BuiAvatar' })

const SIZES = { sm: 36, md: 44, lg: 64 } as const

const {
  name,
  size = 'md',
  decorative = false,
} = defineProps<{
  name: string
  src?: string
  size?: keyof typeof SIZES
  /** Avatar voisin du nom affiché : masqué aux technologies d'assistance. */
  decorative?: boolean
}>()

const initials = computed(() =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join(''),
)
</script>

<template>
  <span v-if="src" :class="['bui-avatar', size !== 'md' && `bui-avatar--${size}`]">
    <img
      class="bui-avatar__image"
      :src="src"
      :alt="decorative ? '' : name"
      :width="SIZES[size]"
      :height="SIZES[size]"
      loading="lazy"
    />
  </span>
  <span
    v-else
    :class="['bui-avatar', size !== 'md' && `bui-avatar--${size}`]"
    :role="decorative ? undefined : 'img'"
    :aria-label="decorative ? undefined : name"
    :aria-hidden="decorative ? 'true' : undefined"
    >{{ initials }}</span
  >
</template>
