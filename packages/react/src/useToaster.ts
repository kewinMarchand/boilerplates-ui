import { useRef, useState } from 'react'

import type { ToastData } from './Toaster'

/** File de toasts : `show` ajoute en fin de file, `close` retire. */
export const useToaster = () => {
  const [toasts, setToasts] = useState<ToastData[]>([])
  const counter = useRef(0)

  const show = (toast: Omit<ToastData, 'id'>) => {
    counter.current += 1
    const id = `bui-toast-react-${counter.current}`
    setToasts((list) => [...list, { ...toast, id }])
  }
  const close = (id: string) => setToasts((list) => list.filter((toast) => toast.id !== id))

  return { toasts, show, close }
}
