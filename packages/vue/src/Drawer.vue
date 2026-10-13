<script setup lang="ts">
import Modal from './Modal.vue'

defineOptions({ name: 'BuiDrawer' })

const { side = 'end' } = defineProps<{
  id: string
  title: string
  open: boolean
  closeLabel?: string | undefined
  side?: 'start' | 'end'
}>()

const emit = defineEmits<{ close: [] }>()

defineSlots<{ default(): unknown; footer?(): unknown }>()
</script>

<template>
  <Modal
    :id="id"
    :title="title"
    :open="open"
    :close-label="closeLabel"
    :side="side"
    @close="emit('close')"
  >
    <slot />
    <template v-if="$slots.footer" #footer><slot name="footer" /></template>
  </Modal>
</template>
