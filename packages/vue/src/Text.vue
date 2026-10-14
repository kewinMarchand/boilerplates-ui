<script setup lang="ts">
defineOptions({ name: 'BuiText' })

const ELEMENTS = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  title: 'p',
  lead: 'p',
  body: 'p',
  'body-sm': 'p',
  caption: 'span',
  overline: 'p',
} as const

const { variant = 'body', as } = defineProps<{
  variant?: keyof typeof ELEMENTS
  /** Élément rendu, quand le niveau de titre de la page diffère du style voulu. */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'
}>()
</script>

<template>
  <component
    :is="as ?? ELEMENTS[variant]"
    :class="['bui-text', variant !== 'body' && `bui-text--${variant}`]"
    ><slot
  /></component>
</template>
