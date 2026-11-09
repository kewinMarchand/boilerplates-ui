<script setup lang="ts">
import { computed } from 'vue'

import Icon from './Icon.vue'

defineOptions({ name: 'BuiPagination' })

const {
  page,
  count,
  label = 'Pagination',
  previousLabel = 'Précédent',
  nextLabel = 'Suivant',
  pageLabel = 'Page',
} = defineProps<{
  page: number
  count: number
  href: (page: number) => string
  /** Nom accessible de la navigation. */
  label?: string
  previousLabel?: string
  nextLabel?: string
  /** Mot masqué lu avant chaque numéro de page. */
  pageLabel?: string
}>()

/** Pages affichées : toutes jusqu'à 7, sinon la première, la dernière et les voisines de la courante. */
const items = computed((): (number | 'ellipsis')[] => {
  if (count <= 7) return Array.from({ length: count }, (_, index) => index + 1)
  const pages = [1, page - 1, page, page + 1, count].filter((p) => p >= 1 && p <= count)
  return [...new Set(pages)].flatMap((p, index, list) =>
    index > 0 && p - list[index - 1]! > 1 ? (['ellipsis', p] as const) : [p],
  )
})
</script>

<template>
  <nav class="bui-pagination" :aria-label="label">
    <ul class="bui-pagination__list">
      <li v-if="page > 1">
        <a class="bui-pagination__link" :href="href(page - 1)" rel="prev"
          ><Icon name="chevron-left" /><span class="bui-pagination__label">{{
            previousLabel
          }}</span></a
        >
      </li>
      <template v-for="(item, index) in items" :key="`${item}-${index}`">
        <li v-if="item === 'ellipsis'" class="bui-pagination__ellipsis" aria-hidden="true">…</li>
        <li v-else>
          <a
            class="bui-pagination__link"
            :href="href(item)"
            :aria-current="item === page ? 'page' : undefined"
            ><span class="bui-visually-hidden">{{ `${pageLabel} ` }}</span
            >{{ item }}</a
          >
        </li>
      </template>
      <li v-if="page < count">
        <a class="bui-pagination__link" :href="href(page + 1)" rel="next"
          ><span class="bui-pagination__label">{{ nextLabel }}</span
          ><Icon name="chevron-right"
        /></a>
      </li>
    </ul>
  </nav>
</template>
