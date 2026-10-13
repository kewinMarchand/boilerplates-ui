<script setup lang="ts">
import Icon from './Icon.vue'

defineOptions({ name: 'BuiLink' })

defineProps<{
  href: string
  /** Ouvre dans une nouvelle fenêtre et l'annonce (icône et texte masqué). */
  external?: boolean
}>()
</script>

<template>
  <a
    class="bui-link"
    :href="href"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    ><slot /><template v-if="external"
      ><Icon name="external-link" class="bui-link__icon" /><span class="bui-visually-hidden">
        (nouvelle fenêtre)</span
      ></template
    ></a
  >
</template>
