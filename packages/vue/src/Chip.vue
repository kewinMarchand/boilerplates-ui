<script setup lang="ts">
import Icon from './Icon.vue'

/** Puce de filtre ou de sous-catégorie. Une suite de puces va dans une `<ul class="bui-chip-list" role="list">`. */
defineOptions({ name: 'BuiChip' })

defineProps<{
  /** Lien vers la page filtrée. Sans lui, un bouton. `aria-current="page"` marque la puce de la page courante. */
  href?: string
  /** Filtre actif : un clic le retire, ce que l'icône montre et un texte masqué annonce. */
  removable?: boolean
}>()
</script>

<template>
  <a v-if="href !== undefined" class="bui-chip" :href="href"
    ><span v-if="removable" class="bui-visually-hidden">Retirer le filtre : </span><slot /><Icon
      v-if="removable"
      name="x"
  /></a>
  <button v-else type="button" class="bui-chip">
    <span v-if="removable" class="bui-visually-hidden">Retirer le filtre : </span><slot /><Icon
      v-if="removable"
      name="x"
    />
  </button>
</template>
