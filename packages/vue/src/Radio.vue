<script setup lang="ts">
defineOptions({ name: 'BuiRadio', inheritAttrs: false })

defineProps<{ id: string; name: string; value: string; label: string; invalid?: boolean }>()

const model = defineModel<string | undefined>()
</script>

<template>
  <div class="bui-radio">
    <input
      :id="id"
      v-model="model"
      class="bui-radio__input"
      type="radio"
      :name="name"
      :value="value"
      :aria-invalid="invalid ? 'true' : undefined"
      v-bind="$attrs"
    />
    <label class="bui-radio__label" :for="id">{{ label }}</label>
  </div>
</template>
