<script setup lang="ts">
defineOptions({ name: 'BuiBreadcrumb' })

const { label = 'Fil d’Ariane' } = defineProps<{
  /** Le dernier élément est la page courante. */
  items: { label: string; href?: string }[]
  /** Nom accessible de la navigation. */
  label?: string
}>()
</script>

<template>
  <nav class="bui-breadcrumb" :aria-label="label">
    <ol class="bui-breadcrumb__list">
      <li v-for="(item, index) in items" :key="item.label" class="bui-breadcrumb__item">
        <span
          v-if="index === items.length - 1"
          class="bui-breadcrumb__current"
          aria-current="page"
          >{{ item.label }}</span
        >
        <a v-else class="bui-link" :href="item.href ?? '#'">{{ item.label }}</a>
      </li>
    </ol>
  </nav>
</template>
