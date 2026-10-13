<script setup lang="ts">
import { computed } from 'vue'

import Icon from './Icon.vue'

defineOptions({ name: 'BuiCheckbox', inheritAttrs: false })

const { id, hint, error } = defineProps<{
  id: string
  label: string
  hint?: string
  error?: string
  required?: boolean
}>()

const model = defineModel<boolean>()

const describedBy = computed(
  () => [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined,
)
</script>

<template>
  <div class="bui-checkbox">
    <input
      :id="id"
      v-model="model"
      class="bui-checkbox__input"
      type="checkbox"
      :required="required"
      :aria-invalid="error ? 'true' : undefined"
      :aria-describedby="describedBy"
      v-bind="$attrs"
    />
    <label class="bui-checkbox__label" :for="id"
      >{{ label }}<span v-if="required" class="bui-checkbox__required"> (obligatoire)</span></label
    >
    <p v-if="hint" :id="`${id}-hint`" class="bui-checkbox__hint">{{ hint }}</p>
    <p v-if="error" :id="`${id}-error`" class="bui-checkbox__error">
      <Icon name="circle-alert" />{{ error }}
    </p>
  </div>
</template>
