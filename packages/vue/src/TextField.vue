<script setup lang="ts">
import { computed } from 'vue'

import Icon from './Icon.vue'

defineOptions({ name: 'BuiTextField', inheritAttrs: false })

const {
  id,
  hint,
  error,
  type = 'text',
} = defineProps<{
  id: string
  label: string
  hint?: string
  error?: string
  required?: boolean
  type?: 'text' | 'email' | 'tel' | 'url' | 'password' | 'search'
}>()

const model = defineModel<string>()

const describedBy = computed(
  () => [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined,
)
</script>

<template>
  <div class="bui-field">
    <label class="bui-field__label" :for="id"
      >{{ label }}<span v-if="required" class="bui-field__required"> (obligatoire)</span></label
    >
    <p v-if="hint" :id="`${id}-hint`" class="bui-field__hint">{{ hint }}</p>
    <input
      :id="id"
      v-model="model"
      class="bui-field__input"
      :type="type"
      :required="required"
      :aria-invalid="error ? 'true' : undefined"
      :aria-describedby="describedBy"
      v-bind="$attrs"
    />
    <p v-if="error" :id="`${id}-error`" class="bui-field__error">
      <Icon name="circle-alert" />{{ error }}
    </p>
  </div>
</template>
