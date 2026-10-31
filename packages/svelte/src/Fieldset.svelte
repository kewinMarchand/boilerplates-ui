<script lang="ts">
  import { describedBy } from './describedBy'
  import Icon from './Icon.svelte'

  import type { Snippet } from 'svelte'

  interface Props {
    id: string
    legend: string
    hint?: string | undefined
    error?: string | undefined
    required?: boolean | undefined
    children: Snippet
  }

  let { id, legend, hint, error, required, children }: Props = $props()
</script>

<fieldset {id} class="bui-fieldset" aria-describedby={describedBy(id, hint, error)}>
  <legend class="bui-fieldset__legend">
    {legend}{#if required}<span class="bui-fieldset__required">{' (obligatoire)'}</span>{/if}
  </legend>
  {#if hint}<p id="{id}-hint" class="bui-fieldset__hint">{hint}</p>{/if}
  <div class="bui-fieldset__content">{@render children()}</div>
  {#if error}<p id="{id}-error" class="bui-fieldset__error">
      <Icon name="circle-alert" />{error}
    </p>{/if}
</fieldset>
