<script setup lang="ts">
import Icon from './Icon.vue'

import type { IconName } from './iconNames'
import type { ToastData, ToastVariant } from './useToaster'

defineOptions({ name: 'BuiToaster' })

const VARIANTS: Record<ToastVariant, { icon: IconName; prefix: string; role: 'status' | 'alert' }> =
  {
    info: { icon: 'info', prefix: 'Information :', role: 'status' },
    success: { icon: 'circle-check', prefix: 'Succès :', role: 'status' },
    warning: { icon: 'triangle-alert', prefix: 'Attention :', role: 'alert' },
    error: { icon: 'circle-alert', prefix: 'Erreur :', role: 'alert' },
  }

defineProps<{ toasts: ToastData[] }>()

const emit = defineEmits<{ close: [id: string] }>()
</script>

<template>
  <!-- Pas de disparition automatique (WCAG 2.2.1) : chaque toast se ferme par son bouton. -->
  <div class="bui-toaster">
    <div
      v-for="{ id, message, variant = 'info' } in toasts"
      :id="id"
      :key="id"
      :class="['bui-toast', `bui-toast--${variant}`]"
      :role="VARIANTS[variant].role"
    >
      <Icon :name="VARIANTS[variant].icon" class="bui-toast__icon" />
      <p class="bui-toast__message">
        <span class="bui-visually-hidden">{{ `${VARIANTS[variant].prefix} ` }}</span
        >{{ message }}
      </p>
      <button
        type="button"
        class="bui-toast__close"
        aria-label="Fermer la notification"
        @click="emit('close', id)"
      >
        <Icon name="x" />
      </button>
    </div>
  </div>
</template>
