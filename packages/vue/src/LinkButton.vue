<script setup lang="ts">
/** Bouton à l'apparence de lien : une action discrète dans le texte ou sous un formulaire (« Tout effacer »). */
defineOptions({ name: 'BuiLinkButton' })

const { type = 'button', fullWidth = false } = defineProps<{
  type?: 'button' | 'submit' | 'reset'
  /** Occupe toute la largeur de son conteneur. */
  fullWidth?: boolean
}>()
</script>

<template>
  <button
    :type="type"
    :class="['bui-link', 'bui-link--button', fullWidth && 'bui-link--full-width']"
  >
    <slot />
  </button>
</template>
