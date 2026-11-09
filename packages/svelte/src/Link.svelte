<script lang="ts">
  import Icon from './Icon.svelte'

  import type { Snippet } from 'svelte'
  import type { HTMLAnchorAttributes } from 'svelte/elements'

  interface Props extends HTMLAnchorAttributes {
    href: string
    /** Ouvre dans une nouvelle fenêtre et l'annonce (icône et texte masqué). */
    external?: boolean | undefined
    /** Mention masquée d'un lien externe. */
    newWindowLabel?: string | undefined
    children: Snippet
  }

  let {
    href,
    external = false,
    newWindowLabel = '(nouvelle fenêtre)',
    class: className,
    children,
    ...rest
  }: Props = $props()
</script>

<a
  {...rest}
  class={['bui-link', className]}
  {href}
  target={external ? '_blank' : undefined}
  rel={external ? 'noopener noreferrer' : undefined}
  >{@render children()}{#if external}<Icon name="external-link" class="bui-link__icon" /><span
      class="bui-visually-hidden">{` ${newWindowLabel}`}</span
    >{/if}</a
>
