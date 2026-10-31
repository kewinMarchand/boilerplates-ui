<script lang="ts">
  import { iconHref } from './iconSprite'

  import type { IconName } from './iconNames'

  interface Props {
    name: IconName
    /** Nom accessible d'une icône porteuse de sens. Sans lui, l'icône est décorative. */
    label?: string | undefined
    /** Taille fixe, sinon la taille du texte (1em). */
    size?: 'sm' | 'md' | 'lg' | undefined
    class?: string | undefined
  }

  let { name, label, size, class: className }: Props = $props()
</script>

<svg
  class={['bui-icon', size && `bui-icon--${size}`, className]}
  role={label ? 'img' : undefined}
  aria-label={label}
  aria-hidden={label ? undefined : 'true'}
>
  <use href={iconHref(name)} />
</svg>
