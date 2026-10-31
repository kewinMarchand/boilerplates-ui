<!-- Démonstration du tableau triable : le tri vit dans l'état de la démo, qui recalcule les lignes. -->
<script lang="ts">
  import { Table } from '@kewinmarchand/svelte'

  import type { ComponentProps } from 'svelte'

  type Sort = ComponentProps<typeof Table>['sort']

  interface Props {
    /** Colonnes et lignes du tableau trié selon `sort`. */
    build: (sort: Sort) => Omit<ComponentProps<typeof Table>, 'onsort'>
    initial: Sort
    next: (sort: Sort, key: string) => Sort
    onSort?: ((key: string) => void) | undefined
  }

  let { build, initial, next, onSort }: Props = $props()

  // Tri de départ ; ensuite, c'est l'état de la démo qui décide.
  // svelte-ignore state_referenced_locally
  let sort = $state(initial)
  const table = $derived(build(sort))
</script>

<Table
  {...table}
  {sort}
  onsort={(key) => {
    onSort?.(key)
    sort = next(sort, key)
  }}
/>
