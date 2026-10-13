<script setup lang="ts">
import { describedBy } from './describedBy'
import Field from './Field.vue'

defineOptions({ name: 'BuiTextArea', inheritAttrs: false })

const { rows = 4 } = defineProps<{
  id: string
  label: string
  hint?: string
  error?: string
  required?: boolean
  rows?: number
}>()

const model = defineModel<string>()
</script>

<template>
  <Field :id="id" :label="label" :hint="hint" :error="error" :required="required">
    <textarea
      :id="id"
      v-model="model"
      class="bui-field__input bui-field__input--multiline"
      :rows="rows"
      :required="required"
      :aria-invalid="error ? 'true' : undefined"
      :aria-describedby="describedBy(id, hint, error)"
      v-bind="$attrs"
    ></textarea>
  </Field>
</template>
