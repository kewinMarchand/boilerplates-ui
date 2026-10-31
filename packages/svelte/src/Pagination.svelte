<script lang="ts">
  import Icon from './Icon.svelte'

  interface Props {
    page: number
    count: number
    href: (page: number) => string
  }

  let { page, count, href }: Props = $props()

  /** Pages affichées : toutes jusqu'à 7, sinon la première, la dernière et les voisines de la courante. */
  const items = $derived.by((): (number | 'ellipsis')[] => {
    if (count <= 7) return Array.from({ length: count }, (_, index) => index + 1)
    const pages = [1, page - 1, page, page + 1, count].filter((p) => p >= 1 && p <= count)
    return [...new Set(pages)].flatMap((p, index, list) =>
      index > 0 && p - list[index - 1]! > 1 ? (['ellipsis', p] as const) : [p],
    )
  })
</script>

<nav class="bui-pagination" aria-label="Pagination">
  <ul class="bui-pagination__list">
    {#if page > 1}
      <li>
        <a class="bui-pagination__link" href={href(page - 1)} rel="prev"
          ><Icon name="chevron-left" /><span class="bui-pagination__label">Précédent</span></a
        >
      </li>
    {/if}
    {#each items as item, index (`${item}-${index}`)}
      {#if item === 'ellipsis'}
        <li class="bui-pagination__ellipsis" aria-hidden="true">…</li>
      {:else}
        <li>
          <a
            class="bui-pagination__link"
            href={href(item)}
            aria-current={item === page ? 'page' : undefined}
            ><span class="bui-visually-hidden">Page </span>{item}</a
          >
        </li>
      {/if}
    {/each}
    {#if page < count}
      <li>
        <a class="bui-pagination__link" href={href(page + 1)} rel="next"
          ><span class="bui-pagination__label">Suivant</span><Icon name="chevron-right" /></a
        >
      </li>
    {/if}
  </ul>
</nav>
