<script lang="ts">
  import Icon from './Icon.svelte'

  import type { Snippet } from 'svelte'

  interface Props {
    id: string
    label: string
    hint?: string | undefined
    error?: string | undefined
    required?: boolean | undefined
    /** Mention ajoutée au libellé d'un champ obligatoire. */
    requiredLabel?: string | undefined
    children: Snippet
  }

  let {
    id,
    label,
    hint,
    error,
    required,
    requiredLabel = '(obligatoire)',
    children,
  }: Props = $props()
</script>

<div class="bui-field">
  <label class="bui-field__label" for={id}
    >{label}{#if required}<span class="bui-field__required">{` ${requiredLabel}`}</span>{/if}</label
  >
  {#if hint}<p id="{id}-hint" class="bui-field__hint">{hint}</p>{/if}
  {@render children()}
  {#if error}<p id="{id}-error" class="bui-field__error">
      <Icon name="circle-alert" />{error}
    </p>{/if}
</div>
