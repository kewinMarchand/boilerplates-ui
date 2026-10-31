export type ToastVariant = 'info' | 'success' | 'warning' | 'error'

export interface ToastData {
  id: string
  message: string
  variant?: ToastVariant
}

/** File de toasts : `show` ajoute en fin de file, `close` retire. `toasts` se lit dans un composant (réactif). */
export const useToaster = () => {
  let toasts = $state<ToastData[]>([])
  let counter = 0

  const show = (toast: Omit<ToastData, 'id'>) => {
    counter += 1
    toasts = [...toasts, { ...toast, id: `bui-toast-svelte-${counter}` }]
  }

  const close = (id: string) => {
    toasts = toasts.filter((toast) => toast.id !== id)
  }

  return {
    get toasts() {
      return toasts
    },
    show,
    close,
  }
}
