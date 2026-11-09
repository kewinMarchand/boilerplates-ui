<script lang="ts">
  import Fieldset from './Fieldset.svelte'
  import Radio from './Radio.svelte'

  interface Props {
    id: string
    name: string
    legend: string
    options: { value: string; label: string }[]
    hint?: string | undefined
    error?: string | undefined
    required?: boolean | undefined
    /** Mention ajoutée à la légende d'un groupe obligatoire. */
    requiredLabel?: string | undefined
    disabled?: boolean | undefined
    value?: string | undefined
  }

  let {
    id,
    name,
    legend,
    options,
    hint,
    error,
    required,
    requiredLabel,
    disabled,
    value = $bindable(),
  }: Props = $props()
</script>

<Fieldset {id} {legend} {hint} {error} {required} {requiredLabel}>
  {#each options as option (option.value)}
    <Radio
      id="{id}-{option.value}"
      bind:group={value}
      {name}
      value={option.value}
      label={option.label}
      {required}
      {disabled}
      invalid={Boolean(error)}
    />
  {/each}
</Fieldset>
