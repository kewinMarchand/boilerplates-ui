<script setup lang="ts">
import Icon from './Icon.vue'

import type { IconName } from './iconNames'

defineOptions({ name: 'BuiButton' })

export type ButtonVariant =
  'primary' | 'secondary' | 'outline' | 'ghost' | 'inverse' | 'nav' | 'light' | 'outline-light'
export type ButtonSize = 'sm' | 'md' | 'lg'

const {
  variant = 'primary',
  size = 'md',
  type = 'button',
  loading = false,
  iconPosition = 'start',
  fullWidth = false,
} = defineProps<{
  /**
   * `inverse` : sur fond sombre ou primaire. `nav` : lien ou bouton de navigation sur fond primaire (header).
   * `light` et `outline-light` : sur une photo (héros), mêmes couleurs en mode sombre.
   */
  variant?: ButtonVariant
  size?: ButtonSize
  type?: 'button' | 'submit' | 'reset'
  /** Garde le bouton focalisable (aria-disabled) et ignore les clics pendant le chargement. */
  loading?: boolean
  icon?: IconName
  iconPosition?: 'start' | 'end'
  /** Rend un lien `<a>` à l'apparence de bouton. Désactivé, il perd son `href`. */
  href?: string
  disabled?: boolean
  /** Occupe toute la largeur de son conteneur. */
  fullWidth?: boolean
}>()

const emit = defineEmits<{ click: [event: MouseEvent] }>()

const handleClick = (event: MouseEvent) => {
  if (loading) {
    event.preventDefault()
    return
  }
  emit('click', event)
}

const classes = () => [
  'bui-button',
  variant !== 'primary' && `bui-button--${variant}`,
  size !== 'md' && `bui-button--${size}`,
  fullWidth && 'bui-button--full-width',
]
</script>

<template>
  <a
    v-if="href !== undefined"
    :class="classes()"
    :href="disabled ? undefined : href"
    :aria-disabled="disabled ? 'true' : undefined"
    @click="emit('click', $event)"
  >
    <Icon v-if="icon && iconPosition === 'start'" :name="icon" />
    <slot />
    <Icon v-if="icon && iconPosition === 'end'" :name="icon" />
  </a>
  <button
    v-else
    :type="type"
    :class="classes()"
    :disabled="disabled"
    :aria-disabled="loading ? 'true' : undefined"
    @click="handleClick"
  >
    <Icon v-if="loading" name="loader-circle" class="bui-button__spinner" />
    <Icon v-else-if="icon && iconPosition === 'start'" :name="icon" />
    <slot />
    <Icon v-if="!loading && icon && iconPosition === 'end'" :name="icon" />
    <span v-if="loading" class="bui-visually-hidden"> (chargement en cours)</span>
  </button>
</template>
