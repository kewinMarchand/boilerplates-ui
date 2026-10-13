<script setup lang="ts">
import Icon from './Icon.vue'

defineOptions({ name: 'BuiAccordion' })

defineProps<{
  /** Nom commun des `<details>` : un seul panneau ouvert à la fois. */
  name?: string
  /** Le contenu de chaque panneau vient du slot nommé par l'identifiant. */
  items: { id: string; title: string; open?: boolean }[]
}>()
</script>

<template>
  <div class="bui-accordion">
    <details
      v-for="item in items"
      :key="item.id"
      class="bui-accordion__item"
      :name="name"
      :open="item.open"
    >
      <summary class="bui-accordion__summary">
        {{ item.title }}<Icon name="chevron-down" class="bui-accordion__icon" />
      </summary>
      <div class="bui-accordion__content"><slot :name="item.id" /></div>
    </details>
  </div>
</template>
