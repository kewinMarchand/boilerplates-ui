<script setup lang="ts">
defineOptions({ name: 'BuiSwitch', inheritAttrs: false })

defineProps<{ id: string; label: string }>()

const model = defineModel<boolean>()
</script>

<template>
  <div class="bui-switch">
    <input
      :id="id"
      v-model="model"
      class="bui-switch__input"
      type="checkbox"
      role="switch"
      v-bind="$attrs"
    />
    <label class="bui-switch__label" :for="id">{{ label }}</label>
  </div>
</template>
