<script setup lang="ts">
import Fieldset from './Fieldset.vue'
import Radio from './Radio.vue'

defineOptions({ name: 'BuiRadioGroup' })

defineProps<{
  id: string
  name: string
  legend: string
  options: { value: string; label: string }[]
  hint?: string
  error?: string
  required?: boolean
  disabled?: boolean
}>()

const model = defineModel<string>()
</script>

<template>
  <Fieldset :id="id" :legend="legend" :hint="hint" :error="error" :required="required">
    <Radio
      v-for="option in options"
      :id="`${id}-${option.value}`"
      :key="option.value"
      v-model="model"
      :name="name"
      :value="option.value"
      :label="option.label"
      :required="required"
      :disabled="disabled"
      :invalid="Boolean(error)"
    />
  </Fieldset>
</template>
