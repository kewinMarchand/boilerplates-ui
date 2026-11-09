<script lang="ts">
  import { describedBy } from './describedBy'
  import Field from './Field.svelte'
  import Icon from './Icon.svelte'

  import type { HTMLSelectAttributes } from 'svelte/elements'

  interface Props extends Omit<HTMLSelectAttributes, 'value'> {
    id: string
    label: string
    options: { value: string; label: string }[]
    placeholder?: string | undefined
    hint?: string | undefined
    error?: string | undefined
    required?: boolean | undefined
    /** Mention ajoutée au libellé d'un champ obligatoire. */
    requiredLabel?: string | undefined
    value?: string | undefined
  }

  let {
    id,
    label,
    options,
    placeholder,
    hint,
    error,
    required,
    requiredLabel,
    value = $bindable(),
    ...rest
  }: Props = $props()
</script>

<Field {id} {label} {hint} {error} {required} {requiredLabel}>
  <div class="bui-select">
    <select
      {id}
      bind:value
      class="bui-field__input bui-select__control"
      {required}
      aria-invalid={error ? 'true' : undefined}
      aria-describedby={describedBy(id, hint, error)}
      {...rest}
    >
      {#if placeholder}<option value="">{placeholder}</option>{/if}
      {#each options as option (option.value)}
        <option value={option.value}>{option.label}</option>
      {/each}
    </select>
    <Icon name="chevron-down" class="bui-select__icon" />
  </div>
</Field>
