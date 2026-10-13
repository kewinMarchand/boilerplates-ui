import { ref } from 'vue'

export type ToastVariant = 'info' | 'success' | 'warning' | 'error'

export interface ToastData {
  id: string
  message: string
  variant?: ToastVariant
}

/** File de toasts : `show` ajoute en fin de file, `close` retire. */
export const useToaster = () => {
  const toasts = ref<ToastData[]>([])
  let counter = 0

  const show = (toast: Omit<ToastData, 'id'>) => {
    counter += 1
    toasts.value = [...toasts.value, { ...toast, id: `bui-toast-vue-${counter}` }]
  }
  const close = (id: string) => {
    toasts.value = toasts.value.filter((toast) => toast.id !== id)
  }

  return { toasts, show, close }
}
