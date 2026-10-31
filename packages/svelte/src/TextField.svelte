<script lang="ts">
  import { describedBy } from './describedBy'
  import Field from './Field.svelte'

  import type { HTMLInputAttributes } from 'svelte/elements'

  interface Props extends Omit<HTMLInputAttributes, 'type' | 'value'> {
    id: string
    label: string
    hint?: string | undefined
    error?: string | undefined
    required?: boolean | undefined
    type?: 'text' | 'email' | 'tel' | 'url' | 'password' | 'search'
    value?: string | undefined
  }

  let {
    id,
    label,
    hint,
    error,
    required,
    type = 'text',
    value = $bindable(),
    ...rest
  }: Props = $props()
</script>

<Field {id} {label} {hint} {error} {required}>
  <input
    {id}
    bind:value
    class="bui-field__input"
    {type}
    {required}
    aria-invalid={error ? 'true' : undefined}
    aria-describedby={describedBy(id, hint, error)}
    {...rest}
  />
</Field>
