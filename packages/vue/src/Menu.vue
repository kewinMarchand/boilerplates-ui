<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, useTemplateRef, watch } from 'vue'

import Icon from './Icon.vue'

defineOptions({ name: 'BuiMenu' })

const { items } = defineProps<{
  id: string
  label: string
  items: { id: string; label: string }[]
}>()

const emit = defineEmits<{ select: [id: string] }>()

const open = ref(false)
const root = useTemplateRef<HTMLDivElement>('root')
const trigger = useTemplateRef<HTMLButtonElement>('trigger')
const buttons: (HTMLButtonElement | undefined)[] = []

const openAt = async (index: number) => {
  open.value = true
  await nextTick()
  buttons[index]?.focus()
}

const close = (restoreFocus = true) => {
  open.value = false
  if (restoreFocus) trigger.value?.focus()
}

const handleOutsideClick = (event: MouseEvent) => {
  if (!root.value?.contains(event.target as Node)) close(false)
}

watch(open, (isOpen) => {
  if (isOpen) document.addEventListener('click', handleOutsideClick)
  else document.removeEventListener('click', handleOutsideClick)
})
onBeforeUnmount(() => document.removeEventListener('click', handleOutsideClick))

const onTriggerKeyDown = (event: KeyboardEvent) => {
  if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return
  event.preventDefault()
  void openAt(event.key === 'ArrowDown' ? 0 : items.length - 1)
}

const onItemKeyDown = (event: KeyboardEvent, index: number) => {
  const count = items.length
  const next = {
    ArrowDown: (index + 1) % count,
    ArrowUp: (index - 1 + count) % count,
    Home: 0,
    End: count - 1,
  }[event.key]
  if (next !== undefined) {
    event.preventDefault()
    buttons[next]?.focus()
  } else if (event.key === 'Escape') close()
  else if (event.key === 'Tab') close(false)
}

const choose = (id: string) => {
  emit('select', id)
  close()
}

const toggle = () => (open.value ? close() : void openAt(0))
</script>

<template>
  <div ref="root" class="bui-menu">
    <button
      :id="`${id}-trigger`"
      ref="trigger"
      type="button"
      class="bui-button bui-button--outline bui-menu__trigger"
      aria-haspopup="menu"
      :aria-expanded="open ? 'true' : 'false'"
      :aria-controls="`${id}-list`"
      @click="toggle"
      @keydown="onTriggerKeyDown"
    >
      {{ label }}<Icon name="chevron-down" />
    </button>
    <ul
      :id="`${id}-list`"
      class="bui-menu__list"
      role="menu"
      :aria-labelledby="`${id}-trigger`"
      :hidden="!open"
    >
      <li v-for="(item, index) in items" :key="item.id" role="none">
        <button
          :ref="(element) => (buttons[index] = element as HTMLButtonElement | undefined)"
          type="button"
          class="bui-menu__item"
          role="menuitem"
          tabindex="-1"
          @click="choose(item.id)"
          @keydown="onItemKeyDown($event, index)"
        >
          {{ item.label }}
        </button>
      </li>
    </ul>
  </div>
</template>
