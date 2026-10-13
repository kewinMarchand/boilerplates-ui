<script setup lang="ts">
import { describedBy } from './describedBy'
import Icon from './Icon.vue'

defineOptions({ name: 'BuiFieldset' })

defineProps<{
  id: string
  legend: string
  hint?: string | undefined
  error?: string | undefined
  required?: boolean | undefined
}>()

defineSlots<{ default(): unknown }>()
</script>

<template>
  <fieldset :id="id" class="bui-fieldset" :aria-describedby="describedBy(id, hint, error)">
    <legend class="bui-fieldset__legend">
      {{ legend }}<span v-if="required" class="bui-fieldset__required"> (obligatoire)</span>
    </legend>
    <p v-if="hint" :id="`${id}-hint`" class="bui-fieldset__hint">{{ hint }}</p>
    <div class="bui-fieldset__content"><slot /></div>
    <p v-if="error" :id="`${id}-error`" class="bui-fieldset__error">
      <Icon name="circle-alert" />{{ error }}
    </p>
  </fieldset>
</template>
