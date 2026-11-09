<script lang="ts">
  import { describedBy } from './describedBy'
  import Icon from './Icon.svelte'

  import type { HTMLInputAttributes } from 'svelte/elements'

  interface Props extends Omit<HTMLInputAttributes, 'type' | 'checked'> {
    id: string
    label: string
    hint?: string | undefined
    error?: string | undefined
    required?: boolean | undefined
    /** Mention ajoutée au libellé d'un champ obligatoire. */
    requiredLabel?: string | undefined
    checked?: boolean | undefined
  }

  let {
    id,
    label,
    hint,
    error,
    required,
    requiredLabel = '(obligatoire)',
    checked = $bindable(),
    ...rest
  }: Props = $props()
</script>

<div class="bui-checkbox">
  <input
    {id}
    bind:checked
    class="bui-checkbox__input"
    type="checkbox"
    {required}
    aria-invalid={error ? 'true' : undefined}
    aria-describedby={describedBy(id, hint, error)}
    {...rest}
  />
  <label class="bui-checkbox__label" for={id}
    >{label}{#if required}<span class="bui-checkbox__required">{` ${requiredLabel}`}</span
      >{/if}</label
  >
  {#if hint}<p id="{id}-hint" class="bui-checkbox__hint">{hint}</p>{/if}
  {#if error}<p id="{id}-error" class="bui-checkbox__error">
      <Icon name="circle-alert" />{error}
    </p>{/if}
</div>
