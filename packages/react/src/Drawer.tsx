import { Modal, type ModalProps } from './Modal'

export interface DrawerProps extends Omit<ModalProps, 'side'> {
  side?: 'start' | 'end'
}

export const Drawer = ({ side = 'end', ...props }: DrawerProps) => <Modal side={side} {...props} />
