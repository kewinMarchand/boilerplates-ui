<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { HTMLButtonAttributes } from 'svelte/elements'

  /** Bouton à l'apparence de lien : une action discrète dans le texte ou sous un formulaire (« Tout effacer »). */
  interface Props extends HTMLButtonAttributes {
    type?: 'button' | 'submit' | 'reset'
    /** Occupe toute la largeur de son conteneur. */
    fullWidth?: boolean
    children: Snippet
  }

  let { type = 'button', fullWidth = false, class: className, children, ...rest }: Props = $props()
</script>

<button
  {...rest}
  {type}
  class={['bui-link', 'bui-link--button', fullWidth && 'bui-link--full-width', className]}
>
  {@render children()}
</button>
