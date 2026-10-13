<script setup lang="ts">
import { useTemplateRef } from 'vue'

import Icon from './Icon.vue'
import { useModal } from './useModal'

defineOptions({ name: 'BuiModal' })

const props = defineProps<{
  id: string
  title: string
  open: boolean
  closeLabel?: string
}>()

const emit = defineEmits<{ close: [] }>()

defineSlots<{ default(): unknown; footer?(): unknown }>()

const dialog = useTemplateRef<HTMLDialogElement>('dialog')

useModal(
  dialog,
  () => props.open,
  () => emit('close'),
)
</script>

<template>
  <dialog :id="id" ref="dialog" class="bui-modal" :aria-labelledby="`${id}-title`">
    <div class="bui-modal__header">
      <h2 :id="`${id}-title`" class="bui-modal__title">{{ title }}</h2>
      <button
        type="button"
        class="bui-modal__close"
        :aria-label="closeLabel ?? 'Fermer'"
        data-bui-modal-close
        @click="dialog?.close()"
      >
        <Icon name="x" />
      </button>
    </div>
    <div class="bui-modal__body"><slot /></div>
    <div v-if="$slots.footer" class="bui-modal__footer"><slot name="footer" /></div>
  </dialog>
</template>
