<script lang="ts">
  interface Props {
    /** Le dernier élément est la page courante. */
    items: { label: string; href?: string | undefined }[]
  }

  let { items }: Props = $props()
</script>

<nav class="bui-breadcrumb" aria-label="Fil d’Ariane">
  <ol class="bui-breadcrumb__list">
    {#each items as item, index (item.label)}
      <li class="bui-breadcrumb__item">
        {#if index === items.length - 1}
          <span class="bui-breadcrumb__current" aria-current="page">{item.label}</span>
        {:else}
          <a class="bui-link" href={item.href ?? '#'}>{item.label}</a>
        {/if}
      </li>
    {/each}
  </ol>
</nav>
