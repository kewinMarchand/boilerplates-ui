<script setup lang="ts">
/** Bouton à l'apparence de lien : une action discrète dans le texte ou sous un formulaire (« Tout effacer »). */
defineOptions({ name: 'BuiLinkButton' })

const { type = 'button' } = defineProps<{
  type?: 'button' | 'submit' | 'reset'
}>()
</script>

<template>
  <button :type="type" class="bui-link bui-link--button"><slot /></button>
</template>
