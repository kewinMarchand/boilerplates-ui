<script setup lang="ts">
import { describedBy } from './describedBy'
import Field from './Field.vue'
import Icon from './Icon.vue'

defineOptions({ name: 'BuiSelect', inheritAttrs: false })

defineProps<{
  id: string
  label: string
  options: { value: string; label: string }[]
  placeholder?: string
  hint?: string
  error?: string
  required?: boolean
}>()

const model = defineModel<string>()
</script>

<template>
  <Field :id="id" :label="label" :hint="hint" :error="error" :required="required">
    <div class="bui-select">
      <select
        :id="id"
        v-model="model"
        class="bui-field__input bui-select__control"
        :required="required"
        :aria-invalid="error ? 'true' : undefined"
        :aria-describedby="describedBy(id, hint, error)"
        v-bind="$attrs"
      >
        <option v-if="placeholder" value="">{{ placeholder }}</option>
        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
      <Icon name="chevron-down" class="bui-select__icon" />
    </div>
  </Field>
</template>
