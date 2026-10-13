<script setup lang="ts">
import Icon from './Icon.vue'

defineOptions({ name: 'BuiTable' })

export type SortDirection = 'ascending' | 'descending'

const SORT_ICONS = {
  ascending: 'arrow-up',
  descending: 'arrow-down',
  none: 'arrow-up-down',
} as const

const { sort } = defineProps<{
  id: string
  caption: string
  columns: { key: string; label: string; sortable?: boolean }[]
  /** La première colonne sert d'en-tête de ligne. */
  rows: Record<string, string>[]
  sort?: { key: string; direction: SortDirection } | undefined
}>()

const emit = defineEmits<{ sort: [key: string] }>()

const direction = (key: string) => (sort?.key === key ? sort.direction : undefined)
</script>

<template>
  <div class="bui-table" role="region" :aria-labelledby="`${id}-caption`" tabindex="0">
    <table class="bui-table__table">
      <caption :id="`${id}-caption`" class="bui-table__caption">
        {{
          caption
        }}
      </caption>
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            scope="col"
            :aria-sort="direction(column.key)"
          >
            <button
              v-if="column.sortable"
              type="button"
              class="bui-table__sort"
              @click="emit('sort', column.key)"
            >
              {{ column.label }}<Icon :name="SORT_ICONS[direction(column.key) ?? 'none']" />
            </button>
            <template v-else>{{ column.label }}</template>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
          <template v-for="(column, index) in columns" :key="column.key">
            <th v-if="index === 0" scope="row">{{ row[column.key] }}</th>
            <td v-else>{{ row[column.key] }}</td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>
