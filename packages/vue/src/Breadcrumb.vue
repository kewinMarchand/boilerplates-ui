<script setup lang="ts">
defineOptions({ name: 'BuiBreadcrumb' })

defineProps<{
  /** Le dernier élément est la page courante. */
  items: { label: string; href?: string }[]
}>()
</script>

<template>
  <nav class="bui-breadcrumb" aria-label="Fil d’Ariane">
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
