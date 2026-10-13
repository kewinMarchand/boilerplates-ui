<script setup lang="ts">
defineOptions({ name: 'BuiCard' })

const { headingLevel = 3 } = defineProps<{
  title: string
  headingLevel?: 2 | 3 | 4 | 5 | 6
}>()

defineSlots<{ default(): unknown; media?(): unknown; footer?(): unknown }>()
</script>

<template>
  <div class="bui-card">
    <div v-if="$slots.media" class="bui-card__media"><slot name="media" /></div>
    <div class="bui-card__body">
      <component :is="`h${headingLevel}`" class="bui-card__title">{{ title }}</component>
      <slot />
    </div>
    <div v-if="$slots.footer" class="bui-card__footer"><slot name="footer" /></div>
  </div>
</template>
