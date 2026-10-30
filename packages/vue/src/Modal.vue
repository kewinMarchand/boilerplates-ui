<script setup lang="ts">
import { nextTick, useTemplateRef, watch } from 'vue'

import Icon from './Icon.vue'
import { useModal } from './useModal'

defineOptions({ name: 'BuiModal' })

const props = defineProps<{
  id: string
  title: string
  open: boolean
  closeLabel?: string | undefined
  /** Tiroir latéral : la modale s'ouvre contre le bord indiqué. */
  side?: 'start' | 'end' | undefined
  /** Le titre reçoit le focus à l'ouverture et à chaque changement (navigation à niveaux dans un tiroir). */
  focusTitle?: boolean
}>()

const emit = defineEmits<{ close: [] }>()

defineSlots<{ default(): unknown; footer?(): unknown }>()

const dialog = useTemplateRef<HTMLDialogElement>('dialog')

useModal(
  dialog,
  () => props.open,
  () => emit('close'),
)

const titleElement = useTemplateRef<HTMLHeadingElement>('titleNode')

watch(
  () => [props.open, props.title] as const,
  async ([open]) => {
    if (!open || !props.focusTitle) return
    await nextTick()
    titleElement.value?.focus()
  },
  { immediate: true },
)
</script>

<template>
  <dialog
    :id="id"
    ref="dialog"
    :class="['bui-modal', side && 'bui-modal--drawer', side === 'start' && 'bui-modal--start']"
    :aria-labelledby="`${id}-title`"
  >
    <div class="bui-modal__header">
      <h2
        :id="`${id}-title`"
        ref="titleNode"
        class="bui-modal__title"
        :tabindex="focusTitle ? -1 : undefined"
      >
        {{ title }}
      </h2>
      <button
        type="button"
        class="bui-modal__close"
        :aria-label="closeLabel ?? 'Fermer'"
        @click="dialog?.close()"
      >
        <Icon name="x" />
      </button>
    </div>
    <div class="bui-modal__body"><slot /></div>
    <div v-if="$slots.footer" class="bui-modal__footer"><slot name="footer" /></div>
  </dialog>
</template>
