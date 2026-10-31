<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements'

  interface Props extends Omit<HTMLInputAttributes, 'type' | 'value'> {
    id: string
    name: string
    value: string
    label: string
    invalid?: boolean
    /** Valeur cochée du groupe (`bind:group`). */
    group?: string | undefined
  }

  let { id, name, value, label, invalid = false, group = $bindable(), ...rest }: Props = $props()
</script>

<div class="bui-radio">
  <!-- Même balisage que la référence, React et Vue ; aria-invalid ira sur le groupe dans les trois couches (suivi noté). -->
  <!-- svelte-ignore a11y_role_supports_aria_props_implicit -->
  <input
    {id}
    bind:group
    class="bui-radio__input"
    type="radio"
    {name}
    {value}
    aria-invalid={invalid ? 'true' : undefined}
    {...rest}
  />
  <label class="bui-radio__label" for={id}>{label}</label>
</div>
