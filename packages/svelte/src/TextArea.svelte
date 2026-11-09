<script lang="ts">
  import { describedBy } from './describedBy'
  import Field from './Field.svelte'

  import type { HTMLTextareaAttributes } from 'svelte/elements'

  interface Props extends Omit<HTMLTextareaAttributes, 'value'> {
    id: string
    label: string
    hint?: string | undefined
    error?: string | undefined
    required?: boolean | undefined
    /** Mention ajoutée au libellé d'un champ obligatoire. */
    requiredLabel?: string | undefined
    rows?: number
    value?: string | undefined
  }

  let {
    id,
    label,
    hint,
    error,
    required,
    requiredLabel,
    rows = 4,
    value = $bindable(),
    ...rest
  }: Props = $props()
</script>

<Field {id} {label} {hint} {error} {required} {requiredLabel}>
  <textarea
    {id}
    bind:value
    class="bui-field__input bui-field__input--multiline"
    {rows}
    {required}
    aria-invalid={error ? 'true' : undefined}
    aria-describedby={describedBy(id, hint, error)}
    {...rest}></textarea>
</Field>
