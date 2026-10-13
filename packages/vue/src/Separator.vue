<script setup lang="ts">
defineOptions({ name: 'BuiSeparator' })

const { orientation = 'horizontal' } = defineProps<{ orientation?: 'horizontal' | 'vertical' }>()
</script>

<template>
  <hr
    v-if="orientation === 'vertical'"
    class="bui-separator bui-separator--vertical"
    aria-orientation="vertical"
  />
  <hr v-else class="bui-separator" />
</template>
