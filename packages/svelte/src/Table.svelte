<script lang="ts" module>
  export type SortDirection = 'ascending' | 'descending'

  const SORT_ICONS = {
    ascending: 'arrow-up',
    descending: 'arrow-down',
    none: 'arrow-up-down',
  } as const
</script>

<script lang="ts">
  import Icon from './Icon.svelte'

  interface Props {
    id: string
    caption: string
    columns: { key: string; label: string; sortable?: boolean | undefined }[]
    /** La première colonne sert d'en-tête de ligne. */
    rows: Record<string, string>[]
    sort?: { key: string; direction: SortDirection } | undefined
    onsort?: (key: string) => void
  }

  let { id, caption, columns, rows, sort, onsort }: Props = $props()

  const direction = (key: string) => (sort?.key === key ? sort.direction : undefined)
</script>

<!-- Région défilable focalisable au clavier (WCAG 2.1.1), nommée par la légende. -->
<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div class="bui-table" role="region" aria-labelledby="{id}-caption" tabindex="0">
  <table class="bui-table__table">
    <caption id="{id}-caption" class="bui-table__caption">{caption}</caption>
    <thead>
      <tr>
        {#each columns as column (column.key)}
          <th scope="col" aria-sort={direction(column.key)}>
            {#if column.sortable}
              <button type="button" class="bui-table__sort" onclick={() => onsort?.(column.key)}>
                {column.label}<Icon name={SORT_ICONS[direction(column.key) ?? 'none']} />
              </button>
            {:else}{column.label}{/if}
          </th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each rows as row, rowIndex (rowIndex)}
        <tr>
          {#each columns as column, index (column.key)}
            {#if index === 0}<th scope="row">{row[column.key]}</th>{:else}<td>{row[column.key]}</td
              >{/if}
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>
