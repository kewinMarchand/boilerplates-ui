<script lang="ts">
  import Icon from './Icon.svelte'

  import type { Snippet } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'

  /** Puce de filtre ou de sous-catégorie. Une suite de puces va dans une `<ul class="bui-chip-list" role="list">`. */
  interface Props extends HTMLAttributes<HTMLElement> {
    /** Lien vers la page filtrée. Sans lui, un bouton. `aria-current="page"` marque la puce de la page courante. */
    href?: string | undefined
    /** Filtre actif : un clic le retire, ce que l'icône montre et un texte masqué annonce. */
    removable?: boolean
    children: Snippet
  }

  let { href, removable = false, class: className, children, ...rest }: Props = $props()
</script>

{#if href !== undefined}
  <a {...rest} class={['bui-chip', className]} {href}
    >{#if removable}<span class="bui-visually-hidden"
        >Retirer le filtre :
      </span>{/if}{@render children()}{#if removable}<Icon name="x" />{/if}</a
  >
{:else}
  <button {...rest} type="button" class={['bui-chip', className]}>
    {#if removable}<span class="bui-visually-hidden"
        >Retirer le filtre :
      </span>{/if}{@render children()}{#if removable}<Icon name="x" />{/if}
  </button>
{/if}
