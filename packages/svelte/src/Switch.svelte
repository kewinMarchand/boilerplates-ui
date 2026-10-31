<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements'

  interface Props extends Omit<HTMLInputAttributes, 'type' | 'role' | 'checked'> {
    id: string
    label: string
    checked?: boolean | undefined
  }

  let { id, label, checked = $bindable(), ...rest }: Props = $props()
</script>

<div class="bui-switch">
  <input {id} bind:checked class="bui-switch__input" type="checkbox" role="switch" {...rest} />
  <label class="bui-switch__label" for={id}>{label}</label>
</div>
