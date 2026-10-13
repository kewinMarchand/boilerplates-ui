<script setup lang="ts">
import Icon from './Icon.vue'

defineOptions({ name: 'BuiField' })

defineProps<{
  id: string
  label: string
  hint?: string | undefined
  error?: string | undefined
  required?: boolean | undefined
}>()

defineSlots<{ default(): unknown }>()
</script>

<template>
  <div class="bui-field">
    <label class="bui-field__label" :for="id"
      >{{ label }}<span v-if="required" class="bui-field__required"> (obligatoire)</span></label
    >
    <p v-if="hint" :id="`${id}-hint`" class="bui-field__hint">{{ hint }}</p>
    <slot />
    <p v-if="error" :id="`${id}-error`" class="bui-field__error">
      <Icon name="circle-alert" />{{ error }}
    </p>
  </div>
</template>
