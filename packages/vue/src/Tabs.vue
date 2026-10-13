<script setup lang="ts">
import { ref } from 'vue'

defineOptions({ name: 'BuiTabs' })

const { tabs, defaultTab } = defineProps<{
  id: string
  /** Nom accessible de la liste d'onglets. */
  label: string
  /** Le contenu de chaque panneau vient du slot nommé par l'identifiant de l'onglet. */
  tabs: { id: string; label: string }[]
  defaultTab?: string
}>()

const selected = ref(defaultTab ?? tabs[0]?.id)
const buttons = ref<Record<string, HTMLButtonElement>>({})

const select = (id: string | undefined) => {
  if (!id) return
  selected.value = id
  buttons.value[id]?.focus()
}

const onKeyDown = (event: KeyboardEvent, id: string) => {
  const ids = tabs.map((tab) => tab.id)
  const index = ids.indexOf(id)
  const next = {
    ArrowLeft: ids[(index - 1 + ids.length) % ids.length],
    ArrowRight: ids[(index + 1) % ids.length],
    Home: ids[0],
    End: ids[ids.length - 1],
  }[event.key]
  if (!next) return
  event.preventDefault()
  select(next)
}

const register = (id: string) => (element: unknown) => {
  if (element instanceof HTMLButtonElement) buttons.value[id] = element
}
</script>

<template>
  <div class="bui-tabs">
    <div class="bui-tabs__list" role="tablist" :aria-label="label">
      <button
        v-for="tab in tabs"
        :id="`${id}-tab-${tab.id}`"
        :key="tab.id"
        :ref="register(tab.id)"
        type="button"
        class="bui-tabs__tab"
        role="tab"
        :aria-controls="`${id}-panel-${tab.id}`"
        :aria-selected="tab.id === selected ? 'true' : 'false'"
        :tabindex="tab.id === selected ? 0 : -1"
        @click="select(tab.id)"
        @keydown="onKeyDown($event, tab.id)"
      >
        {{ tab.label }}
      </button>
    </div>
    <div
      v-for="tab in tabs"
      :id="`${id}-panel-${tab.id}`"
      :key="tab.id"
      class="bui-tabs__panel"
      role="tabpanel"
      :aria-labelledby="`${id}-tab-${tab.id}`"
      tabindex="0"
      :hidden="tab.id !== selected"
    >
      <slot :name="tab.id" />
    </div>
  </div>
</template>
