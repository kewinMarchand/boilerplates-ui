<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, useTemplateRef } from 'vue'

defineOptions({ name: 'BuiTooltip' })

defineProps<{ id: string; text: string }>()

defineSlots<{ default(props: { describedBy: string }): unknown }>()

const root = useTemplateRef<HTMLSpanElement>('root')
const dismissed = ref(false)

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && root.value?.matches(':hover, :focus-within')) dismissed.value = true
}

onMounted(() => document.addEventListener('keydown', handleKeyDown))
onBeforeUnmount(() => document.removeEventListener('keydown', handleKeyDown))
</script>

<template>
  <span
    ref="root"
    class="bui-tooltip"
    :data-dismissed="dismissed ? '' : undefined"
    @mouseleave="dismissed = false"
    @focusout="dismissed = false"
  >
    <slot :described-by="id" />
    <span :id="id" class="bui-tooltip__bubble" role="tooltip">{{ text }}</span>
  </span>
</template>
